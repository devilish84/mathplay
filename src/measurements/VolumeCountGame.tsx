import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, useLang } from '../i18n'
import translations from '../i18n/measurements/VolumeCountGame.i18n'
import Summary from '../common/Summary'
import { scorePoint, nextQuestion, resetGame } from '../store/gameSlice'
import type { VolumeLevel, VolumeQuestion } from './volumeLevels'
import type { AppDispatch, RootState } from '../store'

interface Props { level: VolumeLevel; total: number; onBack: () => void }

function nextQ(level: VolumeLevel, prev?: VolumeQuestion): VolumeQuestion {
  let q = level.generate()
  for (let i = 0; i < 10 && prev && q.totalDl === prev.totalDl; i++)
    q = level.generate()
  return q
}

export default function VolumeCountGame({ level, total, onBack }: Props) {
  const t          = useTranslation(translations)
  const lang       = useLang()
  const dispatch   = useDispatch<AppDispatch>()
  const isTest     = useSelector((s: RootState) => s.game.mode === 'test')
  const levelI18n  = level.i18n[lang] ?? level.i18n['en']
  const levelLabel = levelI18n.label

  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore]             = useState(0)
  const [q, setQ]                     = useState<VolumeQuestion>(() => nextQ(level))
  const [lVal, setLVal]               = useState('')
  const [dlVal, setDlVal]             = useState('')
  const [checked, setChecked]         = useState(false)
  const [done, setDone]               = useState(false)

  const lRef  = useRef<HTMLInputElement>(null)
  const dlRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLVal(''); setDlVal(''); setChecked(false)
    setTimeout(() => (q.answerInLDl ? lRef : dlRef).current?.focus(), 60)
  }, [q])

  const correctL  = Math.floor(q.totalDl / 10)
  const correctDl = q.totalDl % 10

  const okL  = !q.answerInLDl || parseInt(lVal, 10) === correctL
  const okDl = parseInt(dlVal, 10) === (q.answerInLDl ? correctDl : q.totalDl)
  const allOk = checked && okL && okDl

  const canCheck = (!q.answerInLDl || lVal !== '') && dlVal !== ''

  const check = () => {
    if (checked || !canCheck) return
    setChecked(true)
    if (okL && okDl) { dispatch(scorePoint()); setScore(s => s + 1) }
  }

  const next = () => {
    const n = questionNum + 1
    dispatch(nextQuestion())
    if (n >= total) { setDone(true); return }
    setQuestionNum(n)
    setQ(prev => nextQ(level, prev))
  }

  const handleKey = (e: React.KeyboardEvent, field: 'l' | 'dl') => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (field === 'l') dlRef.current?.focus()
      else check()
    }
  }

  if (done) return (
    <Summary score={score} total={total}
      onRetry={() => { dispatch(resetGame()); setQuestionNum(0); setScore(0); setQ(nextQ(level)); setDone(false) }}
      onBack={onBack}
    />
  )

  const clL  = checked ? (okL  ? ' correct' : ' wrong') : ''
  const clDl = checked ? (okDl ? ' correct' : ' wrong') : ''

  return (
    <div className="game-screen game-screen--volume">
      <div className="game-header">
        <span className={`level-badge ${level.className}`}>{levelLabel}</span>
      </div>

      <p className="measure-instruction">{t('instruction')}</p>

      {/* Item grid */}
      <div className="volume-grid">
        {q.items.map(({ item, count }) => (
          <div key={item.img} className="volume-item-group">
            {Array.from({ length: count }).map((_, i) => (
              <img
                key={i}
                src={item.img}
                alt={item.labels[lang] ?? item.labels['en']}
                className="volume-item-img"
                title={item.labels[lang] ?? item.labels['en']}
              />
            ))}
            <span className="volume-item-label">{item.labels[lang] ?? item.labels['en']}</span>
          </div>
        ))}
      </div>

      {/* Answer row */}
      <div className="volume-answer-row">
        {q.answerInLDl && (
          <>
            <input
              ref={lRef}
              className={`measure-input${clL}`}
              type="text" inputMode="numeric"
              value={lVal} placeholder="?"
              disabled={checked}
              onChange={e => { if (!checked) setLVal(e.target.value.replace(/\D/g, '')) }}
              onKeyDown={e => handleKey(e, 'l')}
            />
            <span className="measure-unit">{t('lUnit')}</span>
          </>
        )}
        <input
          ref={dlRef}
          className={`measure-input${clDl}${!q.answerInLDl && q.totalDl >= 10 ? ' wide' : ''}`}
          type="text" inputMode="numeric"
          value={dlVal} placeholder="?"
          disabled={checked}
          onChange={e => { if (!checked) setDlVal(e.target.value.replace(/\D/g, '')) }}
          onKeyDown={e => handleKey(e, 'dl')}
        />
        <span className="measure-unit">{t('dlUnit')}</span>
      </div>

      {checked && !allOk && !isTest && (
        <div className="measure-correct-answer">
          {q.answerInLDl ? `${correctL} l ${correctDl} dl` : `${q.totalDl} dl`}
        </div>
      )}

      <div className="col-action-row" style={{ marginTop: 24 }}>
        {!checked && (
          <button className="check-btn" onClick={check} disabled={!canCheck}>{t('check')}</button>
        )}
      </div>

      {checked && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <div className={`feedback ${allOk ? 'correct' : 'wrong'}`}>
            {allOk ? t('correct') : t('wrong')}
          </div>
          <button className="next-btn" onClick={next}>
            {questionNum + 1 < total ? t('next') : t('showResult')}
          </button>
        </div>
      )}
    </div>
  )
}
