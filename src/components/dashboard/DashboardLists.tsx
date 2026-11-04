import type { ReactNode } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatMoney, formatQty, formatTime, localizedName } from "../../lib/format";
import type { LastBill, LowStockItem, PaymentType, TopUdhaar } from "../../types/dashboard";
import { isOwnerLastBill } from "../../types/dashboard";
import type { TranslationKey } from "../../i18n/ur";

interface DashboardListsProps {
  udhaar: TopUdhaar[];
  lowStock: LowStockItem[];
  bills: LastBill[];
}

export function DashboardLists({ udhaar, lowStock, bills }: DashboardListsProps) {
  const { t, language } = useLanguage();
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <ListCard title={t("dashboard.topUdhaar.title")} empty={t("dashboard.empty.udhaar")}>
        {udhaar.map((row) => (
          <li key={row.customer_id} className="flex justify-between gap-3 py-2">
            <span className="min-w-0 truncate font-semibold">{row.name}</span>
            <span className="shrink-0 text-red-700">{formatMoney(row.balance)}</span>
          </li>
        ))}
      </ListCard>
      <ListCard title={t("dashboard.lowStock.title")} empty={t("dashboard.empty.lowStock")}>
        {lowStock.map((row) => (
          <li key={row.product_id} className="flex justify-between gap-3 py-2">
            <span className="min-w-0 truncate font-semibold">
              {localizedName(row.name_ur, row.name_en, language)}
            </span>
            <span className="shrink-0">{formatQty(row.stock)}</span>
          </li>
        ))}
      </ListCard>
      <ListCard title={t("dashboard.lastBills.title")} empty={t("dashboard.empty.bills")}>
        {bills.map((bill) => (
          <li key={bill.id} className="flex justify-between gap-3 py-2">
            <span className="min-w-0 truncate font-semibold">
              #{bill.bill_no} · {formatTime(bill.created_at, language)} · {t(paymentKey(bill.payment_type))}
            </span>
            {isOwnerLastBill(bill) ? <span className="shrink-0">{formatMoney(bill.total)}</span> : null}
          </li>
        ))}
      </ListCard>
    </div>
  );
}

function paymentKey(type: PaymentType): TranslationKey {
  if (type === "cash") return "dashboard.bill.cash";
  if (type === "online") return "dashboard.bill.online";
  return "dashboard.bill.udhaar";
}

interface ListCardProps {
  title: string;
  empty: string;
  children: ReactNode;
}

function ListCard({ title, empty, children }: ListCardProps) {
  const items = Array.isArray(children) ? children : [children];
  const hasItems = items.filter(Boolean).length > 0;
  return (
    <section className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-2 font-heading text-xl font-bold text-slate-900">{title}</h2>
      {hasItems ? <ul className="divide-y divide-slate-100">{children}</ul> : <p className="text-slate-600">{empty}</p>}
    </section>
  );
}
