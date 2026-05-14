import React, { useState } from 'react'
import { SEQ_LEVELS } from './levels'
import LevelSelect from '../common/LevelSelect'
import SequenceGame from './SequenceGame'

export default function SequencePage({ onBack }) {
  const [level, setLevel] = useState(null)

  if (!level) {
    return (
      <LevelSelect
        levels={SEQ_LEVELS}
        title="🔢 Lukujonot"
        subtitle="Valitse taso"
        onSelect={setLevel}
        onBack={onBack}
      />
    )
  }

  return <SequenceGame level={level} onBack={() => setLevel(null)} />
}
