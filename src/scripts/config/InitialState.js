import WindowActions from 'WindowActions'
import { event, select, classes } from 'dom-hand'
import MobileDetect from 'mobile-detect'
import { bindAll } from 'lodash'

const md = new MobileDetect( window.navigator.userAgent )

class InitialState {
  constructor () {
    this.bind()
    this.addListeners()
    this.testDevice()
  }

  bind () {
    bindAll( this, [ 'onWindowResize', 'onMouseMove', 'onMouseUp', 'onMouseDown', 'onWindowBlur', 'onWindowFocus' ] )
  }

  addListeners () {
    event.on( window, 'resize', this.onWindowResize )
    event.on( window, 'mousemove', this.onMouseMove )
    event.on( window, 'mouseup', this.onMouseUp )
    event.on( window, 'mousedown', this.onMouseDown )
    event.on( window, 'blur', this.onWindowBlur )
    event.on( window, 'focus', this.onWindowFocus )
  }

  onWindowResize () {
    WindowActions.onWindowResize( window.innerWidth, window.innerHeight )
  }

  onMouseMove ( e ) {
    e.preventDefault()
    const _mouse = { x: 0, y: 0, nX: 0, nY: 0 }

    _mouse.x = e.clientX || _mouse.x
    _mouse.y = e.clientY || _mouse.y
    _mouse.nX = ( _mouse.x / window.innerWidth ) * 2 - 1
    _mouse.nY = ( _mouse.y / window.innerHeight ) * 2 + 1
    WindowActions.onMouseMove( _mouse )
  }

  onMouseUp () {
    WindowActions.onMouseUp()
  }

  onMouseDown () {
    WindowActions.onMouseDown()
  }

  onWindowBlur () {
    WindowActions.onWindowBlur()
  }

  onWindowFocus () {
    WindowActions.onWindowFocus()
  }

  isMobile () {
    return md.mobile() !== null || md.tablet() !== null
  }
  isTablet () {
    return md.tablet() !== null && this.isMobile()
  }
  isPhone () {
    return this.isMobile() && !md.tablet()
  }

  testDevice () {
    if ( this.isMobile() ) {
      classes.add( select( 'html' ), 'is-mobile' )
      if ( this.isTablet() ) classes.add( select( 'html' ), 'is-tablet' )
      if ( this.isPhone() ) classes.add( select( 'html' ), 'is-phone' )
    } else classes.add( select( 'html' ), 'is-desktop' )
  }
}

export default InitialState
