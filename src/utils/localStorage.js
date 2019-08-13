/* global localStorage */

const defaultState = {
  audio: {
    audioPlayers: [
      {
        id: 1,
        name: 'Rain',
        file: 'rain3.ogg',
        background: 'rain',
        visible: true
      },
      {
        id: 2,
        name: 'Star Ship',
        file: 'voy_bridge.mp3',
        background: 'space',
        visible: true
      }
    ]
  },
  video: {
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
}

export const loadState = () => {
  let serializedState
  try {
    serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return defaultState
    }
  } catch (err) {
    return defaultState
  }

  // if we loaded a state, combine it with our default
  serializedState = JSON.parse(serializedState)
  if (serializedState.video.playlist) {
    defaultState.video.playlist = serializedState.video.playlist
  }

  return defaultState
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // catch
  }
}
