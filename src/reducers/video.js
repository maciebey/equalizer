import { types } from '../actions/video'

export default function videoReducer (state = {}, action) {
  switch (action.type) {
    case types.SEARCH_VIDEOS_PENDING:
      return {
        ...state,
        searchVideoState: {
          ...state.searchVideoState,
          pending: true
        }
      }
    case types.SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        searchVideoState: {
          ...state.searchVideoState,
          pending: false,
          results: action.results
        }
      }
    case types.SEARCH_VIDEOS_ERROR:
      return {
        ...state,
        searchVideoState: {
          ...state.searchVideoState,
          pending: false,
          error: action.error
        }
      }
    case types.ADD_SINGLE:
      return {
        ...state,
        playlist: [...state.playlist, action.video]
      }
    case types.REMOVE_SINGLE:
      return {
        ...state,
        playlist: state.playlist.filter(item => item.id !== action.id)
      }
    case types.SET_ACTIVE_VIDEO:
      return {
        ...state,
        activeVideo: action.id
      }
    default:
      return state
  }
}
