import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../lib/api/catalog";
import { queryKeys } from "../lib/queryKeys";
import { useAuth } from "./useAuth";

export function useCategories() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.categories.list,
    queryFn: fetchCategories,
    enabled: token !== null,
  });
}
