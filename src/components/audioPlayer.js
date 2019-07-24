import React from "react";
import { connect } from "react-redux";
import ReactAudioPlayer from "react-audio-player";

import "./audioPlayer.css";
// import soundfile from "../media/rain1.mp3";

// function mapStateToProps(state, ownProps) {
//   let player = {
//       ...state.players[ownProps.playerId],
//       slider1: 50,
//       slider2: 50,
//       slider3: 50
//   }
//   return {
//     player: player
//   };
// }

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      slider1: 50,
      slider2: 50,
      slider3: 50,
      filters: null
    };
  }

  media = (
    <ReactAudioPlayer
      src={this.props.player.file}
      //   autoPlay
      controls
      ref={element => {
        this.createEql(element);
      }}
    />
  );

  // https://www.w3.org/TR/webaudio/#mixer-gain-structure
  // https://stackoverflow.com/questions/24895155/creating-an-equalizer-with-javascript-audio-api
  // https://www.html5rocks.com/en/tutorials/webaudio/intro/
  // https://forums.tumult.com/t/audio-equalizer/11405
  // https://wavesurfer-js.org/example/equalizer/index.html
  createEql = element => {
    var context = window.myAudioContext;
    var sourceNode = context.createMediaElementSource(element.audioEl);

    var EQ = [
      {
        f: 32,
        type: "lowshelf"
      },
      {
        f: 64,
        type: "peaking"
      },
      {
        f: 125,
        type: "peaking"
      },
      {
        f: 250,
        type: "peaking"
      },
      {
        f: 500,
        type: "peaking"
      },
      {
        f: 1000,
        type: "peaking"
      },
      {
        f: 2000,
        type: "peaking"
      },
      {
        f: 4000,
        type: "peaking"
      },
      {
        f: 8000,
        type: "peaking"
      },
      {
        f: 16000,
        type: "highshelf"
      }
    ];

    var filters = EQ.map(function(band) {
      var filter = context.createBiquadFilter();
      filter.type = band.type;
      filter.gain.value = 0.1;
      filter.Q.value = 1;
      filter.frequency.value = band.f;
      return filter;
    });

    filters.forEach((filter, index) => {
      // link forward every filter but last
      if (index !== filters.length - 1) {
        filter.connect(filters[index + 1]);
      }
      // link the last to destination
      else {
        filter.connect(context.destination);
      }
    });

    // link source node to filters
    sourceNode.connect(filters[0]);

    this.setState({ filters: filters });
  };

  changeGain = event => {
    var value = event.target.value / 100.0;
    let filterVal = parseInt(event.target.attributes["data-key"].value);

    this.setState(state => {
      const filters = state.filters.map((item, index) => {
        if(index !== filterVal){
          return item;
        }
        else{
          item.gain.value = value;
          return item;
        }
      });

      return {
        filters
      }
    })

  };

  render() {
    return (
      <div
        className={"player-main " + (this.props.player.visible ? "" : "hide")}
      >
        {this.media}
        <div className="slidecontainer">
          {this.state.filters &&
            this.state.filters.map((filter,index) => (
              <input
                key={index}
                data-key={index}
                type="range"
                min="1"
                max="3000"
                defaultValue={filter.gain.value}
                onChange={this.changeGain}
                className="slider"
                id="myRange"
              />
            ))}
          {}
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
    // EQ.forEach((band)=>{
    //     var filter = context.createBiquadFilter();
    //     filter.type = band.type;
    //     filter.gain.value = 0;
    //     filter.Q.value = 1;
    //     filter.frequency.value = band.f;
    //   this.filters.push(filter)
    // })
    // filters.reduce(function (prev, curr) {
    //     prev.connect(curr);
    //     return curr;
    //   }, this.analyser).connect(this.gainNode);
    // this.low = context.createBiquadFilter();
    // this.low.type = "lowshelf";
    // this.low.frequency.value = 320.0;
    // this.low.gain.value = 0.1;
    // this.low.connect(context.destination);

    // this.mid = context.createBiquadFilter();
    // this.mid.type = "peaking";
    // this.mid.frequency.value = 1000.0;
    // this.mid.Q.value = 0.5;
    // this.mid.gain.value = 0.1;
    // this.mid.connect(this.low);

    // this.high = context.createBiquadFilter();
    // this.high.type = "highshelf";
    // this.high.frequency.value = 3200.0;
    // this.high.gain.value = 0.1;
    // this.high.connect(this.mid);

    // sourceNode.connect(this.high)
/* <input
            type="range"
            min="1"
            max="3000"
            defaultValue={this.state.slider1}
            data-slider-id="lowGain"
            onChange={this.changeGain}
            className="slider"
            id="myRange"
          />
          <input
            type="range"
            min="1"
            max="3000"
            defaultValue={this.state.slider2}
            data-slider-id="midGain"
            onChange={this.changeGain}
            className="slider"
            id="myRange2"
          />
          <input
            type="range"
            min="1"
            max="3000"
            defaultValue={this.state.slider3}
            data-slider-id="highGain"
            onChange={this.changeGain}
            className="slider"
            id="myRange3"
          /> */
    // this.setState({filters:[...filters,this.state.filters[event.target.attributes["data-slider-id"].value]]})
    // switch (event.target.attributes["data-slider-id"].value) {
    //   case "lowGain":
    //     this.low.gain.value = value;
    //     break;
    //   case "midGain":
    //     this.mid.gain.value = value;
    //     break;
    //   case "highGain":
    //     this.high.gain.value = value;
    //     break;
    // }
// export default connect(mapStateToProps)(AudioPlayer);

// //   context = null;
// //   sourceNode = null;
// //   hBand=null; hInvert=null;
// //   mBand=null; lInvert=null;
// //   lBand=null;
// lBand = null; mBand = null; hBand = null;
//   lGain = null;
//   mGain = null;
//   hGain = null;
//   //
//   // https://forums.tumult.com/t/audio-equalizer/11405

//   createEql = element => {
//     var context = window.myAudioContext;
//     var sourceNode = context.createMediaElementSource(element.audioEl);

//     var gainDb = -40.0;
//     var bandSplit = [360, 3600];

//     var hBand = context.createBiquadFilter();
//     hBand.type = "lowshelf";
//     hBand.frequency.value = 360;//bandSplit[0];
//     //hBand.gain.value = -40.0;//gainDb;

//     var hInvert = context.createGain();
//     hInvert.gain.value = -1.0;

//     var mBand = context.createGain();

//     var lBand = context.createBiquadFilter();
//     lBand.type = "highshelf";
//     lBand.frequency.value = 3600;//bandSplit[1];
//     //lBand.gain.value = -40.0;//gainDb;

//     var lInvert = context.createGain();
//     lInvert.gain.value = -1.0;

//     sourceNode.connect(lBand);
//     sourceNode.connect(mBand);
//     sourceNode.connect(hBand);

//     hBand.connect(hInvert);
//     lBand.connect(lInvert);

//     hInvert.connect(mBand);
//     lInvert.connect(mBand);

//     console.log(window.lGain)
//     this.lGain = context.createGain();
//     this.mGain = context.createGain();
//     this.hGain = context.createGain();
//     // window.lGain = this.lGain;
//     // window.mGain = context.createGain();
//     // window.hGain = context.createGain();
//     this.lBand = lBand;
//     this.mBand = mBand;
//     this.hBand = hBand;

//     // lBand.connect(this.lGain);
//     // window.lGain.connect(lBand);
//     // //this.lBand = lBand;
//     // console.log(this.lBand)
//     // console.log(this.lGain)

//     window.lGain.connect(this.lGain);
//     lBand.connect(window.lGain);
//     window.mGain.connect(this.mGain);
//     mBand.connect(window.mGain);

//     window.hGain.connect(this.hGain);
//     hBand.connect(window.hGain);

//     var sum = context.createGain();
//     window.lGain.connect(sum);
//     window.mGain.connect(sum);
//     window.hGain.connect(sum);
//     //console.log(context.destination)
//     sum.connect(context.destination);

//     console.log("enabling");
//     this.disabled = false;
//   };

//   changeGain = (event) => {
//     var value = event.target.value / 100.0;
//     console.log(value)

//     switch (event.target.attributes["data-slider-id"].value) {
//       case "lowGain":
//           console.log('low')
//         // this.setState({slider1 : event.target.value})
//         // window.lGain.disconnect();
//         // window.lGain.connect(this.lBand)
//         // window.lGain.gain.value = value;
//         this.lBand.gain.value = value;
//         // this.lGain.gain.value = value;
//         // window.lGain.gain.value = value;
//         break;
//       case "midGain":
//             // this.setState({slider2 : event.target.value})
//         // window.mGain.gain.value = value;
//         this.mBand.gain.value = value;
//         //this.mGain.gain.value = value;
//         break;
//       case "highGain":
//             // this.setState({slider3 : event.target.value})
//         // window.hGain.gain.value = value;
//         this.hBand.gain.value = value;
//         //this.hGain.gain.value = value;
//         break;
//     }
//   }
