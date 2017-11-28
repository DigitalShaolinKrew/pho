import React from 'react'
import './style.styl'
import BaseComponent from 'BaseComponent'
import AppStore from 'AppStore'
import RouterStore from 'RouterStore'
import RouterConstants from 'RouterConstants'

export default class TopNavigation extends BaseComponent {
  constructor () {
    super()
    this.routes = AppStore.getRoutes()
    this.state = {
      active: ''
    }
  }
  componentWillMount () {
    RouterStore.on( RouterConstants.UPDATE_PATH, this.didPathUpdate )
  }
  render () {
    return (
      <div className="top-navigation">
        {
          this.routes.map( ( route, index ) => {
            const className = this.state.active === route.id ? 'top-navigation__link top-navigation__link--active' : 'top-navigation__link'
            return (
              <a href={ route.path } className={ className } key={ index }>{ route.name }</a>
            )
          } )
        }
        <a href="/not-found" className="top-navigation__link">Not found</a>
      </div>
    )
  }
  didPathUpdate () {
    const newRoute = RouterStore.newRoute()
    this.setState( {
      active: newRoute.id
    } )
  }
}
