import { Link } from "react-router";
import { CardIcon, StatCard } from "../components/dashboard/StatCard";
import { DashboardLists } from "../components/dashboard/DashboardLists";
import { WeekChart } from "../components/dashboard/WeekChart";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { Notice } from "../components/ui/Notice";
import { useDashboard } from "../hooks/useDashboard";
import { useSlowFlag } from "../hooks/useSlowFlag";
import { useLanguage } from "../i18n/LanguageContext";
import { CARD_COLORS, ROUTES } from "../lib/constants";
import { errorMessageKey } from "../lib/errors";
import { formatMoney } from "../lib/format";
import { isOwnerDashboard } from "../types/dashboard";

export function DashboardPage() {
  const { t } = useLanguage();
  const query = useDashboard();
  const slow = useSlowFlag(query.isPending);

  if (query.isPending) {
    return (
      <div className="flex flex-col gap-4" aria-busy="true" aria-label={t("dashboard.loading.label")}>
        <div className="h-16 animate-pulse rounded-xl bg-slate-200" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
        </div>
        {slow ? <Notice>{t("status.slow.message")}</Notice> : null}
      </div>
    );
  }

  if (query.isError) {
    return (
      <Alert
        action={
          <Button variant="secondary" onClick={() => void query.refetch()}>
            {t("error.retry.button")}
          </Button>
        }
      >
        {t(errorMessageKey(query.error))}
      </Alert>
    );
  }

  const data = query.data;
  const owner = isOwnerDashboard(data);

  return (
    <div className="flex flex-col gap-5">
      <Link
        to={ROUTES.newBill}
        className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#10C06F] text-2xl font-bold text-white shadow-md"
      >
        {t("dashboard.newBill.button")}
      </Link>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {owner ? (
          <>
            <StatCard
              label={t("dashboard.sales.label")}
              value={formatMoney(data.today_sales)}
              color={CARD_COLORS.blue}
              icon={<CardIcon d="M4 16h16 M8 16V8h8v8" />}
            />
            <StatCard
              label={t("dashboard.received.label")}
              value={formatMoney(data.today_received)}
              color={CARD_COLORS.green}
              icon={<CardIcon d="M12 5v14 M7 10l5-5 5 5" />}
            />
          </>
        ) : null}
        <StatCard
          label={t("dashboard.udhaar.label")}
          value={formatMoney(data.total_udhaar)}
          color={CARD_COLORS.red}
          to={ROUTES.udhaar}
          icon={<CardIcon d="M12 5v14 M7 9h10 M7 15h7" />}
        />
        <StatCard
          label={t("dashboard.lowStock.label")}
          value={String(data.low_stock_count)}
          color={CARD_COLORS.amber}
          to={ROUTES.stock}
          icon={<CardIcon d="M4 7h16v10H4z" />}
        />
      </div>

      <DashboardLists udhaar={data.top_udhaar} lowStock={data.low_stock} bills={data.last_bills} />
      {owner ? <WeekChart sales={data.week_sales} /> : null}
    </div>
  );
}
