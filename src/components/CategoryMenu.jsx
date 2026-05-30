import { AppIcon } from "./iconMap";

export function CategoryMenu({ categories, active, counts, colors, onChange }) {
  return (
    <div className="category-menu">
      <div className="eyebrow category-heading">Kategorie</div>
      {categories.map((category) => {
        const selected = active === category.id;
        const color = category.id === "all" ? "var(--accent-soft)" : colors[category.id] || "var(--accent)";

        return (
          <button
            key={category.id}
            className="category-button"
            data-active={selected}
            style={{ "--cat": color }}
            type="button"
            onClick={() => onChange(category.id)}
          >
            <span className="category-active-bar" />
            <span className="category-icon">
              <AppIcon name={category.icon} size={17} />
            </span>
            <span>{category.name}</span>
            <span className="mono category-count">{counts[category.id] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
