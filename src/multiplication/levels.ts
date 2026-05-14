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
  { id: 'm1',  label: '1×',  title: 'Yhden kertotaulu',    desc: 'Esim. 1 × 7',   en: { label: '1×',   title: '1× table',          desc: 'e.g. 1 × 7' },   icon: '⭐',      className: 'lv1', generate: gen(1),   mode: 'standard', op: 'mul' },
  { id: 'm10', label: '10×', title: 'Kymmenen kertotaulu', desc: 'Esim. 10 × 7',  en: { label: '10×',  title: '10× table',         desc: 'e.g. 10 × 7' },  icon: '⭐',      className: 'lv1', generate: gen(10),  mode: 'standard', op: 'mul' },
  { id: 'm2',  label: '2×',  title: 'Kahden kertotaulu',   desc: 'Esim. 2 × 7',   en: { label: '2×',   title: '2× table',          desc: 'e.g. 2 × 7' },   icon: '⭐⭐',    className: 'lv2', generate: gen(2),   mode: 'standard', op: 'mul' },
  { id: 'm5',  label: '5×',  title: 'Viiden kertotaulu',   desc: 'Esim. 5 × 7',   en: { label: '5×',   title: '5× table',          desc: 'e.g. 5 × 7' },   icon: '⭐⭐',    className: 'lv2', generate: gen(5),   mode: 'standard', op: 'mul' },
  { id: 'm3',  label: '3×',  title: 'Kolmen kertotaulu',   desc: 'Esim. 3 × 7',   en: { label: '3×',   title: '3× table',          desc: 'e.g. 3 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(3),   mode: 'standard', op: 'mul' },
  { id: 'm4',  label: '4×',  title: 'Neljän kertotaulu',   desc: 'Esim. 4 × 7',   en: { label: '4×',   title: '4× table',          desc: 'e.g. 4 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(4),   mode: 'standard', op: 'mul' },
  { id: 'm6',  label: '6×',  title: 'Kuuden kertotaulu',   desc: 'Esim. 6 × 7',   en: { label: '6×',   title: '6× table',          desc: 'e.g. 6 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(6),   mode: 'standard', op: 'mul' },
  { id: 'm7',  label: '7×',  title: 'Seitsemän kertotaulu',desc: 'Esim. 7 × 7',   en: { label: '7×',   title: '7× table',          desc: 'e.g. 7 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(7),   mode: 'standard', op: 'mul' },
  { id: 'm8',  label: '8×',  title: 'Kahdeksan kertotaulu',desc: 'Esim. 8 × 7',   en: { label: '8×',   title: '8× table',          desc: 'e.g. 8 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(8),   mode: 'standard', op: 'mul' },
  { id: 'm9',  label: '9×',  title: 'Yhdeksän kertotaulu', desc: 'Esim. 9 × 7',   en: { label: '9×',   title: '9× table',          desc: 'e.g. 9 × 7' },   icon: '⭐⭐⭐',  className: 'lv3', generate: gen(9),   mode: 'standard', op: 'mul' },
  { id: 'mx',  label: 'Kaikki', title: 'Kaikki kertotaulut',desc: 'Esim. 7 × 8',  en: { label: 'Mixed', title: 'All times tables',  desc: 'e.g. 7 × 8' },   icon: '⭐⭐⭐',  className: 'lv3', generate: genMixed, mode: 'standard', op: 'mul' },
]
