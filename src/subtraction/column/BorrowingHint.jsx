import React, { useState, useMemo } from 'react'

const COL_NAMES = ['sadat', 'kymmenet', 'ykköset']

function simulateBorrow(aDigits, bDigits) {
  const n = aDigits.length
  const work = [...aDigits]
  const given = Array(n).fill(false)
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
        given[k] = true
        work[k] = work[k] + 10 - 1
      }
      received[i] = true
      work[i] += 10
    }
  }
  return { work, given, received }
}

function buildHintSteps(a, b) {
  const cols = String(a).length
  const aD = String(a).split('').map(Number)
  const bD = String(b).padStart(cols, '0').split('').map(Number)
  const { work, given, received } = simulateBorrow(aD, bD)
  const result = work.map((d, i) => d - bD[i])
  const colLabel = (i) => COL_NAMES[COL_NAMES.length - (cols - i)]

  const steps = []

  const unitsI = cols - 1
  if (aD[unitsI] < bD[unitsI]) {
    steps.push({ text: `Katsotaan ensin ykkösiä: ${aD[unitsI]} − ${bD[unitsI]}. Ei onnistu — ${aD[unitsI]} on pienempi kuin ${bD[unitsI]}!`, phase: 'look', revealedCols: [] })

    let j = unitsI - 1
    while (j >= 0 && aD[j] === 0) j--

    if (j >= 0 && j < unitsI - 1) {
      const chainCols = []
      for (let k = j; k <= unitsI; k++) chainCols.push(colLabel(k))
      steps.push({
        text: `${colLabel(unitsI - 1)} on 0, joten lainataan ${colLabel(j)}sta! ${aD[j]} → ${aD[j]-1}. Kymmenet saavat 10, mutta antavat heti ykköisille: kymmenet ${aD[j-j] ?? 0}+10−1 = ${work[j+1 < unitsI ? j+1 : j]}, ykköset ${aD[unitsI]}+10 = ${work[unitsI]}.`,
        phase: 'borrow', revealedCols: [],
      })
    } else {
      steps.push({
        text: `Lainataan yksi ${colLabel(unitsI-1)}sta! ${aD[unitsI-1]} → ${work[unitsI-1]}, ja ykköset saavat +10 → ${work[unitsI]}.`,
        phase: 'borrow', revealedCols: [],
      })
    }
  } else {
    steps.push({ text: `Katsotaan ensin ykkösiä: ${aD[unitsI]} − ${bD[unitsI]}. Onnistuu!`, phase: 'look', revealedCols: [] })
  }

  if (cols === 3 && aD[1] < bD[1] && !given[1]) {
    steps.push({
      text: `Katsotaan kymmeniä: ${work[1]} − ${bD[1]}. Ei onnistu! Lainataan sadoista: ${aD[0]} → ${work[0]}, kymmenet ${work[1]}+10 = ${work[1]+10 > 10 ? work[1] : work[1]+10}.`,
      phase: 'borrow2', revealedCols: [],
    })
  }

  const revealed = []
  for (let i = cols - 1; i >= 0; i--) {
    revealed.push(i)
    const resStr = result[i] !== undefined ? result[i] : ''
    if (bD[i] === 0 && result[i] !== undefined && i === 0) {
      steps.push({ text: `${colLabel(i)}: ${work[i]} − ${bD[i]} = ${result[i]}`, phase: `col${i}`, revealedCols: [...revealed], result })
    } else {
      steps.push({ text: `Lasketaan ${colLabel(i)}: ${work[i]} − ${bD[i]} = ${result[i]}`, phase: `col${i}`, revealedCols: [...revealed], result })
    }
  }

  steps.push({ text: `Vastaus on ${a - b}! 🎉`, phase: 'done', revealedCols: result.map((_, i) => i), result })

  return { steps, aD, bD, work, given, received, result, cols }
}

export default function BorrowingHint({ a, b }) {
  const [step, setStep] = useState(0)
  const { steps, aD, bD, work, given, received, result, cols } = useMemo(
    () => buildHintSteps(a, b),
    [a, b]
  )
  const cur = steps[Math.min(step, steps.length - 1)]
  const showAnnotations = ['borrow','borrow2','col0','col1','col2','done'].includes(cur.phase)
  const revealedSet = new Set(cur.revealedCols ?? [])

  return (
    <div className="hint-box">
      <div className="hint-title">💡 Katsotaan yhdessä!</div>

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
          const showCross = showAnnotations && given[i]
          const showPlus = showAnnotations && received[i]
          const resVal = cur.result?.[i]

          return (
            <div key={i} className="hint-col">
              <div className="hint-cell hint-cell-annotation">
                {showCross && <span className="borrow-cross">{aD[i]}</span>}
                {showPlus && !showCross && <span className="borrow-add">+10</span>}
                {showCross && showPlus && <span className="borrow-add" style={{fontSize:'0.8rem'}}>+10</span>}
              </div>
              <div className={`hint-cell hint-cell-num${isHighlighted ? ' hl-col' : ''}`}>
                {showAnnotations ? work[i] : aD[i]}
              </div>
              <div className="hint-cell hint-cell-num">{bD[i] !== 0 || i === cols-1 ? bD[i] : ''}</div>
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
        <button className="hint-next-btn" onClick={() => setStep((s) => s + 1)}>
          Seuraava vaihe →
        </button>
      ) : (
        <p className="hint-done">Hienosti! Nyt tiedät miten se tehdään! 🌟</p>
      )}
    </div>
  )
}
