# Shared Components — Specification

## Overview

These components are used across all categories. They handle the game session lifecycle, configuration, and results display.

## `GameScreen` (`src/common/GameScreen.tsx`)

The session host for subtraction, addition, and multiplication levels. It owns the question counter and score, then renders the appropriate exercise component based on `level.op` and `level.mode`.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `level` | `Level` | The selected level (from `ALL_LEVELS`) |
| `total` | `number` | Total questions configured in `GameSetupDialog` |
| `onBack` | `() => void` | Called when the player returns to the home screen |

**Routing logic (internal):**
```
level.op === 'mul'                          → StandardMultiplication
level.op === 'add' && mode === 'column'     → ColumnAddition
level.op === 'add' && mode === 'standard'   → StandardAddition
mode === 'column'                           → ColumnSubtraction
mode === 'standard'                         → StandardQuestion
```

**Session flow:**
1. A question is generated via `level.generate()`
2. The exercise component calls `onCorrect()` or `onWrong(answer)`
3. `GameScreen` dispatches `scorePoint` / `nextQuestion` to Redux and shows a feedback message
4. "Next" button generates a new question; after `total` questions, `Summary` replaces the game

**Test mode:** when `game.mode === 'test'`, `hideHint={true}` is passed to column components so the hint button is not shown.

**Note:** `SequenceGame` and `MeasurementGame` do not use `GameScreen` — they manage their own session state.

---

## `GameSetupDialog` (`src/common/GameSetupDialog.tsx`)

Modal dialog shown before every session starts. Lets the player configure session parameters.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `onStart` | `(total, mode, timeLimit) => void` | Called with chosen settings |
| `onCancel` | `() => void` | Called when the dialog is dismissed |

**Options:**

| Setting | Choices | Default |
|---------|---------|---------|
| Question count | 5, 10, 15, 20, 30 | 10 |
| Mode | Practice / Test | Practice |
| Time limit | 10, 15, 30, 45, 60 min | 60 min (Test mode only) |

- Time limit field is only visible when mode = Test
- In Practice mode `timeLimit` is passed as `0`; `GameScreen` passes this as-is to `startGame`
- The dialog dispatches `startGame` indirectly — the parent (`App.tsx`) calls `onStart` and dispatches from there

---

## `Summary` (`src/common/Summary.tsx`)

End-of-session results screen. Rendered in place of the game by `GameScreen`, `SequenceGame`, and `MeasurementGame` when all questions are answered.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `score` | `number` | Number of correct answers |
| `total` | `number` | Total questions |
| `onRetry` | `() => void` | Restart the same level with same settings |
| `onBack` | `() => void` | Return to home screen |

**Result bands:**

| Score | Emoji | Message key |
|-------|-------|-------------|
| 100% | 🏆 | `perfect` |
| ≥ 70% | 🌟 | `great` |
| ≥ 40% | 👍 | `good` |
| < 40% | 💪 | `keepGoing` |

**Fireworks:** on a perfect score (100%), a full-screen `<canvas>` firework animation is launched (`launchFireworks`). Six bursts fire in sequence over ~200 animation frames. The animation cleans itself up automatically.

---

## `Toolbar` (`src/common/Toolbar.tsx`)

Persistent top bar rendered in `App.tsx` outside the route content.

- Displays the current question number and score during an active game (from Redux `game` state)
- Shows a countdown timer when `game.timeLimit > 0` (test mode); timer is driven by a `setInterval` that dispatches `tickTimer` every second
- Contains the language `<select>` populated from `LANGUAGES`; dispatches `setLanguage` on change
- "Back" button is shown during an active game session; calls `endGame` dispatch and navigates back to home
