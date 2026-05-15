import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, useLang } from '../i18n'
import translations from '../i18n/measurements/UnitArithmeticGame.i18n'
import Summary from '../common/Summary'
import { scorePoint, nextQuestion, resetGame } from '../store/gameSlice'
import UnitArithHint from './UnitArithHint'
import type { ArithLevel, ArithQuestion } from './arithmeticLevels'
import type { AppDispatch, RootState } from '../store'

interface Props { level: ArithLevel; total: number; onBack: () => void }

export default function UnitArithmeticGame({ level, total, onBack }: Props) {
  const t          = useTranslation(translations)
  const lang       = useLang()
  const dispatch   = useDispatch<AppDispatch>()
  const levelLabel = lang === 'en' && level.en ? level.en.label : level.label
  const isTest     = useSelector((s: RootState) => s.game.mode === 'test')

  const isMixed = (q: ArithQuestion) => q.ans2 !== undefined
  // Subtraction questions need a conversion step first (e.g. 3 m = ___ cm)
  const needsConv = (q: ArithQuestion) => q.op === '-'

  function nextQ(index: number, prev?: ArithQuestion): ArithQuestion {
    let c = level.generate(index)
    for (let i = 0; i < 10 && prev && c.aVal === prev.aVal && c.op === prev.op && c.bVal === prev.bVal; i++)
      c = level.generate(index)
    return c
  }

  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore]             = useState(0)
  const [q, setQ]                     = useState<ArithQuestion>(() => nextQ(0))

  // conversion step state (for subtraction)
  const [convVal, setConvVal]         = useState('')
  const [convOk, setConvOk]           = useState(false)

  // main answer state
  const [val1, setVal1]               = useState('')
  const [val2, setVal2]               = useState('')
  const [checked, setChecked]         = useState(false)
  const [showHint, setShowHint]       = useState(false)
  const [done, setDone]               = useState(false)

  const convRef = useRef<HTMLInputElement>(null)
  const ref1    = useRef<HTMLInputElement>(null)
  const ref2    = useRef<HTMLInputElement>(null)

  const convTarget = (q: ArithQuestion) => q.aVal * (q.aUnit === 'm' ? 100 : 10)

  useEffect(() => {
    setConvVal(''); setConvOk(false)
    setVal1(''); setVal2(''); setChecked(false); setShowHint(false)
    setTimeout(() => {
      if (needsConv(q)) convRef.current?.focus()
      else ref1.current?.focus()
    }, 60)
  }, [q])

  // auto-confirm conversion when correct value typed
  useEffect(() => {
    if (needsConv(q) && !convOk && parseInt(convVal, 10) === convTarget(q)) {
      setConvOk(true)
      setTimeout(() => ref1.current?.focus(), 60)
    }
  }, [convVal])

  const ok1    = parseInt(val1, 10) === q.ans1
  const ok2    = !isMixed(q) || parseInt(val2, 10) === (q.ans2 ?? 0)
  const allOk  = checked && ok1 && ok2
  const canCheck = (needsConv(q) ? convOk : true) && val1 !== '' && (!isMixed(q) || val2 !== '')

  const check = () => {
    if (checked || !canCheck) return
    setChecked(true)
    if (ok1 && ok2) { dispatch(scorePoint()); setScore(s => s + 1) }
  }

  const next = () => {
    const n = questionNum + 1
    dispatch(nextQuestion())
    if (n >= total) { setDone(true); return }
    setQuestionNum(n)
    setQ(prev => nextQ(n, prev))
  }

  const handleKey = (e: React.KeyboardEvent, field: 'conv' | 'ans1' | 'ans2') => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (field === 'conv' && convOk)  ref1.current?.focus()
      else if (field === 'ans1' && isMixed(q)) ref2.current?.focus()
      else check()
    }
  }

  if (done) return (
    <Summary score={score} total={total}
      onRetry={() => { dispatch(resetGame()); setQuestionNum(0); setScore(0); setQ(nextQ(0)); setDone(false) }}
      onBack={onBack}
    />
  )

  const cl1   = checked ? (ok1 ? ' correct' : ' wrong') : ''
  const cl2   = checked ? (ok2 ? ' correct' : ' wrong') : ''
  const wide1 = String(q.ans1).length >= 3
  const convCorrect = parseInt(convVal, 10) === convTarget(q)

  return (
    <div className="game-screen game-screen--arith">
      <div className="game-header">
        <span className={`level-badge ${level.className}`}>{levelLabel}</span>
      </div>

      <p className="measure-instruction">{t('instruction')}</p>

      {/* Main equation — answer grayed out until conversion done */}
      <div className="arith-equation">
        <span className="arith-part">{q.aVal}</span>
        <span className="arith-unit">{q.aUnit}</span>
        <span className="arith-op">{q.op}</span>
        <span className="arith-part">{q.bVal}</span>
        <span className="arith-unit">{q.bUnit}</span>
        <span className="arith-eq">=</span>

        <div className="arith-answer-group">
          <input
            ref={ref1}
            className={`measure-input${cl1}${wide1 ? ' wide' : ''}`}
            type="text" inputMode="numeric"
            value={val1} placeholder="?"
            disabled={checked || (needsConv(q) && !convOk)}
            onChange={e => { if (!checked) setVal1(e.target.value.replace(/\D/g, '')) }}
            onKeyDown={e => handleKey(e, 'ans1')}
          />
          <span className="arith-unit">{q.ans1Unit}</span>

          {isMixed(q) && (
            <>
              <input
                ref={ref2}
                className={`measure-input${cl2}`}
                type="text" inputMode="numeric"
                value={val2} placeholder="?"
                disabled={checked}
                onChange={e => { if (!checked) setVal2(e.target.value.replace(/\D/g, '')) }}
                onKeyDown={e => handleKey(e, 'ans2')}
              />
              <span className="arith-unit">{q.ans2Unit}</span>
            </>
          )}
        </div>
      </div>

      {/* Conversion helper box — only for subtraction */}
      {needsConv(q) && !checked && (
        <div className={`arith-conv-box${convOk ? ' conv-done' : ''}`}>
          <span className="arith-conv-label">{t('convertFirst')}</span>
          <div className="arith-conv-row">
            <span className="arith-part" style={{ fontSize: '2rem' }}>{q.aVal}</span>
            <span className="arith-unit">{q.aUnit}</span>
            <span className="arith-eq">=</span>
            {convOk ? (
              <span className="arith-conv-result">{convTarget(q)} {q.ans1Unit}</span>
            ) : (
              <>
                <input
                  ref={convRef}
                  className={`measure-input${convVal && !convCorrect ? ' wrong' : ''}${String(convTarget(q)).length >= 3 ? ' wide' : ''}`}
                  type="text" inputMode="numeric"
                  value={convVal} placeholder="?"
                  onChange={e => setConvVal(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={e => handleKey(e, 'conv')}
                />
                <span className="arith-unit">{q.ans1Unit}</span>
              </>
            )}
          </div>
        </div>
      )}

      {checked && !allOk && !isTest && (
        <div className="measure-correct-answer">
          {q.ans1} {q.ans1Unit}{q.ans2 !== undefined ? <> {q.ans2} {q.ans2Unit}</> : null}
        </div>
      )}

      <div className="col-action-row" style={{ marginTop: 20 }}>
        {!checked && (
          <button className="check-btn" onClick={check} disabled={!canCheck}>{t('check')}</button>
        )}
        {!isTest && !checked && !showHint && (
          <button className="hint-show-btn" onClick={() => setShowHint(true)}>{t('showHint')}</button>
        )}
      </div>

      {!isTest && showHint && !checked && <UnitArithHint q={q} />}

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
