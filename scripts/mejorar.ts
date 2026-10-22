// npm run mejorar -- <imagen.png> [más imágenes…] [--x 4]
// Aumenta la resolución con IA (Real-ESRGAN x4plus, local, usa la GPU del Mac) sin redibujar nada.
// Sirve para mascotas, logos o fotos chicas antes de usarlas grandes. Sale <nombre>-x4.png al lado.
// La primera vez descarga el programa oficial de github.com/xinntao/Real-ESRGAN (v0.2.5.0, ~52 MB) a .herramientas/.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { chmod, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({ allowPositionals: true, options: { x: { type: "string", default: "4" } } });
if (!positionals.length) throw new Error("Uso: npm run mejorar -- imagen.png");

const DIR = path.resolve(".herramientas/realesrgan");
const BIN = path.join(DIR, "realesrgan-ncnn-vulkan");
const URL = "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-macos.zip";

if (!existsSync(BIN)) {
  if (process.platform !== "darwin") throw new Error("Este script trae la versión de macOS. En otro sistema baja la tuya de la página de Real-ESRGAN.");
  console.log("Descargando Real-ESRGAN (una sola vez)…");
  const tmp = await mkdtemp(path.join(tmpdir(), "esrgan-"));
  try {
    const zip = path.join(tmp, "r.zip");
    await writeFile(zip, Buffer.from(await (await fetch(URL)).arrayBuffer()));
    await mkdir(DIR, { recursive: true });
    execFileSync("unzip", ["-q", "-o", zip, "realesrgan-ncnn-vulkan", "models/realesrgan-x4plus.*", "-d", DIR]);
    await chmod(BIN, 0o755);
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

for (const entrada of positionals) {
  const salida = entrada.replace(/\.[^.]+$/, "") + `-x${values.x}.png`;
  execFileSync(BIN, ["-i", entrada, "-o", salida, "-n", "realesrgan-x4plus", "-s", values.x!, "-m", path.join(DIR, "models"), "-f", "png"], { stdio: "ignore" });
  console.log(`✓ ${salida}`);
}
