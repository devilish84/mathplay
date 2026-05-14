import { useState } from 'react'
import './App.css'
import Toolbar from './common/Toolbar'
import Home from './screens/Home'
import GameScreen from './common/GameScreen'
import SequenceGame from './sequences/SequenceGame'
import type { AnyEnrichedLevel, EnrichedLevel, EnrichedSeqLevel } from './levels'

interface Selection {
  level: AnyEnrichedLevel
  category: string
}

function isSeqLevel(l: AnyEnrichedLevel): l is EnrichedSeqLevel {
  return l.category === 'seq'
}

export default function App() {
  const [selection, setSelection] = useState<Selection | null>(null)

  return (
    <div className="app-shell">
      <Toolbar />
      <div className="app-content">
        {!selection ? (
          <Home onSelect={setSelection} />
        ) : isSeqLevel(selection.level) ? (
          <SequenceGame
            level={selection.level}
            onBack={() => setSelection(null)}
          />
        ) : (
          <GameScreen
            level={selection.level as EnrichedLevel}
            onBack={() => setSelection(null)}
          />
        )}
      </div>
    </div>
  )
}
