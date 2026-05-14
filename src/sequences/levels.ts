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
  {
    id: 'seqE',
    label: 'Jono E',
    title: 'Kasvava — ykköset',
    desc: 'Esim. 3, 6, 9, …',
    en: { label: 'Series E', title: 'Ascending — ones', desc: 'e.g. 3, 6, 9, …' },
    icon: '🔢',
    className: 'lv1',
    direction: 'asc',
    generate: () => {
      const step  = Math.floor(Math.random() * 5) + 1
      const start = Math.floor(Math.random() * 10) + 1
      return { start, step }
    },
  },
  {
    id: 'seqF',
    label: 'Jono F',
    title: 'Kasvava — kymmenet',
    desc: 'Esim. 10, 30, 50, …',
    en: { label: 'Series F', title: 'Ascending — tens', desc: 'e.g. 10, 30, 50, …' },
    icon: '🔢🔢',
    className: 'lv2',
    direction: 'asc',
    generate: () => {
      const steps = [10, 20, 30]
      const step  = steps[Math.floor(Math.random() * steps.length)]
      const start = step * (Math.floor(Math.random() * 5) + 1)
      return { start, step }
    },
  },
  {
    id: 'seqG',
    label: 'Jono G',
    title: 'Kasvava — sekavaihe',
    desc: 'Esim. 5, 20, 35, …',
    en: { label: 'Series G', title: 'Ascending — mixed step', desc: 'e.g. 5, 20, 35, …' },
    icon: '🔢🔢🔢',
    className: 'lv3',
    direction: 'asc',
    generate: () => {
      const steps = [15, 25]
      const step  = steps[Math.floor(Math.random() * steps.length)]
      const start = Math.floor(Math.random() * 20) + 5
      return { start, step }
    },
  },
]
