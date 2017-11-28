import React from 'react'
import Page from 'Page'

export default class About extends Page {
  setupAnimations () {
    this.tlIn.from( this.refs.title, 0.5, { opacity: 0, x: -20 }, 0 )
    this.tlIn.from( this.refs.baseline, 0.5, { opacity: 0, x: -20 }, 0.2 )
    this.tlOut.to( this.refs.baseline, 0.5, { opacity: 0, x: -20 }, 0 )
    this.tlOut.to( this.refs.title, 0.5, { opacity: 0, x: -20 }, 0.2 )
    super.setupAnimations()
  }
  render () {
    return (
      <div className="page about">
        <div className="hero">
          <h1 ref="title">About</h1>
          <p ref="baseline">Hello from the About page!</p>
        </div>
      </div>
    )
  }
}
