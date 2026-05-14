import { useState } from 'react'
import './App.css'
import Toolbar from './common/Toolbar'
import Home from './screens/Home'
import GameScreen from './common/GameScreen'
import SequenceGame from './sequences/SequenceGame'

export default function App() {
  const [selection, setSelection] = useState(null) // { level, category }

  return (
    <div className="app-shell">
      <Toolbar />
      <div className="app-content">
        {!selection ? (
          <Home onSelect={setSelection} />
        ) : selection.category === 'seq' ? (
          <SequenceGame
            level={selection.level}
            onBack={() => setSelection(null)}
          />
        ) : (
          <GameScreen
            level={selection.level}
            onBack={() => setSelection(null)}
          />
        )}
      </div>
    </div>
  )
}
