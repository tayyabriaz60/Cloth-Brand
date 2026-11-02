export const STORAGE_KEYS = {
  language: "clothpos.language",
  token: "clothpos.token",
} as const;

export const SLOW_REQUEST_MS = 3000;

/** Offline demo: fake login/me data, no backend calls. Enabled by `npm run dev:demo`. */
export const DEMO_MODE = import.meta.env.MODE === "demo";

export const API_ERROR_CODES = {
  network: "network",
  badResponse: "bad_response",
  invalidCredentials: "invalid_credentials",
  tooManyAttempts: "too_many_attempts",
} as const;
