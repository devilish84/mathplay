import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../../i18n'
import translations from '../../i18n/addition/StandardAddition.i18n'

interface Props { a: number; b: number; onCorrect: () => void; onWrong: (answer: number) => void }

export default function StandardAddition({ a, b, onCorrect, onWrong }: Props) {
  const t      = useTranslation(translations)
  const answer = a + b
  const [value, setValue]         = useState('')
  const [checked, setChecked]     = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
      <div className="question-inline">
        <span className="question-part">{a} + {b} =</span>
        <input
          ref={inputRef}
          className={`answer-input-inline ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => !checked && setValue(e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          disabled={checked}
          placeholder="?"
        />
      </div>
      {!checked && (
        <button className="check-btn" onClick={check} disabled={value === ''}>{t('check')}</button>
      )}
    </div>
  )
}
