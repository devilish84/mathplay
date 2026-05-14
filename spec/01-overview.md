# MathPlay — Overview

## Purpose

A browser-based math practice game designed primarily for primary school children (ages 6–10). The game supports learning through visually clear exercises, immediate feedback, and step-by-step hints.

## Target users

- **Primary:** child aged 6–10
- **Secondary:** parent or teacher selecting the topic and monitoring progress

## Tech stack

| Concern | Solution |
|---------|----------|
| Frontend | React 19 + Vite 8 |
| State | Redux Toolkit 2 |
| Language | TypeScript |
| i18n | Custom hook-based translation system (9 languages) |
| Distribution | 1) Node.js/Express server, 2) single self-contained HTML file |
| Testing | Playwright (E2E) |

## Architecture principles

- **Extensibility:** a new topic area is added as its own folder (`src/<topic>/`) with no changes required elsewhere
- **Component split:** each screen and significant UI element is its own file
- **State in Redux store:** score, session history, error weights, language, game mode, timer
- **No external CSS frameworks** — custom stylesheet (`App.css`, `index.css`)

## Directory structure

```
src/
  App.tsx
  App.css
  index.css
  main.tsx
  types.ts              ← shared TypeScript interfaces
  levels.ts             ← aggregates all levels into ALL_LEVELS

  store/
    index.ts            ← Redux store configuration + localStorage persistence
    gameSlice.ts        ← active game state (score, question, timer, mode)
    progressSlice.ts    ← session history + error-based weighting
    settingsSlice.ts    ← language (auto-detected from browser)

  i18n/
    index.ts            ← useTranslation hook + useLang + LANGUAGES list
    fi.ts | en.ts | sv.ts | nb.ts | de.ts | es.ts | pt.ts | cs.ts | et.ts
    levelLocales.ts     ← helper to resolve per-level locale strings
    screens/            ← per-screen translation files
    common/             ← per-component translation files
    addition/ subtraction/ multiplication/ sequences/ measurements/

  screens/
    Home.tsx            ← task grid with category + star filters

  common/
    GameScreen.tsx      ← wraps any game with toolbar and question counter
    GameSetupDialog.tsx ← question count, practice/test mode, time limit
    Summary.tsx         ← end-of-round results with score and retry

  subtraction/
    levels.ts
    standard/StandardQuestion.tsx
    column/ColumnSubtraction.tsx + BorrowingHint.tsx

  addition/
    levels.ts
    standard/StandardAddition.tsx
    column/ColumnAddition.tsx + AdditionHint.tsx

  multiplication/
    levels.ts
    StandardMultiplication.tsx

  sequences/
    levels.ts
    SequenceGame.tsx

  measurements/
    levels.ts
    MeasurementGame.tsx
```

## Game categories

| Category | Icon | Levels | Status |
|----------|------|--------|--------|
| Subtraction | ➖ | 4 standard + 4 column (with borrowing hints) | Live |
| Addition | ➕ | 4 standard + 4 column (with carry hints) | Live |
| Multiplication | ✖️ | 11 (individual tables 1–10 + mixed) | Live |
| Sequences | 🔢 | 4 (ascending/descending, varying step) | Live |
| Measurements | 📏 | 6 (cm↔mm, km↔m, l↔dl, with remainder variants) | Live |
