import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock3 } from "lucide-react";

function Trend({ value }) {
  if (!value) return null;
  const negative = value.includes("-");
  return <span className={`mono trend ${negative ? "trend-down" : "trend-up"}`}>{value}</span>;
}

export function CategoryTag({ category, categories, colors }) {
  const meta = categories.find((item) => item.id === category);
  if (!meta) return null;
  const color = colors[category] || "var(--accent)";

  return (
    <span className="cat-tag" style={{ "--cat": color }}>
      <span className="cat-dot" />
      <span className="mono">{meta.name}</span>
    </span>
  );
}

export function NewsCard({ item, saved, categories, colors, onSave, onOpen }) {
  const color = colors[item.cat] || "var(--accent)";

  return (
    <motion.article
      className="card news-card"
      style={{ "--cat": color }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      layout
    >
      <span className="card-accent" />
      <div className="news-card-head">
        <CategoryTag category={item.cat} categories={categories} colors={colors} />
        <div className="news-card-actions">
          {item.live && (
            <span className="live-label">
              <span className="live-dot" />
              <span className="eyebrow">LIVE</span>
            </span>
          )}
          <button
            className="save-button"
            data-saved={saved}
            type="button"
            onClick={() => onSave(item.id)}
            aria-label={saved ? "Usun z zapisanych" : "Zapisz artykul"}
          >
            <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <h3 className="display">{item.title}</h3>
      <p>{item.summary}</p>

      <div className="news-card-footer">
        <div className="news-meta">
          <span className="mono">{item.source}</span>
          <span>
            <Clock3 size={12} />
            <span className="mono">{item.time}</span>
          </span>
          <Trend value={item.trend} />
        </div>
        <button className="btn-ghost" type="button" onClick={() => onOpen(item)}>
          Read more <ArrowRight size={13} />
        </button>
      </div>
    </motion.article>
  );
}
