/**
 * Pre-computed question fixtures for deterministic E2E tests.
 *
 * Each fixture was produced by running the exact same LCG (seed → rand calls)
 * as the game uses at runtime, including duplicate-prevention retries.
 *
 * To regenerate: node tests/compute-fixtures.js
 */

export interface QA      { a: number; b: number; ans: number }
export interface MeasureQA { input: number; inputUnit: string; ans: number; ansUnit: string }
export interface SeqQA   { step: number; start: number; shown: number[]; answers: number[] }

// ── Subtraction ──────────────────────────────────────────────────────────────
// gen1: b=rand(1,5), a=b+rand(0,5)          seed=1001
export const SUB_LV1: QA[] = [
  { a:4, b:4, ans:0  },
  { a:6, b:2, ans:4  },
  { a:3, b:3, ans:0  },
  { a:9, b:5, ans:4  },
  { a:4, b:4, ans:0  },
  { a:6, b:5, ans:1  },
  { a:6, b:3, ans:3  },
  { a:3, b:3, ans:0  },
  { a:4, b:1, ans:3  },
  { a:3, b:2, ans:1  },
]

// ── Addition ─────────────────────────────────────────────────────────────────
// genAdd1: rng<0.5 → cross-ten pairs; else small pairs   seed=2001
export const ADD_LV1: QA[] = [
  { a:9, b:8, ans:17 },
  { a:5, b:4, ans:9  },
  { a:5, b:2, ans:7  },
  { a:4, b:1, ans:5  },
  { a:9, b:7, ans:16 },
  { a:8, b:5, ans:13 },
  { a:1, b:4, ans:5  },
  { a:3, b:5, ans:8  },
  { a:2, b:2, ans:4  },
  { a:5, b:2, ans:7  },
]

// ── Multiplication ────────────────────────────────────────────────────────────
// gen(2): a=2, b=rand(1,10)                 seed=3002
export const MUL_M2: QA[] = [
  { a:2, b:4,  ans:8  },
  { a:2, b:6,  ans:12 },
  { a:2, b:4,  ans:8  },
  { a:2, b:8,  ans:16 },
  { a:2, b:2,  ans:4  },
  { a:2, b:3,  ans:6  },
  { a:2, b:4,  ans:8  },
  { a:2, b:10, ans:20 },
  { a:2, b:7,  ans:14 },
  { a:2, b:1,  ans:2  },
]

// ── Measurements ─────────────────────────────────────────────────────────────
// cm_mm: alternates forward/back with duplicate prevention   seed=5001
export const MEASURE_CM_MM: MeasureQA[] = [
  { input:9,   inputUnit:'cm', ans:90,  ansUnit:'mm' },
  { input:450, inputUnit:'mm', ans:45,  ansUnit:'cm' },
  { input:3,   inputUnit:'cm', ans:30,  ansUnit:'mm' },
  { input:400, inputUnit:'mm', ans:40,  ansUnit:'cm' },
  { input:20,  inputUnit:'cm', ans:200, ansUnit:'mm' },
  { input:470, inputUnit:'mm', ans:47,  ansUnit:'cm' },
  { input:48,  inputUnit:'cm', ans:480, ansUnit:'mm' },
  { input:170, inputUnit:'mm', ans:17,  ansUnit:'cm' },
  { input:30,  inputUnit:'cm', ans:300, ansUnit:'mm' },
  { input:450, inputUnit:'mm', ans:45,  ansUnit:'cm' },
]

// ── Sequences ────────────────────────────────────────────────────────────────
// seqE asc ones: step=rand(1,5), start=rand(1,10)   seed=4005
export const SEQ_E: SeqQA[] = [
  { step:4, start:6,  shown:[6,10,14],  answers:[18,22,26,30] },
  { step:1, start:10, shown:[10,11,12], answers:[13,14,15,16] },
  { step:3, start:3,  shown:[3,6,9],    answers:[12,15,18,21] },
  { step:4, start:9,  shown:[9,13,17],  answers:[21,25,29,33] },
  { step:5, start:7,  shown:[7,12,17],  answers:[22,27,32,37] },
]
