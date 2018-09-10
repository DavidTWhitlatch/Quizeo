import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header(props) {
  return (
    <nav className="navbar has-shadow">
      <div className="container">
        <div className="navbar-brand"><a className="navbar-item" href="../">Quizeo</a>
          <div className="navbar-burger burger" data-target="navMenu"><span></span><span></span><span></span></div>
        </div>
        <div className="navbar-menu" id="navMenu">
          <div className="navbar-end">
            {
              props.isLoggedIn
                ?
                (
                  <div className="navbar-item has-dropdown is-hoverable"><a className="navbar-link">{props.currentUser.username}&nbsp;<FontAwesomeIcon icon="user" /></a>
                    <div className="navbar-dropdown is-right">
                      <a className="navbar-item">Stats</a>
                      <a className="navbar-item">My Lessons</a>
                      <a className="navbar-item">Create a Lesson</a>
                      <hr className="navbar-divider" />
                      <a className="navbar-item" onClick={props.logout}>Logout</a>
                    </div>
                  </div>
                )
                :
                (
                  <span className="navbar-item" onClick={() => props.toggleLoginModal()}>
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

export default Header;