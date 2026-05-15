import { useState } from 'react'
import { useTranslation, useLang } from '../i18n'
import translations from '../i18n/screens/Home.i18n'
import { ALL_LEVELS, type AnyEnrichedLevel } from '../levels'
import { getLevelLocale } from '../i18n/levelLocales'

interface Selection { level: AnyEnrichedLevel; category: string }

const CATEGORIES = [
  { id: 'sub',     icon: '➖' },
  { id: 'add',     icon: '➕' },
  { id: 'mul',     icon: '✖️' },
  { id: 'seq',     icon: '🔢' },
  { id: 'measure', icon: '📏' },
] as const

type CategoryId = typeof CATEGORIES[number]['id']
const STAR_OPTIONS = [1, 2, 3, 4] as const

function StarRow({ count }: { count: number }) {
  return <span className="task-stars">{'⭐'.repeat(count)}</span>
}

interface Props { onSelect: (s: Selection) => void }

export default function Home({ onSelect }: Props) {
  const t    = useTranslation(translations)
  const lang = useLang()

  const [filterCat,   setFilterCat]   = useState<CategoryId | null>(null)
  const [filterStars, setFilterStars] = useState<number | null>(null)

  const visible = ALL_LEVELS.filter((l) => {
    if (filterCat   && l.category !== filterCat)   return false
    if (filterStars && l.stars    !== filterStars) return false
    return true
  })

  const toggleCat   = (id: CategoryId) => setFilterCat((prev)  => prev === id ? null : id)
  const toggleStars = (n: number)      => setFilterStars((prev) => prev === n  ? null : n)

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
            const volI18n = 'i18n' in level && level.i18n ? (level.i18n as Record<string, {label:string;title:string;desc:string}>)[lang] ?? (level.i18n as Record<string, {label:string;title:string;desc:string}>)['en'] : null
            const loc = volI18n ?? getLevelLocale(level.id, lang)
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
      <footer className="home-footer">
        <span>© {new Date().getFullYear()} </span>
        <a href="https://x84.fi" target="_blank" rel="noopener noreferrer" className="home-footer-link">
          Mika Mähönen
        </a>
        <span className="home-footer-sep">·</span>
        <a
          href="https://opensource.org/licenses/MIT"
          target="_blank"
          rel="noopener noreferrer"
          className="home-footer-link"
        >
          MIT License
        </a>
        <span className="home-footer-sep">·</span>
        <a
          href="https://github.com/devilish84/mathplay"
          target="_blank"
          rel="noopener noreferrer"
          className="home-footer-link"
        >
          GitHub
        </a>
        <span className="home-footer-sep">·</span>
        <a
          href="https://claude.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="home-footer-link home-footer-claude"
        >
          <span className="home-footer-claude-icon">✦</span> Built with Claude
        </a>
      </footer>
    </div>
  )
}
