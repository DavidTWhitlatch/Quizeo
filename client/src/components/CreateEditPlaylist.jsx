import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateEditPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingVideo: false,
      isEditingQuiz: false,
      addVideo: false,
      addQuiz: false,
    }
    this.changeRoute = this.changeRoute.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  changeRoute = (playlistId) => {
    this.context.router.history.push(`/playlists/${playlistId}`);
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>{
        this.props.currentPlaylist ?
          (<div>
            <div className="card">
              <div className="card-content">
                <header className="card-header">
                  <p className="card-header-title">
                    Playlist Info:
                </p>
                </header>
                <div>
                  {this.props.isEditingPlaylist ?
                    <div>
                      <input
                        name="playlistTitle"
                        value={this.props.playlistTitle}
                        type="text"
                        onChange={this.props.handleChange}
                        placeholder="Playlist Title"
                      />
                      <input
                        name="playlistImg"
                        value={this.props.playlistImg}
                        type="text"
                        onChange={this.props.handleChange}
                        placeholder="Playlist thumnail URL"
                      />
                      <button onClick={() => {
                        this.props.handleChange({ target: { name: 'isEditingPlaylist', value: false } })
                        this.props.changePlaylist({
                          id: this.props.currentPlaylist.id,
                          name: this.props.playlistTitle,
                          thumbnail_url: this.props.playlistImg
                        })
                      }}>Submit</button>
                    </div> :
                    (<div>
                      <div>{this.props.currentPlaylist.name}</div>
                      <div>{this.props.currentPlaylist.thumbnail_url}</div>
                      <button onClick={() => {
                        this.props.handleChange({ target: { name: 'playlistTitle', value: this.props.currentPlaylist.name } })
                        this.props.handleChange({ target: { name: 'playlistImg', value: this.props.currentPlaylist.thumbnail_url } })
                        this.props.handleChange({ target: { name: 'isEditingPlaylist', value: true } })
                      }}>edit</button>
                    </div>)
                  }
                </div>
              </div>
            </div>
            {
              this.props.currentPlaylist.videos && this.props.currentPlaylist.videos.map((video, idx) => (
                <div key={video.id} className="card">
                  <div className="card-content">
                    <header className="card-header">
                      <p className="card-header-title">
                        Video #{idx + 1}
                      </p>
                    </header>
                    {
                      this.state.isEditingVideo === video.id ?
                        (<div>
                          <input
                            name="currentVideoUrl"
                            value={this.props.currentVideoUrl}
                            type="text"
                            onChange={this.props.handleChange}
                          />
                          <button onClick={() => {
                            this.setState({
                              isEditingVideo: false
                            })
                            this.props.changeVideo(video.id, this.props.currentVideoUrl);
                            this.props.handleChange({ target: { name: 'currentVideoUrl', value: '' } })
                          }}>Submit</button>
                        </div>) :
                        (<div>
                          <div>{video.url}</div>
                          <button onClick={() => {
                            this.setState({
                              isEditingVideo: video.id
                            })
                            this.props.handleChange({ target: { name: 'currentVideoUrl', value: video.url } })
                          }}>Edit</button>
                          <hr />
                          {
                            video.quizzes && video.quizzes.length ?
                              video.quizzes.map((quiz, idx) => (
                                this.state.isEditingQuiz ?
                                  (<div>
                                    <header className="card-header">
                                      <p className="card-header-title">
                                        Quiz {idx + 1}:
                                      <br />
                                        <input
                                          name="currentQuiz"
                                          value={this.props.currentQuiz}
                                          type="text"
                                          onChange={this.props.handleChange}
                                          placeholder="Question for your quiz"
                                        />
                                      </p>
                                    </header>
                                    {
                                      this.props.currentAnswers.map((answer, idx) => (
                                        <div key={answer[0]}>
                                          <input
                                            name="currentAnswers"
                                            value={this.props.currentAnswers[idx][0]}
                                            type="text"
                                            onChange={(e) => this.props.handleAnswerChange(e, idx, 0)}
                                            placeholder="Question for your quiz"
                                          />
                                          <input
                                            type="checkbox"
                                            value={!(this.props.currentAnswers[idx][1])}
                                            onChange={(e) => this.props.handleAnswerChange(e, idx, 1)}
                                            checked={this.props.currentAnswers[idx][1]}
                                            /> correct answer?
                                        </div>
                                      ))
                                    }
                                    <button onClick={() => {
                                      this.setState({ isEditingQuiz: false });
                                      this.props.changeQuiz(quiz);
                                    }
                                    }>Submit</button>
                                  </div>)
                                  :
                                  (<div>
                                    <header className="card-header">
                                      <p className="card-header-title">
                                        Quiz {idx + 1}:
                                      <br />
                                        {quiz.question}
                                      </p>
                                    </header>
                                    {
                                      quiz.answers.map(answer => (
                                        <div key={answer.id}><strong>{answer.option}</strong> {answer.is_correct && "Correct answer"}</div>
                                      ))
                                    }
                                    <button onClick={() => {
                                      this.props.handleChange({ target: { name: 'currentQuiz', value: quiz.question } });
                                      this.props.setAnswers(quiz.answers);
                                      this.setState({ isEditingQuiz: true });
                                    }}>edit</button>
                                  </div>)
                              ))
                              :
                              this.state.addQuiz ?
                                (<div>
                                  <header className="card-header">
                                    <p className="card-header-title">
                                      Quiz {idx + 1}:
                                  <br />
                                      <input
                                        name="currentQuiz"
                                        value={this.props.currentQuiz}
                                        type="text"
                                        onChange={this.props.handleChange}
                                        placeholder="Question for your quiz"
                                      />
                                    </p>
                                  </header>
                                  {
                                    this.props.currentAnswers.map((answer, idx) => (
                                      <div key={answer[0]}>
                                        <input
                                          name="currentAnswers"
                                          value={this.props.currentAnswers[idx][0]}
                                          type="text"
                                          onChange={(e) => this.props.handleAnswerChange(e, idx, 0)}
                                          placeholder="Question for your quiz"
                                        />
                                        <input
                                          type="checkbox"
                                          value={!(this.props.currentAnswers[idx][1])}
                                          onChange={(e) => this.props.handleAnswerChange(e, idx, 1)}
                                          checked={this.props.currentAnswers[idx][1]}
                                          />
                                      </div>
                                    ))
                                  }
                                  <div>Add another option</div>
                                  <button conClick={() => {

                                  }}>New option</button>
                                  <button onClick={() => {
                                    this.setState({ addQuiz: false });
                                    this.props.addQuiz(video.id);
                                  }
                                  }>Submit</button>
                                </div>)
                                :
                                (<button onClick={() => {
                                  this.setState({ addQuiz: true });
                                }
                                }>Add Quiz</button>)
                          }
                        </div>)
                    }
                  </div>
                </div>
              ))
            }
            <div>
              {
                !this.props.isEditingPlaylist && (this.state.addVideo ?
                  (<div>
                    <div className="card">
                      <div className="card-content">
                        <header className="card-header">
                          <p className="card-header-title">
                            Video Info:
                      </p>
                        </header>
                        <input
                          name="currentVideoUrl"
                          value={this.props.currentVideoUrl}
                          type="text"
                          onChange={this.props.handleChange}
                          placeholder="URL to video"
                        />
                        <button onClick={() => {
                          this.props.addVideo({ order: this.props.videoOrder, url: this.props.currentVideoUrl }, this.props.currentPlaylist.id);
                          this.setState({
                            addVideo: false,
                          })
                          this.props.handleChange({ target: { name: 'currentVideoUrl', value: '' } })
                          this.props.handleChange({ target: { name: 'videoOrder', value: this.props.videoOrder + 1 } })
                        }}>Submit</button>
                      </div>
                    </div>
                  </div>) :
                  (<button onClick={() => {
                    this.setState({
                      addVideo: true
                    })
                  }}>Add Video</button>))
              }
            </div>
          </div>
          ) :
          (<div>
            <div className="card">
              <div className="card-content">
                <header className="card-header">
                  <p className="card-header-title">
                    Playlist Info:
                  </p>
                </header>
                <div>
                  <input
                    name="playlistTitle"
                    value={this.props.playlistTitle}
                    type="text"
                    onChange={this.props.handleChange}
                    placeholder="Playlist Title"
                  />
                  <input
                    name="playlistImg"
                    value={this.props.playlistImg}
                    type="text"
                    onChange={this.props.handleChange}
                    placeholder="Playlist thumnail URL"
                  />
                  <button onClick={() => {
                    this.props.handleChange({ target: { name: 'isEditingPlaylist', value: false } })
                    this.props.addPlaylist({
                      name: this.props.playlistTitle,
                      thumbnail_url: this.props.playlistImg
                    })
                  }}>Submit</button>
                </div>
              </div>
            </div>
          </div>
          )
      }
      </div>
    )
  }
}

CreateEditPlaylist.contextTypes = {
  router: PropTypes.func.isRequired
}

export default CreateEditPlaylist;