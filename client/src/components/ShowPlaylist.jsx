import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import { Redirect } from 'react-router'

class ShowPLaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      playing: true,
      controls: true,
      currentVideo: 0,
      showQuiz: false,
    };
    this.onEnded = this.onEnded.bind(this)
  }

  onEnded() {
    this.props.currentPlaylist.videos[this.state.currentVideo].quizzes.length ?
      this.toggleQuiz()
      : this.setState({
        currentVideo: (this.state.currentVideo + 1),
        playing: true
      })
  }

  toggleQuiz() {
    this.setState({
      showQuiz: !this.state.showQuiz
    })
  }

  showAnswers() {
    return this.props.currentPlaylist.videos[this.state.currentVideo].quizzes[0].answers.map(answer => (
      <div
        className="answers"
        onClick={(() => {
          this.props.userResponse(answer.id);
          this.toggleQuiz();
          this.setState({
            currentVideo: (this.state.currentVideo + 1),
            playing: true
          });
        })}
      >{answer.option}</div>
    ))
  }

  playlistLoop() {
    while (this.state.currentVideo < this.props.currentPlaylist.videos.length) {
      if (this.state.showQuiz) {
        return (
          <div className="card">
            <div className="card-content">
              <header className="card-header">
                <p className="card-header-title question">
                  {this.props.currentPlaylist.videos[this.state.currentVideo].quizzes[0].question}
                </p>
              </header>
              <div className="quiz">
                {this.showAnswers()}
              </div>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className="video-player">
            <ReactPlayer
              className="video"
              url={this.props.currentPlaylist.videos[this.state.currentVideo].url}
              playing
              controls
              onEnded={this.onEnded}
              width='100%'
              height='90vh'
            />
          </div>
        )
      }
    }
    if (this.state.currentVideo >= this.props.currentPlaylist.videos.length) {
      return (<Redirect to='/' />)
    }
  }

  render() {
    return (
      <div>
        {this.props.currentPlaylist ?
          this.playlistLoop()
          : (<div className="video">Loading...</div>)
        }
      </div>


    )

  }
}

export default ShowPLaylist;