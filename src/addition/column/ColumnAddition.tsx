import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../../i18n'
import translations from '../../i18n/addition/ColumnAddition.i18n'
import AdditionHint from './AdditionHint'

interface Props { a: number; b: number; onCorrect: () => void; onWrong: (answer: number) => void; hideHint?: boolean }

export default function ColumnAddition({ a, b, onCorrect, onWrong, hideHint = false }: Props) {
  const t       = useTranslation(translations)
  const answer  = a + b
  const ansStr  = String(answer)
  const ansCols = ansStr.length
  const aDigits = String(a).split('').map(Number)
  const bDigits = String(b).split('').map(Number)

  const padLeft = (arr: number[], n: number): (number | null)[] =>
    Array<number | null>(n - arr.length).fill(null).concat(arr)
  const aCols = padLeft(aDigits, ansCols)
  const bCols = padLeft(bDigits, ansCols)

  const correctCarries = (() => {
    const c: number[] = Array(ansCols).fill(0)
    let carry = 0
    for (let i = ansCols - 1; i >= 0; i--) {
      const sum = (aCols[i] ?? 0) + (bCols[i] ?? 0) + carry
      carry = Math.floor(sum / 10)
      if (i > 0) c[i - 1] = carry
    }
    return c
  })()

  const [carries, setCarries]   = useState<string[]>(() => Array(ansCols).fill(''))
  const [digits, setDigits]     = useState<string[]>(() => Array(ansCols).fill(''))
  const [checked, setChecked]   = useState(false)
  const [showHint, setShowHint] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const carryRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    setCarries(Array(ansCols).fill(''))
    setDigits(Array(ansCols).fill(''))
    setChecked(false)
    setShowHint(false)
    setTimeout(() => inputRefs.current[ansCols - 1]?.focus(), 50)
  }, [a, b])

  const handleCarry = (i: number, val: string) => {
    if (checked) return
    const v = val.replace(/[^01]/g, '').slice(-1)
    const next = [...carries]; next[i] = v; setCarries(next)
  }

  const handleDigit = (i: number, val: string) => {
    if (checked) return
    const v = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]; next[i] = v; setDigits(next)
    if (v && i > 0) inputRefs.current[i - 1]?.focus()
  }

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i < ansCols - 1) inputRefs.current[i + 1]?.focus()
    if (e.key === 'Enter') check()
  }

  const check = () => {
    if (checked || digits.join('').length < ansCols) return
    const correct = digits.join('') === ansStr
    setChecked(true)
    if (correct) onCorrect(); else onWrong(answer)
  }

  const isCorrect = checked && digits.join('') === ansStr
  const getLabel  = (i: number) => [t('hundreds'), t('tens'), t('ones')][3 - ansCols + i] ?? ''

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

        <div className="column-row carry-row-inputs">
          <div className="col-digit col-sign-placeholder" />
          {aCols.map((_, i) => (
            <div key={i} className="col-digit carry-input-cell">
              {i < ansCols - 1 && (
                <input
                  ref={(el) => { carryRefs.current[i] = el }}
                  className={`carry-box-input${
                    checked
                      ? correctCarries[i] === 1
                        ? carries[i] === '1' ? ' carry-ok' : ' carry-missing'
                        : carries[i] === '1' ? ' carry-wrong' : ''
                      : ''
                  }`}
                  type="text"
                  maxLength={1}
                  value={carries[i]}
                  onChange={(e) => handleCarry(i, e.target.value)}
                  disabled={checked}
                  placeholder=""
                  title={t('carry')}
                />
              )}
            </div>
          ))}
        </div>

        <div className="column-row">
          <div className="col-digit col-sign-placeholder" />
          {aCols.map((d, i) => (
            <div key={i} className="col-digit">{d ?? ''}</div>
          ))}
        </div>

        <div className="column-row">
          <div className="col-digit col-sign add-sign">+</div>
          {bCols.map((d, i) => (
            <div key={i} className="col-digit">{d ?? ''}</div>
          ))}
        </div>

        <hr className="column-line" />

        <div className="column-answer-row">
          <div className="col-digit col-sign-placeholder" />
          {Array.from({ length: ansCols }, (_, i) => (
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
        <p className="borrow-hint-tip">{t('startOnes')} · {t('carryTip')}</p>
      )}

      <div className="col-action-row" style={{ marginTop: 12 }}>
        {!checked && (
          <button className="check-btn" onClick={check} disabled={digits.join('').length < ansCols}>
            {t('check')}
          </button>
        )}
        {!hideHint && !showHint && (
          <button className="hint-show-btn" onClick={() => setShowHint(true)}>{t('hint')}</button>
        )}
      </div>

      {!hideHint && showHint && <AdditionHint a={a} b={b} />}
    </div>
  )
}
