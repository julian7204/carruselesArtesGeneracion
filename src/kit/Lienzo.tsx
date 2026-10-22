import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { continueRender, delayRender, getInputProps } from "remotion";
import { obtenerFormato, type Formato } from "./formatos";
import { archivoMarca, familia, type Marca } from "./marca";

type Lienzo = {
  marca: Marca;
  formato: Formato;
  ancho: number;
  alto: number;
  /** Unidad de escala: 1 en un lienzo de 1080 de lado corto. Multiplica todos los tamaños por u. */
  u: number;
  /** Familias CSS listas para usar en fontFamily, por rol (titulo, destacado, script, cuerpo y los extra de la marca). */
  f: Record<RolFuente, string>;
  /** Estilo (normal/italic) de cada rol. */
  estilo: Record<RolFuente, "normal" | "italic">;
  /** true al exportar el PDF editable: se omiten efectos que obligan a rasterizar (grano). */
  editable: boolean;
  /** Pesos por defecto de cada rol. */
  peso: Record<RolFuente, number>;
};

export type RolFuente = "titulo" | "destacado" | "script" | "cuerpo" | (string & {});

const Ctx = createContext<Lienzo | null>(null);

export function useLienzo(): Lienzo {
  const l = useContext(Ctx);
  if (!l) throw new Error("useLienzo() se usa dentro de un slide");
  return l;
}

const fuentesCargadas = new Set<string>();

function useFuentes(marca: Marca): boolean {
  const [handle] = useState(() => delayRender(`fuentes de ${marca.slug}`));
  const [listo, setListo] = useState(false);
  useEffect(() => {
    const tareas: Promise<unknown>[] = [];
    const google: string[] = [];
    for (const f of Object.values(marca.fuentes)) {
      if (f.archivo) {
        const url = archivoMarca(marca.slug, f.archivo);
        const clave = `${f.familia}-${f.peso}-${f.estilo}-${url}`;
        if (url && !fuentesCargadas.has(clave)) {
          fuentesCargadas.add(clave);
          const ff = new FontFace(f.familia ?? "Marca", `url(${url})`, { weight: String(f.peso ?? 400), style: f.estilo ?? "normal" });
          tareas.push(ff.load().then((x) => document.fonts.add(x)));
        }
      } else if (f.google && !google.includes(f.google)) {
        google.push(f.google);
      }
    }
    // API v1 de Google Fonts: entrega archivos estáticos por peso (no variables), así el PDF editable
    // incrusta fuentes TrueType normales que Illustrator reconoce como texto.
    if (google.length) {
      const href = `https://fonts.googleapis.com/css?family=${google.map((g) => `${g.replace(/ /g, "+")}:400,500,600,700,800,900`).join("|")}&display=block`;
      if (!document.querySelector(`link[href="${href}"]`)) {
        tareas.push(
          new Promise<void>((ok) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.onload = link.onerror = () => ok();
            document.head.appendChild(link);
          }),
        );
      }
    }
    Promise.all(tareas)
      .then(() => Promise.all(Object.values(marca.fuentes).map((f) => document.fonts.load(`${f.estilo === "italic" ? "italic " : ""}${f.peso ?? 400} 40px ${familia(f)}`))))
      .then(() => document.fonts.ready)
      .finally(() => {
        setListo(true);
        continueRender(handle);
      });
  }, [handle, marca]);
  return listo;
}

export function Lienzo({ marca, formato, children }: { marca: Marca; formato: string; children: ReactNode }) {
  const listo = useFuentes(marca);
  const fm = obtenerFormato(formato);
  const valor: Lienzo = {
    marca,
    formato: fm,
    ancho: fm.ancho,
    alto: fm.alto,
    u: Math.min(fm.ancho, fm.alto) / 1080,
    editable: Boolean((getInputProps() as { editable?: boolean }).editable),
    f: Object.fromEntries(Object.entries(marca.fuentes).map(([rol, x]) => [rol, familia(x)])) as Lienzo["f"],
    estilo: Object.fromEntries(Object.entries(marca.fuentes).map(([rol, x]) => [rol, x.estilo ?? "normal"])) as Lienzo["estilo"],
    peso: Object.fromEntries(
      Object.entries(marca.fuentes).map(([rol, x]) => [rol, x.peso ?? ({ titulo: 400, destacado: 800, script: 400, cuerpo: 500 } as Record<string, number>)[rol] ?? 400]),
    ) as Lienzo["peso"],
  };
  return (
    <Ctx.Provider value={valor}>
      <div
        style={{
          position: "relative",
          width: fm.ancho,
          height: fm.alto,
          overflow: "hidden",
          background: marca.colores.fondo,
          color: marca.colores.texto,
          fontFamily: valor.f.cuerpo,
          fontWeight: valor.peso.cuerpo,
        }}
      >
        {listo && children}
      </div>
    </Ctx.Provider>
  );
}
