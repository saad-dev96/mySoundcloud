import React, { Component, useContext }from "react";
import axios from 'axios'
import {Mylist} from '../../pages/homepage/homepage.component'

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

class PlaySong extends React.Component {
  constructor(props){

  super(props);
  
  this.state = {
    selectedTrack: null,
    player: "stopped",
    currentTime: null,
    duration: null
  };
  }
  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      switch (this.state.selectedTrack) {
        case "Campfire Story":
          track = "https://sound-cloud-app.s3.amazonaws.com/songs/shape-of-you-official-video_yZD3798.mp3";
          break;
        case "Booting Up":
          track = "https://sound-cloud-app.s3.amazonaws.com/songs/shape-of-you-official-video_yZD3798.mp3";
          break;
        default:
          break;
      }
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({ player: "playing", duration: this.player.duration });
      }
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({ selectedTrack: null });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
  }

  render() {
    const list = [
      { id: 1, title: "Campfire Story" },
      { id: 2, title: "Booting Up" }
    ].map(item => {
      return (
        <li
          key={item.id}
          onClick={() => this.setState({ selectedTrack: item.title })}
        >
          {item.title}
        </li>
      );
    });
    console.log(this.props.list);
    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);

    return (
      <>
        <h1>Song Player</h1>
        <ul>{list}</ul>
        <div>
          {this.state.player === "paused" && (
            <button onClick={() => this.setState({ player: "playing" })}>
              Play
            </button>
          )}
          {this.state.player === "playing" && (
            <button onClick={() => this.setState({ player: "paused" })}>
              Pause
            </button>
          )}
          {this.state.player === "playing" || this.state.player === "paused" ? (
            <button onClick={() => this.setState({ player: "stopped" })}>
              Stop
            </button>
          ) : (
            ""
          )}
        </div>
        {this.state.player === "playing" || this.state.player === "paused" ? (
          <div>
            {currentTime} / {duration}
          </div>
        ) : (
          ""
        )}
        <audio ref={ref => (this.player = ref)} />
      </>
    );
  }
}

export default PlaySong;
