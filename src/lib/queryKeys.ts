export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  dashboard: {
    now: ["dashboard"] as const,
  },
  categories: {
    list: ["categories"] as const,
  },
  products: {
    all: ["products"] as const,
    list: (params: { includeInactive?: boolean }) => ["products", "list", params] as const,
  },
};
