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
  r2Unavailable: "r2_unavailable",
} as const;

export const PAGE_BG = "#F1F4F9";
export const CARD_COLORS = {
  indigo: "#6C6CF5",
  green: "#10C06F",
  blue: "#0B9BFF",
  amber: "#FFB52B",
  red: "#E53935",
} as const;

export const SEARCH_DEBOUNCE_MS = 150;
export const MAX_PRODUCT_IMAGES = 3;
export const MAX_IMAGE_EDGE_PX = 800;
export const MAX_IMAGE_BYTES = 150 * 1024;
export const WEBP_QUALITY = 0.8;
export const WEBP_RETRY_QUALITY = 0.55;
export const WEEK_BAR_MAX_PX = 120;
export const PRODUCT_THUMB_PX = 96;

export const ROUTES = {
  home: "/",
  login: "/login",
  newBill: "/new-bill",
  stock: "/stock",
  udhaar: "/udhaar",
  products: "/products",
  settings: "/settings",
} as const;
