import { Circulo, definirPost, Entrar, Icono, Logo, Puntos, Texto, Textura, Titular, useLienzo } from "../../../src/kit";

// Post de muestra: 2 slides con solo tipografía, formas, íconos y textura (sin fotos).

function Portada() {
  const { marca, u, ancho } = useLienzo();
  const c = marca.colores;
  return (
    <>
      <Circulo diametro={720} color={c.primario} style={{ left: ancho - 420 * u, top: -200 * u }} />
      <Puntos filas={4} columnas={6} sep={46} tam={12} color={c.secundario} style={{ left: 80 * u, top: 1180 * u }} />
      <Logo alto={70} style={{ position: "absolute", left: 80 * u, top: 80 * u }} />
      <Entrar retraso={4} style={{ position: "absolute", left: 80 * u, top: 470 * u }}>
        <Titular
          ancho={900}
          interlineado={0.92}
          lineas={[
            { texto: "Ideas que", tam: 130, mayusculas: false },
            { texto: "se entienden", fuente: "script", tam: 150, color: c.primario, dx: 40 },
            { texto: "en 3 segundos.", tam: 130, mayusculas: false },
          ]}
        />
      </Entrar>
      <Entrar retraso={14} style={{ position: "absolute", left: 80 * u, top: 1000 * u, width: 700 * u }}>
        <Texto tam={34}>{"Un carrusel de muestra hecho con el kit: *tipografía real*, formas y textura."}</Texto>
      </Entrar>
      <Textura nombre="Paper006" opacidad={0.5} />
    </>
  );
}

function Cierre() {
  const { marca, u, ancho, alto } = useLienzo();
  const c = marca.colores;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c.primario }} />
      <Circulo diametro={520} borde={26} color={c.acento} style={{ left: -260 * u, top: alto - 360 * u }} />
      <Entrar retraso={2} style={{ position: "absolute", left: 80 * u, top: 360 * u, width: ancho - 160 * u }}>
        <Titular ancho={920} lineas={[{ texto: "¿Lo probamos con", tam: 96, color: c.textoClaro, mayusculas: false }, { texto: "tu proyecto?", fuente: "script", tam: 140, color: c.acento }]} />
      </Entrar>
      <Entrar retraso={12} style={{ position: "absolute", left: 80 * u, top: 760 * u, display: "flex", alignItems: "center", gap: 20 * u }}>
        <Icono nombre="tabler-sparkles" tam={56} color={c.acento} />
        <Texto tam={36} color={c.textoClaro}>{"Pídelo en una frase y Claude lo diseña."}</Texto>
      </Entrar>
      <Texto tam={28} color={c.textoClaro} style={{ position: "absolute", left: 80 * u, top: alto - 130 * u, opacity: 0.8 }}>
        {marca.contacto.web}
      </Texto>
      <Textura nombre="Paper006" opacidad={0.35} />
    </>
  );
}

export default definirPost({
  marca: "ejemplo",
  formatos: ["instagram-carrusel"],
  slides: [Portada, Cierre],
  caption: "Carrusel de muestra del estudio.",
  hashtags: ["diseño", "carrusel"],
});
