# Home Screen — Specification

## Overview

The home screen is the first thing the child or parent sees when the app opens. It shows all available tasks as a filterable card grid, replacing the earlier category-first navigation.

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  All tasks                           [Language selector] │
├─────────────────────────────────────────────────────────┤
│  [➖ Subtraction] [➕ Addition] [✖️ Multiplication]       │
│  [🔢 Sequences] [📏 Measurements]                        │
│  ────────────────────────────────────────────────────   │
│  [⭐] [⭐⭐] [⭐⭐⭐] [⭐⭐⭐⭐]                              │
├─────────────────────────────────────────────────────────┤
│  ╔══════════════╗  ╔══════════════╗  ╔══════════════╗  │
│  ║ ➖ Subtraction║  ║ ➕ Addition  ║  ║ ✖️ Multiply  ║  │
│  ║ Level 1      ║  ║ Level 1      ║  ║ 2× table     ║  │
│  ║ desc…        ║  ║ desc…        ║  ║ desc…        ║  │
│  ║ ⭐            ║  ║ ⭐            ║  ║ ⭐⭐           ║  │
│  ╚══════════════╝  ╚══════════════╝  ╚══════════════╝  │
│  …                                                      │
├─────────────────────────────────────────────────────────┤
│  © 2026 Mika Mähönen · MIT License · GitHub · Claude   │
└─────────────────────────────────────────────────────────┘
```

## Filter bar

Two independent filter groups:

1. **Category chips** — one per category (`sub`, `add`, `mul`, `seq`, `measure`). Clicking a chip toggles it; active chip filters the grid to that category only. When a category is active, the page title changes to `<icon> <category name>`.
2. **Star chips** — `⭐`, `⭐⭐`, `⭐⭐⭐`, `⭐⭐⭐⭐`. Clicking filters to tasks with exactly that difficulty. The two groups are independent (both can be active simultaneously).

If no tasks match the active filters, an "empty" message is shown instead of the grid.

## Task cards

Each card shows:
- Category icon + translated category name
- Task title (localised)
- Task description (localised)
- Star row indicating difficulty

Clicking a card opens `GameSetupDialog` to configure question count, mode, and (optionally) time limit before starting.

## Language selector

- `<select>` in the top-right toolbar, populated from `LANGUAGES` in `src/i18n/index.ts`
- Supported languages: Finnish, English, Swedish, Norwegian, German, Spanish, Portuguese, Czech, Estonian
- Selection is persisted in Redux `settingsSlice` → localStorage
- Default: auto-detected from `navigator.languages` (falls back to English)

## Colours (per category)

| Category | CSS class | Colour |
|----------|-----------|--------|
| Subtraction | `cat-sub` | red/pink |
| Addition | `cat-add` | green |
| Multiplication | `cat-mul` | orange/yellow |
| Sequences | `cat-seq` | blue |
| Measurements | `cat-measure` | purple |
