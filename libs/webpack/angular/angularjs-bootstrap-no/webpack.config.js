var path = require('path');
var webpack = require('webpack');
// var ngminPlugin = require('ngmin-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var appRoot = path.join(__dirname, '/app');
var noderRoot = path.join(__dirname, '/node_modules');
var bourbon = require('node-bourbon').includePaths;

module.exports = {
    cache: false,
    debug: false,

    // The entry point
    entry: {
        main: path.join(appRoot, '/main.js'),
        bootstrap: "bootstrap-loader/extractStyles",
        vendor: [
          'angular',
          'ocLazyLoad',
          'ui-router',
          'lodash',
          // 'modernizr',
          'jquery'
        ]
    },

    output: {
        path: path.join(__dirname, './dist'),
        publicPath: './',
        libraryTarget: 'var',
        filename: '[name].bundle.js',
        chunkFilename: '[chunkhash].js',
        pathinfo: true,
    },

    module: {

        loaders: [{
                test: /\.js$/,                
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'bower_components')],
                loader: "ng-annotate?add=true!babel",
                // query: {
                //     // presets: ['es2015'],
                //     // stage: 1,
                //     plugins: [
                //       // "transform-runtime"
                //         // "add-module-exports"
                //     ]
                // }
            }, 
            { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
            // {
            //   test: /\.es6$/,
            //   loader: 'ng-annotate!babel'
            // },
            // {
            //   test: /[\\\/]node_modules[\\\/]angular[\\\/]angular\.js$/,
            //   loader: "imports?$=jquery"
            // },
            // {
            //   test: /[\\\/]node_modules[\\\/]jquery[\\\/]dist[\\\/]jquery\.js$/,
            //   loader: 'expose?jquery!expose?$'
            // },
            // {
            //   test: /[\\\/]node_modules[\\\/]modernizr[\\\/]modernizr\.js$/,
            //   loader: "imports?this=>window!exports?window.Modernizr"
            // },
            {
              test: /\.jade$/,
              loader: 'html!jade-html'
            },
            // {
            //   test: /\.html$/,
            //   loader: 'html'
            // },
            // {
            //     // required to write 'require('./style.css')'
            //     test: /\.css$/,
            //     loaders: ExtractTextPlugin.extract("style-loader",'css')
            // }, 
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", 'css!autoprefixer!sass?outputStyle=compact')
            }, 
            // {
            //   // require raw html for partials
            //   test: /\.tpl\.html$/,
            //   // loader: 'ng-cache'
            //   loader: "ngtemplate!html"
            // },
            {
                // require raw html for partials
                test: /\.html$/,
                loader: "html"
            }, 
            {
                // required for bootstrap icons
                test: /\.(woff|woff2)(\?(.*))?$/,
                loader: 'url?prefix=factorynts/&limit=5000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?(.*))?$/,
                loader: 'file?prefix=fonts/'
            }, {
                test: /\.eot(\?(.*))?$/,
                loader: 'file?prefix=fonts/'
            }, {
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
        noParse: /\.min\.js/,
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
        alias: {
            'angular'   : path.resolve(__dirname, './node_modules/angular/'),
            'jquery'    : path.resolve(__dirname, './node_modules/jquery/dist/jquery.js'),
            'lodash'    : path.resolve(__dirname, './node_modules/lodash/lodash.js'),
            // 'modernizr' : path.resolve(__dirname, './node_modules/modernizr/modernizr.js'),
            'ocLazyLoad': path.resolve(__dirname, './node_modules/ocLazyLoad/dist/ocLazyLoad.js'),
            'ui-router' : path.resolve(__dirname, './node_modules/angular-ui-router/release/angular-ui-router.js'),
            'registerjs': path.resolve(__dirname, './app/components/util/register.js'),
        },

        // extensions: ['', '.js', 'json', '.coffee', '.scss', '.css'],
        // root: [appRoot],
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
          _: 'lodash',
          // Modernizr: 'modernizr',
          $: 'jquery',
          jQuery: 'jquery',
          register: 'registerjs'
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),

        new HtmlWebpackPlugin({
            template: 'app/index.jade',
            inject: 'body',
            // hash: true
        }),

        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
            // minChunks: function(module, count) {
            //     return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
            // }
        }),

        new webpack.optimize.AggressiveMergingPlugin({})

    ],

    // devtool: 'eval'
}
