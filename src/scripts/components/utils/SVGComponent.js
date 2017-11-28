import React from 'react'
import BaseComponent from './BaseComponent'

export default class SVGComponent extends BaseComponent {
  render () {
    return <svg {...this.props}>{this.props.children}</svg>
  }
}
