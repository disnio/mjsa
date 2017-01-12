var path = require('path');
var express = require('express');

var webpack = require('webpack');
var config = require('./webpack.config');
config.entry.unshift("webpack-dev-server/client?http://localhost:8080/");


var app = express();
var WebpackDevServer = require('webpack-dev-server');
var compiler = webpack(config);

var webpackDevOptions = {
    hot: true,
    noInfo: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    setup: function(app){
        app.get('/some', function(req, res) {
          res.json({ custom: 'response' });
        });
    }
};

var server = new WebpackDevServer(compiler, webpackDevOptions);
server.listen(8080);
