import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function RadarChart({ data, colors, accent, activeCategory, chartStyle }) {
  const filteredData = data.map((item) => ({
    ...item,
    active: activeCategory === "all" || activeCategory === item.cat,
  }));

  return (
    <article className="card chart-panel">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Volume / 24h</div>
          <h3 className="display">Sygnaly wg kategorii</h3>
        </div>
        <span className="mono chart-type">{chartStyle.toUpperCase()}</span>
      </div>

      <div className="chart-stage">
        <ResponsiveContainer width="100%" height="100%">
          {chartStyle === "bars" ? (
            <BarChart data={filteredData} margin={{ top: 16, right: 10, bottom: 8, left: -24 }}>
              <XAxis dataKey="label" tick={{ fill: "var(--ink-3)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: "var(--chip)" }} contentStyle={tooltipStyle} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {filteredData.map((entry) => (
                  <Cell
                    key={entry.cat}
                    fill={entry.active ? colors[entry.cat] || accent : "var(--line-2)"}
                    opacity={entry.active ? 1 : 0.5}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : chartStyle === "donut" ? (
            <PieChart>
              <Pie
                data={filteredData}
                dataKey="value"
                nameKey="label"
                innerRadius="58%"
                outerRadius="82%"
                paddingAngle={3}
                stroke="none"
              >
                {filteredData.map((entry) => (
                  <Cell
                    key={entry.cat}
                    fill={colors[entry.cat] || accent}
                    opacity={entry.active ? 1 : 0.35}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          ) : (
            <RechartsRadarChart data={filteredData} outerRadius="74%">
              <PolarGrid stroke="var(--line)" />
              <PolarAngleAxis dataKey="label" tick={{ fill: "var(--ink-3)", fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="value" stroke={accent} fill={accent} fillOpacity={0.26} strokeWidth={2} />
              <Tooltip contentStyle={tooltipStyle} />
            </RechartsRadarChart>
          )}
        </ResponsiveContainer>
      </div>
    </article>
  );
}

const tooltipStyle = {
  background: "var(--panel)",
  border: "1px solid var(--line)",
  borderRadius: 10,
  color: "var(--ink)",
  fontFamily: "var(--font-body)",
};
