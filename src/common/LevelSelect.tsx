import type { Level, SeqLevel } from '../types'

type AnyLevel = Level | SeqLevel

interface Props {
  levels: AnyLevel[]
  title: string
  subtitle: string
  onSelect: (lv: AnyLevel) => void
  onBack?: () => void
}

export default function LevelSelect({ levels, title, subtitle, onSelect, onBack }: Props) {
  return (
    <div className="level-select">
      {onBack && <button className="back-btn" style={{ marginBottom: 16 }} onClick={onBack}>← Takaisin</button>}
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
      <div className="level-buttons">
        {levels.map((lv) => (
          <button key={lv.id} className={`level-btn ${lv.className}`} onClick={() => onSelect(lv)}>
            <span className="lv-icon">{lv.icon}</span>
            <div>
              <div>{lv.title}</div>
              <div className="lv-desc">{lv.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
