import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="modal-card login">
        <header className="modal-card-head login-header">
          <h2 className="modal-card-title">Register</h2>
          <button className="delete is-large" id="cancel-button" onClick={this.props.toggleModal}></button>
        </header>
        <section className="modal-card-body">
          <form className="login-container" onSubmit={(e) => {
            e.preventDefault();
          }
          } >
            <p><input type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange} /></p>
            <p><input type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange} /></p>
            <p><button className="button" type="submit" value="Register" onClick={(e) => {
              e.preventDefault();
              this.props.toggleModal();
              this.props.handleRegister();
            }
            } >Register</button></p>
          </form>
        </section>
      </div>
    )
  };
}

export default Login;
