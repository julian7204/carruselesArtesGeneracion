// Tamaños por red. Revisa las specs de cada red de vez en cuando: cambian.

export type Formato = {
  ancho: number;
  alto: number;
  redes: string;
  // Márgenes extra donde la app tapa el contenido (botones, nombre de usuario, caption).
  zonaSegura?: { arriba: number; abajo: number };
  pdf?: boolean; // además de PNGs, exporta un PDF (carrusel de documento de LinkedIn)
  mm?: { ancho: number; alto: number }; // tamaño físico: el PDF editable sale a esa medida para imprenta
};

export const formatos = {
  "instagram-carrusel": { ancho: 1080, alto: 1350, redes: "Instagram y Facebook (feed 4:5)" },
  cuadrado: { ancho: 1080, alto: 1080, redes: "Instagram, Facebook y LinkedIn (1:1)" },
  vertical: {
    ancho: 1080,
    alto: 1920,
    redes: "Stories, Reels, TikTok foto y video (9:16)",
    zonaSegura: { arriba: 220, abajo: 360 },
  },
  "linkedin-documento": { ancho: 1080, alto: 1350, redes: "LinkedIn carrusel PDF (4:5)", pdf: true },
  "x-horizontal": { ancho: 1600, alto: 900, redes: "X y LinkedIn imagen horizontal (16:9)" },
  "a5-impresion": { ancho: 1748, alto: 2480, redes: "Afiche A5 impreso (148×210 mm a 300 ppp)", mm: { ancho: 148, alto: 210 } },
  "a4-impresion": { ancho: 2480, alto: 3508, redes: "Afiche A4 impreso (210×297 mm a 300 ppp)", mm: { ancho: 210, alto: 297 } },
} satisfies Record<string, Formato>;

export type NombreFormato = keyof typeof formatos;

export const nombresFormato = Object.keys(formatos) as NombreFormato[];

export function obtenerFormato(nombre: string): Formato {
  const f = (formatos as Record<string, Formato>)[nombre];
  if (!f) throw new Error(`Formato "${nombre}" no existe. Usa: ${nombresFormato.join(", ")}`);
  return f;
}
