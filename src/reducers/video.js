import {
  ADD_SINGLE,
  REMOVE_SINGLE,
  SET_ACTIVE_VIDEO
} from '../actions/video'

const initialState = {
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
    case ADD_SINGLE:
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
    case REMOVE_SINGLE:
      return {
        ...state,
        playlist: state.playlist.filter(item => item.id !== action.id)
      }
    case SET_ACTIVE_VIDEO:
      return {
        ...state,
        activeVideo: action.id
      }
    default:
      return state
  }
}
