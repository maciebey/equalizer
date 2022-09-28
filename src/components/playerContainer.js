import React from 'react'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { removeSingleVideo, setActiveVideo, selectActiveVideoId, selectVideoPlaylist } from '../state/videoSlice'

import './playerContainer.css'
import YouTube from 'react-youtube'
import YoutubeItem from './YoutubeItem'
import YoutubeSearchBox from './YoutubeSearchBox'

const PlayerItem = ({ index, item, active }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(setActiveVideo(index))
  }

  return (
    <div className={active ? 'playlist-item active' : 'playlist-item'}>
      <div className='playlist-item-info'>
        <YoutubeItem item={item} handleClick={handleClick} />
      </div>
      <div className='playlist-item-remove' onClick={() => dispatch(removeSingleVideo(index))}>X</div>
    </div>
  )
}

const PlayerContainer = () => {
  const activeVideo = useAppSelector(selectActiveVideoId)
  const queue = useAppSelector(selectVideoPlaylist)

  const dispatch = useAppDispatch()

  const onEnd = (e) => {
    if (queue.length === 1) {
      // stop if no other items
      return
    }

    if (activeVideo === (queue.length - 1)) {
      dispatch(setActiveVideo(0))
    } else {
      dispatch(setActiveVideo(activeVideo + 1))
    }

    // play the next video
    setTimeout(() => {
      e.target.playVideo()
    }, 100)
  }

  return (
    <div className='video-player-container'>
      {(activeVideo === null || queue.length === 0)
        ? <div>Please add videos</div>
        : <YouTube videoId={activeVideo !== null ? queue[activeVideo].id : ''} onEnd={onEnd} />
      }
      <div className='app-card'>
        <div className='app-card-header'>
          <div className='app-card-title'>Queue</div>
          <YoutubeSearchBox />
        </div>
        <div className='video-player-playlist' >
          {queue.length > 0
            ? queue.map((item, index) => (
              <PlayerItem key={index} index={index} item={item} active={index === activeVideo} />
            ))
            : <div>No videos in playlist</div>
          }
        </div>
      </div>
    </div>
  )
}

export default PlayerContainer
