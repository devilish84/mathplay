import type { Level } from '../types'

const gen = (table: number) => () => ({
  a: table,
  b: Math.floor(Math.random() * 10) + 1,
})

const genMixed = () => {
  const table = Math.floor(Math.random() * 10) + 1
  return { a: table, b: Math.floor(Math.random() * 10) + 1 }
}

export const MUL_LEVELS: Level[] = [
  { id: 'm1',  label: 'Taulu 1',  title: '1 × ?',        desc: 'Esim. 1 × 7',   en: { label: 'Table 1',  title: '1 × ?',        desc: 'e.g. 1 × 7' },   icon: '⭐',      className: 'lv1', generate: gen(1),  mode: 'standard', op: 'mul' },
  { id: 'm10', label: 'Taulu 10', title: '10 × ?',       desc: 'Esim. 10 × 7',  en: { label: 'Table 10', title: '10 × ?',       desc: 'e.g. 10 × 7' },  icon: '⭐',      className: 'lv1', generate: gen(10), mode: 'standard', op: 'mul' },
  { id: 'm2',  label: 'Taulu 2',  title: '2 × ?',        desc: 'Esim. 2 × 7',   en: { label: 'Table 2',  title: '2 × ?',        desc: 'e.g. 2 × 7' },   icon: '⭐⭐',    className: 'lv2', generate: gen(2),  mode: 'standard', op: 'mul' },
  { id: 'm5',  label: 'Taulu 5',  title: '5 × ?',        desc: 'Esim. 5 × 7',   en: { label: 'Table 5',  title: '5 × ?',        desc: 'e.g. 5 × 7' },   icon: '⭐⭐',    className: 'lv2', generate: gen(5),  mode: 'standard', op: 'mul' },
  { id: 'm3',  label: 'Taulu 3',  title: '3 × ?',        desc: 'Esim. 3 × 7',   en: { label: 'Table 3',  title: '3 × ?',        desc: 'e.g. 3 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(3),  mode: 'standard', op: 'mul' },
  { id: 'm4',  label: 'Taulu 4',  title: '4 × ?',        desc: 'Esim. 4 × 7',   en: { label: 'Table 4',  title: '4 × ?',        desc: 'e.g. 4 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(4),  mode: 'standard', op: 'mul' },
  { id: 'm6',  label: 'Taulu 6',  title: '6 × ?',        desc: 'Esim. 6 × 7',   en: { label: 'Table 6',  title: '6 × ?',        desc: 'e.g. 6 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(6),  mode: 'standard', op: 'mul' },
  { id: 'm7',  label: 'Taulu 7',  title: '7 × ?',        desc: 'Esim. 7 × 7',   en: { label: 'Table 7',  title: '7 × ?',        desc: 'e.g. 7 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(7),  mode: 'standard', op: 'mul' },
  { id: 'm8',  label: 'Taulu 8',  title: '8 × ?',        desc: 'Esim. 8 × 7',   en: { label: 'Table 8',  title: '8 × ?',        desc: 'e.g. 8 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(8),  mode: 'standard', op: 'mul' },
  { id: 'm9',  label: 'Taulu 9',  title: '9 × ?',        desc: 'Esim. 9 × 7',   en: { label: 'Table 9',  title: '9 × ?',        desc: 'e.g. 9 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(9),  mode: 'standard', op: 'mul' },
  { id: 'mx',  label: 'Sekoitus', title: 'Kaikki taulut', desc: 'Esim. 7 × 8',  en: { label: 'Mixed',    title: 'All tables',   desc: 'e.g. 7 × 8' },   icon: '⭐⭐⭐',  className: 'lv3', generate: genMixed, mode: 'standard', op: 'mul' },
]
