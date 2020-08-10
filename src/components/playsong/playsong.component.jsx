import React, { Component } from "react"

class PlaySong extends Component {
  playAudio(song) {
    const audioEl = document.getElementsByClassName(`${song}`)[0]
    audioEl.play()
  }

  render() {
    return (
      <div>
        <button onClick={this.playAudio}>
          <span>Play Audio</span>
        </button>
        <audio className="audio-element">
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio>
      </div>
    )
  }
}

export default PlaySong;