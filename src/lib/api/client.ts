import type { z } from "zod";
import { API_ERROR_CODES } from "../constants";
import { getToken, setToken } from "./token";

const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");
const HTTP_UNAUTHORIZED = 401;

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
}

async function readErrorBody(response: Response): Promise<{ code: string; message: string }> {
  try {
    const data: unknown = await response.json();
    if (data && typeof data === "object" && "code" in data && "message" in data) {
      return { code: String(data.code), message: String(data.message) };
    }
  } catch {
    // Non-JSON error body: fall through to a generic error.
  }
  return { code: `http_${response.status}`, message: response.statusText };
}

export async function apiRequest<T>(
  path: string,
  schema: z.ZodType<T>,
  { method = "GET", body }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, API_ERROR_CODES.network, "Network request failed");
  }

  if (!response.ok) {
    const { code, message } = await readErrorBody(response);
    if (response.status === HTTP_UNAUTHORIZED && token) setToken(null);
    throw new ApiError(response.status, code, message);
  }

  if (response.status === 204) {
    throw new ApiError(response.status, API_ERROR_CODES.badResponse, "Unexpected empty response");
  }

  const parsed = schema.safeParse(await response.json());
  if (!parsed.success) {
    throw new ApiError(response.status, API_ERROR_CODES.badResponse, "Unexpected server response");
  }
  return parsed.data;
}

export async function apiRequestEmpty(
  path: string,
  { method = "DELETE", body }: RequestOptions = {},
): Promise<void> {
  const headers: Record<string, string> = { Accept: "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, API_ERROR_CODES.network, "Network request failed");
  }

  if (!response.ok) {
    const { code, message } = await readErrorBody(response);
    if (response.status === HTTP_UNAUTHORIZED && token) setToken(null);
    throw new ApiError(response.status, code, message);
  }
}

export async function putBinary(url: string, body: Blob, contentType: string): Promise<void> {
  let response: Response;
  try {
    response = await fetch(url, { method: "PUT", headers: { "Content-Type": contentType }, body });
  } catch {
    throw new ApiError(0, API_ERROR_CODES.network, "Network request failed");
  }
  if (!response.ok) {
    throw new ApiError(response.status, API_ERROR_CODES.badResponse, "Image upload failed");
  }
}
