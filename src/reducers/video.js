import {
  ADD_SINGLE,
  REMOVE_SINGLE
} from '../actions/video'

let counter = 4
const initialState = {
  playlist: [
    {
      id: 0,
      name: 'First'
    },
    {
      id: 1,
      name: 'Second'
    },
    {
      id: 2,
      name: 'Third'
    },
    {
      id: 3,
      name: 'Fourth'
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
            id: counter++,
            name: action.name
          }
        ]
      }
    case REMOVE_SINGLE:
      return {
        ...state,
        playlist: state.playlist.filter(item => item.id !== action.id)
      }
    default:
      return state
  }
}
