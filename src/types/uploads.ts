import { z } from "zod";

export const IMAGE_WEBP = "image/webp";

export const presignInSchema = z.object({
  content_type: z.literal(IMAGE_WEBP),
  product_id: z.string().uuid(),
});

export const presignOutSchema = z.object({
  upload_url: z.string().min(1),
  key: z.string().min(1),
  public_url: z.string().nullable().optional(),
});

export const attachImageInSchema = z.object({
  key: z.string().min(1),
});

export type PresignIn = z.infer<typeof presignInSchema>;
export type PresignOut = z.infer<typeof presignOutSchema>;
export type AttachImageIn = z.infer<typeof attachImageInSchema>;
