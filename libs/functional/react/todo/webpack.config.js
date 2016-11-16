'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const appRoot = path.join(__dirname, '/src');
const noderRoot = path.join(__dirname, '/node_modules');

const merge = require('webpack-merge');

const validate = require('webpack-validator');
let cfg = {
    entry: {
        app: './src/js/app.jsx',
        vendor: [            
            // 'jquery',
            'react',
            'react-dom',
            'react-addons'
        ]
    },
    output: {
        path: path.join(__dirname, './build'),
        publicPath: './',
        libraryTarget: 'var',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        pathinfo: true,
    },
    module: {
        loaders: [{
                test: /\.js[x]?$/,
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components')],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ["add-module-exports"],
                },
            },
            // {
            //     test: /\.js$/,
            //     include: path.resolve('src'),
            //     exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components')],
            //     loader: 'babel-loader',
            //     query: {
            //         presets: ['es2015', 'stage-0'],
            //         plugins: [
            //             "add-module-exports"
            //         ]
            //     }
            // }, 
            {
                test: /\.html$/,
                loader: "html"
            }
        ],
    },
    resolve: {
        // alias: {
        //     'jquery': path.resolve(__dirname, './node_modules/jquery/dist/jquery.min.js'),
        //     'react': path.resolve(__dirname, './node_modules/react/dist/react.js'),
        //     'react-dom': path.resolve(__dirname, './node_modules/react-dom/dist/react-dom.js'),
        // },
        extensions: ['', '.js', '.jsx', '.scss', '.css'],
        root: [appRoot],
    },
    externals: [{
        "jQuery": "jQuery"
    }
    // , {
    //     'react': {
    //         root: 'React',
    //         commonjs2: 'react',
    //         commonjs: 'react',
    //         amd: 'react',
    //     }

    // }, {
    //     'react-dom': 'ReactDOM',
    // }
    ],
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     angular: 'angular'
        // }), 
        // new webpack.optimize.DedupePlugin(),      

        // new HtmlWebpackPlugin({
        //     template: 'src/index.html',
        //     inject: 'body',
        //     filename: './index.html'
        //         // files: {
        //         //     "css": [ "css/app.css" ],
        //         //     "js": [ "js/vendor.js", "js/app.js"],
        //         // }
        // }),

        new ExtractTextPlugin("./css/[name].css", {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        // new webpack.optimize.OccurenceOrderPlugin()
    ],
    // devtool: 'source-map'
}


let cfg_module = {
    cache: false,
    debug: true,
    module: {
        loaders: [{
            test: /\.[s]?css$/,
            loader: ExtractTextPlugin.extract("style-loader", 'css!autoprefixer!sass?outputStyle=compact')
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url',
            query: {
                // prefix: 'font/',
                limit: 50000,
                mimetype: 'application/font-woff',
                name: './css/[hash:8].[name].[ext]'
            }
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                limit: 10000,
                mimetype: 'application/octet-stream',
                name: './css/[hash:8].[name].[ext]'
            }
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file",
            query: {
                name: './css/[hash:8].[name].[ext]'
            }
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                limit: 10000,
                mimetype: 'image/svg+xml',
                name: './css/[hash:8].[name].[ext]'
            }
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    }
}

let config = merge(cfg_module, cfg);
// console.log(config)
module.exports = config;
