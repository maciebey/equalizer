import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { searchRequest } from '../services/youtube.service'
import { loadState } from '../utils/localStorage'

interface Playlist {
  id: string,
  snippet: {
    title: string,
    thumbnails: {
      default: {
        url: string,
        width: number,
        height: number
      }
    }
  }
}

interface VideoState {
  searchVideoState: {
    pending: boolean,
    results: any,
    error: any
  },
  activeVideo?: number,
  playlist: Playlist[]
}

const initialState: VideoState = loadState("video")

export const fetchSearchNew = createAsyncThunk(
  'fetchSearchNew',
  async ({query}:any, thunkAPI) => {
    const response = await searchRequest(query, null)
    return response
  }
)

export const fetchSearchMore = createAsyncThunk(
  'fetchSearchMore',
  async ({query, pageToken}:any, thunkAPI) => {
    const response = await searchRequest(query, pageToken)
    return response
  }
)

const addSingleVideoFunc = (state: VideoState, action: PayloadAction<any>) => {
  const video = action.payload
  state.playlist = [...state.playlist, video]
}

const removeSingleVideoFunc = (state: VideoState, action: PayloadAction<number>) => {
  const index = action.payload

  // if removing last item
  if (state.playlist.length === 1) {
    state.activeVideo = undefined
    state.playlist = []
  }

  // need to check if we're removing the last video in playlist
  else if (state.activeVideo === (state.playlist.length - 1)) {
    state.activeVideo =  0
    state.playlist = state.playlist.filter((item, idx) => idx !== index)
  }

  else {
    state.playlist = state.playlist.filter((item, idx) => idx !== index)
  }
}

const setActiveVideoFunc = (state: VideoState, action: PayloadAction<number>) => {
  const id = action.payload
  state.activeVideo = id
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    addSingleVideo: addSingleVideoFunc,
    removeSingleVideo: removeSingleVideoFunc,
    setActiveVideo: setActiveVideoFunc
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchNew.pending, (state, action) => {
      state.searchVideoState.pending = true
    })
    builder.addCase(fetchSearchNew.fulfilled, (state, action) => {
      state.searchVideoState.results = action.payload
      state.searchVideoState.pending = false
    })
    // TODO: check that doing rejected right 
    builder.addCase(fetchSearchNew.rejected, (state, action) => {
      state.searchVideoState.pending = false
      state.searchVideoState.error = action.error
    })
    builder.addCase(fetchSearchMore.pending, (state, action) => {
      state.searchVideoState.pending = true
    })
    builder.addCase(fetchSearchMore.fulfilled, (state, action) => {
      const newResults = {
        ...action.payload,
        items: [...state.searchVideoState.results.items, ...action.payload.items]
      }
      state.searchVideoState.results = newResults
      state.searchVideoState.pending = false
    })
    builder.addCase(fetchSearchMore.rejected, (state, action) => {
      state.searchVideoState.pending = false
      state.searchVideoState.error = action.error
    })
  },
})

// export actions made from createSlice 
export const { addSingleVideo, removeSingleVideo, setActiveVideo } = videoSlice.actions

// export state selectors
export const selectActiveVideoId= (state: RootState) => state.video.activeVideo
export const selectVideoPlaylist= (state: RootState) => state.video.playlist
export const selectVideoSearchState = (state: RootState) => state.video.searchVideoState

export default videoSlice.reducer
