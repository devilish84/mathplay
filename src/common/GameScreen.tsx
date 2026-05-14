import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, useLang } from '../i18n'
import translations from '../i18n/common/GameScreen.i18n'
import Summary from './Summary'
import ColumnSubtraction from '../subtraction/column/ColumnSubtraction'
import StandardQuestion from '../subtraction/standard/StandardQuestion'
import ColumnAddition from '../addition/column/ColumnAddition'
import StandardAddition from '../addition/standard/StandardAddition'
import StandardMultiplication from '../multiplication/StandardMultiplication'
import { scorePoint, nextQuestion, resetGame } from '../store/gameSlice'
import { getLevelLocale } from '../i18n/levelLocales'
import type { Level } from '../types'
import type { AppDispatch, RootState } from '../store'

interface Feedback { correct: boolean; correctAnswer?: number }
interface Props { level: Level; total: number; onBack: () => void }

export default function GameScreen({ level, total, onBack }: Props) {
  const t        = useTranslation(translations)
  const lang     = useLang()
  const dispatch = useDispatch<AppDispatch>()
  const isTest   = useSelector((s: RootState) => s.game.mode === 'test')
  const levelLabel = getLevelLocale(level.id, lang, level.en, level).label

  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore]             = useState(0)
  const [question, setQuestion]       = useState(() => level.generate())
  const [feedback, setFeedback]       = useState<Feedback | null>(null)
  const [done, setDone]               = useState(false)


  const newQuestion = () => {
    const next = questionNum + 1
    dispatch(nextQuestion())
    if (next >= total) { setDone(true); return }
    setQuestionNum(next)
    setQuestion(level.generate())
    setFeedback(null)
  }

  const handleCorrect = () => {
    dispatch(scorePoint())
    setScore((s) => s + 1)
    setFeedback({ correct: true })
  }
  const handleWrong = (correctAnswer: number) => setFeedback({ correct: false, correctAnswer })

  if (done) {
    return (
      <Summary
        score={score}
        total={total}
        onRetry={() => { dispatch(resetGame()); setQuestionNum(0); setScore(0); setQuestion(level.generate()); setFeedback(null); setDone(false) }}
        onBack={onBack}
      />
    )
  }

  return (
    <div className="game-screen">
      <div className="game-header">
        <span className={`level-badge ${level.className}`}>{levelLabel}</span>
      </div>

      {level.op === 'mul' ? (
        <StandardMultiplication
          key={`${question.a}-${question.b}-${questionNum}`}
          a={question.a} b={question.b}
          onCorrect={handleCorrect} onWrong={handleWrong}
        />
      ) : level.op === 'add' ? (
        level.mode === 'column' ? (
          <ColumnAddition
            key={`${question.a}-${question.b}-${questionNum}`}
            a={question.a} b={question.b}
            onCorrect={handleCorrect} onWrong={handleWrong}
            hideHint={isTest}
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
          hideHint={isTest}
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
            {questionNum + 1 < total ? t('next') : t('showResult')}
          </button>
        </>
      )}
    </div>
  )
}
