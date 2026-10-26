import type { ReactNode } from "react";
import { definirPost, Entrar, Grano, Icono, Logo, useLienzo } from "../../../src/kit";
import { Mascota3D } from "../../../marcas/scale-com/mascota/Mascota3D";

// Patrón A1 "interfaz secuestrada" (conocimiento/patrones-diseno.md) + C3 "mascota enorme y cortada".
// El post entero es la pantalla bloqueada de un celular a las 2:14 a. m.: llega el mensaje de un cliente y abajo,
// como en una llamada entrante, dos botones: responder mañana o que conteste scalEcom ahora.
// El mensaje es de ejemplo y se rotula así. Los hechos (precios del catálogo, tu mismo número, desde $29) vienen de la landing.

function Boton({ color, icono, texto, sub, claro }: { color: string; icono: string; texto: string; sub: string; claro?: boolean }) {
  const { marca, f, u } = useLienzo();
  const c = marca.colores;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 300 * u }}>
      <div style={{ width: 150 * u, height: 150 * u, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icono nombre={icono} tam={70} color={claro ? c.secundario : "#fff"} />
      </div>
      <div style={{ marginTop: 22 * u, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 30 * u, color: c.textoClaro, textAlign: "center" }}>{texto}</div>
      <div style={{ marginTop: 4 * u, fontFamily: f.cuerpo, fontSize: 22 * u, color: c.grisOscuro, textAlign: "center" }}>{sub}</div>
    </div>
  );
}

function Notificacion({ children }: { children: ReactNode }) {
  const { marca, f, u } = useLienzo();
  const c = marca.colores;
  return (
    <div style={{ background: c.textoClaro, borderRadius: 6 * u, padding: `${26 * u}px ${30 * u}px`, display: "flex", gap: 24 * u, boxShadow: `0 ${24 * u}px ${50 * u}px -${26 * u}px rgba(0,0,0,.7)` }}>
      <div style={{ flex: "none", width: 72 * u, height: 72 * u, borderRadius: 6 * u, background: c.whatsapp, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icono nombre="simple-icons-whatsapp" tam={44} color="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: f.cuerpo, fontSize: 21 * u, color: c.gris, letterSpacing: 1.5 * u, textTransform: "uppercase" }}>
          <span>WhatsApp</span>
          <span>ahora</span>
        </div>
        <div style={{ marginTop: 6 * u, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 31 * u, color: c.texto }}>Cliente nuevo</div>
        <div style={{ marginTop: 4 * u, fontFamily: f.cuerpo, fontSize: 29 * u, lineHeight: 1.3, color: c.texto }}>{children}</div>
      </div>
    </div>
  );
}

function Pantalla() {
  const { marca, f, u, ancho, alto } = useLienzo();
  const c = marca.colores;
  // 4:5 o story 9:16 (en story se respeta la zona que tapan los botones de la app: 220 arriba, 360 abajo).
  const story = alto > ancho * 1.5;
  const y = (feed: number, vertical: number) => (story ? vertical : feed) * u;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c.oscuro }} />

      {/* Barra de estado de la pantalla bloqueada */}
      <div style={{ position: "absolute", left: 72 * u, right: 72 * u, top: y(60, 240), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo alto={34} claro />
        <div style={{ fontFamily: f.cuerpo, fontSize: 22 * u, color: c.grisOscuro, letterSpacing: 2 * u, textTransform: "uppercase" }}>Mensaje de ejemplo</div>
      </div>

      {/* Hora gigante: lo primero que se lee */}
      <Entrar retraso={0} style={{ position: "absolute", left: 0, width: ancho, top: y(150, 340), textAlign: "center" }}>
        <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 30 * u, color: c.suave }}>martes, de madrugada</div>
        <div style={{ fontFamily: f.titulo, fontWeight: 700, fontSize: y(290, 330), lineHeight: 0.92, letterSpacing: -12 * u, color: c.textoClaro, fontFeatureSettings: "'tnum'" }}>2:14</div>
      </Entrar>

      <Entrar retraso={10} desde="arriba" style={{ position: "absolute", left: 72 * u, width: ancho - 144 * u, top: y(490, 710) }}>
        <Notificacion>Hola, ¿todavía tienen la negra? La quiero con envío a Guayaquil.</Notificacion>
      </Entrar>

      <Entrar retraso={20} style={{ position: "absolute", left: 72 * u, width: ancho - 144 * u, top: y(730, 950) }}>
        <div style={{ fontFamily: f.titulo, fontWeight: 700, fontSize: 70 * u, lineHeight: 1.04, letterSpacing: -1.8 * u, color: c.textoClaro }}>
          ¿Le respondes mañana?<br /><span style={{ color: c.acento }}>¿O le vendes ahora?</span>
        </div>
      </Entrar>

      {/* Botones tipo llamada entrante */}
      <Entrar retraso={30} desde="abajo" style={{ position: "absolute", left: 40 * u, top: y(940, 1200), display: "flex", gap: 0 }}>
        <Boton color={c.peligro} icono="tabler-x" texto="Mañana" sub="y que compre en otro lado" />
        <Boton color={c.whatsapp} icono="tabler-check" texto="Ahora" sub="contesta scalEcom" claro />
      </Entrar>

      {/* Mascota grande, cortada por el borde derecho y el inferior */}
      <div style={{ position: "absolute", left: 600 * u, top: y(960, 1170) }}>
        <Mascota3D pose="laptop-guino" ancho={580 * u} retraso={24} entrada="rodando" sombra={false} />
      </div>
      <Entrar retraso={44} style={{ position: "absolute", left: 650 * u, top: y(900, 1110) }}>
        <div style={{ fontFamily: f.nota, fontWeight: 700, fontSize: 48 * u, color: c.suave, transform: "rotate(-5deg)" }}>Yo le contesto</div>
        <svg viewBox="0 0 100 60" style={{ position: "absolute", left: -110 * u, top: 40 * u, width: 110 * u, height: 66 * u, overflow: "visible" }}>
          <path d="M96 8 C 70 4, 30 14, 8 48 M8 48 l2 -16 M8 48 l15 -6" fill="none" stroke={c.suave} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Entrar>

      {/* Pie */}
      <div style={{ position: "absolute", left: 72 * u, top: y(1230, 1480), fontFamily: f.cuerpo, fontSize: 24 * u, lineHeight: 1.4, color: c.grisOscuro, fontFeatureSettings: "'tnum'" }}>
        <span style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, color: c.textoClaro }}>Desde $29/mes</span> · Tu mismo número
        <br />
        Sin permanencia · {marca.contacto.instagram}
      </div>
      <Grano opacidad={0.08} />
    </>
  );
}

export default definirPost({
  marca: "scale-com",
  formatos: ["instagram-carrusel", "vertical"],
  slides: [Pantalla],
  segundosPorSlide: 5,
  caption:
    "2:14 a. m. Un cliente quiere comprar y tú estás dormido.\n\nscalEcom le contesta en tu mismo WhatsApp con los precios de tu catálogo y te deja el pedido armado para despachar.\n\nDesde $29/mes · Sin permanencia.",
  hashtags: ["scalEcom", "ContraEntrega", "EcommerceEcuador", "WhatsAppBusiness", "VentasPorWhatsApp"],
});
