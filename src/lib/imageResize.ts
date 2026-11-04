import { MAX_IMAGE_BYTES, MAX_IMAGE_EDGE_PX, WEBP_QUALITY, WEBP_RETRY_QUALITY } from "./constants";

const WEBP_TYPE = "image/webp";

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) reject(new Error("webp-failed"));
      else resolve(blob);
    }, WEBP_TYPE, quality);
  });
}

export async function resizeToWebp(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_EDGE_PX / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas-failed");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const first = await canvasToBlob(canvas, WEBP_QUALITY);
  if (first.size <= MAX_IMAGE_BYTES) return first;
  const second = await canvasToBlob(canvas, WEBP_RETRY_QUALITY);
  if (second.size <= MAX_IMAGE_BYTES) return second;
  throw new Error("image-too-large");
}
