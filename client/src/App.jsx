import React, { Component } from 'react';
import './App.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:'',
      isLoggedIn: null,
    };
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
      [e.target.name]:e.target.value
    })
  }

  logout() {
    localStorage.removeItem("jwt")
    this.setState({
     isLoggedIn: false,
    })
  }

  login() {
    const url = `${BASE_URL}/user_token`;
    const body = {"auth": {"username": this.state.username, "password": this.state.password} }
    const init = { method: 'POST',
                   headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                   mode: 'cors',
                   body: JSON.stringify(body),
                   }
    fetch(url, init)
    .then(res => res.json())
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
      <div className="App">
        <form>
          <label htmlFor="username">username: </label>
          <br />
          <input
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
            type="text"
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            onChange={this.handleChange}
            value={this.state.value}
            type="password"
          />
          </form>
          <br />

          <button onClick={this.login}>
          Login
          </button>

          <button onClick={this.logout}>
          Logout
          </button>
      </div>
    );
  }
}

export default App;
