import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import decode from 'jwt-decode';
import { loginUser, registerUser } from './services/api';
import PlaylistSearch from './components/PlaylistSearch';
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
      currentUser: null
    };
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.logout = this.logout.bind(this)
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
          currentUser: decode(token).sub
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

  isLoggedIn() {
    const res = !!(localStorage.getItem("jwt"));
    this.setState({
      isLoggedIn: res,
    })
    // if (res) {
      // let token = decode(localStorage.getItem("jwt"))
    //   this.setState({
    //     currentUser: decode(token.username)
    //   })
    // }
    return res;
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



  componentDidMount() {
    this.isLoggedIn();
  }

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
          <Route exact={true} path="/" component={PlaylistSearch} />
          <div className={this.state.loginModal ? "modal is-active" : "modal"}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <Login
                toggleRegisterModal={this.toggleRegisterModal}
                handleLoginSubmit={this.handleLoginSubmit}
                toggleLoginModal={this.toggleLoginModal}
              />
            </div>
          </div>
          <div className={this.state.registerModal ? "modal is-active" : "modal"}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <Register
                toggleRegisterModal={this.toggleRegisterModal}
                handleRegister={this.handleRegister}
              />
            </div>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
