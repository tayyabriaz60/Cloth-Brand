interface SearchableProduct {
  name_ur: string;
  name_en: string | null;
  design_no: string | null;
  category: { id: string } | null;
}

export function productMatches(
  product: SearchableProduct,
  query: string,
  categoryId: string | null,
): boolean {
  if (categoryId && product.category?.id !== categoryId) return false;
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [product.name_ur, product.name_en ?? "", product.design_no ?? ""].some((value) =>
    value.toLowerCase().includes(needle),
  );
}
