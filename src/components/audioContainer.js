import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVisibility } from '../actions/audio'

import './audioContainer.css'
import AudioPlayer from './audioPlayer'

const AudioContainer = () => {
  const players = useSelector(state => state.audio.audioPlayers)

  const dispatch = useDispatch()

  const createCheckboxes = () => {
    var checkboxes = []

    players.forEach((item, index) => {
      checkboxes.push(<label key={index}>
        <input
          type='checkbox'
          checked={item.visible}
          onChange={() => dispatch(toggleVisibility(parseInt(item.id)))}
        />
        {item.name}
      </label>)
    })

    return checkboxes
  }

  if (!players || players.length < 1) {
    return null
  }

  return (
    <div className='player-containter-main'>
      Enable players:
      <div className='player-checkbox-container' >
        {players && players.length > 1 && createCheckboxes()}
      </div>
      <hr />
      {players.map((player, index) => (
        <AudioPlayer key={index} player={player} />
      ))}
    </div>
  )
}

export default AudioContainer
