import type { CSSProperties, ReactNode } from "react";
import { definirPost, Entrar, Foto, Icono, Logo, useLienzo } from "../../../src/kit";
import conversacion from "./fotos/captura-conversacion.webp";
import novedades from "./fotos/captura-novedades.webp";
import pedidos from "./fotos/captura-pedidos.webp";
import resumen from "./fotos/captura-resumen.webp";
import entrega from "./fotos/entrega.webp";
import vendedora from "./fotos/vendedora.webp";
import { Mascota } from "../../../marcas/scale-com/mascota/Mascota";

// Carrusel "Antes y después". Todo el texto sale de la landing (Hero, Contraste y FlujoCOD de landingScalEcom).
// Capturas: panel real de scaleCom con la cuenta demo «Tienda Alborada» (datos inventados, se rotula).
// Identidad: el acento es el color #018ABE, nunca una itálica; radios ≤ 6 px; sin gradientes ni brillos.

const TOTAL = 6;

/** La mascota con los colores de la landing (cuerpo = acento, tinta = navy). */
function Personaje(p: { gesto?: Parameters<typeof Mascota>[0]["gesto"]; accesorio?: Parameters<typeof Mascota>[0]["accesorio"]; ancho: number; left: number; top: number; retraso?: number; oscuro?: boolean }) {
  const { marca, u } = useLienzo();
  const c = marca.colores;
  return (
    <Entrar desde="derecha" retraso={p.retraso ?? 20} style={{ position: "absolute", left: p.left * u, top: p.top * u }}>
      <Mascota gesto={p.gesto} accesorio={p.accesorio} oscuro={p.oscuro} ancho={p.ancho * u} colores={{ cuerpo: c.acento, tinta: c.secundario, suave: c.suave, oro: c.dorado }} />
    </Entrar>
  );
}

/** Texto donde *esto* va en el color de acento. */
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

function Ceja({ children, color }: { children: ReactNode; color: string }) {
  const { f, u } = useLienzo();
  return <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 20 * u, letterSpacing: 1.6 * u, textTransform: "uppercase", color }}>{children}</div>;
}

/** Barra superior y progreso inferior, iguales en todos los slides. */
function Marco({ n, oscuro }: { n: number; oscuro?: boolean }) {
  const { marca, u, f, ancho, alto } = useLienzo();
  const c = marca.colores;
  const tinta = oscuro ? c.grisOscuro : c.gris;
  return (
    <>
      <div style={{ position: "absolute", left: 72 * u, right: 72 * u, top: 64 * u, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo alto={40} claro={oscuro} />
        <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 20 * u, color: tinta, fontFeatureSettings: "'tnum'" }}>
          {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </div>
      </div>
      <div style={{ position: "absolute", left: 72 * u, top: alto - 64 * u, width: ancho - 144 * u, display: "flex", gap: 6 * u }}>
        {Array.from({ length: TOTAL }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 4 * u, borderRadius: 2 * u, background: i < n ? c.acento : oscuro ? c.bordeOscuro : c.borde }} />
        ))}
      </div>
    </>
  );
}

function Portada() {
  const { marca, u, f, peso, ancho, alto } = useLienzo();
  const c = marca.colores;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c.secundario }} />
      <Entrar desde="abajo" retraso={10} style={{ position: "absolute", left: 0, top: 780 * u, width: ancho, height: alto - 780 * u }}>
        <Foto src={vendedora} posicion="50% 35%" style={{ width: "100%", height: "100%" }} />
      </Entrar>
      <Marco n={1} oscuro />
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 190 * u, width: ancho - 144 * u }}>
        <Ceja color={c.suave}>Ventas + logística contra entrega · Ecuador</Ceja>
        <div style={{ marginTop: 26 * u, fontFamily: f.titulo, fontWeight: peso.titulo, fontSize: 104 * u, lineHeight: 1.0, letterSpacing: -2.6 * u, color: c.textoClaro }}>
          <Acento color={c.acento}>{"Vende por WhatsApp y *cobra cada entrega.*"}</Acento>
        </div>
        <div style={{ marginTop: 30 * u, width: 700 * u, fontFamily: f.cuerpo, fontSize: 27 * u, lineHeight: 1.45, color: c.grisOscuro }}>
          Un asistente responde a tus clientes con los precios de tu catálogo, arma los pedidos contra entrega y hace seguimiento de cada envío. Tú solo revisas.
        </div>
      </Entrar>
      <Personaje gesto="contenta" accesorio="celular" ancho={190} left={830} top={572} retraso={16} oscuro />
      <Entrar desde="derecha" retraso={18} style={{ position: "absolute", left: 72 * u, top: 700 * u, display: "flex", alignItems: "center", gap: 10 * u }}>
        <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 22 * u, color: c.textoClaro }}>Antes y después</div>
        <Icono nombre="tabler-arrow-right" tam={28} color={c.acento} />
      </Entrar>
    </>
  );
}

type Par = { n: number; hoy: string; con: string; captura: string; recorte: CSSProperties; alto?: number; gesto: Parameters<typeof Mascota>[0]["gesto"]; accesorio: Parameters<typeof Mascota>[0]["accesorio"] };

function Contraste({ n, hoy, con, captura, recorte, alto = 470, gesto, accesorio }: Par) {
  const { marca, u, f, peso, ancho } = useLienzo();
  const c = marca.colores;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c.superficie }} />
      <Marco n={n} />
      <div style={{ position: "absolute", left: 72 * u, top: 180 * u, width: ancho - 144 * u }}>
        <Ceja color={c.acento}>Antes y después · {n - 1} de 4</Ceja>

        <Entrar retraso={0} style={{ marginTop: 34 * u, display: "flex", gap: 18 * u, alignItems: "flex-start" }}>
          <div style={{ marginTop: 6 * u, width: 40 * u, height: 40 * u, borderRadius: 4 * u, background: "#FBEAEA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icono nombre="tabler-x" tam={24} color={c.peligro} />
          </div>
          <div>
            <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 19 * u, letterSpacing: 1.4 * u, color: c.gris, textTransform: "uppercase" }}>Hoy</div>
            <div style={{ marginTop: 6 * u, fontFamily: f.cuerpo, fontSize: 32 * u, lineHeight: 1.35, color: c.gris }}>{hoy}</div>
          </div>
        </Entrar>

        <div style={{ margin: `${30 * u}px 0`, height: 1 * u, background: c.borde }} />

        <Entrar retraso={8} style={{ display: "flex", gap: 18 * u, alignItems: "flex-start" }}>
          <div style={{ marginTop: 8 * u, width: 40 * u, height: 40 * u, borderRadius: 4 * u, background: c.niebla, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icono nombre="tabler-check" tam={24} color={c.primario} />
          </div>
          <div>
            <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 19 * u, letterSpacing: 1.4 * u, color: c.acento, textTransform: "uppercase" }}>Con scalEcom</div>
            <div style={{ marginTop: 8 * u, fontFamily: f.titulo, fontWeight: peso.titulo, fontSize: 52 * u, lineHeight: 1.08, letterSpacing: -1.3 * u, color: c.secundario }}>
              <Acento color={c.acento}>{con}</Acento>
            </div>
          </div>
        </Entrar>
      </div>

      {/* Captura real del panel, saliendo por el borde inferior */}
      <Entrar desde="abajo" retraso={14} style={{ position: "absolute", left: 72 * u, top: 790 * u, width: ancho - 72 * u, height: alto * u }}>
        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: `${6 * u}px 0 0 ${6 * u}px`, border: `${1 * u}px solid ${c.borde}`, borderRight: "none", background: "#fff", boxShadow: `0 ${16 * u}px ${40 * u}px -${20 * u}px rgba(0,27,72,.35)` }}>
          <img src={captura} style={{ position: "absolute", ...recorte }} />
        </div>
      </Entrar>
      <Personaje gesto={gesto} accesorio={accesorio} ancho={140} left={872} top={790 - 152} />
      <div style={{ position: "absolute", left: 72 * u, top: (790 + alto + 14) * u, fontFamily: f.cuerpo, fontSize: 16 * u, color: c.gris }}>
        Panel real de scalEcom · cuenta demo «Tienda Alborada», datos de demostración
      </div>
    </>
  );
}

function Paso({ icono, titulo, texto }: { icono: string; titulo: string; texto: string }) {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 * u }}>
      <div style={{ width: 66 * u, height: 66 * u, borderRadius: 6 * u, background: c.oscuroElevado, border: `${1 * u}px solid ${c.bordeOscuro}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icono nombre={icono} tam={36} color={c.acento} />
      </div>
      <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 29 * u, color: c.textoClaro }}>{titulo}</div>
      <div style={{ fontFamily: f.cuerpo, fontSize: 24 * u, lineHeight: 1.35, color: c.grisOscuro }}>{texto}</div>
    </div>
  );
}

function Cierre() {
  const { marca, u, f, peso, ancho } = useLienzo();
  const c = marca.colores;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c.oscuro }} />
      <Entrar desde="derecha" retraso={6} style={{ position: "absolute", right: 0, top: 150 * u, width: 360 * u, height: 460 * u }}>
        <Foto src={entrega} posicion="50% 40%" style={{ width: "100%", height: "100%", borderRadius: `${6 * u}px 0 0 ${6 * u}px` }} />
      </Entrar>
      <Marco n={6} oscuro />
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 190 * u, width: 560 * u }}>
        <Ceja color={c.suave}>Contra entrega, sin caos</Ceja>
        <div style={{ marginTop: 24 * u, fontFamily: f.titulo, fontWeight: peso.titulo, fontSize: 76 * u, lineHeight: 1.02, letterSpacing: -1.9 * u, color: c.textoClaro }}>
          <Acento color={c.acento}>{"Tú pones el anuncio. *scalEcom hace el resto.*"}</Acento>
        </div>
      </Entrar>

      <Entrar retraso={10} style={{ position: "absolute", left: 72 * u, top: 700 * u, width: ancho - 144 * u, display: "flex", alignItems: "flex-start", gap: 20 * u }}>
        <Paso icono="tabler-message-circle" titulo="Cliente" texto="Llega de tu anuncio y escribe" />
        <div style={{ marginTop: 16 * u }}>
          <Icono nombre="tabler-arrow-right" tam={30} color={c.grisOscuro} />
        </div>
        <Paso icono="tabler-truck-delivery" titulo="Proveedor" texto="Despacho con Dropi" />
        <div style={{ marginTop: 16 * u }}>
          <Icono nombre="tabler-arrow-right" tam={30} color={c.grisOscuro} />
        </div>
        <Paso icono="tabler-cash" titulo="Entrega" texto="Cobras al recibir" />
      </Entrar>

      <Personaje gesto="contenta" accesorio="moneda" ancho={170} left={838} top={1010} retraso={24} oscuro />
      <Entrar desde="abajo" retraso={18} style={{ position: "absolute", left: 72 * u, top: 1030 * u, width: ancho - 144 * u }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 * u }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 * u, background: c.whatsapp, color: c.secundario, borderRadius: 6 * u, padding: `${20 * u}px ${30 * u}px`, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 27 * u }}>
            <Icono nombre="simple-icons-whatsapp" tam={30} color={c.secundario} />
            Hablar por WhatsApp
          </div>
          <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 24 * u, color: c.textoClaro }}>{marca.contacto.instagram}</div>
        </div>
        <div style={{ marginTop: 26 * u, fontFamily: f.cuerpo, fontSize: 22 * u, color: c.grisOscuro, fontFeatureSettings: "'tnum'" }}>
          Desde $29/mes · Tu mismo número · Sin permanencia
        </div>
      </Entrar>
    </>
  );
}

const pares: Par[] = [
  { n: 2, hoy: "Pedidos anotados entre el chat, una hoja y la memoria.", con: "El bot arma el pedido con dirección y ciudad, *con precios solo de tu catálogo.*", gesto: "escribiendo", accesorio: "ninguno", captura: conversacion, recorte: { left: "-22%", top: "-4%", width: "150%" } },
  { n: 3, hoy: "Una plataforma por transportadora para saber dónde va cada guía.", con: "Servientrega, Laar y las demás, *en una sola columna de estados.*", gesto: "reposo", accesorio: "caja", captura: pedidos, recorte: { left: "0%", top: "0%", width: "100%" }, alto: 300 },
  { n: 4, hoy: "La novedad se ve cuando el paquete ya volvió.", con: "Cada novedad abre un caso *con dueño, plazo y reintentos.*", gesto: "buscando", accesorio: "lupa", captura: novedades, recorte: { left: "0%", top: "0%", width: "120%" } },
  { n: 5, hoy: "No sabes qué anuncio trae clientes que sí reciben.", con: "Tasa de entrega *por producto y por anuncio.*", gesto: "contenta", accesorio: "moneda", captura: resumen, recorte: { left: "0%", top: "0%", width: "112%" } },
];

export default definirPost({
  marca: "scale-com",
  formatos: ["instagram-carrusel", "linkedin-documento"],
  slides: [Portada, ...pares.map((p) => () => <Contraste {...p} />), Cierre],
  segundosPorSlide: 4,
  caption:
    "Vender contra entrega no tiene que ser a ciegas. Así cambia el día a día de una tienda que vende por WhatsApp cuando el bot arma los pedidos, las transportadoras quedan en un solo panel y cada novedad tiene dueño.\n\nDesde $29/mes · Tu mismo número · Sin permanencia.",
  hashtags: ["scalEcom", "ContraEntrega", "EcommerceEcuador", "WhatsAppBusiness", "Dropi"],
});
