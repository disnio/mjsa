'use strict';

var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './js/app.js',
        // css: './css/style.scss',
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        publicPath: './',
        libraryTarget: 'var',
        filename: '[name].js',
        chunkFilename: '[name].js',
        pathinfo: true,
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, 'js'),
            ],
            loader: "babel-loader"
        }, {
            test: /\.[s]?css$/,            
            loader: ExtractTextPlugin.extract("style-loader", 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!autoprefixer!sass?sourceMap=true&sourceMapContents=true')        
        }],
    },
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react'),
            'react-dom': path.join(__dirname, 'node_modules', 'react-dom'),
        },
        extensions: ['', '.js', '.jsx', '.scss', '.css'],
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("./[name].css", {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
    ],
};
