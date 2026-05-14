import { useState } from 'react'
import { useLang } from '../../i18n'
import i18n, { type AdditionHintStrings } from './AdditionHint.i18n'

interface Props { a: number; b: number }

export default function AdditionHint({ a, b }: Props) {
  const lang = useLang()
  const s: AdditionHintStrings = i18n[lang] ?? i18n.fi

  const [step, setStep] = useState(0)

  const answer  = a + b
  const ansStr  = String(answer)
  const ansCols = ansStr.length
  const aDigits = String(a).split('').map(Number)
  const bDigits = String(b).split('').map(Number)
  const padLeft = (arr: number[], n: number): (number | null)[] =>
    Array<number | null>(n - arr.length).fill(null).concat(arr)
  const aCols   = padLeft(aDigits, ansCols)
  const bCols   = padLeft(bDigits, ansCols)
  const getLabel = (i: number) => [s.col.hundreds, s.col.tens, s.col.ones][3 - ansCols + i] ?? ''

  const sums:    number[] = []
  const carries: number[] = []
  const effSums: number[] = []
  let carry = 0
  for (let i = ansCols - 1; i >= 0; i--) {
    const rawSum = (aCols[i] ?? 0) + (bCols[i] ?? 0) + carry
    effSums[i] = rawSum
    sums[i]    = rawSum % 10
    carry      = Math.floor(rawSum / 10)
    carries[i] = carry
  }

  interface Step { col: number; text: string; result: (number | null)[]; carryOut?: number; done?: boolean }
  const steps: Step[] = []

  for (let i = ansCols - 1; i >= 0; i--) {
    const carryIn  = i < ansCols - 1 ? carries[i + 1] : 0
    const carryOut = carries[i]
    const aVal = aCols[i] ?? 0
    const bVal = bCols[i] ?? 0
    const name = getLabel(i)
    const base = carryIn ? s.calcCarryIn(name, aVal, bVal, effSums[i]) : s.calc(name, aVal, bVal, effSums[i])
    const text = carryOut ? s.withCarryOut(base, sums[i]) : base
    steps.push({ col: i, text, result: Array(ansCols).fill(null).map((_: null, j: number) => j > i ? sums[j] : null), carryOut })
  }
  steps.push({ col: -1, text: s.answer(answer), result: sums, done: true })

  const cur = steps[Math.min(step, steps.length - 1)]

  return (
    <div className="hint-box">
      <div className="hint-title">{s.title}</div>
      <div className="hint-visual">
        <div className="hint-col">
          <div className="hint-cell hint-cell-annotation" />
          <div className="hint-cell hint-cell-sign" />
          <div className="hint-cell hint-cell-sign add-sign">+</div>
          <div className="hint-cell hint-separator" />
          <div className="hint-cell hint-cell-result" />
        </div>
        {Array.from({ length: ansCols }, (_, i) => {
          const isActive    = cur.col === i
          const carryIn     = i < ansCols - 1 ? carries[i + 1] : 0
          const showCarryIn = carryIn && step > steps.findIndex((st) => st.col === i + 1)
          const resVal      = cur.result?.[i]
          return (
            <div key={i} className="hint-col">
              <div className="hint-cell hint-cell-annotation">
                {showCarryIn && <span className="borrow-add">+1</span>}
              </div>
              <div className={`hint-cell hint-cell-num${isActive ? ' hl-col' : ''}`}>{aCols[i] ?? ''}</div>
              <div className={`hint-cell hint-cell-num${isActive ? ' hl-col' : ''}`}>{bCols[i] ?? ''}</div>
              <div className="hint-cell hint-separator" />
              <div className="hint-cell hint-cell-result">{resVal !== null && resVal !== undefined ? resVal : ''}</div>
            </div>
          )
        })}
      </div>
      <p className="hint-text">{cur.text}</p>
      {step < steps.length - 1 ? (
        <button className="hint-next-btn" onClick={() => setStep((n) => n + 1)}>{s.nextStep}</button>
      ) : (
        <p className="hint-done">{s.done}</p>
      )}
    </div>
  )
}
