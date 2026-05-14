import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type GameMode = 'practice' | 'test'

export interface StartGamePayload {
  total: number
  mode: GameMode
  timeLimit: number  // seconds; 0 = no limit
}

interface GameState {
  active: boolean
  score: number
  question: number
  total: number
  mode: GameMode
  timeLimit: number
  timeRemaining: number
}

const initialState: GameState = {
  active: false, score: 0, question: 0, total: 0,
  mode: 'practice', timeLimit: 0, timeRemaining: 0,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<StartGamePayload>) => {
      state.active        = true
      state.score         = 0
      state.question      = 0
      state.total         = action.payload.total
      state.mode          = action.payload.mode
      state.timeLimit     = action.payload.timeLimit
      state.timeRemaining = action.payload.timeLimit
    },
    scorePoint:   (state) => { state.score    += 1 },
    nextQuestion: (state) => { state.question += 1 },
    tickTimer:    (state) => { if (state.timeRemaining > 0) state.timeRemaining -= 1 },
    resetGame:    (state) => { state.score = 0; state.question = 0; state.timeRemaining = state.timeLimit },
    endGame:      (state) => { state.active = false },
  },
})

export const { startGame, scorePoint, nextQuestion, tickTimer, resetGame, endGame } = gameSlice.actions
export default gameSlice.reducer
