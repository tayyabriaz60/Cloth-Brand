import type { Language } from "../i18n/translate";

const LATN = { numberingSystem: "latn" } as const;

/** English name when available and the UI is English, else the (required) Urdu name. */
export function localizedName(nameUr: string, nameEn: string | null, language: Language): string {
  return language === "en" && nameEn?.trim() ? nameEn : nameUr;
}

export function formatMoney(rupees: number): string {
  const grouped = new Intl.NumberFormat("en-PK", {
    ...LATN,
    maximumFractionDigits: 0,
  }).format(rupees);
  return `Rs ${grouped}`;
}

export function formatQty(qty: number): string {
  return new Intl.NumberFormat("en-PK", {
    ...LATN,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(qty);
}

export function formatTime(iso: string, language: Language): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(language === "ur" ? "ur-PK" : "en-PK", {
    ...LATN,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function weekdayLabel(isoDate: string, language: Language): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat(language === "ur" ? "ur-PK" : "en-PK", {
    ...LATN,
    weekday: "short",
  }).format(date);
}
