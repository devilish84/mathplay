import { useState } from 'react'
import { useTranslation, useLang } from '../i18n'
import translations from './Home.i18n'
import { ALL_LEVELS } from '../levels'

const CATEGORIES = [
  { id: 'sub', icon: '➖' },
  { id: 'add', icon: '➕' },
  { id: 'seq', icon: '🔢' },
]

const STAR_OPTIONS = [1, 2, 3, 4]

function StarRow({ count }) {
  return <span className="task-stars">{'⭐'.repeat(count)}</span>
}

export default function Home({ onSelect }) {
  const t    = useTranslation(translations)
  const lang = useLang()

  const [filterCat,   setFilterCat]   = useState(null)
  const [filterStars, setFilterStars] = useState(null)

  const visible = ALL_LEVELS.filter((l) => {
    if (filterCat   && l.category !== filterCat)   return false
    if (filterStars && l.stars    !== filterStars) return false
    return true
  })

  function toggleCat(id) {
    setFilterCat((prev) => (prev === id ? null : id))
  }

  function toggleStars(n) {
    setFilterStars((prev) => (prev === n ? null : n))
  }

  const activeCat = filterCat ? CATEGORIES.find((c) => c.id === filterCat) : null

  return (
    <div className="home-screen">
      <h1 className="home-title">
        {activeCat
          ? `${activeCat.icon} ${t(`categories.${filterCat}`)}`
          : t('allTasks')}
      </h1>

      <div className="filter-bar">
        <div className="filter-section">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`filter-chip${filterCat === c.id ? ' active' : ''}`}
              onClick={() => toggleCat(c.id)}
            >
              {c.icon} {t(`categories.${c.id}`)}
            </button>
          ))}
        </div>

        <div className="filter-divider" />

        <div className="filter-section">
          {STAR_OPTIONS.map((n) => (
            <button
              key={n}
              className={`filter-chip${filterStars === n ? ' active' : ''}`}
              onClick={() => toggleStars(n)}
            >
              {'⭐'.repeat(n)}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="home-empty">{t('empty')}</p>
      ) : (
        <div className="task-grid">
          {visible.map((level) => {
            const loc = lang === 'en' && level.en ? level.en : level
            return (
              <button
                key={level.id}
                className={`task-card cat-${level.category}`}
                onClick={() => onSelect({ level, category: level.category })}
              >
                <span className="task-cat-label">
                  {level.categoryIcon} {t(`categories.${level.category}`)}
                </span>
                <span className="task-title">{loc.title}</span>
                <span className="task-desc">{loc.desc}</span>
                <StarRow count={level.stars} />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
