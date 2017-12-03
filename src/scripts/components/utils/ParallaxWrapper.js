import React from 'react'
import BaseComponent from 'BaseComponent'
import AppStore from 'AppStore'
import AppConstants from 'AppConstants'
import AppActions from 'AppActions'
import WindowStore from 'WindowStore'
import WindowConstants from 'WindowConstants'
import transform from 'dom-css-transform'

export default class ParallaxWrapper extends BaseComponent {
  constructor ( props ) {
    super( props )
    this.props = props
    this.scrollTop = 0
    this.smoothScroll = 0
    this.IS_MOBILE = AppStore.IS_MOBILE
  }
  componentWillMount () {
    if ( !this.IS_MOBILE ) {
      AppStore.on( AppConstants.ON_SCROLL, this.onScroll )
      WindowStore.on( WindowConstants.WINDOW_RESIZE, this.onResize )
    }
  }
  render () {
    return (
      <section className="parallax-wrapper" ref="parent">
        { this.props.children }
      </section>
    )
  }
  componentDidMount () {
    if ( !this.IS_MOBILE ) this.onNewMutation()
  }
  update = () => {
    if ( this.IS_MOBILE ) return
    this.smoothScroll += ( this.scrollTop - this.smoothScroll ) * 0.1
    transform( this.refs.parent, `translateY(${-( Math.round( this.smoothScroll * 100 ) / 100 )}px) translateZ(0)` )
  }
  onNewMutation () {
    if ( this.IS_MOBILE ) return
    this.innerHeight = Math.floor( this.refs.parent.getBoundingClientRect().height )
    setTimeout( AppActions.pageMutated, 0, this.innerHeight )
  }
  onResize () {
    this.onNewMutation()
  }
  onScroll = ( scrollTop ) => {
    this.scrollTop = scrollTop
  }
  componentWillUnmount () {
    if ( !this.IS_MOBILE ) {
      AppStore.off( AppConstants.ON_SCROLL, this.onScroll )
      WindowStore.off( WindowConstants.WINDOW_RESIZE, this.onResize )
    }
  }
}
