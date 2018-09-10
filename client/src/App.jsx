import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import decode from 'jwt-decode';

import { loginUser, registerUser, playlistIndex, playlistShow, quizzesIndex, userAnswer } from './services/api';
import PlaylistSearch from './components/PlaylistSearch';
import ShowPlaylist from './components/ShowPlaylist';
import Register from './components/Register';
import Header from './components/Header';
import Login from './components/Login';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      loginModal: false,
      registerModal: false,
      currentUser: null,
      playlists: [],
      currentPlaylist: null,
      // playlistOrder: [],
      // startvideo: null
    };
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.getOnePlaylist = this.getOnePlaylist.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.userResponse = this.userResponse.bind(this)
    this.getPlaylists = this.getPlaylists.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.isLoggedIn();
    this.getPlaylists();
  }

  getPlaylists() {
    playlistIndex()
      .then((data) => {
        this.setState({
          playlists: data.playlists
        })
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
      .then(data => this.getQuizzes())
      .catch(err => console.log(err))
  }

  getQuizzes() {
    quizzesIndex()
      .then(resp => this.combineData(this.state.currentPlaylist, resp.quizzes))
      .then((data) => {
        this.setState({
          currentPlaylist: data
        });
      })
  }

  combineData(parentArg, childArg) {
    const videoArr = parentArg.videos.map(video => {
      let quizzes = childArg.filter(quiz => quiz.video_id === video.id);
      return { ...video, quizzes }
    })
    parentArg.videos = videoArr
    return parentArg
  }

  userResponse(answerId) {
    userAnswer(this.state.currentUser.id, answerId)
      .catch(err => console.log(err))
  }

  // Functions to handle all of the user login, registers and authentication

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
        console.log(token)
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


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
            logout={this.logout}
          />
          <Login
            toggleRegisterModal={this.toggleRegisterModal}
            handleLoginSubmit={this.handleLoginSubmit}
            toggleLoginModal={this.toggleLoginModal}
            loginModal={this.state.loginModal}
          />
          <Register
            toggleRegisterModal={this.toggleRegisterModal}
            handleRegister={this.handleRegister}
            registerModal={this.state.registerModal}
          />
          <Route
            exact={true}
            path="/"
            render={(props) => <PlaylistSearch
              {...props}
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
            // playlistOrder={this.state.playlistOrder}
            />)}
          />
        </div>
      </Router>
    );
  }
}

export default App;
