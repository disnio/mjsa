var path = require('path');
var webpack = require('webpack');
// var ngminPlugin = require('ngmin-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var appRoot = path.join(__dirname, '/src');
var noderRoot = path.join(__dirname, '/node_modules');
module.exports = {
  cache: false,
  debug: true,

  // The entry point
  entry: [
    path.join(appRoot, '/app.js')
  ],

  output: {
    path: path.join(__dirname, './dist'),
    publicPath: './',
    libraryTarget: 'var',
    filename: 'bundle.js',
		chunkFilename: '[chunkhash].js'
  },

  module: {
    loaders: [
      // {
      //     test: /\.js$/,
      //     exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components')],
      //     loader: "ng-annotate"
      // },
      // {
      //     test: /\.js$/,
      //     include: path.resolve('src'),
      //     exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components')],
      //     loader: "babel",
      //     query: {
      //         presets: ['es2015'],
      //         plugins: [
      //           "add-module-exports"
      //         ]
      //     }
      // }, 
      {
        // required to write 'require('./style.css')'
        test: /\.css$/,
        loaders: ['style','css']
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' + noderRoot + '/'
      },
      // {
      //   test: /\.coffee$/,
      //   loader: 'coffee'
      // },
      {
        // require raw html for partials
        test: /\.tpl\.html$/,
        loader: 'ng-cache'
        // loader: "ngtemplate!html"
      },
      {
        // required for bootstrap icons
        test: /\.(woff|woff2)(\?(.*))?$/,
        loader: 'url?prefix=factorynts/&limit=5000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      },
      {
        test: /\.eot(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      },
      {
        test: /\.svg(\?(.*))?$/,
        loader: 'file?prefix=fonts/'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],

    // don't parse some dependencies to speed up build.
    // can probably do this non-AMD/CommonJS deps
    noParse: [
      path.join(noderRoot, '/lodash/lodash.js'),
      path.join(noderRoot, '/jquery/dist/jquery.js'),
      path.join(noderRoot, '/angular-ui-router/release/angular-ui-router'),
      path.join(noderRoot, '/angular-sanitize'),
      path.join(noderRoot, '/angular-ui-select'),
      path.join(noderRoot, '/angular-mocks'),
      path.join(noderRoot, '/angular')
    ],
  },

  resolve: {
    // alias: {
    //   bower: noderRoot,
    //   'lodash': noderRoot + '/lodash/dist/lodash.js'
    // },

    // extensions: ['', '.js', 'json', '.coffee', '.scss', '.css'],
    root: [appRoot],
  },

  // singleRun: true,

  plugins: [
    // bower.json resolving
    // new webpack.ResolverPlugin([
    //   new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    // ], ['normal', 'loader']),

    // disable dynamic requires
    // new webpack.ContextReplacementPlugin(/.*$/, /a^/),

    new webpack.ProvidePlugin({
      'angular': 'exports?window.angular!angular',
      '_': 'lodash'
    }),

    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html'
    }),

    new ExtractTextPlugin("[name].css"),
    
    new webpack.DefinePlugin({
        'process-env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
  ],

  // devtool: 'eval'
}
