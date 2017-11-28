import React, { Component } from 'react'
import raf from 'raf'
import AppStore from 'AppStore'
import WindowStore from 'WindowStore'
import WindowConstants from 'WindowConstants'
import WindowActions from 'WindowActions'
import Loader from './blocks/Loader'
import TopNavigation from './blocks/TopNavigation'
import PagesContainer from './blocks/PagesContainer'

export default class AppTemplate extends Component {
  componentWillMount () {
    WindowStore.on( WindowConstants.WINDOW_RESIZE, this.resize )
  }
  componentDidMount () {
    AppStore.FrontBlock = this.refs.frontBlock
    WindowActions.resize()
  }
  render () {
    return (
      <div id='app'>
        <Loader />
        <TopNavigation />
        <div ref='frontBlock' id='front-block'></div>
        <PagesContainer ref='pagesContainer' />
      </div>
    )
  }
  update = () => {
    this.refs.pagesContainer.update()
    raf( this.update )
  }
  resize = () => {
    this.refs.pagesContainer.resize()
  }
}
