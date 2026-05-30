import { WifiOff } from "lucide-react";

export function OfflineCard({ cached, error }) {
  return (
    <article className="card offline-card">
      <span className="offline-icon">
        <WifiOff size={22} strokeWidth={1.7} />
      </span>
      <div>
        <div className="offline-title-row">
          <h3 className="display">Offline fallback active</h3>
          <span className="mono">CACHED</span>
        </div>
        <p>
          Wyswietlam {cached} sygnalow z lokalnego cache.
          {error ? ` Ostatni blad API: ${error.message}.` : " Mock mode dziala bez polaczenia z API."}
        </p>
      </div>
    </article>
  );
}
