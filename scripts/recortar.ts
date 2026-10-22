// npm run recortar -- <foto.jpg> [salida.png]
// Quita el fondo de una foto (persona u objeto) en local, sin llaves, y recorta el borde transparente.
// La primera vez descarga el modelo (~80 MB).

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { removeBackground } from "@imgly/background-removal-node";
import sharp from "sharp";

const [entrada, salidaArg] = process.argv.slice(2);
if (!entrada) throw new Error("Uso: npm run recortar -- foto.jpg [salida.png]");
const salida = salidaArg ?? entrada.replace(/\.[^.]+$/, "") + "-recorte.png";

const blob = await removeBackground(pathToFileURL(path.resolve(entrada)).href, { output: { format: "image/png", quality: 1 } });
const png = await sharp(Buffer.from(await blob.arrayBuffer())).trim().png().toBuffer();
await writeFile(salida, png);
console.log(`✓ ${salida}`);
