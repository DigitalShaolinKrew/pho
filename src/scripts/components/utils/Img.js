import React from 'react'
import BaseComponent from 'BaseComponent'
import { TweenMax } from 'gsap'

export default class Img extends BaseComponent {
  render () {
    return (
      <img src={ this.props.src } className={ this.props.className } ref="parent"/>
    )
  }
  componentDidMount () {
    TweenMax.set( this.refs.parent, { opacity: 0 } )
    const img = new Image()
    img.onload = () => {
      if ( this.props.didLoad ) {
        this.props.didLoad( this.props, {
          width: img.width,
          height: img.height
        } )
      }
      TweenMax.to( this.refs.parent, 1, { opacity: 1, ease: Expo.easeOut } )
    }
    img.src = this.props.src
  }
}
