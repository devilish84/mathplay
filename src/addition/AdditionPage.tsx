import { useState } from 'react'
import { ADD_LEVELS } from './levels'
import LevelSelect from '../common/LevelSelect'
import GameScreen from '../common/GameScreen'
import type { Level } from '../types'

interface Props { onBack: () => void }

export default function AdditionPage({ onBack }: Props) {
  const [level, setLevel] = useState<Level | null>(null)

  if (!level) {
    return (
      <LevelSelect
        levels={ADD_LEVELS}
        title="➕ Yhteenlaskut"
        subtitle="Valitse taso"
        onSelect={(lv) => setLevel(lv as any)}
        onBack={onBack}
      />
    )
  }

  return <GameScreen level={level} onBack={() => setLevel(null)} />
}
