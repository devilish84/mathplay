# Addition — Category Specification

## Overview

Addition mirrors the subtraction category in structure: horizontal levels for mental arithmetic and column levels for written addition with carry. Column levels include an interactive carry-entry row and a step-by-step hint.

## Levels

| ID | Stars | Title | Example | Mode |
|----|-------|-------|---------|------|
| a1 | ⭐ | Small numbers | 7 + 8 | standard |
| a2 | ⭐⭐ | Tens — horizontal | 15 + 9 | standard |
| a3 | ⭐⭐ | Tens — column | 15 + 9 | column |
| a4 | ⭐⭐⭐ | Two digits — horizontal | 34 + 27 | standard |
| a5 | ⭐⭐⭐ | Two digits — column | 34 + 27 | column |
| a6 | ⭐⭐⭐⭐ | Three digits — column | 234 + 167 | column |

### Question generation details

| Level | Generator logic |
|-------|----------------|
| a1 | Two paths: near-10 sums (50%) or simple single-digit pairs. Result is always ≤ 18. |
| a2 & a3 | `a` in 10–19. Two paths: carry (units sum ≥ 10, ~50%) or no carry. |
| a4 & a5 | Two-digit `a` and `b`. Carry path (60%): both units digits ≥ 5 so column sum always crosses 10. No-carry path: units digits chosen to not overflow. |
| a6 | `a` and `b` both in 100–999. May produce carries in any column. |

## Components

### `StandardAddition` (`src/addition/standard/StandardAddition.tsx`)

Horizontal inline format: `a + b = [input]`.

Structurally identical to `StandardQuestion` (subtraction) — single numeric input, Enter to check, green/red feedback on answer. Calls `onCorrect()` or `onWrong(answer)` on the parent (`GameScreen`).

### `ColumnAddition` (`src/addition/column/ColumnAddition.tsx`)

Written column format with an explicit carry row above the top number.

**Layout:**
```
     hundreds | tens | ones
  ──── carry inputs ────────
         2    |  3   |  4    ← top number (a)
       + 1    |  6   |  7    ← bottom number (b)
  ─────────────────────────
         [_]  | [_]  | [_]   ← answer inputs (right-to-left)
```

**Carry row:**
- Small `<input>` boxes sit above each column (except the ones column) for the child to enter carry digits
- Only `0` or `1` are accepted (`/[^01]/` stripped)
- After checking, carry inputs are colour-coded independently of the answer:
  - Correct carry entered → green
  - Carry needed but not entered → orange (`carry-missing`)
  - Carry entered but not needed → red (`carry-wrong`)
- The Check button does not require carries to be filled — the child can skip them and just enter the final answer

**Answer inputs:**
- One `<input>` per answer digit, filled right-to-left; Backspace moves focus left; typing a digit auto-advances to the next column

**Hint toggle:**
- "Hint" button (hidden in test mode) renders `AdditionHint` inline below

### `AdditionHint` (`src/addition/column/AdditionHint.tsx`)

Step-by-step hint that walks through column addition, one column at a time from right to left.

- Pre-computes column sums and carry propagation for the given `a` and `b`
- Each step highlights the active column in the mini visual and explains in text: the column sum, whether there is a carry out, and the resulting digit
- If a column receives a carry from the previous step, the text includes it (e.g. "ones: 4 + 7 + carry 1 = 12, write 2 carry 1")
- `+1` carry annotations appear above columns once they have been covered
- Final step shows the full answer; "Well done!" message ends the sequence

## Routing

`GameScreen` selects the addition component based on `level.op` and `level.mode`:

```
level.op === 'add' && level.mode === 'column'   → ColumnAddition
level.op === 'add' && level.mode === 'standard' → StandardAddition
```
