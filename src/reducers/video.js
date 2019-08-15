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
    case types.SEARCH_VIDEOS_SUCCESS_LOAD_MORE:
      const newResults = {
        ...action.results,
        items: [...state.searchVideoState.results.items, ...action.results.items]
      }
      return {
        ...state,
        searchVideoState: {
          ...state.searchVideoState,
          pending: false,
          results: newResults
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
      // if removing last item
      if (state.playlist.length === 1) {
        return {
          ...state,
          activeVideo: null,
          playlist: []
        }
      }

      // need to check if we're removing the last video in playlist
      if (state.activeVideo === (state.playlist.length - 1)) {
        return {
          ...state,
          activeVideo: 0,
          playlist: state.playlist.filter((item, index) => index !== action.index)
        }
      }

      return {
        ...state,
        playlist: state.playlist.filter((item, index) => index !== action.index)
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
