import { dashboardSchema, type Dashboard } from "../../types/dashboard";
import { apiRequest } from "./client";

export async function fetchDashboard(): Promise<Dashboard> {
  return apiRequest("/api/dashboard", dashboardSchema);
}
