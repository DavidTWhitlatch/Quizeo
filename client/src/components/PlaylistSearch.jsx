import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class PlaylistSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.changeRoute = this.changeRoute.bind(this)
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  filterFN(playlist) {
    return playlist.name.toUpperCase().includes(this.state.inputValue.toUpperCase())
  }

  changeRoute = (playlistId) => {
    this.props.history.push(`/playlists/${playlistId}`);
  }

  render() {
    return (
      <div>
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <div className="control has-icons-left has-icons-right">
                      <input
                        className="input is-large"
                        type="search"
                        value={this.state.inputValue}
                        placeholder="Search"
                        onChange={this.handleChange}
                      />
                      <span className="icon is-medium is-left">
                        <FontAwesomeIcon icon={["fas", "search"]} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {this.props.playlists.length ?
          (<div className="scrollable">
            <div className="list-playlists">
              {
                this.props.playlists.filter(item => this.filterFN(item)).map((playlist) => (
                  <div
                    className="card"
                    onClick={() => {
                      if (this.props.isLoggedIn) {
                        this.props.getOnePlaylist(playlist.id);
                        this.changeRoute(playlist.id);
                      } else {
                        this.props.toggleLoginModal();
                      }
                    }}
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
                    </div>
                  </div>
                ))}
            </div>
          </div>) :
          <div className="center">
            <div>loading...</div>
            <img src={window.location.origin + '/img/loading.gif'} alt="Loading" />
          </div>
        }
        <hr className="line-break" />
      </div>
    )
  }
}



export default withRouter(PlaylistSearch);