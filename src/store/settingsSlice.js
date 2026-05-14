import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    language: 'fi',
  },
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = settingsSlice.actions
export default settingsSlice.reducer
