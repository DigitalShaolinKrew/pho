const webpack = require( 'webpack' )
const path = require( 'path' )
const eslintFriendlyFormatter = require( 'eslint-friendly-formatter' )
const autoprefixer = require( 'autoprefixer' )
const common = require( './common' )

module.exports = {
  context: common.context,
  entry: [
    'whatwg-fetch',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './index.js'
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve( __dirname, '../static' ),
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
        exclude: /node_modules/,
        enforce: 'pre',
        use: [ {
          loader: 'eslint-loader',
          options: {
            parser: 'babel-eslint',
            formatter: eslintFriendlyFormatter
          }
        } ]
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
        use: [
          'style-loader',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
