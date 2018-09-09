import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


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
    this.context.router.history.push(`/playlists/${playlistId}`);
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
        <div className="scrollable">
          <div className="list-playlists">
            {
              this.props.playlists.filter(item => this.filterFN(item)).map((playlist) => (
                <div
                  className="card"
                  onClick={() => {
                    this.props.GetOnePlaylist(playlist.id);
                    this.changeRoute(playlist.id);
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
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                      </figure>
                    </div>
                  </div>
                </div>
              ))
            }
            <hr className="line-break" />
            {
              this.props.playlists.map((playlist) => (
                <div key={playlist.id} className="card">
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
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

PlaylistSearch.contextTypes = {
  router: PropTypes.func.isRequired
}

export default PlaylistSearch;