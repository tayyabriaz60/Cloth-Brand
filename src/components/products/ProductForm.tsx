import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDeleteProductImage, useSaveProduct } from "../../hooks/useProducts";
import { useUploadImage } from "../../hooks/useUploadImage";
import { useLanguage } from "../../i18n/LanguageContext";
import { isTranslationKey } from "../../i18n/translate";
import { ApiError } from "../../lib/api/client";
import { API_ERROR_CODES, MAX_PRODUCT_IMAGES } from "../../lib/constants";
import { errorMessageKey } from "../../lib/errors";
import { localizedName } from "../../lib/format";
import { resizeToWebp } from "../../lib/imageResize";
import { qtyToApi } from "../../types/qty";
import {
  isOwnerProduct,
  productFormSchema,
  type Category,
  type Product,
  type ProductForm as ProductFormValues,
} from "../../types/catalog";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { SelectField } from "../ui/SelectField";
import { TextField } from "../ui/TextField";
import { ProductImages } from "./ProductImages";

interface ProductFormProps {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
}

export function ProductForm({ product, categories, onClose }: ProductFormProps) {
  const { t, language } = useLanguage();
  const save = useSaveProduct();
  const upload = useUploadImage();
  const removeImage = useDeleteProductImage();
  const [queued, setQueued] = useState<File[]>([]);
  const [uploadsHidden, setUploadsHidden] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const isCreate = product === null;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultsFrom(product),
  });

  const fieldError = (message: string | undefined) => (isTranslationKey(message) ? t(message) : undefined);
  const busy = save.isPending || upload.isPending || removeImage.isPending;
  const images = product?.images ?? [];

  const onSubmit = form.handleSubmit(async (values) => {
    setImageError(null);
    try {
      const saved = await save.mutateAsync({ id: product?.id, body: toWrite(values, isCreate) });
      for (const file of queued) {
        try {
          const blob = await resizeToWebp(file);
          await upload.mutateAsync({ productId: saved.id, file: blob });
        } catch (error) {
          if (error instanceof ApiError && error.code === API_ERROR_CODES.r2Unavailable) {
            setUploadsHidden(true);
            break;
          }
          setImageError(error instanceof Error && error.message === "image-too-large" ? t("products.images.tooLarge") : t(errorMessageKey(error)));
          return;
        }
      }
      onClose();
    } catch (error) {
      setImageError(t(errorMessageKey(error)));
    }
  });

  return (
    <div className="fixed inset-0 z-30 flex justify-end bg-black/40">
      <form
        onSubmit={(event) => {
          void onSubmit(event);
        }}
        className="flex h-full w-full max-w-md flex-col gap-4 overflow-y-auto bg-white p-5"
      >
        <h2 className="font-heading text-2xl font-bold">{t(isCreate ? "products.form.add" : "products.form.edit")}</h2>
        <TextField label={t("products.form.nameUr")} autoFocus error={fieldError(form.formState.errors.name_ur?.message)} {...form.register("name_ur")} />
        <TextField label={t("products.form.nameEn")} {...form.register("name_en")} />
        <SelectField label={t("products.form.category")} {...form.register("category_id")}>
          <option value="">{t("products.form.categoryNone")}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {localizedName(category.name_ur, category.name_en, language)}
            </option>
          ))}
        </SelectField>
        <TextField label={t("products.form.designNo")} {...form.register("design_no")} />
        <SelectField label={t("products.form.unit")} {...form.register("unit")}>
          <option value="gaz">{t("products.form.unitGaz")}</option>
          <option value="piece">{t("products.form.unitPiece")}</option>
        </SelectField>
        <TextField label={t("products.form.cost")} inputMode="decimal" dir="ltr" error={fieldError(form.formState.errors.cost_price?.message)} {...form.register("cost_price")} />
        <TextField label={t("products.form.sale")} inputMode="decimal" dir="ltr" error={fieldError(form.formState.errors.sale_price?.message)} {...form.register("sale_price")} />
        <TextField label={t("products.form.minStock")} inputMode="decimal" dir="ltr" error={fieldError(form.formState.errors.min_stock?.message)} {...form.register("min_stock")} />
        {isCreate ? (
          <TextField label={t("products.form.opening")} inputMode="decimal" dir="ltr" error={fieldError(form.formState.errors.opening_stock?.message)} {...form.register("opening_stock")} />
        ) : null}
        <label className="flex min-h-14 items-center gap-3 font-semibold">
          <input type="checkbox" className="size-5" {...form.register("is_active")} />
          {t("products.form.active")}
        </label>
        <ProductImages
          images={images}
          queuedCount={queued.length}
          uploadsHidden={uploadsHidden}
          busy={busy}
          onPick={(file) => {
            if (images.length + queued.length >= MAX_PRODUCT_IMAGES) return;
            setQueued((current) => [...current, file]);
          }}
          onDelete={(imageId) => {
            removeImage.mutate(imageId);
          }}
        />
        {imageError ? <Alert>{imageError}</Alert> : null}
        {save.isError ? <Alert>{t(errorMessageKey(save.error))}</Alert> : null}
        <Button type="submit" variant="confirm" disabled={busy}>
          {busy ? t("products.form.saving") : t("products.form.save")}
        </Button>
        <Button variant="secondary" disabled={busy} onClick={onClose}>
          {t("products.form.cancel")}
        </Button>
      </form>
    </div>
  );
}

function defaultsFrom(product: Product | null): ProductFormValues {
  if (!product) {
    return {
      name_ur: "",
      name_en: "",
      category_id: "",
      design_no: "",
      unit: "gaz",
      cost_price: "",
      sale_price: "",
      min_stock: "0",
      opening_stock: "",
      is_active: true,
    };
  }
  return {
    name_ur: product.name_ur,
    name_en: product.name_en ?? "",
    category_id: product.category?.id ?? "",
    design_no: product.design_no ?? "",
    unit: product.unit,
    cost_price: isOwnerProduct(product) ? String(product.cost_price) : "",
    sale_price: String(product.sale_price),
    min_stock: qtyToApi(product.min_stock),
    opening_stock: "",
    is_active: product.is_active,
  };
}

function toWrite(values: ProductFormValues, isCreate: boolean) {
  const opening = values.opening_stock.trim();
  return {
    name_ur: values.name_ur,
    name_en: values.name_en.trim() || null,
    design_no: values.design_no.trim() || null,
    unit: values.unit,
    cost_price: Number(values.cost_price),
    sale_price: Number(values.sale_price),
    min_stock: Number(values.min_stock),
    category_id: values.category_id || undefined,
    is_active: values.is_active,
    ...(isCreate && opening ? { opening_stock: Number(opening) } : {}),
  };
}
