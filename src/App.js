import React from 'react'
// import logo from "./logo.svg";
import './App.css'

// redux
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers/index'

import PlayerContainer from './components/playerContainer'
import AudioContainer from './components/audioContainer'
import ModalController from './components/ModalController'

import { loadState, saveState } from './utils/localStorage'

// set up global audio context
window.myAudioContext = new (window.AudioContext || window.webkitAudioContext)()

// create our store!
const middlewares = [thunk]
const persistedState = loadState()
const store = createStore(reducer, persistedState, applyMiddleware(...middlewares))

store.subscribe(() => {
  saveState({
    video: {
      playlist: store.getState().video.playlist
    }
  })
})

function App () {
  return (
    <Provider store={store}>
      <header>
        <span className='app-header'>Relax Mix</span>
        <ModalController />
      </header>
      <div className='app-body'>
        <PlayerContainer />
        <AudioContainer />
      </div>
      <footer className='app-footer'>
        &copy;2019
      </footer>
    </Provider>
  )
}

export default App
