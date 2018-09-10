import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute = () => {
    this.context.router.history.push(`/user/playlists/`);
  }

  render() {
    return (
      <nav className="navbar has-shadow">
        <div className="container">
          <div className="navbar-brand"><a className="navbar-item" href="/">Quizeo</a>
            <div className="navbar-burger burger" data-target="navMenu"><span></span><span></span><span></span></div>
          </div>
          <div className="navbar-menu" id="navMenu">
            <div className="navbar-end">
              {
                this.props.isLoggedIn
                  ?
                  (
                    <div className="navbar-item has-dropdown is-hoverable"><a className="navbar-link">{this.props.currentUser.username}&nbsp;<FontAwesomeIcon icon="user" /></a>
                      <div className="navbar-dropdown is-right">
                        <a className="navbar-item">Stats</a>

                        <a className="navbar-item" onClick={this.changeRoute}>My Lessons</a>

                        <a className="navbar-item">Create a Lesson</a>
                        <hr className="navbar-divider" />
                        <a className="navbar-item" onClick={this.props.logout}>Logout</a>
                      </div>
                    </div>
                  )
                  :
                  (
                    <span className="navbar-item" onClick={() => this.props.toggleLoginModal()}>
                      <a className="button is-light">
                        <span>Login</span>
                      </a>
                    </span>
                  )
              }
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

Header.contextTypes = {
  router: PropTypes.func.isRequired
}

export default Header;