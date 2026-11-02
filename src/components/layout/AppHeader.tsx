import type { ReactNode } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { DEMO_MODE } from "../../lib/constants";
import { LanguageToggle } from "./LanguageToggle";

interface AppHeaderProps {
  actions?: ReactNode;
}

export function AppHeader({ actions }: AppHeaderProps) {
  const { t } = useLanguage();
  return (
    <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="font-heading text-xl font-bold text-blue-800">{t("app.name.title")}</span>
        {DEMO_MODE ? (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-sm font-semibold text-amber-900">
            {t("app.demo.badge")}
          </span>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <LanguageToggle />
      </div>
    </header>
  );
}
