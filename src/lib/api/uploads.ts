import { IMAGE_WEBP, presignOutSchema } from "../../types/uploads";
import { attachProductImage } from "./catalog";
import { apiRequest, putBinary } from "./client";

export function presignUpload(productId: string) {
  return apiRequest("/api/uploads/presign", presignOutSchema, {
    method: "POST",
    body: { content_type: IMAGE_WEBP, product_id: productId },
  });
}

export async function uploadProductImage(productId: string, file: Blob): Promise<void> {
  const presign = await presignUpload(productId);
  await putBinary(presign.upload_url, file, IMAGE_WEBP);
  await attachProductImage(productId, presign.key);
}
