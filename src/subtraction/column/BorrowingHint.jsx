import React, { useState, useMemo } from 'react'
import { useLang } from '../../i18n'
import i18n from './BorrowingHint.i18n'

function simulateBorrow(aDigits, bDigits) {
  const n    = aDigits.length
  const work = [...aDigits]
  const given    = Array(n).fill(false)
  const received = Array(n).fill(false)

  for (let i = n - 1; i >= 0; i--) {
    if (work[i] < bDigits[i]) {
      let j = i - 1
      while (j >= 0 && work[j] === 0) j--
      if (j < 0) continue
      work[j] -= 1
      given[j] = true
      for (let k = j + 1; k < i; k++) {
        received[k] = true
        given[k]    = true
        work[k]     = work[k] + 10 - 1
      }
      received[i] = true
      work[i] += 10
    }
  }
  return { work, given, received }
}

function buildHintSteps(a, b, s) {
  const cols = String(a).length
  const aD   = String(a).split('').map(Number)
  const bD   = String(b).padStart(cols, '0').split('').map(Number)
  const { work, given, received } = simulateBorrow(aD, bD)
  const result    = work.map((d, i) => d - bD[i])
  const colLabel  = (i) => [s.col.hundreds, s.col.tens, s.col.ones][3 - (cols - i)] ?? ''

  const steps  = []
  const unitsI = cols - 1

  if (aD[unitsI] < bD[unitsI]) {
    steps.push({ text: s.lookFail(colLabel(unitsI), aD[unitsI], bD[unitsI]), phase: 'look',   revealedCols: [] })

    let j = unitsI - 1
    while (j >= 0 && aD[j] === 0) j--

    if (j >= 0 && j < unitsI - 1) {
      steps.push({
        text: s.borrowChain(colLabel(unitsI - 1), colLabel(j), aD[j], aD[j] - 1, work[unitsI - 1], work[unitsI]),
        phase: 'borrow', revealedCols: [],
      })
    } else {
      steps.push({
        text: s.borrow(colLabel(unitsI), colLabel(unitsI - 1), aD[unitsI - 1], work[unitsI - 1], work[unitsI]),
        phase: 'borrow', revealedCols: [],
      })
    }
  } else {
    steps.push({ text: s.lookOk(colLabel(unitsI), aD[unitsI], bD[unitsI]), phase: 'look', revealedCols: [] })
  }

  if (cols === 3 && aD[1] < bD[1] && !given[1]) {
    steps.push({
      text: s.borrow(colLabel(1), colLabel(0), aD[0], work[0], work[1] + 10),
      phase: 'borrow2', revealedCols: [],
    })
  }

  const revealed = []
  for (let i = cols - 1; i >= 0; i--) {
    revealed.push(i)
    steps.push({
      text: (bD[i] === 0 && i === 0)
        ? s.calcColSimple(colLabel(i), work[i], bD[i], result[i])
        : s.calcCol(colLabel(i), work[i], bD[i], result[i]),
      phase: `col${i}`,
      revealedCols: [...revealed],
      result,
    })
  }

  steps.push({ text: s.answer(a - b), phase: 'done', revealedCols: result.map((_, i) => i), result })

  return { steps, aD, bD, work, given, received, result, cols }
}

export default function BorrowingHint({ a, b }) {
  const lang = useLang()
  const s    = i18n[lang] ?? i18n.fi

  const [step, setStep] = useState(0)
  const { steps, aD, bD, work, given, received, result, cols } = useMemo(
    () => buildHintSteps(a, b, s),
    [a, b, lang]
  )

  const cur             = steps[Math.min(step, steps.length - 1)]
  const showAnnotations = ['borrow', 'borrow2', 'col0', 'col1', 'col2', 'done'].includes(cur.phase)
  const revealedSet     = new Set(cur.revealedCols ?? [])

  return (
    <div className="hint-box">
      <div className="hint-title">{s.title}</div>

      <div className="hint-visual">
        <div className="hint-col">
          <div className="hint-cell hint-cell-annotation" />
          <div className="hint-cell hint-cell-sign" />
          <div className="hint-cell hint-cell-sign">−</div>
          <div className="hint-cell hint-separator" />
          <div className="hint-cell hint-cell-result" />
        </div>

        {Array.from({ length: cols }, (_, i) => {
          const isHighlighted = revealedSet.has(i) && cur.phase !== 'done'
          const showCross     = showAnnotations && given[i]
          const showPlus      = showAnnotations && received[i]
          const resVal        = cur.result?.[i]

          return (
            <div key={i} className="hint-col">
              <div className="hint-cell hint-cell-annotation">
                {showCross && <span className="borrow-cross">{aD[i]}</span>}
                {showPlus && !showCross && <span className="borrow-add">+10</span>}
                {showCross && showPlus  && <span className="borrow-add" style={{ fontSize: '0.8rem' }}>+10</span>}
              </div>
              <div className={`hint-cell hint-cell-num${isHighlighted ? ' hl-col' : ''}`}>
                {showAnnotations ? work[i] : aD[i]}
              </div>
              <div className="hint-cell hint-cell-num">{bD[i] !== 0 || i === cols - 1 ? bD[i] : ''}</div>
              <div className="hint-cell hint-separator" />
              <div className="hint-cell hint-cell-result">
                {revealedSet.has(i) ? resVal : ''}
              </div>
            </div>
          )
        })}
      </div>

      <p className="hint-text">{cur.text}</p>

      {step < steps.length - 1 ? (
        <button className="hint-next-btn" onClick={() => setStep((n) => n + 1)}>
          {s.nextStep}
        </button>
      ) : (
        <p className="hint-done">{s.done}</p>
      )}
    </div>
  )
}
