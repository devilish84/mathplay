import { useState } from 'react'
import { ALL_LEVELS } from '../levels'

const CATEGORIES = [
  { id: 'sub', label: 'Vähennyslaskut', icon: '➖' },
  { id: 'add', label: 'Yhteenlaskut',   icon: '➕' },
  { id: 'seq', label: 'Lukujonot',      icon: '🔢' },
]

const STAR_OPTIONS = [1, 2, 3, 4]

function StarRow({ count }) {
  return <span className="task-stars">{'⭐'.repeat(count)}</span>
}

export default function Home({ onSelect }) {
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

  return (
    <div className="home-screen">
      <h1 className="home-title">
        {filterCat
          ? CATEGORIES.find((c) => c.id === filterCat)?.icon + ' ' +
            CATEGORIES.find((c) => c.id === filterCat)?.label
          : '📚 Kaikki tehtävät'}
      </h1>

      <div className="filter-bar">
        <div className="filter-section">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`filter-chip${filterCat === c.id ? ' active' : ''}`}
              onClick={() => toggleCat(c.id)}
            >
              {c.icon} {c.label}
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
        <p className="home-empty">Ei tehtäviä valituilla suodattimilla.</p>
      ) : (
        <div className="task-grid">
          {visible.map((level) => (
            <button
              key={level.id}
              className={`task-card cat-${level.category}`}
              onClick={() => onSelect({ level, category: level.category })}
            >
              <span className="task-cat-label">
                {level.categoryIcon} {level.categoryLabel}
              </span>
              <span className="task-title">{level.title}</span>
              <span className="task-desc">{level.desc}</span>
              <StarRow count={level.stars} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
