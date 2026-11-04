import type { NavItem } from "../../lib/nav";

interface NavIconProps {
  name: NavItem["icon"];
}

export function NavIcon({ name }: NavIconProps) {
  const path = ICON_PATHS[name];
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICON_PATHS: Record<NavItem["icon"], string> = {
  home: "M4 10.5 12 4l8 6.5V20H4z",
  bill: "M7 4h10v16H7z M10 8h4 M10 12h4",
  stock: "M4 7h16v10H4z M4 11h16",
  udhaar: "M12 5v14 M7 9h10 M7 15h7",
  box: "M4 8l8-4 8 4v8l-8 4-8-4z M12 4v16",
  gear: "M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z M12 2v3 M12 19v3 M4 12H2 M22 12h-2",
};
