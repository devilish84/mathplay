import React, { useState } from 'react'

export default function AdditionHint({ a, b }) {
  const [step, setStep] = useState(0)

  const answer  = a + b
  const ansStr  = String(answer)
  const ansCols = ansStr.length
  const aDigits = String(a).split('').map(Number)
  const bDigits = String(b).split('').map(Number)
  const padLeft = (arr, n) => Array(n - arr.length).fill(null).concat(arr)
  const aCols = padLeft(aDigits, ansCols)
  const bCols = padLeft(bDigits, ansCols)
  const colNames = ['sadat', 'kymmenet', 'ykköset']
  const getLabel = (i) => colNames[3 - ansCols + i] ?? ''

  const sums = []
  const carries = []
  const effSums = []
  let carry = 0
  for (let i = ansCols - 1; i >= 0; i--) {
    const rawSum = (aCols[i] ?? 0) + (bCols[i] ?? 0) + carry
    effSums[i] = rawSum
    sums[i]    = rawSum % 10
    carry      = Math.floor(rawSum / 10)
    carries[i] = carry
  }

  const steps = []
  for (let i = ansCols - 1; i >= 0; i--) {
    const carryIn  = i < ansCols - 1 ? carries[i + 1] : 0
    const carryOut = carries[i]
    const aVal = aCols[i] ?? 0
    const bVal = bCols[i] ?? 0
    const name = getLabel(i)

    if (carryIn) {
      steps.push({
        col: i,
        text: `Lasketaan ${name}: ${aVal} + ${bVal} + 1 (muistinumero) = ${effSums[i]}${carryOut ? ` → kirjoitetaan ${sums[i]}, muistinumero 1 seuraavaan` : ''}`,
        result: Array(ansCols).fill(null).map((_, j) => j > i ? sums[j] : null),
        carryOut,
      })
    } else {
      steps.push({
        col: i,
        text: `Lasketaan ${name}: ${aVal} + ${bVal} = ${effSums[i]}${carryOut ? ` → kirjoitetaan ${sums[i]}, muistinumero 1 seuraavaan` : ''}`,
        result: Array(ansCols).fill(null).map((_, j) => j > i ? sums[j] : null),
        carryOut,
      })
    }
  }
  steps.push({ col: -1, text: `Vastaus on ${answer}! 🎉`, result: sums, done: true })

  const cur = steps[Math.min(step, steps.length - 1)]

  return (
    <div className="hint-box">
      <div className="hint-title">💡 Katsotaan yhdessä!</div>
      <div className="hint-visual">
        <div className="hint-col">
          <div className="hint-cell hint-cell-annotation" />
          <div className="hint-cell hint-cell-sign" />
          <div className="hint-cell hint-cell-sign add-sign">+</div>
          <div className="hint-cell hint-separator" />
          <div className="hint-cell hint-cell-result" />
        </div>
        {Array.from({ length: ansCols }, (_, i) => {
          const isActive = cur.col === i
          const carryIn  = i < ansCols - 1 ? carries[i + 1] : 0
          const showCarryIn = carryIn && step > steps.findIndex(s => s.col === i + 1)
          const resVal = cur.result?.[i]
          return (
            <div key={i} className="hint-col">
              <div className="hint-cell hint-cell-annotation">
                {showCarryIn && <span className="borrow-add">+1</span>}
              </div>
              <div className={`hint-cell hint-cell-num${isActive ? ' hl-col' : ''}`}>
                {aCols[i] ?? ''}
              </div>
              <div className={`hint-cell hint-cell-num${isActive ? ' hl-col' : ''}`}>
                {bCols[i] ?? ''}
              </div>
              <div className="hint-cell hint-separator" />
              <div className="hint-cell hint-cell-result">
                {resVal !== null && resVal !== undefined ? resVal : ''}
              </div>
            </div>
          )
        })}
      </div>
      <p className="hint-text">{cur.text}</p>
      {step < steps.length - 1 ? (
        <button className="hint-next-btn" onClick={() => setStep(s => s + 1)}>
          Seuraava vaihe →
        </button>
      ) : (
        <p className="hint-done">Hienosti! Nyt tiedät miten se tehdään! 🌟</p>
      )}
    </div>
  )
}
