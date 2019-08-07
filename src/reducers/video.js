import { types } from '../actions/video'

const initialState = {
  searchVideoState: {
    pending: false,
    results: null,
    error: null
  },
  activeVideo: 'rJ6eGtsgbfM',
  playlist: [
    {
      id: 'rJ6eGtsgbfM',
      name: 'Animal 1'
    },
    {
      id: '2zcECHzNcO8',
      name: 'Animal 2'
    },
    {
      id: 'hyIPaz3UJAI',
      name: 'Animal 3'
    }
  ]
}

export default function videoReducer (state = initialState, action) {
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
        playlist: [
          ...state.playlist,
          {
            id: action.name,
            name: action.name
          }
        ]
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
