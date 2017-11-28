import WindowConstants from 'WindowConstants'
import Dispatcher from './../dispatcher'

const WindowActions = {

  resize: ( windowW, windowH ) => {
    const w = windowW || window.innerWidth
    const h = windowH || window.innerHeight
    Dispatcher.handleWindowAction( {
      type: WindowConstants.WINDOW_RESIZE,
      item: { windowW: w, windowH: h }
    } )
  },
  onWindowResize: ( windowW, windowH ) => {
    Dispatcher.handleWindowAction( {
      type: WindowConstants.WINDOW_RESIZE,
      item: { windowW: windowW, windowH: windowH }
    } )
  },
  onMouseMove: ( mouse ) => {
    Dispatcher.handleWindowAction( {
      type: WindowConstants.MOUSE_MOVE,
      item: mouse
    } )
  },
  onMouseUp: () => {
    Dispatcher.handleWindowAction( {
      type: WindowConstants.MOUSE_UP,
      item: null
    } )
  },
  onMouseDown: () => {
    Dispatcher.handleWindowAction( {
      type: WindowConstants.MOUSE_DOWN,
      item: null
    } )
  },
  onWindowBlur: () => {
    Dispatcher.handleWindowAction( {
      type: WindowConstants.WINDOW_ON_BLUR,
      item: null
    } )
  },
  onWindowFocus: () => {
    Dispatcher.handleWindowAction( {
      type: WindowConstants.WINDOW_ON_FOCUS,
      item: null
    } )
  }

}

export default WindowActions
