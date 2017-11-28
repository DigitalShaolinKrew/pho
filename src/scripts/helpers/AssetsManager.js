import AppActions from 'AppActions'
import ressources from '../config/ressources'
import BasicsLoader from './BasicsLoader'

class AssetsManager {
  constructor () {
    this.promises = []
    this.resources = []
    this.totalProgress = ressources.length
    this.currentProgress = 0

    // const getLoader = type => {
    //   switch ( type ) {
    //     case 'special-type':
    //       return SpecialLoader
    //     default:
    //       return BasicsLoader
    //   }
    // }

    ressources.map( ressource => {
      const { id, url, options } = ressource

      const promise = new Promise( ( resolve, reject ) => {
        BasicsLoader.load(
          url,
          resource => {
            resolve( { id, resource } )

            this.currentProgress++
            this.resources[ id ] = resource

            AppActions.onResourceProgress( this.currentProgress / this.totalProgress )

            if ( this.currentProgress >= this.totalProgress ) this.load()
            if ( this.currentProgress === this.totalProgress ) AppActions.onResourceReady( this.resources )
          },
          () => null,
          () => reject,
          id,
          options
        )
      } )
      this.promises.push( promise )
    } )
  }

  load () {
    return Promise.all( this.promises )
  }
}

export default AssetsManager
