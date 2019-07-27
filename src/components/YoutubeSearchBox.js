import React, { useState } from 'react'
import { connect } from 'react-redux'
import { searchVideo } from '../actions/video'
import './YoutubeSearchBox.css'
import YoutubeItem from './YoutubeItem'

const YoutubeSearchBox = ({ searchVideoState, searchVideo }) => {
  const [query, setQuery] = useState('')

  const handleChange = (event) => {
    setQuery(event.target.value)
    searchVideo(query)
  }

  return (
    <React.Fragment>
      <label> Search Youtube: &nbsp;
        <input type='text' value={query} onChange={handleChange} />
      </label>
      {searchVideoState.results &&
      <div className='search-results-container'>
        {searchVideoState.results.items.map((item, index) =>
          <YoutubeItem key={index} item={item} />
        )}
      </div>
      }
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  searchVideoState: state.video.searchVideoState
})

const mapDispatchToProps = dispatch => ({
  searchVideo: query => dispatch(searchVideo(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeSearchBox)
