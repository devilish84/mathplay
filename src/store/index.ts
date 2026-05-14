import { configureStore, combineReducers } from '@reduxjs/toolkit'
import settingsReducer from './settingsSlice'
import progressReducer from './progressSlice'
import gameReducer from './gameSlice'

const STORAGE_KEY = 'mathplay_state'

const rootReducer = combineReducers({
  settings: settingsReducer,
  progress: progressReducer,
  game: gameReducer,
})

const store = configureStore({
  reducer: rootReducer,
  preloadedState: (() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY)
      return s ? JSON.parse(s) as ReturnType<typeof rootReducer> : undefined
    } catch {
      return undefined
    }
  })(),
})

store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()))
  } catch {}
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
