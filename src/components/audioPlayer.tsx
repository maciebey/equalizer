/* https://www.w3.org/TR/webaudio/#mixer-gain-structure
  // https://stackoverflow.com/questions/24895155/creating-an-equalizer-with-javascript-audio-api
  // https://www.html5rocks.com/en/tutorials/webaudio/intro/
  // https://forums.tumult.com/t/audio-equalizer/11405
  // https://wavesurfer-js.org/example/equalizer/index.html
  */
import React, { useState, useEffect } from 'react'
import AudioClass from '../utils/AudioClass'
import './audioPlayer.css'
import { useAppSelector } from '../state/hooks'
import { selectDrawerState } from '../state/audioSlice'
import { audioPlayer } from '../interfaces'

type AudioPlayerProps = {
  player: audioPlayer
}

const AudioPlayer = ({ player }: AudioPlayerProps) => {
  const [audioElement] = useState(new AudioClass(player.file))
  const [filterCount] = useState(audioElement.getFilterCount())
  const [playing, setPlaying] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const drawerIsOpen = useAppSelector(selectDrawerState)

  /*
   * When the player is toggled off,
   * stop the audio if it's currently playing
   */
  useEffect(() => {
    if (playing && !player.visible) {
      setPlaying(audioElement.togglePlay())
    }
  }, [playing, player.visible, audioElement])

  const togglePlay = () => {
    setPlaying(audioElement.togglePlay())
  }

  const toggleSettings = () => {
    setSettingsOpen((settingsOpen) => !settingsOpen)
  }

  const createSliders = () => {
    const slider = []

    for (let i = 0; i < filterCount; i++) {
      slider.push(<input
        key={i}
        type='range'
        min='-10.0'
        max='10.0'
        defaultValue={0.1}
        onChange={e => audioElement.setFilterGain(i, e.target.value)}
        className='slider'
        id='myRange' />)
    }

    return slider
  }

  return (
    <div className={'player-main' + (player.visible ? '' : ' hide')}>
      <div className={'player-header player-background ' + player.background} >
        <div className={'player-background-inner ' + player.background + (playing ? ' play' : '')}>
          <div className='player-title'>{player.name}</div>
        </div>
      </div>
      <div className={'player-button-container' + (player.visible ? '' : ' hide')}>
        {drawerIsOpen && <div>
          <button onClick={()=>toggleSettings()}>Set</button>
        </div>}
        <div className='play-button-container' onClick={()=>togglePlay()}>
          <button className={'player-button' + (playing ? ' paused' : '')} />
        </div>
      </div>
      {settingsOpen && <div className={'slidecontainer' + (drawerIsOpen? '' : ' hide')}>
        <input
          type='range'
          min='0'
          max='100'
          defaultValue={100}
          onChange={e => audioElement.setVolume(e.target.value)}
          className='slider'
          id='myRange'
        />
        <div className='player-divider' />
        {createSliders()}
      </div>}
    </div>
  )
}

export default AudioPlayer
