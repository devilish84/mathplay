import React, { useState } from 'react'
import Summary from './Summary'
import ColumnSubtraction from '../subtraction/column/ColumnSubtraction'
import StandardQuestion from '../subtraction/standard/StandardQuestion'
import ColumnAddition from '../addition/column/ColumnAddition'
import StandardAddition from '../addition/standard/StandardAddition'

const QUESTIONS_PER_ROUND = 10

export default function GameScreen({ level, onBack }) {
  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(() => level.generate())
  const [feedback, setFeedback] = useState(null)
  const [done, setDone] = useState(false)

  const newQuestion = () => {
    const next = questionNum + 1
    if (next >= QUESTIONS_PER_ROUND) {
      setDone(true)
      return
    }
    setQuestionNum(next)
    setQuestion(level.generate())
    setFeedback(null)
  }

  const handleCorrect = () => {
    setScore((s) => s + 1)
    setFeedback({ correct: true })
  }

  const handleWrong = (correctAnswer) => {
    setFeedback({ correct: false, correctAnswer })
  }

  if (done) {
    return (
      <Summary
        score={score}
        total={QUESTIONS_PER_ROUND}
        onRetry={() => {
          setQuestionNum(0)
          setScore(0)
          setQuestion(level.generate())
          setFeedback(null)
          setDone(false)
        }}
        onBack={onBack}
        level={level}
      />
    )
  }

  const progress = (questionNum / QUESTIONS_PER_ROUND) * 100

  return (
    <div className="game-screen">
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>← Takaisin</button>
        <span className={`level-badge ${level.className}`}>{level.label}</span>
        <div className="score-display">
          Pisteet: <span>{score}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div style={{ textAlign: 'center', color: '#b2bec3', marginBottom: 20, fontSize: '0.9rem' }}>
        Kysymys {questionNum + 1} / {QUESTIONS_PER_ROUND}
      </div>

      {level.op === 'add' ? (
        level.mode === 'column' ? (
          <ColumnAddition
            key={`${question.a}-${question.b}-${questionNum}`}
            a={question.a}
            b={question.b}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
          />
        ) : (
          <StandardAddition
            key={`${question.a}-${question.b}-${questionNum}`}
            a={question.a}
            b={question.b}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
          />
        )
      ) : level.mode === 'column' ? (
        <ColumnSubtraction
          key={`${question.a}-${question.b}-${questionNum}`}
          a={question.a}
          b={question.b}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          answered={!!feedback}
        />
      ) : (
        <StandardQuestion
          key={`${question.a}-${question.b}-${questionNum}`}
          a={question.a}
          b={question.b}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}

      {feedback && (
        <>
          <div className={`feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
            {feedback.correct
              ? '🎉 Oikein! Hienosti tehty!'
              : `😅 Ei ihan! Oikea vastaus oli ${feedback.correctAnswer}`}
          </div>
          <button className="next-btn" onClick={newQuestion}>
            {questionNum + 1 < QUESTIONS_PER_ROUND ? 'Seuraava →' : 'Näytä tulos'}
          </button>
        </>
      )}
    </div>
  )
}
