import React from 'react'
import { connect } from 'react-redux'
import { removeSingleVideo, setActiveVideo } from '../actions/video'

import './playerContainer.css'
import YouTube from 'react-youtube'
import YoutubeSearchBox from './YoutubeSearchBox'

const PlayerItem = ({ name, setActiveVideo, removeSingleVideo }) => {
  return (
    <div className='playlist-item'>
      <div className='playlist-item-info' onClick={setActiveVideo}>{name}</div>
      <div className='playlist-item-remove' onClick={removeSingleVideo}>X</div>
    </div>
  )
}

class PlayerContainer extends React.Component {
  constructor () {
    super()
    this.state = { value: '0awwyDMFvkg' }
  }

  render () {
    return (
      <div className='test-container'>
        <YouTube videoId={this.props.activeVideo} />
        <div className='app-card'>
          <div className='app-card-header'>
            <div className='app-card-title'>Queue</div>
            <YoutubeSearchBox />
          </div>
          {this.props.queue.map(item => (
            <PlayerItem name={item.name} id={item.id} setActiveVideo={() => this.props.setActiveVideo(item.id)} removeSingleVideo={() => this.props.removeSingleVideo(item.id)} />
          ))
          }
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeVideo: state.video.activeVideo,
  queue: state.video.playlist
})

const mapDispatchToProps = dispatch => ({
  removeSingleVideo: id => dispatch(removeSingleVideo(id)),
  setActiveVideo: id => dispatch(setActiveVideo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
