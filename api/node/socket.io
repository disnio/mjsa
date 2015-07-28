事件驱动：
var http = require("http");
var url = require("url");

var route = {
    routes: {},
    for: function(path, handler) {
        this.routes[path] = handler;
    }
};

route.for("/start", function(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Hello");
    response.end();
});
route.for("/finish", function(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Goodbye");
    response.end();
});

function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    if (typeof route.routes[pathname] === 'function') {
        route.routes[pathname](request, response);
    } else {
        response.writeHead(404, {
            "Content-Type": "text/plain"
        });
        response.end("404 Not Found");
    }
}
http.createServer(onRequest).listen(9999);
console.log("Server has started.");
----------------------
http 方法：
var http = require("http");
var url = require("url");
var route = {
    routes: {},
    for: function(method, path, handler) {
        this.routes[method + path] = handler;
    }
}
route.for("GET", "/start", function(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Hello");
    response.end();
});
route.for("GET", "/finish", function(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Goodbye");
    response.end();
});

function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + request.method + pathname + " received.");
    if (typeof(route.routes[request.method + pathname]) === 'function') {
        route.routes[request.method + pathname](request, response);
    } else {
        response.writeHead(404, {
            "Content-Type": "text/plain"
        });
        response.end("404 Not Found");
    }
}
http.createServer(onRequest).listen(9999);
console.log("Server has started.");

route.on("POST", "/echo", function(request, response) {
    var incoming = "";
    request.on('data', function(chunk) {
        incoming += chunk.toString();
    });
    request.on('end', function() {
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        response.write(incoming);
        response.end();
    });
});
--------------------
文件处理：
var path = require('path');
var fs = require('fs');
var root = __dirname;
var serveStatic = function(response, file) {
    var fileToServe = path.join(root, file);
    var stream = fs.createReadStream(fileToServe);
    stream.on('data', function(chunk) {
        response.write(chunk);
    });
    stream.on('end', function() {
        response.end();
    });
}
-------------
Express:
• env: Environment mode, defaults to process.env.NODE_ENV or "development"
• trust proxy: Enables reverse proxy support, disabled by default
• jsonp callback: Enables JSONP callback support, enabled by default
• jsonp callback name: Changes the default callback name of ?callback=
• json replacer: JSON replacer callback, null by default
• json spaces: JSON response spaces for formatting; defaults to 2 in development, 0 in production
• case sensitive routing: Enables case sensitivity, disabled by default, treating /Foo and /foo as the same
• strict routing: Enables strict routing, by default /foo and /foo/ are treated the same by the router



