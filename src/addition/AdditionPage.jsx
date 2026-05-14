import React, { useState } from 'react'
import { ADD_LEVELS } from './levels'
import LevelSelect from '../common/LevelSelect'
import GameScreen from '../common/GameScreen'

export default function AdditionPage({ onBack }) {
  const [level, setLevel] = useState(null)

  if (!level) {
    return (
      <LevelSelect
        levels={ADD_LEVELS}
        title="➕ Yhteenlaskut"
        subtitle="Valitse taso"
        onSelect={setLevel}
        onBack={onBack}
      />
    )
  }

  return <GameScreen level={level} onBack={() => setLevel(null)} />
}
