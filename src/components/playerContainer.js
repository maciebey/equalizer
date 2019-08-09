import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeSingleVideo, setActiveVideo } from '../actions/video'

import './playerContainer.css'
import YouTube from 'react-youtube'
import YoutubeSearchBox from './YoutubeSearchBox'

const PlayerItem = ({ name, id, index, active }) => {
  const dispatch = useDispatch()

  return (
    <div className={active ? 'playlist-item active' : 'playlist-item'}>
      <div className='playlist-item-info' onClick={() => dispatch(setActiveVideo(id))}>{name}</div>
      <div className='playlist-item-remove' onClick={() => dispatch(removeSingleVideo(id))}>X</div>
    </div>
  )
}

const PlayerContainer = () => {
  const activeVideo = useSelector(state => state.video.activeVideo)
  const queue = useSelector(state => state.video.playlist)

  const dispatch = useDispatch()

  const onEnd = (e) => {
    if (queue.length === 1) {
      // stop if no other items
      return
    } else {
      // otherwise, move on to the next, if
      // last move back to the first
      queue.forEach((item, index) => {
        if (item.id === activeVideo) {
          if (index !== (queue.length - 1)) {
            dispatch(setActiveVideo(queue[index + 1].id))
          } else {
            dispatch(setActiveVideo(queue[0].id))
          }
        }
      })
    }

    // play the next video
    setTimeout(() => {
      e.target.playVideo()
    }, 100)
  }

  return (
    <div className='test-container'>
      <YouTube videoId={activeVideo} onEnd={onEnd} />
      <div className='app-card'>
        <div className='app-card-header'>
          <div className='app-card-title'>Queue</div>
          <YoutubeSearchBox />
        </div>
        {queue.map((item, index) => (
          <PlayerItem key={index} index={index} name={item.name} id={item.id} active={item.id === activeVideo} />
        ))}
      </div>
    </div>
  )
}

export default PlayerContainer
