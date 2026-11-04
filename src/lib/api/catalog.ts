import {
  categoryListSchema,
  ownerProductSchema,
  productImageSchema,
  productListSchema,
  type Category,
  type OwnerProduct,
  type Product,
  type ProductImage,
  type Unit,
} from "../../types/catalog";
import { qtyToApi } from "../../types/qty";
import { apiRequest, apiRequestEmpty } from "./client";

export interface ProductWrite {
  name_ur: string;
  name_en: string | null;
  design_no: string | null;
  unit: Unit;
  cost_price: number;
  sale_price: number;
  min_stock: number;
  category_id?: string;
  is_active: boolean;
  opening_stock?: number;
}

export function fetchCategories(): Promise<Category[]> {
  return apiRequest("/api/categories", categoryListSchema).then((data) => data.items);
}

export async function fetchProducts(includeInactive = false): Promise<Product[]> {
  const query = includeInactive ? "?include_inactive=true" : "";
  const data = await apiRequest(`/api/products${query}`, productListSchema);
  return data.items;
}

export function createProduct(body: ProductWrite): Promise<OwnerProduct> {
  return apiRequest("/api/products", ownerProductSchema, {
    method: "POST",
    body: toProductBody(body, true),
  });
}

export function patchProduct(id: string, body: ProductWrite): Promise<OwnerProduct> {
  return apiRequest(`/api/products/${id}`, ownerProductSchema, {
    method: "PATCH",
    body: toProductBody(body, false),
  });
}

export function attachProductImage(productId: string, key: string): Promise<ProductImage> {
  return apiRequest(`/api/products/${productId}/images`, productImageSchema, {
    method: "POST",
    body: { key },
  });
}

export function deleteProductImage(imageId: string): Promise<void> {
  return apiRequestEmpty(`/api/product-images/${imageId}`, { method: "DELETE" });
}

function toProductBody(body: ProductWrite, includeOpening: boolean) {
  return {
    name_ur: body.name_ur,
    name_en: body.name_en,
    design_no: body.design_no,
    unit: body.unit,
    cost_price: body.cost_price,
    sale_price: body.sale_price,
    min_stock: qtyToApi(body.min_stock),
    category_id: body.category_id,
    is_active: body.is_active,
    ...(includeOpening && body.opening_stock !== undefined
      ? { opening_stock: qtyToApi(body.opening_stock) }
      : {}),
  };
}
