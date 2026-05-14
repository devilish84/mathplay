# Sequences — Category Specification

## Overview

Sequence tasks train pattern recognition: the child is shown the first three numbers in an arithmetic sequence and must fill in the next four. Both ascending and descending sequences are included at four difficulty levels each.

## Levels

| ID | Stars | Direction | Title | Example | Step range |
|----|-------|-----------|-------|---------|------------|
| seqA | 🔢 | descending | Decreasing — ones | 20, 18, 16, … | 1–10 |
| seqB | 🔢🔢 | descending | Decreasing — tens | 100, 90, 80, … | 10, 20, 30, 40, 50 |
| seqC | 🔢🔢🔢 | descending | Decreasing — hundreds by tens | 500, 470, 440, … | 5, 10, 20…90 |
| seqD | 🔢🔢🔢🔢 | descending | Decreasing — hundreds | 900, 700, 500, … | 100, 200, 300, 400, 500 |
| seqE | 🔢 | ascending | Ascending — ones | 3, 6, 9, … | 1–5 |
| seqF | 🔢🔢 | ascending | Ascending — tens | 10, 30, 50, … | 10, 20, 30 |
| seqG | 🔢🔢🔢 | ascending | Ascending — mixed | 5, 20, 35, … | 15, 25 |

### Question generation

Each level's `generate()` returns `{ start, step }`. The full sequence of 7 numbers is derived at render time:

- Ascending: `start, start+step, start+2*step, …`
- Descending: `start, start−step, start−2*step, …`

The generator ensures the starting value is large enough that all 7 numbers remain positive for descending sequences.

**Constants** (defined in `src/sequences/levels.ts`):
- `SEQ_SHOW = 3` — numbers shown to the child
- `SEQ_ASK = 4` — blank inputs the child must fill

## Components

### `SequenceGame` (`src/sequences/SequenceGame.tsx`)

Standalone game component (not routed through `GameScreen`).

**Layout:**
```
  [given₁] → [given₂] → [given₃] → [input₁] → [input₂] → [input₃] → [input₄]
```

- Given numbers are displayed as read-only cards; blank positions are `<input>` elements
- `→` arrows separate all items in the row
- Inputs are `inputMode="numeric"`, digits only; Tab and Enter advance focus to the next input; Backspace on an empty input moves focus back
- All four inputs must be filled before the Check button becomes active
- After checking: each input turns green (correct) or red (wrong); if any are wrong, the correct answers are shown in a row below the inputs

**Step reveal (practice mode only):**
- A "Show step" button reveals the step size (`"The step is +N"` or `"The step is −N"`)
- Hidden in test mode (`isTest` from Redux game state)

**Feedback and navigation:**
- Correct/wrong feedback message shown below the action row
- "Next" button advances to the next question; the last question shows "Show result" instead
- On completion, `Summary` is rendered in place of the game

## Routing

`SequenceGame` is rendered directly from `App.tsx` when the selected level has `category === 'seq'`. It manages its own question counter, score, and `done` state rather than using `GameScreen`.
