# Measurements — Category Specification

## Overview

Measurement tasks practise unit conversion within the metric system: length (cm, mm, km, m) and volume (l, dl). Two question formats are used: simple conversion (single answer) and remainder conversion (two answers for whole unit + leftover).

## Levels

| ID | Stars | Title | Example | Format |
|----|-------|-------|---------|--------|
| cm_mm | ⭐ | Centimetres and millimetres | 25 cm = ? mm | simple (alternating direction) |
| mm_to_cm_mm | ⭐⭐ | Millimetres to cm and mm | 25 mm = ? cm ? mm | remainder |
| km_m | ⭐ | Kilometres and metres | 3 km = ? m | simple (alternating direction) |
| m_to_km_m | ⭐⭐ | Metres to km and m | 1500 m = ? km ? m | remainder |
| l_dl | ⭐ | Litres and decilitres | 4 l = ? dl | simple (alternating direction) |
| dl_to_l_dl | ⭐⭐ | Decilitres to l and dl | 15 dl = ? l ? dl | remainder |

### Question generation details

**Simple (alternating direction):**
- Even-indexed questions convert the larger unit to smaller (e.g. cm → mm)
- Odd-indexed questions convert smaller to larger (e.g. mm → cm)
- The `index` parameter passed to `generate()` is the current question number

**Remainder format:**
- Always converts the smaller unit into the larger unit plus a remainder
- `mm_to_cm_mm`: input 1–500 mm → whole cm + remainder mm
- `m_to_km_m`: input 1001–5500 m → whole km + remainder m
- `dl_to_l_dl`: input 1–100 dl → whole l + remainder dl

**Deduplication:** `MeasurementGame` retries `generate()` up to 10 times if the new question would have the same `input` and `inputUnit` as the previous one.

## Components

### `MeasurementGame` (`src/measurements/MeasurementGame.tsx`)

Standalone game component (not routed through `GameScreen`).

**Layout (simple):**
```
  Convert:   25  cm  =  [input]  mm
```

**Layout (remainder):**
```
  Convert:   25  mm  =  [input]  cm  [input]  mm
```

- The given value and its unit are displayed as read-only text
- One or two `<input>` elements accept the answer(s), filtered to digits only
- For remainder questions, Tab or Enter in the first field moves focus to the second; Enter in the second field (or first for simple) triggers the check
- The Check button is disabled until all required inputs are filled

**Feedback:**
- After checking, each input turns green (correct) or red (wrong)
- If wrong, the correct answer is shown below the equation
- "Next" / "Show result" button advances or ends the session

**No hint available:** measurements rely on knowing the conversion factor; there is no step-by-step hint for this category.

**Test mode:** `isTest` is read from Redux game state but has no special effect beyond the standard behaviour (no hint button exists anyway).

## Routing

`MeasurementGame` is rendered directly from `App.tsx` when the selected level has `category === 'measure'`. Like `SequenceGame`, it manages its own question counter, score, and `done` state.
