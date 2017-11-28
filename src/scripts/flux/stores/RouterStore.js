import { EventEmitter2 } from 'eventemitter2'
import assign from 'object-assign'
import page from 'page'
import RouterConstants from 'RouterConstants'
import Dispatcher from '../dispatcher'
import setupRoutes from '../../config/Routes'

let _newRoute
let _oldRoute

const _initRouting = () => {
  setupRoutes()
  page( {
    hashbang: false
  } )
}

const RouterStore = assign( {}, EventEmitter2.prototype, {
  oldRoute: () => {
    return _oldRoute
  },
  newRoute: () => {
    return _newRoute
  },
  dispatchToken: Dispatcher.register( ( payload ) => {
    const actionType = payload.type
    const item = payload.item
    switch ( actionType ) {
      case RouterConstants.UPDATE_PATH:
        const route = item
        _oldRoute = _newRoute
        _newRoute = route
        RouterStore.emit( actionType )
        break
      case RouterConstants.BEGIN_ROUTING:
        _initRouting()
        RouterStore.emit( actionType )
        break
      default:
        RouterStore.emit( actionType, item )
        break
    }
    return true
  } )
} )

export default RouterStore
