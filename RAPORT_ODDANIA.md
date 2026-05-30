# Raport przygotowania projektu do oddania

Data: 30.05.2026

## Zakres wykonanych prac

- Uporządkowano dokumentację projektu.
- Uzupełniono `.gitignore` o wymagane wpisy: `node_modules`, `dist`, `.env`, `.cache`.
- Zaktualizowano `README.md` o opis projektu, technologie, instrukcję uruchomienia, funkcje, tryb demo/live API, założoną ocenę oraz elementy ponad poziom podstawowy.
- Dodano plik `OPIS_DO_MAILA.md` z krótką treścią maila do prowadzącego.
- Dodano plik `CHECKLISTA_ODDANIA.md` z listą czynności przed wysłaniem projektu.
- Nie zmieniano obecnego UI ani logiki aplikacji.

## Weryfikacja

```bash
npm run lint
```

Wynik: poprawnie.

```bash
npm run build
```

Wynik: build nie zakończył się poprawnie z powodu błędu środowiskowego Windows / esbuild:

```text
[vite:build-html] spawn EPERM
file: F:/Aplikacja webowa/index.html
```

Zgodnie z założeniem nie wprowadzano zmian w kodzie aplikacji tylko po to, aby obejść problem `esbuild` / `EPERM`.

## Status

Projekt jest przygotowany dokumentacyjnie do wrzucenia na GitHub. Przed wysłaniem należy utworzyć repozytorium GitHub, wypchnąć kod i wkleić link w `CHECKLISTA_ODDANIA.md` oraz `OPIS_DO_MAILA.md`.
