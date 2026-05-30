import { useMemo } from "react";
import { categoryKeywords } from "../data/categoryKeywords";

export function useNewsFilters(news, activeCategory, query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  return useMemo(() => {
    const queryScopedNews = filterNewsByQuery(news, normalizedQuery);

    if (activeCategory === "all") {
      return queryScopedNews;
    }

    return queryScopedNews.filter((item) => matchesCategory(item, activeCategory));
  }, [activeCategory, news, normalizedQuery]);
}

export function useNewsCounts(news, query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  return useMemo(() => {
    const queryScopedNews = filterNewsByQuery(news, normalizedQuery);
    const counts = { all: queryScopedNews.length };

    Object.keys(categoryKeywords).forEach((category) => {
      counts[category] = queryScopedNews.filter((item) => matchesCategory(item, category)).length;
    });

    return counts;
  }, [news, normalizedQuery]);
}

export function matchesCategory(item, category) {
  const keywords = categoryKeywords[category];
  if (!keywords) return false;

  const text = buildFilterText(item);
  return keywords.some((keyword) => matchesKeyword(text, keyword));
}

function filterNewsByQuery(news, normalizedQuery) {
  if (!normalizedQuery) return news;
  return news.filter((item) => buildFilterText(item).includes(normalizedQuery));
}

function buildFilterText(item) {
  return [
    item.title,
    item.description ?? item.summary,
    item.source,
    Array.isArray(item.tags) ? item.tags.join(" ") : item.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function matchesKeyword(text, keyword) {
  const normalizedKeyword = keyword.toLowerCase();
  const escapedKeyword = normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const startsWithWord = /^[a-z0-9]/.test(normalizedKeyword);
  const endsWithWord = /[a-z0-9]$/.test(normalizedKeyword);
  const pattern = `${startsWithWord ? "\\b" : ""}${escapedKeyword}${endsWithWord ? "\\b" : ""}`;

  return new RegExp(pattern).test(text);
}
