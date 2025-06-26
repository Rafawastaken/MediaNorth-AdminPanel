// src/helpers/computeSiteStats.js
import { subMonths, isSameMonth } from "date-fns";

/** devolve { total, active, diff, pct }  (pct arredondado) */
export function computeSiteStats(sites = []) {
  if (!sites.length) return { total: 0, active: 0, diff: 0, pct: 0 };

  const now = new Date();
  const prevMonth = subMonths(now, 1);

  let total = 0, active = 0, prevActive = 0;

  for (const s of sites) {
    total += 1;
    if (s.active) active += 1;
    if (s.active && isSameMonth(new Date(s.created_at), prevMonth))
      prevActive += 1;
  }

  const diff = active - prevActive;
  const pct = prevActive === 0
    ? active * 100              // 0 → 3  ⇒ 300 %
    : (diff / prevActive) * 100;

  return { total, active, diff, pct: Number(pct.toFixed(0)) };
}
