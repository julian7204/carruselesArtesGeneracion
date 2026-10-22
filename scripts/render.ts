// npm run render -- <marca>/<post> [--formato instagram-carrusel] [--video] [--por-slide]
// PNG por slide + editable/NN.pdf (vectorial, para Illustrator) + vista.png (hoja de contacto)
// + carrusel.pdf si el formato lo pide (LinkedIn) + caption.txt.
// --video: carrusel completo en MP4 con transición. --por-slide: además un MP4 por slide.

import { existsSync } from "node:fs";
import { createServer } from "node:net";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia, renderStill } from "@remotion/renderer";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import { obtenerFormato } from "../src/kit/formatos";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    formato: { type: "string" },
    video: { type: "boolean", default: false },
    "por-slide": { type: "boolean", default: false },
  },
});

const carpeta = positionals[0]?.replace(/^posts\//, "").replace(/\/(post\.tsx)?$/, "");
if (!carpeta || !existsSync(path.join("posts", carpeta, "post.tsx"))) {
  throw new Error("Indica el post: npm run render -- <marca>/<post>  (debe existir posts/<marca>/<post>/post.tsx)");
}
const prefijo = carpeta.replace("/", "--").replace(/[^a-zA-Z0-9-]/g, "-") + "--";
const salida = path.join("salida", carpeta);

// Puerto libre propio: si otra app usa el 3000, Remotion se confundiría de servidor.
const port = await new Promise<number>((ok) => {
  const srv = createServer().listen(0, () => {
    const p = (srv.address() as { port: number }).port;
    srv.close(() => ok(p));
  });
});

console.log("Preparando…");
const serveUrl = await bundle({ entryPoint: path.resolve("src/remotion/index.ts") });
const comps = (await getCompositions(serveUrl, { port })).filter((c) => c.id.startsWith(prefijo));
if (!comps.length) throw new Error(`No encontré composiciones para ${carpeta}. ¿El post exporta definirPost(...) por defecto?`);

const porFormato = new Map<string, typeof comps>();
for (const c of comps) {
  const formato = c.id.slice(prefijo.length).replace(/--(\d+|video)$/, "");
  if (values.formato && !values.formato.split(",").includes(formato)) continue;
  porFormato.set(formato, [...(porFormato.get(formato) ?? []), c]);
}

for (const [formato, lista] of porFormato) {
  const dir = path.join(salida, formato);
  await mkdir(dir, { recursive: true });
  const slides = lista.filter((c) => /--\d+$/.test(c.id)).sort((a, b) => Number(a.id.split("--").pop()) - Number(b.id.split("--").pop()));
  const pngs: string[] = [];

  for (const [i, c] of slides.entries()) {
    const archivo = path.join(dir, `${String(i + 1).padStart(2, "0")}.png`);
    await renderStill({ composition: c, serveUrl, port, output: archivo, frame: c.durationInFrames - 1, imageFormat: "png" });
    pngs.push(archivo);
    // PDF vectorial por slide para editar en Illustrator (texto vivo, formas como trazados, fotos como objetos).
    await mkdir(path.join(dir, "editable"), { recursive: true });
    const editable = path.join(dir, "editable", `${String(i + 1).padStart(2, "0")}.pdf`);
    await renderStill({ composition: c, serveUrl, port, output: editable, frame: c.durationInFrames - 1, imageFormat: "pdf", inputProps: { editable: true } });
    // Chrome guarda 1 px = 0.75 pt. Redes: se escala para que la mesa de trabajo mida igual que el PNG (1080×1350).
    // Impresión: se escala al tamaño físico (mm) del formato.
    const doc = await PDFDocument.load(await readFile(editable));
    const { mm } = obtenerFormato(formato);
    for (const pag of doc.getPages()) {
      const k = mm ? (mm.ancho * 72) / 25.4 / pag.getWidth() : 4 / 3;
      pag.scale(k, k);
    }
    await writeFile(editable, await doc.save());
    if (values["por-slide"]) {
      await renderMedia({ composition: c, serveUrl, port, codec: "h264", outputLocation: archivo.replace(/\.png$/, ".mp4") });
    }
  }

  // Hoja de contacto para revisar el carrusel de un vistazo.
  const miniAncho = 360;
  const minis = await Promise.all(pngs.map((p) => sharp(p).resize({ width: miniAncho }).toBuffer({ resolveWithObject: true })));
  if (minis.length) {
    const miniAlto = minis[0].info.height;
    const gap = 12;
    await sharp({ create: { width: minis.length * (miniAncho + gap) + gap, height: miniAlto + gap * 2, channels: 3, background: "#222" } })
      .composite(minis.map((m, i) => ({ input: m.data, left: gap + i * (miniAncho + gap), top: gap })))
      .png()
      .toFile(path.join(dir, "vista.png"));
  }

  if (obtenerFormato(formato).pdf) {
    const pdf = await PDFDocument.create();
    for (const p of pngs) {
      const img = await pdf.embedPng(await sharp(p).png().toBuffer());
      pdf.addPage([img.width, img.height]).drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }
    await writeFile(path.join(dir, "carrusel.pdf"), await pdf.save());
  }

  const video = lista.find((c) => c.id.endsWith("--video"));
  if (values.video && video) {
    await renderMedia({ composition: video, serveUrl, port, codec: "h264", outputLocation: path.join(dir, "carrusel.mp4") });
  }
  console.log(`✓ ${formato}: ${pngs.length} slide(s) → ${dir}`);

  const { caption, hashtags } = (video?.props ?? {}) as { caption?: string; hashtags?: string[] };
  if (caption || hashtags?.length) {
    const tags = (hashtags ?? []).map((h) => (h.startsWith("#") ? h : `#${h}`)).join(" ");
    await writeFile(path.join(salida, "caption.txt"), [caption ?? "", "", tags].join("\n").trim() + "\n");
  }
}
