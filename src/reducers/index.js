import { combineReducers } from 'redux'
import videoReducer from './video'
import audioReducer from './audio'

export default combineReducers({
  video: videoReducer,
  audio: audioReducer
})
