import React from 'react'
import './navbar.scss'
export function Navbar() {
  return (
    <nav
      className="navbar is-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h1 className="title is-3">Plab</h1>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Documentation</a>
        </div>

        <div className="navbar-end">
          <input type="text" className="input" />
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-light">Search</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
