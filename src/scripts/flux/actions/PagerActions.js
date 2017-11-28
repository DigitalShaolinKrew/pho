import Constants from 'PagerConstants'
import Dispatcher from '../dispatcher'

const PagerActions = {
  onPageReady: () => {
    Dispatcher.handlePagerAction( {
      type: Constants.PAGE_IS_READY,
      item: undefined
    } )
  },
  onTransitionOut: () => {
    Dispatcher.handlePagerAction( {
      type: Constants.PAGE_TRANSITION_OUT,
      item: undefined
    } )
  },
  onTransitionOutComplete: () => {
    Dispatcher.handlePagerAction( {
      type: Constants.PAGE_TRANSITION_OUT_COMPLETE,
      item: undefined
    } )
  },
  onTransitionInComplete: () => {
    Dispatcher.handlePagerAction( {
      type: Constants.PAGE_TRANSITION_IN_COMPLETE,
      item: undefined
    } )
  },
  pageTransitionDidFinish: () => {
    Dispatcher.handlePagerAction( {
      type: Constants.PAGE_TRANSITION_DID_FINISH,
      item: undefined
    } )
  }
}

export default PagerActions
