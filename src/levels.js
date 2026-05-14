import { LEVELS } from './subtraction/levels'
import { ADD_LEVELS } from './addition/levels'
import { SEQ_LEVELS } from './sequences/levels'

function countStars(icon) {
  return [...icon].filter((c) => c === '⭐' || c === '🔢').length
}

export const ALL_LEVELS = [
  ...LEVELS.map((l) => ({
    ...l,
    category: 'sub',
    categoryLabel: 'Vähennyslaskut',
    categoryIcon: '➖',
    stars: countStars(l.icon),
  })),
  ...ADD_LEVELS.map((l) => ({
    ...l,
    category: 'add',
    categoryLabel: 'Yhteenlaskut',
    categoryIcon: '➕',
    stars: countStars(l.icon),
  })),
  ...SEQ_LEVELS.map((l) => ({
    ...l,
    category: 'seq',
    categoryLabel: 'Lukujonot',
    categoryIcon: '🔢',
    stars: countStars(l.icon),
  })),
]
