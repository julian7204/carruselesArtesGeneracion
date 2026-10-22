import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { fitText } from "@remotion/layout-utils";
import { continueRender, delayRender, Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useLienzo, type RolFuente } from "./Lienzo";
import { archivoMarca, recurso } from "./marca";

// Piezas de diseño reutilizables. Todos los tamaños van en "u" (1 = 1px en un lienzo de 1080).
// Cada pieza acepta `style` para posicionarla (normalmente position: "absolute" + left/top).

/** Generador pseudoaleatorio determinista: la misma semilla da la misma forma en PNG y en video. */
function azar(semilla: number) {
  let s = Math.floor(semilla * 9973 + 7) % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// ─── Animación ────────────────────────────────────────────────────────────────

type Desde = "abajo" | "arriba" | "izquierda" | "derecha" | "escala" | "nada";

/**
 * Hace que su contenido entre animado en video. En PNG se ve en su estado final.
 * `retraso` en frames (30 = 1 segundo).
 */
export function Entrar({ children, retraso = 0, desde = "abajo", style }: { children: ReactNode; retraso?: number; desde?: Desde; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u } = useLienzo();
  const p = spring({ frame: frame - retraso, fps, config: { damping: 18, mass: 0.7 } });
  const d = (1 - p) * 90 * u;
  const transform = {
    abajo: `translateY(${d}px)`,
    arriba: `translateY(${-d}px)`,
    izquierda: `translateX(${-d}px)`,
    derecha: `translateX(${d}px)`,
    escala: `scale(${0.85 + 0.15 * p})`,
    nada: undefined,
  }[desde];
  return <div style={{ ...style, opacity: Math.min(1, p * 1.4), transform: [style?.transform, transform].filter(Boolean).join(" ") || undefined }}>{children}</div>;
}

// ─── Fotos ────────────────────────────────────────────────────────────────────

type Filtro = "normal" | "bn" | "duotono";

/**
 * Foto que llena su caja. `filtro="duotono"` la tiñe con `color` (por defecto el primario).
 * Para personas recortadas (PNG sin fondo) usa `recorte` → se ve completa, con sombra suave.
 */
export function Foto({
  src,
  filtro = "normal",
  color,
  recorte = false,
  posicion = "center",
  zoom = 1,
  style,
}: {
  src: string;
  filtro?: Filtro;
  color?: string;
  recorte?: boolean;
  posicion?: string;
  zoom?: number;
  style?: CSSProperties;
}) {
  const { marca, u } = useLienzo();
  const tinte = color ?? marca.colores.primario;
  return (
    <div style={{ position: "relative", overflow: recorte ? "visible" : "hidden", ...style }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: recorte ? "contain" : "cover",
          objectPosition: posicion,
          transform: zoom !== 1 ? `scale(${zoom})` : undefined,
          filter:
            filtro === "normal"
              ? recorte
                ? `drop-shadow(0 ${18 * u}px ${30 * u}px rgba(0,0,0,.25))`
                : undefined
              : "grayscale(1) contrast(1.15)",
        }}
      />
      {filtro === "duotono" && <div style={{ position: "absolute", inset: 0, background: tinte, mixBlendMode: "multiply" }} />}
      {filtro === "duotono" && <div style={{ position: "absolute", inset: 0, background: tinte, mixBlendMode: "lighten", opacity: 0.35 }} />}
    </div>
  );
}

/**
 * Tira inclinada de fotos apiladas con separación blanca (collage editorial).
 * `angulo` en grados; las fotos se mantienen derechas dentro de la tira.
 */
export function TiraFotos({
  fotos,
  ancho,
  alto,
  angulo = 14,
  separacion = 14,
  colorSeparacion = "#FFFFFF",
  style,
}: {
  fotos: { src: string; filtro?: Filtro; color?: string; posicion?: string }[];
  ancho: number;
  alto: number;
  angulo?: number;
  separacion?: number;
  colorSeparacion?: string;
  style?: CSSProperties;
}) {
  const { u } = useLienzo();
  const sep = separacion * u;
  const altoFoto = (alto - sep * (fotos.length - 1)) / fotos.length;
  return (
    <div style={{ position: "absolute", width: ancho, height: alto, transform: `rotate(${angulo}deg)`, display: "flex", flexDirection: "column", gap: sep, background: colorSeparacion, ...style }}>
      {fotos.map((f, i) => (
        <div key={i} style={{ position: "relative", width: ancho, height: altoFoto, overflow: "hidden" }}>
          <Foto
            src={f.src}
            filtro={f.filtro}
            color={f.color}
            posicion={f.posicion}
            style={{ position: "absolute", left: "-25%", top: "-25%", width: "150%", height: "150%", transform: `rotate(${-angulo}deg)` }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Formas ───────────────────────────────────────────────────────────────────

/** Pincelada de brocha seca, con bordes irregulares. Pon texto dentro como hijos. */
export function Pincelada({ color, semilla = 1, children, style, relleno }: { color?: string; semilla?: number; children?: ReactNode; style?: CSSProperties; relleno?: string }) {
  const { marca, u } = useLienzo();
  const c = color ?? marca.colores.secundario;
  const r = azar(semilla);
  const pts: string[] = [];
  for (let x = 30; x <= 970; x += 35) pts.push(`${x},${6 + r() * 12}`);
  for (let y = 10; y <= 190; y += 9) pts.push(`${975 + r() * 22 - (r() < 0.35 ? r() * 70 : 0)},${y}`);
  for (let x = 970; x >= 30; x -= 35) pts.push(`${x},${194 - r() * 12}`);
  for (let y = 190; y >= 10; y -= 9) pts.push(`${25 - r() * 22 + (r() < 0.35 ? r() * 70 : 0)},${y}`);
  // Vetas de brocha seca: nacen dentro del borde y salen hacia afuera.
  const vetas = Array.from({ length: 10 }, () => {
    const w = 25 + r() * 60;
    return { y: 12 + r() * 176, x: r() < 0.5 ? 45 - w : 955, w, h: 1.5 + r() * 3.5 };
  });
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: relleno ?? `${40 * u}px ${80 * u}px`, ...style }}>
      <svg viewBox="-60 0 1120 200" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <polygon points={pts.join(" ")} fill={c} />
        {vetas.map((v, i) => (
          <rect key={i} x={v.x} y={v.y} width={v.w} height={v.h} fill={c} />
        ))}
      </svg>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

/** Grilla de puntos decorativa. */
export function Puntos({ filas = 4, columnas = 5, color, tam = 14, sep = 48, style }: { filas?: number; columnas?: number; color?: string; tam?: number; sep?: number; style?: CSSProperties }) {
  const { marca, u } = useLienzo();
  return (
    <div style={{ position: "absolute", display: "grid", gridTemplateColumns: `repeat(${columnas}, ${sep * u}px)`, gridAutoRows: `${sep * u}px`, ...style }}>
      {Array.from({ length: filas * columnas }, (_, i) => (
        <div key={i} style={{ width: tam * u, height: tam * u, borderRadius: "50%", background: color ?? marca.colores.primario }} />
      ))}
    </div>
  );
}

/** Garabato a mano (rulos) para subrayar titulares. */
export function Garabato({ ancho = 340, color, grosor = 7, vueltas = 9, style }: { ancho?: number; color?: string; grosor?: number; vueltas?: number; style?: CSSProperties }) {
  const { marca, u } = useLienzo();
  const paso = 100 / vueltas;
  let d = `M0,30`;
  for (let i = 0; i < vueltas; i++) {
    const x = i * paso;
    d += ` C${x + paso * 0.9},10 ${x + paso * 0.2},-2 ${x + paso * 0.45},18 S${x + paso * 0.9},38 ${x + paso},28`;
  }
  return (
    <svg viewBox="-2 -6 104 48" preserveAspectRatio="none" style={{ width: ancho * u, height: ancho * u * 0.16, overflow: "visible", ...style }}>
      <path d={d} fill="none" stroke={color ?? marca.colores.secundario} strokeWidth={grosor * u} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Círculo o arco de color (fondo para personas recortadas). */
export function Circulo({ diametro, color, borde, style }: { diametro: number; color?: string; borde?: number; style?: CSSProperties }) {
  const { marca, u } = useLienzo();
  const c = color ?? marca.colores.secundario;
  return (
    <div
      style={{
        position: "absolute",
        width: diametro * u,
        height: diametro * u,
        borderRadius: "50%",
        background: borde ? "transparent" : c,
        border: borde ? `${borde * u}px solid ${c}` : undefined,
        ...style,
      }}
    />
  );
}

/** Textura de grano de papel encima de todo, le quita lo "digital". */
export function Grano({ opacidad = 0.07 }: { opacidad?: number }) {
  if (useLienzo().editable) return null;
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: opacidad, pointerEvents: "none", mixBlendMode: "multiply" }}>
      <filter id="grano">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grano)" />
    </svg>
  );
}

/**
 * Textura escaneada real (papel, cartón…) de recursos/texturas, encima de todo en modo multiplicar.
 * Bájalas con: npm run textura -- paper
 */
export function Textura({ nombre = "Paper003", opacidad = 0.65, modo = "multiply" }: { nombre?: string; opacidad?: number; modo?: CSSProperties["mixBlendMode"] }) {
  if (useLienzo().editable) return null;
  return (
    <Img
      src={recurso(`texturas/${nombre}.jpg`)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: opacidad, mixBlendMode: modo, pointerEvents: "none" }}
    />
  );
}

const svgs = new Map<string, string>();

/**
 * Ícono real de recursos/iconos (bájalo con: npm run icono -- ph:music-notes-bold).
 * Se inserta como SVG, así toma el color pedido y queda vectorial en el PDF editable.
 */
export function Icono({ nombre, tam = 60, color, style }: { nombre: string; tam?: number; color?: string; style?: CSSProperties }) {
  const { u, marca } = useLienzo();
  const url = recurso(`iconos/${nombre}.svg`);
  const [svg, setSvg] = useState(() => svgs.get(url) ?? "");
  useEffect(() => {
    if (svg) return;
    const h = delayRender(`icono ${nombre}`);
    fetch(url)
      .then((r) => r.text())
      .then((t) => {
        const limpio = t.replace(/<svg([^>]*?)\swidth="[^"]*"/, "<svg$1").replace(/<svg([^>]*?)\sheight="[^"]*"/, "<svg$1").replace("<svg", '<svg width="100%" height="100%"');
        svgs.set(url, limpio);
        setSvg(limpio);
      })
      .finally(() => continueRender(h));
  }, [url, svg, nombre]);
  return <div style={{ width: tam * u, height: tam * u, color: color ?? marca.colores.primario, display: "flex", flexShrink: 0, ...style }} dangerouslySetInnerHTML={{ __html: svg }} />;
}

// ─── Texto ────────────────────────────────────────────────────────────────────

type Linea = {
  texto: string;
  fuente?: RolFuente;
  tam: number;
  color?: string;
  mayusculas?: boolean;
  /** Ajustes finos: subir/bajar la línea (en u), girarla, montarla sobre la anterior. */
  dy?: number;
  dx?: number;
  giro?: number;
  espaciado?: number;
};

/**
 * Titular apilado con mezcla de tipografías (condensada + fuerte + script).
 * `ancho` (en u): ninguna línea se pasa de ese ancho; si no cabe, se achica sola (medida con la fuente real).
 */
export function Titular({ lineas, alineacion = "left", interlineado = 0.95, ancho, style }: { lineas: Linea[]; alineacion?: "left" | "center" | "right"; interlineado?: number; ancho?: number; style?: CSSProperties }) {
  const { f, peso, estilo, u, marca } = useLienzo();
  const tamReal = (l: Linea) => {
    const fuente = l.fuente ?? "titulo";
    const deseado = l.tam * u;
    if (!ancho) return deseado;
    const mayus = l.mayusculas ?? fuente !== "script";
    const { fontSize } = fitText({
      text: mayus ? l.texto.toUpperCase() : l.texto,
      withinWidth: ancho * u - Math.abs(l.dx ?? 0) * u,
      fontFamily: f[fuente],
      fontWeight: peso[fuente],
      letterSpacing: `${(l.espaciado ?? (fuente === "destacado" ? -1 : 0)) * u}px`,
    });
    return Math.min(deseado, fontSize);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: { left: "flex-start", center: "center", right: "flex-end" }[alineacion], textAlign: alineacion, ...style }}>
      {lineas.map((l, i) => {
        const fuente = l.fuente ?? "titulo";
        return (
          <div
            key={i}
            style={{
              fontFamily: f[fuente],
              fontWeight: peso[fuente],
              fontStyle: estilo[fuente],
              fontSize: tamReal(l),
              lineHeight: fuente === "script" ? 1.1 : interlineado,
              color: l.color ?? marca.colores.texto,
              textTransform: (l.mayusculas ?? fuente !== "script") ? "uppercase" : "none",
              letterSpacing: (l.espaciado ?? (fuente === "destacado" ? -1 : 0)) * u,
              transform: `translate(${(l.dx ?? 0) * u}px, ${(l.dy ?? 0) * u}px) rotate(${l.giro ?? 0}deg)`,
              whiteSpace: "pre-line",
            }}
          >
            {l.texto}
          </div>
        );
      })}
    </div>
  );
}

/** Párrafo donde las *palabras entre asteriscos* van en negrita y del color indicado. */
export function Texto({ children, tam = 40, color, resalte, peso, fuente = "cuerpo", style }: { children: string; tam?: number; color?: string; resalte?: string; peso?: number; fuente?: RolFuente; style?: CSSProperties }) {
  const l = useLienzo();
  const partes = children.split(/(\*[^*]+\*)/);
  return (
    <div style={{ fontFamily: l.f[fuente], fontWeight: peso ?? l.peso[fuente], fontStyle: l.estilo[fuente], fontSize: tam * l.u, lineHeight: 1.3, color: color ?? l.marca.colores.texto, whiteSpace: "pre-line", ...style }}>
      {partes.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") && p.length > 2 ? (
          <span key={i} style={{ fontWeight: 800, color: resalte ?? undefined }}>
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </div>
  );
}

// ─── Marca y contacto ────────────────────────────────────────────────────────

/**
 * Logo de la marca. Si la marca define `isotipo` + `logoTexto`, lo arma como el original (imagen + nombre en su fuente).
 * Si aún no hay logo cargado, muestra un recuadro "LOGO" para que se note.
 */
export function Logo({ alto = 90, claro = false, colorTexto, style }: { alto?: number; claro?: boolean; colorTexto?: string; style?: CSSProperties }) {
  const { marca, u, f, peso } = useLienzo();
  const iso = marca.isotipo ? archivoMarca(marca.slug, marca.isotipo) : null;
  if (iso && marca.logoTexto) {
    const rol = marca.logoFuente ?? "destacado";
    return (
      <div style={{ display: "flex", alignItems: "center", gap: alto * 0.24 * u, ...style }}>
        <Img src={iso} style={{ height: alto * u, width: "auto" }} />
        <div style={{ fontFamily: f[rol], fontWeight: peso[rol], fontSize: alto * 0.62 * u, letterSpacing: -alto * 0.012 * u, color: colorTexto ?? (claro ? marca.colores.textoClaro : marca.colores.texto), lineHeight: 1 }}>
          {marca.logoTexto}
        </div>
      </div>
    );
  }
  const ruta = claro && marca.logoClaro ? marca.logoClaro : marca.logo;
  const url = ruta ? archivoMarca(marca.slug, ruta) : null;
  if (url) return <Img src={url} style={{ height: alto * u, width: "auto", ...style }} />;
  return (
    <div
      style={{
        height: alto * u,
        display: "flex",
        alignItems: "center",
        padding: `0 ${24 * u}px`,
        border: `${3 * u}px dashed ${marca.colores.primario}`,
        color: marca.colores.primario,
        fontFamily: f.destacado,
        fontWeight: 800,
        fontSize: alto * 0.32 * u,
        ...style,
      }}
    >
      {`LOGO ${marca.nombre.toUpperCase()}`}
    </div>
  );
}

/** Logo oficial de WhatsApp (Simple Icons, CC0) + número. */
export function WhatsApp({ numero, tam = 46, color, colorIcono, style }: { numero?: string; tam?: number; color?: string; colorIcono?: string; style?: CSSProperties }) {
  const { marca, u, f } = useLienzo();
  const n = numero ?? marca.contacto.whatsapp;
  if (!n) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: tam * 0.3 * u, ...style }}>
      <Icono nombre="simple-icons-whatsapp" tam={tam * 1.15} color={colorIcono ?? marca.colores.primario} />
      <div style={{ fontFamily: f.destacado, fontWeight: 800, fontSize: tam * u, color: color ?? marca.colores.texto, letterSpacing: 0.5 * u }}>{n}</div>
    </div>
  );
}

/**
 * Burbuja de chat estilo WhatsApp (para mostrar la interfaz real de un producto o una conversación).
 * `lado="saliente"` usa el color primario; `entrante`, blanco.
 */
export function Burbuja({ texto, lado = "entrante", hora, leido, tam = 26, color, style }: { texto: string; lado?: "entrante" | "saliente"; hora?: string; leido?: boolean; tam?: number; color?: string; style?: CSSProperties }) {
  const { marca, u, f } = useLienzo();
  const sale = lado === "saliente";
  const fondo = color ?? (sale ? marca.colores.primario : "#FFFFFF");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: sale ? "flex-end" : "flex-start", gap: 8 * u, ...style }}>
      <div
        style={{
          background: fondo,
          color: sale ? marca.colores.textoClaro : marca.colores.texto,
          fontFamily: f.cuerpo,
          fontSize: tam * u,
          lineHeight: 1.35,
          padding: `${tam * 0.62 * u}px ${tam * 0.9 * u}px`,
          borderRadius: tam * 0.9 * u,
          [sale ? "borderBottomRightRadius" : "borderBottomLeftRadius"]: tam * 0.2 * u,
          boxShadow: sale ? `0 ${10 * u}px ${30 * u}px ${fondo}55` : `0 ${2 * u}px ${8 * u}px rgba(14,19,48,.08), inset 0 0 0 ${1.5 * u}px rgba(14,19,48,.06)`,
          maxWidth: "100%",
        }}
      >
        {texto}
      </div>
      {hora && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 * u, fontFamily: f.mono ?? f.cuerpo, fontSize: tam * 0.55 * u, color: marca.colores.gris ?? "#888", letterSpacing: 0.5 * u }}>
          {hora}
          {leido && " · Leído"}
        </div>
      )}
    </div>
  );
}
