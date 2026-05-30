import { Bell, Radar } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

export function Topbar({ query, onQueryChange, theme, onToggleTheme }) {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      setClock(
        new Date().toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">
          <Radar size={23} strokeWidth={1.7} />
          <span />
        </div>
        <div>
          <div className="brand-title display">
            TechRadar <strong>AI</strong>
          </div>
          <div className="eyebrow">Signal Intelligence</div>
        </div>
      </div>

      <SearchBar query={query} onChange={onQueryChange} />

      <div className="topbar-spacer" />

      <div className="live-clock">
        <span className="live-dot" />
        <span className="mono">{clock}</span>
        <span className="eyebrow">LIVE</span>
      </div>

      <button className="icon-button" type="button" aria-label="Powiadomienia">
        <Bell size={17} strokeWidth={1.8} />
      </button>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  );
}
