# Carruseles y artes · estudio personal

Este repo hace artes para redes sociales (posts, carruseles, stories, reels y PDFs de LinkedIn)
para los proyectos personales de su dueño (cada proyecto es una marca en `marcas/`). Te dirá algo como
"hazme un carrusel para Nexus sobre la nueva función". Si quien escribe no programa, nunca le pidas tocar código. Tú haces todo: copy, diseño,
fotos, render y revisión. Habla en español sencillo, sin jerga técnica, y nunca le pidas que toque código.

## Reglas de oro: nada inventado, nada con cara de IA

1. **Texto**: solo el que da la persona, el que escribes tú con su voz, o datos de `marca.json`.
   Nunca inventes cifras, precios, fechas, horarios, teléfonos, direcciones ni testimonios: si hacen falta, pregunta;
   si hay que avanzar, deja `[PRECIO]` bien visible y avísalo. Revisa ortografía (tildes, ñ, ¿¡).
2. **Tipografía**: solo las fuentes de `marca.json` (descargadas con `npm run fuentes`). Jamás texto dentro de una imagen generada.
3. **Logo**: solo el archivo de `marcas/<marca>/`. Nunca lo redibujes, recrees, recolorees ni generes. Si falta, recuadro provisional y pídelo.
4. **Íconos, texturas, fotos**: del banco (`recursos/README.md` dice de dónde sale cada cosa y con qué licencia).
   No dibujes íconos a mano en el código: `npm run icono -- --buscar "…"` y elige uno real.
5. **Imágenes con IA** solo para fondos o escenas que no existen en stock. Nunca para el logo, el producto real del
   proyecto, personas que representen a su equipo, ni nada con texto.
6. **Evita los clichés de IA**: degradados morado-azul, brillos y "glow", vidrio esmerilado, blobs 3D, destellos ✨,
   exceso de emojis, simetría perfecta en todo, y frases tipo "Descubre / Eleva / Desbloquea tu potencial".
   Lo humano: fotos reales, textura de papel (`<Textura>`), recortes que se salen de su forma, leves giros,
   superposiciones y la mano del estilo de `referencias/`.
7. **Español neutro** en todo (copy, captions, mensajes a la persona y documentación): tuteo con "tú"
   ("escríbenos", "agenda", "descubre"), o "usted" solo si `marca.voz` lo pide. Nada de voseo ("escribinos",
   "tenés", "podés"), ni "vosotros", ni modismos locales ("acá", "ahorita", "chévere", "vale", "guay").
   Vocabulario que se entienda en toda Latinoamérica.
8. **Ante la duda, pregunta o mira**: abre las referencias y la documentación antes de suponer.
9. **Diseña con un patrón, no desde cero**: antes de bocetar lee `conocimiento/patrones-diseno.md` (patrones reales de posts
   estáticos, anuncios, carruseles y mascotas recolectados en Pinterest) y elige 1 patrón principal + 1 recurso de apoyo por pieza.

## Mapa

- `conocimiento/patrones-diseno.md` — banco de patrones de diseño que funcionan (posts, anuncios, carruseles, mascotas), con cómo hacerlos con el kit.

- `marcas/<proyecto>/` — todo lo de cada marca:
  - `marca.json` — colores, fuentes, logo, contacto, voz, estilo, reglas y lo `pendiente`.
  - `logo.png|svg` (y `logo-claro` para fondos oscuros), `fuentes/`, `manual.pdf`, `referencias/` (artes de referencia del estilo buscado).
  - `marcas/_plantilla/marca.json` es la plantilla para marcas nuevas.
- `posts/<proyecto>/<post>/post.tsx` — el diseño de cada pieza, con sus `fotos/` y `fotos/creditos.json`.
- `recursos/` — banco de recursos reales y su catálogo de fuentes y licencias (`recursos/README.md`): texturas, íconos.
- `src/kit/` — piezas de diseño reutilizables (ver abajo). Si una pieza falta y servirá de nuevo, agrégala al kit.
- `salida/<proyecto>/<post>/<formato>/` — resultados: `01.png…`, `editable/01.pdf…` (vectorial para Illustrator:
  texto vivo, formas como trazados, fotos como objetos), `vista.png` (hoja de contacto), `carrusel.pdf` (LinkedIn), `carrusel.mp4`. No se sube a git.

## Cómo reconocer la marca

Si nombran un proyecto, busca la carpeta en `marcas/` (sin importar mayúsculas, tildes o espacios: "scale com" → `scale-com`).
Si el proyecto tiene código en `~/Desktop/Mis Archivos/Proyectos Personales/<proyecto>`, puedes leer de ahí su logo, colores y textos.
Si la marca tiene mascota o personaje, se copia su dibujo original a `marcas/<proyecto>/mascota/` y se usa con un
componente (ejemplo: `marcas/scale-com/mascota/Mascota3D.tsx` con sus poses en `3d/`); nunca se redibuja.
Si las poses vienen en baja resolución, mejóralas con `npm run mejorar` antes de usarlas grandes.
Si no existe, usa la skill **nueva-marca**. Si existe pero `pendiente` tiene cosas, avísalo en una línea
y pide lo que haga falta para *esta* pieza (por ejemplo el logo); lo demás puede esperar.
Antes de diseñar, lee siempre `marca.json` completo y mira las imágenes de `referencias/`.
Si te pasan un arte o manual en PDF: extrae colores muestreando píxeles, fuentes con `pdffonts`, textos con
`pdftotext`, imágenes (logo) con `pdfimages`, y el enlace del QR decodificándolo.

## Comandos

```bash
npm run stock -- "kid playing drums" --destino posts/<marca>/<post>/fotos --cantidad 6 --orientacion vertical
npm run recortar -- posts/<marca>/<post>/fotos/foto.jpg           # quita el fondo → foto-recorte.png
npm run imagen -- "prompt en inglés" --destino posts/<marca>/<post>/fotos --nombre fondo --forma vertical
npm run fuentes -- <marca>                                         # baja TTF estáticos (Fontsource) a marcas/<marca>/fuentes
npm run icono -- --buscar "guitar"                                  # busca íconos reales; luego: npm run icono -- ph:guitar-bold
npm run textura -- paper                                           # texturas escaneadas CC0 (ambientCG) a recursos/texturas
npm run qr -- "https://…" --destino marcas/<marca>/qr.svg           # QR vectorial verificado (copia el enlace exacto del original)
npm run render -- <marca>/<post>                                   # PNG + PDF editable + vista.png (+ PDF LinkedIn)
npm run render -- <marca>/<post> --video                           # + carrusel.mp4 animado
npm run render -- <marca>/<post> --video --por-slide               # + un MP4 por slide (carrusel de videos en IG)
npm run estudio                                                    # editor visual en el navegador (Remotion Studio)
npm run revisar                                                    # chequeo de tipos
```

- Llaves: en `.env` (no se sube a git). Plantilla en `.env.example`.
- Stock: usa la primera llave disponible: Pexels, Pixabay o Unsplash (todas con uso comercial libre); si no hay,
  Openverse CC0/dominio público (sin llave, pero pobre para personas y niños). Busca en inglés y descarga varias para elegir.
  **Mira las fotos** (arma una hoja con sharp o ábrelas) antes de usarlas.
- Recorte: local, sin llave. Funciona mejor con fondos limpios. Revisa el PNG: si quedaron restos, prueba otra foto.
- Imagen IA (OpenAI, `OPENAI_API_KEY`): para escenas que no hay en stock, fondos o texturas. Nunca le pidas texto
  a la IA: el texto siempre va con el kit.

- Fuentes: corre `npm run fuentes -- <marca>` cada vez que cambien las fuentes de Google de una marca. Sin eso
  el PDF editable lleva las fuentes variables como Type 3 y Illustrator no las edita como texto.

## Kit (`import { … } from "../../../src/kit"`)

Todo tamaño va en `u` (1 = 1 px en un lienzo de 1080 de lado corto). `useLienzo()` da `{ marca, ancho, alto, u, f, peso, formato }`.
Las piezas se posicionan con `style={{ position: "absolute", left, top }}` y se apilan en orden (lo último queda encima).

| Pieza | Para qué |
|---|---|
| `Titular ancho lineas=[{texto, fuente: "titulo"\|"destacado"\|"script"\|"cuerpo", tam, color, dx, dy, giro}]` | Titular apilado con mezcla de fuentes; con `ancho` ninguna línea se desborda |
| `Texto` | Párrafo; `*palabras*` en negrita/`resalte` |
| `Foto src filtro="normal"\|"bn"\|"duotono" color recorte posicion zoom` | Foto en caja; `recorte` para PNG sin fondo (con sombra) |
| `TiraFotos fotos ancho alto angulo` | Collage de fotos en tira inclinada |
| `Pincelada color semilla relleno` | Brochazo con texto dentro |
| `Circulo diametro color borde` | Círculo/arco detrás de personas recortadas |
| `Puntos filas columnas sep tam color` | Grilla de puntos |
| `Garabato ancho grosor vueltas` | Rulo a mano para subrayar |
| `Textura nombre="Paper003"` | Papel escaneado real encima de todo (ponla al final) |
| `Grano` | Grano fino adicional |
| `Icono nombre="ph-guitar-bold" tam color` | Ícono real de `recursos/iconos/` (vectorial en el PDF) |
| `Logo alto claro` / `WhatsApp numero tam` | Marca y contacto (salen de `marca.json`). Con `isotipo` + `logoTexto` arma el logo como el original |
| `Burbuja texto lado hora leido` | Burbuja de chat tipo WhatsApp para mostrar la interfaz real |
| `Entrar desde retraso` | Animación de entrada en video; en PNG se ve el estado final |

Un post es `export default definirPost({ marca, formatos, slides: [Slide1, Slide2], caption, hashtags })`.
Las fotos se importan: `import nino from "./fotos/nino-recorte.png"`. Copia la estructura de
`posts/ejemplo/demo/post.tsx` como ejemplo.

## Formatos (`src/kit/formatos.ts`)

`instagram-carrusel` 1080×1350 (IG/FB feed) · `cuadrado` 1080×1080 · `vertical` 1080×1920 (stories, reels, TikTok;
deja libres 220 px arriba y 360 abajo) · `linkedin-documento` 1080×1350 + PDF · `x-horizontal` 1600×900 ·
`a5-impresion` y `a4-impresion` (300 ppp; el PDF editable sale al tamaño real en mm para imprenta).
Las marcas pueden tener roles de fuente extra (ej. `mono`, `cuerpoFuerte`) y fuentes itálicas (`"estilo": "italic"`).
Si piden varias redes, diseña por formato cuando la composición cambie mucho (un slide con `alto > ancho * 1.5`
necesita otra distribución, no estirar la misma).

## Calidad: revisa cada render como director de arte

Después de cada `npm run render`, **abre `vista.png` y cada PNG** y corrige antes de entregar:

1. Jerarquía: se lee primero el gancho, después el beneficio, al final el contacto/CTA.
2. Nada de texto encima de fotos con detalle, ni tocando bordes de fotos o formas (márgenes ≥ 60u).
3. Ninguna línea de titular suelta con una sola palabra; si pasa, ajusta `tam` o el salto de línea.
4. Máximo 3 fuentes por pieza (las de la marca). Contraste suficiente (texto claro solo sobre fondos oscuros).
5. Se cumplen las `reglas` de `marca.json` (logo, WhatsApp, colores) y el estilo de `referencias/`.
6. En carruseles: la portada engancha sola, cada slide tiene una idea, el último cierra con CTA,
   y hay continuidad visual entre slides (formas que cruzan de uno al siguiente, misma paleta).
7. Fotos: personas reales, alegres, del perfil de `marca.fotos`; recortes sin restos de fondo.

## Entrega

Di qué archivos quedaron (rutas de `salida/`; menciona `editable/` para retocar en Illustrator), muestra la `vista.png`, pega el `caption.txt`, y menciona
los créditos de fotos si la licencia los pide (CC-BY). Nunca publiques en redes por tu cuenta.
