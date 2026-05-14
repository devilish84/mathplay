import { createSlice } from '@reduxjs/toolkit'

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    sessions: [],   // { id, date, mode, levelId, score, total, errors[] }
    weights: {},    // { "subtraction-column-lv3": 1.8, ... }
  },
  reducers: {
    recordSession(state, action) {
      const { id, date, mode, levelId, score, total, errors } = action.payload
      state.sessions.push({ id, date, mode, levelId, score, total, errors })

      // Update weight for this level
      const key = `${mode}-${levelId}`
      const errorPct = total > 0 ? (total - score) / total : 0
      const current = state.weights[key] ?? 1.0

      if (errorPct > 0.4) {
        state.weights[key] = Math.min(3.0, +(current + 0.3).toFixed(1))
      } else if (errorPct < 0.2) {
        state.weights[key] = Math.max(1.0, +(current - 0.1).toFixed(1))
      }
    },
    clearHistory(state) {
      state.sessions = []
      state.weights = {}
    },
  },
})

export const { recordSession, clearHistory } = progressSlice.actions
export default progressSlice.reducer
