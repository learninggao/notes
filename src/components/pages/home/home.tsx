import React from 'react'
// @ts-ignore
import data from './data.json'
// @ts-ignore
import notes from './data-notes.json'
import './home.scss'

export const Home = () => {
  return (
    <div className="container">
      <div className="main-wrapper">
        <div className="side-navigationpanel">
          <div className="side-nav-wrapper">
            <div className="main-head">head</div>
            <div className="main-area">
              <div className="oreo-section topic">
                <div className="oreo-body">
                  <div className="oreo-item-wrapper">
                    <div className="oreo-item">Hello</div>
                    <div className="oreo-item">React</div>
                  </div>
                </div>
                <div className="oreo-foot">
                  <div className="foot-item-wrapper">
                    <div className="oreo-item">Add Topic</div>
                  </div>
                </div>
              </div>
              <div className="oreo-section notes">
                <div className="oreo-body">
                  <div className="oreo-item-wrapper">
                    <div className="oreo-item">Hello</div>
                  </div>
                </div>
                <div className="oreo-foot">
                  <div className="foot-item-wrapper">
                    <div className="oreo-item">Add Topic</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
