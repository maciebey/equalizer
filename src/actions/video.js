/* global gapi */

export const ADD_SINGLE = 'ADD_SINGLE'
export const REMOVE_SINGLE = 'REMOVE_SINGLE'
export const SET_ACTIVE_VIDEO = 'SET_ACTIVE_VIDEO'

export const addSingleVideo = name => ({ type: ADD_SINGLE, name })

export const removeSingleVideo = id => ({ type: REMOVE_SINGLE, id })

export const setActiveVideo = id => ({ type: SET_ACTIVE_VIDEO, id })

export const SEARCH_VIDEOS_PENDING = 'SEARCH_VIDEOS_PENDING'
export const SEARCH_VIDEOS_SUCCESS = 'SEARCH_VIDEOS_SUCCESS'
export const SEARCH_VIDEOS_ERROR = 'SEARCH_VIDEOS_ERROR'

export const searchVideoPending = query => ({ type: SEARCH_VIDEOS_PENDING, query })

export const searchVideoSuccess = results => ({ type: SEARCH_VIDEOS_SUCCESS, results })

export const searchVideoError = error => ({ type: SEARCH_VIDEOS_ERROR, error })

const searchRequest = (query) => {
  return new Promise((resolve, reject) => {
    const request = gapi.client.request({
      method: 'GET',
      path: 'youtube/v3/search',
      params: { part: 'snippet', maxResults: 10, q: query }
    })

    request.execute(function (response) {
      if (response.error) {
        reject(response.error)
      }
      resolve(response)
    })
  })
}

export const searchVideo = (query) => {
  return async (dispatch) => {
    dispatch(searchVideoPending())

    try {
      const res = await searchRequest(query)
      dispatch(searchVideoSuccess(res))
    } catch (err) {
      dispatch(searchVideoError(err))
    }
  }
}
