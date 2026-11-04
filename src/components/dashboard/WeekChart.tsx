import { useLanguage } from "../../i18n/LanguageContext";
import { CARD_COLORS, WEEK_BAR_MAX_PX } from "../../lib/constants";
import { formatMoney, weekdayLabel } from "../../lib/format";
import { weekBarHeights } from "../../lib/weekBars";
import type { WeekSale } from "../../types/dashboard";

interface WeekChartProps {
  sales: WeekSale[];
}

export function WeekChart({ sales }: WeekChartProps) {
  const { t, language } = useLanguage();
  const heights = weekBarHeights(
    sales.map((row) => row.total),
    WEEK_BAR_MAX_PX,
  );
  return (
    <section className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-4 font-heading text-xl font-bold text-slate-900">{t("dashboard.week.title")}</h2>
      <div className="flex items-end justify-between gap-2">
        {sales.map((row, index) => (
          <div key={row.date} className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <span className="text-xs font-semibold text-slate-700">{formatMoney(row.total)}</span>
            <div
              className="w-full max-w-10 rounded-t-md"
              style={{ height: `${heights[index]}px`, backgroundColor: CARD_COLORS.blue }}
            />
            <span className="text-xs text-slate-600">{weekdayLabel(row.date, language)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
