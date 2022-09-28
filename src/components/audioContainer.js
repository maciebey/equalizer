import { useAppSelector, useAppDispatch } from '../state/hooks'
import { toggleVisibility, selectAudioPlayers } from '../state/audioSlice'

import './audioContainer.css'
import AudioPlayer from './audioPlayer'

const AudioContainer = () => {
  const players = useAppSelector(selectAudioPlayers)
  const dispatch = useAppDispatch()


  const createCheckboxes = () => {
    var checkboxes = []

    players.forEach((item, index) => {
      checkboxes.push(<label key={index}>
        <input
          type='checkbox'
          checked={item.visible}
          onChange={() => dispatch(toggleVisibility(item.id))}
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
