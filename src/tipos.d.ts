// Archivos que webpack (Remotion) convierte en URL al importarlos.
declare module "*.png" { const url: string; export default url; }
declare module "*.jpg" { const url: string; export default url; }
declare module "*.jpeg" { const url: string; export default url; }
declare module "*.webp" { const url: string; export default url; }
declare module "*.svg" { const url: string; export default url; }

interface ContextoWebpack {
  keys(): string[];
  (id: string): any;
}

interface ImportMeta {
  webpackContext(dir: string, opciones: { recursive?: boolean; regExp?: RegExp }): ContextoWebpack;
}
