import React from "react";
import { connect } from "react-redux";
import ReactAudioPlayer from "react-audio-player";

import "./player.css";
// import soundfile from "../media/rain1.mp3";

function mapStateToProps(state, ownProps) {
  let player = {
      ...state.players[ownProps.playerId],
      slider1: 50,
      slider2: 50,
      slider3: 50
  }
  return {
    player: player
  };
}

class Player extends React.Component {
  context = null;
  media = (
    <ReactAudioPlayer
      src="rain1.mp3"
    //   autoPlay
      controls
      ref={element => {
        this.createEql(element);
      }}
    />
  );

  //https://forums.tumult.com/t/audio-equalizer/11405
  createEql = element => {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    var context = this.context;
    var sourceNode = context.createMediaElementSource(element.audioEl);

    var gainDb = -40.0;
    var bandSplit = [360, 3600];

    var hBand = context.createBiquadFilter();
    hBand.type = "lowshelf";
    hBand.frequency.value = bandSplit[0];
    hBand.gain.value = gainDb;

    var hInvert = context.createGain();
    hInvert.gain.value = -1.0;

    var mBand = context.createGain();

    var lBand = context.createBiquadFilter();
    lBand.type = "highshelf";
    lBand.frequency.value = bandSplit[1];
    lBand.gain.value = gainDb;

    var lInvert = context.createGain();
    lInvert.gain.value = -1.0;

    sourceNode.connect(lBand);
    sourceNode.connect(mBand);
    sourceNode.connect(hBand);

    hBand.connect(hInvert);
    lBand.connect(lInvert);

    hInvert.connect(mBand);
    lInvert.connect(mBand);

    window.lGain = context.createGain();
    window.mGain = context.createGain();
    window.hGain = context.createGain();

    lBand.connect(window.lGain);
    mBand.connect(window.mGain);
    hBand.connect(window.hGain);

    var sum = context.createGain();
    window.lGain.connect(sum);
    window.mGain.connect(sum);
    window.hGain.connect(sum);
    sum.connect(context.destination);

    console.log("enabling");
    this.disabled = false;
  };

  changeGain = (event) => {
    var value = event.target.value / 100.0;
    console.log(event.target.attributes["data-slider-id"].value)

    switch (event.target.attributes["data-slider-id"].value) {
      case "lowGain":
        // this.setState({slider1 : event.target.value})
        window.lGain.gain.value = value;
        break;
      case "midGain":
            // this.setState({slider2 : event.target.value})
        window.mGain.gain.value = value;
        break;
      case "highGain":
            // this.setState({slider3 : event.target.value})
        window.hGain.gain.value = value;
        break;
    }
  }

  

  render() {
    // var gainDb = -40.0;
    // var bandSplit = [360,3600];
    // let 

    // let hBand = this.audioCtx.createBiquadFilter();
    // hBand.type = "lowshelf";
    // hBand.frequency.value = bandSplit[0];
    // hBand.gain.value = gainDb;
    // console.log(hBand)
    return (
      <div className="player-main">
        {this.media}
        {/* <label>
          Name:
          <input type="text" defaultValue={this.props.slider1} data-slider-id="lowGain" onChange={this.changeGain} />
        </label> */}
        <div className="slidecontainer">
          <input
            type="range"
            min="1"
            max="1000"
            defaultValue={this.props.player.slider1}
            data-slider-id="lowGain"
            onChange={this.changeGain}
            className="slider"
            id="myRange"
          />
          <input
            type="range"
            min="1"
            max="1000"
            defaultValue={this.props.player.slider2}
            data-slider-id="midGain"
            onChange={this.changeGain}
            className="slider"
            id="myRange2"
          />
          <input
            type="range"
            min="1"
            max="1000"
            defaultValue={this.props.player.slider3}
            data-slider-id="highGain"
            onChange={this.changeGain}
            className="slider"
            id="myRange3"
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Player);
