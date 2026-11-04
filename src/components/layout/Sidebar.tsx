import { NavLink } from "react-router";
import { useLanguage } from "../../i18n/LanguageContext";
import { navItemsFor, type NavItem } from "../../lib/nav";
import type { Role } from "../../types/auth";
import { NavIcon } from "./NavIcon";

interface SidebarProps {
  role: Role;
  collapsed: boolean;
}

export function Sidebar({ role, collapsed }: SidebarProps) {
  const { t } = useLanguage();
  const items = navItemsFor(role);
  return (
    <aside
      className={`hidden shrink-0 flex-col border-e border-slate-200 bg-white py-3 lg:flex ${collapsed ? "w-16 items-center" : "w-56"}`}
    >
      <nav className="flex flex-col gap-1 px-2">
        {items.map((item) => (
          <SideLink key={item.to} item={item} collapsed={collapsed} label={t(item.labelKey)} />
        ))}
      </nav>
    </aside>
  );
}

interface SideLinkProps {
  item: NavItem;
  collapsed: boolean;
  label: string;
}

function SideLink({ item, collapsed, label }: SideLinkProps) {
  return (
    <NavLink
      to={item.to}
      title={label}
      className={({ isActive }) =>
        `flex min-h-11 items-center gap-3 rounded-xl px-3 text-base font-semibold ${
          isActive ? "bg-indigo-100 text-indigo-800" : "text-slate-700 hover:bg-slate-100"
        } ${collapsed ? "justify-center px-0" : ""}`
      }
    >
      <NavIcon name={item.icon} />
      {collapsed ? <span className="sr-only">{label}</span> : label}
    </NavLink>
  );
}
