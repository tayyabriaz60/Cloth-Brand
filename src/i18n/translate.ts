import { en } from "./en";
import { ur, type TranslationKey } from "./ur";

export type Language = "ur" | "en";

export const DEFAULT_LANGUAGE: Language = "ur";

const dictionaries: Record<Language, Partial<Record<TranslationKey, string>>> = { ur, en };

export function translate(language: Language, key: TranslationKey): string {
  return dictionaries[language][key] ?? ur[key];
}

export function isTranslationKey(value: string | undefined): value is TranslationKey {
  return value !== undefined && Object.hasOwn(ur, value);
}

export function isLanguage(value: unknown): value is Language {
  return value === "ur" || value === "en";
}

export function directionOf(language: Language): "rtl" | "ltr" {
  return language === "ur" ? "rtl" : "ltr";
}
