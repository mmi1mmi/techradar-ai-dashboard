# TechRadar AI

## Linki do projektu

Repozytorium GitHub:
https://github.com/mmi1mmi/techradar-ai-dashboard

Wersja online:
https://techradar-ai-dashboard.vercel.app/

## Opis projektu

TechRadar AI to webowy dashboard do monitorowania sygnałów technologicznych z obszarów AI, telekomunikacji, cyberbezpieczeństwa, chmury, hardware'u i VoIP. Aplikacja prezentuje aktualne informacje w formie kart, statystyk, zapisanych artykułów oraz wykresu radarowego pokazującego rozkład tematów.

Projekt został przygotowany jako aplikacja React + Vite. Główny nacisk położono na czytelny interfejs, tryb demo niewymagający zewnętrznego API oraz tryb live API, który pobiera dane z Hacker News Algolia API.

## Technologie

- React 18
- Vite
- JavaScript
- CSS / Tailwind CSS
- Recharts, w tym radar chart
- Framer Motion
- Lucide React
- localStorage
- Hacker News Algolia API

## Instrukcja uruchomienia

Wymagane środowisko: Node.js oraz npm.

```bash
npm install
npm run dev
```

Po uruchomieniu Vite pokaże adres aplikacji w terminalu, zwykle:

```text
http://127.0.0.1:5173
```

Build produkcyjny:

```bash
npm run build
npm run preview
```

Sprawdzenie lintingu:

```bash
npm run lint
```

## Funkcje

- dashboard wiadomości technologicznych w układzie kart,
- filtrowanie po kategoriach: AI, Telecom, Cybersecurity, Cloud, Hardware i VoIP,
- wyszukiwarka z debounce,
- radar chart pokazujący rozkład tematów,
- zapisywanie artykułów w localStorage,
- tryb dark/light mode,
- modal szczegółów artykułu,
- panel ustawień wyglądu dashboardu,
- obsługa stanu ładowania i błędów,
- fallback danych, gdy API nie odpowiada,
- responsywny interfejs.

## Tryb demo i live API

Aplikacja może działać w dwóch trybach:

- `live` - domyślny tryb, w którym aplikacja pobiera dane z Hacker News Algolia API,
- `mock` - tryb demo/offline, w którym aplikacja korzysta z lokalnych danych z pliku `src/data/mockNews.js`.

Domyślny endpoint live API:

```text
https://hn.algolia.com/api/v1/search_by_date
```

Opcjonalna konfiguracja w pliku `.env.local`:

```env
VITE_NEWS_MODE=live
VITE_NEWS_API_URL=https://hn.algolia.com/api/v1/search_by_date
```

Tryb demo bez wywołań API:

```env
VITE_NEWS_MODE=mock
```

Jeżeli live API zwróci błąd albo nie będzie dostępne, aplikacja automatycznie przejdzie na fallback danych lokalnych.

## Ocena

Projekt był realizowany z myślą o ocenie bardzo dobrej (4.5). Zakres wykracza poza prostą listę danych, ponieważ zawiera integrację API, fallback, filtrowanie, zapisywanie stanu lokalnie, motyw jasny/ciemny oraz wizualizację danych.

## Elementy ponad poziom podstawowy

- integracja z live API oraz automatyczny fallback do danych demo,
- radar chart zbudowany na podstawie aktualnych danych,
- zapisywanie ulubionych artykułów w localStorage,
- filtrowanie po kategoriach i wyszukiwanie z debounce,
- tryb dark/light mode,
- animacje interfejsu,
- panel konfiguracji wyglądu dashboardu,
- responsywny układ aplikacji.

## Struktura projektu

```text
src/
  components/      komponenty UI dashboardu
  data/            dane mockowe do trybu demo i fallbacku
  hooks/           hooki React
  services/        warstwa API i fallback danych
  styles/          style globalne i komponentowe
```

## Przygotowanie do GitHub

Projekt zawiera `.gitignore`, który wyklucza m.in. `node_modules`, `dist`, `.env` i `.cache`. Przed wysłaniem na GitHub należy wykonać commit oraz upewnić się, że dokumentacja i plik `CHECKLISTA_ODDANIA.md` zawierają aktualne linki do repozytorium i wersji online.
