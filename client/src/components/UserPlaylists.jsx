import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserPlaylists extends Component {
  constructor(props) {
    super(props);
  }

  userFilter(playlist) {
      return playlist.user_id === this.props.currentUser.id
  }

  changeRoute = (playlistId) => {
    this.context.router.history.push(`/playlists/${playlistId}`);
  }

  render() {
    return (
        <div className="list-playlists">
          {
            this.props.playlists.filter(item => this.userFilter(item)).map((playlist) => (
              <div
                className="card"
                key={playlist.id}
              >
                <div className="card-content">
                  <header className="card-header">
                    <p className="card-header-title">
                      {playlist.name}
                    </p>
                  </header>
                  <div className="card-image">
                    <figure className="image">
                      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                    </figure>
                  </div>
                  <button onClick={() => {
                    this.props.getOnePlaylist(playlist.id);
                    this.changeRoute(playlist.id);
                  }}>play</button>
                  <button>Edit</button>
                  <button onClick={(() =>this.props.deletePlaylist(playlist.id))}>Delete</button>
                </div>
              </div>
            ))
          }
          <hr className="line-break" />
        </div>
    )
  }
}

UserPlaylists.contextTypes = {
  router: PropTypes.func.isRequired
}

export default UserPlaylists;