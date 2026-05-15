import type { Level } from '../types'
import { rand } from '../rng'

const gen = (table: number) => () => ({
  a: table,
  b: rand(1, 10),
})

const genMixed = () => ({
  a: rand(1, 10),
  b: rand(1, 10),
})

export const MUL_LEVELS: Level[] = [
  { id: 'm1',  icon: '⭐',      className: 'lv1', generate: gen(1),   mode: 'standard', op: 'mul' },
  { id: 'm10', icon: '⭐',      className: 'lv1', generate: gen(10),  mode: 'standard', op: 'mul' },
  { id: 'm2',  icon: '⭐⭐',    className: 'lv2', generate: gen(2),   mode: 'standard', op: 'mul' },
  { id: 'm5',  icon: '⭐⭐',    className: 'lv2', generate: gen(5),   mode: 'standard', op: 'mul' },
  { id: 'm3',  icon: '⭐⭐⭐',  className: 'lv3', generate: gen(3),   mode: 'standard', op: 'mul' },
  { id: 'm4',  icon: '⭐⭐⭐',  className: 'lv3', generate: gen(4),   mode: 'standard', op: 'mul' },
  { id: 'm6',  icon: '⭐⭐⭐',  className: 'lv3', generate: gen(6),   mode: 'standard', op: 'mul' },
  { id: 'm7',  icon: '⭐⭐⭐',  className: 'lv3', generate: gen(7),   mode: 'standard', op: 'mul' },
  { id: 'm8',  icon: '⭐⭐⭐',  className: 'lv3', generate: gen(8),   mode: 'standard', op: 'mul' },
  { id: 'm9',  icon: '⭐⭐⭐',  className: 'lv3', generate: gen(9),   mode: 'standard', op: 'mul' },
  { id: 'mx',  icon: '⭐⭐⭐',  className: 'lv3', generate: genMixed, mode: 'standard', op: 'mul' },
]
