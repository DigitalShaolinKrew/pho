import { EventEmitter2 } from 'eventemitter2'
import assign from 'object-assign'
import Dispatcher from '../dispatcher'
import WindowActions from 'WindowActions'
import WindowConstants from 'WindowConstants'
import { event } from 'dom-hand'

// const onMouseMove = ( e ) => {
//   const _mouse = { x: 0, y: 0, nX: 0, nY: 0 }
//   _mouse.x = e.clientX || _mouse.x
//   _mouse.y = e.clientY || _mouse.y
//   _mouse.nX = ( _mouse.x / window.innerWidth ) * 2 - 1
//   _mouse.nY = -( _mouse.y / window.innerHeight ) * 2 + 1
//   WindowActions.onMouseMove( _mouse )
// }

// const onMouseUp = () => { WindowActions.onMouseUp() }
// const onMouseDown = () => { WindowActions.onMouseDown() }
// const onWindowBlur = () => { WindowActions.onWindowBlur() }
// const onWindowFocus = () => { WindowActions.onWindowFocus() }

const onWindowResize = () => {
  WindowActions.onWindowResize( window.innerWidth, window.innerHeight )
}

event.on( window, 'resize', onWindowResize )
// event.on( window, 'mousemove', this.onMouseMove )
// event.on( window, 'mouseup', this.onMouseUp )
// event.on( window, 'mousedown', this.onMouseDown )
// event.on( window, 'blur', this.onWindowBlur )
// event.on( window, 'focus', this.onWindowFocus )

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
