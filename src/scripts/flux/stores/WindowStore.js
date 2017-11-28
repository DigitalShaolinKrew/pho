import { EventEmitter2 } from 'eventemitter2'
import assign from 'object-assign'
import Dispatcher from '../dispatcher'
import WindowConstants from 'WindowConstants'

const WindowStore = assign( {}, EventEmitter2.prototype, {
  Size: { w: window.innerWidth, h: window.innerHeight },
  Mouse: { x: 0, y: 0, nX: 0, nY: 0 },
  Device: { orientation: WindowConstants.PORTRAIT },
  dispatchToken: Dispatcher.register( ( payload ) => {
    const actionType = payload.type
    const item = payload.item
    switch ( actionType ) {
      case WindowConstants.WINDOW_RESIZE:
        WindowStore.Device.orientation = ( item.windowW > item.windowH ) ? WindowConstants.LANDSCAPE : WindowConstants.PORTRAIT
        WindowStore.Size.w = item.windowW
        WindowStore.Size.h = item.windowH
        WindowStore.emit( actionType, item )
        break
      case WindowConstants.MOUSE_MOVE:
        WindowStore.Mouse = item
        WindowStore.emit( actionType, item )
        break
      default:
        WindowStore.emit( actionType, item )
        break
    }
  } )

} )

export default WindowStore
