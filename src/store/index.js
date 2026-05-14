import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settingsSlice'
import progressReducer from './progressSlice'

const STORAGE_KEY = 'mathplay_state'

function loadState() {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : undefined
  } catch {
    return undefined
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    progress: progressReducer,
  },
  preloadedState: loadState(),
})

store.subscribe(() => saveState(store.getState()))

export default store
