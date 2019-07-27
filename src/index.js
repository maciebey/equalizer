import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { gapi } from 'gapi-script'

const apiKey = ''
// const clientId = ''
// var SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl'
// async function run () {
//     console.log(gapi.auth2.getAuthInstance())
// //     console.log('before await')
// //   const auth2 = await loadAuth2(clientId, '')
// //   console.log(auth2)
// //   auth2.signIn()
// }
// run()
// var GoogleAuth
// var SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl'

function start () {
  gapi.client.init({
    apiKey: apiKey,
    // clientId: clientId,
    // scope: SCOPE,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  })
    // .then(run())
}

gapi.load('client', start)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
