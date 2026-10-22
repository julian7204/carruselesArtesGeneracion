import type { CSSProperties, ReactNode } from "react";
import { definirPost, Entrar, Icono, Logo, useLienzo } from "../../../src/kit";
import { Mascota3D, type Pose } from "../../../marcas/scale-com/mascota/Mascota3D";

// "Tu nuevo vendedor no duerme": la mascota es el vendedor nuevo de la tienda y el carrusel sigue su día
// hora por hora. El fondo pasa de noche a día y vuelve a la noche: deslizar se siente como el paso del tiempo.
// Sin fotos ni capturas: mascota 3D + elementos de interfaz con el estilo de la marca.
// Hechos del producto tomados de la landing (Hero, Contraste, FlujoCOD, Capacidades); conversación y pedido
// son de ejemplo y se rotulan así. Estructura: gancho de una idea, slide 2 como segundo gancho, cierre que pide guardar.

const TOTAL = 9;
const PISO = 1150; // línea donde rueda la mascota en todos los slides (continuidad al deslizar)

type Escena = { fondo: string; piso: string; oscuro: boolean };

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

function Nota({ texto, color, tam = 42, giro = -4, izquierda, style }: { texto: string; color: string; tam?: number; giro?: number; izquierda?: boolean; style?: CSSProperties }) {
  const { f, u } = useLienzo();
  const w = tam * 2.3 * u;
  const flecha = (
    <svg viewBox="0 0 100 45" style={{ width: w, height: w * 0.45, overflow: "visible", transform: izquierda ? "scaleX(-1)" : undefined }}>
      <path d="M4 34 C 28 6, 66 4, 94 22 M94 22 l-15 -3 M94 22 l-6 -13" fill="none" stroke={color} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 * u, transform: `rotate(${giro}deg)`, ...style }}>
      {izquierda && flecha}
      <div style={{ fontFamily: f.nota, fontWeight: 700, fontSize: tam * u, lineHeight: 1.05, color, whiteSpace: "pre-line" }}>{texto}</div>
      {!izquierda && flecha}
    </div>
  );
}

/** Fondo de la escena, piso, logo, contador y progreso. */
function Escenario({ n, e, children }: { n: number; e: Escena; children?: ReactNode }) {
  const { marca, u, f, ancho, alto } = useLienzo();
  const c = marca.colores;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: e.fondo }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: PISO * u, bottom: 0, background: e.piso }} />
      {children}
      <div style={{ position: "absolute", left: 72 * u, right: 72 * u, top: 64 * u, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo alto={36} claro={e.oscuro} />
        <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 20 * u, color: e.oscuro ? c.grisOscuro : c.gris, fontFeatureSettings: "'tnum'" }}>
          {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </div>
      </div>
      <div style={{ position: "absolute", left: 72 * u, top: alto - 60 * u, width: ancho - 144 * u, display: "flex", gap: 6 * u }}>
        {Array.from({ length: TOTAL }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 4 * u, borderRadius: 2 * u, background: i < n ? c.acento : e.oscuro ? "rgba(255,255,255,.18)" : "rgba(0,27,72,.14)" }} />
        ))}
      </div>
    </>
  );
}

/** Mascota parada sobre el piso (se ancla por abajo). */
function EnPiso({ pose, ancho, left, retraso = 14, desde = "derecha", entrada = "rodando" as const, espejo }: { pose: Pose; ancho: number; left: number; retraso?: number; desde?: "derecha" | "izquierda"; entrada?: "rodando" | "salto" | "crece" | "despega"; espejo?: boolean }) {
  const { u, alto } = useLienzo();
  return (
    <div style={{ position: "absolute", left: left * u, bottom: alto - PISO * u - 14 * u }}>
      <Mascota3D pose={pose} ancho={ancho * u} retraso={retraso} desde={desde} entrada={entrada} espejo={espejo} />
    </div>
  );
}

function Hora({ hora, sufijo, color }: { hora: string; sufijo: string; color: string }) {
  const { f, u } = useLienzo();
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 14 * u }}>
      <div style={{ fontFamily: f.titulo, fontWeight: 700, fontSize: 170 * u, lineHeight: 0.9, letterSpacing: -6 * u, color, fontFeatureSettings: "'tnum'" }}>{hora}</div>
      <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 34 * u, color }}>{sufijo}</div>
    </div>
  );
}

function Frase({ children, color, acento, tam = 56, style }: { children: string; color: string; acento: string; tam?: number; style?: CSSProperties }) {
  const { f, peso, u } = useLienzo();
  return (
    <div style={{ fontFamily: f.titulo, fontWeight: peso.titulo, fontSize: tam * u, lineHeight: 1.04, letterSpacing: -tam * 0.026 * u, color, ...style }}>
      <Acento color={acento}>{children}</Acento>
    </div>
  );
}

function Pill({ texto, tono }: { texto: string; tono: "ok" | "alerta" | "info" | "neutro" }) {
  const { marca, f, u } = useLienzo();
  const c = marca.colores;
  const col = { ok: c.ok, alerta: c.alerta, info: c.acento, neutro: c.gris }[tono];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 * u, border: `${1.5 * u}px solid ${col}55`, background: `${col}14`, color: col, borderRadius: 4 * u, padding: `${6 * u}px ${14 * u}px`, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 22 * u, whiteSpace: "nowrap" }}>
      <div style={{ width: 9 * u, height: 9 * u, borderRadius: 2 * u, background: col }} />
      {texto}
    </div>
  );
}

function Tarjeta({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const { marca, u } = useLienzo();
  return (
    <div style={{ background: "#fff", border: `${1 * u}px solid ${marca.colores.borde}`, borderRadius: 6 * u, padding: 26 * u, boxShadow: `0 ${18 * u}px ${40 * u}px -${22 * u}px rgba(0,27,72,.5)`, ...style }}>{children}</div>
  );
}

function Rotulo({ children, color }: { children: string; color: string }) {
  const { f, u } = useLienzo();
  return <div style={{ marginTop: 12 * u, fontFamily: f.cuerpo, fontSize: 16 * u, color, opacity: 0.8 }}>{children}</div>;
}

// ── Escenas ─────────────────────────────────────────────────────────────────────

// 1 · Gancho: una sola idea, de noche.
function Gancho() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  const e: Escena = { fondo: c.oscuro, piso: c.oscuroElevado, oscuro: true };
  return (
    <Escenario n={1} e={e}>
      {/* Luna y estrellas planas, sin brillos. */}
      <div style={{ position: "absolute", left: 860 * u, top: 150 * u, width: 120 * u, height: 120 * u, borderRadius: "50%", background: c.suave, opacity: 0.9 }} />
      <div style={{ position: "absolute", left: 896 * u, top: 132 * u, width: 120 * u, height: 120 * u, borderRadius: "50%", background: c.oscuro }} />
      {[[120, 470], [980, 420], [760, 300], [600, 560], [1010, 640], [420, 120]].map(([x, y], i) => (
        <div key={i} style={{ position: "absolute", left: x * u, top: y * u, width: 6 * u, height: 6 * u, borderRadius: 1 * u, background: c.suave, opacity: 0.6 }} />
      ))}
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 220 * u, width: 900 * u }}>
        <Frase tam={128} color={c.textoClaro} acento={c.acento}>
          {"Tu nuevo vendedor *no duerme.*"}
        </Frase>
        <div style={{ marginTop: 30 * u, fontFamily: f.cuerpo, fontSize: 32 * u, lineHeight: 1.35, color: c.grisOscuro, width: 560 * u }}>Tampoco se olvida de un pedido.</div>
      </Entrar>
      <EnPiso pose="concentrado" ancho={600} left={440} retraso={10} />
      <Entrar desde="izquierda" retraso={30} style={{ position: "absolute", left: 72 * u, top: 940 * u }}>
        <Nota texto={"Mira su\nturno"} color={c.suave} tam={50} />
      </Entrar>
    </Escenario>
  );
}

// 2 · Segundo gancho: la agenda del día.
function Agenda() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  const e: Escena = { fondo: c.superficie, piso: c.niebla, oscuro: false };
  const filas: [string, string][] = [
    ["02:14", "Atiende a un cliente nuevo"],
    ["02:16", "Deja el pedido armado"],
    ["09:00", "Despacha y sigue la guía"],
    ["15:30", "Pelea una novedad"],
    ["18:00", "Cobras"],
  ];
  return (
    <Escenario n={2} e={e}>
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 170 * u, width: 620 * u }}>
        <Frase tam={78} color={c.secundario} acento={c.acento}>
          {"Su turno de ayer, *hora por hora.*"}
        </Frase>
      </Entrar>
      <div style={{ position: "absolute", left: 72 * u, top: 470 * u, width: 600 * u }}>
        {filas.map(([h, t], i) => (
          <Entrar key={h} retraso={10 + i * 5} desde="izquierda" style={{ display: "flex", alignItems: "center", gap: 26 * u, padding: `${18 * u}px 0`, borderBottom: i < filas.length - 1 ? `${1 * u}px solid ${c.borde}` : "none" }}>
            <div style={{ width: 120 * u, fontFamily: f.titulo, fontWeight: 700, fontSize: 40 * u, color: c.acento, fontFeatureSettings: "'tnum'" }}>{h}</div>
            <div style={{ fontFamily: f.cuerpo, fontSize: 30 * u, color: c.texto }}>{t}</div>
          </Entrar>
        ))}
      </div>
      <EnPiso pose="saluda" ancho={360} left={690} retraso={8} entrada="salto" />
      <Entrar retraso={40} style={{ position: "absolute", left: 360 * u, top: 1070 * u }}>
        <Nota texto="Desliza" color={c.acento} tam={44} giro={-3} />
      </Entrar>
    </Escenario>
  );
}

// 3 · 02:14 — atiende.
function Atiende() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  const e: Escena = { fondo: c.secundario, piso: "#06244F", oscuro: true };
  return (
    <Escenario n={3} e={e}>
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 150 * u, width: 936 * u }}>
        <Hora hora="02:14" sufijo="a. m." color={c.acento} />
        <Frase color={c.textoClaro} acento={c.suave} style={{ marginTop: 22 * u }}>
          {"Alguien vio tu anuncio y escribe. *Le responde con los precios de tu catálogo.*"}
        </Frase>
      </Entrar>
      <Entrar desde="izquierda" retraso={12} style={{ position: "absolute", left: 72 * u, top: 600 * u, width: 600 * u }}>
        <Tarjeta style={{ background: "#F6F9FB", display: "flex", flexDirection: "column", gap: 16 * u }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 * u, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 21 * u, color: c.texto }}>
            <Icono nombre="simple-icons-whatsapp" tam={26} color={c.whatsapp} />
            Ana Torres
          </div>
          <div style={{ alignSelf: "flex-start", background: "#fff", border: `${1 * u}px solid ${c.borde}`, borderRadius: 6 * u, padding: `${14 * u}px ${18 * u}px`, fontFamily: f.cuerpo, fontSize: 23 * u, color: c.texto, maxWidth: "85%" }}>
            Hola, vi la cobija en Instagram, ¿cuánto cuesta?
          </div>
          <div style={{ alignSelf: "flex-end", background: c.primario, borderRadius: 6 * u, padding: `${14 * u}px ${18 * u}px`, fontFamily: f.cuerpo, fontSize: 23 * u, color: "#fff", maxWidth: "88%" }}>
            <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 16 * u, color: c.suave, marginBottom: 4 * u }}>Bot</div>
            ¡Hola! Te paso el precio de tu talla. ¿A qué ciudad te la enviamos? Pagas cuando recibes.
          </div>
        </Tarjeta>
        <Rotulo color={c.grisOscuro}>Conversación de ejemplo</Rotulo>
      </Entrar>
      <EnPiso pose="laptop-guino" ancho={430} left={620} retraso={18} />
    </Escenario>
  );
}

// 4 · 02:16 — arma el pedido.
function Arma() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  const e: Escena = { fondo: c.secundario, piso: "#06244F", oscuro: true };
  const fila = (k: string, v: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 20 * u, padding: `${12 * u}px 0`, borderBottom: `${1 * u}px solid ${c.borde}`, fontSize: 23 * u }}>
      <div style={{ fontFamily: f.cuerpo, color: c.gris }}>{k}</div>
      <div style={{ fontFamily: f.cuerpoFuerte, fontWeight: 600, color: c.texto, textAlign: "right" }}>{v}</div>
    </div>
  );
  return (
    <Escenario n={4} e={e}>
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 150 * u, width: 936 * u }}>
        <Hora hora="02:16" sufijo="a. m." color={c.acento} />
        <Frase color={c.textoClaro} acento={c.suave} style={{ marginTop: 22 * u }}>
          {"El pedido queda armado. *Dirección, ciudad y precio, sin que muevas un dedo.*"}
        </Frase>
      </Entrar>
      <EnPiso pose="compras" ancho={440} left={30} retraso={16} desde="izquierda" />
      <Entrar desde="derecha" retraso={10} style={{ position: "absolute", left: 470 * u, top: 610 * u, width: 540 * u }}>
        <Tarjeta>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 * u }}>
            <div style={{ fontFamily: f.titulo, fontWeight: 700, fontSize: 30 * u, color: c.secundario }}>Pedido nuevo</div>
            <Pill texto="Confirmado" tono="info" />
          </div>
          {fila("Producto", "Cobija Piel de Conejo")}
          {fila("Ciudad", "Guayaquil")}
          {fila("Pago", "Contra entrega")}
        </Tarjeta>
        <Rotulo color={c.grisOscuro}>Pedido de ejemplo</Rotulo>
      </Entrar>
    </Escenario>
  );
}

// 5 · 09:00 — despacha.
function Despacha() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  const e: Escena = { fondo: c.niebla, piso: c.suave, oscuro: false };
  return (
    <Escenario n={5} e={e}>
      {/* Sol plano */}
      <div style={{ position: "absolute", left: 860 * u, top: 160 * u, width: 130 * u, height: 130 * u, borderRadius: "50%", background: c.dorado }} />
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 150 * u, width: 780 * u }}>
        <Hora hora="09:00" sufijo="a. m." color={c.primario} />
        <Frase color={c.secundario} acento={c.acento} style={{ marginTop: 22 * u }}>
          {"Sale a Dropi. *Servientrega, Laar y las demás en una sola columna.*"}
        </Frase>
      </Entrar>
      <Entrar desde="izquierda" retraso={12} style={{ position: "absolute", left: 72 * u, top: 640 * u, display: "flex", flexDirection: "column", gap: 18 * u, alignItems: "flex-start" }}>
        {[["Confirmado", "info"], ["Enviado", "neutro"], ["En reparto", "alerta"]].map(([t, tono], i) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 16 * u }}>
            <div style={{ width: 40 * u, fontFamily: f.titulo, fontWeight: 700, fontSize: 26 * u, color: c.primario }}>{i + 1}</div>
            <div style={{ transform: "scale(1.25)", transformOrigin: "left center" }}>
              <Pill texto={t} tono={tono as "info"} />
            </div>
          </div>
        ))}
      </Entrar>
      <EnPiso pose="rapido" ancho={420} left={600} retraso={14} />
    </Escenario>
  );
}

// 6 · 15:30 — pelea la novedad.
function Novedad() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  const e: Escena = { fondo: "#FFFFFF", piso: c.superficie, oscuro: false };
  return (
    <Escenario n={6} e={e}>
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 150 * u, width: 936 * u }}>
        <Hora hora="15:30" sufijo="p. m." color={c.alerta} />
        <Frase color={c.secundario} acento={c.acento} style={{ marginTop: 22 * u }}>
          {"El cliente no estaba. *La novedad abre un caso con dueño, plazo y reintentos.*"}
        </Frase>
      </Entrar>
      <EnPiso pose="escudo" ancho={420} left={40} retraso={16} desde="izquierda" />
      <Entrar desde="derecha" retraso={10} style={{ position: "absolute", left: 500 * u, top: 640 * u, width: 510 * u }}>
        <Tarjeta style={{ display: "flex", flexDirection: "column", gap: 16 * u }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: f.titulo, fontWeight: 700, fontSize: 28 * u, color: c.secundario }}>Novedad</div>
            <Pill texto="Reintento 2 de 3" tono="alerta" />
          </div>
          <div style={{ fontFamily: f.cuerpo, fontSize: 22 * u, color: c.gris, lineHeight: 1.4 }}>Cliente ausente · Llamar y reprogramar</div>
          <div style={{ display: "flex", gap: 10 * u }}>
            <Pill texto="Con dueño" tono="neutro" />
            <Pill texto="Con plazo" tono="neutro" />
          </div>
        </Tarjeta>
        <Rotulo color={c.gris}>Caso de ejemplo</Rotulo>
      </Entrar>
    </Escenario>
  );
}

// 7 · 18:00 — cobras.
function Cobras() {
  const { marca, u } = useLienzo();
  const c = marca.colores;
  const e: Escena = { fondo: c.primario, piso: c.secundario, oscuro: true };
  return (
    <Escenario n={7} e={e}>
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 150 * u, width: 936 * u }}>
        <Hora hora="18:00" sufijo="p. m." color={c.suave} />
        <Frase tam={120} color={c.textoClaro} acento={c.suave} style={{ marginTop: 30 * u }}>
          {"Entregado. *Cobraste.*"}
        </Frase>
      </Entrar>
      <Entrar retraso={14} style={{ position: "absolute", left: 72 * u, top: 690 * u, transform: "scale(1.6)", transformOrigin: "left top" }}>
        <div style={{ background: "#fff", borderRadius: 4 * u }}>
          <Pill texto="Entregado" tono="ok" />
        </div>
      </Entrar>
      <EnPiso pose="vamos" ancho={520} left={480} retraso={10} entrada="salto" />
      <Entrar retraso={34} style={{ position: "absolute", left: 72 * u, top: 860 * u }}>
        <Nota texto={"Pagas cuando\nrecibes"} color={c.suave} tam={46} giro={-5} />
      </Entrar>
    </Escenario>
  );
}

// 8 · 23:00 — cierra el día.
function Descansa() {
  const { marca, u } = useLienzo();
  const c = marca.colores;
  const e: Escena = { fondo: c.oscuro, piso: c.oscuroElevado, oscuro: true };
  return (
    <Escenario n={8} e={e}>
      <div style={{ position: "absolute", left: 860 * u, top: 150 * u, width: 110 * u, height: 110 * u, borderRadius: "50%", background: c.suave, opacity: 0.9 }} />
      <div style={{ position: "absolute", left: 893 * u, top: 133 * u, width: 110 * u, height: 110 * u, borderRadius: "50%", background: c.oscuro }} />
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 150 * u, width: 780 * u }}>
        <Hora hora="23:00" sufijo="p. m." color={c.acento} />
        <Frase tam={70} color={c.textoClaro} acento={c.acento} style={{ marginTop: 26 * u }}>
          {"Menos plataformas abiertas. *Más pedidos cobrados.*"}
        </Frase>
      </Entrar>
      <EnPiso pose="relajado" ancho={600} left={240} retraso={12} entrada="crece" />
      <Entrar retraso={34} style={{ position: "absolute", left: 640 * u, top: 790 * u }}>
        <Nota texto={"Mañana lo hace\notra vez"} color={c.suave} tam={42} izquierda giro={4} />
      </Entrar>
    </Escenario>
  );
}

// 9 · Cierre: guardar, compartir y la oferta tal cual la landing.
function Cierre() {
  const { marca, u, f } = useLienzo();
  const c = marca.colores;
  const e: Escena = { fondo: c.secundario, piso: c.primario, oscuro: true };
  const chip = (ico: string, texto: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 * u, border: `${2 * u}px solid ${c.suave}`, borderRadius: 6 * u, padding: `${14 * u}px ${20 * u}px`, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 23 * u, color: c.textoClaro }}>
      <Icono nombre={ico} tam={28} color={c.suave} />
      {texto}
    </div>
  );
  return (
    <Escenario n={9} e={e}>
      <Entrar retraso={0} style={{ position: "absolute", left: 72 * u, top: 170 * u, width: 900 * u }}>
        <Frase tam={96} color={c.textoClaro} acento={c.acento}>
          {"Tu nuevo vendedor *puede empezar hoy.*"}
        </Frase>
        <div style={{ marginTop: 26 * u, fontFamily: f.cuerpo, fontSize: 28 * u, color: c.niebla, fontFeatureSettings: "'tnum'" }}>Desde $29/mes · Tu mismo número · Sin permanencia</div>
      </Entrar>
      <Entrar desde="abajo" retraso={12} style={{ position: "absolute", left: 72 * u, top: 610 * u }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 * u, background: c.whatsapp, color: c.secundario, borderRadius: 6 * u, padding: `${22 * u}px ${32 * u}px`, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 30 * u, width: "fit-content" }}>
          <Icono nombre="simple-icons-whatsapp" tam={34} color={c.secundario} />
          Hablar por WhatsApp
        </div>
        <div style={{ marginTop: 28 * u, display: "flex", flexDirection: "column", gap: 14 * u, alignItems: "flex-start" }}>
          {chip("tabler-bookmark", "Guárdalo")}
          {chip("tabler-send", "Compártelo con quien vende contra entrega")}
        </div>
        <div style={{ marginTop: 24 * u, fontFamily: f.cuerpoFuerte, fontWeight: 600, fontSize: 24 * u, color: c.textoClaro }}>{marca.contacto.instagram}</div>
      </Entrar>
      <EnPiso pose="pulgar" ancho={380} left={650} retraso={16} entrada="salto" />
    </Escenario>
  );
}

export default definirPost({
  marca: "scale-com",
  formatos: ["instagram-carrusel", "linkedin-documento"],
  slides: [Gancho, Agenda, Atiende, Arma, Despacha, Novedad, Cobras, Descansa, Cierre],
  segundosPorSlide: 4,
  caption:
    "Tu nuevo vendedor no duerme. Atiende a las 2 a. m. con los precios de tu catálogo, arma el pedido, lo despacha a Dropi, pelea cada novedad y tú cobras al entregar.\n\nGuárdalo y compártelo con quien vende contra entrega.\nDesde $29/mes · Tu mismo número · Sin permanencia.",
  hashtags: ["scalEcom", "ContraEntrega", "EcommerceEcuador", "WhatsAppBusiness", "Dropi"],
});
