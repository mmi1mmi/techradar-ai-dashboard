import { CategoryMenu } from "./CategoryMenu";

export function Sidebar({ categories, active, counts, colors, onChange }) {
  return (
    <aside className="sidebar">
      <CategoryMenu
        categories={categories}
        active={active}
        counts={counts}
        colors={colors}
        onChange={onChange}
      />

      <div className="feed-status">
        <div className="eyebrow">Feed status</div>
        <div>
          <span />
          <span className="mono">7 zrodel online</span>
        </div>
      </div>
    </aside>
  );
}
