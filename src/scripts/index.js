import React from 'react'
import ReactDOM from 'react-dom'
import AppStore from 'AppStore'
import AppActions from 'AppActions'
import Utils from './utils/Utils'
import App from './components/app'
import { AppContainer } from 'react-hot-loader'
import { select } from 'dom-hand'

let _data = {}

const renderApp = ( Component ) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    select( '#container' )
  )
}

const bootstrap = () => {
  AppActions.fillAppWithInitialData( _data )
  renderApp( App )
}

const init = () => {
  const dataJson = Utils.request( `${AppStore.getBasePath()}data.json` ).then( res => {
    _data = res.data
  } )
  dataJson.then( bootstrap )
}

init()

if ( module.hot ) {
  module.hot.accept( './components/app', () => {
    window.location.reload()
  } )
}
