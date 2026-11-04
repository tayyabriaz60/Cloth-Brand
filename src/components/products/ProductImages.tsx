import { useLanguage } from "../../i18n/LanguageContext";
import { MAX_PRODUCT_IMAGES, PRODUCT_THUMB_PX } from "../../lib/constants";
import type { ProductImage } from "../../types/catalog";

interface ProductImagesProps {
  images: ProductImage[];
  queuedCount: number;
  uploadsHidden: boolean;
  busy: boolean;
  onPick: (file: File) => void;
  onDelete: (imageId: string) => void;
}

export function ProductImages({
  images,
  queuedCount,
  uploadsHidden,
  busy,
  onPick,
  onDelete,
}: ProductImagesProps) {
  const { t } = useLanguage();
  const remaining = MAX_PRODUCT_IMAGES - images.length - queuedCount;
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-slate-800">{t("products.images.label")}</p>
      {uploadsHidden ? <p className="text-slate-600">{t("products.images.unavailable")}</p> : null}
      <div className="flex flex-wrap gap-2">
        {images.map((image) => (
          <div key={image.id} className="relative">
            {image.public_url ? (
              <img
                src={image.public_url}
                alt=""
                width={PRODUCT_THUMB_PX}
                height={PRODUCT_THUMB_PX}
                loading="lazy"
                className="size-24 rounded-lg object-cover"
              />
            ) : (
              <div className="size-24 rounded-lg bg-slate-200" />
            )}
            <button
              type="button"
              className="absolute top-1 end-1 rounded-full bg-red-600 px-2 text-sm font-bold text-white"
              aria-label={t("products.images.delete")}
              onClick={() => {
                onDelete(image.id);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {!uploadsHidden && remaining > 0 ? (
        <label className="inline-flex min-h-14 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-4 font-semibold">
          {t("products.images.add")}
          <input
            type="file"
            accept="image/webp,image/jpeg,image/png"
            className="sr-only"
            disabled={busy}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) onPick(file);
            }}
          />
        </label>
      ) : null}
      {remaining <= 0 && !uploadsHidden ? <p className="text-slate-600">{t("products.images.limit")}</p> : null}
    </div>
  );
}
