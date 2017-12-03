import React from 'react'
import Page from 'Page'
import ParallaxWrapper from 'ParallaxWrapper'
import Img from 'Img'

export default class Home extends Page {
  setupAnimations () {
    this.tlIn.from( this.refs.title, 0.5, { opacity: 0, y: 20 }, 0 )
    this.tlIn.from( this.refs.baseline, 0.5, { opacity: 0, y: 20 }, 0.2 )
    this.tlIn.from( this.refs.content, 0.5, { opacity: 0, y: 20 }, 0.5 )
    this.tlOut.to( this.refs.content, 0.5, { opacity: 0, y: 20 }, 0 )
    this.tlOut.to( this.refs.baseline, 0.5, { opacity: 0, y: 20 }, 0.2 )
    this.tlOut.to( this.refs.title, 0.5, { opacity: 0, y: 20 }, 0.4 )
    super.setupAnimations()
  }
  render () {
    return (
      <ParallaxWrapper ref="parent">
        <div className="page home">
          <div className="hero">
            <h1 ref="title">Home</h1>
            <p ref="baseline">Hello from the Home page!</p>
          </div>
          <div ref="content" style={{ textAlign: 'center' }}>
            <div className="spacer"></div>
            <Img src="https://picsum.photos/600/400/?random" didLoad={ this.didLoad } />
            <div className="spacer"></div>
            <Img src="https://picsum.photos/600/400/?random" didLoad={ this.didLoad } />
            <div className="spacer"></div>
            <Img src="https://picsum.photos/600/400/?random" didLoad={ this.didLoad } />
            <div className="spacer"></div>
            <Img src="https://picsum.photos/600/400/?random" didLoad={ this.didLoad } />
            <div className="spacer"></div>
            <Img src="https://picsum.photos/600/400/?random" didLoad={ this.didLoad } />
            <div className="spacer"></div>
            <Img src="https://picsum.photos/600/400/?random" didLoad={ this.didLoad } />
            <div className="spacer"></div>
          </div>
        </div>
      </ParallaxWrapper>
    )
  }
  componentDidMount () {
    super.componentDidMount()
  }
  didLoad = () => {
    this.refs.parent.onNewMutation()
  }
  update () {
    this.refs.parent.update()
  }
  resize () {
    super.resize()
  }
}
