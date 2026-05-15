import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, useLang } from '../i18n'
import translations from '../i18n/sequences/SequenceGame.i18n'
import Summary from '../common/Summary'
import { scorePoint, nextQuestion, resetGame } from '../store/gameSlice'
import { getLevelLocale } from '../i18n/levelLocales'
import { SEQ_SHOW, SEQ_ASK } from './levels'
import type { SeqLevel } from '../types'
import type { AppDispatch, RootState } from '../store'

interface Props { level: SeqLevel; total: number; onBack: () => void }

export default function SequenceGame({ level, total, onBack }: Props) {
  const t        = useTranslation(translations)
  const lang     = useLang()
  const dispatch = useDispatch<AppDispatch>()
  const isTest   = useSelector((s: RootState) => s.game.mode === 'test')
  const levelLabel = getLevelLocale(level.id, lang).label

  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore]             = useState(0)
  const [seq, setSeq]                 = useState(() => level.generate())
  const [answers, setAnswers]         = useState<string[]>(() => Array(SEQ_ASK).fill(''))
  const [checked, setChecked]         = useState(false)
  const [showStep, setShowStep]       = useState(false)
  const [done, setDone]               = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const asc         = level.direction === 'asc'
  const fullSeq     = Array.from({ length: SEQ_SHOW + SEQ_ASK }, (_, i) => asc ? seq.start + i * seq.step : seq.start - i * seq.step)
  const givenNums   = fullSeq.slice(0, SEQ_SHOW)
  const correctNums = fullSeq.slice(SEQ_SHOW)


  useEffect(() => {
    setAnswers(Array(SEQ_ASK).fill(''))
    setChecked(false)
    setShowStep(false)
    setTimeout(() => inputRefs.current[0]?.focus(), 80)
  }, [seq])

  const allCorrect = checked && correctNums.every((n, i) => parseInt(answers[i], 10) === n)

  const handleChange = (i: number, val: string) => {
    if (checked) return
    const next = [...answers]; next[i] = val.replace(/[^0-9]/g, ''); setAnswers(next)
  }

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (i < SEQ_ASK - 1) inputRefs.current[i + 1]?.focus()
      else check()
    }
    if (e.key === 'Backspace' && !answers[i] && i > 0) inputRefs.current[i - 1]?.focus()
  }

  const check = () => {
    if (checked || answers.some((a) => a === '')) return
    setChecked(true)
    if (correctNums.every((n, i) => parseInt(answers[i], 10) === n)) {
      dispatch(scorePoint())
      setScore((s) => s + 1)
    }
  }

  const next = () => {
    const n = questionNum + 1
    dispatch(nextQuestion())
    if (n >= total) { setDone(true); return }
    setQuestionNum(n); setSeq(level.generate())
  }

  if (done) {
    return (
      <Summary
        score={score}
        total={total}
        onRetry={() => { dispatch(resetGame()); setQuestionNum(0); setScore(0); setSeq(level.generate()); setDone(false) }}
        onBack={onBack}
      />
    )
  }

  return (
    <div className="game-screen game-screen--seq">
      <div className="game-header">
        <span className={`level-badge ${level.className}`}>{levelLabel}</span>
      </div>

      <p className="seq-instruction">{t('instruction')}</p>

      <div className="seq-row">
        {givenNums.map((n, i) => (
          <div key={`g${i}`} style={{ display: 'contents' }}>
            <div className="seq-card seq-given">{n}</div>
            <div className="seq-arrow">→</div>
          </div>
        ))}
        {Array.from({ length: SEQ_ASK }, (_, i) => {
          const correct = checked && parseInt(answers[i], 10) === correctNums[i]
          const wrong   = checked && parseInt(answers[i], 10) !== correctNums[i]
          return (
            <div key={`a${i}`} style={{ display: 'contents' }}>
              <input
                ref={(el) => { inputRefs.current[i] = el }}
                className={`seq-input${correct ? ' correct' : wrong ? ' wrong' : ''}`}
                type="text"
                inputMode="numeric"
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                disabled={checked}
                placeholder="?"
              />
              {i < SEQ_ASK - 1 && <div className="seq-arrow">→</div>}
            </div>
          )
        })}
      </div>

      {checked && !allCorrect && (
        <div className="seq-correct-row">
          {correctNums.map((n, i) => <div key={i} className="seq-correct-val">{n}</div>)}
        </div>
      )}

      <div className="col-action-row" style={{ marginTop: 20 }}>
        {!checked && (
          <button className="check-btn" onClick={check} disabled={answers.some((a) => a === '')}>{t('check')}</button>
        )}
        {!isTest && !showStep && (
          <button className="hint-show-btn" onClick={() => setShowStep(true)}>{t(asc ? 'showStepAsc' : 'showStepDesc')}</button>
        )}
      </div>

      {!isTest && showStep && (
        <div className="seq-step-reveal">{t(asc ? 'stepRevealAsc' : 'stepRevealDesc', { step: seq.step })}</div>
      )}

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
