import AssetsLoader from 'assets-loader'

class BasicsLoader {
  constructor () {
    this.assetsLoader = new AssetsLoader()
  }

  load ( url, onLoad, onSucess, onReject, id ) {
    let loader = this.assetsLoader.add( url )
      .on( 'error', ( error ) => {
        throw new Error( 'loading error', error )
      } )
      .on( 'complete', ( map ) => {
        loader.get().forEach( ( file ) => {
          onLoad( file )
        } )
      } )
    .start()
  }
}

export default new BasicsLoader()
