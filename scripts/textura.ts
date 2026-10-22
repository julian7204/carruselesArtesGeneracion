// npm run textura -- <búsqueda o id> [--cantidad 3]     ej: paper · cardboard · Paper003 · concrete · fabric
// Baja texturas escaneadas reales de ambientCG (CC0, uso comercial sin atribución) a recursos/texturas/
// en escala de grises, casi blancas (rango 199–255) y ~1500 px, listas para <Textura> en modo multiplicar. Registra el origen en recursos/texturas/creditos.json.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";
import sharp from "sharp";

const { values, positionals } = parseArgs({ allowPositionals: true, options: { cantidad: { type: "string", default: "3" } } });
const q = positionals.join(" ");
if (!q) throw new Error("Uso: npm run textura -- paper");

const esId = /^[A-Z][a-zA-Z]+\d{3}$/.test(q);
const api = `https://ambientcg.com/api/v2/full_json?${esId ? `id=${q}` : `q=${encodeURIComponent(q)}`}&type=Material&limit=${values.cantidad}&include=downloadData`;
const { foundAssets } = (await (await fetch(api)).json()) as {
  foundAssets: { assetId: string; downloadFolders: { default: { downloadFiletypeCategories: { zip: { downloads: { attribute: string; fullDownloadPath: string }[] } } } } }[];
};
if (!foundAssets.length) throw new Error(`ambientCG no tiene texturas para "${q}"`);

const dir = path.join("recursos", "texturas");
const creditosRuta = path.join(dir, "creditos.json");
const creditos = existsSync(creditosRuta) ? JSON.parse(await readFile(creditosRuta, "utf8")) : {};

for (const a of foundAssets) {
  const zip = a.downloadFolders.default.downloadFiletypeCategories.zip.downloads.find((d) => d.attribute === "2K-JPG");
  if (!zip) continue;
  // Lo descargado va a una carpeta temporal propia: es contenido de internet.
  const tmp = await mkdtemp(path.join(tmpdir(), "textura-"));
  try {
    const archivoZip = path.join(tmp, "t.zip");
    await writeFile(archivoZip, Buffer.from(await (await fetch(zip.fullDownloadPath)).arrayBuffer()));
    execFileSync("unzip", ["-q", "-o", archivoZip, "*_Color.jpg", "-d", tmp]);
    const color = (await readdir(tmp)).find((f) => f.endsWith("_Color.jpg"));
    if (!color) continue;
    const salida = `${a.assetId}.jpg`;
    // Dos pasos: sharp aplicaría normalise() después de linear() si van en la misma cadena.
    const gris = await sharp(path.join(tmp, color)).grayscale().normalise().resize({ width: 1500, height: 1500, fit: "cover" }).toBuffer();
    await sharp(gris).linear(0.22, 199).jpeg({ quality: 82 }).toFile(path.join(dir, salida));
    creditos[salida] = { fuente: "ambientCG", licencia: "CC0 1.0", pagina: `https://ambientcg.com/view?id=${a.assetId}` };
    console.log(`✓ recursos/texturas/${salida}`);
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}
await writeFile(creditosRuta, JSON.stringify(creditos, null, 2) + "\n");
