const gen1 = () => {
  const b = Math.floor(Math.random() * 5) + 1
  const a = b + Math.floor(Math.random() * 5)
  return { a, b }
}

const gen2 = () => {
  const b = Math.floor(Math.random() * 9) + 1
  const a = 10 + Math.floor(Math.random() * 9)
  return { a, b: Math.min(b, a) }
}

const gen3 = () => {
  const b = Math.floor(Math.random() * 30) + 10
  const a = b + Math.floor(Math.random() * 30) + 1
  return { a, b }
}

const gen4 = () => {
  if (Math.random() < 0.4) {
    const hundreds = Math.floor(Math.random() * 8) + 2
    const units = Math.floor(Math.random() * 9) + 1
    const a = hundreds * 100 + units
    const b = Math.floor(Math.random() * 89) + 10
    return { a: Math.max(a, b + 1), b }
  }
  const a = Math.floor(Math.random() * 800) + 101
  const b = Math.min(Math.floor(Math.random() * (a - 1)) + 1, 999)
  return { a, b }
}

export const LEVELS = [
  {
    id: 1,
    label: 'Taso 1',
    title: 'Pienet luvut',
    desc: 'Esim. 5 − 4',
    icon: '⭐',
    className: 'lv1',
    generate: gen1,
    mode: 'standard',
  },
  {
    id: 2,
    label: 'Taso 2',
    title: 'Kymmenet — vaakasuora',
    desc: 'Esim. 15 − 9',
    icon: '⭐⭐',
    className: 'lv2',
    generate: gen2,
    mode: 'standard',
  },
  {
    id: 3,
    label: 'Taso 2',
    title: 'Kymmenet — allekkain',
    desc: 'Esim. 15 − 9',
    icon: '⭐⭐',
    className: 'lv2',
    generate: gen2,
    mode: 'column',
  },
  {
    id: 4,
    label: 'Taso 3',
    title: 'Kaksinumeroiset — vaakasuora',
    desc: 'Esim. 34 − 16',
    icon: '⭐⭐⭐',
    className: 'lv3',
    generate: gen3,
    mode: 'standard',
  },
  {
    id: 5,
    label: 'Taso 3',
    title: 'Kaksinumeroiset — allekkain',
    desc: 'Esim. 34 − 16',
    icon: '⭐⭐⭐',
    className: 'lv3',
    generate: gen3,
    mode: 'column',
  },
  {
    id: 6,
    label: 'Taso 4',
    title: 'Sadat — allekkain',
    desc: 'Esim. 205 − 39',
    icon: '⭐⭐⭐⭐',
    className: 'lv4',
    generate: gen4,
    mode: 'column',
  },
]
