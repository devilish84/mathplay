import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, useLang } from '../i18n'
import translations from '../i18n/measurements/VolumeMissingGame.i18n'
import Summary from '../common/Summary'
import { scorePoint, nextQuestion, resetGame } from '../store/gameSlice'
import { MISSING_PITCHER_IMGS } from './missingLevels'
import type { MissingLevel } from './missingLevels'
import type { AppDispatch, RootState } from '../store'

interface Props { level: MissingLevel; total: number; onBack: () => void }

interface Question {
  fills:       number[]   // dl shown in each pitcher
  targetLitres: number    // 1, 2, or 3
  correct:     number     // dl missing
}

function makeQuestion(level: MissingLevel, prevCorrect?: number): Question {
  const targetLitres = Math.ceil(Math.random() * level.maxLitres)
  const targetDl     = targetLitres * 10
  const numPitchers  = level.maxPitchers === 1 ? 1 : Math.ceil(Math.random() * level.maxPitchers)

  // Pick fills so their sum < targetDl
  const fills: number[] = []
  let remaining = targetDl - 1 // at least 1 dl must be missing
  for (let i = 0; i < numPitchers; i++) {
    const maxFill = Math.min(9, remaining - (numPitchers - i - 1))
    if (maxFill < 1) break
    const fill = level.pool[Math.floor(Math.random() * level.pool.filter(v => v <= maxFill).length)]
      ?? 1
    fills.push(fill)
    remaining -= fill
  }

  const correct = targetDl - fills.reduce((a, b) => a + b, 0)

  // Avoid repeating same answer
  if (prevCorrect !== undefined && correct === prevCorrect && Math.random() > 0.3) {
    return makeQuestion(level, prevCorrect)
  }

  return { fills, targetLitres, correct }
}

export default function VolumeMissingGame({ level, total, onBack }: Props) {
  const t        = useTranslation(translations)
  const lang     = useLang()
  const dispatch = useDispatch<AppDispatch>()
  const isTest   = useSelector((s: RootState) => s.game.mode === 'test')
  const levelI18n = level.i18n[lang] ?? level.i18n['en']

  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore]             = useState(0)
  const [q, setQ]                     = useState<Question>(() => makeQuestion(level))
  const [answer, setAnswer]           = useState('')
  const [checked, setChecked]         = useState(false)
  const [done, setDone]               = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setAnswer('')
    setChecked(false)
    setTimeout(() => inputRef.current?.focus(), 60)
  }, [q])

  const isOk     = parseInt(answer, 10) === q.correct
  const canCheck = answer !== ''

  const check = () => {
    if (checked || !canCheck) return
    setChecked(true)
    if (isOk) { dispatch(scorePoint()); setScore(s => s + 1) }
  }

  const next = () => {
    const n = questionNum + 1
    dispatch(nextQuestion())
    if (n >= total) { setDone(true); return }
    setQuestionNum(n)
    setQ(prev => makeQuestion(level, prev.correct))
  }

  const retry = () => {
    dispatch(resetGame())
    setQuestionNum(0); setScore(0)
    setQ(makeQuestion(level))
    setDone(false)
  }

  if (done) return <Summary score={score} total={total} onRetry={retry} onBack={onBack} />

  const cl          = checked ? (isOk ? ' correct' : ' wrong') : ''
  const instruction = t('instruction').replace('{litres}', String(q.targetLitres))

  return (
    <div className="game-screen game-screen--missing">
      <div className="game-header">
        <span className={`level-badge ${level.className}`}>{levelI18n.label}</span>
      </div>

      <p className="measure-instruction">{instruction}</p>

      <div className="missing-card">
        <div className="missing-pitchers">
          {q.fills.map((fill, i) => (
            <div key={i} className="missing-pitcher-item">
              <img
                src={MISSING_PITCHER_IMGS[fill]}
                alt={`${fill} dl`}
                className="missing-pitcher-img"
              />
              <div className="missing-fill-label">{fill} dl</div>
            </div>
          ))}
        </div>

        <div className="missing-answer-row">
          <span className="missing-word">{t('missing')}</span>
          <input
            ref={inputRef}
            className={`measure-input${cl}`}
            type="text"
            inputMode="numeric"
            value={answer}
            placeholder="?"
            disabled={checked}
            onChange={e => { if (!checked) setAnswer(e.target.value.replace(/\D/g, '')) }}
            onKeyDown={e => { if (e.key === 'Enter') check() }}
          />
          <span className="measure-unit">{t('dlUnit')}</span>
        </div>
      </div>

      {checked && !isOk && !isTest && (
        <div className="measure-correct-answer">{q.correct} {t('dlUnit')}</div>
      )}

      <div className="col-action-row" style={{ marginTop: 24 }}>
        {!checked && (
          <button className="check-btn" onClick={check} disabled={!canCheck}>{t('check')}</button>
        )}
      </div>

      {checked && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <div className={`feedback ${isOk ? 'correct' : 'wrong'}`}>
            {isOk ? t('correct') : t('wrong')}
          </div>
          <button className="next-btn" onClick={next}>
            {questionNum + 1 < total ? t('next') : t('showResult')}
          </button>
        </div>
      )}
    </div>
  )
}
