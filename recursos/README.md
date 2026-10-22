# Banco de recursos

Todo lo que entra a un arte sale de aquí o de la carpeta de la marca, **nunca se inventa**.
Fuentes verificadas el 2026-10-19 (APIs probadas y licencias leídas de la propia fuente).
Cada descarga deja su licencia anotada junto al archivo.

## Qué usar para cada cosa

| Necesito | De dónde | Comando | Licencia |
|---|---|---|---|
| Fotos de personas, lugares, productos genéricos | [Pexels](https://www.pexels.com/api/) (llave gratis; pausó llaves nuevas en oct. 2026) | `npm run stock` | Pexels License: uso comercial, sin atribución. No vender la foto tal cual ni sugerir que la persona respalda la marca. |
| Fotos de personas (llave inmediata) | [Pixabay](https://pixabay.com/api/docs/) (llave gratis) | `npm run stock` | Pixabay Content License: uso comercial, sin atribución. Prohíbe enlazar sus URLs: el script siempre descarga. |
| Alternativa de fotos | [Unsplash](https://unsplash.com/developers) (llave gratis) | `npm run stock` | Unsplash License, parecida a Pexels. El script registra cada descarga como pide su API. |
| Fotos sin llave (objetos, instrumentos, ciudades) | [Openverse](https://openverse.org) filtrado a CC0 y dominio público | `npm run stock` | CC0 / PDM. Sirve poco para personas y niños. |
| Íconos | [Iconify](https://iconify.design): más de 200 000 íconos de colecciones abiertas | `npm run icono -- --buscar "guitar"` | Depende de la colección (queda en `iconos/licencias.json`). Preferir **ph** (MIT), **tabler** (MIT), **lucide** (ISC), **mdi** (Apache 2.0), **hugeicons** (MIT). Evitar las CC BY (solar, streamline-freehand) salvo que se ponga el crédito. |
| Logos de redes (WhatsApp, Instagram, TikTok…) | [Simple Icons](https://simpleicons.org) vía Iconify (`simple-icons:whatsapp`) | `npm run icono` | CC0 el dibujo; la marca es de su dueño: úsalos solo para indicar la red, sin deformarlos ni cambiarles la forma. |
| Tipografías | [Fontsource](https://fontsource.org) (todo Google Fonts, por peso, con licencia) | `npm run fuentes -- <marca>` | OFL / Apache, uso comercial libre. Las fuentes propias del cliente van en `marcas/<marca>/fuentes/`. |
| Texturas de papel, cartón, concreto, tela | [ambientCG](https://ambientcg.com) (escaneos reales) | `npm run textura -- paper` | CC0. |
| Quitar fondo a personas u objetos | `@imgly/background-removal-node` (local) | `npm run recortar` | AGPL (uso interno ok). |
| Escenas que no existen en stock, fondos | OpenAI Images (`OPENAI_API_KEY`) | `npm run imagen` | Propias. Solo fondos y ambientes: ver reglas abajo. |
| Ilustraciones de personas (si la marca usa ilustración) | [Open Peeps](https://www.openpeeps.com), [Open Doodles](https://www.opendoodles.com) | manual, a `recursos/ilustraciones/` | CC0. Solo si `marca.estilo` es ilustrado: en marcas fotográficas se ven genéricas. |

## Lo que ya está descargado

- `texturas/Paper003.jpg` (papel arrugado blanco), `texturas/Paper006.jpg` (papel beige), `texturas/Cardboard004.jpg` (cartón). Ver `texturas/creditos.json`.
- `iconos/simple-icons-whatsapp.svg` (lo usa `<WhatsApp>`).

## Por qué así (y no "que la IA lo dibuje")

- **Texto**: los generadores de imagen deforman letras y tildes. Aquí el texto siempre se compone con las
  fuentes de la marca, así sale exacto y queda editable en el PDF.
- **Logo**: se usa el archivo oficial del proyecto tal cual. Si no lo hay, el kit muestra un recuadro "LOGO …" para que
  se note que falta. Nunca se redibuja, se vectoriza a ojo ni se genera.
- **Íconos y logos de redes**: de colecciones reales, no trazados a mano en el código.
- **Fotos**: personas reales de stock se ven reales. La IA queda para lo que no existe.
