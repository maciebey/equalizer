import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchVideo } from '../actions/video'
import './YoutubeSearchBox.css'
import YoutubeItem from './YoutubeItem'

const YoutubeSearchBox = () => {
  const [query, setQuery] = useState('')

  const dispatch = useDispatch()
  const searchVideoState = useSelector(state => state.video.searchVideoState)

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(searchVideo(query))
  }

  return (
    <div>
      <form className='playlist-form' onSubmit={handleSubmit}>
        <label> Search Youtube: &nbsp;
          <input type='text' value={query} onChange={handleChange} />
        </label>
      </form>
      {searchVideoState.results &&
      <div className='search-results-container'>
        {searchVideoState.results.items.map((item, index) =>
          <YoutubeItem key={index} item={item} />
        )}
      </div>
      }
    </div>
  )
}

export default YoutubeSearchBox
