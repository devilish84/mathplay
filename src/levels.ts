import { LEVELS } from './subtraction/levels'
import { ADD_LEVELS } from './addition/levels'
import { SEQ_LEVELS } from './sequences/levels'
import type { Level, SeqLevel, LevelLocale } from './types'

type Category = 'add' | 'sub' | 'seq'

interface Enrichment {
  category: Category
  categoryLabel: string
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
  ...LEVELS.map((l)    => ({ ...l, category: 'sub' as const, categoryLabel: 'Vähennyslaskut', categoryIcon: '➖', stars: countStars(l.icon) })),
  ...ADD_LEVELS.map((l) => ({ ...l, category: 'add' as const, categoryLabel: 'Yhteenlaskut',   categoryIcon: '➕', stars: countStars(l.icon) })),
  ...SEQ_LEVELS.map((l) => ({ ...l, category: 'seq' as const, categoryLabel: 'Lukujonot',      categoryIcon: '🔢', stars: countStars(l.icon) })),
]

export type { LevelLocale }
