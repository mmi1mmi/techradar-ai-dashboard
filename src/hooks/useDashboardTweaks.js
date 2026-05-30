import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const tweakDefaults = {
  accentColor: "#6366f1",
  bentoLayout: "balanced",
  cardStyle: "glass",
  chartStyle: "radar",
  density: "regular",
  showOffline: true,
};

function applyAccent(hex) {
  const root = document.documentElement.style;
  root.setProperty("--accent", hex);
  root.setProperty("--accent-soft", `color-mix(in oklab, ${hex} 62%, white)`);
  root.setProperty("--accent-deep", `color-mix(in oklab, ${hex} 78%, black)`);
  root.setProperty("--accent-glow", `color-mix(in oklab, ${hex} 42%, transparent)`);
}

export function useDashboardTweaks() {
  const [tweaks, setTweaks] = useLocalStorage("tr_tweaks", tweakDefaults);

  useEffect(() => {
    applyAccent(tweaks.accentColor);
    document.documentElement.dataset.cardstyle = tweaks.cardStyle;
  }, [tweaks.accentColor, tweaks.cardStyle]);

  const setTweak = (key, value) => {
    setTweaks((current) => ({ ...current, [key]: value }));
  };

  return { tweaks: { ...tweakDefaults, ...tweaks }, setTweak };
}
