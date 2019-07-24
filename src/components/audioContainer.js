import React from "react";
import { connect } from "react-redux";

import "./audioContainer.css";
import AudioPlayer from "./audioPlayer";

function mapStateToProps(state) {
  return {
    players: state.audioPlayers
  };
}

class AudioContainer extends React.Component {
  dropdownToggle = e => {
    this.props.dispatch({ type: "TOGGLE_VISIBILITY", id: parseInt(e.target.value) });
    e.target.value = "default";
  };
  closePlayer = e => {
    this.props.dispatch({
      type: "TOGGLE_VISIBILITY",
      id: parseInt(e.target.attributes.value.nodeValue)
    });
  };

  render() {
    return (
      <div className="player-containter-main">
        Which of the following audio players would you like to enable:
        <select defaultValue="default" onChange={this.dropdownToggle}>
          <option disabled value="default">
            -- select an option --
          </option>
          {this.props.players
            .filter(player => !player.visible)
            .map(player => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
        </select>
        <hr />
        {this.props.players.map(player => (
          <div key={player.id} className={
            "app-card " +
            (player.visible ? "" : "hide")
          }>
            <div className="app-card-header">
              <div className="app-card-title">{player.name}</div>
              <div
                className={
                  "app-card-close " +
                  (player.visible ? "" : "hide")
                }
                value={player.id}
                onClick={this.closePlayer}
              >
                X
            </div>
            </div>
            <AudioPlayer player={player} />
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AudioContainer);


/* {this.props.players.map(player => (
          <div key={player.id}>
            <label htmlFor={player.id}>{player.name}</label>
            <input
              type="checkbox"
              id={player.id}
              name="player.name"
              checked={player.visible}
              onChange={this.toggleVisibility}
            />
          </div>
        ))} */