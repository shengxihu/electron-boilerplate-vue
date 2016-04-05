var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var HtmlWebpackPlugin = require('html-webpack-plugin')

baseConfig.entry = {
  app: [
    './build/dev-client',
    './tools/vue-devtools/hook.js',
    './tools/vue-devtools/backend.js',
    './app/main.js'
  ]
}

module.exports = merge(baseConfig, {
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  output: {
    // necessary for the html plugin to work properly
    // when serving the html from in-memory
    // need to explicitly set localhost to prevent
    // the hot updates from looking for local files
    publicPath: 'http://localhost:8080/'
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: false,
      extract: false
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './app/main.html',
      inject: true
    })
  ]
})
