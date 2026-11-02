export const STORAGE_KEYS = {
  language: "clothpos.language",
  token: "clothpos.token",
} as const;

export const SLOW_REQUEST_MS = 3000;

/**
 * Offline demo: fake login/me data, no backend calls. Enabled by `npm run dev:demo`.
 * vite.config.ts refuses to build while it is on, so this is always false in production.
 */
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

export const API_ERROR_CODES = {
  network: "network",
  badResponse: "bad_response",
  invalidCredentials: "invalid_credentials",
  tooManyAttempts: "too_many_attempts",
} as const;
