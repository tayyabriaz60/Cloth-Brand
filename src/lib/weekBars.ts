const EMPTY_BAR = 0;
const MIN_VISIBLE_RATIO = 0.06;

/** Scale week totals to bar pixel heights. Zero stays zero. */
export function weekBarHeights(totals: readonly number[], maxPx: number): number[] {
  const peak = Math.max(0, ...totals);
  if (peak <= 0) return totals.map(() => EMPTY_BAR);
  const minVisible = Math.round(maxPx * MIN_VISIBLE_RATIO);
  return totals.map((total) => {
    if (total <= 0) return EMPTY_BAR;
    return Math.max(minVisible, Math.round((total / peak) * maxPx));
  });
}
