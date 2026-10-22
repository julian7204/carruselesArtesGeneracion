# Carruseles · Artes · Generación

Estudio personal para hacer carruseles, posts, stories, reels animados, afiches impresos y PDFs de LinkedIn
para mis proyectos. Se maneja **hablando**: abre esta carpeta en Claude (app de escritorio → Code, o `claude`
en la terminal) y pide lo que necesitas:

> Hazme un carrusel de 5 slides para **Nexus** explicando la nueva función, para Instagram y LinkedIn.

> Agrega el proyecto **alchemia**: el logo y los colores están en su repo.

> Un afiche A5 para **scaleCom** con QR a la web.

Claude escribe el copy con la voz del proyecto, busca fotos de stock reales, recorta personas, diseña,
exporta y revisa el resultado antes de entregarlo.

## Qué entrega

En `salida/<proyecto>/<post>/<formato>/`:

| Archivo | Para qué |
|---|---|
| `01.png`, `02.png`… | Listos para subir |
| `editable/01.pdf`… | Vectorial para **Illustrator** (texto editable; en formatos de impresión, a tamaño real en mm) |
| `vista.png` | Todo el carrusel de un vistazo |
| `carrusel.pdf` | Carrusel de documento para LinkedIn |
| `carrusel.mp4` | Versión animada (si se pide) |
| `../caption.txt` | Texto de la publicación y hashtags |

Formatos: Instagram/Facebook 1080×1350 · cuadrado 1080×1080 · story/reel/TikTok 1080×1920 · LinkedIn PDF ·
X 1600×900 · afiche A5 y A4 a 300 ppp.

## Cada proyecto vive en `marcas/<proyecto>/`

`marca.json` (colores, fuentes, contacto, voz, estilo y reglas), logo, fuentes, manual y `referencias/`
con artes del estilo buscado. Si falta algo, Claude lo va pidiendo. `marcas/ejemplo/` sirve de muestra.

## Instalación (una vez)

1. [Node.js](https://nodejs.org) 22 o superior.
2. En esta carpeta: `npm install`
3. Copia `.env.example` como `.env` y pon tus llaves:
   - `PIXABAY_API_KEY` (gratis en [pixabay.com/api/docs](https://pixabay.com/api/docs/)): fotos de stock reales con personas.
   - `OPENAI_API_KEY` (opcional): imágenes generadas con IA para fondos o escenas que no existen en stock.

   Sin llaves se usan fotos de dominio público (sirven para objetos, casi nunca para personas).

La primera vez que renderiza descarga un Chrome interno (~170 MB) y el modelo para recortar fondos (~80 MB).

## Por dentro

- Motor: [Remotion](https://www.remotion.dev) (React + CSS en Chrome) → PNG, PDF vectorial y MP4 con el mismo diseño.
- `src/kit/`: piezas de diseño (titulares mixtos, tiras de fotos, duotono, pinceladas, puntos, círculos, burbujas de chat, íconos, texturas, animación de entrada).
- `posts/<proyecto>/<post>/post.tsx`: cada pieza. `npm run estudio` abre el editor visual en el navegador.
- Instrucciones para Claude: `CLAUDE.md` (reglas de oro: nada inventado, nada con cara de IA, español neutro) y `.claude/skills/` (`crear-post`, `nueva-marca`).
- `recursos/`: banco de recursos reales (texturas CC0, íconos de Iconify) y catálogo de fuentes con licencias en `recursos/README.md`.
- El recorte de fondos usa `@imgly/background-removal-node` (licencia AGPL; uso personal sin problema, revisar si se distribuye).
