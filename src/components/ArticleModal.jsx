import { Bookmark, X } from "lucide-react";
import { useEffect } from "react";
import { CategoryTag } from "./NewsCard";

export function ArticleModal({ item, saved, categories, colors, onSave, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!item) return null;

  const color = colors[item.cat] || "var(--accent)";
  const body = [
    item.summary,
    "Analitycy wskazuja, ze rozwoj w tym obszarze moze istotnie wplynac na architekture sieci nowej generacji oraz koszty operacyjne dostawcow uslug.",
    "Wedlug danych telemetrycznych zainteresowanie tematem utrzymuje wyrazny trend wzrostowy wsrod sledzonych zrodel branzowych.",
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <article
        className="card article-modal"
        style={{ "--cat": color }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
      >
        <span className="card-accent" />
        <div className="article-modal-head">
          <CategoryTag category={item.cat} categories={categories} colors={colors} />
          <button className="icon-button" type="button" onClick={onClose} aria-label="Zamknij">
            <X size={16} />
          </button>
        </div>
        <div className="mono article-meta">
          <span>{item.source}</span>
          <span>{item.time} temu</span>
          <span>{item.read} min</span>
          {item.trend && <span className={item.trend.includes("-") ? "trend-down" : "trend-up"}>{item.trend}</span>}
        </div>
        <h1 className="display" id="article-modal-title">
          {item.title}
        </h1>
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="article-modal-actions">
          <button className="btn-accent" type="button" onClick={() => onSave(item.id)}>
            <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
            {saved ? "Zapisano" : "Zapisz artykul"}
          </button>
          <button className="btn-ghost" type="button" onClick={onClose}>
            Zamknij
          </button>
        </div>
      </article>
    </div>
  );
}
