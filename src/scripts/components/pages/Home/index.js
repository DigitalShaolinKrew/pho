import React from 'react'
import Page from 'Page'

export default class Home extends Page {
  setupAnimations () {
    this.tlIn.from( this.refs.title, 0.5, { opacity: 0, y: 20 }, 0 )
    this.tlIn.from( this.refs.baseline, 0.5, { opacity: 0, y: 20 }, 0.2 )
    this.tlOut.to( this.refs.baseline, 0.5, { opacity: 0, y: 20 }, 0 )
    this.tlOut.to( this.refs.title, 0.5, { opacity: 0, y: 20 }, 0.2 )
    super.setupAnimations()
  }
  render () {
    return (
      <div className="page home">
        <div className="hero">
          <h1 ref="title">Home</h1>
          <p ref="baseline">Hello from the Home page!</p>
        </div>
      </div>
    )
  }
}
