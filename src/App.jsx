import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ArticleModal } from "./components/ArticleModal";
import { HeroCard } from "./components/HeroCard";
import { NewsCard } from "./components/NewsCard";
import { OfflineCard } from "./components/OfflineCard";
import { RadarChart } from "./components/RadarChart";
import { SavedArticles } from "./components/SavedArticles";
import { Sidebar } from "./components/Sidebar";
import { StatStrip } from "./components/StatStrip";
import { Topbar } from "./components/Topbar";
import { TweaksPanel } from "./components/TweaksPanel";
import { useDebounce } from "./hooks/useDebounce";
import { useDashboardTweaks } from "./hooks/useDashboardTweaks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNews } from "./hooks/useNews";
import { useNewsCounts, useNewsFilters } from "./hooks/useNewsFilters";
import { useTheme } from "./hooks/useTheme";

export function App() {
  const { theme, toggleTheme } = useTheme();
  const { tweaks, setTweak } = useDashboardTweaks();
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [savedIds, setSavedIds] = useLocalStorage("tr_saved", []);
  const [openArticle, setOpenArticle] = useState(null);
  const debouncedQuery = useDebounce(query, 350);
  const { categories, categoryColors, news, radarData, status, source, error } = useNews({
    query: debouncedQuery,
  });

  const localQuery = source === "mock" ? debouncedQuery : "";
  const counts = useNewsCounts(news, localQuery);
  const filteredNews = useNewsFilters(news, activeCategory, localQuery);
  const trimmedQuery = query.trim();
  const hotArticle = news.find((item) => item.hot);
  const showHero = activeCategory === "all" && !debouncedQuery.trim() && hotArticle;
  const visibleNews = filteredNews.filter((item) => !(showHero && item.id === hotArticle.id));

  const savedArticles = useMemo(
    () => savedIds.map((id) => news.find((item) => item.id === id)).filter(Boolean),
    [news, savedIds],
  );

  const activeCategoryName =
    activeCategory === "all" ? "Wszystkie sygnaly" : categories.find((item) => item.id === activeCategory)?.name;

  const toggleSave = (id) => {
    setSavedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [id, ...current]));
  };

  const stats = [
    { icon: "activity", label: "SIGNALS / 24H", value: news.length, color: "var(--accent-soft)" },
    { icon: "spark", label: "LIVE NOW", value: news.filter((item) => item.live).length, color: "#ff5a6b" },
    { icon: "radar", label: "SOURCES", value: 7, color: "#22d3ee" },
    { icon: "bookmark", label: "SAVED", value: savedIds.length, color: "#34d399" },
  ];

  const blocks = buildBlocks({
    layout: tweaks.bentoLayout,
    showHero,
    hotArticle,
    visibleNews,
    savedIds,
    savedArticles,
    categories,
    categoryColors,
    radarData,
    activeCategory,
    tweaks,
    newsCount: news.length,
    source,
    error,
    toggleSave,
    setOpenArticle,
  });

  return (
    <div className={`app-shell density-${tweaks.density}`}>
      <Topbar query={query} onQueryChange={setQuery} theme={theme} onToggleTheme={toggleTheme} />

      <div className="workspace">
        <Sidebar
          categories={categories}
          active={activeCategory}
          counts={counts}
          colors={categoryColors}
          onChange={setActiveCategory}
        />

        <main className="main-content">
          <section className="dashboard-heading">
            <div>
              <div className="eyebrow">{activeCategoryName} / feed na zywo</div>
              <h1 className="display">
                {trimmedQuery ? `Wyniki dla "${query}"` : "Dzisiejszy radar"}
                <span className="mono">{filteredNews.length} pozycji</span>
              </h1>
            </div>
            <StatStrip stats={stats} />
          </section>

          {status === "loading" ? (
            <div className="card state-card">
              <span className="pulse-loader" />
              <span className="mono">Ladowanie sygnalow...</span>
            </div>
          ) : status === "error" ? (
            <div className="card state-card">
              <AlertTriangle size={29} strokeWidth={1.5} />
              <span className="mono">{error?.message || "Nie udalo sie pobrac sygnalow"}</span>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="card state-card">
              <Search size={29} strokeWidth={1.5} />
              <span className="mono">
                {activeCategory === "all"
                  ? "Brak sygnalow dla tego filtra"
                  : "Brak sygnałów w tej kategorii dla aktualnego zapytania. Spróbuj All Signals albo zmień hasło."}
              </span>
            </div>
          ) : (
            <motion.section className="dashboard-grid" layout>
              <AnimatePresence initial={false}>
                {blocks.map((block) => (
                  <motion.div
                    className={block.span === 2 ? "grid-block span-2" : "grid-block"}
                    key={block.key}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {block.node}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.section>
          )}
        </main>

        <TweaksPanel tweaks={tweaks} onTweakChange={setTweak} />
      </div>

      <ArticleModal
        item={openArticle}
        saved={!!openArticle && savedIds.includes(openArticle.id)}
        categories={categories}
        colors={categoryColors}
        onSave={toggleSave}
        onClose={() => setOpenArticle(null)}
      />
    </div>
  );
}

function buildBlocks({
  layout,
  showHero,
  hotArticle,
  visibleNews,
  savedIds,
  savedArticles,
  categories,
  categoryColors,
  radarData,
  activeCategory,
  tweaks,
  newsCount,
  source,
  error,
  toggleSave,
  setOpenArticle,
}) {
  const blocks = [];
  const push = (key, node, span = 1) => blocks.push({ key, node, span });
  const newsCard = (item) => (
    <NewsCard
      item={item}
      saved={savedIds.includes(item.id)}
      categories={categories}
      colors={categoryColors}
      onSave={toggleSave}
      onOpen={setOpenArticle}
    />
  );
  const chart = (
    <RadarChart
      data={radarData}
      colors={categoryColors}
      accent={tweaks.accentColor}
      activeCategory={activeCategory}
      chartStyle={tweaks.chartStyle}
    />
  );
  const saved = (
    <SavedArticles items={savedArticles} colors={categoryColors} onOpen={setOpenArticle} onRemove={toggleSave} />
  );
  const offline = <OfflineCard cached={newsCount} error={error} />;
  const showOffline = tweaks.showOffline && source !== "api";

  if (showHero) {
    push(
      "hero",
      <HeroCard
        item={hotArticle}
        saved={savedIds.includes(hotArticle.id)}
        categories={categories}
        colors={categoryColors}
        onSave={toggleSave}
        onOpen={setOpenArticle}
      />,
      2,
    );
  }

  if (layout === "hero") {
    push("chart", chart, 2);
    visibleNews.forEach((item) => push(item.id, newsCard(item)));
    push("saved", saved, 2);
    if (showOffline) push("offline", offline, 2);
    return blocks;
  }

  if (layout === "masonry") {
    visibleNews.slice(0, 3).forEach((item, index) => push(item.id, newsCard(item), index === 1 ? 2 : 1));
    push("chart", chart, 2);
    visibleNews.slice(3, 6).forEach((item) => push(item.id, newsCard(item)));
    push("saved", saved, 2);
    visibleNews.slice(6).forEach((item, index) => push(item.id, newsCard(item), index % 3 === 0 ? 2 : 1));
    if (showOffline) push("offline", offline, 2);
    return blocks;
  }

  visibleNews.slice(0, 2).forEach((item) => push(item.id, newsCard(item)));
  push("chart", chart, 2);
  visibleNews.slice(2, 6).forEach((item) => push(item.id, newsCard(item)));
  push("saved", saved, 2);
  if (showOffline) push("offline", offline, 2);
  visibleNews.slice(6).forEach((item) => push(item.id, newsCard(item)));
  return blocks;
}
