---
name: crear-post
description: Diseña y exporta un post, carrusel, story, reel animado o PDF de LinkedIn para una marca de marcas/. Usar cuando pidan un arte, post, carrusel, historia, publicación, reel o video corto para un cliente.
---

# Crear post

1. **Entiende el pedido** (pregunta solo lo que no puedas deducir, máximo una pregunta):
   marca, tema/objetivo (vender, informar, educar, promo), red(es) y si lo quieren animado.
   Por defecto: Instagram carrusel 4:5 de 3 a 7 slides; "post" solo = 1 slide; "story/reel/TikTok" = `vertical`;
   LinkedIn = `linkedin-documento`.
2. **Marca**: lee `marcas/<slug>/marca.json` y mira `referencias/`. Si falta el logo, sigue con el recuadro
   provisional que pone el kit y avisa. Si la marca no existe → skill **nueva-marca**.
3. **Copy** con la voz de la marca, en español neutro (tú; sin voseo ni modismos). Portada = gancho de 3 a 8 palabras; una idea por slide; último slide con CTA y
   contacto. Titulares cortos que se puedan partir en líneas con fuentes distintas (condensada + fuerte + script).
   Escribe también `caption` y 3 a 6 `hashtags`.
   **Estructura que funciona (investigado en oct. 2026):** 7 a 10 slides; la portada promete una sola idea
   (afirmación fuerte o contraintuitiva, no "5 tips para…"); el slide 2 es un segundo gancho porque Instagram
   se lo vuelve a mostrar a quien no deslizó; formatos que se guardan: checklist, antes/después, marcos;
   un problema por slide; el cierre pide algo concreto (guardar, compartir con alguien, escribir) y es la
   consecuencia natural del carrusel. En LinkedIn el mismo carrusel va como PDF (8 a 12 páginas).
   Si la marca tiene mascota, que sea la narradora: una pose distinta por slide que actúe lo que dice el texto,
   con rango (se emociona, se preocupa, celebra), entrando con rebote en el video.
4. **Bocetos mentales**: por cada slide decide la composición antes de codificar (dónde va el titular, la foto
   protagonista, las formas, el contacto). Inspírate en `referencias/` y en `marca.estilo`. Varía la composición
   entre slides pero mantén paleta y elementos recurrentes; usa formas que crucen el borde para dar continuidad.
5. **Fotos** en `posts/<marca>/<post>/fotos/`:
   - `npm run stock -- "<búsqueda en inglés>" --destino … --cantidad 6`, mira las fotos y elige.
   - Persona protagonista → `npm run recortar` y úsala con `<Foto recorte>` sobre un `<Circulo>`.
   - Instrumentos/ambiente → `<TiraFotos>` o `<Foto filtro="bn"|"duotono">`.
   - Si el stock no sirve y hay `OPENAI_API_KEY` → `npm run imagen`. Si no hay llaves y no hay buenas fotos,
     dilo y sugiere agregar `PIXABAY_API_KEY` (gratis e inmediata en pixabay.com/api/docs).
6. **Recursos**: íconos con `npm run icono -- --buscar`, texturas con `npm run textura`; todo según `recursos/README.md`
   y las reglas de oro de `CLAUDE.md` (nada inventado: datos, logo, letras).
7. **Diseño**: crea `posts/<marca>/<aaaa-mm-tema>/post.tsx` con el kit (ejemplo: `posts/ejemplo/demo/post.tsx`).
   Usa `<Titular ancho={…}>` para que nada se desborde y `<Textura>` al final.
   Envuelve los bloques en `<Entrar retraso={…}>` con retrasos escalonados (0, 6, 12…) para que el video quede animado.
8. **Render y revisión**: `npm run render -- <marca>/<post>` (agrega `--video` si lo pidieron animado).
   Abre `vista.png` y cada PNG, revisa con la lista de calidad de `CLAUDE.md` y corrige. Repite hasta que esté
   a nivel de agencia (normalmente 2 o 3 vueltas). Si hay video, saca 3 frames con ffmpeg y revísalos.
9. **Entrega**: rutas de los archivos, `vista.png`, caption listo para pegar, créditos de fotos si aplica,
   y pregunta si quieren cambios (texto, fotos, colores) o versiones para otra red.
