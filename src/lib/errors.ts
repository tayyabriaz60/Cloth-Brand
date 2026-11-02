import type { TranslationKey } from "../i18n/ur";
import { ApiError } from "./api/client";
import { API_ERROR_CODES } from "./constants";

const ERROR_KEYS: Record<string, TranslationKey> = {
  [API_ERROR_CODES.network]: "error.network.message",
  [API_ERROR_CODES.invalidCredentials]: "login.error.invalid",
  [API_ERROR_CODES.tooManyAttempts]: "login.error.tooMany",
};

export function errorMessageKey(error: unknown): TranslationKey {
  if (error instanceof ApiError) return ERROR_KEYS[error.code] ?? "error.server.message";
  return "error.server.message";
}
