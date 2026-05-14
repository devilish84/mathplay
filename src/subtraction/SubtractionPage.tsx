import { useState } from 'react'
import { LEVELS } from './levels'
import LevelSelect from '../common/LevelSelect'
import GameScreen from '../common/GameScreen'
import type { Level } from '../types'

interface Props { onBack: () => void }

export default function SubtractionPage({ onBack }: Props) {
  const [level, setLevel] = useState<Level | null>(null)

  if (!level) {
    return (
      <LevelSelect
        levels={LEVELS}
        title="➖ Vähennyslaskut"
        subtitle="Valitse taso"
        onSelect={(lv) => setLevel(lv as any)}
        onBack={onBack}
      />
    )
  }

  return <GameScreen level={level} onBack={() => setLevel(null)} />
}
