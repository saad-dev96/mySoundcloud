import React, { Component, useContext } from "react";
import axios from 'axios'
import ReactDOM from "react-dom";
import {URL} from '../../env'
import {viewComments} from '../../env'
import {getItem} from '../../utils'
import {getTime} from '../../utils'

var key = 0;

class PlaySong extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTrack: null,
      player: "stopped",
      currentTime: null,
      duration: null,
      comments: [],
      commentFlag: false
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

  viewComments = (id) => {
    const token = getItem('token');
    axios.get(`${URL}${viewComments}${id}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        this.setState({ comments: res.data });
        this.setState({ commentFlag: true });
      })
      .catch(res => {
        alert("failed to view comments because  " + res.status);
      }
      );
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => { });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      const currentSong = this.props.list.filter(song => song.title === this.state.selectedTrack);
      if (this.state.selectedTrack)
        track = currentSong[0].file;

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

    const list = this.props.list.map(item => {
      return (
        <div>
          <li
            key={item.id}
            onClick={() => this.setState({ selectedTrack: item.title })}
          >
            {item.title}
          </li>
          <button key={key++} onClick={() => this.viewComments(item.id)}>
            view comments
          </button>
        </div>
      );
    });

    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);

    return (
      <>
        <h1>Songs are</h1>
        <div>
          <ul>{list}</ul>
          <p>
            {this.state.commentFlag ?
              (<div>{this.state.comments.comments.map(
                item => <p>{item.user} commented : {item.body}</p>)}</div>)
              : null}
          </p>
        </div>

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
          ) : ""
          }
          {this.state.selectedTrack && this.state.player === "stopped" ? (
            <button onClick={() => this.setState({ player: "playing" })}>
              play
            </button>
          ) : ""}
        </div>
        {this.state.player === "playing" || this.state.player === "paused" ? (
          <div>
            {currentTime} / {duration}
          </div>
        ) : (
            ""
          )}
        <video ref={ref => (this.player = ref)} />
      </>
    );
  }
}

export default PlaySong;
