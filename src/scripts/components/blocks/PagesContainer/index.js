import React from 'react'
import ReactDOM from 'react-dom'
import BaseComponent from 'BaseComponent'
import AppStore from 'AppStore'
import AppActions from 'AppActions'
import AppConstants from 'AppConstants'
import RouterStore from 'RouterStore'
import RouterConstants from 'RouterConstants'
import PagerStore from 'PagerStore'
import PagerConstants from 'PagerConstants'
import PagerActions from 'PagerActions'
import translate from 'css3-translate'

export default class PagesContainer extends BaseComponent {
  constructor () {
    super()
    this.currentPageDivRef = 'page-b'
    this.components = {
      newComponent: undefined,
      oldComponent: undefined
    }
  }
  componentWillMount () {
    PagerStore.on( PagerConstants.PAGE_TRANSITION_IN, this.willPageTransitionIn )
    PagerStore.on( PagerConstants.PAGE_TRANSITION_OUT, this.willPageTransitionOut )
    PagerStore.on( PagerConstants.PAGE_TRANSITION_DID_FINISH, this.pageTransitionDidFinish )
    RouterStore.on( RouterConstants.UPDATE_PATH, this.didPathUpdate )
    AppStore.on( AppConstants.PAGE_ASSETS_LOADED, this.pageAssetsLoaded )
  }
  render () {
    return (
      <main id="pages-container">
        <div style={ this.divStyle } ref="page-a" className="page-a"></div>
        <div style={ this.divStyle } ref="page-b" className="page-b"></div>
      </main>
    )
  }
  willPageTransitionIn () {
    this.switchPagesDivIndex()
    this.components.newComponent.willTransitionIn()
  }
  willPageTransitionOut () {
    if ( this.components.oldComponent ) this.components.oldComponent.willTransitionOut()
    else this.willPageTransitionIn()
  }
  didPageTransitionInComplete () {
    setTimeout( PagerActions.onTransitionInComplete )
    setTimeout( PagerActions.pageTransitionDidFinish )
  }
  didPageTransitionOutComplete () {
    setTimeout( PagerActions.onTransitionOutComplete )
  }
  pageTransitionDidFinish () {
    this.hideLoadState()
    this.unmountOldComponent()
  }
  switchPagesDivIndex () {
    const newEl = this.refs[ this.currentPageDivRef ]
    const oldEl = this.refs[ this.oldPageDivRef ]
    newEl.style.zIndex = 2
    oldEl.style.zIndex = 1
  }
  setupNewComponent () {
    const newRoute = RouterStore.newRoute()
    const Template = newRoute.template
    this.oldPageDivRef = this.currentPageDivRef
    this.currentPageDivRef = ( this.currentPageDivRef === 'page-a' ) ? 'page-b' : 'page-a'
    const el = this.refs[ this.currentPageDivRef ]
    const page =
      <Template
        id={ this.currentPageDivRef }
        isReady={ this.onPageReady }
        didTransitionInComplete={ this.didPageTransitionInComplete }
        didTransitionOutComplete={ this.didPageTransitionOutComplete }
      />
    this.components.oldComponent = this.components.newComponent
    this.components.newComponent = ReactDOM.render( page, el )
  }
  didPathUpdate () {
    const newRoute = RouterStore.newRoute()
    const oldRoute = RouterStore.oldRoute()
    if ( oldRoute !== undefined && newRoute.type === oldRoute.type ) return
    this.showLoadState()
    if ( oldRoute === undefined ) this.setupNewComponent()
    else setTimeout( AppActions.loadPageAssets )
  }
  pageAssetsLoaded () {
    this.setupNewComponent()
  }
  onPageReady ( route ) {
    PagerActions.onPageReady( route )
  }
  showLoadState () {
    AppStore.Parent.style.cursor = 'wait'
    translate[ '3d' ]( AppStore.FrontBlock, 0, 0, 0 ) // Block interactivity
  }
  hideLoadState () {
    AppStore.Parent.style.cursor = 'auto'
    translate[ '3d' ]( AppStore.FrontBlock, 99999, 99999, 1 ) // Put back interactivity
  }
  unmountOldComponent () {
    if ( this.components.oldComponent ) {
      const id = this.components.oldComponent.props.id
      const domToRemove = this.refs[id]
      ReactDOM.unmountComponentAtNode( domToRemove )
      this.components.oldComponent = undefined
    }
  }
  update () {
    if ( this.components.newComponent ) this.components.newComponent.update()
    if ( this.components.oldComponent ) this.components.oldComponent.update()
  }
  resize () {
    if ( this.components.newComponent ) this.components.newComponent.resize()
  }
}
