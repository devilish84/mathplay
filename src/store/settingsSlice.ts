import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { SettingsState } from '../types'

const SUPPORTED = ['fi', 'en', 'sv', 'nb', 'de', 'es', 'pt', 'cs', 'et']

function detectLanguage(): string {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const code = tag.split('-')[0].toLowerCase()
    if (SUPPORTED.includes(code)) return code
  }
  return 'en'
}

const initialState: SettingsState = { language: detectLanguage() }

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = settingsSlice.actions
export default settingsSlice.reducer
