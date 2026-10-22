// npm run icono -- <colección:nombre> [--color "#E2232A"]      ej: simple-icons:whatsapp · ph:music-notes-bold · tabler:map-pin
// npm run icono -- --buscar "guitar"                            lista opciones reales para elegir
// Baja íconos SVG reales de Iconify (200 000+ íconos de colecciones abiertas) a recursos/iconos/
// y anota la licencia de la colección en recursos/iconos/licencias.json. Nunca dibujes íconos a mano.

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({ allowPositionals: true, options: { color: { type: "string" }, buscar: { type: "string" } } });

type Coleccion = { name: string; license: { title: string; spdx?: string } };
const colecciones = (await (await fetch("https://api.iconify.design/collections")).json()) as Record<string, Coleccion>;

if (values.buscar) {
  const r = (await (await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(values.buscar)}&limit=40`)).json()) as { icons: string[] };
  for (const id of r.icons) console.log(`${id.padEnd(40)} ${colecciones[id.split(":")[0]]?.license.title ?? ""}`);
  process.exit(0);
}

const id = positionals[0];
if (!id?.includes(":")) throw new Error("Uso: npm run icono -- simple-icons:whatsapp  (o --buscar \"guitar\")");
const [prefijo, nombre] = id.split(":");
const col = colecciones[prefijo];
if (!col) throw new Error(`La colección "${prefijo}" no existe en Iconify`);

const color = values.color ? `?color=${encodeURIComponent(values.color)}` : "";
const r = await fetch(`https://api.iconify.design/${prefijo}/${nombre}.svg${color}`);
const svg = await r.text();
if (!r.ok || !svg.startsWith("<svg")) throw new Error(`No existe el ícono ${id}. Prueba con --buscar`);

const dir = path.join("recursos", "iconos");
await mkdir(dir, { recursive: true });
const archivo = `${prefijo}-${nombre}${values.color ? "-" + values.color.replace("#", "") : ""}.svg`;
await writeFile(path.join(dir, archivo), svg);

const licRuta = path.join(dir, "licencias.json");
const lic = existsSync(licRuta) ? JSON.parse(await readFile(licRuta, "utf8")) : {};
lic[archivo] = { coleccion: col.name, licencia: col.license.title, atribucion: /BY/.test(col.license.title) };
await writeFile(licRuta, JSON.stringify(lic, null, 2) + "\n");
console.log(`✓ recursos/iconos/${archivo}  (${col.name}, ${col.license.title}${/BY/.test(col.license.title) ? " — requiere atribución" : ""})`);
