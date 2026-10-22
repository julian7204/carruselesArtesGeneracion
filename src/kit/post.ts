import type { ComponentType } from "react";
import type { NombreFormato } from "./formatos";

export type Post = {
  /** Carpeta de la marca en marcas/ */
  marca: string;
  /** Formatos a exportar. Los slides se adaptan con useLienzo() (ancho, alto, u). */
  formatos: NombreFormato[];
  /** Cada slide es un componente. Un post estático simple tiene un solo slide. */
  slides: ComponentType[];
  /** Duración de cada slide en el video (segundos). */
  segundosPorSlide?: number;
  /** Texto de la publicación y hashtags (se guardan en caption.txt). */
  caption?: string;
  hashtags?: string[];
};

export const definirPost = (p: Post) => p;
