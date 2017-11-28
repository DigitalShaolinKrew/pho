const path = require( 'path' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const CleanWebpackPlugin = require( 'clean-webpack-plugin' )
const autoprefixer = require( 'autoprefixer' )
const common = require( './common' )

module.exports = {
  context: common.context,
  entry: {
    app: [
      './index.js'
    ]
  },
  output: {
    filename: 'app.bundle.js',
    path: path.join( __dirname, '..', 'dist' ),
    publicPath: '/'
  },
  module: {
    rules: [
      // linters
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        use: [ {
          loader: 'babel-loader'
        } ],
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract( {
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [
                    autoprefixer( { browsers: [ 'last 2 versions' ] } )
                  ]
                }
              }
            },
            'stylus-loader',
            {
              loader: 'stylus-resources-loader',
              options: {
                resources: path.resolve( __dirname, '../src/styles/common.styl' )
              }
            }
          ]
        } )
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: 'file-loader?name=image/[name].[ext]'
      },
      {
        test: /node_modules/,
        loader: 'ify-loader'
      }
    ]
  },
  resolve: {
    alias: common.alias
  },
  plugins: [
    common.htmlWebpackPlugin,
    common.faviconsWebpackPlugin,
    new ExtractTextPlugin( {
      filename: 'app.bundle.css',
      allChunks: true
    } ),
    new CopyWebpackPlugin( [
      { from: path.join( __dirname, '..', 'static' ) }
    ], {
      debug: true,
      ignore: [ 'index.html', '.DS_Store', '.keep' ]
    } ),
    new CleanWebpackPlugin( [ 'dist' ], { root: path.join( __dirname, '..' ) } )
  ]
}
