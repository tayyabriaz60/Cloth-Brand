import { Link } from "react-router";
import { useLanguage } from "../../i18n/LanguageContext";
import { DEMO_MODE, ROUTES } from "../../lib/constants";
import { localizedName } from "../../lib/format";
import { PAGE_TITLES } from "../../lib/nav";
import type { Me } from "../../types/auth";
import { Button } from "../ui/Button";
import { LanguageToggle } from "./LanguageToggle";

interface TopBarProps {
  me: Me;
  pathname: string;
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

export function TopBar({ me, pathname, collapsed, onToggle, onLogout }: TopBarProps) {
  const { t, language } = useLanguage();
  const titleKey = PAGE_TITLES[pathname] ?? "nav.dashboard.label";
  const shopName = localizedName(me.shop.name_ur, me.shop.name_en, language);
  const roleLabel = me.user.role === "owner" ? t("home.role.owner") : t("home.role.cashier");

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-2 border-b border-slate-200 bg-white px-3">
      <Button
        variant="secondary"
        className="min-h-11 shrink-0 px-3"
        onClick={onToggle}
        aria-label={t("nav.collapse.aria")}
        aria-pressed={collapsed}
      >
        <span aria-hidden="true">☰</span>
      </Button>
      <h1 className="min-w-0 flex-1 truncate font-heading text-xl font-bold text-slate-900">{t(titleKey)}</h1>
      <Link
        to={ROUTES.newBill}
        className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#0B9BFF] px-4 text-base font-semibold text-white"
      >
        {t("nav.newBill.label")}
      </Link>
      <LanguageToggle />
      {DEMO_MODE ? (
        <span className="hidden rounded-full bg-amber-100 px-2 py-0.5 text-sm font-semibold text-amber-900 sm:inline">
          {t("app.demo.badge")}
        </span>
      ) : null}
      <div className="hidden min-w-0 flex-col items-end sm:flex">
        <span className="max-w-40 truncate text-sm font-semibold text-slate-800">{shopName}</span>
        <span className="rounded-full bg-blue-100 px-2 text-xs font-semibold text-blue-800">{roleLabel}</span>
      </div>
      <Button variant="secondary" className="min-h-11 shrink-0" onClick={onLogout}>
        {t("shell.logout.button")}
      </Button>
    </header>
  );
}
