import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../i18n'
import translations from './StandardMultiplication.i18n'

interface Props { a: number; b: number; onCorrect: () => void; onWrong: (answer: number) => void }

export default function StandardMultiplication({ a, b, onCorrect, onWrong }: Props) {
  const t      = useTranslation(translations)
  const answer = a * b
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue('')
    setChecked(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [a, b])

  const check = () => {
    if (checked || value === '') return
    setChecked(true)
    if (parseInt(value, 10) === answer) onCorrect(); else onWrong(answer)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') check()
  }

  const correct = checked && parseInt(value, 10) === answer

  return (
    <div className="mul-question">
      <div className="mul-equation">
        <span className="mul-num">{a}</span>
        <span className="mul-op">×</span>
        <span className="mul-num">{b}</span>
        <span className="mul-op">=</span>
        <input
          ref={inputRef}
          className={`mul-input${checked ? (correct ? ' correct' : ' wrong') : ''}`}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => { if (!checked) setValue(e.target.value.replace(/\D/g, '')) }}
          onKeyDown={handleKey}
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
