import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../store/settingsSlice'
import { useTranslation, LANGUAGES } from '../i18n'
import translations from './Toolbar.i18n'
import type { RootState } from '../store'
import type { Session } from '../types'

export default function Toolbar() {
  const t        = useTranslation(translations)
  const dispatch = useDispatch()
  const language = useSelector((s: RootState) => s.settings.language)
  const sessions = useSelector((s: RootState) => s.progress.sessions)

  const total   = sessions.reduce((sum: number, s: Session) => sum + s.total, 0)
  const correct = sessions.reduce((sum: number, s: Session) => sum + s.score, 0)
  const pct     = total > 0 ? Math.round((correct / total) * 100) : null

  return (
    <div className="toolbar">
      <span className="toolbar-brand">🧮 Mathplay</span>

      <div className="toolbar-progress">
        {total > 0 && (
          <span>
            <strong>{total}</strong> {t('tasks')}
            {pct !== null && <> · <strong>{pct}%</strong> {t('correct')}</>}
          </span>
        )}
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
    </div>
  )
}
