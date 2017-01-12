var path = require('path');
var webpack = require('webpack');
// var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
module.exports = {
    context: __dirname,
    debug: true,
    // devtool: '#inline-source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './js/app.js',
    ],
    // entry: {
    //     // Add the client which connects to our middleware
    //     client: ['./client.js', hotMiddlewareScript],
    //     extra: ['./extra.js', hotMiddlewareScript]
    // },
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.css'],
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel-loader'],
            include: path.join(__dirname, 'js'),
            exclude: '/node_modules/'
        }, {
            test: /\.css$/,
            loader: 'style!css',
        }],
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
};
