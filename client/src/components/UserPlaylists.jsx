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
    this.context.router.history.push(playlistId);
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
                    <img src={playlist.thumbnail_url} alt="Placeholder" />
                  </figure>
                </div>
                <button onClick={() => {
                  this.props.getOnePlaylist(playlist.id);
                  this.changeRoute(`playlists/${playlist.id}`);
                }}>play</button>
                <button onClick={(() => {
                  this.props.getOnePlaylist(playlist.id);
                  this.changeRoute('/user/playlists/manage');
                  this.props.setEdit();
                })}>Edit</button>
                <button onClick={(() => this.props.deletePlaylist(playlist.id))}>Delete</button>
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