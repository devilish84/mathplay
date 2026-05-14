import React, { useState } from 'react'
import { LEVELS } from './levels'
import LevelSelect from '../common/LevelSelect'
import GameScreen from '../common/GameScreen'

export default function SubtractionPage({ onBack }) {
  const [level, setLevel] = useState(null)

  if (!level) {
    return (
      <LevelSelect
        levels={LEVELS}
        title="➖ Vähennyslaskut"
        subtitle="Valitse taso"
        onSelect={setLevel}
        onBack={onBack}
      />
    )
  }

  return <GameScreen level={level} onBack={() => setLevel(null)} />
}
