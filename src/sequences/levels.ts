import type { SeqLevel } from '../types'

export const SEQ_SHOW = 3
export const SEQ_ASK  = 4

export const SEQ_LEVELS: SeqLevel[] = [
  {
    id: 'seqA',
    label: 'Jono A',
    title: 'Ykköset',
    desc: 'Esim. 20, 18, 16, …',
    en: { label: 'Series A', title: 'Ones', desc: 'e.g. 20, 18, 16, …' },
    icon: '🔢',
    className: 'lv1',
    generate: () => {
      const step  = Math.floor(Math.random() * 10) + 1
      const start = step * (Math.floor(Math.random() * 8) + SEQ_SHOW + SEQ_ASK + 2)
      return { start, step }
    },
  },
  {
    id: 'seqB',
    label: 'Jono B',
    title: 'Kymmenet',
    desc: 'Esim. 100, 90, 80, …',
    en: { label: 'Series B', title: 'Tens', desc: 'e.g. 100, 90, 80, …' },
    icon: '🔢🔢',
    className: 'lv2',
    generate: () => {
      const steps = [10, 20, 30, 40, 50]
      const step  = steps[Math.floor(Math.random() * steps.length)]
      const start = step * (Math.floor(Math.random() * 10) + SEQ_SHOW + SEQ_ASK + 2)
      return { start, step }
    },
  },
  {
    id: 'seqC',
    label: 'Jono C',
    title: 'Sadat — pienet askeleet',
    desc: 'Esim. 500, 470, 440, …',
    en: { label: 'Series C', title: 'Hundreds — small steps', desc: 'e.g. 500, 470, 440, …' },
    icon: '🔢🔢🔢',
    className: 'lv3',
    generate: () => {
      const steps = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90]
      const step  = steps[Math.floor(Math.random() * steps.length)]
      const minStart = step * (SEQ_SHOW + SEQ_ASK + 1)
      const start = minStart + step * Math.floor(Math.random() * 8)
      return { start, step }
    },
  },
  {
    id: 'seqD',
    label: 'Jono D',
    title: 'Sadat — isot askeleet',
    desc: 'Esim. 900, 700, 500, …',
    en: { label: 'Series D', title: 'Hundreds — large steps', desc: 'e.g. 900, 700, 500, …' },
    icon: '🔢🔢🔢🔢',
    className: 'lv4',
    generate: () => {
      const steps = [100, 200, 300, 400, 500]
      const step  = steps[Math.floor(Math.random() * steps.length)]
      const start = step * (Math.floor(Math.random() * 5) + SEQ_SHOW + SEQ_ASK + 1)
      return { start, step }
    },
  },
]
