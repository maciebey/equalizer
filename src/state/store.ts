import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import videoReducer from './videoSlice'
import audioReducer from './audioSlice'
import { saveState } from '../utils/localStorage'

const rootReducer = combineReducers({
  audio: audioReducer,
  video: videoReducer
})

const store = configureStore({
  reducer: rootReducer,
})

store.subscribe(() => {
  saveState({
    video: {
      playlist: store.getState().video.playlist
    }
  })
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
