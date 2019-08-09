import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVisibility } from '../actions/audio'

import './audioContainer.css'
import AudioPlayer from './audioPlayer'

const AudioContainer = () => {
  const players = useSelector(state => state.audio.audioPlayers)

  const dispatch = useDispatch()

  const dropdownToggle = (e) => {
    dispatch(toggleVisibility(parseInt(e.target.value)))
    e.target.value = 'default'
  }

  // closePlayer (e) {
  //   this.props.toggleVisibility(parseInt(e.target.attributes.value.nodeValue))
  // }

  return (
    <div className='player-containter-main'>
        Which of the following audio players would you like to enable:
      <select defaultValue='default' onChange={(e) => dropdownToggle(e)}>
        <option disabled value='default'>
            -- select an option --
        </option>
        {players
          .filter(player => !player.visible)
          .map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
      </select>
      <hr />
      {players
        .filter(player => player.visible)
        .map(player => (
          <AudioPlayer player={player} />
        ))}
    </div>
  )
}

export default AudioContainer
