import { searchRequest } from '../services/youtube.service'

export const types = {
  ADD_SINGLE: 'ADD_SINGLE',
  REMOVE_SINGLE: 'REMOVE_SINGLE',
  SET_ACTIVE_VIDEO: 'SET_ACTIVE_VIDEO',
  SEARCH_VIDEOS_PENDING: 'SEARCH_VIDEOS_PENDING',
  SEARCH_VIDEOS_SUCCESS: 'SEARCH_VIDEOS_SUCCESS',
  SEARCH_VIDEOS_ERROR: 'SEARCH_VIDEOS_ERROR'
}

export const addSingleVideo = video => ({ type: types.ADD_SINGLE, video })

export const removeSingleVideo = id => ({ type: types.REMOVE_SINGLE, id })

export const setActiveVideo = id => ({ type: types.SET_ACTIVE_VIDEO, id })

export const searchVideo = (query) => {
  return async (dispatch) => {
    dispatch({ type: types.SEARCH_VIDEOS_PENDING, query })

    try {
      const results = await searchRequest(query)
      dispatch({ type: types.SEARCH_VIDEOS_SUCCESS, results })
    } catch (error) {
      dispatch({ type: types.SEARCH_VIDEOS_ERROR, error })
    }
  }
}
