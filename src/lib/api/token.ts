import { STORAGE_KEYS } from "../constants";

type Listener = (token: string | null) => void;

const listeners = new Set<Listener>();

export function getToken(): string | null {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  return token && token.trim() ? token : null;
}

export function setToken(token: string | null): void {
  if (token) localStorage.setItem(STORAGE_KEYS.token, token);
  else localStorage.removeItem(STORAGE_KEYS.token);
  listeners.forEach((listener) => listener(token));
}

export function subscribeToken(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
