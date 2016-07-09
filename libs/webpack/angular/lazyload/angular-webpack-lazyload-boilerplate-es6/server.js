// set up ========================
var express = require('express');
var app     = express(); // create our app w/ express
var morgan  = require('morgan'); // log requests to the console (express4)
var path    = require('path');

// configuration =================
app.use(express.static(path.join(__dirname, 'build')));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");