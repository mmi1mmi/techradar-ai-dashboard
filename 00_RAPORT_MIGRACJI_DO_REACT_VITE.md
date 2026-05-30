# Raport migracji do React + Vite

## Co zostalo zmienione

- Utworzono pelna strukture aplikacji React + Vite.
- Zastapiono prototyp uruchamiany przez CDN, globalne `window.*` i Babel standalone normalnymi modulami ES.
- Dodano `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js` oraz `eslint.config.js`.
- Utworzono katalogi `src/`, `public/` i `assets/`.
- Przeniesiono style do `src/styles/globals.css` oraz `src/styles/components.css`.
- Poprawiono dane tekstowe, w ktorych prototyp mial problemy z kodowaniem znakow.

## Dodane biblioteki

- React i React DOM,
- Vite,
- Tailwind CSS,
- Framer Motion,
- Recharts,
- Lucide React,
- ESLint.

## Utworzone komponenty

- `Sidebar`,
- `Topbar`,
- `NewsCard`,
- `HeroCard`,
- `RadarChart`,
- `CategoryMenu`,
- `SavedArticles`,
- `ThemeToggle`,
- `SearchBar`,
- `TweaksPanel`,
- dodatkowo: `ArticleModal`, `OfflineCard`, `StatStrip`.

## Dodane hooki i logika

- `useNews` - pobieranie danych przez warstwe serwisowa,
- `useNewsFilters` - filtrowanie po kategorii i zapytaniu,
- `useLocalStorage` - zapis ustawien i artykulow,
- `useTheme` - tryb ciemny/jasny,
- `useDashboardTweaks` - ustawienia wygladu dashboardu.

## Mock API i przyszle API

- Dane z dawnego `data.js` przeniesiono do `src/data/mockNews.js`.
- Utworzono `src/services/newsApi.js`.
- Serwis najpierw probuje uzyc `VITE_NEWS_API_URL`.
- Jesli endpoint nie jest skonfigurowany albo zwroci blad, aplikacja korzysta z mock danych.

## Naprawione problemy

- Usunieto zaleznosc od Babel standalone w przegladarce.
- Usunieto globalne zaleznosci `window.TR_NEWS`, `window.Icon`, `window.SignalChart`.
- Zmieniono stare pliki JSX na importy/exporty ES Modules.
- Zastapiono recznie rysowany wykres komponentami Recharts.
- Dodano brakujace zaleznosci i skrypty `npm run dev`, `npm run build`, `npm run preview`.
- Dodano responsywnosc dla tabletow i telefonow.
- Dodano bezpieczny fallback danych.

## Co mozna rozbudowac

- Podpiac prawdziwe API newsow.
- Dodac autoryzacje uzytkownika.
- Dodac backend do synchronizacji zapisanych artykulow.
- Dodac testy komponentow i testy end-to-end.
- Dodac PWA/offline cache przez Service Worker.
- Dodac panel administracyjny do zarzadzania kategoriami i zrodlami.
