import type { CSSProperties } from "react";
import { definirPost, Entrar, Icono, Logo, useLienzo } from "../../../src/kit";
import { Mascota3D, type Pose } from "../../../marcas/scale-com/mascota/Mascota3D";
import conversacion from "./fotos/captura-conversacion.webp";
import novedades from "./fotos/captura-novedades.webp";
import pedidos from "./fotos/captura-pedidos.webp";
import resumen from "./fotos/captura-resumen.webp";

// Carrusel "Antes y después" con la mascota 3D como narradora.
// Estructura según lo que funciona en 2026: portada con una sola idea, slide 2 como segundo gancho
// (Instagram lo vuelve a mostrar a quien no deslizó), checklist que se guarda, un problema por slide,
// cierre que pide guardar y compartir. Texto de la landing (Hero, Contraste, FlujoCOD) en la voz de la marca.
// Capturas: panel real, cuenta demo «Tienda Alborada» (se rotula).

const TOTAL = 8;

function Acento({ children, color }: { children: string; color: string }) {
  return (
    <>
      {children.split(/(\*[^*]+\*)/).map((p, i) =>
        p.startsWith("*") ? (
          <span key={i} style={{ color }}>
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

/** Nota a mano con flecha, como en la hoja de la mascota. */
function Nota({ texto, color, tam = 40, flecha = "derecha", giro = -4, style }: { texto: string; color: string; tam?: number; flecha?: "derecha" | "izquierda" | "ninguna"; giro?: number; style?: CSSProperties }) {
  const { f, u } = useLienzo();
  const w = tam * 2.4 * u;
  const camino = flecha === "izquierda" ? "M96 34 C 72 6, 34 4, 6 22 M6 22 l15 -3 M6 22 l6 -13" : "M4 34 C 28 6, 66 4, 94 22 M94 22 l-15 -3 M94 22 l-6 -13";
  const svg = (
    <svg viewBox="0 0 100 45" style={{ width: w, height: w * 0.45, overflow: "visible" }}>
      <path d={camino} fill="none" stroke={color} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 * u, transform: `rotate(${giro}deg)`, ...style }}>
      {flecha === "izquierda" && svg}
      <div style={{ fontFamily: f.nota, fontWeight: 700, fontSize: tam * u, lineHeight: 1.05, color, whiteSpace: "pre-line" }}>{texto}</div>
      {flecha === "derecha" && svg}
    </div>
  );
}

function Marco({ n, oscuro }: { n: number; oscuro?: boolean }) {
  const { marca, u, f, ancho, alto } = useLienzo();
  const c = marca.colores;
  return (
    <>
      <div style={{ position: "absolute", left: 72 * u, right: 72 * u, top: 64 * u, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 5 }}>
        <Logo alto={38} claro={oscuro} />
        <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 20 * u, color: oscuro ? c.grisOscuro : c.gris, fontFeatureSettings: "'tnum'" }}>
          {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </div>
      </div>
      <div style={{ position: "absolute", left: 72 * u, top: alto - 60 * u, width: ancho - 144 * u, display: "flex", gap: 6 * u, zIndex: 5 }}>
        {Array.from({ length: TOTAL }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 4 * u, borderRadius: 2 * u, background: i < n ? c.acento : oscuro ? c.bordeOscuro : c.borde }} />
        ))}
      </div>
    </>
  );
}

function Titulo({ children, tam, color, acento, style }: { children: string; tam: number; color: string; acento: string; style?: CSSProperties }) {
  const { f, peso, u } = useLienzo();
  return (
    <div style={{ fontFamily: f.titulo, fontWeight: peso.titulo, fontSize: tam * u, lineHeight: 1.0, letterSpacing: -tam * 0.028 * u, color, ...style }}>
      <Acento color={acento}>{children}</Acento>
    </div>
  );
}

// 1 · Portada: una sola idea; la mascota con lentes se la cree.
function Portada() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c.secundario }} />
      {/* Piso donde aterriza la mascota: bloque plano del primario, sin degradados. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1160 * u, bottom: 0, background: c.primario }} />
      <Marco n={1} oscuro />
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 180 * u, width: 940 * u }}>
        <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 20 * u, letterSpacing: 1.6 * u, textTransform: "uppercase", color: c.suave }}>Contra entrega · Ecuador</div>
        <Titulo tam={100} color={c.textoClaro} acento={c.acento} style={{ marginTop: 24 * u }}>
          {"Vender por WhatsApp es fácil."}
        </Titulo>
        <Titulo tam={100} color={c.textoClaro} acento={c.acento} style={{ marginTop: 18 * u }}>
          {"*Cobrar cada entrega,* no tanto."}
        </Titulo>
      </Entrar>
      <div style={{ position: "absolute", left: 540 * u, top: 760 * u }}>
        <Mascota3D pose="lentes" ancho={480 * u} retraso={10} />
      </div>
      <Entrar desde="izquierda" retraso={30} style={{ position: "absolute", left: 72 * u, top: 1000 * u }}>
        <Nota texto={"Desliza,\nte cuento"} color={c.suave} tam={48} flecha="derecha" />
      </Entrar>
    </>
  );
}

// 2 · Segundo gancho: checklist para guardar.
function Checklist() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  const items = [
    "Anotas pedidos entre el chat, una hoja y la memoria.",
    "Abres una plataforma por transportadora para ver cada guía.",
    "Te enteras de la novedad cuando el paquete ya volvió.",
    "No sabes qué anuncio trae clientes que sí reciben.",
  ];
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c.superficie }} />
      <Marco n={2} />
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 180 * u, width: 640 * u }}>
        <Titulo tam={86} color={c.secundario} acento={c.acento}>
          {"¿Te pasa *alguna* de estas?"}
        </Titulo>
      </Entrar>
      <div style={{ position: "absolute", right: 30 * u, top: 150 * u }}>
        <Mascota3D pose="idea" ancho={300 * u} entrada="salto" retraso={8} />
      </div>
      <div style={{ position: "absolute", left: 72 * u, top: 520 * u, width: 936 * u, display: "flex", flexDirection: "column", gap: 22 * u }}>
        {items.map((t, i) => (
          <Entrar key={i} retraso={12 + i * 6} desde="izquierda">
            <div style={{ display: "flex", alignItems: "center", gap: 26 * u, background: "#fff", border: `${1 * u}px solid ${c.borde}`, borderRadius: 6 * u, padding: `${26 * u}px ${30 * u}px` }}>
              <div style={{ width: 40 * u, height: 40 * u, borderRadius: 4 * u, border: `${3 * u}px solid ${c.primario}`, flexShrink: 0 }} />
              <div style={{ fontFamily: f.cuerpo, fontSize: 31 * u, lineHeight: 1.3, color: c.texto }}>{t}</div>
            </div>
          </Entrar>
        ))}
      </div>
      <Entrar retraso={40} style={{ position: "absolute", left: 560 * u, top: 1150 * u }}>
        <Nota texto="Si marcaste una, sigue" color={c.acento} tam={44} flecha="derecha" giro={-3} />
      </Entrar>
    </>
  );
}

type Caso = { n: number; num: string; hoy: string; con: string; pose: Pose; captura: string; recorte: CSSProperties; alto: number; nota: string; izquierda?: boolean };

// 3–6 · Un problema por slide; la mascota actúa la solución junto al panel real.
function CasoSlide({ n, num, hoy, con, pose, captura, recorte, alto, nota, izquierda }: Caso) {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: n % 2 ? c.superficie : "#FFFFFF" }} />
      <Marco n={n} />
      <div style={{ position: "absolute", right: 60 * u, top: 96 * u, fontFamily: f.titulo, fontWeight: 700, fontSize: 200 * u, lineHeight: 1, letterSpacing: -8 * u, color: c.niebla }}>{num}</div>
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 300 * u, width: 936 * u }}>
        <div style={{ display: "inline-block", fontFamily: f.cuerpo, fontSize: 30 * u, lineHeight: 1.35, color: c.gris, textDecoration: `line-through ${3 * u}px ${c.peligro}` }}>{hoy}</div>
        <Titulo tam={66} color={c.secundario} acento={c.acento} style={{ marginTop: 26 * u }}>
          {con}
        </Titulo>
      </Entrar>
      {/* Panel real, inclinado, saliendo por el borde */}
      <Entrar
        desde={izquierda ? "derecha" : "izquierda"}
        retraso={10}
        style={{ position: "absolute", left: (izquierda ? 300 : 72) * u, top: 690 * u, width: 780 * u, transform: `rotate(${izquierda ? 2.5 : -2.5}deg)` }}
      >
        <div style={{ position: "relative", width: "100%", height: alto * u, overflow: "hidden", borderRadius: 6 * u, border: `${1 * u}px solid ${c.borde}`, background: "#fff", boxShadow: `0 ${24 * u}px ${50 * u}px -${24 * u}px rgba(0,27,72,.45)` }}>
          <img src={captura} style={{ position: "absolute", ...recorte }} />
        </div>
        <div style={{ marginTop: 14 * u, fontFamily: f.cuerpo, fontSize: 16 * u, color: c.gris }}>Panel real · cuenta demo «Tienda Alborada»</div>
      </Entrar>
      <div style={{ position: "absolute", left: (izquierda ? 20 : 730) * u, top: (690 + alto - 250) * u }}>
        <Mascota3D pose={pose} ancho={330 * u} retraso={18} desde={izquierda ? "izquierda" : "derecha"} />
      </div>
      <Entrar retraso={34} style={{ position: "absolute", left: (izquierda ? 380 : 120) * u, top: (690 + alto + 70) * u }}>
        <Nota texto={nota} color={c.acento} tam={40} flecha={izquierda ? "izquierda" : "derecha"} giro={izquierda ? 3 : -3} />
      </Entrar>
    </>
  );
}

// 7 · Cómo funciona: la mascota despega.
function Flujo() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  const pasos: [string, string, string][] = [
    ["tabler-message-circle", "Cliente", "Llega de tu anuncio y escribe. El bot vende con los precios de tu catálogo."],
    ["tabler-truck-delivery", "Proveedor", "El despacho sale solo a Dropi y los estados llegan unificados al panel."],
    ["tabler-cash", "Entrega", "Cobras al recibir. Si falla, la novedad se pelea hasta recuperar la venta."],
  ];
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c.secundario }} />
      <Marco n={7} oscuro />
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 180 * u, width: 640 * u }}>
        <Titulo tam={84} color={c.textoClaro} acento={c.acento}>
          {"Tú pones el anuncio. *scalEcom hace el resto.*"}
        </Titulo>
      </Entrar>
      <div style={{ position: "absolute", left: 700 * u, top: 120 * u }}>
        <Mascota3D pose="cohete" ancho={330 * u} entrada="despega" retraso={6} sombra={false} />
      </div>
      <div style={{ position: "absolute", left: 72 * u, top: 640 * u, width: 936 * u }}>
        {pasos.map(([ico, t, d], i) => (
          <Entrar key={t} retraso={14 + i * 8} desde="izquierda" style={{ display: "flex", gap: 28 * u, alignItems: "flex-start", paddingBottom: i < 2 ? 40 * u : 0, position: "relative" }}>
            {i < 2 && <div style={{ position: "absolute", left: 35 * u, top: 74 * u, bottom: 0, width: 2 * u, background: c.bordeOscuro }} />}
            <div style={{ width: 72 * u, height: 72 * u, borderRadius: 6 * u, background: c.oscuroElevado, border: `${1 * u}px solid ${c.bordeOscuro}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icono nombre={ico} tam={38} color={c.acento} />
            </div>
            <div>
              <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 32 * u, color: c.textoClaro }}>{t}</div>
              <div style={{ marginTop: 6 * u, fontFamily: f.cuerpo, fontSize: 27 * u, lineHeight: 1.35, color: c.grisOscuro }}>{d}</div>
            </div>
          </Entrar>
        ))}
      </div>
    </>
  );
}

// 8 · Cierre: pide guardar y compartir; la oferta tal cual la landing.
function Cierre() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  const chip = (ico: string, texto: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 14 * u, border: `${2 * u}px solid ${c.suave}`, borderRadius: 6 * u, padding: `${16 * u}px ${22 * u}px`, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 25 * u, color: c.textoClaro }}>
      <Icono nombre={ico} tam={30} color={c.suave} />
      {texto}
    </div>
  );
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c.primario }} />
      <Marco n={8} oscuro />
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 180 * u, width: 900 * u }}>
        <Titulo tam={92} color={c.textoClaro} acento={c.suave}>
          {"Guárdalo para cuando *el próximo paquete vuelva.*"}
        </Titulo>
      </Entrar>
      <Entrar retraso={10} style={{ position: "absolute", left: 72 * u, top: 520 * u, display: "flex", flexDirection: "column", gap: 16 * u, alignItems: "flex-start" }}>
        {chip("tabler-bookmark", "Guárdalo")}
        {chip("tabler-send", "Compártelo con quien vende contra entrega")}
      </Entrar>
      <Entrar desde="abajo" retraso={20} style={{ position: "absolute", left: 72 * u, top: 1000 * u }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 * u, background: c.whatsapp, color: c.secundario, borderRadius: 6 * u, padding: `${22 * u}px ${32 * u}px`, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 29 * u, width: "fit-content" }}>
          <Icono nombre="simple-icons-whatsapp" tam={32} color={c.secundario} />
          Hablar por WhatsApp
        </div>
        <div style={{ marginTop: 22 * u, fontFamily: f.cuerpo, fontSize: 23 * u, color: c.niebla, fontFeatureSettings: "'tnum'" }}>Desde $29/mes · Tu mismo número · Sin permanencia</div>
        <div style={{ marginTop: 8 * u, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 23 * u, color: c.textoClaro }}>{marca.contacto.instagram}</div>
      </Entrar>
      <div style={{ position: "absolute", left: 640 * u, top: 760 * u }}>
        <Mascota3D pose="pulgar" ancho={390 * u} entrada="salto" retraso={14} />
      </div>
    </>
  );
}

const casos: Caso[] = [
  { n: 3, num: "01", hoy: "Pedidos anotados entre el chat, una hoja y la memoria.", con: "El bot arma el pedido *con precios solo de tu catálogo.*", pose: "laptop-guino", captura: conversacion, recorte: { left: "-22%", top: "-4%", width: "150%" }, alto: 400, nota: "Responde 24/7" },
  { n: 4, num: "02", hoy: "Una plataforma por transportadora para ver cada guía.", con: "Servientrega, Laar y las demás *en una sola columna.*", pose: "compras", captura: pedidos, recorte: { left: "0%", top: "0%", width: "100%" }, alto: 238, nota: "Todo junto", izquierda: true },
  { n: 5, num: "03", hoy: "La novedad se ve cuando el paquete ya volvió.", con: "Cada novedad abre un caso *con dueño, plazo y reintentos.*", pose: "escudo", captura: novedades, recorte: { left: "0%", top: "0%", width: "120%" }, alto: 400, nota: "Ninguna se pierde" },
  { n: 6, num: "04", hoy: "No sabes qué anuncio trae clientes que sí reciben.", con: "Tasa de entrega *por producto y por anuncio.*", pose: "resultados", captura: resumen, recorte: { left: "0%", top: "0%", width: "112%" }, alto: 400, nota: "Ahora sí sabes", izquierda: true },
];

export default definirPost({
  marca: "scale-com",
  formatos: ["instagram-carrusel", "linkedin-documento"],
  slides: [Portada, Checklist, ...casos.map((k) => () => <CasoSlide {...k} />), Flujo, Cierre],
  segundosPorSlide: 4,
  caption:
    "¿Te pasa alguna de estas? Vender contra entrega no tiene que ser a ciegas: el bot arma los pedidos con tus precios, las transportadoras quedan en una sola columna y cada novedad tiene dueño.\n\nGuárdalo y compártelo con quien vende contra entrega.\nDesde $29/mes · Tu mismo número · Sin permanencia.",
  hashtags: ["scalEcom", "ContraEntrega", "EcommerceEcuador", "WhatsAppBusiness", "Dropi"],
});
