# Patrones de diseño que funcionan (banco de ideas)

Recolectado en Pinterest el 2026-10-26 con el filtro **"Less AI"** activado (`&filter_genai=true` en la URL),
mirando posts estáticos, anuncios de producto y carruseles reales de estudios y marcas.
No se copian artes: se anotan **mecanismos** (por qué funciona y cómo hacerlo con el kit).

**Cómo usarlo:** antes de diseñar, elige 1 patrón principal + 1 recurso de apoyo de esta lista para cada pieza.
No mezcles más de dos ideas fuertes en un mismo slide. Anota en el `post.tsx` (comentario arriba) qué patrón usaste.

---

## A. Posts estáticos y anuncios de un solo slide

Un post suelto tiene un segundo para ganar. Los mejores tienen **una sola idea visual** que se entiende sin leer.

| # | Patrón | Cómo se ve | Cuándo usarlo | Cómo hacerlo aquí |
|---|---|---|---|---|
| A1 | **Interfaz secuestrada** | La pantalla de una llamada entrante ("Una vida sin X te está llamando…" con botones Rechazar / Aceptar), una notificación, un buscador, un chat | Productos digitales, servicios, apps, WhatsApp | Reconstruir la interfaz con divs y fuentes de la marca (nunca captura con datos reales). Botones con íconos reales (`ph:phone-fill`, `simple-icons:whatsapp`) |
| A2 | **"La búsqueda / La solución"** | Arriba una barra de búsqueda con la pregunta del cliente ("cómo dejar de…"), abajo el producto como respuesta | Productos que resuelven un dolor concreto | Barra con ícono de lupa + texto en `cuerpo`; producto recortado con sombra suave |
| A3 | **Problemas vs. solución** | Pantalla partida: a la izquierda etiquetas de problemas sueltas y algo desordenadas, a la derecha el producto limpio | Lanzamientos, comparaciones | Dos columnas; problemas como `Pill` con leve giro (±3°) y desfase; lado derecho con más aire |
| A4 | **Reseñas orbitando** | Producto en mano al centro, 4–6 tarjetas de reseña con estrellas flotando alrededor | Prueba social | **Solo con reseñas reales** del cliente. Tarjetas con giros pequeños distintos y sombra corta |
| A5 | **Tipografía detrás del sujeto** | Palabra gigante (JUST DO IT, BLACK FRIDAY) y la persona/producto recortado encima tapando parte de las letras | Promos, lanzamientos, frases de marca | `npm run recortar` + `Titular` gigante debajo en el orden de capas. La palabra puede salirse del borde |
| A6 | **Número gigante** | "50%", "70%" ocupando medio arte; foto o producto metido dentro o encima del número | Descuentos, estadísticas | `fitText` para que el número llene el ancho; repetirlo en contorno detrás (eco) da profundidad |
| A7 | **Producto héroe en escena real** | Foto cenital: el protector solar enorme sobre una playa vista desde arriba; la bebida sobre un mapa | Producto físico, e-commerce | Foto de stock de la escena + producto recortado a escala exagerada + sombra proyectada coherente |
| A8 | **Papel rasgado / agujero** | Un fondo de color "rasgado" que deja ver el producto o la foto | Lanzamientos, "próximamente" | Máscara SVG con borde irregular (semilla fija) + textura de papel encima |
| A9 | **Antes / después en 2 fotos** | Dos fotos iguales en encuadre con un cambio de expresión ("yo antes del café / después") | Humor, transformaciones | Dos `Foto` del mismo tamaño, título corto en mono encima de cada una, fondo plano |
| A10 | **Diagrama hecho a mano** | Venn o flechas dibujadas a mano en pizarra/papel, producto en mano entrando al cuadro | Educación, beneficios | Fuente `nota` (manuscrita) + trazos SVG con temblor leve; foto real de la mano/producto |
| A11 | **Interruptores / UI como gráfico** | Lista de días con toggles, el activo en color de marca | Horarios, agenda, "elige tu plan" | Componentes de UI dibujados con el kit; un solo elemento activo con el color de acento |
| A12 | **Sombra proyectada** | Solo la sombra de una mano con un teléfono sobre una pared con textura, texto dentro de la sombra | "Próximamente", teasers | Silueta recortada en negro con `blur` + `multiply` sobre textura de pared (ambientCG) |
| A13 | **Teléfono en contexto real** | El celular asomando de un bolsillo de jean, en una mano a contraluz, borde de un teléfono enorme saliéndose del marco | Apps y software | Mockup de teléfono + captura **real** del producto; recortar el teléfono con el borde del lienzo |
| A14 | **Sello / insignia** | Círculo amarillo "¡Corre! Termina el domingo" pegado encima, girado | Urgencia, fechas límite | Círculo de color fuerte con texto en 2–3 líneas, giro 8–12°, que tape un poco la foto |

### Tipos de promoción (de los que más se repiten)
- **Descuento**: número enorme + foto en B/N + un solo color fuerte (rojo, rosa, lima). Nada de 4 colores.
- **Black Friday / temporada**: palabra repetida en contorno (eco) o persona delante de la palabra (A5).
- **Lanzamiento de app**: teléfono negro con brillo sutil, fondo de un color plano saturado, "Descarga X hoy" + insignias reales de las tiendas.
- **Horario / apertura**: foto ambiente oscura (mesa, café) + titular condensado blanco + horarios en mayúsculas pequeñas con mucho espacio entre letras.

---

## B. Carruseles

| # | Patrón | Cómo se ve | Cómo hacerlo aquí |
|---|---|---|---|
| B1 | **Portada editorial con mezcla de fuentes** | "4 TYPES / *of carousels that are going* / VIRAL / IN *2026*": palabras clave en sans condensada pesada a color, conectores en serif itálica fina blanca, sobre una foto de paisaje con mucho aire | `Titular` con líneas alternadas `destacado` (color) y `script`/serif (blanco). Foto de stock real abajo, texto en el tercio superior |
| B2 | **Persona + "Te explico"** | Foto de una persona mirando el celular, titular gigante arriba con una palabra en serif itálica de color, abajo "DÉJAME EXPLICARTE →" | Funciona para marcas personales. La palabra emocional va en otra fuente y otro color |
| B3 | **Pie de slide fijo** | Abajo en todos: @usuario a la izquierda, "guárdalo" con ícono en el centro, flecha → a la derecha. Arriba a la izquierda "1/10" en una pastilla translúcida | Componente `PieCarrusel` repetido; el contador ayuda a que deslicen |
| B4 | **Números gigantes 01 / 02 / 03** | Cada slide de una lista con su número enorme en sans fina, foto cálida detrás, texto corto debajo | Listas de consejos o pasos. Número en `titulo` peso liviano a 400–500u |
| B5 | **Minúsculas pesadas, interlineado apretado** | "ideas build brands." en sans negra muy pesada, interlineado 0.9, punto final, fondo crema; alterna con slides de foto | Sensación de estudio de diseño. `letterSpacing: -0.04em`, `lineHeight: 0.9` |
| B6 | **Carrusel panorámico (seamless)** | Una sola imagen larga partida en 5–10 slides: fotos, formas y textos que cruzan de un slide al siguiente | Diseñar en un lienzo de `ancho × N` y recortar por slide; nunca cortar un texto entre dos slides, sí fotos y formas |
| B7 | **Collage de recortes** | Fotos tipo polaroid, cinta adhesiva, papel rasgado, estrellas dibujadas, todo un poco torcido | Viajes, detrás de escena, comunidad. Textura de papel + giros −6° a 6° + sombras cortas |
| B8 | **Producto con flechas y etiquetas** | "Outfit check": persona en B/N al centro, líneas finas que salen a miniaturas de cada producto con nombre y precio | Catálogo, e-commerce. Líneas de 2u, miniaturas en caja blanca, texto en mono pequeño |
| B9 | **Tarjetas de UI recortadas por el borde** | Tarjetas de la interfaz (gráficos, montos, recordatorios) en perspectiva, saliéndose del slide y continuando en el siguiente | SaaS. Capturas reales o UI reconstruida con datos de ejemplo marcados como tales |
| B10 | **Foto + titular corto + UI flotante** | Foto real de una persona trabajando, titular de 2 líneas arriba ("Menos escribir. Más hacer."), una tarjeta de UI pequeña flotando sobre la foto | SaaS con cara humana. Una sola tarjeta por slide |

### Estructura de carrusel (lo que se repite en los que tienen más guardados)
1. Portada: una sola frase grande, con contraste de fuentes en la palabra clave.
2. Slide 2: segundo gancho o promesa ("en 5 pasos", "te lo explico").
3. Una idea por slide, siempre con el mismo esqueleto (número, titular, 1–2 líneas, imagen).
4. Penúltimo: resumen o checklist (lo que se guarda).
5. Último: llamada a la acción + "guárdalo / compártelo" + contacto.

---

## C. Mascotas y personajes 3D

| # | Patrón | Cómo se ve | Cómo hacerlo aquí |
|---|---|---|---|
| C1 | **Mascota en el mundo real** | Personajes caminando por una calle real (foto), con texto gigante detrás | Foto de stock de calle o local + mascota con sombra de contacto fuerte bajo los pies. Esto es lo que más la saca de "ilustración de IA" |
| C2 | **Mascota que rompe el marco** | Sostiene un marco de fotos o sale de él; parte del cuerpo fuera del recuadro | Recuadro con borde + mascota en capa superior que lo sobrepasa |
| C3 | **Mascota enorme y cortada** | Ocupa 70% del arte, cortada por el borde inferior o lateral, con tipografía grande detrás | `ancho` > lienzo y `left`/`bottom` negativos. Funciona como portada |
| C4 | **Mascota con etiquetas** | Varias poses, cada una con una pastilla de color (GAMING, BUSINESS) y una frase corta | Hojas de "modos" o beneficios: una pose por beneficio |
| C5 | **Pegatina** | Mascota con borde blanco grueso, girada, como sticker pegado, con precio en estallido | Borde con `drop-shadow` blanco repetido + sombra corta; útil para promos |
| C6 | **Iluminación de producto** | Fondo oscuro, luz de estudio, la mascota como juguete de colección | Fondo con viñeta suave (sin glow de colores), sombra realista |

Regla: la mascota **reacciona** a lo que dice el slide (cansada, celebrando, pensando). Nunca la misma pose en dos slides seguidos.

---

## D. Tipografía (lo que separa lo profesional de la plantilla)

- **Contraste de familias**: sans muy pesada para la palabra clave + serif itálica fina o manuscrita para el conector. Una sola palabra en color.
- **Escala extrema**: un elemento enorme (palabra, número) y el resto chico. Nada mediano.
- **Interlineado apretado** en titulares (0.85–0.95) y espaciado negativo en pesos altos.
- **Texto pequeño en las esquinas** al estilo suizo: fecha, número de edición, nombre del estudio, en mono o sans de 18–22u. Da sensación de pieza editorial.
- **Imágenes dentro del texto**: una foto pequeña en píldora reemplazando o separando palabras de la frase.
- **Palabras que se salen del borde** (JU / NE cortado), siempre que la palabra se siga leyendo.
- **Eco**: la misma palabra repetida en contorno detrás, 3–5 veces desplazada.

## E. Color y fondo

- Un color dominante + negro/crema + **un solo** acento. Las paletas que funcionan tienen 2 colores, no 5.
- Fondos con textura real (papel, pared con relieve, concreto) en vez de plano digital.
- Fotos en B/N con un solo color de marca encima es la combinación más repetida en los que no parecen plantilla.

## F. Lo que se ve "de plantilla" o "de IA" (evitar)

- Degradados morado-azul con objetos 3D de vidrio brillante y robots genéricos.
- Cuadrículas de 9 slides todos con el mismo esquema y la misma foto de banco de oficina sonriendo.
- Íconos 3D de plástico flotando (candados, cohetes) sin relación con el producto.
- Personajes 3D con brillo cian/morado tipo "AI agent".
- Demasiados elementos decorativos (estrellas, chispas, garabatos) sin función.

---

## Para seguir alimentando este banco

Búsquedas útiles (todas con el filtro "Less AI"):

- https://www.pinterest.com/search/pins/?q=social%20media%20post%20design%20creative&filter_genai=true
- https://www.pinterest.com/search/pins/?q=product%20ad%20design%20static%20instagram&filter_genai=true
- https://www.pinterest.com/search/pins/?q=sale%20promo%20post%20design%20bold&filter_genai=true
- https://www.pinterest.com/search/pins/?q=tech%20app%20launch%20social%20media%20post&filter_genai=true
- https://www.pinterest.com/search/pins/?q=instagram%20carousel%20design&filter_genai=true
- https://www.pinterest.com/search/pins/?q=seamless%20instagram%20carousel&filter_genai=true
- https://www.pinterest.com/search/pins/?q=saas%20instagram%20post%20design&filter_genai=true
- https://www.pinterest.com/search/pins/?q=3d%20mascot%20social%20media%20post%20design&filter_genai=true
- https://www.pinterest.com/search/pins/?q=swiss%20typography%20instagram%20post&filter_genai=true

Al agregar un patrón: nombre corto, cómo se ve, cuándo usarlo y cómo hacerlo con el kit. Sin copiar el arte de nadie.
