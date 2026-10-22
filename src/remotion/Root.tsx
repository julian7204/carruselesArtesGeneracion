import { Composition, Folder } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { obtenerFormato } from "../kit/formatos";
import { Lienzo } from "../kit/Lienzo";
import { cargarMarca } from "../kit/marca";
import type { Post } from "../kit/post";

// Descubre solo cada posts/<marca>/<post>/post.tsx y registra:
//   <marca>--<post>--<formato>--<n>      un slide (para PNG y video por slide)
//   <marca>--<post>--<formato>--video    todo el carrusel como video con transición de deslizar

export const FPS = 30;
const TRANSICION = 14;

const posts = import.meta.webpackContext("../../posts", { recursive: true, regExp: /post\.tsx$/ });

const idSeguro = (s: string) => s.replace(/[^a-zA-Z0-9-]/g, "-");

export function listarPosts() {
  return posts.keys().flatMap((k) => {
    const m = k.match(/^\.\/([^/]+)\/([^/]+)\/post\.tsx$/);
    if (!m) return [];
    return [{ carpeta: `${m[1]}/${m[2]}`, id: idSeguro(`${m[1]}--${m[2]}`), post: posts(k).default as Post }];
  });
}

function Carrusel({ post, formato }: { post: Post; formato: string }) {
  const marca = cargarMarca(post.marca);
  const d = (post.segundosPorSlide ?? 4) * FPS;
  return (
    <TransitionSeries>
      {post.slides.map((S, i) => [
        <TransitionSeries.Sequence key={`s${i}`} durationInFrames={d}>
          <Lienzo marca={marca} formato={formato}>
            <S />
          </Lienzo>
        </TransitionSeries.Sequence>,
        i < post.slides.length - 1 && (
          <TransitionSeries.Transition key={`t${i}`} presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: TRANSICION })} />
        ),
      ])}
    </TransitionSeries>
  );
}

export function Root() {
  return (
    <>
      {listarPosts().map(({ id, post }) => {
        const marca = cargarMarca(post.marca);
        const d = (post.segundosPorSlide ?? 4) * FPS;
        return (
          <Folder key={id} name={id}>
            {post.formatos.map((formato) => {
              const { ancho, alto } = obtenerFormato(formato);
              const n = post.slides.length;
              return [
                ...post.slides.map((S, i) => (
                  <Composition
                    key={`${formato}-${i}`}
                    id={`${id}--${formato}--${i + 1}`}
                    width={ancho}
                    height={alto}
                    fps={FPS}
                    durationInFrames={d}
                    component={() => (
                      <Lienzo marca={marca} formato={formato}>
                        <S />
                      </Lienzo>
                    )}
                  />
                )),
                <Composition
                  key={`${formato}-video`}
                  id={`${id}--${formato}--video`}
                  width={ancho}
                  height={alto}
                  fps={FPS}
                  durationInFrames={n * d - (n - 1) * TRANSICION}
                  // El caption viaja como props para que scripts/render.ts lo guarde en caption.txt.
                  defaultProps={{ caption: post.caption ?? "", hashtags: post.hashtags ?? [] }}
                  component={() => <Carrusel post={post} formato={formato} />}
                />,
              ];
            })}
          </Folder>
        );
      })}
    </>
  );
}
