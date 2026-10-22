// npm run imagen -- "descripción en inglés" --destino posts/<marca>/<post>/fotos --nombre fondo [--forma vertical|horizontal|cuadrada]
// Genera una imagen con IA (OpenAI). Necesita OPENAI_API_KEY en .env.
// Úsala para fondos, texturas o escenas que no hay en stock. El texto del post NO se genera aquí:
// se pone encima con el kit para que salga perfecto y editable.

import "./entorno";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import OpenAI from "openai";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    destino: { type: "string" },
    nombre: { type: "string", default: "ia" },
    forma: { type: "string", default: "vertical" },
  },
});

const prompt = positionals.join(" ");
if (!prompt || !values.destino) throw new Error('Uso: npm run imagen -- "prompt" --destino posts/<marca>/<post>/fotos');
if (!process.env.OPENAI_API_KEY) throw new Error("Falta OPENAI_API_KEY en .env");

const size = ({ vertical: "1024x1536", horizontal: "1536x1024", cuadrada: "1024x1024" } as const)[values.forma as "vertical"] ?? "1024x1536";
const model = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2";

const openai = new OpenAI();
const r = await openai.images.generate({
  model,
  prompt: `${prompt}. Photographic, high quality, natural light. No text, no letters, no logos, no watermarks.`,
  size,
  quality: "high",
});
const b64 = r.data?.[0]?.b64_json;
if (!b64) throw new Error("La API no devolvió imagen");

await mkdir(values.destino, { recursive: true });
const archivo = path.join(values.destino, `${values.nombre}.png`);
await writeFile(archivo, Buffer.from(b64, "base64"));
console.log(`✓ ${archivo}  (${model})`);
