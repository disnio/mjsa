var express = require("express");
var http = require("http");
var path = require("path");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var getRawBody  = require('raw-body');
var typer = require('media-typer');
// var formidable = require("formidable");
var fs = require("fs");

var util = require("util");
var app = express();
var port = process.env.port || 8000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.text());
// app.use(bodyParser.text());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
//日志在静态内容后面
app.use(morgan(':date[iso] :method :url :status :response-time ms - :res[content-length]'));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// cors post ie8-9
app.use(function (req, res, next) {
    console.log("rqw :", req.headers['content-length'])
    getRawBody (req, {
        length: req.headers['content-length'],
        limit: '1mb',
        encoding: 'utf8'
    }, function (err, string) {
        if (err) return next(err);
        req.text = string;
        next();
    });

});

// app.use(function(req, res, next) {
//     req.setEncoding('utf8');
//     req.rawBody = '';
//     req.on('data', function(chunk) {
//         req.rawBody += chunk;
//     });
//     req.on('end', function() {
//         next();
//     });
// });

app.route('/index')
    .all(function (req, res, next) {
        console.log("index!")
        next();
    })
    .get(function (req, res, next) {
        res.render('index', {title: "Home Page"})
    });

app.get("/mid", require("./mid"));

app.get("/cors", function (req, res, next) {
    console.log("get: ", req.query);
    res.send(req.query);
    // next();
});

app.post("/cors", function (req, res, next) {
    console.log("post: ", req.text);

    res.send({txt: req.text.toString()});
    // next();
});


app.get('/file/:name', function (req, res, next) {

    var options = {
        root: __dirname + '/upload/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = req.params.name + ".jpg";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });
    next();

});

// no stack traces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {
            status: err.status,
            stack: err.stack
        }
    });
});

// server start
var server = http.createServer(app);
server.listen(port, function () {
    console.log("App liste" +
        "runing on port 8000");
});