// npm run stock -- "kid playing drums" --destino posts/<marca>/<post>/fotos [--cantidad 6] [--orientacion vertical|horizontal|cuadrada]
// Usa la primera llave que haya en .env: Pexels (PEXELS_API_KEY), Pixabay (PIXABAY_API_KEY) o
// Unsplash (UNSPLASH_ACCESS_KEY). Sin llaves, busca en Openverse con licencias CC0 / dominio público.
// Las búsquedas funcionan mejor en inglés. Guarda los créditos en creditos.json.

import "./entorno";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    destino: { type: "string" },
    cantidad: { type: "string", default: "6" },
    orientacion: { type: "string", default: "vertical" },
  },
});

const consulta = positionals.join(" ");
if (!consulta || !values.destino) throw new Error('Uso: npm run stock -- "kid playing drums" --destino posts/<marca>/<post>/fotos');
const cantidad = Number(values.cantidad);
const orient = values.orientacion as "vertical" | "horizontal" | "cuadrada";

type Resultado = { url: string; autor: string; licencia: string; fuente: string; pagina: string; avisar?: string };

async function pexels(key: string): Promise<Resultado[]> {
  const o = { vertical: "portrait", horizontal: "landscape", cuadrada: "square" }[orient];
  const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(consulta)}&per_page=${cantidad}&orientation=${o}`, { headers: { Authorization: key } });
  if (!r.ok) throw new Error(`Pexels ${r.status}`);
  const d = (await r.json()) as { photos: { src: { large2x: string }; photographer: string; url: string }[] };
  return d.photos.map((p) => ({ url: p.src.large2x, autor: p.photographer, licencia: "Pexels License", fuente: "pexels", pagina: p.url }));
}

async function pixabay(key: string): Promise<Resultado[]> {
  // Pixabay no tiene "cuadrada": se pide cualquiera y el diseño recorta.
  const o = { vertical: "vertical", horizontal: "horizontal", cuadrada: "all" }[orient];
  const r = await fetch(`https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(consulta)}&image_type=photo&orientation=${o}&safesearch=true&per_page=${Math.max(3, cantidad)}`);
  if (!r.ok) throw new Error(`Pixabay ${r.status}: ${await r.text()}`);
  const d = (await r.json()) as { hits: { largeImageURL: string; user: string; pageURL: string }[] };
  // Pixabay prohíbe enlazar sus URLs desde la app: el script siempre descarga la foto.
  return d.hits.map((p) => ({ url: p.largeImageURL, autor: p.user, licencia: "Pixabay Content License", fuente: "pixabay", pagina: p.pageURL }));
}

async function unsplash(key: string): Promise<Resultado[]> {
  const o = { vertical: "portrait", horizontal: "landscape", cuadrada: "squarish" }[orient];
  const r = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(consulta)}&per_page=${cantidad}&orientation=${o}`, { headers: { Authorization: `Client-ID ${key}` } });
  if (!r.ok) throw new Error(`Unsplash ${r.status}`);
  const d = (await r.json()) as { results: { urls: { regular: string }; user: { name: string }; links: { html: string; download_location: string } }[] };
  return d.results.map((p) => ({ url: p.urls.regular, autor: p.user.name, licencia: "Unsplash License", fuente: "unsplash", pagina: p.links.html, avisar: `${p.links.download_location}&client_id=${key}` }));
}

async function openverse(): Promise<Resultado[]> {
  const a = { vertical: "tall", horizontal: "wide", cuadrada: "square" }[orient];
  const r = await fetch(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(consulta)}&license=cc0,pdm&aspect_ratio=${a}&page_size=${cantidad * 2}&mature=false`);
  if (!r.ok) throw new Error(`Openverse ${r.status}`);
  const d = (await r.json()) as { results: { url: string; creator?: string; license: string; foreign_landing_url: string; width?: number }[] };
  return d.results
    .filter((p) => (p.width ?? 1000) >= 800)
    .map((p) => ({ url: p.url, autor: p.creator ?? "desconocido", licencia: p.license.toUpperCase(), fuente: "openverse", pagina: p.foreign_landing_url }));
}

const resultados = process.env.PEXELS_API_KEY
  ? await pexels(process.env.PEXELS_API_KEY)
  : process.env.PIXABAY_API_KEY
    ? await pixabay(process.env.PIXABAY_API_KEY)
    : process.env.UNSPLASH_ACCESS_KEY
      ? await unsplash(process.env.UNSPLASH_ACCESS_KEY)
      : await openverse();

await mkdir(values.destino, { recursive: true });
const base = consulta.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
const creditosRuta = path.join(values.destino, "creditos.json");
const creditos: Record<string, Omit<Resultado, "url" | "avisar">> = existsSync(creditosRuta) ? JSON.parse(await readFile(creditosRuta, "utf8")) : {};

let n = 0;
for (const r of resultados) {
  if (n >= cantidad) break;
  try {
    const resp = await fetch(r.url, { redirect: "follow" });
    const tipo = resp.headers.get("content-type") ?? "";
    if (!resp.ok || !tipo.startsWith("image/")) continue;
    const ext = tipo.includes("png") ? "png" : tipo.includes("webp") ? "webp" : "jpg";
    const nombre = `${base}-${String(++n).padStart(2, "0")}.${ext}`;
    await writeFile(path.join(values.destino, nombre), Buffer.from(await resp.arrayBuffer()));
    if (r.avisar) await fetch(r.avisar).catch(() => {}); // Unsplash pide registrar cada descarga
    creditos[nombre] = { autor: r.autor, licencia: r.licencia, fuente: r.fuente, pagina: r.pagina };
    console.log(`✓ ${nombre}  (${r.fuente}, ${r.autor})`);
  } catch {
    // foto caída: se salta
  }
}
await writeFile(creditosRuta, JSON.stringify(creditos, null, 2));
if (!n) console.log("No se descargó ninguna foto. Prueba otra búsqueda (en inglés) o agrega PIXABAY_API_KEY en .env");
