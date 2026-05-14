import type { Level } from '../types'

const genAdd1 = () => {
  if (Math.random() < 0.5) {
    const b = Math.floor(Math.random() * 5) + 5
    const a = 10 - b + Math.floor(Math.random() * b)
    return { a: Math.max(a, 1), b }
  }
  const a = Math.floor(Math.random() * 5) + 1
  const b = Math.floor(Math.random() * (9 - a)) + 1
  return { a, b }
}

const genAdd2 = () => {
  if (Math.random() < 0.5) {
    const units_a = Math.floor(Math.random() * 5) + 5
    const units_b = Math.floor(Math.random() * (10 - units_a)) + (10 - units_a)
    const a = 10 + units_a
    const b = Math.min(units_b, 9)
    return { a, b: Math.max(b, 1) }
  }
  const a = 10 + Math.floor(Math.random() * 9)
  const b = Math.floor(Math.random() * (9 - (a % 10))) + 1
  return { a, b: Math.max(b, 1) }
}

const genAdd3 = () => {
  const carry = Math.random() < 0.6
  if (carry) {
    const aU = Math.floor(Math.random() * 5) + 5
    const bU = Math.floor(Math.random() * 5) + 5
    const aT = Math.floor(Math.random() * 4) + 1
    const bT = Math.floor(Math.random() * 4) + 1
    return { a: aT * 10 + aU, b: bT * 10 + bU }
  }
  const a = Math.floor(Math.random() * 40) + 10
  const b = Math.floor(Math.random() * Math.min(9 - (a % 10), 40)) + 1
  return { a, b: Math.max(b, 1) }
}

const genAdd4 = () => {
  const a = Math.floor(Math.random() * 700) + 101
  const b = Math.floor(Math.random() * 700) + 100
  return { a: Math.min(a, 999), b: Math.min(b, 999) }
}

export const ADD_LEVELS: Level[] = [
  { id: 'a1', label: 'Taso 1', title: 'Pienet luvut',                desc: 'Esim. 7 + 8',    en: { label: 'Level 1', title: 'Small numbers',            desc: 'e.g. 7 + 8' },    icon: '⭐',      className: 'lv1', generate: genAdd1, mode: 'standard', op: 'add' },
  { id: 'a2', label: 'Taso 2', title: 'Kymmenet — vaakasuora',     desc: 'Esim. 15 + 9',   en: { label: 'Level 2', title: 'Tens — horizontal',        desc: 'e.g. 15 + 9' },   icon: '⭐⭐',    className: 'lv2', generate: genAdd2, mode: 'standard', op: 'add' },
  { id: 'a3', label: 'Taso 2', title: 'Kymmenet — allekkain',      desc: 'Esim. 15 + 9',   en: { label: 'Level 2', title: 'Tens — column',            desc: 'e.g. 15 + 9' },   icon: '⭐⭐',    className: 'lv2', generate: genAdd2, mode: 'column',   op: 'add' },
  { id: 'a4', label: 'Taso 3', title: 'Kaksinumeroiset — vaakasuora', desc: 'Esim. 34 + 27', en: { label: 'Level 3', title: 'Two digits — horizontal', desc: 'e.g. 34 + 27' }, icon: '⭐⭐⭐',  className: 'lv3', generate: genAdd3, mode: 'standard', op: 'add' },
  { id: 'a5', label: 'Taso 3', title: 'Kaksinumeroiset — allekkain',  desc: 'Esim. 34 + 27', en: { label: 'Level 3', title: 'Two digits — column',     desc: 'e.g. 34 + 27' }, icon: '⭐⭐⭐',  className: 'lv3', generate: genAdd3, mode: 'column',   op: 'add' },
  { id: 'a6', label: 'Taso 4', title: 'Kolminumeroiset — allekkain', desc: 'Esim. 234 + 167', en: { label: 'Level 4', title: 'Three digits — column', desc: 'e.g. 234 + 167' }, icon: '⭐⭐⭐⭐', className: 'lv4', generate: genAdd4, mode: 'column',   op: 'add' },
]
