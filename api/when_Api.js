// pending可以理解为deferred.promise的别名，简单高效
// resolved表示该deferred是否已经reject或者resolve了
deferred = {
    promise: undef, resolve: undef, reject: undef, notify: undef,
    resolver: { resolve: undef, reject: undef, notify: undef }
};
resolve, reject, notify
onFulfilled, onRejected, onProgress
        
var arrayBased = apply(argBased);
var inputs = [1, 2, 3];
arrayBased(inputs); // 6

With promises:
var d = when.defer();
d.promise.then(arrayBased);

d.resolve([1, 2, 3]); // arrayBased called with args 1, 2, 3 -> 6

----------------------------------------------
when()
when(promiseOrValue, onFulfilled, onRejected, onProgress)

// Returns a promise for the result of onFulfilled or onRejected depending
// on the promiseOrValue's outcome
var promise = when(promiseOrValue, onFulfilled, onRejected);

// 总是返回可信赖的 promise, 保证可以链式调用:
when(promiseOrValue, onFulfilled, onRejected, onProgress)
    .then(anotherOnFulfilled, anotherOnRejected, anotherOnProgress);

// All parameters except the first are optional
// For example, you can register only an onFulfilled handler
when(promiseOrValue, onFulfilled);

when() 可以“观察”任何提供了then 方法的 promise 对象, 甚至 promises 实现并不遵从promise/A 规范 , 比如 jQuery的 Deferred . 它将转化这些 promises实现是他们行为上更像 Promises/A。
-----------------------------
// 建立一个挂起的 promise 它的命运取决于提供的 resolver 函数
var promise = when.promise(resolver);

// Or a resolved promise
var promise = when.resolve(promiseOrValue);

// Or a rejected promise
var promise = when.reject(reason);
----------------------------------------------
promise.done(handleValue, handleError);
用done 终止 promise 链, 同时取出最终结果或错误.

返回拒绝或抛出异常时候， 很容易产生大量的堆栈跟踪在vm或node中。done提供了一种反馈对应开发时的错误，减少潜在的未处理 promise 拒绝。 
done simply cannot catch,
done always returns undefined
----------------------------------------------
catch()

ALIAS: otherwise() for non-ES5 environments
promise.catch(onRejected);
// or
promise.otherwise(onRejected);
----------------------------------------------
finally()
做清除类型的工作在 promise 链中。 调用 onFulfilledOrRejected 不能带参数。
当 promise 是 fulfilled or rejected。 onFulfilledOrRejected 不能修改 promise的 fulfillment 值，但是可以发送一个新的 promise 或者 附加的错误通过抛出异常或返回一个 rejected promise。

ALIAS: ensure() for non-ES5 environments

promise.finally(onFulfilledOrRejected);
// or
promise.ensure(onFulfilledOrRejected);

try {
    return doSomething(x);
} catch (e) {
    return handleError(e);
} finally {
    cleanup();
}
return doSomething()
    .catch (handleError)
    .finally(cleanup);
----------------------------------------------
yield() 和Q的thenResolve相似

originalPromise.yield(promiseOrValue);
返回一个新的 promise:

    如果 originalPromise 是 rejected, 那么被返回的 promise 也会被 rejected with 同样的原因。
    如果 originalPromise 是 fulfilled（履行）, 那么 "yields" 的 promiseOrValue 执行的返回值:
        是值, 被返回的 promise 将被 fulfilled 带着 promiseOrValue的值
        是promise, 被返回的 promise 将:
            带着 promiseOrValue 的fulfilled 履行值, 
            或带着 promiseOrValue 的rejected 拒绝原因。
像：            
originalPromise.then(function() {
    return promiseOrValue;
});
----------------------------------------------
tap()

promise.tap(onFulfilledSideEffect);
Executes a function as a side effect when promise fulfills.
当 promise 履行情况下， 执行一个函数作为附加效果。返回一个新的 promise ：

    如果 onFulfilledSideEffect 成功执行, 返回的 promise 通过 tap 的fulfills 返回 并带着 promise 的履行值。onfulfilledSideEffect 的结果会被抛弃（只是为了附加效果）.
    当 onFulfilledSideEffect 抛出异常 或 返回拒绝, 返回的 promise 通过 tap 的rejects 返回.
当 promise 拒绝, onFulfilledSideEffect 不执行, 返回的promise 通过 tap 的rejects 返回 promise的 拒绝原因.
像：
// Using only .then()
promise.then(function(x) {
    doSideEffectsHere(x);
    return x;
});

var defer = when.defer();
defer.promise.tap(function (value) {
    var s = 3;
    setTimeout(function(){
        console.log(s);
    },2000);
    return 'good';
}).then(function (value) {
    console.log('value: ' + value); // value: hello
}, function (reason) {
    console.log('reason: ' + reason);
});
defer.resolve('hello');
// value: hello
// 3
总结：上述的输出并不会因为我return了good而改变接下来输出的value值
----------------------------------------------
spread() 

promise.spread(variadicOnFulfilled);

调用 variadicOnFulfilled 以 promise的值为参数, 参数假定为数组, 
e.g. variadicOnFulfilled.spread(undefined, array)

//类似 Wrapping variadicOnFulfilled
promise.then(function(array) {
    return variadicOnFulfilled.apply(undefined, array);
});

----------------------------------------------
inspect()

var status = promise.inspect();

返回promise当前状态的快照. 当 promise 的状态改变，这个结果不变. 状态属性：

pending: { state: 'pending' }
fulfilled: { state: 'fulfilled', value: <promise's fulfillment value> }
rejected: { state: 'rejected', reason: <promise's rejection reason> }

------------------------------------
var resolver = deferred.resolver;
resolver.resolve(promiseOrValue);
resolver.reject(reason);
resolver.notify(update);

var promise = when.promise(resolver);
var promise = when.promise(function(resolve, reject, notify) {
    // Do some work, possibly asynchronously, and then
    // resolve or reject.  You can notify of progress events
    // along the way if you want/need.

    resolve(awesomeResult);
    // or resolve(anotherPromise);
    // or reject(nastyError);
});

----------------
var deferred = when.defer();
var promise = deferred.promise;
var resolved = when.resolve(promiseOrValue);
var rejected = when.reject(error);
----------------------------------------------

when.join()
var joinedPromise = when.join(promiseOrValue1, promiseOrValue2, ...);

当所有输入都履行着返回，返回的是有每个输入履行返回的数组。
如果有一个拒绝，者返回拒绝带着第一个拒绝的原因。
'should join mixed array': function(done) {
    when.join(resolved(1), 2, resolved(3), 4).then(
        function(results) {
            assert.equals(results, [1, 2, 3, 4]);
        },
        fail
    ).ensure(done);
},
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
Arrays of promises：

when.all()
var promise = when.all(array)
输入参数为值数组或promise的数组，这是和join的区别，其他一样。
----------------------------------------------
when.map()
var promise = when.map(array, mapFunc)
如果有一个拒绝，则返回拒绝带着第一个拒绝的原因。
function mapper(val) {
    return val * 2;
} 

'should reject when input contains rejection': function(done) {
    var input = [resolved(1), reject(2), resolved(3)];
    when.map(input, mapper).then(
        fail,
        function(result) {
            assert.equals(result, 2);
        }
    ).ensure(done);
},
----------------------------------------------
when.reduce()
var promise = when.reduce(array, reduceFunc [, initialValue])
'should reduce promised values with initial promise': function(done) {
    var input = [resolved(1), resolved(2), resolved(3)];
    when.reduce(input, plus, resolved(1)).then(
        function(result) {
            assert.equals(result, 7);
        },
        fail
    ).ensure(done);
},
'should accept a promise for an array': function(done) {
    when.reduce(resolved([1, 2, 3]), plus, '').then(
        function(result) {
            assert.equals(result, '123');
        },
        fail
    ).ensure(done);
},

----------------------------------------------
when.settle()
var promise = when.settle(array);
// 不论履行或拒绝都把结果放置到返回的promise数组中。
// 遍历promiseOrValue数组，返回的新promise对象一定会resolve，除非array本身就是rejected的promise对象
// 且不会因为其中一个promise对象reject，而导致返回的新promise对象reject，而只会记录reject state的信息
// 这与when.all方法时不同的
// 可以看见内部调用了toFulfilledState和toRejectedState作为回调
// 那么返回的promise对象在onFulfilled将得到数组所有promiseOrValue的state信息
var array = [when.reject(1), 2, when.resolve(3), when.reject(4)];

// Settle all inputs
var settled = when.settle(array);

// Logs 1 & 4 and processes 2 & 3
settled.then(function(descriptors) {
    descriptors.forEach(function(d) {
        if(d.state === 'rejected') {
            logError(d.reason);
        } else {
            processSuccessfulResult(d.value);
        }
    });
});
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
Object Keys

when/keys 模块
when/keys all
var promise = keys.all(object)
'should resolve input values': function(done) {
    var input = { a: 1, b: 2, c: 3 };
    keys.all(input).then(
        function(results) {
            assert.equals(results, input);
        },
        fail
    ).ensure(done);
},

when/keys map
var promise = keys.map(object, mapFunc)
'should map promise for keys': function(done) {
    var input = { a: resolve(1), b: 2, c: resolve(3) };
    keys.map(resolve(input), function(x) {
        return x + 1;
    }).then(
        function(results) {
            assert.equals(results, { a: 2, b: 3, c: 4 });
        },
        fail
    ).ensure(done);
},
---------------------------------------
竞争关系：Competitive races
when.any()
var promise = when.any(array)
如果所有的拒绝，则返回拒绝。
有一个履行着返回履行了的，有拒绝的这返回带着拒绝的原因加入数组中返回。
'should reject with all rejected input values if all inputs are rejected': function(done) {
    var input = [rejected(1), rejected(2), rejected(3)];
    when.any(input,
        fail,
        function(result) {
            assert.equals(result, [1, 2, 3]);
        }
    ).ensure(done);
},

when.some()
var promise = when.some(array, howMany)
必须有 howMany 个履行完成，才返回履行。否则返回拒绝原因的数据。 
'should reject with all rejected input values if resolving howMany becomes impossible': function(done) {
    var input = [resolved(1), rejected(2), rejected(3)];
    when.some(input, 2,
        fail,
        function(failed) {
            assert.equals(failed, [2, 3]);
        }
    ).ensure(done);
},}}
------------------------------------
无限列表：Unbounded lists
以下情况:
1.正在处理的队列项仍然在增加。
2.执行重复的任务，直到限定条件变为true。
3.需要有选择的去处理数组中的项目，而不是所有。

在这些情况下使用 when/unfold 去迭代处理这些项直到指定条件成熟。
var unfold, promise;
unfold = require('when/unfold');
promise = unfold(unspool, condition, handler, seed);

unspool： 函数作为种子生成器，返回一个数组[需要给handler处理的值，新种子]。
condition：函数返回真时候，unfold 停止。确认的是seed 的状态。
handler：接收当前迭代产生的上面的对，处理对里的值用任何方式。可以返回一个promise给下一个unfold 的迭代。
seed： 给第一次unspool调用提供的初始化值。可以是一个promise。

发送unspool每次迭代生成的值或promise到 handler 函数处理该值，直到 condition 为真停止。 unspool函数像一个生成器，通过一个种子值然后生成值和新种子。生成的值会被传到 handler做相应处理，并返回一个promise。新的种子将会被传到 unspool 开始下一次迭代。

var when, delay, unfold, end, start;
when = require('../when');
delay = require('../when/delay');
unfold = require('../when/unfold');
end = Date.now() + 10000;

function unspool(seed) {
    // seed 传入但在这里不需要

    // 返回一个随机数作为值, 生成的时间作为新的seed种子。
    // 真正使用时候的逻辑在种子的产生。通过迭代每个种子生成每次要处理的值。
    var next = [Math.random(), Date.now()];

    // 为这个函数引入一个延迟，显示可以返回一个 promise
    return delay(next, Math.random() * 1000);
}
// 10秒后停止
function condition(time) {
    return time >= end;
}
// handler 处理函数
function log(value) {
    console.log(value);
}
// seed
start = Date.now();
unfold(unspool, condition, log, start).then(function() {
    console.log('Ran for', Date.now() - start, 'ms');
});

0.18365754676051438
0.6408349287230521
0.38852072856388986
0.23552647326141596
......
Ran for 11380 ms

var when, delay, unfold, nodefn, fs, files;

when = require('../when');
delay = require('../delay');
unfold = require('../unfold');
nodefn = require('../when/function');
fs = require('fs');
files = nodefn.call(fs.readdir, '.');

function unspool(files) {
    var file, content;
    file = files[0];
    content = nodefn.call(fs.readFile, file)
        .catch(function(e) {
            return '[Skipping dir ' + file + ']';
        });
    return [content, files.slice(1)];
}

function condition(remaining) {
    // 停止当文件名以p打头
    return remaining[0].charAt(0) === 'p';
}

function printFirstLine(content) {
    // Even though contents was a promise in unspool() above,
    // when/unfold ensures that it is fully resolved here, i.e. it is
    // not a promise any longer.
    // We can do any work, even asyncrhonous work, we need
    // here on the current file
    // Node fs returns buffers, convert to string
    content = String(content);

    // Print the first line, or only the first 80 chars if the fist line is longer
    console.log(content.slice(0, Math.min(80, content.indexOf('\n'))));
}

unfold(unspool, condition, printFirstLine, files).catch(console.error);
-----------------------------------
when/unfold/list

var unfoldList, resultPromise;

unfoldList = require('when/unfold/list');

resultPromise = unfoldList(unspool, condition, seed);

当条件问真后返回一个unspool处理seed后生成的列表.

function condition(i) {
    // Terminate the unfold when i == 3; seed
    return i == 3;
}

// unspool will be called initially with the seed value, 0, passed
// to unfoldList() below
function unspool(x) {
    // item 0: will be added to the resulting list
    // item 1: will be passed to the next call to condition() and unspool()
    return [x, x+1];
}

// Logs:
// [0, 1, 2]
unfoldList(unspool, condition, 0).then(console.log.bind(console));

-------------------------------------------------
时间：
when/delay

var delayed = delay(milliseconds [, promiseOrValue]);
var delayed = delay(milliseconds);
var delay, delayed;

delay = require('when/delay');

delayed = delay(1000);

// delayed is a pending promise that will become fulfilled
// in 1 second with the value "hello"
delayed = delay(1000, "hello")

// delayed is a pending promise that will become fulfilled
// 1 second after anotherPromise resolves, or will become rejected
// *immediately* after anotherPromise rejects.
delayed = delay(1000, anotherPromise);

// Do something after 1 second, similar to using setTimeout
delay(1000).then(doSomething);

// Do something 1 second after triggeringPromise resolves
delay(1000, triggeringPromise).then(doSomething, handleRejection);
------------------------------
when/timeout

var timed = timeout(milliseconds, promiseOrValue);
过期之后返回拒绝，如果promiseOrValue没有履行或拒绝. promiseOrValue 是 promise, 如果promise履行在过期前, 那么返回的 promise 就会 履行. 反之则拒绝.
var timeout, timed, d;

timeout = require('when/timeout');

// 5秒后拒绝，除非 anotherPromise 在这之前履行.
timed = timeout(5000, anotherPromise);

d = when.defer();
// Setup d however you need

// return a new promise that will timeout if d doesn't resolve/reject first
return timeout(1000, d.promise);
--------------------------------
并发：Concurrency
when/sequence 顺序

var sequence, resultsPromise;

sequence = require('when/sequence');

resultsPromise = sequence(arrayOfTasks, arg1, arg2 /*, ... */);

运行一个不重复的任务序列数组. 每个任务都会调用传入 when.sequence()的参数, 返回promise或值.

所有任务完成后, 返回的promise 包含每个任务的结果在数组的相应位置. 如果任何任务拒绝，返回的promise也将拒绝.
----------------------
when/pipeline 线道

var pipeline, resultsPromise;

pipeline = require('when/pipeline');

resultsPromise = pipeline(arrayOfTasks, arg1, arg2 /*, ... */);
和sequence不同的是，前次任务的结果作为后次任务的输入参数。第一次任务的参数为pipeline传入的参数序列。
所有任务完成后，返回的promise是最后履行的返回。，有一个拒绝则返回拒绝。
'should resolve to initial args when no tasks supplied': function() {
    return pipeline([], 'a', 'b').then(
        function(result) {
            assert.equals(result, ['a', 'b']);
        }
    );
},

'should allow initial args to be promises': function() {
    var expected, tasks;

    expected = [1, 2, 3];
    tasks = [this.spy()];

    return pipeline.apply(null, [tasks].concat([when(1), when(2), when(3)])).then(
        function() {
            assert.calledOnceWith.apply(assert, tasks.concat(expected));
        }
    );
}
(function() {
  var when = require('when');
  var pipeline = require('when/pipeline');

  // simulate some async call (database, reading from file, etc)
  function appendStringPromise(string, toAppend) {
    var deferred = when.defer();
    setTimeout(function() { deferred.resolve(string + toAppend); }, 100);
    return deferred.promise;
  }

  function fooBarBazQux() {
    return pipeline([
          function() { return appendStringPromise('', 'foo'); },
          function(string) { return appendStringPromise(string, 'bar'); },
          function(string) { return appendStringPromise(string, 'baz'); },
          function(string) { return appendStringPromise(string, 'qux'); }
    ]);
  }

  fooBarBazQux().then(function(fooBarBazQuxString) {
      console.log('when:', fooBarBazQuxString); // 'foobarbazqux'
  });

})();
------------------------
when/parallel 平行

var parallel, resultsPromise;

parallel = require('when/parallel');

resultsPromise = parallel(arrayOfTasks, arg1, arg2 /*, ... */);

和sequence不同的是，任务运行的次序是任意的，可以交错如果是异步任务。返回相同。
--------------------------
when/guard

var guard, guarded;
guard = require('when/guard');
guarded = guard(condition, function() {
    // .. Do important stuff
});

condition 是一个并发限制条件： guard.n

限制[函数]的并发. 建立一个新函数他的并发是受条件限制的。

// asynoOperation 并发限制为1
guardedAsyncOperation = guard(guard.n(1), asyncOperation);
// map时候只能是1个guardedAsyncOperation，运行。
mapped = when.map(array, guardedAsyncOperation);
mapped.then(function(results) {
    // Handle results as usual
});

---------
var start = Date.now();
var f1 =function(){
    console.log("f1 run");
    return delay(function(){return ("f1 delay 2 sec")}, 2000);
}
var f2 = function(){   
    return 333;
}
var f3 = function(){
    console.log("f3 run");
    return delay(function(){return ("f3 delay 3 sec")}, 3000);
}
tasks = [f2,f1,f3];
// Use bind() to create a guard that can be applied to any function
// 仅两个任务可以同时执行
guardTask = guard.bind(null, guard.n(2));

// Use guardTask to guard all the tasks.
// 给任务添加限制条件
tasks = tasks.map(guardTask);

// Execute the tasks with concurrency/"parallelism" limited to 2
taskResults = parallel(tasks);
taskResults.then(function(results) {
    // Handle results as usual
    console.log(Date.now()-start);
    console.log(results);
});
----guard.n(1)
f1 run
f3 run
5004
[ 333, [Function], [Function] ]
----guard.n(2)
f1 run
f3 run
3003
[ 333, [Function], [Function] ]
-----------------------------------------------------
Polling 轮询
when/poll
var poll, resultPromise;
poll = require('when/poll');
resultPromise = poll(work, interval, condition /*, initialDelay */);

    work - 定期调用的函数
    interval - 调用函数的时间间隔. 可以是一个数值或返回promise的函数. 如果是函数, 下一次轮询得在函数履行之后开始.
    condition - 计算调用函数的结果，直到返回真则停止。
    initialDelay - 为真值第一次调用函数将在interval之后. 为false或没有, work立即执行。

重复执行任务在指定间隔 interval,直到条件为真停止. resultPromise 被履行为最近多数work的返回值.  resultPromise 被拒绝当 work失败或在 条件返回真之前返回了拒绝。

------------------------------------
和非promise代码的相互作用
这些模块的目标是消除摩擦在基于promises的代码和常见的异步任务和错误处理之间。
通过他们可以获得重用代码的益处。

同步函数：
通过调用fn.call, fn.apply, 或者建立一个新的函数用 fn.lift, 他们都返回一promise，
或者抛出异常也将被转化成 rejections。 As a bonus, promises given as arguments will be transparently resolved before the call.

fn.call()  逗号分隔的参数
fn.apply() 数组参数
var promisedResult = fn.call(normalFunction, arg1, arg2/* ...more args */);

function divideNumbers(a, b) {
    if(b !== 0) {
        return a / b;
    } else {
        throw new Error("Can't divide by zero!");
    }
}
// Prints '2'
fn.call(divideNumbers, 10, 5).then(console.log);
// Prints '4'
var promiseForFive = when.resolve(5);
fn.call(divideNumbers, 20, promiseForFive).then(console.log);
// Prints "Can't divide by zero!"
fn.call(divideNumbers, 10, 0).then(console.log, console.error);
---------
function sumMultipleNumbers() {
    return Array.prototype.reduce.call(arguments, function(prev, n) {
        return prev + n;
    }, 0);
}

// Prints '50'
fn.apply(sumMultipleNumbers, [10, 20, 20]).then(console.log, console.error);

// Prints 'something wrong happened', and the sum function never executes
var shortCircuit = when.reject("something wrong happened");
fn.apply(sumMultipleNumbers, [10, 20, shortCircuit]).then(console.log, console.error);
------------------------------
当fn.call 或 fn.apple 多次调用，更有效的做法是用 fn.lift 把函数包装成 promise 版的。也可做偏函数使用，部分传入参数。

function setText(element, text) {
    element.text = text;
}
function getMessage() {
    // Async function that returns a promise
}
var element = {};
// Resolving the promies ourselves
getMessage().then(function(message) {
    setText(element, message);
});
// Using fn.call()
fn.call(setText, element, getMessage());
// Creating a new function using fn.lift()
var promiseSetText = fn.lift(setText);
promiseSetText(element, getMessage());
// Leveraging the partial application
var setElementMessage = fn.lift(setText, element);
setElementMessage(getMessage());
--------------------------------------------
fn.compose() 仍然是pipe， 只不过是转化同步函数的。

var composedFunc = fn.compose(func1, func2 /* ...more functions */);

组合后的新函数，组合多个函数功能并传接他们的返回值. 传递的参数总是履行的值. 如果某个函数异常或拒绝, composedFunc 也将拒绝.

// 每个1秒从服务器获取一条消息, 显示在元素上面。
var refreshMessage = fn.compose(getMessage, setElementMessage);
setInterval(refreshMessage, 1000);

// 等同于:
setInterval(function() {
    return fn.call(getMessage).then(setElementMessage);
}, 1000);
------------------------------------------------------------------

异步函数：
callbacks.call()
用于整合第三方库到标准的promise形式。
var promisedResult = callbacks.call(callbackTakingFunc, arg1, arg2/* ...more args */);

var domIsLoaded = callbacks.call($);
domIsLoaded.then(doMyDomStuff);

var waitFiveSeconds = callbacks.call(setTimeout, 5000);
waitFiveSeconds.then(function() {
    console.log("Five seconds have passed");
});
------------------
callbacks.apply()

var promisedResult = callbacks.apply(callbackTakingFunc, [arg1, arg2/* ...more args */]);
'should forward its second argument to the function': function(done) {
    var async = function(a, b, cb/*, eb*/) {
        cb(a + b);
    };

    var promise = callbacks.apply(async, [10, 15]);

    promise.then(function(result) {
        assert.equals(result, 25);
    }, fail).ensure(done);
},

var when = require('when');
var existsDefer = when.defer();  
fs.exists('/path/file.json', existsDefer.resolve);  
existsDefer.promise.then(function(exists) {  
    if (exists) { /* ... */ }
});

或者：
var callbacks = require('when/callbacks');
callbacks.call(fs.exists, '/path/file.json').then(function(exists) {  
    if (exists) { /* ... */ }
});

-------------------

callbacks.lift()
废弃的声明: callbacks.bind()

var promiseFunc = callbacks.lift(callbackTakingFunc, arg1, arg2/* ...more args */);

function traditionalAjax(method, url, callback, errback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = callback;
    xhr.onerror = errback;

    xhr.send();
}

var myLib = {
    // Traditional browser API: Takes callback and errback
    ajax: traditionalAjax,

    // Promise API: returns a promise, and may take promises as arguments
    promiseAjax: callbacks.lift(traditionalAjax)
};
------------------
callbacks.promisify()

var promiseFunc = callbacks.promisify(nonStandardFunc, {
    callback: zeroBasedIndex,
    errback:  otherZeroBasedIndex,
});
这个函数用来确定非promise函数的callback和errback在参数列表中的位置，通过指定。

------------------------------------------

Node-style 异步函数：
Node的api有自己的异步标准，他们把第一个参数作为发生错误的回调处理函数。但有些node函数被设计成返回一个事件发射器。这类函数将发射错误消息来代替传递错误到第一个参数回调。例如http.get。这类node函数不能用下面的函数处理注意。

nodefn.call()
var promisedResult = nodefn.call(nodeStyleFunction, arg1, arg2/*...more args*/);

nodefn.apply()
var promisedResult = nodefn.apply(nodeStyleFunction, [arg1, arg2/*...more args*/]);

var fs, nodefn;
fs     = require("fs");
nodefn = require("../when/node/function");//注意引用的目录

var loadPasswd = nodefn.apply(fs.readFile, ["./q_node_test.js", "utf8"]);

loadPasswd.then(function(passwd) {
    console.log("Contents :\n" + passwd);
}, function(error) {
    console.log("Something wrong happened: " + error);
});
---------
nodefn.lift()
废弃声明: nodefn.bind()
var promiseFunc = nodefn.lift(nodeStyleFunction, arg1, arg2/*...more args*/);

var dns, when, nodefn;
dns    = require("dns");
nodefn = require("../when/node/function");
var resolveAddress = nodefn.lift(dns.resolve);//域名解析

when.join(
    resolveAddress("baidu.com"),
    resolveAddress("sina.com"),
    resolveAddress("csdn.net")
).then(function(addresses) {
  // All addresses resolved
  console.log(addresses);
}, function(reason) {
  // At least one of the lookups failed
  console.log(reason);
});

[ [ '220.181.111.86', '123.125.114.144', '220.181.111.85' ],
  [ '12.130.132.30' ],
  [ '117.79.157.225' ] ]
注意baidu生成的是3个ip在数组里。
-------------------------
nodefn.createCallback()
var nodeStyleCallback = nodefn.createCallback(resolver);
改造函数的回调参数为node风格的参数。回调替换 nodefn.createCallback(deferred.resolver)

var when, nodefn;

when   = require("when");
nodefn = require("when/node/function");
function nodeStyleAsyncFunction(callback) {
    if(Math.random() * 2 > 1) {
      callback("Oh no!");
    } else {
      callback(null, "Interesting value");
    }
}
var deferred = when.defer();
nodeStyleAsyncFunction(nodefn.createCallback(deferred.resolver));

deferred.promise.then(function(interestingValue) {
  console.log(interestingValue)
},function(err) {
  console.error(err)
});
-------------
nodefn.liftCallback()
var promiseAcceptingFunction = nodefn.liftCallback(nodeback);
将node风格的回调函数转换成可以接受promise作参数的函数。
如果有一个node风格函数和一个返回promise的函数，可以改变形式让他们可以组合在一起。

lift总是返回他的输入promise，并且执行nodeback在以后的事件循环。
Thus, the outcome of nodeback has no bearing on the returned promise.
var nodefn, handlePromisedData, dataPromise;

把node风格的函数改造下，让他能够接受一个返回promise的函数做参数。
nodefn = require('when/node/function');
function fetchData(key) {
    // go get the data and,
    return promise;
}
function handleData(err, result) {
    if(err) {
        // handle the error
    } else {
        // Use the result
    }
}
// Lift handleData
handlePromisedData = nodefn.liftCallback(handleData);
dataPromise = fetchData(123);
handlePromisedData(dataPromise);
---
nodefn.bindCallback(dataPromise, handleData);
-----------------------------------------------
Helper：
when/apply
改造函数的参数形式为数组形式。
var arrayBased = apply(argBased);
var inputs = [1, 2, 3];
arrayBased(inputs); // 6

With promises:
var d = when.defer();
d.promise.then(arrayBased);

d.resolve([1, 2, 3]); // arrayBased called with args 1, 2, 3 -> 6

--------------------------
法则：要么返回promise要么调用done。
then是转换一个promise值并且传递或返回一个新promise。
done是销毁promise值，转成可以回应的值。
