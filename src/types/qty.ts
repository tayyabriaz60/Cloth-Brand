import { z } from "zod";

/** API quantities arrive as "3.50". Parsed once here for the rest of the app. */
export const qtySchema = z.coerce.number().finite();

export function qtyToApi(qty: number): string {
  return qty.toFixed(2);
}
