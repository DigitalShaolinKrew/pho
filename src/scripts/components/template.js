import React, { Component } from 'react'
import { event, select } from 'dom-hand'
import raf from 'raf'
import AppStore from 'AppStore'
import AppConstants from 'AppConstants'
import AppActions from 'AppActions'
import WindowStore from 'WindowStore'
import WindowConstants from 'WindowConstants'
import WindowActions from 'WindowActions'
import Loader from './blocks/Loader'
import TopNavigation from './blocks/TopNavigation'
import PagesContainer from './blocks/PagesContainer'

export default class AppTemplate extends Component {
  constructor () {
    super()
    this.scrollTop = 0
    this.smoothScroll = 0
    this.IS_MOBILE = AppStore.IS_MOBILE
  }
  componentWillMount () {
    if ( !this.IS_MOBILE ) {
      WindowStore.on( WindowConstants.WINDOW_RESIZE, this.onResize )
      AppStore.on( AppConstants.PAGE_MUTATED, this.setInnerHeight )
      event.on( window, 'scroll', this.onScroll )
    }
  }
  componentDidMount () {
    if ( !this.IS_MOBILE ) {
      this.innerHeight = document.createElement( 'div' )
      this.innerHeight.style.height = WindowStore.Size.h + 'px'
      select( '#container' ).appendChild( this.innerHeight )
      this.update()
    }
    AppStore.FrontBlock = this.refs.frontBlock
    WindowActions.resize()
  }
  render () {
    return (
      <div id="app">
        <Loader />
        <TopNavigation/>
        <div ref="frontBlock" id="front-block"></div>
        <PagesContainer ref="pagesContainer" />
      </div>
    )
  }
  update = () => {
    this.refs.pagesContainer.update()
    raf( this.update )
  }
  setInnerHeight = ( pageH ) => {
    this.innerHeight.style.height = pageH + 'px'
  }
  onResize = () => {
    this.refs.pagesContainer.resize()
  }
  onScroll = ( e ) => {
    e.preventDefault()
    this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY
    if ( this.scrollTop === 0 ) console.log( 'top' )
    AppActions.onScroll( this.scrollTop )
  }
}
