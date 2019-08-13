import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSingleVideo, searchVideo } from '../actions/video'
import './YoutubeSearchBox.css'
import YoutubeItem from './YoutubeItem'

const YoutubeSearchBox = () => {
  const wrapperEl = useRef(null)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const dispatch = useDispatch()
  const searchVideoState = useSelector(state => state.video.searchVideoState)

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(searchVideo(query))
  }

  const handleClick = (ytItem) => {
    const videoObj = {
      ...ytItem,
      id: ytItem.id.videoId
    }
    dispatch(addSingleVideo(videoObj))
  }

  const handleClickOutside = (event) => {
    if (wrapperEl.current && !wrapperEl.current.contains(event.target)) {
      setFocused(false)
    }
  }

  const handleFocus = (event) => {
    document.addEventListener('mousedown', handleClickOutside)
    setFocused(true)
  }

  return (
    <div ref={wrapperEl}>
      <form className='playlist-form' onSubmit={handleSubmit}>
        <label> Search Youtube: &nbsp;
          <input type='text' value={query}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </label>
      </form>
      {searchVideoState.results && focused &&
      <div className='search-results-container'>
        {searchVideoState.results.items.map((item, index) =>
          <YoutubeItem key={index} item={item} handleClick={handleClick} />
        )}
      </div>
      }
    </div>
  )
}

export default YoutubeSearchBox
