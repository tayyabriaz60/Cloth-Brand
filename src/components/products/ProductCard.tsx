import { useLanguage } from "../../i18n/LanguageContext";
import { PRODUCT_THUMB_PX } from "../../lib/constants";
import { formatMoney, formatQty, localizedName } from "../../lib/format";
import type { Product } from "../../types/catalog";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  const { t, language } = useLanguage();
  const thumb = product.images[0]?.public_url;
  const name = localizedName(product.name_ur, product.name_en, language);
  return (
    <button
      type="button"
      onClick={() => {
        onEdit(product);
      }}
      className="flex w-full items-center gap-3 rounded-xl bg-white p-3 text-start shadow-sm focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      {thumb ? (
        <img
          src={thumb}
          alt=""
          width={PRODUCT_THUMB_PX}
          height={PRODUCT_THUMB_PX}
          loading="lazy"
          className="size-24 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-500">
          <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="6" width="16" height="12" rx="2" />
            <circle cx="9" cy="11" r="1.5" />
            <path d="m8 16 3-3 3 3 4-4" />
          </svg>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-bold text-slate-900">{name}</p>
        {product.design_no ? <p className="text-slate-600">{product.design_no}</p> : null}
        <p className="text-slate-700">
          {product.unit === "gaz" ? t("products.form.unitGaz") : t("products.form.unitPiece")} · {formatMoney(product.sale_price)}
        </p>
        <p className="font-semibold text-slate-800">
          {t("products.stock.label")}: {formatQty(product.stock)}
        </p>
        {product.is_low_stock ? (
          <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-sm font-semibold text-red-800">
            {t("products.lowStock.badge")}
          </span>
        ) : null}
      </div>
    </button>
  );
}
