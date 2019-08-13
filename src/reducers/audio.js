import { types } from '../actions/audio'

export default function audioReducer (state = {}, action) {
  switch (action.type) {
    case types.TOGGLE_VISIBILITY:
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
