import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PlaylistSearch(props) {
  return (
    <section className="hero is-info">
      <div className="hero-body">
        <div className="container">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-large" type="search" placeholder="Search" />
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
  )
}

export default PlaylistSearch;