import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProductImage, fetchProducts, patchProduct } from "../lib/api/catalog";
import { queryKeys } from "../lib/queryKeys";
import type { ProductWrite } from "../lib/api/catalog";
import { useAuth } from "./useAuth";

const OWNER_LIST = { includeInactive: true } as const;

export function useProducts() {
  const { token } = useAuth();
  return useQuery({
    queryKey: queryKeys.products.list(OWNER_LIST),
    queryFn: () => fetchProducts(true),
    enabled: token !== null,
  });
}

export function useSaveProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { id?: string; body: ProductWrite }) =>
      input.id ? patchProduct(input.id, input.body) : createProduct(input.body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.now });
    },
  });
}

export function useDeleteProductImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductImage,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}
