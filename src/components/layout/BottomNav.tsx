import { NavLink } from "react-router";
import { useLanguage } from "../../i18n/LanguageContext";
import { navItemsFor } from "../../lib/nav";
import type { Role } from "../../types/auth";
import { NavIcon } from "./NavIcon";

interface BottomNavProps {
  role: Role;
}

export function BottomNav({ role }: BottomNavProps) {
  const { t } = useLanguage();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex overflow-x-auto border-t border-slate-200 bg-white px-1 py-1 lg:hidden">
      {navItemsFor(role).map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex min-h-14 min-w-16 flex-1 flex-col items-center justify-center gap-0.5 px-2 text-xs font-semibold ${
              isActive ? "bg-indigo-100 text-indigo-800" : "text-slate-600"
            }`
          }
        >
          <NavIcon name={item.icon} />
          <span className="whitespace-nowrap">{t(item.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
