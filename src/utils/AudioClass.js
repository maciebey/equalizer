/* global Audio */

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

class AudioClass {
  constructor (file) {
    this.audioElement = new Audio(file)
    this.createEql()
  }

  createEql () {
    const context = window.myAudioContext
    const sourceNode = context.createMediaElementSource(this.audioElement)

    const filters = EQ.map((band) => {
      const filter = context.createBiquadFilter()
      filter.type = band.type
      filter.gain.value = 0.1
      filter.Q.value = 1
      filter.frequency.value = band.f
      return filter
    })

    filters.forEach((filter, index) => {
      if (index !== filters.length - 1) {
        // link forward every filter but last
        filter.connect(filters[index + 1])
      } else {
        // link the last to destination
        filter.connect(context.destination)
      }
    })

    // link source node to filters
    sourceNode.connect(filters[0])

    this.filters = filters
  };

  getFilterCount () {
    return this.filters.length
  }

  setFilterGain (filterIndex, gain) {
    this.filters[filterIndex].gain.value = gain
  }

  setVolume (volume) {
    this.audioElement.volume = volume
  }

  togglePlay () {
    if (this.audioElement.paused) {
      this.audioElement.play()
      return true
    } else {
      this.audioElement.pause()
      return false
    }
  }
}

export default AudioClass
