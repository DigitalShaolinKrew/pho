import page from 'page'
import assign from 'object-assign'
import RouterActions from 'RouterActions'
import AppStore from 'AppStore'
import AppConstants from 'AppConstants'
import Home from '../components/pages/Home/'
import About from '../components/pages/About/'
import NotFound from '../components/pages/NotFound/'

export default () => {
  const routes = AppStore.getRoutes()
  routes.map( ( route ) => {
    const template = getTemplate( route.type )
    page( route.path, ctx => next( ctx, template, route.type, route.id, route.name ) )
  } )
  // if (AppStore.getEnvironment() === 'DEV') page( '/ui', ctx => next(ctx, UI, 'UI', 'ui', 'UI')) // Visible only on DEV env
  page( '*', ctx => next( ctx, NotFound, 'NOTFOUND', 'notfound', 'NotFound' ) )
}

const next = ( ctx, template, type, id, name ) => {
  setTimeout( () => {
    RouterActions.updatePath( assign( {}, ctx, { template }, { type }, { id }, { name } ) )
  } )
}

const getTemplate = ( type ) => {
  let template
  switch ( type ) {
    case AppConstants.PAGES.HOME:
      template = Home
      break
    case AppConstants.PAGES.ABOUT:
      template = About
      break
  }
  return template
}
