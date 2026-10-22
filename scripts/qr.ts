// npm run qr -- "<texto o enlace>" --destino marcas/<marca>/qr.svg [--color "#0E1330"]
// Genera un QR vectorial (nítido en impresión y editable en Illustrator) y lo verifica leyéndolo de vuelta.
// Para copiar el QR de un arte existente, primero decodifícalo y pasa aquí exactamente el mismo enlace.

import { writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import jsQR from "jsqr";
import QRCode from "qrcode";
import sharp from "sharp";

const { values, positionals } = parseArgs({ allowPositionals: true, options: { destino: { type: "string" }, color: { type: "string", default: "#000000" } } });
const texto = positionals[0];
if (!texto || !values.destino) throw new Error('Uso: npm run qr -- "https://…" --destino marcas/<marca>/qr.svg');

const svg = await QRCode.toString(texto, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: values.color!, light: "#0000" } });

// Verificación: se rasteriza sobre blanco y se lee; si no coincide, no se guarda.
const { data, info } = await sharp(Buffer.from(svg), { density: 300 }).resize(800, 800).flatten({ background: "#ffffff" }).extend({ top: 60, bottom: 60, left: 60, right: 60, background: "#ffffff" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const leido = jsQR(new Uint8ClampedArray(data), info.width, info.height)?.data;
if (leido !== texto) throw new Error(`El QR generado no se lee igual (leído: ${leido ?? "nada"}). Prueba con un color más oscuro.`);

await writeFile(values.destino, svg);
console.log(`✓ ${values.destino}  (verificado: se lee correctamente)`);
