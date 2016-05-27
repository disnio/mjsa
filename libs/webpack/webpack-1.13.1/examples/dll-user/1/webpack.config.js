var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.js",
    minChunks: Infinity
});
module.exports = {
    entry: {
        alpha: ["./alpha", "./a"],
		beta: ["./beta", "./b"]
    },
    module: {
        loaders: [{
            test: /\.coffee$/,
            loader: "coffee-loader"
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("css-loader")
        }, {
            test: /\.png$/,
            loader: "file-loader"
        }, ]
    },
    output: {
        path: path.join(__dirname, "js"),
        // filename: "[name].js",
        filename: "MyDll.[name].js",
		library: "[name]_[hash]",
		libraryTarget : "commonjs2"
        // chunkFilename: "[id].chunk.js"
    },
    resolve: {
        extensions: ["", ".web.coffee", ".web.js", ".coffee", ".js"]
    },
    plugins: [
    	// commonsPlugin,
        new ExtractTextPlugin("style.css", {
            allChunks: true
        }),
        new webpack.DllPlugin({
			path: path.join(__dirname, "js", "[name]-manifest.json"),
			name: "[name]_[hash]"
		})
        // new webpack.optimize.DedupePlugin()
    ]
};
