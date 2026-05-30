import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ theme, onToggle }) {
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button className="icon-button" type="button" onClick={onToggle} aria-label="Przelacz motyw">
      <Icon size={17} strokeWidth={1.8} />
    </button>
  );
}
