import React from 'react'
import './YoutubeSearchBox.css'

const YoutubeItem = ({ item, handleClick }) => {
  return (
    <div className='search-results-item' onClick={() => handleClick(item)} >
      <img src={item.snippet.thumbnails.default.url} alt='' height='50' width='50' />
      <div>
        <div>{item.snippet.title}</div>
      </div>
    </div>
  )
}

export default YoutubeItem
