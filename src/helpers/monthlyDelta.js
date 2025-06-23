import {isSameMonth, subMonths} from 'date-fns';

/**
 * Devolve totais do mês actual, do mês anterior,
 * a diferença absoluta e a variação em percentagem.
 *
 * @param {Array<object>} items        – array de registos
 * @param {string}        dateField    – chave com timestamp (ex.: "created_at")
 * @param {function}      extraFilter  – filtro opcional (ex.: s => s.active)
 *
 * @returns {{ current: number, previous: number, diff: number, pct: number }}
 */
export function monthlyDelta(
    items,
    dateField = 'created_at',
    extraFilter = () => true,
) {
  const now = new Date();
  const prevMonth = subMonths(now, 1);

  // aplica filtro extra (ex.: apenas sites activos)
  const arr = items.filter(extraFilter);

  const current = arr.filter(
      i => isSameMonth(new Date(i[dateField]), now)).length;
  const previous = arr.filter(
      i => isSameMonth(new Date(i[dateField]), prevMonth)).length;

  const diff = current - previous;

  let pct;
  if (previous === 0) {
    // mês anterior vazio
    pct = current === 0 ? 0 : current * 100;  // 4 → 400 %, 0 → 0 %
  } else {
    pct = (diff / previous) * 100;
  }

  return {current, previous, diff, pct};
}
