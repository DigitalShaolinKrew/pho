import { Component } from 'react'

import autobind from '../../utils/Autobind'

export default class BaseComponent extends Component {
  constructor ( props ) {
    super( props )
    autobind( this )
  }
  render () {
    return true
  }
}
