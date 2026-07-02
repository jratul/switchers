export type SortKey = "default" | "price_asc" | "price_desc" | "rating_desc";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "default", label: "기본순" },
  { value: "price_asc", label: "가격 낮은순" },
  { value: "price_desc", label: "가격 높은순" },
];

export const sortOptionsWithRating: { value: SortKey; label: string }[] = [
  ...sortOptions,
  { value: "rating_desc", label: "평점 높은순" },
];

export function sortByKey<T extends { price: number; score?: number }>(
  list: T[],
  sortKey: SortKey
): T[] {
  const sorted = [...list];

  switch (sortKey) {
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating_desc":
      return sorted.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    default:
      return sorted;
  }
}
