import type { Language } from "../i18n/translate";

/** English name when available and the UI is English, else the (required) Urdu name. */
export function localizedName(nameUr: string, nameEn: string | null, language: Language): string {
  return language === "en" && nameEn?.trim() ? nameEn : nameUr;
}
