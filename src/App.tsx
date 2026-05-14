import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Toolbar from './common/Toolbar'
import Home from './screens/Home'
import GameScreen from './common/GameScreen'
import SequenceGame from './sequences/SequenceGame'
import MeasurementGame from './measurements/MeasurementGame'
import GameSetupDialog from './common/GameSetupDialog'
import { startGame, endGame } from './store/gameSlice'
import { recordSession } from './store/progressSlice'
import type { AppDispatch, RootState } from './store'
import type { AnyEnrichedLevel, EnrichedLevel, EnrichedSeqLevel, EnrichedMeasureLevel } from './levels'
import type { GameMode } from './store/gameSlice'

interface Selection {
  level: AnyEnrichedLevel
  category: string
}

interface GameConfig {
  total: number
  mode: GameMode
  timeLimit: number
}

function isSeqLevel(l: AnyEnrichedLevel): l is EnrichedSeqLevel {
  return l.category === 'seq'
}

function isMeasureLevel(l: AnyEnrichedLevel): l is EnrichedMeasureLevel {
  return l.category === 'measure'
}

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const game     = useSelector((s: RootState) => s.game)
  const [pending, setPending]     = useState<Selection | null>(null)
  const [selection, setSelection] = useState<Selection | null>(null)
  const [config, setConfig]       = useState<GameConfig | null>(null)

  const handleSelect = (sel: Selection) => {
    setPending(sel)
    setSelection(null)
    setConfig(null)
  }

  const handleStart = (total: number, mode: GameMode, timeLimit: number) => {
    dispatch(startGame({ total, mode, timeLimit }))
    setConfig({ total, mode, timeLimit })
    setSelection(pending)
    setPending(null)
  }

  const handleCancel = () => setPending(null)

  const handleBack = () => {
    if (game.active && game.question > 0) {
      dispatch(recordSession({
        id:      crypto.randomUUID(),
        date:    new Date().toISOString(),
        mode:    game.mode,
        levelId: selection?.level.id?.toString() ?? '',
        score:   game.score,
        total:   game.question,
        errors:  [],
      }))
    }
    dispatch(endGame())
    setSelection(null)
    setConfig(null)
    setPending(null)
  }

  const showBack = selection ? handleBack : undefined

  return (
    <div className="app-shell">
      <Toolbar onBack={showBack} />
      {pending && (
        <GameSetupDialog onStart={handleStart} onCancel={handleCancel} />
      )}
      <div className="app-content">
        {!selection ? (
          <Home onSelect={handleSelect} />
        ) : isSeqLevel(selection.level) ? (
          <SequenceGame
            level={selection.level}
            total={config?.total ?? 10}
            onBack={handleBack}
          />
        ) : isMeasureLevel(selection.level) ? (
          <MeasurementGame
            level={selection.level}
            total={config?.total ?? 10}
            onBack={handleBack}
          />
        ) : (
          <GameScreen
            level={selection.level as EnrichedLevel}
            total={config?.total ?? 10}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}
