// GENERADO desde scaleCom (scripts/exportar-mascota.mjs, ADR-0074). No editar aquí: cambia scaleCom y vuelve a exportar.
import type { Estilo, Gesto } from './rive-contrato';

// ADR-0074: qué cara pone cada gesto y cada estilo. La usa el cerebro (mascota viva) y la mascota
// quieta, que la pinta una sola vez sin JS.
export type Cara = { boca?: string; ojos?: string; cejas?: string; mejillas?: boolean };

export const CARAS: Partial<Record<Gesto, Cara>> = {
  escribiendo: { boca: 'plana' }, pensando: { boca: 'plana', cejas: 'arriba' },
  contenta: { boca: 'abierta', ojos: 'felices', mejillas: true }, rodar: { boca: 'abierta' },
  tapada: { ojos: 'cerrados', boca: 'plana' }, espia: { ojos: 'guino', boca: 'plana' },
  triste: { boca: 'triste', cejas: 'tristes' }, dormida: { ojos: 'cerrados', boca: 'plana' },
  buscando: { boca: 'o', cejas: 'arriba' },
};
export const CARA_ESTILO: Record<Estilo['cara'], Cara> = {
  normal: {}, guino: {}, creida: { boca: 'creida' }, enojada: { boca: 'creida', cejas: 'enojadas' },
};

/** La cara como atributos data-* de la raíz. */
export function atributosCara(c: Cara) {
  return { boca: c.boca ?? 'sonrisa', ojos: c.ojos ?? 'abiertos', cejas: c.cejas ?? 'ninguna', mejillas: c.mejillas ? 'si' : 'no' };
}
export const caraDe = (gesto: Gesto, cara: Estilo['cara']): Cara => ({ ...CARA_ESTILO[cara], ...CARAS[gesto] });
