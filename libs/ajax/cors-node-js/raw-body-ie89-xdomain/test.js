var express = require("express");
var http = require("http");
var path = require("path");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var getRawBody = require('raw-body');
var methodOverride = require('method-override');

var formidable = require("formidable");

var session = require('express-session');
var compression = require('compression');

var csrf = require('csurf');
var timeout = require('connect-timeout');
var errorHandler = require('errorhandler');
var notifier = require('node-notifier');

var responseTime = require('response-time');
var favicon = require('serve-favicon');
var serveIndex = require('serve-index');
var fs = require("fs");
var util = require("util");

var app = express();
var port = process.env.port || 8000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//要放在响应的最外
app.use(morgan('dev'));
app.use(compression({
    threshold: 1
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({secret: 'dog', name: "dog", cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));
app.use(session({secret: 'pig', name: "_csrf", cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));
//跨域获取时候要禁止csrf
// app.use(csrf());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(responseTime({digits: 4}));
//必须以子目录存在
app.use('/images', serveIndex("upload/images", {'icons': true, 'view': 'details'}));

//日志在静态内容后面
app.all('*', function (req, res, next) {
    // 带 cookie 发送文件响应必须明确设置域，不能简单的用 *
    res.header("Access-Control-Allow-Origin", ["http://localhost:3000"]);
    res.header("Access-Control-Allow-Methods", "HEAD, PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Content-Range, Content-Disposition, Content-Description");
    res.header("Access-Control-Allow-Credentials", true);
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/index', function (req, res, next) {
    var sess = req.session;
    if (sess.views) {
        console.log(sess.views)
        sess.views++
    } else {
        sess.views = 1;
    }
    // res.render('index', {title: "Home Page", csrfToken: req.csrfToken()});
    res.render('index', {title: "Home Page", csrfToken: sess.views});
});

app.post('/index', function (req, res) {

    res.send('data is being processed');
});

app.delete('/index', function (req, res) {
    console.log("override route delete tirggered");
    res.status(204).end();
});
// next [callback, ...]
app.get("/mid", timeout('1s'), require("./mid"));

// cors post ie8-9
app.all('/corss', function (req, res, next) {
    // console.log("rqw :", req.headers['content-length'])
    getRawBody(req, {
        length: req.headers['content-length'],
        limit: '1mb',
        encoding: 'utf8'
    }, function (err, string) {
        if (err) return next(err);
        req.text = string;
        next();
    });

});
app.get('/cors', function (req, res, next) {
    console.log(req.cookies)
    console.log("get: ", req.query);
    res.send(req.query);
    // next();
});
app.post('/cors', function (req, res, next) {
    // console.log(req.cookies)
    // console.log("post: ", req.text);
    console.log(req.body)
    res.send({txt: req.body.name, cookie: req.cookies});
    // next();
});

app.get("/result", function (req, res) {
    res.render('result')
});

app.get("/upload", function (req, res) {
    res.render('upload')
});

app.post("/uploads", function (req, res) {

    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "/upload/");
    form.keepExtensions = true;
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
        console.log(files);
        // 普通上传input:file 命名是 file,  jquery.file.Upload 是 files[]
        console.log("fields: ", fields);

        var lstart = form.uploadDir.length;
        var result = [];
        var redirect = fields.redirect;
        var rpath;
        if (files.file.length > 1) {
            files.file.forEach(function (v, i) {
                var s = {};
                s.path = v.path.substr(lstart);
                s.name = v.name;
                s.type = v.type;
                s.size = v.size;
                result[i] = s;
            });
            if(fields.redirect){
                rpath = redirect.replace('%s', '') + JSON.stringify(result);
                res.redirect(rpath);
                return;
            }
            res.json({files: result});
        } else {
            var s = {};
            s.path = files.file.path.substr(lstart);
            s.name = files.file.name;
            s.type = files.file.type;
            s.size = files.file.size;
            if(fields.redirect){
                rpath = redirect.replace('%s', '') + JSON.stringify(s);
                res.redirect(rpath);
                return;
            }
            res.json({files: [s]});
        }
    });
    form.on('fileBegin', function (name, file) {
        var date = new Date();
        var pth = date.toLocaleDateString().split(/\-|\//).join("") + "_" + date.toTimeString().split(" ")[0].split(":").join("") + "_" + date.getMilliseconds();
        file.path = path.join(path.dirname(file.path), pth + path.extname(file.name));
        // console.log("fileBegin: ", file);
    });

    form.on('field', function (name, value) {
        console.log("on: ", name + ": ", JSON.stringify(value));
    });
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
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {
//             status: err.status,
//             stack: err.stack
//         }
//     });
// });
app.use(errorHandler());
// server start
var server = http.createServer(app);
server.listen(port, function () {
    console.log("App liste" +
        "runing on port 8000");
});
