import React, { Component, useContext } from "react";
import axios from 'axios'
import ReactDOM from "react-dom";
import { URL, share, listSongs, addComment, viewComments, updateComment, deleteComment, like, unlike, addView } from '../../env'
import { getTime, getItem } from '../../utils'

import './playsong.styles.scss'

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
      currentSong: 0,
      shareFlag: false,
      shareId: 0,
      GlobalTitle: ''
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
  refreshComments = () => {
    console.log(this.state.currentSong);
    const token = getItem('token');
    const id = this.state.currentSong;
    axios.get(`${URL}${viewComments}${id}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        this.setState({ comments: res.data });
        this.setState({ commentFlag: true, shareFlag: false, editFlag: false });
      })
      .catch(res => {
        alert("failed to view comments because  " + res.status);
      }
      );
  }
  viewComments = (title, id) => {
    const token = getItem('token');
    this.setState({ currentSong: id });
    axios.get(`${URL}${viewComments}${id}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        this.setState({ GlobalTitle: title });
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
        this.setState({ commentFlag: true }, () => { this.refreshComments() });
      })
      .catch(res => {
        alert("failed to delete comment because  " + res.status);
      }
      );
  }
  shareSongHelper = (id) => {

    this.state.currentSong = id;
    this.setState({ shareFlag: true, editFlag: false, commentFlag: false })
  }

  shareSong = () => {
    const token = getItem('token');
    const text = document.getElementById("share").value;
    var bodyFormData = new FormData();
    bodyFormData.set('song_id', this.state.currentSong);
    bodyFormData.set('sender_username', getItem('user'));
    bodyFormData.set('receiver_username', text);

    axios.post(`${URL}${share}`, bodyFormData, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        this.setState({ shareFlag: false, commentFlag: true });
        alert(res.data.error)
      })
      .catch(res => {
        alert("failed to share because  " + res.status);
      }
      );
  }

  addCommentHelper = (id) => {

    this.state.currentSong = id;
    this.setState({ commentAddFlag: true, shareFlag: false, editFlag: false, commentFlag: true })
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
        this.setState({ comment: res.data });
        this.refreshComments(this.state.currentSong);
        this.setState({ editFlag: false, commentFlag: true });
      })
      .catch(res => {
        alert("failed to add comment because  " + res.status);
      }
      );
  }

  like = (id) => {
    const token = getItem('token');
    var bodyFormData = new FormData();
    bodyFormData.set('song_id', id);
    axios.post(`${URL}${like}`, bodyFormData, {
      headers: {
        'Authorization': `Token ${token}`, 'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        if (this.props.likedFlag === true) {
          console.log('liked');
          this.props.likedFunc(this.props.set);
        }
        else this.props.newFunc();

      })
      .catch(res => {
        console.log("failed to like because  " + res);
      }
      );
  }

  unlike = (id) => {
    const token = getItem('token');
    var bodyFormData = new FormData();
    bodyFormData.set('song_id', id);
    axios.post(`${URL}${unlike}`, bodyFormData, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        if (this.props.likedFlag === true) {
          this.props.likedFunc(this.props.set);
        }
        else this.props.newFunc();

      })
      .catch(res => {
        alert("failed to unlike because  " + res.status);
      }
      );
  }

  addView = (id, title) => {
    this.setState({ selectedTrack: title });
    const token = getItem('token');
    var bodyFormData = new FormData();
    bodyFormData.set('song_id', id);
    axios.post(`${URL}${addView}`, bodyFormData, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => {
        if (this.props.likedFlag === true) {
          this.props.likedFunc(this.props.set);
        }
        else this.props.newFunc();

      })
      .catch(res => {
        alert("failed to addView because  " + res.status);
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
          <li className='listing'
            onClick={() => this.addView(item.id, item.title)}
          >
            {item.title} Song has
            {item.views} views and
            {item.likes_count} likes!!
            Click the song name to play!
          </li>

          <button key={key++} onClick={() => this.viewComments(item.title, item.id)}>
            view comments
          </button>

          <button key={key++} onClick={() => this.addCommentHelper(item.id)}>
            add a comment
          </button>
          {!item.liked_by_user ? (
            <button key={key++} onClick={() => this.like(item.id)} id='like'>
              like
            </button>)
            : (
              <button key={key++} value='unlike' onClick={() => this.unlike(item.id)} id='button2'>
                unlike
              </button>)
          }
          <button key={key++} onClick={() => this.shareSongHelper(item.id)}>
            Share with someone
          </button>
        </div>
      );
    });

    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);

    return (
      <>
        <p>
          <br></br>
          <h4>{this.props.str}</h4>
          <div>
            <ul> {list} </ul>
            {this.state.commentAddFlag ?
              (<div className='comment'>
                <textarea className='box' id="comment" rows='2' cols='25' placeholder='add a comment' ></textarea>
                <button className='Clickbox' onClick={this.addNewComment}>submit</button>
              </div>)
              : null}
            {this.state.shareFlag ?
              (<div className='share'>
                <textarea className='box' id="share" rows='2' cols='25' placeholder='add the username of the user you want to share this song with..' ></textarea>
                <button className='Clickbox' onClick={this.shareSong}>submit</button>
              </div>)
              : null}
            <div>
              {this.state.commentFlag ?
                (<div className='comments'><h3>{this.state.GlobalTitle} has the following comments:</h3>{this.state.comments.comments.map((item, index) =>
                  <div key={index}>
                    <p><dl><dt>{item.user} </dt><dd>commented : {item.body}</dd></dl></p>
                    {
                      item.user === getItem('user') ?
                        (<p><div key={index}><button onClick={() => this.updateCommentHelper(item.id, item.body)}>edit comment</button>
                          <button className='delete' onClick={() => this.deleteComment(item.id)}>delete comment</button></div><br></br></p>
                        )
                        : null
                    }
                  </div>
                )}</div>)
                : null}
            </div>
            {this.state.editFlag ?
              (<div className='update'>
                <textarea className='box' id="update" rows='2' cols='25' defaultValue={this.state.editComment}></textarea>
                <button className='Clickbox' onClick={this.updateComment}>submit</button>
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
        </p>
      </>
    );
  }
}

export default PlaySong;
