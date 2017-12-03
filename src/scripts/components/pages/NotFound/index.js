import React from 'react'
import Page from 'Page'
import AppActions from 'AppActions'
import './style.styl'

export default class NotFound extends Page {
  setupAnimations () {
    this.tlIn.from( this.refs.parent, 0.3, { opacity: 0 }, 0 )
    this.tlIn.from( this.refs.title, 0.5, { opacity: 0, scale: 0.8 }, 0.3 )
    this.tlIn.from( this.refs.baseline, 0.5, { opacity: 0, scale: 0.8 }, 0.5 )
    this.tlOut.to( this.refs.baseline, 0.5, { opacity: 0, scale: 0.8 }, 0 )
    this.tlOut.to( this.refs.title, 0.5, { opacity: 0, scale: 0.8 }, 0.2 )
    this.tlOut.to( this.refs.parent, 0.3, { opacity: 0 }, 0.5 )
    super.setupAnimations()
  }
  render () {
    return (
      <div className="page not-found" ref="parent">
        <div className="hero">
          <h1 ref="title">404</h1>
          <p ref="baseline">Hello from the 404 page!</p>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.innerHeight = Math.floor( this.refs.parent.getBoundingClientRect().height )
    setTimeout( AppActions.pageMutated, 0, this.innerHeight )
    super.componentDidMount()
  }
}
