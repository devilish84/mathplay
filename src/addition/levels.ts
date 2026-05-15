import type { Level } from '../types'
import { rand, getRng } from '../rng'

const genAdd1 = () => {
  if (getRng()() < 0.5) {
    const b = rand(5, 9)
    const a = 10 - b + rand(0, b - 1)
    return { a: Math.max(a, 1), b }
  }
  const a = rand(1, 5)
  const b = rand(1, Math.max(1, 9 - a))
  return { a, b }
}

const genAdd2 = () => {
  if (getRng()() < 0.5) {
    const units_a = rand(5, 9)
    const units_b = rand(10 - units_a, 9)
    const a = 10 + units_a
    const b = Math.min(units_b, 9)
    return { a, b: Math.max(b, 1) }
  }
  const a = 10 + rand(0, 9)
  const b = rand(1, Math.max(1, 9 - (a % 10)))
  return { a, b: Math.max(b, 1) }
}

const genAdd3 = () => {
  if (getRng()() < 0.6) {
    const aU = rand(5, 9)
    const bU = rand(5, 9)
    const aT = rand(1, 4)
    const bT = rand(1, 4)
    return { a: aT * 10 + aU, b: bT * 10 + bU }
  }
  const a = rand(10, 49)
  const b = rand(1, Math.max(1, Math.min(9 - (a % 10), 40)))
  return { a, b: Math.max(b, 1) }
}

const genAdd4 = () => {
  const a = rand(101, 800)
  const b = rand(100, 800)
  return { a: Math.min(a, 999), b: Math.min(b, 999) }
}

export const ADD_LEVELS: Level[] = [
  { id: 'a1', icon: '⭐',      className: 'lv1', generate: genAdd1, mode: 'standard', op: 'add' },
  { id: 'a2', icon: '⭐⭐',    className: 'lv2', generate: genAdd2, mode: 'standard', op: 'add' },
  { id: 'a3', icon: '⭐⭐',    className: 'lv2', generate: genAdd2, mode: 'column',   op: 'add' },
  { id: 'a4', icon: '⭐⭐⭐',  className: 'lv3', generate: genAdd3, mode: 'standard', op: 'add' },
  { id: 'a5', icon: '⭐⭐⭐',  className: 'lv3', generate: genAdd3, mode: 'column',   op: 'add' },
  { id: 'a6', icon: '⭐⭐⭐⭐', className: 'lv4', generate: genAdd4, mode: 'column',   op: 'add' },
]
