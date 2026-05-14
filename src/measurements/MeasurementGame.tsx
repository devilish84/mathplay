import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, useLang } from '../i18n'
import translations from '../i18n/measurements/MeasurementGame.i18n'
import Summary from '../common/Summary'
import { scorePoint, nextQuestion, resetGame } from '../store/gameSlice'
import type { MeasureLevel, MeasureQuestion } from './levels'
import type { AppDispatch, RootState } from '../store'

interface Props { level: MeasureLevel; total: number; onBack: () => void }

export default function MeasurementGame({ level, total, onBack }: Props) {
  const t        = useTranslation(translations)
  const lang     = useLang()
  const dispatch = useDispatch<AppDispatch>()
  const isTest   = useSelector((s: RootState) => s.game.mode === 'test')
  const levelLabel = lang === 'en' && level.en ? level.en.label : level.label

  const isMixed = level.op === 'mm_to_cm_mm' || level.op === 'm_to_km_m'

  function nextQ(index: number, prev?: MeasureQuestion): MeasureQuestion {
    let candidate = level.generate(index)
    for (let i = 0; i < 10 && prev && candidate.input === prev.input && candidate.inputUnit === prev.inputUnit; i++)
      candidate = level.generate(index)
    return candidate
  }

  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore]             = useState(0)
  const [q, setQ]                     = useState<MeasureQuestion>(() => nextQ(0))
  const [wholeVal, setWholeVal]       = useState('')
  const [remVal, setRemVal]           = useState('')
  const [checked, setChecked]         = useState(false)
  const [done, setDone]               = useState(false)

  const wholeRef = useRef<HTMLInputElement>(null)
  const remRef   = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setWholeVal(''); setRemVal(''); setChecked(false)
    setTimeout(() => wholeRef.current?.focus(), 60)
  }, [q])

  const wholeCorrect = parseInt(wholeVal, 10) === q.wholeAns
  const remCorrect   = !isMixed || parseInt(remVal, 10) === (q.remAns ?? 0)
  const allCorrect   = checked && wholeCorrect && remCorrect

  const canCheck = wholeVal !== '' && (!isMixed || remVal !== '')

  const check = () => {
    if (checked || !canCheck) return
    setChecked(true)
    if (wholeCorrect && remCorrect) {
      dispatch(scorePoint())
      setScore((s) => s + 1)
    }
  }

  const next = () => {
    const n = questionNum + 1
    dispatch(nextQuestion())
    if (n >= total) { setDone(true); return }
    setQuestionNum(n)
    setQ((prev) => nextQ(n, prev))
  }

  const handleKey = (e: React.KeyboardEvent, isWhole: boolean) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (isWhole && isMixed) remRef.current?.focus()
      else check()
    }
  }

  if (done) {
    return (
      <Summary
        score={score}
        total={total}
        onRetry={() => { dispatch(resetGame()); setQuestionNum(0); setScore(0); setQ(nextQ(0)); setDone(false) }}
        onBack={onBack}
      />
    )
  }

  const wholeClass = (checked ? (wholeCorrect ? ' correct' : ' wrong') : '') + (q.wideInput ? ' wide' : '')
  const remClass   = checked ? (remCorrect   ? ' correct' : ' wrong') : ''

  return (
    <div className="game-screen game-screen--measure">
      <div className="game-header">
        <span className={`level-badge ${level.className}`}>{levelLabel}</span>
      </div>

      <p className="measure-instruction">{t('instruction')}</p>

      <div className="measure-equation">
        <div className="measure-given">
          <span className="measure-number">{q.input}</span>
          <span className="measure-unit">{q.inputUnit}</span>
        </div>

        <span className="measure-equals">=</span>

        <div className="measure-answer-group">
          <input
            ref={wholeRef}
            className={`measure-input${wholeClass}`}
            type="text"
            inputMode="numeric"
            value={wholeVal}
            onChange={(e) => { if (!checked) setWholeVal(e.target.value.replace(/\D/g, '')) }}
            onKeyDown={(e) => handleKey(e, true)}
            disabled={checked}
            placeholder="?"
          />
          <span className="measure-unit">{q.wholeUnit}</span>

          {isMixed && (
            <>
              <input
                ref={remRef}
                className={`measure-input${remClass}`}
                type="text"
                inputMode="numeric"
                value={remVal}
                onChange={(e) => { if (!checked) setRemVal(e.target.value.replace(/\D/g, '')) }}
                onKeyDown={(e) => handleKey(e, false)}
                disabled={checked}
                placeholder="?"
              />
              <span className="measure-unit">{q.remUnit}</span>
            </>
          )}
        </div>
      </div>

      {checked && !allCorrect && (
        <div className="measure-correct-answer">
          {q.wholeAns} {q.wholeUnit}
          {isMixed && <> {q.remAns} {q.remUnit}</>}
        </div>
      )}

      <div className="col-action-row" style={{ marginTop: 24 }}>
        {!checked && (
          <button className="check-btn" onClick={check} disabled={!canCheck}>{t('check')}</button>
        )}
      </div>

      {checked && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <div className={`feedback ${allCorrect ? 'correct' : 'wrong'}`}>
            {allCorrect ? t('correct') : t('wrong')}
          </div>
          <button className="next-btn" onClick={next}>
            {questionNum + 1 < total ? t('next') : t('showResult')}
          </button>
        </div>
      )}
    </div>
  )
}
