const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const FaviconsWebpackPlugin = require( 'favicons-webpack-plugin' )

module.exports = {
  context: path.resolve( __dirname, '../src/scripts' ),
  alias: {
    AppStore: path.resolve( __dirname, '..', 'src/scripts/flux/stores/AppStore' ),
    AppActions: path.resolve( __dirname, '..', 'src/scripts/flux/actions/AppActions' ),
    AppConstants: path.resolve( __dirname, '..', 'src/scripts/flux/constants/AppConstants' ),
    WindowStore: path.resolve( __dirname, '..', 'src/scripts/flux/stores/WindowStore.js' ),
    WindowConstants: path.resolve( __dirname, '..', 'src/scripts/flux/constants/WindowConstants.js' ),
    WindowActions: path.resolve( __dirname, '..', 'src/scripts/flux/actions/WindowActions.js' ),
    RouterStore: path.resolve( __dirname, '..', 'src/scripts/flux/stores/RouterStore.js' ),
    RouterConstants: path.resolve( __dirname, '..', 'src/scripts/flux/constants/RouterConstants.js' ),
    RouterActions: path.resolve( __dirname, '..', 'src/scripts/flux/actions/RouterActions.js' ),
    PagerStore: path.resolve( __dirname, '..', 'src/scripts/flux/stores/PagerStore.js' ),
    PagerConstants: path.resolve( __dirname, '..', 'src/scripts/flux/constants/PagerConstants.js' ),
    PagerActions: path.resolve( __dirname, '..', 'src/scripts/flux/actions/PagerActions.js' ),
    BaseComponent: path.resolve( __dirname, '..', 'src/scripts/components/utils/BaseComponent.js' ),
    Page: path.resolve( __dirname, '..', 'src/scripts/components/utils/Page.js' ),
    Styles: path.resolve( __dirname, '..', 'src/styles/' )
  },
  htmlWebpackPlugin: new HtmlWebpackPlugin( {
    template: path.resolve( __dirname, '..', 'src/templates/index.tpl.ejs' ),
    inject: 'body',
    filename: 'index.html',
    hash: true,
    environment: process.env.NODE_ENV
  } ),
  faviconsWebpackPlugin: new FaviconsWebpackPlugin( path.resolve( __dirname, '..', 'static/images/favicon.png' ) )
}
