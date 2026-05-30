import { Search } from "lucide-react";

export function SearchBar({ query, onChange }) {
  return (
    <label className="search-bar" aria-label="Szukaj sygnalow">
      <Search size={16} strokeWidth={1.8} />
      <input
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Szukaj sygnalow, zrodel, tagow..."
      />
      <kbd className="mono">Ctrl K</kbd>
    </label>
  );
}
