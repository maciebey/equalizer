/* https://www.w3.org/TR/webaudio/#mixer-gain-structure
  // https://stackoverflow.com/questions/24895155/creating-an-equalizer-with-javascript-audio-api
  // https://www.html5rocks.com/en/tutorials/webaudio/intro/
  // https://forums.tumult.com/t/audio-equalizer/11405
  // https://wavesurfer-js.org/example/equalizer/index.html
  */
import React from 'react'
import AudioClass from '../utils/AudioClass'
import './audioPlayer.css'

class AudioPlayer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.audioElement = new AudioClass(this.props.player.file)
    this.state = {
      filters: this.audioElement.getFilters(),
      playing: false
    }
  }

  changeGain = event => {
    const value = event.target.value
    const filterVal = parseInt(event.target.attributes['data-key'].value)

    this.setState(state => {
      const filters = state.filters.map((item, index) => {
        if (index !== filterVal) {
          return item
        } else {
          item.gain.value = value
          return item
        }
      })

      return {
        filters
      }
    })
  };

  togglePlay = e => {
    const newPlayVal = this.audioElement.togglePlay()
    this.setState({...this.state, playing: newPlayVal})
  }

  render () {
    const { player } = this.props
    return (
      <div className='app-card'>
        <div className={'app-card-header highlight player-header player-background ' + player.background + (this.state.playing ? ' play' : '')} >
          <div className='app-card-title'>{player.name}</div>
          <div className='player-button-container' onClick={this.togglePlay}>
            <button className={'player-button' + (this.state.playing ? ' paused' : '')} />
          </div>
        </div>
        <div className='slidecontainer'>
          <input
            type='range'
            min='0'
            max='100'
            defaultValue={100}
            onChange={e => this.audioElement.setVolume(e.target.value / 100.0)}
            className='slider'
            id='myRange'
          />
          <div className='player-divider' />
          {this.state.filters &&
            this.state.filters.map((filter, index) => (
              <input
                key={index}
                data-key={index}
                type='range'
                min='-10'
                max='10'
                defaultValue={0}
                onChange={this.changeGain}
                className='slider'
                id='myRange'
              />
            ))}
        </div>
      </div>
    )
  }
}

export default AudioPlayer
