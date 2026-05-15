import type { SeqLevel } from '../types'
import { rand, pick } from '../rng'

export const SEQ_SHOW = 3
export const SEQ_ASK  = 4

export const SEQ_LEVELS: SeqLevel[] = [
  {
    id: 'seqA',
    icon: '🔢',
    className: 'lv1',
    generate: () => {
      const step  = rand(1, 10)
      const start = step * (rand(0, 8) + SEQ_SHOW + SEQ_ASK + 2)
      return { start, step }
    },
  },
  {
    id: 'seqB',
    icon: '🔢🔢',
    className: 'lv2',
    generate: () => {
      const step  = pick([10, 20, 30, 40, 50])
      const start = step * (rand(0, 10) + SEQ_SHOW + SEQ_ASK + 2)
      return { start, step }
    },
  },
  {
    id: 'seqC',
    icon: '🔢🔢🔢',
    className: 'lv3',
    generate: () => {
      const step     = pick([5, 10, 20, 30, 40, 50, 60, 70, 80, 90])
      const minStart = step * (SEQ_SHOW + SEQ_ASK + 1)
      const start    = minStart + step * rand(0, 8)
      return { start, step }
    },
  },
  {
    id: 'seqD',
    icon: '🔢🔢🔢🔢',
    className: 'lv4',
    generate: () => {
      const step  = pick([100, 200, 300, 400, 500])
      const start = step * (rand(0, 5) + SEQ_SHOW + SEQ_ASK + 1)
      return { start, step }
    },
  },
  {
    id: 'seqE',
    icon: '🔢',
    className: 'lv1',
    direction: 'asc',
    generate: () => ({
      step:  rand(1, 5),
      start: rand(1, 10),
    }),
  },
  {
    id: 'seqF',
    icon: '🔢🔢',
    className: 'lv2',
    direction: 'asc',
    generate: () => {
      const step  = pick([10, 20, 30])
      const start = step * rand(1, 5)
      return { start, step }
    },
  },
  {
    id: 'seqG',
    icon: '🔢🔢🔢',
    className: 'lv3',
    direction: 'asc',
    generate: () => ({
      step:  pick([15, 25]),
      start: rand(5, 24),
    }),
  },
]
