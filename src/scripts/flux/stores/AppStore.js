import { EventEmitter2 } from 'eventemitter2'
import assign from 'object-assign'
import Dispatcher from '../dispatcher'
import AppConstants from 'AppConstants'
import RouterActions from 'RouterActions'
import { select } from 'dom-hand'

let _data

const AppStore = assign( {}, EventEmitter2.prototype, {
  Parent: select( '#container' ),
  Resources: {},
  getResource: ( id ) => AppStore.Resources[ id ],
  getEnvironment: () => ENV,
  getAppData: () => _data,
  getRoutes: () => _data.routes,
  getBasePath: () => AppConstants.ENVIRONMENTS[ ENV ],
  dispatchToken: Dispatcher.register( ( payload ) => {
    const actionType = payload.type
    const item = payload.item
    switch ( actionType ) {
      case AppConstants.FILL_APP_WITH_INITIAL_DATA:
        _data = item
        AppStore.emit( actionType )
        break
      case AppConstants.APP_START:
        setTimeout( RouterActions.beginRouting )
        AppStore.emit( actionType )
        break
      case AppConstants.RESOURCES_READY:
        AppStore.Resources = item
        AppStore.emit( actionType, item )
        break
      default:
        AppStore.emit( actionType, item )
        break
    }
  } )

} )

export default AppStore
