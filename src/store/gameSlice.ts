import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  active: boolean
  score: number
  question: number
  total: number
}

const initialState: GameState = { active: false, score: 0, question: 0, total: 0 }

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<number>) => {
      state.active   = true
      state.score    = 0
      state.question = 0
      state.total    = action.payload
    },
    scorePoint: (state) => { state.score += 1 },
    nextQuestion: (state) => { state.question += 1 },
    endGame: (state) => { state.active = false },
  },
})

export const { startGame, scorePoint, nextQuestion, endGame } = gameSlice.actions
export default gameSlice.reducer
