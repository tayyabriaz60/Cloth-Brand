import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProductImage } from "../lib/api/uploads";
import { queryKeys } from "../lib/queryKeys";

export function useUploadImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, file }: { productId: string; file: Blob }) =>
      uploadProductImage(productId, file),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}
