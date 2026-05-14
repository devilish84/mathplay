# Subtraction — Category Specification

## Overview

Subtraction is the foundational arithmetic category. It offers both horizontal (inline) and column (written) formats, with column levels including an interactive step-by-step borrowing hint.

## Levels

| ID | Stars | Title | Example | Mode |
|----|-------|-------|---------|------|
| 1 | ⭐ | Small numbers | 5 − 4 | standard |
| 2 | ⭐⭐ | Tens — horizontal | 15 − 9 | standard |
| 3 | ⭐⭐ | Tens — column | 15 − 9 | column |
| 4 | ⭐⭐⭐ | Two digits — horizontal | 34 − 16 | standard |
| 5 | ⭐⭐⭐ | Two digits — column | 34 − 16 | column |
| 6 | ⭐⭐⭐⭐ | Hundreds — column | 205 − 39 | column |

### Question generation details

| Level | Generator logic |
|-------|----------------|
| 1 | `b` in 1–5, `a = b + rand(0–5)`. Small single-digit subtractions, always non-negative. |
| 2 & 3 | `a` in 10–18, `b` in 1–9 (capped so `a ≥ b`). Crosses the tens boundary ~50% of the time. |
| 4 & 5 | `b` in 10–39, `a = b + rand(1–30)`. Two-digit subtractions often requiring borrowing. |
| 6 | 40% chance: hundreds-round `a` (e.g. 201) minus 2-digit `b`. Otherwise: `a` in 101–900, `b` up to `a−1`. |

## Components

### `StandardQuestion` (`src/subtraction/standard/StandardQuestion.tsx`)

Horizontal inline format: `a − b = [input]`.

- Single text input, `inputMode="numeric"`, auto-focused on each new question
- Input is validated to digits only; Enter key triggers check
- After checking: input turns green (correct) or red (wrong); Check button hides
- Calls `onCorrect()` or `onWrong(answer)` on the parent (`GameScreen`)

### `ColumnSubtraction` (`src/subtraction/column/ColumnSubtraction.tsx`)

Written column format with interactive borrowing mechanics.

**Layout:**
```
     hundreds | tens | ones
  ─────────────────────────
         2    |  0   |  5    ← top number (a)
       − 0    |  3   |  9    ← bottom number (b)
  ─────────────────────────
              |  [_] | [_]   ← answer inputs (right-to-left)
```

**Borrowing interaction:**
- The child clicks a digit in the top row to initiate borrowing from that column
- The clicked digit decreases by 1 (shown with strikethrough annotation) and the receiving column gets `+10`
- When a borrow is activated, a mini-panel appears asking the child to compute the new effective value (e.g. `3 + 10 = [input]`) before the answer inputs unlock for that column
- Multiple borrows are supported (chain borrowing for level 6 three-digit numbers)

**Answer inputs:**
- One `<input>` per digit, maxLength 1, auto-focus starts from the rightmost (ones) column
- Backspace moves focus left; filling a digit moves focus right automatically
- Check button is disabled until all answer inputs are filled and all borrow-sum fields are confirmed correct

**Hint toggle:**
- "Hint" button (`hideHint=false` in practice mode, hidden in test mode) renders `BorrowingHint` inline below

### `BorrowingHint` (`src/subtraction/column/BorrowingHint.tsx`)

Step-by-step animated hint that walks through the borrowing algorithm.

- Pre-computes the full borrow simulation via `simulateBorrow()` and builds a list of `HintStep` objects
- Steps cover: identifying the need to borrow, applying the borrow to the correct column, computing each column result
- Visual: a mini column layout is rendered showing the working numbers with `+10` and strikethrough annotations revealing progressively
- "Next step →" button advances through steps; last step shows a "Well done!" message
- The hint is purely explanatory — it does not affect the game state or scoring

## Routing

`GameScreen` renders the correct subtraction component based on `level.mode`:

```
level.mode === 'column'   → ColumnSubtraction
level.mode === 'standard' → StandardQuestion
```
