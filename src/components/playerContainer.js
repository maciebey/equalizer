import React from 'react'
import { connect } from 'react-redux'
import { addSingleVideo, removeSingleVideo, setActiveVideo } from '../actions/video'

import './playerContainer.css'
import YouTube from 'react-youtube'

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

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.addSingleVideo(this.state.value)
  }

  render () {
    return (
      <div className='test-container'>
        <YouTube videoId={this.props.activeVideo} />
        <div className='app-card'>
          <div className='app-card-header'>
            <div className='app-card-title'>Queue</div>
          </div>
          {this.props.queue.map(item => (
            <PlayerItem name={item.name} id={item.id} setActiveVideo={() => this.props.setActiveVideo(item.id)} removeSingleVideo={() => this.props.removeSingleVideo(item.id)} />
          ))
          }
          <form className='playlist-form' onSubmit={this.handleSubmit}>
            <label> Add Youtube Video ID: &nbsp;
              <input type='text' value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type='submit' value='Submit' />
          </form>
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
  addSingleVideo: name => dispatch(addSingleVideo(name)),
  removeSingleVideo: id => dispatch(removeSingleVideo(id)),
  setActiveVideo: id => dispatch(setActiveVideo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
