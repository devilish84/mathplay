import { LEVELS } from './subtraction/levels'
import { ADD_LEVELS } from './addition/levels'
import { SEQ_LEVELS } from './sequences/levels'
import { MUL_LEVELS } from './multiplication/levels'
import type { Level, SeqLevel, LevelLocale } from './types'

type Category = 'add' | 'sub' | 'seq' | 'mul'

interface Enrichment {
  category: Category
  categoryIcon: string
  stars: number
}

export type EnrichedLevel    = Level    & Enrichment
export type EnrichedSeqLevel = SeqLevel & Enrichment
export type AnyEnrichedLevel = EnrichedLevel | EnrichedSeqLevel

function countStars(icon: string): number {
  return [...icon].filter((c) => c === '⭐' || c === '🔢').length
}

export const ALL_LEVELS: AnyEnrichedLevel[] = [
  ...LEVELS.map((l)     => ({ ...l, category: 'sub' as const, categoryIcon: '➖', stars: countStars(l.icon) })),
  ...ADD_LEVELS.map((l)  => ({ ...l, category: 'add' as const, categoryIcon: '➕', stars: countStars(l.icon) })),
  ...MUL_LEVELS.map((l)  => ({ ...l, category: 'mul' as const, categoryIcon: '✖️', stars: countStars(l.icon) })),
  ...SEQ_LEVELS.map((l)  => ({ ...l, category: 'seq' as const, categoryIcon: '🔢', stars: countStars(l.icon) })),
]

export type { LevelLocale }
