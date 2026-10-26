import { definirPost, Entrar, Grano, Icono, Logo, useLienzo } from "../../../src/kit";
import { Mascota3D } from "../../../marcas/scale-com/mascota/Mascota3D";

// Patrón A2 "la búsqueda / la solución" (conocimiento/patrones-diseno.md) + C4 mascota con etiquetas.
// Arriba, lo que la dueña de la tienda escribe en el buscador a medianoche (con sugerencias como un buscador real).
// Abajo, la respuesta: la mascota con la idea y lo que hace scalEcom, con hechos de la landing.


function Fila({ texto, principal }: { texto: string; principal?: boolean }) {
  const { marca, f, u } = useLienzo();
  const c = marca.colores;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 * u, padding: principal ? `${30 * u}px ${30 * u}px` : `${16 * u}px ${30 * u}px` }}>
      <Icono nombre="tabler-search" tam={principal ? 36 : 28} color={principal ? c.primario : c.grisOscuro} />
      <div style={{ fontFamily: principal ? f.cuerpoFuerte : f.cuerpo, fontWeight: principal ? 600 : 400, fontSize: (principal ? 33 : 27) * u, color: principal ? c.texto : c.gris, whiteSpace: "nowrap" }}>
        {texto}
        {principal && <span style={{ display: "inline-block", width: 3 * u, height: 38 * u, marginLeft: 4 * u, verticalAlign: "-6px", background: c.acento }} />}
      </div>
    </div>
  );
}

function Rotulo({ texto, color }: { texto: string; color: string }) {
  const { f, u } = useLienzo();
  return <div style={{ fontFamily: f.titulo, fontWeight: 700, fontSize: 46 * u, letterSpacing: -1 * u, color }}>{texto}</div>;
}

function Busqueda() {
  const { marca, f, u, ancho, alto } = useLienzo();
  const c = marca.colores;
  // 4:5 o story 9:16 (en story se respeta la zona que tapan los botones de la app: 220 arriba, 360 abajo).
  const story = alto > ancho * 1.5;
  const y = (feed: number, vertical: number) => (story ? vertical : feed) * u;
  const PISO = story ? 1480 : 1180;
  const mascota = story ? 500 : 440; // pegada al borde derecho: la nube viene cortada en la pose original
  const hace = ["Responde con tus precios", "Deja el pedido armado", "Lo despacha a Dropi"];
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c.superficie }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: PISO * u, bottom: 0, background: c.niebla }} />

      <div style={{ position: "absolute", left: 72 * u, right: 72 * u, top: y(64, 240), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo alto={36} />
        <div style={{ fontFamily: f.cuerpo, fontSize: 22 * u, color: c.gris }}>{marca.contacto.instagram}</div>
      </div>

      {/* La búsqueda */}
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: y(170, 350) }}>
        <Rotulo texto="La búsqueda:" color={c.gris} />
      </Entrar>
      <Entrar retraso={6} style={{ position: "absolute", left: 72 * u, width: ancho - 144 * u, top: y(250, 430) }}>
        <div style={{ background: "#fff", border: `${1 * u}px solid ${c.borde}`, borderRadius: 6 * u, boxShadow: `0 ${20 * u}px ${40 * u}px -${26 * u}px rgba(0,27,72,.45)`, paddingBottom: 12 * u }}>
          <Fila principal texto="cómo vender por WhatsApp mientras duermo" />
          <div style={{ height: 1 * u, background: c.borde, margin: `0 ${30 * u}px ${10 * u}px` }} />
          <Fila texto="cómo no perder pedidos contra entrega" />
          <Fila texto="cómo responder rápido a todos los clientes" />
        </div>
      </Entrar>

      {/* La solución */}
      <Entrar retraso={16} style={{ position: "absolute", left: 72 * u, top: y(590, 840), width: 520 * u }}>
        <Rotulo texto="La solución:" color={c.acento} />
        <div style={{ marginTop: 18 * u, fontFamily: f.titulo, fontWeight: 700, fontSize: 64 * u, lineHeight: 1.02, letterSpacing: -1.7 * u, color: c.secundario }}>
          Un vendedor en <span style={{ color: c.acento }}>tu mismo WhatsApp.</span>
        </div>
      </Entrar>
      <div style={{ position: "absolute", left: 72 * u, top: y(930, 1190), width: 500 * u, display: "flex", flexDirection: "column", gap: 18 * u }}>
        {hace.map((t, i) => (
          <Entrar key={t} retraso={26 + i * 5} desde="izquierda" style={{ display: "flex", gap: 16 * u, alignItems: "flex-start" }}>
            <div style={{ flex: "none", marginTop: 3 * u, width: 34 * u, height: 34 * u, borderRadius: 4 * u, background: c.acento, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icono nombre="tabler-check" tam={24} color="#fff" />
            </div>
            <div style={{ fontFamily: f.cuerpo, fontSize: 29 * u, lineHeight: 1.3, color: c.texto }}>{t}</div>
          </Entrar>
        ))}
      </div>

      <div style={{ position: "absolute", left: (1082 - mascota) * u, bottom: alto - PISO * u - 12 * u }}>
        <Mascota3D pose="idea" ancho={mascota * u} retraso={18} entrada="salto" />
      </div>

      <div style={{ position: "absolute", left: 72 * u, top: (PISO + (story ? 30 : 56)) * u, fontFamily: f.cuerpo, fontSize: 26 * u, color: c.primario, fontFeatureSettings: "'tnum'" }}>
        <span style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600 }}>Desde $29/mes</span> · Tu mismo número · Sin permanencia
      </div>
      <Grano opacidad={0.06} />
    </>
  );
}

export default definirPost({
  marca: "scale-com",
  formatos: ["instagram-carrusel", "vertical"],
  slides: [Busqueda],
  segundosPorSlide: 5,
  caption:
    "Si alguna vez buscaste cómo vender por WhatsApp mientras duermes, esto es para ti.\n\nscalEcom contesta en tu mismo número con los precios de tu catálogo, deja el pedido armado y lo despacha a Dropi.\n\nDesde $29/mes · Sin permanencia.",
  hashtags: ["scalEcom", "ContraEntrega", "EcommerceEcuador", "WhatsAppBusiness", "Dropi"],
});
