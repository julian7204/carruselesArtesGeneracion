---
name: nueva-marca
description: Da de alta un proyecto nuevo o completa su marca (manual, logo, colores, fuentes, contacto, voz, estilo). Usar cuando nombran una marca que no está en marcas/, cuando traen un manual de marca o logo, o cuando marca.json tiene pendientes.
---

# Nueva marca

Objetivo: dejar `marcas/<slug>/marca.json` lo bastante completo para diseñar sin volver a preguntar.
La persona no programa: pide las cosas de a poco, en lenguaje simple, y haz tú todo el trabajo.

1. **Slug**: nombre en minúsculas con guiones (`Scale Com` → `scale-com`). Copia `marcas/_plantilla/marca.json`.
2. **Pide lo que tengan, en este orden** (una o dos cosas por mensaje, acepta "no tengo"):
   - Manual de marca (PDF o imágenes) → guárdalo como `manual.pdf` o en `referencias/`. Léelo y saca de ahí todo lo que puedas.
   - Logo (ideal PNG transparente o SVG; también versión para fondo oscuro) → `logo.png` / `logo-claro.png`.
     Si mandan un logo con fondo, quítalo con `npm run recortar` y revisa el resultado.
   - 2 a 6 artes anteriores o que les gusten → `referencias/`. Míralas y describe su estilo en `estilo`
     (formas, fotos, tratamiento B/N o duotono, composición, texturas).
   - Contacto: WhatsApp, web, Instagram, dirección.
   - A quién le venden y cómo hablan → `rubro` y `voz`.
3. **Colores**: del manual, o muestreados de logo y referencias (con sharp, colores dominantes). Usa hex exactos.
4. **Fuentes**: si el manual nombra fuentes de Google Fonts, ponlas como `{ "google": "Nombre" }`.
   Si son propias y te pasan los archivos, guárdalos en `fuentes/` y usa `{ "archivo": "fuentes/x.ttf", "familia": "X", "peso": 700 }`.
   Si no se sabe, elige equivalentes de Google Fonts parecidas a las referencias y anótalo en `pendiente`.
   Después corre `npm run fuentes -- <slug>` para bajar los TTF estáticos (render sin internet y PDF editable con texto real).
   Roles: `titulo` (impacto, suele ser condensada), `destacado` (sans pesada), `script` (manuscrita para remates), `cuerpo`.
5. **reglas**: lo obligatorio que veas repetido (logo arriba a la izquierda, siempre WhatsApp, etc.).
6. **pendiente**: lista lo que falta. Bórralo de la lista cuando llegue.
7. Para comprobar, haz un post de prueba de 1 slide con la skill **crear-post** y muéstralo.

Cierra con un resumen corto: qué quedó cargado y qué falta.
