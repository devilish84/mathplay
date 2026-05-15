import { rand, getRng } from '../rng'

export interface ArithQuestion {
  aVal:    number
  aUnit:   string
  op:      '+' | '-'
  bVal:    number
  bUnit:   string
  ans1:    number
  ans1Unit:string
  ans2?:   number
  ans2Unit?:string
}

export interface ArithLevel {
  kind:      'arith'
  id:        string
  icon:      string
  className: string
  generate:  (index: number) => ArithQuestion
}

// ── helpers ─────────────────────────────────────────────

function lDlSub(): ArithQuestion {
  const l  = rand(1, 3)
  const dl = rand(1, l * 10 - 1)
  return { aVal: l, aUnit: 'l', op: '-', bVal: dl, bUnit: 'dl', ans1: l * 10 - dl, ans1Unit: 'dl' }
}

function lDlAdd(): ArithQuestion {
  const a = rand(5, 9)
  const b = rand(10 - a + 1, 10)          // ensures sum >= 10 dl (crosses into litres)
  const total = a + b
  return { aVal: a, aUnit: 'dl', op: '+', bVal: b, bUnit: 'dl',
           ans1: Math.floor(total / 10), ans1Unit: 'l',
           ans2: total % 10,             ans2Unit: 'dl' }
}

function mCmSub(): ArithQuestion {
  const m  = rand(1, 3)
  const cm = rand(1, m * 100 - 1)
  return { aVal: m, aUnit: 'm', op: '-', bVal: cm, bUnit: 'cm', ans1: m * 100 - cm, ans1Unit: 'cm' }
}

function mCmAdd(): ArithQuestion {
  const a = rand(50, 95)
  const b = rand(100 - a + 1, 100)        // ensures sum >= 100 cm
  const total = a + b
  return { aVal: a, aUnit: 'cm', op: '+', bVal: b, bUnit: 'cm',
           ans1: Math.floor(total / 100), ans1Unit: 'm',
           ans2: total % 100,             ans2Unit: 'cm' }
}

// ── levels ───────────────────────────────────────────────

export const ARITH_LEVELS: ArithLevel[] = [
  {
    kind:      'arith',
    id:        'l_dl_arith',
    icon:      '⭐⭐',
    className: 'level-blue',
    generate(index: number) {
      return index % 2 === 0 ? lDlSub() : lDlAdd()
    },
  },
  {
    kind:      'arith',
    id:        'm_cm_arith',
    icon:      '⭐⭐',
    className: 'level-blue',
    generate(index: number) {
      return index % 2 === 0 ? mCmSub() : mCmAdd()
    },
  },
  {
    kind:      'arith',
    id:        'mix_arith',
    icon:      '⭐⭐⭐',
    className: 'level-purple',
    generate(index: number) {
      const sub = index % 2 === 0
      const useLitre = getRng()() < 0.5
      if (useLitre) return sub ? lDlSub() : lDlAdd()
      return sub ? mCmSub() : mCmAdd()
    },
  },
]
