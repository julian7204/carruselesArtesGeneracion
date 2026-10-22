// GENERADO desde scaleCom (scripts/exportar-mascota.mjs, ADR-0074). No editar aquí: cambia scaleCom y vuelve a exportar.
// ADR-0074: contrato entre el archivo de Rive (`mascota.riv`) y el código.
// Los nombres de aquí tienen que existir tal cual en el editor de Rive (mayúsculas incluidas).
// La guía para construirlo está en docs/brand/mascota-rive.md. Si cambias un nombre, cámbialo en los dos.
// Sin 'use client' ni imports: lo leen páginas del servidor y la landing (scripts/exportar-mascota.mjs).

export const RIVE = {
  archivo: '/mascota/mascota.riv',
  artboard: 'Mascota',
  maquina: 'Cerebro',
  viewModel: 'Personaje',
} as const;

/** Estados que dura lo que dure la situación (el bot escribe, está en pausa…). Enum `Gesto` en Rive. */
export const GESTOS = ['reposo', 'escribiendo', 'pensando', 'contenta', 'rodar', 'tapada', 'espia', 'triste', 'dormida', 'buscando'] as const;

/** Acciones de una sola vez (triggers en el View Model). El código las dispara; Rive vuelve solo al gesto. */
export const ACCIONES = ['saltar', 'celebrar', 'mareo', 'saludar', 'preocupada', 'bostezo', 'estirarse', 'mirarAlrededor'] as const;

/** Piezas que se pueden poner y quitar: cada una es un enum en Rive. 'ninguno' es siempre el primer valor. */
export const PIEZAS = {
  cabeza: ['ninguno', 'cinta', 'auriculares', 'gorra', 'corona', 'gafas', 'birrete'],
  cuello: ['ninguno', 'bufanda', 'corbatin', 'cadena'],
  mano: ['ninguno', 'lupa', 'caja', 'celular', 'moneda', 'pin'],
  cara: ['normal', 'guino', 'creida', 'enojada'],
  aura: ['ninguna', 'brillos', 'facetas', 'dorada'],
} as const;

export type Gesto = (typeof GESTOS)[number];
/** ADR-0056: el personaje por nivel del ranking. */
export type Skin = 'rookie' | 'bronce-1' | 'bronce-2' | 'plata-1' | 'plata-2' | 'oro-1' | 'oro-2' | 'diamante' | 'titan';
export type Accion = (typeof ACCIONES)[number];
export type Pieza = keyof typeof PIEZAS;

/** Lo que una tienda guarda de su personaje. Los colores van en hex (#rrggbb). */
export interface Estilo {
  cuerpo: string;
  detalle: string;
  ruedas: string;
  cabeza: (typeof PIEZAS)['cabeza'][number];
  cuello: (typeof PIEZAS)['cuello'][number];
  mano: (typeof PIEZAS)['mano'][number];
  cara: (typeof PIEZAS)['cara'][number];
  aura: (typeof PIEZAS)['aura'][number];
}

/**
 * Propiedades numéricas y booleanas del View Model:
 * - `miradaX`, `miradaY` (-1 a 1): hacia dónde mira; el código las calcula desde el puntero.
 * - `animado` (bool): false = modo tranquilo, sin reposos en bucle (WCAG 2.2.2, ADR-0045).
 */
export const PROPIEDADES = { miradaX: 'miradaX', miradaY: 'miradaY', animado: 'animado' } as const;
