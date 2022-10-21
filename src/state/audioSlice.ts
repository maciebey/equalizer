import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { loadState } from '../utils/localStorage'
import { ArtState } from '../interfaces'

const initialState: ArtState = loadState("audio")

const toggleVisibilityFunc = (state: ArtState, action: PayloadAction<number>) => {
  const id = action.payload
  state.audioPlayers[id].visible = !state.audioPlayers[id].visible
}

const toggleDrawerFunc = (state: ArtState, action: PayloadAction<boolean>) => {
  state.drawerOpen = action.payload
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    toggleVisibility: toggleVisibilityFunc,
    toggleDrawer: toggleDrawerFunc
  },
})

// export actions made from createSlice
export const { toggleVisibility, toggleDrawer } = audioSlice.actions

// export state selectors
export const selectAudioPlayers = (state: RootState) => state.audio.audioPlayers
export const selectDrawerState = (state: RootState) => state.audio.drawerOpen

export default audioSlice.reducer
