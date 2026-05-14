import { useState } from 'react'
import { useTranslation } from '../i18n'
import translations from '../i18n/common/GameSetupDialog.i18n'
import type { GameMode } from '../store/gameSlice'

interface Props {
  onStart: (total: number, mode: GameMode, timeLimit: number) => void
  onCancel: () => void
}

const COUNTS    = [5, 10, 15, 20, 30]
const TIME_OPTS = [10, 15, 30, 45, 60]

export default function GameSetupDialog({ onStart, onCancel }: Props) {
  const t = useTranslation(translations)
  const [total, setTotal]       = useState(10)
  const [mode, setMode]         = useState<GameMode>('practice')
  const [minutes, setMinutes]   = useState(60)

  const handleStart = () => {
    onStart(total, mode, mode === 'test' ? minutes * 60 : 0)
  }

  return (
    <div className="dialog-backdrop">
      <div className="dialog">
        <h2 className="dialog-title">{t('title')}</h2>

        <div className="dialog-field">
          <label className="dialog-label">{t('questionCount')}</label>
          <div className="dialog-options">
            {COUNTS.map((n) => (
              <button
                key={n}
                className={`dialog-opt-btn${total === n ? ' selected' : ''}`}
                onClick={() => setTotal(n)}
              >{n}</button>
            ))}
          </div>
        </div>

        <div className="dialog-field">
          <label className="dialog-label">{t('mode')}</label>
          <div className="dialog-options">
            <button
              className={`dialog-opt-btn${mode === 'practice' ? ' selected' : ''}`}
              onClick={() => setMode('practice')}
            >{t('practice')}</button>
            <button
              className={`dialog-opt-btn${mode === 'test' ? ' selected' : ''}`}
              onClick={() => setMode('test')}
            >{t('test')}</button>
          </div>
        </div>

        {mode === 'test' && (
          <div className="dialog-field">
            <label className="dialog-label">{t('timeLimit')}</label>
            <div className="dialog-options">
              {TIME_OPTS.map((m) => (
                <button
                  key={m}
                  className={`dialog-opt-btn${minutes === m ? ' selected' : ''}`}
                  onClick={() => setMinutes(m)}
                >{m} {t('minutes')}</button>
              ))}
            </div>
          </div>
        )}

        <div className="dialog-actions">
          <button className="dialog-cancel-btn" onClick={onCancel}>{t('cancel')}</button>
          <button className="dialog-start-btn" onClick={handleStart}>{t('start')}</button>
        </div>
      </div>
    </div>
  )
}
