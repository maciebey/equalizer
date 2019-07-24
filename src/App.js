import React from 'react'
// import logo from "./logo.svg";
import './App.css'

// redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'

// import Counter from "./components/counter";
import PlayerContainer from './components/playerContainer'
import AudioContainer from './components/audioContainer'

// set up global audio context
window.myAudioContext = new (window.AudioContext || window.webkitAudioContext)()

// create our store!
const store = createStore(reducer)
console.log(store.getState())

function App () {
  return (
    <Provider store={store}>
      <header className='app-header'>
        Relax Mix
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
