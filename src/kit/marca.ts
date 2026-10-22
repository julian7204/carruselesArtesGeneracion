// Carga las marcas de marcas/<slug>/marca.json y sus archivos (logo, fuentes, fotos).

export type Fuente = { google?: string; archivo?: string; familia?: string; peso?: number; estilo?: "normal" | "italic" };

export type Marca = {
  slug: string;
  nombre: string;
  eslogan: string;
  rubro: string;
  logo: string;
  logoClaro: string;
  /** Logo armado: isotipo (imagen) + nombre compuesto con la fuente de la marca, como en el original. */
  isotipo?: string;
  logoTexto?: string;
  logoFuente?: string;
  colores: {
    primario: string;
    secundario: string;
    acento: string;
    fondo: string;
    texto: string;
    textoClaro: string;
    [extra: string]: string;
  };
  fuentes: { titulo: Fuente; destacado: Fuente; script: Fuente; cuerpo: Fuente; [extra: string]: Fuente };
  contacto: Record<string, string>;
  voz: string;
  estilo: string;
  reglas: string[];
  fotos: string;
  pendiente: string[];
};

const archivos = import.meta.webpackContext("../../marcas", {
  recursive: true,
  regExp: /\.(json|svg|png|jpe?g|webp|ttf|otf|woff2?)$/i,
});

export function cargarMarca(slug: string): Marca {
  const id = `./${slug}/marca.json`;
  if (!archivos.keys().includes(id)) throw new Error(`No existe la marca "${slug}". Créala en marcas/${slug}/marca.json`);
  return { slug, ...archivos(id) };
}

/** URL de un archivo dentro de marcas/<slug>/ (logo, fuentes, fotos de la marca). */
export function archivoMarca(slug: string, ruta: string): string | null {
  const id = `./${slug}/${ruta.replace(/^\.\//, "")}`;
  if (!archivos.keys().includes(id)) return null;
  const m = archivos(id);
  return typeof m === "string" ? m : m.default;
}

/** Nombre CSS de la familia de una fuente de la marca. */
export function familia(f: Fuente): string {
  return `"${f.familia ?? f.google ?? "sans-serif"}"`;
}

const banco = import.meta.webpackContext("../../recursos", { recursive: true, regExp: /\.(svg|png|jpe?g|webp)$/i });

/** URL de un archivo del banco de recursos (recursos/texturas, recursos/iconos…). */
export function recurso(ruta: string): string {
  const id = `./${ruta.replace(/^\.\//, "")}`;
  if (!banco.keys().includes(id)) throw new Error(`No existe recursos/${ruta}. Bájalo con npm run icono / npm run textura.`);
  const m = banco(id);
  return typeof m === "string" ? m : m.default;
}
