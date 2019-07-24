import React from 'react'
import { connect } from 'react-redux'
import { addSingleVideo, removeSingleVideo } from '../actions/video'

import './playerContainer.css'
import YouTube from 'react-youtube'

const PlayerItem = ({ name, id, onClick }) => {
  return (
    <div onClick={onClick}>{name} {id}</div>
  )
}

class PlayerContainer extends React.Component {
  constructor () {
    super()
    this.state = { value: 'test' }

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
        <YouTube videoId='C0DPdy98e4c' />
        <div className='app-card'>
          <div className='app-card-header'>
            <div className='app-card-title'>Queue</div>
          </div>
          {this.props.queue.map(item => (
            <PlayerItem name={item.name} id={item.id} onClick={() => this.props.removeSingleVideo(item.id)} />
          ))
          }
          <form onSubmit={this.handleSubmit}>
            <label> Name:
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
  queue: state.video.playlist
})

const mapDispatchToProps = dispatch => ({
  addSingleVideo: name => dispatch(addSingleVideo(name)),
  removeSingleVideo: id => dispatch(removeSingleVideo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
