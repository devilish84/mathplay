import React from 'react'

export default function Summary({ score, total, onRetry, onBack, level }) {
  const pct = Math.round((score / total) * 100)
  const emoji = pct === 100 ? '🏆' : pct >= 70 ? '🌟' : pct >= 40 ? '👍' : '💪'
  const msg =
    pct === 100
      ? 'Täydellinen tulos!'
      : pct >= 70
      ? 'Todella hyvä työ!'
      : pct >= 40
      ? 'Hyvä yritys!'
      : 'Harjoittele lisää, se auttaa!'

  return (
    <div className="summary">
      <div className="emoji-big">{emoji}</div>
      <h2>{msg}</h2>
      <div className="result-text">
        Sait <strong>{score}/{total}</strong> oikein ({pct}%)
      </div>
      <div className="summary-buttons">
        <button className="retry-btn" onClick={onRetry}>
          🔄 Pelaa uudelleen
        </button>
        <button className="home-btn" onClick={onBack}>
          ← Valitse taso
        </button>
      </div>
    </div>
  )
}
