import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './state/store'

// global audio context setup
// TODO: fix this ignore, clean up this initialization if possible
// @ts-ignore
window.myAudioContext = new (window.AudioContext || window.webkitAudioContext)()

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
