import 'Styles/app.styl'
import React, { Component } from 'react'
import AppStore from 'AppStore'
import Detector from '../config/Detector'
import AssetsManager from '../helpers/AssetsManager'
import AppTemplate from './template'

export default class App extends Component {
  constructor () {
    super()
    Detector.testDevice()
    AppStore.IS_MOBILE = Detector.isMobile()
    this.initLoader()
  }
  initLoader () {
    this.loader = new AssetsManager()
    this.loader.load()
  }
  render () {
    return (
      <AppTemplate />
    )
  }
}
