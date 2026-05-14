import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation, useLang } from '../i18n'
import translations from '../i18n/common/GameScreen.i18n'
import Summary from './Summary'
import ColumnSubtraction from '../subtraction/column/ColumnSubtraction'
import StandardQuestion from '../subtraction/standard/StandardQuestion'
import ColumnAddition from '../addition/column/ColumnAddition'
import StandardAddition from '../addition/standard/StandardAddition'
import StandardMultiplication from '../multiplication/StandardMultiplication'
import { startGame, scorePoint, nextQuestion, endGame } from '../store/gameSlice'
import type { Level } from '../types'
import type { AppDispatch } from '../store'

const QUESTIONS_PER_ROUND = 10

interface Feedback { correct: boolean; correctAnswer?: number }
interface Props { level: Level; onBack: () => void }

export default function GameScreen({ level, onBack }: Props) {
  const t        = useTranslation(translations)
  const lang     = useLang()
  const dispatch = useDispatch<AppDispatch>()
  const levelLabel = lang === 'en' && level.en ? level.en.label : level.label

  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore]             = useState(0)
  const [question, setQuestion]       = useState(() => level.generate())
  const [feedback, setFeedback]       = useState<Feedback | null>(null)
  const [done, setDone]               = useState(false)

  useEffect(() => { dispatch(startGame(QUESTIONS_PER_ROUND)); return () => { dispatch(endGame()) } }, [dispatch])

  const newQuestion = () => {
    const next = questionNum + 1
    dispatch(nextQuestion())
    if (next >= QUESTIONS_PER_ROUND) { setDone(true); return }
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
        total={QUESTIONS_PER_ROUND}
        onRetry={() => { dispatch(startGame(QUESTIONS_PER_ROUND)); setQuestionNum(0); setScore(0); setQuestion(level.generate()); setFeedback(null); setDone(false) }}
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
