import { LEVELS } from './subtraction/levels'
import { ADD_LEVELS } from './addition/levels'
import { SEQ_LEVELS } from './sequences/levels'
import { MUL_LEVELS } from './multiplication/levels'
import { MEASURE_LEVELS } from './measurements/levels'
import { ARITH_LEVELS } from './measurements/arithmeticLevels'
import { VOLUME_LEVELS } from './measurements/volumeLevels'
import { MISSING_LEVELS } from './measurements/missingLevels'
import type { Level, SeqLevel, LevelLocale } from './types'
import type { MeasureLevel } from './measurements/levels'
import type { ArithLevel } from './measurements/arithmeticLevels'
import type { VolumeLevel } from './measurements/volumeLevels'
import type { MissingLevel } from './measurements/missingLevels'

type Category = 'add' | 'sub' | 'seq' | 'mul' | 'measure'

interface Enrichment {
  category: Category
  categoryIcon: string
  stars: number
}

export type EnrichedLevel        = Level        & Enrichment
export type EnrichedSeqLevel     = SeqLevel     & Enrichment
export type EnrichedMeasureLevel = MeasureLevel & Enrichment
export type EnrichedArithLevel   = ArithLevel   & Enrichment
export type EnrichedVolumeLevel  = VolumeLevel  & Enrichment
export type EnrichedMissingLevel = MissingLevel & Enrichment
export type AnyEnrichedLevel     = EnrichedLevel | EnrichedSeqLevel | EnrichedMeasureLevel | EnrichedArithLevel | EnrichedVolumeLevel | EnrichedMissingLevel

function countStars(icon: string): number {
  return [...icon].filter((c) => c === '⭐' || c === '🔢').length
}

export const ALL_LEVELS: AnyEnrichedLevel[] = [
  ...LEVELS.map((l)         => ({ ...l, category: 'sub'     as const, categoryIcon: '➖', stars: countStars(l.icon) })),
  ...ADD_LEVELS.map((l)     => ({ ...l, category: 'add'     as const, categoryIcon: '➕', stars: countStars(l.icon) })),
  ...MUL_LEVELS.map((l)     => ({ ...l, category: 'mul'     as const, categoryIcon: '✖️', stars: countStars(l.icon) })),
  ...SEQ_LEVELS.map((l)     => ({ ...l, category: 'seq'     as const, categoryIcon: '🔢', stars: countStars(l.icon) })),
  ...MEASURE_LEVELS.map((l) => ({ ...l, category: 'measure' as const, categoryIcon: '📏', stars: countStars(l.icon) })),
  ...ARITH_LEVELS.map((l)   => ({ ...l, category: 'measure' as const, categoryIcon: '📏', stars: countStars(l.icon) })),
  ...VOLUME_LEVELS.map((l)   => ({ ...l, category: 'measure' as const, categoryIcon: '📏', stars: countStars(l.icon) })),
  ...MISSING_LEVELS.map((l)  => ({ ...l, category: 'measure' as const, categoryIcon: '📏', stars: countStars(l.icon) })),
]

export type { LevelLocale }
