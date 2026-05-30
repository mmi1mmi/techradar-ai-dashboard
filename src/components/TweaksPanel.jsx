import { SlidersHorizontal } from "lucide-react";

const accentOptions = ["#6366f1", "#22d3ee", "#a855f7", "#fb923c", "#34d399"];

function SegmentedControl({ label, value, options, onChange }) {
  return (
    <label className="tweak-row">
      <span>{label}</span>
      <div className="segmented">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            data-active={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </label>
  );
}

export function TweaksPanel({ tweaks, onTweakChange }) {
  return (
    <aside className="card tweaks-panel">
      <div className="panel-title-row">
        <SlidersHorizontal size={16} />
        <h3 className="display">Tweaks</h3>
      </div>

      <div className="tweak-section">
        <span className="eyebrow">Motyw UI</span>
        <label className="tweak-row">
          <span>Kolor akcentu</span>
          <div className="color-swatches">
            {accentOptions.map((color) => (
              <button
                key={color}
                type="button"
                style={{ background: color }}
                data-active={tweaks.accentColor === color}
                aria-label={`Kolor ${color}`}
                onClick={() => onTweakChange("accentColor", color)}
              />
            ))}
          </div>
        </label>
        <SegmentedControl
          label="Styl kart"
          value={tweaks.cardStyle}
          options={["glass", "solid", "outline"]}
          onChange={(value) => onTweakChange("cardStyle", value)}
        />
      </div>

      <div className="tweak-section">
        <span className="eyebrow">Uklad</span>
        <SegmentedControl
          label="Bento layout"
          value={tweaks.bentoLayout}
          options={["balanced", "hero", "masonry"]}
          onChange={(value) => onTweakChange("bentoLayout", value)}
        />
        <SegmentedControl
          label="Gestosc"
          value={tweaks.density}
          options={["compact", "regular"]}
          onChange={(value) => onTweakChange("density", value)}
        />
      </div>

      <div className="tweak-section">
        <span className="eyebrow">Dane</span>
        <SegmentedControl
          label="Wykres"
          value={tweaks.chartStyle}
          options={["radar", "bars", "donut"]}
          onChange={(value) => onTweakChange("chartStyle", value)}
        />
        <label className="toggle-row">
          <span>Karta offline fallback</span>
          <button
            type="button"
            className="switch"
            data-active={tweaks.showOffline}
            aria-pressed={tweaks.showOffline}
            onClick={() => onTweakChange("showOffline", !tweaks.showOffline)}
          >
            <span />
          </button>
        </label>
      </div>
    </aside>
  );
}
