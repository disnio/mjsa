'use strict';
var webpack = require('webpack'),
    path = require('path'),
    APP = __dirname + '/app';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    context: APP,
    entry: {
        app: ['./core/bootstrap.js']
    },
    output: {
        path: APP,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.js$/,
            loader: 'ng-annotate!babel?presets[]=es2015!jshint',
            exclude: /node_modules|bower_components/
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
            loader: 'file-loader?name=res/[name].[ext]?[hash]'
        }, {
            test: /\.html/,
            loader: 'raw'
        }, {
            test: /\.json/,
            loader: 'json'
        }]
    },
    resolve: {
        root: APP
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css", {
            allChunks: true
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            MODE: {
                production: process.env.NODE_ENV === 'production'
            }
        })
    ]
};
