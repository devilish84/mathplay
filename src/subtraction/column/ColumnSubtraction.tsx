import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../../i18n'
import translations from './ColumnSubtraction.i18n'
import BorrowingHint from './BorrowingHint'

interface Props { a: number; b: number; onCorrect: () => void; onWrong: (answer: number) => void }

export default function ColumnSubtraction({ a, b, onCorrect, onWrong }: Props) {
  const t      = useTranslation(translations)
  const answer = a - b
  const ansStr = String(answer)
  const aDigits = String(a).split('').map(Number)
  const bDigits = String(b).split('').map(Number)
  const cols    = Math.max(aDigits.length, bDigits.length, ansStr.length)

  const padLeft = (arr: number[]) => Array<number | null>(cols - arr.length).fill(null).concat(arr)
  const aCols   = padLeft(aDigits)
  const bCols   = padLeft(bDigits)

  const [borrows, setBorrows]       = useState<boolean[]>(() => Array(cols).fill(false))
  const [borrowSums, setBorrowSums] = useState<Record<number, string>>({})
  const [digits, setDigits]         = useState<string[]>(() => Array(ansStr.length).fill(''))
  const [checked, setChecked]       = useState(false)
  const [showHint, setShowHint]     = useState(false)
  const inputRefs    = useRef<(HTMLInputElement | null)[]>([])
  const borrowRefs   = useRef<Record<number, HTMLInputElement | null>>({})

  useEffect(() => {
    setDigits(Array(ansStr.length).fill(''))
    setBorrows(Array(cols).fill(false))
    setBorrowSums({})
    setChecked(false)
    setShowHint(false)
    setTimeout(() => inputRefs.current[ansStr.length - 1]?.focus(), 50)
  }, [a, b])

  const toggleBorrow = (colIdx: number) => {
    if (checked) return
    if (aCols[colIdx] === null || aCols[colIdx] === 0) return
    const receivingCol = colIdx + 1
    setBorrows((prev) => { const next = [...prev]; next[colIdx] = !next[colIdx]; return next })
    setBorrowSums((prev) => {
      const next = { ...prev }
      if (!borrows[colIdx]) {
        next[receivingCol] = ''
        setTimeout(() => borrowRefs.current[receivingCol]?.focus(), 30)
      } else {
        delete next[receivingCol]
      }
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

  const borrowSumCorrect = (i: number) =>
    parseInt(borrowSums[i] ?? '', 10) === (aCols[i] ?? 0) + 10

  const allBorrowSumsOk = aCols.every((_, i) =>
    !(i > 0 && borrows[i - 1]) || borrowSumCorrect(i)
  )

  const handleDigit = (i: number, val: string) => {
    if (checked) return
    const v = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]; next[i] = v; setDigits(next)
    if (v && i > 0) inputRefs.current[i - 1]?.focus()
  }

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i < ansStr.length - 1) inputRefs.current[i + 1]?.focus()
    if (e.key === 'Enter') check()
  }

  const check = () => {
    if (checked || digits.join('').length < ansStr.length) return
    const correct = digits.join('') === ansStr
    setChecked(true)
    if (correct) onCorrect(); else onWrong(answer)
  }

  const isCorrect    = checked && digits.join('') === ansStr
  const answerOffset = cols - ansStr.length
  const colLabels    = [t('hundreds'), t('tens'), t('ones')]
  const getLabel     = (i: number) => colLabels[cols - 1 - i] ?? ''

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
          {aCols.map((d, i) => (
            <div key={i} className="col-digit borrow-annotation-cell">
              {borrows[i]          && <span className="borrow-strikethrough">{d}</span>}
              {i > 0 && borrows[i - 1] && <span className="borrow-plus10">+10</span>}
            </div>
          ))}
        </div>

        <div className="column-row">
          <div className="col-digit col-sign-placeholder" />
          {aCols.map((d, i) => {
            const canBorrow  = effectiveA[i] !== null && effectiveA[i]! > 0 && i < cols - 1 && !checked
            const gives      = borrows[i]
            const receives   = i > 0 && borrows[i - 1]
            const isModified = gives || receives
            return (
              <div
                key={i}
                className={`col-digit${canBorrow ? ' borrow-clickable' : ''}${gives ? ' is-borrowed' : ''}${receives && !gives ? ' is-received' : ''}`}
                onClick={() => canBorrow && toggleBorrow(i)}
                title={canBorrow ? t('clickToBorrow') : undefined}
              >
                {d === null ? '' : receives && i in borrowSums ? (
                  borrowSumCorrect(i) ? (
                    <span className="borrowed-received">{effectiveA[i]}</span>
                  ) : (
                    <span className="borrow-sum-prompt">
                      <span className="borrow-sum-label">{d}+10=</span>
                      <input
                        ref={(el) => { borrowRefs.current[i] = el }}
                        className="borrow-sum-input"
                        type="text"
                        inputMode="numeric"
                        maxLength={2}
                        value={borrowSums[i]}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '')
                          setBorrowSums((prev) => ({ ...prev, [i]: v }))
                        }}
                      />
                    </span>
                  )
                ) : isModified ? (
                  <span className={gives ? 'borrowed-reduced' : 'borrowed-received'}>{effectiveA[i]}</span>
                ) : d}
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
          {Array(answerOffset).fill(null).map((_: null, i: number) => (
            <div key={`empty-${i}`} className="col-digit" />
          ))}
          {Array.from({ length: ansStr.length }, (_, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el }}
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
        <p className="borrow-hint-tip">{t('startOnes')} · {t('borrowTip')}</p>
      )}

      <div className="col-action-row">
        {!checked && (
          <button className="check-btn" onClick={check} disabled={digits.join('').length < ansStr.length || !allBorrowSumsOk}>
            {t('check')}
          </button>
        )}
        {!showHint && (
          <button className="hint-show-btn" onClick={() => setShowHint(true)}>{t('hint')}</button>
        )}
      </div>

      {showHint && <BorrowingHint a={a} b={b} />}
    </div>
  )
}
