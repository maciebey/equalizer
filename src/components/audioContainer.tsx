import { useAppSelector, useAppDispatch } from '../state/hooks'
import { toggleVisibility, selectAudioPlayers } from '../state/audioSlice'

import './audioContainer.css'
import AudioPlayer from './audioPlayer'

const AudioContainer = () => {
  const players = useAppSelector(selectAudioPlayers)
  const dispatch = useAppDispatch()

  const createCheckboxes = () => {
    var checkboxes: JSX.Element[] = []

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
      <div>
        <div className='player-checkbox-label'>Enable players:</div>
        <div className='player-checkbox-container'>
          {players && players.length > 1 && createCheckboxes()}
        </div>
      </div>
      <hr />
      <div className='player-containter'>
        {players.map((player, index) => (
          <AudioPlayer key={index} player={player} />
        ))}
      </div>
    </div>
  )
}

export default AudioContainer
