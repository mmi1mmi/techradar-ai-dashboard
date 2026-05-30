import { useMemo } from "react";

export function useNewsFilters(news, activeCategory, query) {
  const normalizedQuery = query.trim().toLowerCase();

  return useMemo(() => {
    return news.filter((item) => {
      const categoryMatch = activeCategory === "all" || item.cat === activeCategory;
      const text = `${item.title} ${item.summary} ${item.source}`.toLowerCase();
      const queryMatch = !normalizedQuery || text.includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, news, normalizedQuery]);
}
