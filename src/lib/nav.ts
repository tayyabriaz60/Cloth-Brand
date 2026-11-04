import type { TranslationKey } from "../i18n/ur";
import { ROUTES } from "./constants";

export interface NavItem {
  to: string;
  labelKey: TranslationKey;
  icon: "home" | "bill" | "stock" | "udhaar" | "box" | "gear";
  ownerOnly?: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: ROUTES.home, labelKey: "nav.dashboard.label", icon: "home" },
  { to: ROUTES.newBill, labelKey: "nav.newBill.label", icon: "bill" },
  { to: ROUTES.stock, labelKey: "nav.stock.label", icon: "stock" },
  { to: ROUTES.udhaar, labelKey: "nav.udhaar.label", icon: "udhaar" },
  { to: ROUTES.products, labelKey: "nav.products.label", icon: "box", ownerOnly: true },
  { to: ROUTES.settings, labelKey: "nav.settings.label", icon: "gear", ownerOnly: true },
];

export const PAGE_TITLES: Record<string, TranslationKey> = {
  [ROUTES.home]: "nav.dashboard.label",
  [ROUTES.newBill]: "nav.newBill.label",
  [ROUTES.stock]: "nav.stock.label",
  [ROUTES.udhaar]: "nav.udhaar.label",
  [ROUTES.products]: "nav.products.label",
  [ROUTES.settings]: "nav.settings.label",
};

export function navItemsFor(role: "owner" | "cashier"): NavItem[] {
  return NAV_ITEMS.filter((item) => !item.ownerOnly || role === "owner");
}
