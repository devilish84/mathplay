import { useState } from 'react'
import { useTranslation } from '../i18n'
import translations from '../i18n/measurements/UnitArithmeticGame.i18n'
import type { ArithQuestion } from './arithmeticLevels'

interface Props { q: ArithQuestion }

interface Step { label: string; value: string }

function buildSteps(q: ArithQuestion, t: (k: string, p?: Record<string, unknown>) => string): Step[] {
  const steps: Step[] = []

  if (q.op === '-') {
    // e.g. 3 m – 197 cm = ___ cm
    // Step 1: convert aVal to ans1Unit
    const factor   = q.aUnit === 'm' ? 100 : 10   // m→cm or l→dl
    const converted = q.aVal * factor
    steps.push({
      label: t('hintConvert', { val: q.aVal, from: q.aUnit, to: q.ans1Unit }),
      value: `${q.aVal} ${q.aUnit} = ${converted} ${q.ans1Unit}`,
    })
    // Step 2: subtract
    steps.push({
      label: t('hintSubtract', { a: converted, aUnit: q.ans1Unit, b: q.bVal, bUnit: q.bUnit }),
      value: `${converted} – ${q.bVal} = ${q.ans1} ${q.ans1Unit}`,
    })
  } else {
    // e.g. 60 cm + 70 cm = ___ m ___ cm
    // Step 1: add in small unit
    const rawSum = q.aVal + q.bVal
    steps.push({
      label: t('hintAdd', { a: q.aVal, aUnit: q.aUnit, b: q.bVal, bUnit: q.bUnit }),
      value: `${q.aVal} + ${q.bVal} = ${rawSum} ${q.aUnit}`,
    })
    // Step 2: convert sum to big + remainder
    if (q.ans2 !== undefined) {
      steps.push({
        label: t('hintConvertResult', { val: rawSum, unit: q.aUnit, bigUnit: q.ans1Unit }),
        value: `${rawSum} ${q.aUnit} = ${q.ans1} ${q.ans1Unit} ${q.ans2} ${q.ans2Unit}`,
      })
    }
  }

  return steps
}

export default function UnitArithHint({ q }: Props) {
  const t = useTranslation(translations)
  const steps = buildSteps(q, t)
  const [revealed, setRevealed] = useState(0)

  return (
    <div className="arith-hint">
      {steps.slice(0, revealed).map((s, i) => (
        <div key={i} className="arith-hint-step">
          <span className="arith-hint-label">{s.label}</span>
          <span className="arith-hint-value">{s.value}</span>
        </div>
      ))}
      {revealed < steps.length && (
        <button className="hint-show-btn" onClick={() => setRevealed(r => r + 1)}>
          {t('hintNext')}
        </button>
      )}
    </div>
  )
}
