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
  label: string
  title: string
  desc: string
  en?: { label: string; title: string; desc: string }
  icon: string
  className: string
  op: MeasurementOp
  generate: (index: number) => MeasureQuestion
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const MEASURE_LEVELS: MeasureLevel[] = [
  {
    id: 'cm_mm',
    label: 'cm ↔ mm',
    title: 'Senttimetrit ja millimetrit',
    desc: 'Muunna cm millimetreiksi tai millimetrit senttimetreiksi',
    en: { label: 'cm ↔ mm', title: 'Centimetres and millimetres', desc: 'Convert cm to mm or mm to cm' },
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
    label: 'm ↔ cm',
    title: 'Metrit ja senttimetrit',
    desc: 'Muunna tasaset cm metreiksi tai metrit senttimetreiksi',
    en: { label: 'm ↔ cm', title: 'Metres and centimetres', desc: 'Convert whole cm to m or m to cm' },
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
    label: 'cm → m + cm',
    title: 'Senttimetrit metreiksi ja senttimetreiksi',
    desc: 'Muunna cm metreiksi ja senttimetreiksi (esim. 130 cm = 1 m 30 cm)',
    en: { label: 'cm → m + cm', title: 'Centimetres to m and cm', desc: 'Convert cm to metres and cm remainder (e.g. 130 cm = 1 m 30 cm)' },
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
    label: 'mm → cm + mm',
    title: 'Millimetrit senttimetreiksi ja millimetreiksi',
    desc: 'Muunna mm senttimetreiksi ja millimetreiksi (esim. 25 mm = 2 cm 5 mm)',
    en: { label: 'mm → cm + mm', title: 'Millimetres to cm and mm', desc: 'Convert mm to cm and mm remainder (e.g. 25 mm = 2 cm 5 mm)' },
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
    label: 'km ↔ m',
    title: 'Kilometrit ja metrit',
    desc: 'Muunna km metreiksi tai metrit kilometreiksi',
    en: { label: 'km ↔ m', title: 'Kilometres and metres', desc: 'Convert km to m or m to km' },
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
    label: 'm → km + m',
    title: 'Metrit kilometreiksi ja metreiksi',
    desc: 'Muunna metrit kilometreiksi ja metreiksi (esim. 1500 m = 1 km 500 m)',
    en: { label: 'm → km + m', title: 'Metres to km and m', desc: 'Convert metres to km and m remainder (e.g. 1500 m = 1 km 500 m)' },
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
    label: 'l ↔ dl',
    title: 'Litrat ja desilitrat',
    desc: 'Muunna litrat desilitroiksi tai desilitrat litroiksi',
    en: { label: 'l ↔ dl', title: 'Litres and decilitres', desc: 'Convert l to dl or dl to l' },
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
    id: 'dl_to_l_dl',
    label: 'dl → l + dl',
    title: 'Desilitrat litroiksi ja desilitroiksi',
    desc: 'Muunna dl litroiksi ja desilitroiksi (esim. 15 dl = 1 l 5 dl)',
    en: { label: 'dl → l + dl', title: 'Decilitres to l and dl', desc: 'Convert dl to litres and dl remainder (e.g. 15 dl = 1 l 5 dl)' },
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
