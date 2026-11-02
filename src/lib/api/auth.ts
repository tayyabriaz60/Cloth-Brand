import { loginResponseSchema, meSchema, type LoginForm, type LoginResponse, type Me } from "../../types/auth";
import { DEMO_MODE } from "../constants";
import { apiRequest } from "./client";
import { demoLogin, demoMe } from "./demo";

export function login(form: LoginForm): Promise<LoginResponse> {
  if (DEMO_MODE) return demoLogin(form);
  return apiRequest("/api/auth/login", loginResponseSchema, { method: "POST", body: form });
}

export function fetchMe(): Promise<Me> {
  if (DEMO_MODE) return demoMe();
  return apiRequest("/api/auth/me", meSchema);
}
