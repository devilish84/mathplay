import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../i18n'
import translations from './SequenceGame.i18n'
import Summary from '../common/Summary'
import { SEQ_SHOW, SEQ_ASK } from './levels'

const QUESTIONS_PER_ROUND = 10

export default function SequenceGame({ level, onBack }) {
  const t = useTranslation(translations)

  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore]             = useState(0)
  const [seq, setSeq]                 = useState(() => level.generate())
  const [answers, setAnswers]         = useState(Array(SEQ_ASK).fill(''))
  const [checked, setChecked]         = useState(false)
  const [showStep, setShowStep]       = useState(false)
  const [done, setDone]               = useState(false)
  const inputRefs = useRef([])

  const fullSeq     = Array.from({ length: SEQ_SHOW + SEQ_ASK }, (_, i) => seq.start - i * seq.step)
  const givenNums   = fullSeq.slice(0, SEQ_SHOW)
  const correctNums = fullSeq.slice(SEQ_SHOW)

  useEffect(() => {
    setAnswers(Array(SEQ_ASK).fill(''))
    setChecked(false)
    setShowStep(false)
    setTimeout(() => inputRefs.current[0]?.focus(), 80)
  }, [seq])

  const allCorrect = checked && correctNums.every((n, i) => parseInt(answers[i], 10) === n)

  const handleChange = (i, val) => {
    if (checked) return
    const next = [...answers]
    next[i] = val.replace(/[^0-9]/g, '')
    setAnswers(next)
  }

  const handleKey = (i, e) => {
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
    if (correctNums.every((n, i) => parseInt(answers[i], 10) === n)) setScore((s) => s + 1)
  }

  const next = () => {
    const n = questionNum + 1
    if (n >= QUESTIONS_PER_ROUND) { setDone(true); return }
    setQuestionNum(n)
    setSeq(level.generate())
  }

  if (done) {
    return (
      <Summary
        score={score}
        total={QUESTIONS_PER_ROUND}
        onRetry={() => { setQuestionNum(0); setScore(0); setSeq(level.generate()); setDone(false) }}
        onBack={onBack}
        level={level}
      />
    )
  }

  const progress = (questionNum / QUESTIONS_PER_ROUND) * 100

  return (
    <div className="game-screen">
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>{t('back')}</button>
        <span className={`level-badge ${level.className}`}>{level.label}</span>
        <div className="score-display">{t('points')}: <span>{score}</span></div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div style={{ textAlign: 'center', color: '#b2bec3', marginBottom: 20, fontSize: '0.9rem' }}>
        {t('question')} {questionNum + 1} {t('of')} {QUESTIONS_PER_ROUND}
      </div>

      <p className="seq-instruction">{t('instruction')}</p>

      <div className="seq-row">
        {givenNums.map((n, i) => (
          <React.Fragment key={`g${i}`}>
            <div className="seq-card seq-given">{n}</div>
            <div className="seq-arrow">→</div>
          </React.Fragment>
        ))}

        {Array.from({ length: SEQ_ASK }, (_, i) => {
          const correct = checked && parseInt(answers[i], 10) === correctNums[i]
          const wrong   = checked && parseInt(answers[i], 10) !== correctNums[i]
          return (
            <React.Fragment key={`a${i}`}>
              <input
                ref={(el) => (inputRefs.current[i] = el)}
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
            </React.Fragment>
          )
        })}
      </div>

      {checked && !allCorrect && (
        <div className="seq-correct-row">
          {correctNums.map((n, i) => (
            <div key={i} className="seq-correct-val">{n}</div>
          ))}
        </div>
      )}

      <div className="col-action-row" style={{ marginTop: 20 }}>
        {!checked && (
          <button className="check-btn" onClick={check} disabled={answers.some((a) => a === '')}>
            {t('check')}
          </button>
        )}
        {!showStep && (
          <button className="hint-show-btn" onClick={() => setShowStep(true)}>
            {t('showStep')}
          </button>
        )}
      </div>

      {showStep && (
        <div className="seq-step-reveal">
          {t('stepReveal', { step: seq.step })}
        </div>
      )}

      {checked && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <div className={`feedback ${allCorrect ? 'correct' : 'wrong'}`}>
            {allCorrect ? t('correct') : t('wrong')}
          </div>
          <button className="next-btn" onClick={next}>
            {questionNum + 1 < QUESTIONS_PER_ROUND ? t('next') : t('showResult')}
          </button>
        </div>
      )}
    </div>
  )
}
