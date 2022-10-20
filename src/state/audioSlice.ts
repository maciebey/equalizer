import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { loadState } from '../utils/localStorage'
import { ArtState } from '../interfaces'


const initialState: ArtState = loadState("audio")

const toggleVisibilityFunc = (state: ArtState, action: PayloadAction<number>) => {
  const id = action.payload
  state.audioPlayers[id].visible = !state.audioPlayers[id].visible
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    toggleVisibility: toggleVisibilityFunc
  },
})

// export actions made from createSlice
export const { toggleVisibility } = audioSlice.actions

// export state selectors
export const selectAudioPlayers = (state: RootState) => state.audio.audioPlayers

export default audioSlice.reducer
