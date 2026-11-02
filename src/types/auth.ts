import { z } from "zod";

export const roleSchema = z.enum(["owner", "cashier"]);

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  role: roleSchema,
});

export const shopSchema = z.object({
  id: z.string().uuid(),
  name_ur: z.string(),
  name_en: z.string().nullable(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  footer_text: z.string().nullable(),
  paper_width: z.union([z.literal(58), z.literal(80)]),
  auto_print: z.boolean(),
});

export const meSchema = z.object({
  user: userSchema,
  shop: shopSchema,
});

export const loginResponseSchema = meSchema.extend({
  access_token: z.string().min(1),
});

export const loginFormSchema = z.object({
  username: z.string().trim().min(1, "form.field.required"),
  password: z.string().min(1, "form.field.required"),
});

export type Role = z.infer<typeof roleSchema>;
export type User = z.infer<typeof userSchema>;
export type Shop = z.infer<typeof shopSchema>;
export type Me = z.infer<typeof meSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type LoginForm = z.infer<typeof loginFormSchema>;
