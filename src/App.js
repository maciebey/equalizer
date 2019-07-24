import React from "react";
// import logo from "./logo.svg";
import "./App.css";



//redux
import store from "./reducers/reducer";
import { Provider } from "react-redux";

// import Counter from "./components/counter";
import PlayerContainer from './components/playerContainer';
import AudioContainer from './components/audioContainer';

//set up global audio context
window.myAudioContext = new (window.AudioContext || window.webkitAudioContext)();
// window.lGain = window.myAudioContext.createGain();
// window.mGain = window.myAudioContext.createGain();
// window.hGain = window.myAudioContext.createGain();

function App() {
  return (
    <Provider store={store}>
      <header className="app-header">
        Relax Mix
      </header>
      <div className="app-body">
        <PlayerContainer />
        <AudioContainer />
      </div>
      <footer className="app-footer">
        &copy;2019
      </footer>
    </Provider>
  );
}



export default App;
