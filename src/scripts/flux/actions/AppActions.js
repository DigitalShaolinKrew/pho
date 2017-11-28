import AppConstants from 'AppConstants'
import Dispatcher from './../dispatcher'

const AppActions = {

  onResourceProgress: ( progress ) => {
    Dispatcher.handleAppAction( {
      type: AppConstants.RESOURCES_PROGRESS,
      item: progress
    } )
  },
  onResourceReady: ( resources ) => {
    Dispatcher.handleAppAction( {
      type: AppConstants.RESOURCES_READY,
      item: resources
    } )
  },
  loadPageAssets: () => {
    Dispatcher.handleAppAction( {
      type: AppConstants.PAGE_ASSETS_LOADED,
      item: undefined
    } )
  },
  fillAppWithInitialData: ( data ) => {
    Dispatcher.handleAppAction( {
      type: AppConstants.FILL_APP_WITH_INITIAL_DATA,
      item: data
    } )
  },
  appStart: () => {
    Dispatcher.handleAppAction( {
      type: AppConstants.APP_START,
      item: undefined
    } )
  }
}

export default AppActions
