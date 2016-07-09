const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const appRoot = path.join(__dirname, '/src');
const noderRoot = path.join(__dirname, '/node_modules');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const merge = require('webpack-merge');

const validate = require('webpack-validator');
let cfg = {

    entry: {
        app: './src/app.js',
        vendor: [
            'jquery',
            'angular',
            'angular-ui-router',
            'oclazyload'
        ]
    },
    output: {
        path: path.join(__dirname, './build'),
        publicPath: './',
        libraryTarget: 'var',
        filename: '[name].js',
        chunkFilename: '[name].js',
        pathinfo: true,
    },
    module: {
        loaders: [
            // {
            //     test: /\.js[x]?$/,
            //     exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components')],
            //     loader: "babel-loader",
            //     query: {
            //         presets: ['es2015', 'stage-0', 'react'],
            //         plugins: [],
            //     },
            // },
            {
                test: /\.js$/,
                include: path.resolve('src'),
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components')],
                loaders: ["ng-annotate", 'babel?presets[]=es2015,plugins[]=add-module-exports'],
                // query: {"ng-annotate", 
                //     presets: ['es2015'],
                //     plugins: [
                //         "add-module-exports"
                //     ]
                // }
            }, {
                test: /\.html$/,
                loader: "html"
            },
            // {
            //     test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
            //     loader: 'imports?jQuery=jquery'
            // }, 

        ],
        // noParse: /\.min\.js/,
        // noParse: [
        //     // path.join(noderRoot, '/lodash/lodash.js'),
        //     // path.join(noderRoot, '/jquery/dist/jquery.js'),
        //     // path.join(noderRoot, '/angular-ui-router/release/angular-ui-router'),
        //     // path.join(noderRoot, '/angular-sanitize'),
        //     // path.join(noderRoot, '/angular-ui-select'),
        //     // path.join(noderRoot, '/angular-mocks'),
        //     // path.join(noderRoot, '/angular')
        // ],
    },
    resolve: {
        // alias: {
        //     'jquery': path.resolve(__dirname, './node_modules/jquery/dist/jquery.js'),
        // },
        // extensions: ['', '.js', '.jsx', '.scss', '.css'],
        root: [appRoot],
    },
    // externals: [{
    //     'react': {
    //         root: 'React',
    //         commonjs2: 'react',
    //         commonjs: 'react',
    //         amd: 'react',
    //     },
    // }, ],
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     // angular: 'angular'
        // }), 
        new webpack.optimize.DedupePlugin(),       
        new CleanWebpackPlugin(['build'], {
            dry: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body',
            // hash: true
        }),

        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
          dev: true
        })
    ],
    devtool: 'source-map',
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
                // name: './fonts/[hash:8].[name].[ext]'
            }
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                limit: 10000,
                mimetype: 'application/octet-stream'
            }
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                limit: 10000,
                mimetype: 'image/svg+xml'
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
