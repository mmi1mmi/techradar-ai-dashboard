import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Activity } from "lucide-react";
import { CategoryTag } from "./NewsCard";

export function HeroCard({ item, saved, categories, colors, onSave, onOpen }) {
  if (!item) return null;

  const color = colors[item.cat] || "var(--accent)";

  return (
    <motion.article
      className="card hero-card"
      style={{ "--cat": color }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      layout
    >
      <div className="hero-glow" />
      <div className="hero-card-head">
        <span className="hot-badge">
          <Activity size={14} strokeWidth={2.2} />
          <span className="mono">HOT TOPIC</span>
        </span>
        <CategoryTag category={item.cat} categories={categories} colors={colors} />
      </div>

      <div className="hero-body">
        <div className="mono hero-meta">
          <span>{item.trend} share-of-voice</span>
          <span>{item.read} min read</span>
          <span>{item.source}</span>
        </div>
        <h2 className="display">{item.title}</h2>
        <p>{item.summary}</p>
      </div>

      <div className="hero-actions">
        <button className="btn-accent" type="button" onClick={() => onOpen(item)}>
          Read more <ArrowRight size={14} />
        </button>
        <button className="btn-ghost" type="button" onClick={() => onSave(item.id)}>
          <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
          {saved ? "Zapisano" : "Zapisz"}
        </button>
        <div className="sparkline" aria-hidden="true">
          {[8, 14, 9, 18, 12, 22, 16, 26, 20, 30].map((height, index) => (
            <span key={height + index} style={{ height }} data-hot={index > 6} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
