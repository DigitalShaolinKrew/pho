import RouterConstants from 'RouterConstants'
import Dispatcher from '../dispatcher'

const RouterActions = {

  updatePath: ( ctx ) => {
    Dispatcher.handleRouterAction( {
      type: RouterConstants.UPDATE_PATH,
      item: ctx
    } )
  },
  beginRouting: () => {
    Dispatcher.handleRouterAction( {
      type: RouterConstants.BEGIN_ROUTING,
      item: undefined
    } )
  }

}

export default RouterActions
