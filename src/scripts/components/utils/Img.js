import React from 'react'
import BaseComponent from 'BaseComponent'

export default class Img extends BaseComponent {
  render () {
    return (
      <img src={ this.props.src } className={ this.props.className }/>
    )
  }
  componentDidMount () {
    const img = new Image()
    img.onload = () => {
      if ( this.props.didLoad ) {
        this.props.didLoad( this.props, {
          width: img.width,
          height: img.height
        } )
      }
    }
    img.src = this.props.src
  }
}
