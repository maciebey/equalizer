export const ADD_SINGLE = 'ADD_SINGLE'
export const REMOVE_SINGLE = 'REMOVE_SINGLE'
export const SET_ACTIVE_VIDEO = 'SET_ACTIVE_VIDEO'

export const addSingleVideo = name => ({ type: ADD_SINGLE, name })

export const removeSingleVideo = id => ({ type: REMOVE_SINGLE, id })

export const setActiveVideo = id => ({ type: SET_ACTIVE_VIDEO, id })
