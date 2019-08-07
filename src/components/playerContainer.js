import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeSingleVideo, setActiveVideo } from '../actions/video'

import './playerContainer.css'
import YouTube from 'react-youtube'
import YoutubeSearchBox from './YoutubeSearchBox'

const PlayerItem = ({ name, id }) => {
  const dispatch = useDispatch()

  return (
    <div className='playlist-item'>
      <div className='playlist-item-info' onClick={() => dispatch(setActiveVideo(id))}>{name}</div>
      <div className='playlist-item-remove' onClick={() => dispatch(removeSingleVideo(id))}>X</div>
    </div>
  )
}

const PlayerContainer = () => {
  const activeVideo = useSelector(state => state.video.activeVideo)
  const queue = useSelector(state => state.video.playlist)

  return (
    <div className='test-container'>
      <YouTube videoId={activeVideo} />
      <div className='app-card'>
        <div className='app-card-header'>
          <div className='app-card-title'>Queue</div>
          <YoutubeSearchBox />
        </div>
        {queue.map(item => (
          <PlayerItem name={item.name} id={item.id} />
        ))}
      </div>
    </div>
  )
}

export default PlayerContainer
