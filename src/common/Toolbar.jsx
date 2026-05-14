import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../store/settingsSlice'
import { LANGUAGES } from '../i18n'

export default function Toolbar() {
  const dispatch  = useDispatch()
  const language  = useSelector((s) => s.settings.language)
  const sessions  = useSelector((s) => s.progress.sessions)

  const total   = sessions.reduce((sum, s) => sum + s.total, 0)
  const correct = sessions.reduce((sum, s) => sum + s.score, 0)
  const pct     = total > 0 ? Math.round((correct / total) * 100) : null

  return (
    <div className="toolbar">
      <span className="toolbar-brand">🧮 Mathplay</span>

      <div className="toolbar-progress">
        {total > 0 && (
          <span>
            <strong>{total}</strong> tehtävää
            {pct !== null && <> · <strong>{pct}%</strong> oikein</>}
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
