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
      snippet: {
        title: 'Animal Crossing Gamecube Full Theme Song (High Quality)',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/rJ6eGtsgbfM/default.jpg',
            width: 120,
            height: 90
          }
        }
      }
    },
    {
      id: '2zcECHzNcO8',
      snippet: {
        title: 'Animal Crossing Soundtrack - Working for Tom Nook',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/2zcECHzNcO8/default.jpg',
            width: 120,
            height: 90
          }
        }
      }
    },
    {
      id: 'hyIPaz3UJAI',
      snippet: {
        title: 'Animal Crossing - Wild World [OST] 12 AM Hourly Music',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/hyIPaz3UJAI/default.jpg',
            width: 120,
            height: 90
          }
        }
      }
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
