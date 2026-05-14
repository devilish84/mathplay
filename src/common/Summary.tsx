import { useTranslation } from '../i18n'
import translations from './Summary.i18n'

interface Props {
  score: number
  total: number
  onRetry: () => void
  onBack: () => void
}

export default function Summary({ score, total, onRetry, onBack }: Props) {
  const t   = useTranslation(translations)
  const pct = Math.round((score / total) * 100)

  const emoji = pct === 100 ? '🏆' : pct >= 70 ? '🌟' : pct >= 40 ? '👍' : '💪'
  const msg   = pct === 100 ? t('perfect') : pct >= 70 ? t('great') : pct >= 40 ? t('good') : t('keepGoing')

  return (
    <div className="summary">
      <div className="emoji-big">{emoji}</div>
      <h2>{msg}</h2>
      <div className="result-text">{t('result', { score, total, pct })}</div>
      <div className="summary-buttons">
        <button className="retry-btn" onClick={onRetry}>{t('retry')}</button>
        <button className="home-btn"  onClick={onBack}>{t('back')}</button>
      </div>
    </div>
  )
}
