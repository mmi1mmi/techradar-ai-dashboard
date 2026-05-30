import { Bookmark, X } from "lucide-react";

export function SavedArticles({ items, colors, onOpen, onRemove }) {
  return (
    <article className="card saved-panel">
      <div className="panel-head">
        <div className="panel-title-row">
          <Bookmark size={16} />
          <h3 className="display">Saved articles</h3>
        </div>
        <span className="mono muted">{items.length} zapisane</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-saved">
          <Bookmark size={25} strokeWidth={1.4} />
          <span className="mono">Brak zapisanych - kliknij zakladke na karcie</span>
        </div>
      ) : (
        <div className="saved-list">
          {items.map((item) => (
            <div className="saved-row" key={item.id} style={{ "--cat": colors[item.cat] || "var(--accent)" }}>
              <span className="saved-dot" />
              <button type="button" onClick={() => onOpen(item)}>
                {item.title}
              </button>
              <span className="mono">{item.time}</span>
              <button
                className="remove-saved"
                type="button"
                aria-label="Usun zapisany artykul"
                onClick={() => onRemove(item.id)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
