import { AppIcon } from "./iconMap";

export function StatStrip({ stats }) {
  return (
    <div className="stat-strip">
      {stats.map((stat, index) => (
        <div className="stat-item" key={stat.label} data-last={index === stats.length - 1}>
          <span style={{ color: stat.color }}>
            <AppIcon name={stat.icon} size={17} />
          </span>
          <div>
            <div className="display mono">{stat.value}</div>
            <div className="eyebrow">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
