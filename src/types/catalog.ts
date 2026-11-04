import { z } from "zod";
import { qtySchema } from "./qty";

export const unitSchema = z.enum(["gaz", "piece"]);

export const categorySchema = z.object({
  id: z.string().uuid(),
  name_ur: z.string(),
  name_en: z.string().nullable(),
  sort_order: z.number().int(),
});

export const categoryListSchema = z.object({
  items: z.array(categorySchema),
});

export const categoryRefSchema = z.object({
  id: z.string().uuid(),
  name_ur: z.string(),
  name_en: z.string().nullable(),
});

export const productImageSchema = z.object({
  id: z.string().uuid(),
  public_url: z.string().nullable(),
  sort_order: z.number().int(),
});

const productBaseSchema = z.object({
  id: z.string().uuid(),
  name_ur: z.string(),
  name_en: z.string().nullable(),
  design_no: z.string().nullable(),
  unit: unitSchema,
  sale_price: z.number().int(),
  min_stock: qtySchema,
  category: categoryRefSchema.nullable(),
  images: z.array(productImageSchema),
  stock: qtySchema,
  is_low_stock: z.boolean(),
  is_active: z.boolean(),
});

export const cashierProductSchema = productBaseSchema;
export const ownerProductSchema = productBaseSchema.extend({
  cost_price: z.number().int(),
});

export const productSchema = z.union([ownerProductSchema, cashierProductSchema]);

export const productListSchema = z.object({
  items: z.array(productSchema),
});

export const productFormSchema = z.object({
  name_ur: z.string().trim().min(1, "form.field.required"),
  name_en: z.string().trim(),
  category_id: z.string(),
  design_no: z.string().trim(),
  unit: unitSchema,
  cost_price: z.string().trim().regex(/^\d+$/, "form.field.money"),
  sale_price: z.string().trim().regex(/^\d+$/, "form.field.money"),
  min_stock: z.string().trim().regex(/^\d+(\.\d{0,2})?$/, "form.field.qty"),
  opening_stock: z.string().trim().regex(/^$|^\d+(\.\d{0,2})?$/, "form.field.qty"),
  is_active: z.boolean(),
});

export type Category = z.output<typeof categorySchema>;
export type ProductImage = z.output<typeof productImageSchema>;
export type CashierProduct = z.output<typeof cashierProductSchema>;
export type OwnerProduct = z.output<typeof ownerProductSchema>;
export type Product = z.output<typeof productSchema>;
export type ProductForm = z.output<typeof productFormSchema>;
export type Unit = z.output<typeof unitSchema>;

export function isOwnerProduct(product: Product): product is OwnerProduct {
  return "cost_price" in product;
}
