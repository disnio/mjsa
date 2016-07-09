/**
 * Created by WangMing on 15/12/29.
 */
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //提取样式
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板插入代码

//开发
var cdnpath = '';
//部署
// var cdnpath = '部署所在cdn地址';
//webpck插件
var plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'scripts/vendors.js'),
    //将样式统一发布到style.css中
    new ExtractTextPlugin("css/build.css", {
        allChunks: true,
        disable: false
    }),
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
        title: "Angular项目脚手架",
        template: './src/index.html',
        filename: 'index.html',
        favicon: './src/favicon.ico',
        hash: true,
        chunks: ['vendors', 'app']
    })
];
var entries = {};
entries.app = ["./src/app/app"];
entries.vendors = ["angular", 'angular-animate', 'angular-ui-router', 'oclazyload'];
var buildPath = "/dist/";
//编译输出路径
module.exports = {
    debug: true,
    entry: entries,
    output: {
        path: __dirname + buildPath,
        filename: 'scripts/build.js',
        publicPath: cdnpath,
        chunkFilename: "chunks/[name].chunk.[chunkhash].js" //给require.ensure用的
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "ng-annotate-loader"
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader!postcss-loader", { publicPath: "../" })
        }, {
            test: /\.(jpg|png|gif)$/,
            loader: "url-loader?limit=10000&name=images/[name].[ext]"
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }, {
            test: /\.htc$/, //ie8的部分css3的修复
            loader: 'file-loader?name=pie/[name].[ext]'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
        }, {
            test: /\.(json|geojson)$/,
            loader: 'json-loader'
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }]
    },
    postcss: [require('autoprefixer')({ browsers: ['last 2 versions'] })],
    resolve: {
        extension: ['', '.js'],
        //别名
        alias: {
            // "layer": path.join(__dirname, "src/vendors/layer/layer")
        }
    },
    plugins: plugins
};
