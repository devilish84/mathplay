export type MeasurementOp =
  | 'cm_to_mm'
  | 'mm_to_cm'
  | 'mm_to_cm_mm'
  | 'km_to_m'
  | 'm_to_km'
  | 'm_to_km_m'

export interface MeasureQuestion {
  input: number
  inputUnit: string
  wholeAns: number
  wholeUnit: string
  remAns?: number
  remUnit?: string
  wideInput?: boolean   // true when answer can be 4+ digits
}

export interface MeasureLevel {
  id: string
  icon: string
  className: string
  op: MeasurementOp
  generate: (index: number) => MeasureQuestion
}

import { rand } from '../rng'

export const MEASURE_LEVELS: MeasureLevel[] = [
  {
    id: 'cm_mm',
    icon: '⭐',
    className: 'level-green',
    op: 'cm_to_mm',
    generate(index: number) {
      const cm = rand(1, 50)
      return index % 2 === 0
        ? { input: cm,      inputUnit: 'cm', wholeAns: cm * 10, wholeUnit: 'mm', wideInput: cm >= 10 }
        : { input: cm * 10, inputUnit: 'mm', wholeAns: cm,      wholeUnit: 'cm', wideInput: false }
    },
  },
  {
    id: 'm_cm',
    icon: '⭐',
    className: 'level-green',
    op: 'km_to_m',
    generate(index: number) {
      const m = rand(1, 7)
      return index % 2 === 0
        ? { input: m,       inputUnit: 'm',  wholeAns: m * 100, wholeUnit: 'cm', wideInput: true }
        : { input: m * 100, inputUnit: 'cm', wholeAns: m,       wholeUnit: 'm',  wideInput: false }
    },
  },
  {
    id: 'cm_to_m_cm',
    icon: '⭐⭐',
    className: 'level-blue',
    op: 'm_to_km_m',
    generate(_index: number) {
      const cm = rand(101, 700)
      const m   = Math.floor(cm / 100)
      const rem = cm % 100
      return { input: cm, inputUnit: 'cm', wholeAns: m, wholeUnit: 'm', remAns: rem, remUnit: 'cm', wideInput: false }
    },
  },
  {
    id: 'mm_to_cm_mm',
    icon: '⭐⭐',
    className: 'level-blue',
    op: 'mm_to_cm_mm',
    generate(_index: number) {
      const mm = rand(1, 500)
      const cm = Math.floor(mm / 10)
      const rem = mm % 10
      return { input: mm, inputUnit: 'mm', wholeAns: cm, wholeUnit: 'cm', remAns: rem, remUnit: 'mm' }
    },
  },
  {
    id: 'km_m',
    icon: '⭐',
    className: 'level-green',
    op: 'km_to_m',
    generate(index: number) {
      const km = rand(1, 5)
      return index % 2 === 0
        ? { input: km,        inputUnit: 'km', wholeAns: km * 1000, wholeUnit: 'm',  wideInput: true }
        : { input: km * 1000, inputUnit: 'm',  wholeAns: km,        wholeUnit: 'km', wideInput: false }
    },
  },
  {
    id: 'm_to_km_m',
    icon: '⭐⭐',
    className: 'level-blue',
    op: 'm_to_km_m',
    generate() {
      const m = rand(1001, 5500)
      const km = Math.floor(m / 1000)
      const rem = m % 1000
      return { input: m, inputUnit: 'm', wholeAns: km, wholeUnit: 'km', remAns: rem, remUnit: 'm' }
    },
  },
  {
    id: 'l_dl',
    icon: '⭐',
    className: 'level-green',
    op: 'km_to_m',
    generate(index: number) {
      const l = rand(1, 10)
      return index % 2 === 0
        ? { input: l,      inputUnit: 'l',  wholeAns: l * 10, wholeUnit: 'dl', wideInput: false }
        : { input: l * 10, inputUnit: 'dl', wholeAns: l,      wholeUnit: 'l',  wideInput: false }
    },
  },
  {
    id: 'mix_simple',
    icon: '⭐⭐',
    className: 'level-blue',
    op: 'km_to_m',
    generate(index: number) {
      const forward = index % 2 === 0
      const type    = Math.floor(Math.random() * 4)
      if (type === 0) {
        const cm = rand(1, 50)
        return forward
          ? { input: cm,      inputUnit: 'cm', wholeAns: cm * 10, wholeUnit: 'mm', wideInput: cm >= 10 }
          : { input: cm * 10, inputUnit: 'mm', wholeAns: cm,      wholeUnit: 'cm', wideInput: false }
      }
      if (type === 1) {
        const m = rand(1, 7)
        return forward
          ? { input: m,       inputUnit: 'm',  wholeAns: m * 100, wholeUnit: 'cm', wideInput: true }
          : { input: m * 100, inputUnit: 'cm', wholeAns: m,       wholeUnit: 'm',  wideInput: false }
      }
      if (type === 2) {
        const km = rand(1, 5)
        return forward
          ? { input: km,        inputUnit: 'km', wholeAns: km * 1000, wholeUnit: 'm',  wideInput: true }
          : { input: km * 1000, inputUnit: 'm',  wholeAns: km,        wholeUnit: 'km', wideInput: false }
      }
      const l = rand(1, 10)
      return forward
        ? { input: l,      inputUnit: 'l',  wholeAns: l * 10, wholeUnit: 'dl', wideInput: false }
        : { input: l * 10, inputUnit: 'dl', wholeAns: l,      wholeUnit: 'l',  wideInput: false }
    },
  },
  {
    id: 'dl_to_l_dl',
    icon: '⭐⭐',
    className: 'level-blue',
    op: 'm_to_km_m',
    generate() {
      const dl = rand(1, 100)
      const l   = Math.floor(dl / 10)
      const rem = dl % 10
      return { input: dl, inputUnit: 'dl', wholeAns: l, wholeUnit: 'l', remAns: rem, remUnit: 'dl' }
    },
  },
]
