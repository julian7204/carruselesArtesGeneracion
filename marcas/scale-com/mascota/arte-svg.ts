// GENERADO desde scaleCom (scripts/exportar-mascota.mjs, ADR-0074). No editar aquí: cambia scaleCom y vuelve a exportar.
// ADR-0074: el dibujo del personaje, por partes, como texto SVG. Es la única fuente del dibujo:
// lo usa el panel (React, personaje.tsx) y la landing (Astro), que lo recibe con
// scripts/exportar-mascota.mjs. Sin imports. Cada `data-p` lo mueve el motor; lo que cambia de forma
// (boca, ojos, cejas, piezas, medalla) lo decide CSS con data-* en la raíz (app/personaje.css).
// Los `transform` de aquí son la pose de reposo: así la mascota quieta no necesita JS.

const BRAZO = '<path class="p-brazo" d="M0 0q7.5 1.8 13-.5"/><circle class="p-mano" cx="15" cy="0" r="3.8"/>';

const CABEZA = `<g>
<g class="pz pz-cinta"><path class="pz-rojo" d="M9 18 72 16l-.6 6.5L9 24.5Z"/><g data-p="colaCinta"><path class="pz-rojo" d="M9 19.5 1 15l1 4.2ZM9 22.5l-8 3.6 3.2 2.4Z"/></g></g>
<g class="pz pz-auriculares"><path class="pz-banda" d="M6 34C6 6 74 6 74 34"/><rect class="pz-blanco" x="1" y="30" width="9" height="16" rx="3"/><rect class="pz-blanco" x="70" y="30" width="9" height="16" rx="3"/><path class="pz-banda" d="M5 46c0 8 7 12 16 12"/><circle class="pz-cuerpo" cx="22" cy="58" r="2.8"/></g>
<g class="pz pz-gorra"><path class="pz-rojo" d="M13 15C15 3 63 0 69 12l.8 4.5H12.5Z"/><path class="pz-rojo-osc" d="M60 13.5h17.5c2.4 0 2.4 4.5 0 4.5H58Z"/><circle class="pz-blanco" cx="40" cy="4" r="2.4"/></g>
<g class="pz pz-corona"><path class="pz-oro" d="M24 10 28-3l7 7 5-10 5 10 7-7 4 13Z"/><circle class="pz-gema" cx="40" cy="5" r="2.3"/></g>
<g class="pz pz-birrete"><path class="pz-birrete-base" d="M28 7.5v5.5c0 2.6 5.4 4.5 12 4.5s12-1.9 12-4.5V7.5"/><path class="pz-birrete-tapa" d="M40-4 67 5 40 14 13 5Z"/><path class="pz-borla-hilo" d="M63 6.5v10"/><circle class="pz-oro" cx="63" cy="18.5" r="2.6"/></g>
</g>`;

const GAFAS = `<g class="pz pz-gafas"><rect x="20" y="27.5" width="13.5" height="9.5" rx="3.4"/><rect x="43.5" y="27.5" width="13.5" height="9.5" rx="3.4"/><path d="M33.5 31h10M20 30.5l-8-3M57 30.5l8-3"/><path class="pz-reflejo" d="M23 30.2l3.5-1.5M46.5 30.2l3.5-1.5"/></g>`;

const CUELLO = `<g>
<g class="pz pz-bufanda"><g data-p="cola"><path class="pz-rojo" d="M18 62l-4 16 7-3 2-12Z"/></g><path class="pz-rojo" d="M12 58c10 6 34 8 52 1l-2 7c-16 6-36 5-49-1Z"/></g>
<g class="pz pz-corbatin"><path class="pz-rojo" d="M32 63l7 4-7 4ZM48 63l-7 4 7 4Z"/><circle class="pz-rojo" cx="40" cy="67" r="2.2"/></g>
<g class="pz pz-cadena"><path class="pz-cadena-hilo" d="M22 59q18 14 36 0"/><circle class="pz-oro" cx="40" cy="70" r="4.2"/><path class="pz-signo" d="M41.4 68.2c-.4-.5-1-.7-1.6-.7-1 0-1.6.5-1.6 1.2 0 1.6 3.4 1 3.4 2.7 0 .7-.7 1.3-1.7 1.3-.7 0-1.3-.3-1.7-.8M40 66.4v7.2"/></g>
</g>`;

/** Lo que sostiene la mano derecha. Origen (0,0) = la mano; el motor lo mantiene derecho. */
const MANO = `<g>
<g class="pz pz-lupa"><path class="pz-banda" d="M0 0 4-4"/><circle class="pz-lente" cx="9" cy="-9" r="6.8"/><path class="pz-brillo" d="M6.5-11.5a4 4 0 0 1 3-1.4"/></g>
<g class="pz pz-caja"><rect class="pz-carton" x="-3" y="-19" width="22" height="18" rx="2"/><path class="pz-cinta-caja" d="M-3-13h22M8-19v6"/></g>
<g class="pz pz-celular"><rect class="pz-tinta" x="-1" y="-16" width="10" height="17" rx="2.4"/><rect class="pz-pantalla" x=".6" y="-13.6" width="6.8" height="11" rx="1"/><path class="pz-notif" d="M2-11h4M2-8.5h3"/></g>
<g class="pz pz-moneda"><circle class="pz-oro" cx="6" cy="-8" r="8"/><path class="pz-signo" d="M8.4-11.3c-.6-.7-1.6-1.1-2.6-1.1-1.6 0-2.7.8-2.7 2.1 0 2.9 5.6 1.6 5.6 4.5 0 1.3-1.2 2.2-2.9 2.2-1.2 0-2.2-.5-2.9-1.3M6-14v12"/></g>
<g class="pz pz-pin"><path class="pz-blanco" d="M6-24c-5.5 0-9 3.8-9 8.6C-3-9.2 6 0 6 0s9-9.2 9-15.4C15-20.2 11.5-24 6-24Z"/><circle class="pz-cuerpo" cx="6" cy="-15.4" r="3.2"/></g>
</g>`;

const CARA = `<g data-p="cara">
<g data-p="ojos"><rect class="p-ojo p-ojo-i" x="23.5" y="27.5" width="7" height="11" rx="3.5"/><rect class="p-ojo p-ojo-d" x="46.5" y="27.5" width="7" height="11" rx="3.5"/></g>
<path class="p-linea p-ojos-cerrados" d="M23.5 34.5q3.5 3.2 7 0M46.5 34.5q3.5 3.2 7 0"/>
<path class="p-linea p-ojos-felices" d="M23.5 35q3.5-4.2 7 0M46.5 35q3.5-4.2 7 0"/>
<path class="p-linea p-ojos-x" d="M24 30l6 6M30 30l-6 6M47 30l6 6M53 30l-6 6"/>
<path class="p-linea p-ojo-guino" d="M46.5 34.5q3.5 3.2 7 0"/>
<g class="p-cejas"><path class="p-linea p-ceja-i" d="M22 24.5q4.5-2.6 9 0"/><path class="p-linea p-ceja-d" d="M46 24.5q4.5-2.6 9 0"/></g>
<ellipse class="p-mejilla" cx="19.5" cy="45" rx="4" ry="2.4"/><ellipse class="p-mejilla" cx="57.5" cy="45" rx="4" ry="2.4"/>
<g data-p="boca">
<path class="p-linea p-boca p-boca-sonrisa" d="M28 46c0 7.5 5.2 12.5 10.5 12.5S49 53.5 49 46"/>
<g class="p-boca p-boca-abierta"><path class="p-boca-hueco" d="M28 46h21c0 7.5-5.2 12.5-10.5 12.5S28 53.5 28 46Z"/><path class="p-lengua" d="M33.5 55.6c1.4-2.4 8.6-2.4 10 0-1.6 1.8-3.3 2.9-5 2.9s-3.4-1.1-5-2.9Z"/></g>
<ellipse class="p-boca p-boca-o p-boca-hueco" cx="38.5" cy="51" rx="4.2" ry="5.2"/>
<path class="p-linea p-boca p-boca-plana" d="M31 51.5h15"/>
<path class="p-linea p-boca p-boca-triste" d="M29 56c2-5 6-7 9.5-7s7.5 2 9.5 7"/>
<path class="p-linea p-boca p-boca-creida" d="M29 49c5 5 14 6 20-3"/>
</g>
${GAFAS}
</g>`;

/** Utilería por gesto (data-gesto / data-utileria): lo que saca según lo que está haciendo. */
const UTILERIA_ATRAS = `<g class="ut ut-gorro"><path class="ut-gorro-tela" d="M17 14C20 1 42-7 59 12Z"/><path class="ut-gorro-punta" d="M38-1C24-3 11 5 7 18"/><circle class="ut-blanco" cx="7" cy="20" r="3.6"/><path class="ut-gorro-borde" d="M16 14.5h44"/></g>`;

const UTILERIA = `<g>
<g class="ut ut-teclado"><path class="ut-tinta" d="M15 61h50l5 10H10Z"/><path class="ut-teclas" d="M17 64.5h46M15.5 67.8h49"/><rect class="ut-tecla ut-tecla-1" x="22" y="63" width="6" height="3" rx="1"/><rect class="ut-tecla ut-tecla-2" x="44" y="66.2" width="7" height="3" rx="1"/><rect class="ut-tecla ut-tecla-3" x="33" y="63" width="6" height="3" rx="1"/></g>
<g class="ut ut-celular"><rect class="ut-tinta" x="31" y="55" width="17" height="21" rx="3"/><rect class="ut-pantalla" x="33" y="58" width="13" height="14" rx="1.5"/><circle class="ut-punto ut-p1" cx="36" cy="65" r="1.3"/><circle class="ut-punto ut-p2" cx="39.5" cy="65" r="1.3"/><circle class="ut-punto ut-p3" cx="43" cy="65" r="1.3"/></g>
<g class="ut ut-burbuja"><path class="ut-blanco" d="M62-12h16a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5h-9l-5 5 1-5h-3a5 5 0 0 1-5-5v-5a5 5 0 0 1 5-5Z"/><circle class="ut-punto ut-p1" cx="65" cy="-4.5" r="1.6"/><circle class="ut-punto ut-p2" cx="70" cy="-4.5" r="1.6"/><circle class="ut-punto ut-p3" cx="75" cy="-4.5" r="1.6"/></g>
<g class="ut ut-pensamiento"><circle class="ut-blanco" cx="63" cy="7" r="1.8"/><circle class="ut-blanco" cx="68" cy="1" r="2.8"/><path class="ut-blanco" d="M70-8a6 6 0 0 1 9-6 6 6 0 0 1 10 1 5 5 0 0 1 0 10 6 6 0 0 1-10 2 6 6 0 0 1-9-7Z"/><path class="ut-signo" d="M77.5-10.5a2.6 2.6 0 1 1 3 2.6c-.8.3-1.2.8-1.2 1.6v.6M79.3-2.6v.1"/></g>
<g class="ut ut-nube"><path class="ut-nube-gris" d="M60 2a5 5 0 0 1 8-4 6 6 0 0 1 11 2 4 4 0 0 1 0 8H61a3.5 3.5 0 0 1-1-6Z"/><path class="ut-lluvia" d="M64 11l-1 3M70 11l-1 3M76 11l-1 3"/></g>
</g>`;

const MEDALLA = '<g class="pz-medalla"><path class="pz-medalla-cinta" d="M17 44l4 10 4-10"/><circle class="pz-medalla-disco" cx="21" cy="58" r="6.5"/><path class="pz-brillo" d="M18.5 56.5l1.5 1.5 3.5-3.5"/></g>';

const AURA = `<g><path class="pz pz-facetas" d="M14 22 34 10M60 9 70 30M10 46 26 62M50 66 66 50"/>
<g class="pz pz-brillos"><path d="M-4 8l2-6 2 6 6 2-6 2-2 6-2-6-6-2Z"/><path d="M76 18l1.5-4 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5Z"/><path d="M70 70l1.2-3.2 1.2 3.2 3.2 1.2-3.2 1.2-1.2 3.2-1.2-3.2-3.2-1.2Z"/></g></g>`;

export const ARTE_SVG = `<svg viewBox="0 0 80 92" focusable="false" aria-hidden="true">
<ellipse class="pz pz-dorada" cx="40" cy="42" rx="46" ry="46"/>
<ellipse data-p="sombra" class="p-sombra" cx="40" cy="88" rx="24" ry="2.6" opacity=".14"/>
<g data-p="raiz">
<g data-p="brazoI" transform="translate(12 46) scale(-1 1) rotate(115)">${BRAZO}</g>
<g data-p="brazoD" transform="translate(66 44) rotate(115)">${BRAZO}<g data-p="manoD" transform="translate(15 0) rotate(-115)">${MANO}</g></g>
<g data-p="ruedaI"><circle class="p-rueda" cx="28" cy="77" r="6"/><circle class="p-buje" cx="30" cy="76" r="1.6"/></g>
<g data-p="ruedaD"><circle class="p-rueda" cx="54" cy="77" r="6"/><circle class="p-buje" cx="56" cy="76" r="1.6"/></g>
<path class="p-cuerpo" d="M25 5h45.5c2.6 0 4.4 2.4 3.7 4.9L65.6 61c-1 4.6-5 7-9.6 7H22C13.7 68 8 62.3 8 54V22C8 12.6 15.6 5 25 5Z"/>
<path class="p-sombra-cuerpo" d="M8 49c0 9 6.5 15 14.5 15H56c4 0 7.4-2 8.6-5.6L65.6 61c-1 4.6-5 7-9.6 7H22C13.7 68 8 62.3 8 54Z"/>
<path class="p-luz" d="M25 9h22C33 10 21 16 13 29v-6C13 15 18 10 25 9Z"/>
<path class="p-franja" d="M20 15.5h43"/>
${CARA}${CUELLO}${MEDALLA}${UTILERIA_ATRAS}${CABEZA}${UTILERIA}${AURA}
</g>
<g data-p="fx" class="p-fx"></g>
</svg>`;
