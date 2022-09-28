import React from 'react'
// import logo from "./logo.svg";
import './App.css'

// redux
import PlayerContainer from './components/playerContainer'
import AudioContainer from './components/audioContainer'
import ModalController from './components/ModalController'

function App () {
  return (
    <>
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
    </>
  )
}

export default App
