import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "../lib/api/dashboard";
import { queryKeys } from "../lib/queryKeys";
import { useAuth } from "./useAuth";

export function useDashboard() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.dashboard.now,
    queryFn: fetchDashboard,
    enabled: token !== null,
  });
}
