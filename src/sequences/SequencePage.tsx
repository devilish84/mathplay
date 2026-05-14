import { useState } from 'react'
import { SEQ_LEVELS } from './levels'
import LevelSelect from '../common/LevelSelect'
import SequenceGame from './SequenceGame'
import type { SeqLevel } from '../types'

interface Props { onBack: () => void }

export default function SequencePage({ onBack }: Props) {
  const [level, setLevel] = useState<SeqLevel | null>(null)

  if (!level) {
    return (
      <LevelSelect
        levels={SEQ_LEVELS}
        title="🔢 Lukujonot"
        subtitle="Valitse taso"
        onSelect={(lv) => setLevel(lv as any)}
        onBack={onBack}
      />
    )
  }

  return <SequenceGame level={level} onBack={() => setLevel(null)} />
}
