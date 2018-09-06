import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import { loginUser } from './services/api';
import Header from './components/Header';
import Login from './components/Login';
import PlaylistSearch from './components/PlaylistSearch';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      loginModal: false,
      registerModal: false
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.logout = this.logout.bind(this)
  }

  toggleModal(modal) {
    this.setState({
      [modal]: !this.state.loginModal
    })
  }

  isLoggedIn() {
    const res = !!(localStorage.getItem("jwt"));
    this.setState({
      isLoggedIn: res,
    })
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

  handleLoginSubmit( username, password ) {
    loginUser({ "username": username, "password": password })
      .then(res => localStorage.setItem("jwt", res.jwt))
      .then(() => this.setState({
        isLoggedIn: true,
      }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.isLoggedIn()
  }

  render() {
    return (
      <Router>
        <div>
          <Header 
          isLoggedIn={this.state.isLoggedIn}
          toggleModal={this.toggleModal}
          />
          <Route exact={true} path="/" component={PlaylistSearch}/>
          <div className={ this.state.loginModal?"modal is-active":"modal" }>
            <div className="modal-background"></div>
            <div className="modal-content">
              <Login
                handleLoginSubmit={this.handleLoginSubmit}
                toggleModal={this.toggleModal}
              />
            </div>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
