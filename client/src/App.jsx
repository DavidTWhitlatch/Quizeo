import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import decode from 'jwt-decode';

import CreateEditPlaylist from './components/CreateEditPlaylist';
import PlaylistSearch from './components/PlaylistSearch';
import UserPlaylists from './components/UserPlaylists';
import ShowPlaylist from './components/ShowPlaylist';
import Register from './components/Register';
import Header from './components/Header';
import Login from './components/Login';
import './App.css';
import {
  destroyPlaylist,
  updatePlaylist,
  playlistIndex,
  postPlaylist,
  quizzesIndex,
  playlistShow,
  registerUser,
  updateAnswer,
  updateVideo,
  updateQuiz,
  userAnswer,
  postAnswer,
  loginUser,
  postVideo,
  postQuiz
} from './services/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAnswers: [{ option: '', is_correct: false, id: null }],
      isEditingPlaylist: true,
      currentPlaylist: null,
      registerModal: false,
      currentVideoUrl: '',
      playlistTitle: '',
      loginModal: false,
      currentUser: null,
      isLoggedIn: null,
      playlistImg: '',
      currentQuiz: '',
      videoOrder: 1,
      playlists: [],
    };
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this)
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.getOnePlaylist = this.getOnePlaylist.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.deletePlaylist = this.deletePlaylist.bind(this)
    this.changePlaylist = this.changePlaylist.bind(this)
    this.userResponse = this.userResponse.bind(this)
    this.addNewAnswer = this.addNewAnswer.bind(this)
    this.getPlaylists = this.getPlaylists.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.changeVideo = this.changeVideo.bind(this)
    this.addPlaylist = this.addPlaylist.bind(this)
    this.addAnswers = this.addAnswers.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.setAnswers = this.setAnswers.bind(this)
    this.changeQuiz = this.changeQuiz.bind(this)
    this.setNewQuiz = this.setNewQuiz.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.addVideo = this.addVideo.bind(this)
    this.addQuiz = this.addQuiz.bind(this)
    this.setEdit = this.setEdit.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.isLoggedIn();
    this.getPlaylists();
  }

  resetForm() {
    this.setState({
      currentAnswers: [{ option: '', is_correct: false, id: null }],
      isEditingPlaylist: true,
      currentPlaylist: null,
      currentVideoUrl: '',
      playlistTitle: '',
      playlistImg: '',
      currentQuiz: '',
      videoOrder: 1
    })
  }

  setAnswers(answersArr) {
    let returnArr = []
    answersArr.map(answer => {
      returnArr.push({ option: answer.option, is_correct: answer.is_correct, id: answer.id })
    })
    this.setState({
      currentAnswers: returnArr
    })
  }

  addNewAnswer() {
    this.setState(prevState => ({
      currentAnswers: [...prevState.currentAnswers, { option: '', is_correct: false, id: null }]
    }));
  }

  setNewQuiz() {
    this.setState({
      currentQuiz: "",
      currentAnswers: [{ option: '', is_correct: false, id: null }]
    })
  }

  resetFocus() {
    let newArr = this.state.currentAnswers.map(answer => {
      answer[3] = false
    })
    this.setState({ currentAnswers: newArr })
  }

  handleAnswerChange(e, idx, answerIdx) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    let newArr = this.state.currentAnswers;
    newArr[idx][answerIdx] = value;
    this.setState({
      currentAnswers: newArr
    });
  }

  setEdit() {
    this.setState({
      isEditingPlaylist: false
    })
  }

  getPlaylists() {
    playlistIndex()
      .then((data) => {
        this.setState({
          playlists: data
        })
        return data
      })
      .catch(err => console.log(err))
  }

  getOnePlaylist(id) {
    playlistShow(id)
      .then((data) => {
        this.setState({
          currentPlaylist: data.playlist[0]
        });
        return data.playlist[0]
      })
      .catch(err => console.log(err))
  }

  addPlaylist(playlist) {
    postPlaylist(playlist, this.state.currentUser.id)
      .then(data => this.getOnePlaylist(data.playlist.id))
      .then(resp => this.getPlaylists())
      .catch(err => console.log(err))
  }

  changePlaylist(playlist) {
    updatePlaylist(playlist)
      .then(data => this.getOnePlaylist(this.state.currentPlaylist.id))
      .then(resp => this.getPlaylists())
      .catch(err => console.log(err))
  }

  deletePlaylist(id) {
    destroyPlaylist(id)
      .then(data => this.getPlaylists())
      .catch(err => console.log(err))
  }

  addVideo(video, id) {
    postVideo(video, id)
      .then(data => this.getOnePlaylist(this.state.currentPlaylist.id))
      .then(resp => this.getPlaylists())
      .catch(err => console.log(err))
  }

  changeVideo(video) {
    updateVideo(video)
      .then(data => this.getOnePlaylist(this.state.currentPlaylist.id))
      .then(resp => this.getPlaylists())
      .catch(err => console.log(err))
  }

  addQuiz(videoId) {
    postQuiz(this.state.currentQuiz, videoId)
      .then((data) => this.addAnswers(data.quiz.id, this.state.currentAnswers))
  }

  changeQuiz(quiz) {
    updateQuiz({ question: this.state.currentQuiz, id: quiz.id })
    // .then(data => console.log(data))
      .then(data => this.changeanswers(data.quiz.id, this.state.currentAnswers))
  }

  addAnswers(quiz, ansArr) {
    ansArr.forEach(answer => {
      postAnswer(quiz, { option: answer.option, is_correct: answer.is_correct })
        .then(data => this.getOnePlaylist(this.state.currentPlaylist.id))
        .then(resp => this.getPlaylists())
    })
  }

  changeanswers(quizID, ansArr) {
    ansArr.forEach(answer => {
      debugger;
      if (answer.id) {
        updateAnswer(answer)
          .then(data => this.getOnePlaylist(this.state.currentPlaylist.id))
          .then(resp => this.getPlaylists())
      } else {
        postAnswer(quizID, answer)
          .then(data => this.getOnePlaylist(this.state.currentPlaylist.id))
          .then(resp => this.getPlaylists())
      }
    })
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  // Functions to handle all of the user login, registers and authentication

  userResponse(answerId) {
    userAnswer(this.state.currentUser.id, answerId)
      .catch(err => console.log(err))
  }

  isLoggedIn() {
    const res = !!(localStorage.getItem("jwt"));
    this.setState({
      isLoggedIn: res,
    })
    if (res) {
      let token = decode(localStorage.getItem("jwt"))
      this.setState({
        currentUser: { username: token.username, id: token.id }
      })
    }
    return res;
  }

  handleRegister(username, password) {
    registerUser({ "username": username, "password": password })
      .then(() => this.handleLoginSubmit(username, password))
      .catch(err => console.log(err))
  }

  handleLoginSubmit(username, password) {
    loginUser({ "username": username, "password": password })
      .then(res => localStorage.setItem("jwt", res.jwt))
      .then(() => this.setState({
        isLoggedIn: true,
      }))
      .then(() => {
        let token = decode(localStorage.getItem("jwt"))
        this.setState({
          currentUser: { username: token.username, id: token.id }
        })
      })
      .catch(err => console.log(err))
  }

  toggleLoginModal() {
    this.setState({
      loginModal: !this.state.loginModal
    })
  }

  toggleRegisterModal() {
    this.setState({
      registerModal: !this.state.registerModal
    })
  }

  logout() {
    localStorage.removeItem("jwt")
    this.setState({
      isLoggedIn: false,
    })
  }

  // End of user functions. now rendering view

  render() {
    return (
      <Router>
        <div>
          <Header
            currentUser={this.state.currentUser}
            isLoggedIn={this.state.isLoggedIn}
            toggleLoginModal={this.toggleLoginModal}
            resetForm={this.resetForm}
            logout={this.logout}
          />
          <Login
            loginModal={this.state.loginModal}
            toggleRegisterModal={this.toggleRegisterModal}
            handleLoginSubmit={this.handleLoginSubmit}
            toggleLoginModal={this.toggleLoginModal}
          />
          <Register
            registerModal={this.state.registerModal}
            toggleRegisterModal={this.toggleRegisterModal}
            handleRegister={this.handleRegister}
          />
          <Route
            exact={true}
            path="/"
            render={(props) => <PlaylistSearch
              {...props}
              isLoggedIn={this.state.isLoggedIn}
              playlists={this.state.playlists}
              toggleLoginModal={this.toggleLoginModal}
              getOnePlaylist={this.getOnePlaylist}
            />}
          />
          <Route
            path="/playlists/:playlist_id"
            render={((props) => <ShowPlaylist
              {...props}
              currentPlaylist={this.state.currentPlaylist}
              userResponse={this.userResponse}
            />)}
          />
          <Route
            exact={true}
            path='/user/playlists'
            render={((props) => <UserPlaylists
              {...props}
              currentUser={this.state.currentUser}
              playlists={this.state.playlists}
              getOnePlaylist={this.getOnePlaylist}
              deletePlaylist={this.deletePlaylist}
              setEdit={this.setEdit}
            />)}
          />
          <Route
            path='/user/playlists/manage'
            render={((props) => <CreateEditPlaylist
              {...props}
              isEditingPlaylist={this.state.isEditingPlaylist}
              currentPlaylist={this.state.currentPlaylist}
              currentVideoUrl={this.state.currentVideoUrl}
              currentAnswers={this.state.currentAnswers}
              playlistTitle={this.state.playlistTitle}
              playlistImg={this.state.playlistImg}
              currentQuiz={this.state.currentQuiz}
              videoOrder={this.state.videoOrder}
              handleAnswerChange={this.handleAnswerChange}
              changePlaylist={this.changePlaylist}
              handleChange={this.handleChange}
              addNewAnswer={this.addNewAnswer}
              addPlaylist={this.addPlaylist}
              changeVideo={this.changeVideo}
              setNewQuiz={this.setNewQuiz}
              changeQuiz={this.changeQuiz}
              setAnswers={this.setAnswers}
              addVideo={this.addVideo}
              addQuiz={this.addQuiz}
            />)}
          />
        </div>
      </Router>
    );
  }
}

export default App;
