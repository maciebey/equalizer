import React from 'react'
import { connect } from 'react-redux'
import { toggleVisibility } from '../actions/audio'

import './audioContainer.css'
import AudioPlayer from './audioPlayer'

class AudioContainer extends React.Component {
  dropdownToggle (e) {
    this.props.toggleVisibility(parseInt(e.target.value))
    e.target.value = 'default'
  }

  closePlayer (e) {
    this.props.toggleVisibility(parseInt(e.target.attributes.value.nodeValue))
  }

  render () {
    return (
      <div className='player-containter-main'>
        Which of the following audio players would you like to enable:
        <select defaultValue='default' onChange={(e) => this.dropdownToggle(e)}>
          <option disabled value='default'>
            -- select an option --
          </option>
          {this.props.players
            .filter(player => !player.visible)
            .map(player => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
        </select>
        <hr />
        {this.props.players.map(player => (
          <div key={player.id} className={
            'app-card ' +
            (player.visible ? '' : 'hide')
          }>
            <div className='app-card-header'>
              <div className='app-card-title'>{player.name}</div>
              <div
                className={
                  'app-card-close ' +
                  (player.visible ? '' : 'hide')
                }
                value={player.id}
                onClick={(e) => this.closePlayer(e)}
              >
                X
              </div>
            </div>
            <AudioPlayer player={player} />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  players: state.audio.audioPlayers
})

const mapDispatchToProps = dispatch => ({
  toggleVisibility: id => dispatch(toggleVisibility(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
