import React, { useRef, useState } from 'react'
import './YoutubeSearchBox.css'
import YoutubeItem from './YoutubeItem'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { addSingleVideo, selectVideoSearchState, fetchSearchNew, fetchSearchMore } from '../state/videoSlice'

const YoutubeSearchBox = () => {
  const wrapperEl = useRef(null)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const dispatch = useAppDispatch()
  const searchVideoState = useAppSelector(selectVideoSearchState)

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(fetchSearchNew({query: query}))
  }

  const loadMoreResults = () => {
    dispatch(fetchSearchMore({query: query, pageToken:searchVideoState.results.nextPageToken}))
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
        <div className='search-results-load-more' onClick={loadMoreResults} >
          Load More
        </div>
      </div>
      }
    </div>
  )
}

export default YoutubeSearchBox
