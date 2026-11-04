import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";
import { ProductCard } from "../components/products/ProductCard";
import { ProductForm } from "../components/products/ProductForm";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { Notice } from "../components/ui/Notice";
import { TextField } from "../components/ui/TextField";
import { useCategories } from "../hooks/useCategories";
import { useMe } from "../hooks/useMe";
import { useProducts } from "../hooks/useProducts";
import { useSlowFlag } from "../hooks/useSlowFlag";
import { useLanguage } from "../i18n/LanguageContext";
import { ROUTES, SEARCH_DEBOUNCE_MS } from "../lib/constants";
import { errorMessageKey } from "../lib/errors";
import { localizedName } from "../lib/format";
import { productMatches } from "../lib/productSearch";
import type { Product } from "../types/catalog";

export function ProductsPage() {
  const { t, language } = useLanguage();
  const me = useMe();
  const products = useProducts();
  const categories = useCategories();
  const slow = useSlowFlag(products.isPending);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounced(query);
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  const visible = useMemo(
    () => (products.data ?? []).filter((product) => productMatches(product, debounced, categoryId)),
    [products.data, debounced, categoryId],
  );

  if (me.isPending) {
    return (
      <div aria-busy="true" aria-label={t("products.loading.label")} className="h-28 animate-pulse rounded-xl bg-slate-200" />
    );
  }
  if (!me.data || me.data.user.role !== "owner") {
    return <Navigate to={ROUTES.home} replace />;
  }

  if (products.isPending) {
    return (
      <div aria-busy="true" aria-label={t("products.loading.label")} className="grid gap-3">
        <div className="h-14 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-28 animate-pulse rounded-xl bg-slate-200" />
        {slow ? <Notice>{t("status.slow.message")}</Notice> : null}
      </div>
    );
  }

  if (products.isError) {
    return (
      <Alert
        action={
          <Button variant="secondary" onClick={() => void products.refetch()}>
            {t("error.retry.button")}
          </Button>
        }
      >
        {t(errorMessageKey(products.error))}
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <TextField
        label={t("products.search.label")}
        placeholder={t("products.search.placeholder")}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        autoFocus
      />
      <div className="flex flex-wrap gap-2">
        <CategoryChip
          label={t("products.category.all")}
          active={categoryId === null}
          onClick={() => {
            setCategoryId(null);
          }}
        />
        {(categories.data ?? []).map((category) => (
          <CategoryChip
            key={category.id}
            label={localizedName(category.name_ur, category.name_en, language)}
            active={categoryId === category.id}
            onClick={() => {
              setCategoryId(category.id);
            }}
          />
        ))}
      </div>
      <Button
        variant="confirm"
        onClick={() => {
          setEditing(null);
        }}
      >
        {t("products.add.button")}
      </Button>
      {visible.length === 0 ? (
        <p className="text-center text-slate-600">{t("products.empty.text")}</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {visible.map((product) => (
            <div key={product.id} className={product.is_active ? "" : "opacity-60"}>
              <ProductCard
                product={product}
                onEdit={(next) => {
                  setEditing(next);
                }}
              />
            </div>
          ))}
        </div>
      )}
      {editing !== undefined ? (
        <ProductForm
          product={editing}
          categories={categories.data ?? []}
          onClose={() => {
            setEditing(undefined);
          }}
        />
      ) : null}
    </div>
  );
}

interface CategoryChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function CategoryChip({ label, active, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-full px-4 font-semibold ${active ? "bg-indigo-100 text-indigo-800" : "bg-white text-slate-700"}`}
    >
      {label}
    </button>
  );
}
