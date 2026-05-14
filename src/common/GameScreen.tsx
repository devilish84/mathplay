import { useState } from 'react'
import { useTranslation } from '../i18n'
import translations from './GameScreen.i18n'
import Summary from './Summary'
import ColumnSubtraction from '../subtraction/column/ColumnSubtraction'
import StandardQuestion from '../subtraction/standard/StandardQuestion'
import ColumnAddition from '../addition/column/ColumnAddition'
import StandardAddition from '../addition/standard/StandardAddition'
import type { Level } from '../types'

const QUESTIONS_PER_ROUND = 10

interface Feedback { correct: boolean; correctAnswer?: number }
interface Props { level: Level; onBack: () => void }

export default function GameScreen({ level, onBack }: Props) {
  const t = useTranslation(translations)

  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore]             = useState(0)
  const [question, setQuestion]       = useState(() => level.generate())
  const [feedback, setFeedback]       = useState<Feedback | null>(null)
  const [done, setDone]               = useState(false)

  const newQuestion = () => {
    const next = questionNum + 1
    if (next >= QUESTIONS_PER_ROUND) { setDone(true); return }
    setQuestionNum(next)
    setQuestion(level.generate())
    setFeedback(null)
  }

  const handleCorrect = () => { setScore((s) => s + 1); setFeedback({ correct: true }) }
  const handleWrong   = (correctAnswer: number) => setFeedback({ correct: false, correctAnswer })

  if (done) {
    return (
      <Summary
        score={score}
        total={QUESTIONS_PER_ROUND}
        onRetry={() => { setQuestionNum(0); setScore(0); setQuestion(level.generate()); setFeedback(null); setDone(false) }}
        onBack={onBack}
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

      {level.op === 'add' ? (
        level.mode === 'column' ? (
          <ColumnAddition
            key={`${question.a}-${question.b}-${questionNum}`}
            a={question.a} b={question.b}
            onCorrect={handleCorrect} onWrong={handleWrong}
          />
        ) : (
          <StandardAddition
            key={`${question.a}-${question.b}-${questionNum}`}
            a={question.a} b={question.b}
            onCorrect={handleCorrect} onWrong={handleWrong}
          />
        )
      ) : level.mode === 'column' ? (
        <ColumnSubtraction
          key={`${question.a}-${question.b}-${questionNum}`}
          a={question.a} b={question.b}
          onCorrect={handleCorrect} onWrong={handleWrong}
        />
      ) : (
        <StandardQuestion
          key={`${question.a}-${question.b}-${questionNum}`}
          a={question.a} b={question.b}
          onCorrect={handleCorrect} onWrong={handleWrong}
        />
      )}

      {feedback && (
        <>
          <div className={`feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
            {feedback.correct
              ? t('correct')
              : t('wrong', { answer: feedback.correctAnswer ?? '' })}
          </div>
          <button className="next-btn" onClick={newQuestion}>
            {questionNum + 1 < QUESTIONS_PER_ROUND ? t('next') : t('showResult')}
          </button>
        </>
      )}
    </div>
  )
}
