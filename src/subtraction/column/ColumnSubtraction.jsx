import React, { useState, useEffect, useRef } from 'react'
import BorrowingHint from './BorrowingHint'

export default function ColumnSubtraction({ a, b, onCorrect, onWrong }) {
  const answer = a - b
  const ansStr = String(answer)
  const aDigits = String(a).split('').map(Number)
  const bDigits = String(b).split('').map(Number)
  const cols = Math.max(aDigits.length, bDigits.length, ansStr.length)

  const padLeft = (arr) => Array(cols - arr.length).fill(null).concat(arr)
  const aCols = padLeft(aDigits)
  const bCols = padLeft(bDigits)

  const [borrows, setBorrows] = useState(Array(cols).fill(false))
  const [digits, setDigits] = useState(Array(ansStr.length).fill(''))
  const [checked, setChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    setDigits(Array(ansStr.length).fill(''))
    setBorrows(Array(cols).fill(false))
    setChecked(false)
    setShowHint(false)
    setTimeout(() => inputRefs.current[ansStr.length - 1]?.focus(), 50)
  }, [a, b])

  const toggleBorrow = (colIdx) => {
    if (checked) return
    if (aCols[colIdx] === null || aCols[colIdx] === 0) return
    setBorrows((prev) => {
      const next = [...prev]
      next[colIdx] = !next[colIdx]
      return next
    })
  }

  const effectiveA = aCols.map((d, i) => {
    if (d === null) return null
    let val = d
    if (borrows[i]) val -= 1
    if (i > 0 && borrows[i - 1]) val += 10
    return val
  })

  const handleDigit = (i, val) => {
    if (checked) return
    const v = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = v
    setDigits(next)
    if (v && i > 0) inputRefs.current[i - 1]?.focus()
  }

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i < ansStr.length - 1) inputRefs.current[i + 1]?.focus()
    if (e.key === 'Enter') check()
  }

  const check = () => {
    if (checked || digits.join('').length < ansStr.length) return
    const correct = digits.join('') === ansStr
    setChecked(true)
    if (correct) onCorrect()
    else onWrong(answer)
  }

  const isCorrect = checked && digits.join('') === ansStr
  const isWrong = checked && !isCorrect

  const answerOffset = cols - ansStr.length

  const colLabels = ['sadat', 'kymmenet', 'ykköset']
  const getLabel = (i) => colLabels[cols - 1 - i] ?? ''

  return (
    <div className="column-subtraction">
      <div className="column-numbers">

        {!checked && (
          <div className="column-row col-label-row">
            <div className="col-digit col-sign-placeholder" />
            {aCols.map((_, i) => (
              <div key={i} className="col-digit col-label">{getLabel(i)}</div>
            ))}
          </div>
        )}

        <div className="column-row borrow-annotation-row">
          <div className="col-digit col-sign-placeholder" />
          {aCols.map((d, i) => {
            const givingBorrow = borrows[i]
            const receivingBorrow = i > 0 && borrows[i - 1]
            return (
              <div key={i} className="col-digit borrow-annotation-cell">
                {givingBorrow && (
                  <span className="borrow-strikethrough">{d}</span>
                )}
                {receivingBorrow && (
                  <span className="borrow-plus10">+10</span>
                )}
              </div>
            )
          })}
        </div>

        <div className="column-row">
          <div className="col-digit col-sign-placeholder" />
          {aCols.map((d, i) => {
            const canBorrow = effectiveA[i] !== null && effectiveA[i] > 0 && i < cols - 1 && !checked
            const gives = borrows[i]
            const receives = i > 0 && borrows[i - 1]
            const isModified = gives || receives
            return (
              <div
                key={i}
                className={`col-digit${canBorrow ? ' borrow-clickable' : ''}${gives ? ' is-borrowed' : ''}${receives && !gives ? ' is-received' : ''}`}
                onClick={() => canBorrow && toggleBorrow(i)}
                title={canBorrow ? 'Klikkaa lainataksesi tästä' : undefined}
              >
                {d === null ? '' : isModified
                  ? <span className={gives ? 'borrowed-reduced' : 'borrowed-received'}>{effectiveA[i]}</span>
                  : d}
              </div>
            )
          })}
        </div>

        <div className="column-row">
          <div className="col-digit col-sign">−</div>
          {bCols.map((d, i) => (
            <div key={i} className="col-digit">{d === null ? '' : d}</div>
          ))}
        </div>

        <hr className="column-line" />

        <div className="column-answer-row">
          <div className="col-digit col-sign-placeholder" />
          {Array(answerOffset).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="col-digit" />
          ))}
          {Array.from({ length: ansStr.length }, (_, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              className={`col-input ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digits[i]}
              onChange={(e) => handleDigit(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              disabled={checked}
            />
          ))}
        </div>
      </div>

      {!checked && (
        <p className="borrow-hint-tip">
          Aloita ykköisistä! · Tarvitsetko lainausta? Klikkaa ylärivin numeroa 👆
        </p>
      )}

      <div className="col-action-row">
        {!checked && (
          <button
            className="check-btn"
            onClick={check}
            disabled={digits.join('').length < ansStr.length}
          >
            Tarkista ✓
          </button>
        )}

        {!showHint && (
          <button className="hint-show-btn" onClick={() => setShowHint(true)}>
            💡 Vihje
          </button>
        )}
      </div>

      {showHint && <BorrowingHint a={a} b={b} />}
    </div>
  )
}
