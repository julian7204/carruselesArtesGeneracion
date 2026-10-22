// Envoltorio estático del personaje de scalEcom para el kit. El dibujo (arte-svg.ts), las caras (caras.ts),
// los tipos (rive-contrato.ts) y los estilos (personaje.css) son copia exacta de landingScalEcom/src/mascota,
// que a su vez los genera scaleCom (ADR-0074). No se editan aquí: si cambian allá, se vuelven a copiar.
import type { CSSProperties } from "react";
import { ARTE_SVG } from "./arte-svg";
import { caraDe, atributosCara } from "./caras";
import type { Gesto } from "./rive-contrato";
import "./personaje.css";

type Accesorio = "ninguno" | "pin" | "caja" | "moneda" | "auriculares" | "lupa" | "birrete" | "celular";

export function Mascota({
  gesto = "reposo",
  accesorio = "ninguno",
  ancho = 160,
  colores,
  oscuro = false,
  style,
}: {
  gesto?: Gesto;
  accesorio?: Accesorio;
  ancho?: number;
  /** Mismos tokens que la landing: cuerpo = acento, tinta = navy, suave = soft, oro = dorado. */
  colores: { cuerpo: string; tinta: string; suave: string; oro: string };
  /** Sobre fondo oscuro: ruedas y brazos en el color suave (clase m-dark de personaje.css). */
  oscuro?: boolean;
  style?: CSSProperties;
}) {
  const enCabeza = accesorio === "auriculares" || accesorio === "birrete";
  const cara = atributosCara(caraDe(gesto, "guino"));
  return (
    <span
      className={oscuro ? "personaje m-dark" : "personaje"}
      data-quieta=""
      data-gesto={gesto}
      data-cara-base="guino"
      data-boca={cara.boca}
      data-ojos={gesto === "reposo" ? "guino" : cara.ojos}
      data-cejas={cara.cejas}
      data-mejillas={cara.mejillas}
      data-cabeza={enCabeza ? accesorio : "ninguno"}
      data-mano={enCabeza ? "ninguno" : accesorio}
      data-cuello="ninguno"
      data-aura="ninguna"
      data-medalla="ninguna"
      style={
        {
          "--mascot-body": colores.cuerpo,
          "--mascot-ink": colores.tinta,
          "--mascot-soft": colores.suave,
          "--mascot-gold": colores.oro,
          "--m-size": `${ancho}px`,
          ...style,
        } as CSSProperties
      }
      dangerouslySetInnerHTML={{ __html: ARTE_SVG }}
    />
  );
}
