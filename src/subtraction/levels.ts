import type { Level } from '../types'
import { rand, getRng } from '../rng'

const gen1 = () => {
  const b = rand(1, 5)
  const a = b + rand(0, 5)
  return { a, b }
}

const gen2 = () => {
  const b = rand(1, 9)
  const a = 10 + rand(0, 9)
  return { a, b: Math.min(b, a) }
}

const gen3 = () => {
  const b = rand(10, 40)
  const a = b + rand(1, 30)
  return { a, b }
}

const gen4 = () => {
  if (getRng()() < 0.4) {
    const hundreds = rand(2, 9)
    const units    = rand(1, 9)
    const a        = hundreds * 100 + units
    const b        = rand(10, 98)
    return { a: Math.max(a, b + 1), b }
  }
  const a = rand(101, 900)
  const b = Math.min(rand(1, a - 1), 999)
  return { a, b }
}

export const LEVELS: Level[] = [
  { id: 1, icon: '⭐',       className: 'lv1', generate: gen1, mode: 'standard' },
  { id: 2, icon: '⭐⭐',     className: 'lv2', generate: gen2, mode: 'standard' },
  { id: 3, icon: '⭐⭐',     className: 'lv2', generate: gen2, mode: 'column'   },
  { id: 4, icon: '⭐⭐⭐',   className: 'lv3', generate: gen3, mode: 'standard' },
  { id: 5, icon: '⭐⭐⭐',   className: 'lv3', generate: gen3, mode: 'column'   },
  { id: 6, icon: '⭐⭐⭐⭐', className: 'lv4', generate: gen4, mode: 'column'   },
]
