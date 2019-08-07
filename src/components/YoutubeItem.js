import React from 'react'
import { useDispatch } from 'react-redux'
import { addSingleVideo } from '../actions/video'
import './YoutubeSearchBox.css'

const YoutubeItem = ({ item }) => {
  const dispatch = useDispatch()
  const handleClick = (event) => {
    dispatch(addSingleVideo(item.id.videoId))
  }

  return (
    <div className='search-results-item' onClick={handleClick} >
      <img src={item.snippet.thumbnails.default.url} alt='' height='50' width='50' />
      <div>
        <div>kind:{item.id.kind}</div>
        <div>videoId:{item.id.videoId}</div>
        <div>title:{item.snippet.title}</div>
      </div>
    </div>
  )
}

export default YoutubeItem
