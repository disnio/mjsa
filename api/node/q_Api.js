jquery deferred：
http://javascript.ruanyifeng.com/jquery/deferred.html

Promises的主要目的就是取代回调函数，成为非同步操作的解决方案。
它的核心思想就是让非同步操作返回一个对象，其他操作都针对这个对象来完成。

progress()用来指定一个回调函数，当调用notify()方法时，该回调函数将执行。
var userProgress = $.Deferred();
var $profileFields = $("input");
var totalFields = $profileFields.length
    
userProgress.progress(function (filledFields) {
    var pctComplete = (filledFields/totalFields)*100;
    $("#progress").html(pctComplete.toFixed(0));
}); 

userProgress.done(function () {
    $("#thanks").html("Thanks for completing your profile!").show();
});

$("input").on("change", function () {
    var filledFields = $profileFields.filter("[value!='']").length;
    userProgress.notify(filledFields);
    if (filledFields == totalFields) {
        userProgress.resolve();
    }
});
（1）概述
deferred.then( doneFilter [, failFilter ] [, progressFilter ] )
（2）返回值
deferred对象有三种状态。
    pending：表示操作还没有完成。
    resolved：表示操作成功。
    rejected：表示操作失败。

在jQuery 1.8之前，then()只是.done().fail()写法的语法糖，两种写法是等价的。
在jQuery 1.8之后，then()返回一个新的promise对象，而done()返回的是原有的deferred对象。
如果then()指定的回调函数有返回值，该返回值会作为参数，传入后面的回调函数。
利用then()会修改返回值这个特性，我们可以在调用其他回调函数之前，对前一步操作返回的值进行处理。

（3）对返回值的修改
var post = $.post("/echo/json/")
    .then(function(p){
        return p.firstName;
    });

post.done(function(r){ console.log(r); });

有时，Ajax操作返回json字符串里面有一个error属性，表示发生错误。这个时候，传统的方法只能是通过done()来判断是否发生错误。通过then()方法，可以让deferred对象调用fail()方法。

var myDeferred = $.post('/echo/json/', {json:JSON.stringify({'error':true})})
    .then(function (response) {
            if (response.error) {
                return $.Deferred().reject(response);
            }
            return response;
        },function () {
            return $.Deferred().reject({error:true});
        }
    );

myDeferred.done(function (response) {
        $("#status").html("Success!");
    }).fail(function (response) {
        $("#status").html("An error occurred");
    });
关于error的处理，jQuery的 deferred 对象与其他实现 Promises 规范的函数库有一个重大不同。
就是说，如果 deferred 对象执行过程中，抛出一个非 Promises 对象的错误，那么将不会被后继的then方法指定的rejected回调函数捕获，
而会一直传播到应用程序层面。为了代码行为与 Promises 规范保持一致，建议出错时，总是使用 reject 方法返回错误。

（4）回调函数的返回值

如果回调函数返回 deferred 对象，则 then 方法的返回值将是对应这个返回值的 promise 对象。
var d1 = $.Deferred();

var promise = $.when('Hello').then(function(h){  
  return $.when(h,d1);
})

promise.done(function (s1,s2) {
    console.log(s1);
    console.log(s2);
})

d1.resolve('World')
// Hello
// World
// 
上面代码中，done 方法的回调函数，正常情况下只能接受一个参数。
但是由于then方法的回调函数，返回一个 when 方法生成的 deferred 对象，导致它可以接受两个参数。
------------
pipe方法接受一个函数作为参数，表示在调用then方法、done方法、fail方法、always方法指定的回调函数之前，
先运行pipe方法指定的回调函数。它通常用来对服务器返回的数据做初步处理。

Promise事实上的标准是社区提出的 Promise A+ 规格， jQuery的实现并不完全符合 Promise A+，主要是对错误的处理。
在回调函数中抛出一个错误，Promise A+规定此时Promise实例的状态变为reject，该错误被下一个catch方法指定的回调函数捕获。

jQuery 的 Deferred 对象此时不会改变状态，亦不会触发回调函数，该错误一般情况下会被 
window.onerror捕获。换句话说，在 jquery Deferred 对象中，总是必须使用 reject 方法来改变状态。
------------
promise 对象： 
从外部改变第三方完成的异步操作（比如Ajax）的状态是毫无意义的。
为了防止用户这样做，可以在deferred对象的基础上，返回一个针对它的promise对象。

promise 对象就是不能改变状态的 deferred 对象，也就是 deferred 的只读版。
或者更通俗地理解成，promise 是一个对将要完成的任务的承诺，排除了其他人破坏这个承诺的可能性，只能等待承诺方给出结果。
也就是说promise对象不允许你调用resolve和reject方法。

---
$.when()接受多个 deferred 对象作为参数，当它们全部运行成功后，才调用 resolved 状态的回调函数，
但只要其中有一个失败，就调用 rejected 状态的回调函数。它相当于将多个非同步操作，合并成一个。
实质上，when 方法为多个 deferred 对象，返回一个单一的 promise 对象。
如果 when 方法的参数不是 deferred 或 promise 对象，则直接作为回调函数的参数。
---
var post = $.ajax({
    url: "/echo/json/",
    data: {json: JSON.stringify({firstName: "Jose", lastName: "Romaniello"})} ,
    type: "POST"
});

post.done(function(p){
    alert(p.firstName +  " saved.");
});

post.fail(function(){
    alert("error!");
});
---
var post = $.post("/echo/json/",
        {
            json: JSON.stringify({firstName: "Jose", lastName: "Romaniello"})
        }
    ).pipe(function(p){
        return "Saved " + p.firstName;
    });

post.done(function(r){ alert(r); });
---
d = $.Deferred()  
$.when(d, 'World').done(function (s1, s2){
    console.log(s1);
    console.log(s2);
})

d.resolve('Hello') 
// Hello 
// World
--- 
// https://msdn.microsoft.com/en-us/magazine/gg723713.aspx
function prepareInterface() {
    return $.Deferred(function( dfd ) {
        var latest = $( “.news, .reactions” );
            latest.slideDown( 500, dfd.resolve );
            latest.addClass( “active” );
        }).promise();
}
 
$.when(
    getLatestNews(),
    getLatestReactions(),
    prepareInterface()
).then(function(){
    console.log( “fire after requests succeed” );
}).fail(function(){
    console.log( “something went wrong!” );
});
---
缓存示例：
var cachedScriptPromises = {};
 
$.cachedGetScript = function( url, callback ) {
    if ( !cachedScriptPromises[ url ] ) {
        cachedScriptPromises[ url ] = $.Deferred(function( defer ) {
            $.getScript( url ).then( defer.resolve, defer.reject );
        }).promise();
    }
    return cachedScriptPromises[ url ].done( callback );
};
---
改进：
$.createCache = function( requestFunction ) {
    var cache = {};
    return function( key, callback ) {
        if ( !cache[ key ] ) {
            cache[ key ] = $.Deferred(function( defer ) {
                requestFunction( defer, key );
            }).promise();
        }
        return cache[ key ].done( callback );
    };
}
$.cachedGetScript = $.createCache(function( defer, url ) {
    $.getScript( url ).then( defer.resolve, defer.reject );
});
---
图像加载应用：
$.loadImage = $.createCache(function( defer, url ) {
    var image = new Image();
    function cleanUp() {
       image.onload = image.onerror = null;
    }
    defer.then( cleanUp, cleanUp );
    image.onload = function() {
        defer.resolve( url );
    };
    image.onerror = defer.reject;
    image.src = url;
});
$.loadImage( "my-image.png" ).done( callback1 );
--
$.searchTwitter = $.createCache(function( defer, query ) {
    $.ajax({
        url: "http://search.twitter.com/search.json",
        data: {
            q: query
        },
        dataType: "jsonp",
        success: defer.resolve,
        error: defer.reject
    });
});
$.searchTwitter( "jQuery Deferred", callback1 );
---
同步动画：
$.fn.animatePromise = function( prop, speed, easing, callback ) {
   var elements = this;
   return $.Deferred(function( defer ) {
        elements.animate( prop, speed, easing, function() {
            defer.resolve();
            if ( callback ) {
                callback.apply( this, arguments );
            }
        });
   }).promise();
};
var fadeDiv1Out = $( "#div1" ).animatePromise({
        opacity: 0
    }),
    fadeDiv2In = $( "#div1" ).animatePromise({
        opacity: 1
    }, "fast" );
 
$.when(
    fadeDiv1Out,
    fadeDiv2In
).done(function() {
    /* both animations ended */
});

---
$.fn.bindOnce = function( event, callback ) {
    var element = $( this[ 0 ] ),
        defer = element.data( "bind_once_defer_" + event );
    if ( !defer ) {
        defer = $.Deferred();
        function deferCallback() {
            element.unbind( event, deferCallback );
            defer.resolveWith( this, arguments );
        }
        element.bind( event, deferCallback )
        element.data( "bind_once_defer_" + event , defer );
    }
    return defer.done( callback ).promise();
};
The code works as follows:

check if the element already has a deferred attached for the given event
if not, create it and make it so it is resolved when the event is fired the first time around
then attach the given callback to the deferred and return the promise

$.fn.firstClick = function( callback ) {
    return this.bindOnce( "click", callback );
};

Then the logic can be re-factored as follows:

var openPanel = $( "#myButton" ).firstClick();
    
openPanel.done( initializeData );
openPanel.done( showPanel );
---
<div id="myPanel">
    <img data-src="image1.png" />
    <img data-src="image2.png" />
    <img data-src="image3.png" />
    <img data-src="image4.png" />
</div>

$( "#myButton" ).firstClick(function() {
       
   var panel = $( "#myPanel" ),
       promises = [];
       
   $( "img", panel ).each(function() {
       var image = $( this ),
           src = element.attr( "data-src" );
       if ( src ) {
           promises.push(
               $.loadImage( src ).then( function() {
                   image.attr( "src", src );
               }, function() {
                   image.attr( "src", "error.png" );
               } )
           );
       }
   });
 
   promises.push(
       panel.slideDownPromise()
   );
 
   $.when.apply( null, promises ).done(function() {
       panel.fadeIn();
   });
});
-----
// http://www.intridea.com/blog/2011/2/8/fun-with-jquery-deferred
$.wait = function(time) {
  return $.Deferred(function(dfd) {
    // 经过 time 承诺履行， deferred.then(doneCallbacks,failCallbacks[, progressCallbacks])
    // 经过 time ， 发送履行的信号， 然后 then 的 resolved 函数执行
    setTimeout(dfd.resolve, time);
  });
}

Now, thanks to the Deferreds, I can write timeouts in my app like this:

$.wait(5000).then(function() {
  alert("Hello from the future!");
});
---
Twitter = {
  search:function(query) {
    var dfr = $.Deferred();
    $.ajax({
     url:"http://search.twitter.com/search.json",
     data:{q:query},
     dataType:'jsonp',
     success:dfr.resolve
    });
    return dfr.promise();
  }
}
// Now I can easily perform Twitter searches in my app like so:

Twitter.search('intridea').then(function(data) {
  alert(data.results[0].text);
});
----
//1: done, 2: cancelled, other: pending
function getPrintingStatus(){
    var d = $.Deferred();
    $.post(
        "/echo/json/",
        {
            json: JSON.stringify( {status: Math.floor(Math.random()*8+1)} ),
            delay: 2
        }
    ).done(function(s){
        d.resolve(s.status);
    }).fail(d.reject); 
    return d.promise();
}

function pollUntilDone(){
    //do something
    return getPrintingStatus()
            .pipe(function(s){
                if(s === 1 || s == 2) {
                    return s;  //if the status is done or cancelled return the status
                }
                //if the status is pending... call this same function
                //and return a deferred...
                return pollUntilDone();
            });
}

$.blockUI({message: "Loading..."});

pollUntilDone()
    .pipe(function(s){ //project the status code to a meaningfull string.
            switch(s){
            case 1:
                return "done";
            case 2:
                return "cancelled";
            }  
    })
    .done(function(s){
        $.unblockUI();
        alert("The status is " + s);
    });
---
function getCustomer(customerId){
    var d = $.Deferred();
    $.post(
        "/echo/json/",
        {json: JSON.stringify({firstName: "Jose", lastName: "Romaniello", ssn: "123456789"})}
    ).done(function(p){
        d.resolve(p);
    }).fail(d.reject); 
    return d.promise();
}

function getPersonAddressBySSN(ssn){
    return $.post("/echo/json/", {
            json: JSON.stringify({
                ssn: "123456789",
                address: "Siempre Viva 12345, Springfield" })
    }).pipe(function(p){
        return p.address;
    });
}

$.when(getCustomer(123), getPersonAddressBySSN("123456789"))
    .pipe(function(person, address){
        return $.extend(person, {address: address});
    })
    .done(function(person){
        alert("The name is " + person.firstName + " and the address is " + person.address);
    });
---
function getCustomer(customerId){
    var d = $.Deferred();
    $.post(
        "/echo/json/",
        {json: JSON.stringify({firstName: "Jose", lastName: "Romaniello", ssn: "123456789"}),
         delay: 4}
    ).done(function(p){
        d.resolve(p);
    }).fail(d.reject); 
    return d.promise();
}

function getPersonAddressBySSN(ssn){
    return $.post("/echo/json/", {
             json: JSON.stringify({
                            ssn: "123456789",
                            address: "Siempre Viva 12345, Springfield" }),
             delay: 2
    }).pipe(function(p){
        return p.address;
    });
}

function load(){
    $.blockUI({message: "Loading..."});
    var loadingCustomer = getCustomer(123)
                            .done(function(c){
                                $("span#firstName").html(c.firstName)
                            });

    var loadingAddress = getPersonAddressBySSN("123456789")
                            .done(function(address){
                                $("span#address").html(address)
                            });
    
    $.when(loadingCustomer, loadingAddress)
     .done($.unblockUI);
}

load();
--------------------------------------------------------------------------------
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

I am trying to get few values from redis, combine them and eventually send. But I just cant make those promises work.
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
--------------------------------------------------------------------------------
http://joseoncode.com/2013/05/23/promises-a-plus/
/*
 * simulate an ajax operation to fetch a customer profile
 */
function getUser (id) {
  return Q.delay(1000)
  .thenResolve({
      id: id, 
      name: 'user ' + id, 
      twiterHandler: 'jfroma'
  });
}

/*
 * simulate an asynchronous fetch from twitter.com
 */
function getTweets (customer) { 
  return Q.delay(1000)
  .thenResolve([{
    message: 'I love Q and Promises/A+'
  }]);
}

getUser(123)
  .then(getTweets)
  .then(function (tweets) {
    tweets.forEach(function(t){
      alert(t.message);
    });
  });
// In this example we first get the user with getUser and then we get his tweets getTweets. 
// The result of then(getTweets) becomes a new promise that will be fullfiled when the two things are fulfilled 
// and it will be fulfilled with tweets.
---
// At the point I'm writing this jQuery promises are not compatible with Promises/A and Promises/A+, so an easy way to fix this is as follows:
function getUser(id) {
  var d = Q.defer() 

  $.ajax({
    url: "/echo/json/",
    data: { json: JSON.stringify({firstName: "Jose", lastName: "Romaniello"})} ,
    type: "POST"
  }).done(d.resolve).fail(d.reject);
 
  return d.promise;
}

getUser(123)
.then(function (user) {
  return Q.delay(2000)
          .thenResolve(user);
}).then(function (user) {
  alert(user.firstName);
});

// Despite the specification doesn't work with jQuery Promises, the Q implementation does in a straightforward way:

Q($.get('/something'))

// You can wrap a jQuery promise with Q to convert it to Promise/A+.
---
// Q.all converts an array of promises into a single promise that will be fulfilled
//  when all the promises are fulfilled with an array of all the values or rejected with 
//  the first reason a promise is rejected.
function getUser(id) {
  return Q.delay(1000)
          .thenResolve({id: id, name: 'User ' + id});
}

var userPromises = [1,2,3].map(getUser);

Q.all(userPromises)
 .then(function (users) {
   alert('we got ' + users.length + ' users');
 });
---
// In this case the spread method (from Q- not standard) works like then but "spread" all 
// the values in arguments thus we can give the mergeProfiles function directly.
function getUser (id) {
  return Q.delay(1000)
    .thenResolve({id: id, name: 'User ' + id});
}

function getTwitterProfile (twitterHandler) {
  return Q.delay(1000)
    .thenResolve({handler: twitterHandler});
}

function mergeProfiles (user, twitter) {
  user.handler = twitter.handler;
  return user;
}

Q.all([getUser(123), getTwitterProfile('jforma')])
 .spread(mergeProfiles)
 .then(function (prof) {
   alert(prof.name + ' known as ' + prof.handler);
 });
---
// Another interesting thing about promises is error handling. 
// In node.js land it happens a lot that you end with a code like this:

doFoo(function (err, r1) {
  if (err) return handleError(err);

  doBar(r1, function (err, r2) {
    if (err) return handleError(err);

    doBaz(r2, function (err, r3) {
      if (err) return handleError(err);

      callback(r3);
    });

  });
});

// I want you to notice this line three times:

if (err) return handleError(err)

// With promises you can write this same code as follows:
doFoo()
  .then(doBar)
  .then(doBaz)
  .then(null, handleError);
// Because the two first then calls doesn't have a onreject handler 
// they will pass the rejection reason to the next promise until someone handles that error.
// More interesting if a promise is rejected none of the fulfill handlers here will be called.
// The other interesting thing about this is that if you throw an exception inside a then call
//  the promise will be rejected.

---
// node.js api and modules follow a convention for asynchronous code, 
// functions usually have callback parameter as the very last parameter 
// and this callback get called with error and value.

// So, Q make it easy to convert this style to promises as follows:
var Q = require('q');
var readdir = Q.nbind(require('fs').readdir);

//usage
readdir('./path')
  .then(function (files) {

  }, function (err) {

  });
---
// 原生阅读：
// http://blogs.msdn.com/b/ie/archive/2011/09/11/asynchronous-programming-in-javascript-with-promises.aspx
