import { select, classes } from 'dom-hand'
import MobileDetect from 'mobile-detect'

const md = new MobileDetect( window.navigator.userAgent )

const Detector = {
  isMobile: () => {
    return md.mobile() !== null || md.tablet() !== null
  },
  isTablet: () => {
    return md.tablet() !== null && Detector.isMobile()
  },
  isPhone: () => {
    return Detector.isMobile() && !md.tablet()
  },
  testDevice: () => {
    if ( Detector.isMobile() ) {
      classes.add( select( 'html' ), 'is-mobile' )
      if ( Detector.isTablet() ) classes.add( select( 'html' ), 'is-tablet' )
      if ( Detector.isPhone() ) classes.add( select( 'html' ), 'is-phone' )
    } else classes.add( select( 'html' ), 'is-desktop' )
  }
}

export default Detector
