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
		example: ["./example.js"]
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
        path: path.join(__dirname, "../", "js"),
        filename: "[name].js",

    },
    resolve: {
        extensions: ["", ".web.coffee", ".web.js", ".coffee", ".js"]
    },
    plugins: [
		new webpack.DllReferencePlugin({
            // absolute path) context of requests in the manifest
			context: path.join(__dirname, "../js"),
            sourceType : "commonjs2",
			manifest: require("../js/alpha-manifest.json")
		}),
		new webpack.DllReferencePlugin({
            context: path.join(__dirname, "../js"),
            sourceType :"commonjs2",
			manifest: require("../js/beta-manifest.json")
		})
        // new webpack.optimize.DedupePlugin()
    ]
};
