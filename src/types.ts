export interface LevelLocale {
  label: string
  title: string
  desc: string
}

export interface Level {
  id: number | string
  icon: string
  className: string
  generate: () => { a: number; b: number }
  mode: 'standard' | 'column'
  op?: 'add' | 'mul'
}

export interface SeqLevel {
  id: string
  icon: string
  className: string
  direction?: 'asc' | 'desc'
  generate: () => { start: number; step: number }
}

export interface Session {
  id: string
  date: string
  mode: string
  levelId: string
  score: number
  total: number
  errors: unknown[]
}

export interface SettingsState {
  language: string
}

export interface ProgressState {
  sessions: Session[]
  weights: Record<string, number>
}
