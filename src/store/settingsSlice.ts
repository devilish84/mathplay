import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { SettingsState } from '../types'

const initialState: SettingsState = { language: 'fi' }

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
