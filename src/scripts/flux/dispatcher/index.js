import Flux from 'flux'
import assign from 'object-assign'

const Dispatcher = assign( new Flux.Dispatcher(), {
  handlePagerAction: ( action ) => {
    Dispatcher.dispatch( action )
  },
  handleRouterAction: ( action ) => {
    Dispatcher.dispatch( action )
  },
  handleWindowAction: ( action ) => {
    Dispatcher.dispatch( action )
  },
  handleAppAction: ( action ) => {
    Dispatcher.dispatch( action )
  }
} )

export default Dispatcher
