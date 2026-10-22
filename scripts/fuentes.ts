// npm run fuentes -- <marca>
// Descarga a marcas/<marca>/fuentes/ los TTF estáticos de las fuentes de Google que usa la marca
// (vía Fontsource, que publica cada peso por separado y su licencia) y actualiza marca.json.
// Así el render no depende de internet y el PDF editable lleva fuentes TrueType reales
// (Illustrator las reconoce como texto; las fuentes variables salen como Type 3).

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const slug = process.argv[2];
if (!slug) throw new Error("Uso: npm run fuentes -- <marca>");
const ruta = path.join("marcas", slug, "marca.json");
const marca = JSON.parse(await readFile(ruta, "utf8"));
const dirFuentes = path.join("marcas", slug, "fuentes");
await mkdir(dirFuentes, { recursive: true });
const licRuta = path.join(dirFuentes, "licencias.json");
const licencias = existsSync(licRuta) ? JSON.parse(await readFile(licRuta, "utf8")) : {};

type Variantes = Record<string, Record<string, Record<string, { url: { ttf?: string } }>>>;

for (const [rol, f] of Object.entries(marca.fuentes as Record<string, { google?: string; archivo?: string; familia?: string; peso?: number; estilo?: "normal" | "italic" }>)) {
  if (!f.google) continue;
  const peso = f.peso ?? 400;
  const estilo = f.estilo ?? "normal";
  const archivo = `fuentes/${f.google.replace(/ /g, "")}-${peso}${estilo === "italic" ? "-italic" : ""}.ttf`;
  if (f.archivo === archivo && existsSync(path.join("marcas", slug, archivo))) continue;

  const id = f.google.toLowerCase().replace(/ /g, "-");
  const r = await fetch(`https://api.fontsource.org/v1/fonts/${id}`);
  if (!r.ok) {
    console.log(`✗ ${rol}: "${f.google}" no está en Fontsource/Google Fonts. Consigue los archivos de la fuente y ponlos en fuentes/.`);
    continue;
  }
  const info = (await r.json()) as { family: string; license: string; weights: number[]; variants: Variantes };
  if (!info.weights.includes(peso)) {
    console.log(`✗ ${rol}: ${info.family} no tiene peso ${peso}. Pesos: ${info.weights.join(", ")}`);
    continue;
  }
  const url = info.variants[String(peso)]?.[estilo]?.["latin"]?.url.ttf; // "latin" incluye tildes y ñ
  if (!url) {
    console.log(`✗ ${rol}: ${info.family} no tiene ${peso} ${estilo}`);
    continue;
  }
  await writeFile(path.join("marcas", slug, archivo), Buffer.from(await (await fetch(url)).arrayBuffer()));
  marca.fuentes[rol] = { ...f, archivo, familia: info.family, peso };
  licencias[path.basename(archivo)] = { familia: info.family, licencia: info.license, fuente: `https://fontsource.org/fonts/${id}` };
  console.log(`✓ ${rol}: ${info.family} ${peso} → ${archivo}  (${info.license})`);
}
await writeFile(ruta, JSON.stringify(marca, null, 2) + "\n");
await writeFile(licRuta, JSON.stringify(licencias, null, 2) + "\n");
