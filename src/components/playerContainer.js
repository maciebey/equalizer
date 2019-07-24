import React from "react";
import { connect } from "react-redux";

import "./playerContainer.css";
import YouTube from 'react-youtube';

function mapStateToProps(state) {
  return {
    queue: state.videoPlayer.queue
  };
}

class PlayerContainer extends React.Component {
  render() {
    return (
      <div className="test-container">
        <YouTube videoId="C0DPdy98e4c" />
        <div className="app-card">
          <div className="app-card-header">
            <div className="app-card-title">Queue</div>
          </div>
          {this.props.queue.map(item => (
              <div>{item.name}</div>
          ))

          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PlayerContainer);
