import React from 'react'
import BaseComponent from 'BaseComponent'
import WindowStore from 'WindowStore'
// import AppConstants from 'AppConstants'
import transform from 'dom-css-transform'

export default class ParallaxComponent extends BaseComponent {
  static get defaultProps () {
    return {
      from: -30,
      to: 30
    }
  }
  constructor ( props ) {
    super( props )
    this.props = props
    this.scrollTop = 0
    this.smoothScroll = 0
  }
  render () {
    return (
      <section className="parallax-component" ref="parent">
        { this.props.children }
      </section>
    )
  }
  componentDidMount () {
    this.bounds = this.getBounds()
  }
  getBounds () {
    const rect = this.refs.parent.getBoundingClientRect()
    const { top, bottom, height, left, right } = rect
    return {
      height,
      right,
      left,
      top: top + this.scrollTop,
      bottom
    }
  }
  testViewportVisibility () {
    const top = this.bounds.top - this.smoothScroll
    const bottom = top + this.bounds.height

    const isTopViewPort = top >= 0 && top <= WindowStore.Size.h
    const isBotViewPort = bottom >= 0 && bottom <= WindowStore.Size.h

    const midViewPort = Math.ceil( this.smoothScroll + WindowStore.Size.h / 2 )
    const midElem = Math.ceil( this.bounds.height / 2 + top + this.smoothScroll )

    const minView = Math.ceil( this.smoothScroll )
    const maxView = Math.ceil( minView + WindowStore.Size.h )

    return { isTopViewPort, isBotViewPort, midViewPort, midElem, minView, maxView }
  }
  updateParallax () {
    const elemViewPortDistance = this.viewport.midViewPort - this.viewport.midElem
    const ratioElemDistance = ( elemViewPortDistance / this.viewport.maxView )

    const parallaxeDistance = this.props.from - this.props.to
    const parallaxeValue = ratioElemDistance * parallaxeDistance

    transform( this.refs.parent, `translateY(${( -1 * Math.round( parallaxeValue * 10 ) / 10 )}px) translateZ(0)` )
  }
  update = ( smoothScroll ) => {
    this.smoothScroll = smoothScroll
    this.viewport = this.testViewportVisibility()
  }
  onScroll = ( scrollTop ) => {
    this.scrollTop = scrollTop
    this.updateParallax()
  }
}
