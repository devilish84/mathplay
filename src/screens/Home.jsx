import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../store/settingsSlice'
import { useTranslation, LANGUAGES } from '../i18n'

const CATEGORIES = [
  { id: 'add',   key: 'addition',    icon: '➕', color: 'cat-add', available: true  },
  { id: 'sub',   key: 'subtraction', icon: '➖', color: 'cat-sub', available: true  },
  { id: 'seq',   key: 'sequences',   icon: '🔢', color: 'cat-seq', available: true  },
  { id: 'units', key: 'units',       icon: '📏', color: 'cat-units', available: false },
]

export default function Home({ onSelect }) {
  const t        = useTranslation()
  const dispatch = useDispatch()
  const language = useSelector((s) => s.settings.language)

  return (
    <div className="home-screen">
      <header className="home-header">
        <h1 className="home-title">{t('home.title')}</h1>
        <select
          className="lang-select"
          value={language}
          onChange={(e) => dispatch(setLanguage(e.target.value))}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
      </header>

      <p className="home-subtitle">{t('home.subtitle')}</p>

      <div className="home-grid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-card ${cat.color}${cat.available ? '' : ' cat-disabled'}`}
            onClick={() => cat.available && onSelect(cat.id)}
            disabled={!cat.available}
          >
            <span className="cat-icon">{cat.icon}</span>
            <div className="cat-body">
              <div className="cat-name">{t(`home.categories.${cat.key}`)}</div>
              <div className="cat-range">
                {cat.available
                  ? t(`home.levelRange.${cat.key}`)
                  : t('home.categories.comingSoon')}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
