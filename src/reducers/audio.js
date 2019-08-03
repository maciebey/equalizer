import {
  TOGGLE_VISIBILITY
} from '../actions/audio'

const initialState = {
  audioPlayers: [
    {
      id: 1,
      name: 'Rain',
      file: 'rain1.mp3',
      background: 'rain',
      visible: true
    },
    {
      id: 2,
      name: 'Star Ship',
      file: 'voy_bridge.mp3',
      background: 'space',
      visible: true
    }
  ]
}

export default function audioReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return {
        ...state,
        audioPlayers: state.audioPlayers.map(
          (audioPlayer) => {
            return audioPlayer.id === action.id ? { ...audioPlayer, visible: !audioPlayer.visible } : audioPlayer
          })
      }
    default:
      return state
  }
}
