import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../store/settingsSlice'
import { tickTimer, endGame } from '../store/gameSlice'
import { useTranslation, LANGUAGES } from '../i18n'
import translations from '../i18n/common/Toolbar.i18n'
import type { AppDispatch, RootState } from '../store'

interface Props { onBack?: () => void }

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function Toolbar({ onBack }: Props) {
  const t        = useTranslation(translations)
  const dispatch = useDispatch<AppDispatch>()
  const language = useSelector((s: RootState) => s.settings.language)
  const game     = useSelector((s: RootState) => s.game)


  const isTimedTest = game.active && game.mode === 'test' && game.timeLimit > 0

  useEffect(() => {
    if (!isTimedTest) return
    if (game.timeRemaining <= 0) { dispatch(endGame()); return }
    const id = setInterval(() => dispatch(tickTimer()), 1000)
    return () => clearInterval(id)
  }, [isTimedTest, game.timeRemaining, dispatch])

  return (
    <div className="toolbar">
      <span className="toolbar-brand">🧮 Mathplay</span>

      <div className="toolbar-progress">
        {game.active ? (
          <>
            <div className="toolbar-game-progress">
              <div
                className="toolbar-game-fill"
                style={{ width: `${(game.question / game.total) * 100}%` }}
              />
            </div>
            <span>
              {game.question} / <strong>{game.total}</strong> {t('tasks')} · <strong className="score-correct">{game.score}</strong> {t('correct')} · <strong className="score-wrong">{Math.max(0, game.question - game.score)}</strong> {t('wrong')}
            </span>
            {isTimedTest && (
              <span className={`toolbar-timer${game.timeRemaining <= 60 ? ' toolbar-timer--urgent' : ''}`}>
                ⏱ {formatTime(game.timeRemaining)}
              </span>
            )}
          </>
        ) : null}
      </div>

      <select
        className="lang-select"
        value={language}
        onChange={(e) => dispatch(setLanguage(e.target.value))}
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>

      {onBack && (
        <button className="back-btn" onClick={onBack}>{t('back')}</button>
      )}
    </div>
  )
}
