# Progress and Error Weighting — Specification

## Goal

The system tracks the child's errors per task type and adjusts future task selection so that weaker areas appear more often.

## Redux state (`progressSlice`)

```ts
interface Session {
  id: string        // uuid
  date: string      // "YYYY-MM-DD"
  mode: string      // category id, e.g. "subtraction", "mul"
  levelId: string   // level id, e.g. "lv3", "m7"
  score: number
  total: number
  errors: unknown[] // raw error records (reserved for future detail views)
}

interface ProgressState {
  sessions: Session[]
  weights: Record<string, number>
  // key format: "<mode>-<levelId>", e.g. "subtraction-lv3"
  // 1.0 = normal, > 1.0 = weighted up due to errors
}
```

## Weighting algorithm (v1.0 — simple)

At the end of each session `recordSession` is dispatched:

1. Compute **error rate**: `(total − score) / total`
2. If error rate > 40 % → weight `+0.3` (capped at 3.0)
3. If error rate < 20 % → weight `−0.1` (floor at 1.0)
4. Otherwise weight is unchanged

```ts
const key      = `${mode}-${levelId}`
const errorPct = total > 0 ? (total - score) / total : 0
const current  = state.weights[key] ?? 1.0

if (errorPct > 0.4)      state.weights[key] = Math.min(3.0, +(current + 0.3).toFixed(1))
else if (errorPct < 0.2) state.weights[key] = Math.max(1.0, +(current - 0.1).toFixed(1))
```

## Weighted task selection (future)

The weights table is persisted but not yet wired into task generation. Planned:

```ts
// Levels with weight > 1.5 get 2× probability of being suggested
function weightedLevelPick(levels, weights) { ... }
```

## Persistence

- Redux state is serialised to `localStorage` on every change (manual `subscribe` in `src/store/index.ts`)
- Deserialized on startup and merged with `initialState`
- No user account required — device-local history

## UI indicators (planned, v1.1)

- Error-prone levels flagged with a small indicator on the level card
- Category card on home screen may show "last result" percentage
- `clearHistory` action available for resetting all progress

## Game setup dialog

Before each game session the player configures:

| Setting | Options | Notes |
|---------|---------|-------|
| Question count | 5, 10, 15, 20, 30 | Default: 10 |
| Mode | Practice / Test | Practice = no time pressure |
| Time limit | 10, 15, 30, 45, 60 min | Only shown in Test mode |

In Practice mode `timeLimit` is passed as `0` (no countdown). In Test mode the timer ticks down via `tickTimer` dispatched each second.
