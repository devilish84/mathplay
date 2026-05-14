import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../../i18n'
import translations from './StandardAddition.i18n'

export default function StandardAddition({ a, b, onCorrect, onWrong }) {
  const t      = useTranslation(translations)
  const answer = a + b
  const [value, setValue]         = useState('')
  const [checked, setChecked]     = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setValue(''); setChecked(false); setIsCorrect(null)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [a, b])

  const check = () => {
    if (checked || value === '') return
    const correct = parseInt(value, 10) === answer
    setIsCorrect(correct); setChecked(true)
    if (correct) onCorrect(); else onWrong(answer)
  }

  return (
    <div className="answer-area">
      <div className="question-text">{a} + {b} = ?</div>
      <input
        ref={inputRef}
        className={`answer-input ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`}
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => !checked && setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && check()}
        disabled={checked}
        placeholder="?"
      />
      {!checked && (
        <button className="check-btn" onClick={check} disabled={value === ''}>{t('check')}</button>
      )}
    </div>
  )
}
