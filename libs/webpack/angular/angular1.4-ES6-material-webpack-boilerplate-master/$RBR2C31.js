// es6  import 引入的文件没法单独分离出来
var path = require('path'),
    webpack = require("webpack"),
    libPath = path.join(__dirname, 'lib'),
    wwwPath = path.join(__dirname, 'www'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var node_modules_dir = path.join(__dirname, '/node_modules');

var vendor = new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.js",
    minChunks: Infinity
});
// var index = new webpack.optimize.CommonsChunkPlugin({
//     name: "index", 
//     filename: "index.js",
//     minChunks: Infinity
// });
// var common = new webpack.optimize.CommonsChunkPlugin("common.js", ['vendor', 'index']);

var pro = new webpack.ProvidePlugin({
    angular: 'angular/angular.min.js',
    angularAnimate: 'angular-animate/angular-animate.min.js',
    angularMaterial: 'angular-material/angular-material.min.js',
    angularUIRouter: 'angular-ui-router/release/angular-ui-router.min.js'
});
var config = {
    debug: true,
    externals: {
        angular: 'angular',
        angularAnimate: 'angular-animate',
        ngAnimate: 'angular-animate',
        angularMaterial: 'angular-material',
        ngMaterial: 'angular-material',
        angularUIRouter: 'angular-ui-router'
    },

    entry: {
        index: [path.join(libPath, 'index.js')],
        vendor: [
            'angular/angular.min.js',
            'angular-animate/angular-animate.min.js',
            'angular-material/angular-material.min.js',
            'angular-ui-router/release/angular-ui-router.min.js'
        ]
    },
    output: {
        path: path.join(wwwPath),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
    },
    module: {
        noParse: [],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "ng-annotate"           
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel", 
            query: {
                presets: ['es2015']
            }           
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.scss$/,
            // loader: "style!css!autoprefixer!sass"
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
        }, {
            test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
            loader: 'file?name=fonts/[name].[ext]'
        }, {
            test: /\.html$/,
            loader: 'file?name=templates/[name]-[hash:6].html'
        }, {
            test: /\.(tpl|ejs)$/,
            loader: 'ejs-loader'
        }]
    },
    // resolve: {
    //     root: __dirname + '/www/',
    //     alias: {
    //         angular        : 'angular/angular.min.js',
    //         angularAnimate : 'angular-animate/angular-animate.min.js',
    //         ngAnimate      : 'angular-animate/angular-animate.min.js',
    //         angularMaterial: 'angular-material/angular-material.min.js',
    //         ngMaterial     : 'angular-material/angular-material.min.js',
    //         angularUIRouter: 'angular-ui-router/release/angular-ui-router.min.js'
    //     }
    // },
    plugins: [
        vendor,
        // index,
        // common,
        // pro,

        // HtmlWebpackPlugin: Simplifies creation of HTML files to serve your webpack bundles : https://www.npmjs.com/package/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: "test",
            pkg: pkg,
            template: path.join(libPath, 'index.ejs'),
            inject: true,
            cache: false
        }),

        new ExtractTextPlugin("css/[name].css", {
            allChunks: true
        }),
        // new webpack.optimize.AggressiveMergingPlugin({
        //     minSizeReduce: 1.5,
        //     moveToParents: true
        // })
        // OccurenceOrderPlugin: Assign the module and chunk ids by occurrence count. : https://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
        // new webpack.optimize.OccurenceOrderPlugin(),

        // Deduplication: find duplicate dependencies & prevents duplicate inclusion : https://github.com/webpack/docs/wiki/optimization#deduplication
        // new webpack.optimize.DedupePlugin()
    ]
};
var deps = [
    'angular/angular.min.js',
    'angular-animate/angular-animate.min.js',
    'angular-material/angular-material.min.js',
    'angular-ui-router/release/angular-ui-router.min.js',
    // 'angular-material/angular-material.css'

];
deps.forEach(function(dep) {
    var depPath = path.resolve(node_modules_dir, dep);
    // config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
});
module.exports = config;
