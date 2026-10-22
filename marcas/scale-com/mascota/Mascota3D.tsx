// Mascota 3D de scalEcom (poses recortadas de referencias/mascota-3d-hoja.webp, enviada por el dueño de la marca).
// Animación pensada para personaje: entra con rebote (rodando, saltando o creciendo) y luego "respira":
// rebota y se aplasta un poco al tocar el piso. El ciclo termina en reposo justo en el último frame,
// así el PNG (que se toma del último frame) siempre sale en su pose limpia.
import type { CSSProperties } from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { archivoMarca } from "../../../src/kit/marca";

export type Pose =
  | "saluda" | "laptop-guino" | "lentes" | "celular" | "rapido" | "resultados" | "corazon" | "cohete"
  | "concentrado" | "compras" | "vamos" | "escudo" | "bandera" | "idea" | "relajado" | "pulgar";

type Entrada = "rodando" | "salto" | "crece" | "despega" | "nada";

export function Mascota3D({
  pose,
  ancho,
  entrada = "rodando",
  retraso = 0,
  desde = "derecha",
  giro = 0,
  espejo = false,
  sombra = true,
  rebote = 1,
  style,
}: {
  pose: Pose;
  /** Ancho en px ya escalado (usa ancho * u). */
  ancho: number;
  entrada?: Entrada;
  retraso?: number;
  desde?: "derecha" | "izquierda";
  /** Inclinación final en grados. */
  giro?: number;
  /** Voltea horizontalmente (para que mire hacia el texto). */
  espejo?: boolean;
  sombra?: boolean;
  /** Intensidad del rebote en reposo (0 = quieto). */
  rebote?: number;
  style?: CSSProperties;
}) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const src = archivoMarca("scale-com", `mascota/3d/${pose}.png`);
  if (!src) throw new Error(`No existe la pose ${pose}`);

  // Entrada con sobrepaso (resorte poco amortiguado = rebote simpático).
  const p = spring({ frame: frame - retraso, fps, config: { damping: 10, mass: 0.9, stiffness: 110 } });
  const lado = desde === "derecha" ? 1 : -1;
  let entradaT = "";
  if (entrada === "rodando") entradaT = `translateX(${(1 - p) * ancho * 1.6 * lado}px) rotate(${(1 - p) * 14 * lado}deg)`;
  if (entrada === "salto") entradaT = `translateY(${(1 - p) * ancho * 0.9}px)`;
  if (entrada === "crece") entradaT = `scale(${Math.max(0, p)})`;
  if (entrada === "despega") entradaT = `translate(${(1 - p) * -ancho * 0.6}px, ${(1 - p) * ancho * 1.2}px)`;

  // Respiración: dos saltitos por slide, en cero exacto en el último frame.
  const fase = Math.max(0, frame - retraso - 18) / Math.max(1, durationInFrames - 1 - retraso - 18);
  const onda = Math.sin(Math.PI * 4 * Math.min(1, fase));
  const alto = Math.abs(onda) * ancho * 0.045 * rebote;
  const aplasta = interpolate(Math.abs(onda), [0, 0.15, 1], [1, 0.965, 1.01]) * 1;
  const estira = 2 - aplasta;

  return (
    <div style={{ position: "relative", width: ancho, ...style }}>
      {sombra && (
        <div
          style={{
            position: "absolute",
            left: "18%",
            right: "18%",
            bottom: -ancho * 0.015,
            height: ancho * 0.07,
            borderRadius: "50%",
            background: "rgba(0,27,72,.28)",
            filter: `blur(${ancho * 0.025}px)`,
            transform: `scale(${1 - alto / (ancho * 0.2)})`,
            opacity: Math.min(1, p),
          }}
        />
      )}
      <Img
        src={src}
        style={{
          display: "block",
          width: "100%",
          transformOrigin: "50% 100%",
          transform: `${entradaT} translateY(${-alto}px) scale(${(espejo ? -1 : 1) * (rebote ? estira : 1)}, ${rebote ? aplasta : 1}) rotate(${giro * (espejo ? -1 : 1)}deg)`,
        }}
      />
    </div>
  );
}
