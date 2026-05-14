# Multiplication — Category Specification

## Overview

Multiplication covers all single-digit times tables (1–10) plus a mixed level. All questions use a simple horizontal inline format — no column layout.

## Levels

| ID | Stars | Title | Example | Table |
|----|-------|-------|---------|-------|
| m1 | ⭐ | 1× table | 1 × 7 | 1 |
| m10 | ⭐ | 10× table | 10 × 7 | 10 |
| m2 | ⭐⭐ | 2× table | 2 × 7 | 2 |
| m5 | ⭐⭐ | 5× table | 5 × 7 | 5 |
| m3 | ⭐⭐⭐ | 3× table | 3 × 7 | 3 |
| m4 | ⭐⭐⭐ | 4× table | 4 × 7 | 4 |
| m6 | ⭐⭐⭐ | 6× table | 6 × 7 | 6 |
| m7 | ⭐⭐⭐ | 7× table | 7 × 7 | 7 |
| m8 | ⭐⭐⭐ | 8× table | 8 × 7 | 8 |
| m9 | ⭐⭐⭐ | 9× table | 9 × 7 | 9 |
| mx | ⭐⭐⭐ | All times tables | 7 × 8 | random 1–10 |

### Question generation

- Single-table levels (`m1`–`m9`, `m10`): `a` is fixed to the table number; `b` is random in 1–10
- Mixed level (`mx`): both `a` and `b` are random in 1–10

## Components

### `StandardMultiplication` (`src/multiplication/StandardMultiplication.tsx`)

Horizontal equation format: `a × b = [input]`.

- Single numeric input, auto-focused on each new question
- Enter key triggers check; input is filtered to digits only
- After checking: input turns green (correct) or red (wrong)
- No hint available — multiplication is expected to be recalled from memory
- Calls `onCorrect()` or `onWrong(answer)` on the parent (`GameScreen`)

## Routing

`GameScreen` selects multiplication when `level.op === 'mul'`:

```
level.op === 'mul' → StandardMultiplication
```

The level's `mode` field is `'standard'` for all multiplication levels; only `op` is checked by the router.
