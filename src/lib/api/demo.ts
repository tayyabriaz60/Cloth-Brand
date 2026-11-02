import { API_ERROR_CODES } from "../constants";
import type { LoginForm, LoginResponse, Me, Shop, User } from "../../types/auth";
import { ApiError } from "./client";
import { getToken } from "./token";

/** Offline demo data, mirrors scripts/seed.py in the backend. Only used in demo mode. */
const DEMO_DELAY_MS = 400;
const HTTP_UNAUTHORIZED = 401;

const DEMO_SHOP: Shop = {
  id: "00000000-0000-4000-8000-000000000001",
  name_ur: "ڈیمو کلاتھ ہاؤس",
  name_en: "Demo Cloth House",
  address: null,
  phone: null,
  footer_text: "شکریہ! دوبارہ تشریف لائیں",
  paper_width: 80,
  auto_print: false,
};

const DEMO_ACCOUNTS: ReadonlyArray<{ username: string; password: string; token: string; user: User }> = [
  {
    username: "owner",
    password: "owner123",
    token: "demo-owner",
    user: { id: "00000000-0000-4000-8000-000000000011", name: "Owner", role: "owner" },
  },
  {
    username: "cashier",
    password: "cashier123",
    token: "demo-cashier",
    user: { id: "00000000-0000-4000-8000-000000000012", name: "Cashier", role: "cashier" },
  },
];

function wait(): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, DEMO_DELAY_MS));
}

function unauthorized(code: string): ApiError {
  return new ApiError(HTTP_UNAUTHORIZED, code, "Demo login failed");
}

export async function demoLogin(form: LoginForm): Promise<LoginResponse> {
  await wait();
  const account = DEMO_ACCOUNTS.find(
    (a) => a.username === form.username.trim() && a.password === form.password,
  );
  if (!account) throw unauthorized(API_ERROR_CODES.invalidCredentials);
  return { access_token: account.token, user: account.user, shop: DEMO_SHOP };
}

export async function demoMe(): Promise<Me> {
  await wait();
  const account = DEMO_ACCOUNTS.find((a) => a.token === getToken());
  if (!account) throw unauthorized("not_authenticated");
  return { user: account.user, shop: DEMO_SHOP };
}
