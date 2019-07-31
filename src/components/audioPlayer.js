/* global Audio */
/* https://www.w3.org/TR/webaudio/#mixer-gain-structure
  // https://stackoverflow.com/questions/24895155/creating-an-equalizer-with-javascript-audio-api
  // https://www.html5rocks.com/en/tutorials/webaudio/intro/
  // https://forums.tumult.com/t/audio-equalizer/11405
  // https://wavesurfer-js.org/example/equalizer/index.html
  */
import React from 'react'
import './audioPlayer.css'

const EQ = [
  {
    f: 32,
    type: 'lowshelf'
  },
  {
    f: 64,
    type: 'peaking'
  },
  {
    f: 125,
    type: 'peaking'
  },
  {
    f: 250,
    type: 'peaking'
  },
  {
    f: 500,
    type: 'peaking'
  },
  {
    f: 1000,
    type: 'peaking'
  },
  {
    f: 2000,
    type: 'peaking'
  },
  {
    f: 4000,
    type: 'peaking'
  },
  {
    f: 8000,
    type: 'peaking'
  },
  {
    f: 16000,
    type: 'highshelf'
  }
]

class AudioPlayer extends React.Component {
  constructor (props) {
    super(props)

    const audioElement = new Audio(this.props.player.file)
    audioElement.addEventListener('ended', (audio) => {
      audioElement.currentTime = 0
      audioElement.play()
    }, false)

    this.state = {
      filters: null,
      audio: audioElement,
      playing: false
    }
  }

  componentDidMount () {
    this.createEql()
  }

  createEql = element => {
    const context = window.myAudioContext
    const sourceNode = context.createMediaElementSource(this.state.audio)

    const filters = EQ.map((band) => {
      const filter = context.createBiquadFilter()
      filter.type = band.type
      filter.gain.value = 0.1
      filter.Q.value = 1
      filter.frequency.value = band.f
      return filter
    })

    filters.forEach((filter, index) => {
      // link forward every filter but last
      if (index !== filters.length - 1) {
        filter.connect(filters[index + 1])
      }
      // link the last to destination
      else {
        filter.connect(context.destination)
      }
    })

    // link source node to filters
    sourceNode.connect(filters[0])

    this.setState({ filters: filters })
  };

  changeGain = event => {
    const value = event.target.value / 100.0
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
    if (this.state.playing) {
      this.state.audio.pause()
      this.setState({ ...this.state, playing: false })
    } else {
      this.state.audio.play()
      this.setState({ ...this.state, playing: true })
    }
  }

  render () {
    const { player } = this.props
    return (
      <div className='app-card'>
        <div className='app-card-header highlight player-header'>
          <div className='app-card-title'>{player.name}</div>
          <div className='player-button' onClick={this.togglePlay}>
            {this.state.playing ? 'Pause' : 'Play'}
          </div>
        </div>
        <div className='slidecontainer'>
          {this.state.filters &&
            this.state.filters.map((filter, index) => (
              <input
                key={index}
                data-key={index}
                type='range'
                min='1'
                max='1000'
                defaultValue={filter.gain.value}
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
