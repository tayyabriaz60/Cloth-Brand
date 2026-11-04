import { z } from "zod";
import { qtySchema } from "./qty";

export const paymentTypeSchema = z.enum(["cash", "udhaar", "online"]);

export const topUdhaarSchema = z.object({
  customer_id: z.string().uuid(),
  name: z.string(),
  balance: z.number().int(),
});

export const lowStockItemSchema = z.object({
  product_id: z.string().uuid(),
  name_ur: z.string(),
  name_en: z.string().nullable(),
  stock: qtySchema,
  min_stock: qtySchema,
});

const lastBillBaseSchema = z.object({
  id: z.string().uuid(),
  bill_no: z.number().int(),
  payment_type: paymentTypeSchema,
  created_at: z.string(),
});

export const lastBillCashierSchema = lastBillBaseSchema;
export const lastBillOwnerSchema = lastBillBaseSchema.extend({
  total: z.number().int(),
  paid_amount: z.number().int(),
});

export const weekSaleSchema = z.object({
  date: z.string(),
  total: z.number().int(),
});

const dashboardShared = {
  total_udhaar: z.number().int(),
  low_stock_count: z.number().int(),
  top_udhaar: z.array(topUdhaarSchema),
  low_stock: z.array(lowStockItemSchema),
};

export const cashierDashboardSchema = z.object({
  ...dashboardShared,
  last_bills: z.array(lastBillCashierSchema),
});

export const ownerDashboardSchema = z.object({
  ...dashboardShared,
  today_sales: z.number().int(),
  today_received: z.number().int(),
  last_bills: z.array(z.union([lastBillOwnerSchema, lastBillCashierSchema])),
  week_sales: z.array(weekSaleSchema),
});

export const dashboardSchema = z.union([ownerDashboardSchema, cashierDashboardSchema]);

export type PaymentType = z.output<typeof paymentTypeSchema>;
export type TopUdhaar = z.output<typeof topUdhaarSchema>;
export type LowStockItem = z.output<typeof lowStockItemSchema>;
export type LastBillCashier = z.output<typeof lastBillCashierSchema>;
export type LastBillOwner = z.output<typeof lastBillOwnerSchema>;
export type LastBill = LastBillOwner | LastBillCashier;
export type WeekSale = z.output<typeof weekSaleSchema>;
export type CashierDashboard = z.output<typeof cashierDashboardSchema>;
export type OwnerDashboard = z.output<typeof ownerDashboardSchema>;
export type Dashboard = z.output<typeof dashboardSchema>;

export function isOwnerDashboard(data: Dashboard): data is OwnerDashboard {
  return "today_sales" in data;
}

export function isOwnerLastBill(bill: LastBill): bill is LastBillOwner {
  return "total" in bill;
}
