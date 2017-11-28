import { EventEmitter2 } from 'eventemitter2'
import assign from 'object-assign'
import PagerConstants from 'PagerConstants'
import Dispatcher from '../dispatcher'

const PagerStore = assign( {}, EventEmitter2.prototype, {
  firstPageTransition: true,
  pageTransitionState: undefined,
  dispatchToken: Dispatcher.register( ( payload ) => {
    const actionType = payload.type
    const item = payload.item
    switch ( actionType ) {
      case PagerConstants.PAGE_IS_READY:
        PagerStore.pageTransitionState = PagerConstants.PAGE_TRANSITION_OUT_PROGRESS
        PagerStore.emit( PagerConstants.PAGE_TRANSITION_OUT )
        break
      case PagerConstants.PAGE_TRANSITION_OUT_COMPLETE:
        PagerStore.pageTransitionState = PagerConstants.PAGE_TRANSITION_IN_PROGRESS
        PagerStore.emit( PagerConstants.PAGE_TRANSITION_IN )
        break
      case PagerConstants.PAGE_TRANSITION_DID_FINISH:
        if ( PagerStore.firstPageTransition ) PagerStore.firstPageTransition = false
        PagerStore.pageTransitionState = PagerConstants.PAGE_TRANSITION_DID_FINISH
        PagerStore.emit( actionType )
        break
      default:
        PagerStore.emit( actionType, item )
        break
    }
    return true
  } )
} )

export default PagerStore
