https://github.com/kriskowal/q/wiki/API-Reference
Q.js API 常用函数说明：

核心方法：
promise.then(onFulfilled, onRejected, onProgress)
Q.when(5, onFulfilled) is equivalent to Q(5).then(onFulfilled).

promise.catch(onRejected) ==; fail(onRejected)

promise.progress(onProgress)

promise.finally(callback) 别名：promise.fin (for non-ES5 browser)
无论任务是否成功对于收集资源很有用，例如关闭数据库连接，关闭服务，或者删除一个不需要的键值。监视包括履行或拒绝的承诺。返回一个带有同样履行值或拒绝原因的承诺。如果回调返回一个承诺，他将被延迟到直到承诺从回调返回才结束。

promise.done(onFulfilled, onRejected, onProgress)
和then很相似，但是对应未处理过的拒绝有不同的行为。
这个方法应该使用在链式调用的终端，承诺不再被传递到别处。
The Golden Rule of done vs. then usage is: either return your promise to someone else, or if the chain ends with you, call done to terminate it.

对象方法：
promise.get(propertyName)
    等价于：promise.then(function(o){return o[propertyName]});
q.fcall(function() {
    logger.log("Promise returns a custom object");
    return [{name: "Alice", age: 30}];
}) .get(0).get("name") .then(function(name) {
        logger.log("(promise.get): Received the name property of the custom object");
        logger.log(name);
});

q.fcall(function() {
        logger.log("Promise returns a custom object");
        logger.log(customObj[0]);
        return customObj;
    })
.get(0)
.set("name", "Bob") // 没有set，delete方法在api里面 .delete("age")
.then(function(obj) {
    logger.log("(promise.get and promise.set): Updated name from Alice to Bob");
    logger.log(customObj[0]);
});

promise.post(methodName, args)
    等价于：promise.then(function(o){ return o[methodName].apply(o, args)});
Returns a promise for the result of calling the named method of an object with the given array of arguments. 
和下面invoke的区别主要在于参数形式，post是数组参数，invoke是逗号分隔的对象key，即对象内部的方法。

promise.invoke(methodName, ...args) Alias:promise.send/mcall
Returns a promise for the result of calling the named method of an object with the given variadic arguments

I am trying to get few values from redis, combine them and eventually send. But I just can't make those promises work.
This is the simple get functions from redis
client.get('user:1:id',function(err,data){
    // here I have data which contains user ID
});
client.get('user:1:username',function(err,data){
    // here I have data which contains username
});
Q.all([Q.ninvoke(client, 'get', 'user:1:id'),
       Q.ninvoke(client, 'get', 'user:1:username')]).then(function (data) {
  var id = data[0];
  var username = data[1];
  // do something with them
});

or:
Q.spread([Q.ninvoke(client, "get", "user:1:id"), Q.ninvoke(client, "get", "user:1:username"], function (id, username) {});


var customObj = {
    name: "Micky",
    age: 30,
    about: function()
    {
        logger.log(["(promise.send) ", "My name is ", this.name, ". I am ", this.age, " years old."].join(""));
        return this;
    },
    getTraits: function (s1, s2, s3) {
        logger.log(["(promise.invoke) ", "My traits are ", s1, " and ", s2].join(""));
        return this;
    },
    getFriends: function (f1, f2) {
        logger.log(["(promise.post) ", "My friends are ", f1, " and ", f2].join(""));
        return this;
    }
};
q.fcall(function() {
    logger.log("Promise returns a custom object");
    logger.log(customObj);
    return customObj;
})
.send("about")
.invoke("getTraits", "funny", "mischievous")
.post("getFriends", ["Donald", "Mini"])
.done(function(obj) {
    logger.log("Done calling all the methods");
});

promise.keys()
    等价于：promise.then(function(o){ return Object.keys(o); });

函数方法：

promise.fbind(..args) (废弃)

promise.fapply(args)
等价于：promise.then(function(f){ return f.apply(uhdefined, args); });
这两个也是参数形式上的区别。
promise.fcall(...args) 别名：Q.try  (ES5 browsers only)

Q.try(function () {
    if (!isConnectedToCloud()) {
        throw new Error("The cloud is down!");
    }
    return syncToCloud();
}).catch(function (error) {
    console.error("Couldn't sync to the cloud", error);
});

给resolve的参数函数传入参数
q.fcall(function() {
    logger.log("regular function returns a promise");
    return getResolvedPromise(logger, function(a, b) { return a + b; });
})
.fcall(3, 5)
.then(function(result) {
    logger.log("Result from an async op that return sum function: " + result);
});

// Writes to errors.log, returning a promise that will be fulfilled if the write succeeds
// or rejected if the write fails.
function writeError(errMessage) {
    var deferred = Q.defer();
    fs.writeFile("errors.log", errMessage, function(err) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}
 
// (or, using Q.nfcall:) 
function writeError(errMessage) {
    return Q.nfcall(fs.writeFile, "errors.log", errMessage);
}
---------------------------------------

数组方法：
promise.all()

Q.all([saveToDisk(), saveToCloud()]).done(function () {
    console.log("Data saved!");
});

promise.allSettled()
执行一些并行的操作，当所有完成时候获得通知，无论他们成功或失败。
Q.allSettled([saveToDisk(), saveToCloud()]).spread(function (disk, cloud) {
    console.log("saved to disk:", disk.state === "fulfilled");
    console.log("saved to cloud:", cloud.state === "fulfilled");
}).done();

promised.spread(onFulfilled, onRejected)
和then相似，执行处理，如果任何一个承诺在数组中被拒绝，就调用onRejected。
q.spread(["param4", "param5"], function(p, q) {
    logger.log("in inner spread handler");
    return [p, q];
})


Q.all([getFromDisk(), getFromCloud()]).spread(function (diskVal, cloudVal) {
    assert(diskVal === cloudVal);
}).done();

工具方法：
promise.thenResolve(value) ==; promise.then(function(){ return value; })

promise.thenReject(reason) ==; promise.then(function(){ throw reason })

promise.timeout(ms, message)

promise.delay(ms)
Returns a promise that will have the same result as promise, but will only be fulfilled or rejected after at least ms milliseconds have passed.

Q.delay(ms)
Q.delay(150).then(doSomething);
This is a convenient way to insert a delay into a promise chain, or even simply to get a nicer syntax for setTimeout. 

状态监视方法：
promise.isFulfilled()
promise.isRejected()
promise.isPending()
promise.inspect() 返回一个状态的快照对象：
    { state: "pending" }
    { state: "fulfilled", value: <fulfllment value> }
    { state: "rejected", reason: <rejection reason> }

Promise 创建：
Q.defer() 返回一个延迟对象具有以下属性及方法：
    promise property
    resolve(value) method
    reject(reason) method
    notify(value) method
    makeNodeResolver() method

deferred.resolve(value)

deferred.reject(reason)

deferred.notify(value)

Q(value)
If value is a Q promise, returns the promise.
If value is a promise from another library it is coerced into a Q promise (where possible).
If value is not a promise, returns a promise that is fulfilled with value.

Q.reject()

Q.Promise(resolver)
npm 版中是 Q.promise()

发生器：实验性质

Q.async(generatorFunction)
转换函数为延迟对象. 

Q.spawn(generatorFunction)

This immediately runs a generator function, and forwards any uncaught errors to Q.onerror. An uncaught error is deemed to occur if the function returns a rejected promise. Note that this automatically occurs if the generator function throws an error, e.g. by yielding on a promise that becomes rejected without surrounding that code with a try/catch:

Q.spawn(function* () {
    // If `createUser` returns a rejected promise, the rejection reason will
    // reach `Q.onerror`.
    var user = yield createUser();
    showUserInUI(user);
});

其他：
Q.isPromise(value)

Q.isPromiseAlike(value)

Q.promised(func)
Creates a new version of func that accepts any combination of promise and non-promise values, converting them to their fulfillment values before calling the original func. The returned version also always returns a promise: if func does a return or throw, then Q.promised(func) will return fulfilled or rejected promise, respectively.

This can be useful for creating functions that accept either promises or non-promise values, and for ensuring that the function always returns a promise even in the face of unintentional thrown exceptions.
--------------------------------------------------------
Interfacing with Node.js Callbacks
--------
Q.denodeify(nodeFunc, ...args)
Creates a promise-returning function from a Node.js-style function, optionally binding it with the given variadic arguments. An example:
node风格函数转为promise，并给函数传入绑定的参数：
var readFile = Q.denodeify(FS.readFile);

readFile("foo.txt", "utf-8").done(function (text) {

});

如果使用Node.js callback pattern, 比如 a function, 需要绑定函数的 this 值在传给 denodeify 之前:

var Kitty = mongoose.model("Kitty");//作为this值
var findKitties = Q.denodeify(Kitty.find.bind(Kitty));
---
Q.nfcall(myAsyncFunction, arg1, arg2);
Q.nfapply(myAsyncFunction, [arg1, arg2]);

// Work with rusable wrapper
var myAsyncPromiseFunction = Q.denodeify(myAsyncFunction);
myAsyncPromiseFunction(arg1, arg2);

in Deferred implementation:
var myAsyncPromiseFunction = deferred.promisify(myAsyncFunction);
myAsyncPromiseFunction(arg1, arg2);

One notable difference: Wrappers as generated by Deferred additionally auto-resolve promises passed as an arguments, so you can do:

var readFile = deferred.promisify(fs.readFile);
var writeFile = deferred.promisify(fs.writeFile);

// Copy file
writeFile('filename.copy.txt', readFile('filename.txt'));
--------
Q.nbind(nodeMethod, thisArg, ...args)
nodejs风格的函数转为promise，并给函数绑定this值，同时给函数传入绑定的参数：
var Kitty = mongoose.model("Kitty");
var findKitties = Q.nbind(Kitty.find, Kitty);

findKitties({ cute: true }).done(function (theKitties) {

});


与jQuery在实现上的不同：
https://github.com/kriskowal/q/wiki/Coming-from-jQuery

jquery对于内部抛出到then的异常并不做处理，而是冒泡直到window.onerror事件捕获。

转换jquery promise到Q：
return Q(jQuery.ajax({
    url: "foobar.html", 
    type: "GET"
})).then(function (data) {
    // on success
}, function (xhr) {
    // on failure
});

// Similar to jQuery's "complete" callback: return "xhr" regardless of success or failure
return Q.promise(function (resolve) {
    jQuery.ajax({
        url: "foobar.html",
        type: "GET"
    }).then(function (data, textStatus, jqXHR) {
        delete jqXHR.then; // treat xhr as a non-promise
        resolve(jqXHR);
    }, function (jqXHR, textStatus, errorThrown) {
        delete jqXHR.then; // treat xhr as a non-promise
        resolve(jqXHR);
    });
});

jQuery 承诺的结果并不保证：可以是X或A

jQueryPromise.then(function () {
    myObject.state = "X";
});
myObject.state = "A";

但是在Q中，结果一定是A。
qPromise.then(function () {
    myObject.state = "X";
});

myObject.state = "A";

---------------------------------------------
Test Case 4.9基本值
results.forEach(function(result) {
    if (result.state === "fulfilled") {
        output.push(result.value);
    } else {
        logger.log("Reject promise " + result.reason);
    }
});
---------------------------------------------
throw new Error("error in then handler");
[Q] Unhandled rejection reasons(should be empty)
---------------------------------------------
fin要放在 done前面
.fin(function() {
    logger.log("in fin handler");
}).done(function(param) {
    logger.log("in done handler");
});
---------------------------------------------
Test Case 7.5
Execute a function returned by a resolved promise (promise.resolve(fn), promise.fcall, promise.fapply

var showContainerDeferred = q.defer();
var hideContainerDeferred = q.defer();
//resolve a promise that returns a custom method
showContainerDeferred.resolve(function (parentDivId, childDivId) {
    logger.log("showContainerDeferred:" + ["parentdivid: ", parentDivId, " childDivId: ", childDivId].join(""));
});
//resolve a promise that returns a custom method
hideContainerDeferred.resolve(function (parentDivId, childDivId) {
    logger.log("hideContainerDeferred:" + ["parentdivid: ", parentDivId, " childDivId: ", childDivId].join(""));
});
// 给resolve（fn（x, y）） 作为参数函数的fn传参数， fcall
// Chain of promises that executes other promises
q.fcall(function() {
    logger.log("started a promise chain");
}).then(function() {
    showContainerDeferred.promise.fcall("parent1", "child1");
    hideContainerDeferred.promise.fcall("parent1", "child1");
}).then(function() {
    showContainerDeferred.promise.fapply(["parent2", "child2"]);
    hideContainerDeferred.promise.fcall("parent2", "child2");
});

//Shows how to store results from long-running functions so the result can be used by many callers. Useful for web services.
//缓存结果方便长时间（1-2秒）内的多次调用，可用作web服务。

### Result:
$ coffee pc.coffee
1 got 1371810343656
2 got 1371810343656
4 got 1371810343656
3 got 1371810343656
5 got 1371810346161
###
var Q, doLoad, getLoad, loadPromise;

Q = require('q');
loadPromise = null;
doLoad = function(){
    if(!loadPromise){
        loadPromise = Q.delay(1000).then(function(){
            //返回计算结果，被缓存
            return Date();
        });
    }
    loadPromise["finally"](function(){
        return setTimeout((function(){
            //1秒钟后清除计算结果，在1秒内的请求则返回以前缓存的结果。
            return loadPromise = null;
        }), 1000);
    });
    return loadPromise;
}

//作为请求
getLoad = function(id){
    return doLoad().then(function(data){//data为计算结果
        //返回缓存的计算结果
        return console.log("" + id + " got " + data);
    })
}

getLoad(1);
getLoad(2);
Q.delay(500).then(function(){
    return getLoad(3);
});
getLoad(4).then(function(){
    return Q.delay(1500).then(function(){
        return getLoad(5);
    })
});

//Retry a some times with a delay between attempts
//隔断时间重试几次
var Q = require("q");
var HTTP = require("q-http");//???
 
function httpReadRetry(url, timeout, times) {
    return HTTP.read(url)
        .then(function(content) {
            return content;
        }, function(error) {
            if (times == 0)
                throw new Error("Can't read " + JSON.stringify(url));
            return Q.delay(timeout)
                .then(function() {
                    return httpReadRetry(url, timeout, times - 1);
                });
        });
}

var Q = require("q");
exports.read = function(path, timeout) {
    var response = Q.defer();
    var request = new XMLHttpRequest(); // ActiveX blah blah
    request.open("GET", path, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                response.resolve(request.responseText);
            } else {
                response.reject("HTTP " + request.status + " for " + path);
            }
        }
    };
    timeout && setTimeout(response.reject, timeout);
    request.send('');
    return response.promise;
};
-----------------------------
// ajax call
function one() {
    var deferred = Q.defer(); // Don't worry yet what this is until after you understand the flow
    console.log("Starting one's ajax");
    $.ajax({
        url: '/',
        success: function() {
            // Here's where you want to call the next function in the
            // list if there is one. To do it, call deferred.resolve()
            console.log('Finished with one. Ready to call next.');
            deferred.resolve();
        }
    });
    // The deferred object has a "promise" member, which has a "then" function
    return deferred.promise;
}
-------------------------------
// promise 能在三个不同状态下，返回数据到相应的callback里面。
// 获取图像列表jsonp显示
var getData = function() {
    var deferred = q.defer();
    $.getJSON("http://127.0.0.1:8083/when.php?callback=?")
        .done(function(data) {
            deferred.resolve(data);
        }).fail(function(data) {
            console.log("fail");
        });

    return deferred.promise;
}

var getImg = function(src) {
    var deferred = q.defer();
    var img = new Image();
    img.onload = function() {
        deferred.resolve(img);
    };
    img.src = src;

    return deferred.promise;
}

var showImgs = function(img) {
    $(img).appendTo($('#container'));
}

var getImgs = function(data) {
    var deferreds = [];
    for (var i = 0; i < data.length; i++) {
        deferreds.push(getImg(data[i]));
    }
    return deferreds;
}
// 全部执行完毕以后，then
q.all(getData().then(getImgs)).then(showImgs);
-------------------------
// 进度显示 notify
function run() {
    var defer = q.defer();
    var start = 0,
        end = 100;

    var pros = function() {
        if (start <= end) {
            defer.notify(start++);
            setTimeout(pros, 50);
        } else {
            defer.reject('time out');
        }
    };

    pros();
    return defer.promise;
}
run().then(undefined, function(reason) {
    console.log("reason");
}, function(data) {
    $("#container").text(data);
});
-----------------------------------------------------------
http://documentup.com/kriskowal/q/#tutorial/the-beginning
direct manipulation         using a promise as a proxy
--------------------------  -------------------------------
value.foo                   promise.get("foo")
value.foo = value           promise.put("foo", value)
delete value.foo            promise.del("foo")
value.foo(...args)          promise.post("foo", [args])
value.foo(...args)          promise.invoke("foo", ...args)
value(...args)              promise.fapply([args])
value(...args)              promise.fcall(...args)

