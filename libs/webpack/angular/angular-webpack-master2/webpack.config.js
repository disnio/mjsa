var path = require('path'),
    webpack = require("webpack");

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pro = new webpack.ProvidePlugin({
    angular: 'angular/angular.min.js',
    angularRouter: 'angular-route/angular-route.min.js'
});
var vendor = new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.js",
    minChunks: Infinity
});
module.exports = {
    entry: {
        app: [
            './src/app.js'
        ],
        vendor: [
          'angular/angular.min.js',
          'angular-route/angular-route.min.js'
        ]
    },
    output: {
        filename: '[name].js',
        path: './dest',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components')],
                loader: "ng-annotate"
            }, 
            {
                test: /\.js$/,
                include: path.resolve('src'),
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components')],
                loader: "babel",
                query: {
                    presets: ['es2015'],
                    plugins: [
                      "add-module-exports"
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap&indentedSyntax=true')
            }, 
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=32768'
            }, 
            {
                test: /\.html$/,
                loader: "ngtemplate?" + (path.resolve(__dirname, './src/')) +"!html"
            },
            {
              test: /\.(tpl|ejs)$/,
              loader: 'ejs-loader'
            }
        
            // {test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]'},
            // {test: /\.haml$/, loader: 'hamlc-loader'}
        ],

        // noParse: [
        //   './node_modules/angular/angular.min.js',
        //   './bower_components/angular-route/angular-route.min.js',
        // ]
    },
    plugins: [
        vendor,
        new ExtractTextPlugin('style.css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
          template: path.resolve('src', 'index.ejs'),
          inject: 'body',
          cache: false
        })
    ],
    devtool: 'eval-source-map',
    // devServer: {
    //   historyApiFallback: true,
    //   stats: {
    //     chunkModules: false,
    //     colors: true
    //   },
    //   contentBase: './src'
    // },

};
