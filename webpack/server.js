const express = require( 'express' )
const webpack = require( 'webpack' )
const path = require( 'path' )
const webpackConfig = require( './webpack.config.dev' )

const webpackDevMiddleware = require( 'webpack-dev-middleware' )
const webpackHotMiddleware = require( 'webpack-hot-middleware' )

const compiler = webpack( webpackConfig )

const port = 3000
const ip = '0.0.0.0'

const app = express()

const webpackDevMiddlewareInstance = webpackDevMiddleware( compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
} )

app.use( webpackDevMiddlewareInstance )

app.use( webpackHotMiddleware( compiler ) )
app.use( express.static( path.join( __dirname, '../static' ) ) )

app.use( '*', ( req, res, next ) => {
  var filename = path.join( compiler.outputPath, 'index.html' )
  webpackDevMiddlewareInstance.waitUntilValid( () => {
    compiler.outputFileSystem.readFile( filename, ( err, result ) => {
      if ( err ) return next( err )
      res.set( 'content-type', 'text/html' )
      res.send( result )
      res.end()
    } )
  } )
} )

app.listen( port, ip, error => {
  if ( error ) throw error
  console.info( 'Starting server on http://localhost:' + port )
} )

// Serve pure static assets
/* const server = new WebpackDevServer(compiler, {
  hot: false,
  contentBase: path.resolve(__dirname, '../static'),
  publicPath: '/',
  stats: {
    colors: true
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:' + port)
}) */
