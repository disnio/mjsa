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
        example: "./example.js"
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
        filename: "[name].js",
		// library: "[name]_[hash]",
		libraryTarget : "umd"
        // chunkFilename: "[id].chunk.js"
    },
    resolve: {
        extensions: ["", ".web.coffee", ".web.js", ".coffee", ".js"]
    },
    externals: [
		"add",
		{
			"subtract": {
				root: "subtract",
				commonjs2: "./subtract",
				commonjs: ["./math", "subtract"],
				amd: "subtract"
			}
		}
	],
    plugins: [
    	// commonsPlugin,
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
        // new webpack.optimize.DedupePlugin()
    ]
};
