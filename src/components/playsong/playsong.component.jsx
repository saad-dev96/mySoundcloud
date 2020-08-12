import React, { Component, useContext } from "react";
import axios from 'axios'
import ReactDOM from "react-dom";
import { URL } from '../../env'
import { addComment } from '../../env'
import { viewComments } from '../../env'
import { getItem } from '../../utils'
import { getTime } from '../../utils'
import { updateComment } from '../../env'
import { deleteComment } from '../../env'

var key = 0;
var editId = 0;


class PlaySong extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTrack: null,
      player: "stopped",
      currentTime: null,
      duration: null,
      comments: {
        comments: []
      },
      commentFlag: false,
      editFlag: false,
      comment: {
        song_id: null,
        body: null
      },
      editComment: '',
      currentSong : 0
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
  refreshComments = () =>{
    console.log(this.state.currentSong);
    const token = getItem('token');
    const id=this.state.currentSong;
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
  viewComments = (id) => {
    const token = getItem('token');
    this.setState({currentSong : id});
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

  deleteComment = (id) => {
    const token = getItem('token');
    axios.delete(`${URL}${deleteComment}${id}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        alert("comment deleted");
        this.setState({ commentFlag: true } , ()=>{this.refreshComments()});
      })
      .catch(res => {
        alert("failed to delete comment because  " + res.status);
      }
      );


  }
  addCommentHelper = (id) => {

    this.state.currentSong = id;
    this.setState({ commentAddFlag: true, editFlag: false, commentFlag: false })
  }

  addNewComment = () => {
    const token = getItem('token');
    const text = document.getElementById("comment").value;

    const { comment } = this.state;
    comment.song_id = this.state.currentSong
    comment.body = text;
    comment.user = getItem('user');
    const comments = this.state.comments;
    comments.comments.push(comment);
    this.setState({ comment, comments });
    axios.post(`${URL}${addComment}`, this.state.comment, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        this.setState({ commentAddFlag: false, commentFlag: true });
        alert("Comment added");
      })
      .catch(res => {
        alert("failed to add comment because  " + res.status);
      }
      );
  }

  updateCommentHelper = (id, body) => {
    editId = id;
    this.setState({ editComment: body })
    this.setState({ editFlag: true, commentAddFlag: false, commentFlag: false });
  }
  updateComment = (id) => {
    const token = getItem('token');
    const text = document.getElementById("update").value;
    const body = {
      body: text
    }
    axios.patch(`${URL}${updateComment}${editId}`, body, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        this.setState({comment : res.data});
        this.refreshComments(this.state.currentSong);
        this.setState({ editFlag: false, commentFlag: true });
        alert("Comment edited");
      })
      .catch(res => {
        alert("failed to add comment because  " + res.status);
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

    const list = this.props.list.map((item, index) => {
      return (
        <div key={index}>
          <li
            onClick={() => this.setState({ selectedTrack: item.title })}
          >
            {item.title}
          </li>

          <button key={key++} onClick={() => this.viewComments(item.id)}>
            view comments
          </button>

          <button key={key++} onClick={() => this.addCommentHelper(item.id)}>
            add a comment
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
          {this.state.commentAddFlag ?
            (<div className='comment'>
              <textarea id="comment" rows='4' cols='50' placeholder='add a comment' ></textarea>
              <button onClick={this.addNewComment}>submit</button>
            </div>)
            : null}
          <div>
            {this.state.commentFlag ?
              (<div>{this.state.comments.comments.map((item, index) =>
                <div key={index}>
                  <p>{item.user} commented : {item.body}</p>
                  {
                    item.user === getItem('user') ?
                    (<div key={index}><button onClick={() => this.updateCommentHelper(item.id, item.body)}>edit comment</button>
                    <button className ='delete' onClick={() => this.deleteComment(item.id)}>delete comment</button></div>
                    )
                    : null
                  }
                </div>
              )}</div>)
              : null}
          </div>
          {this.state.editFlag ?
            (<div className='update'>
              <textarea id="update" rows='4' cols='50' defaultValue={this.state.editComment}></textarea>
              <button onClick={this.updateComment}>submit</button>
            </div>)
            : null
          }

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
