import 'Styles/app.styl'
import React, { Component } from 'react'
import InitialState from '../config/InitialState'
import AssetsManager from '../helpers/AssetsManager'
import AppTemplate from './template'

export default class App extends Component {
  constructor () {
    super()
    this.INITIAL_STATE = new InitialState()
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
