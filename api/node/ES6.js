ES6
// 推荐在循环对象属性的时候，使用for...in,在遍历数组的时候的时候使用for...of。

// for...in循环出的是key，for...of循环出的是value

// 注意，for...of是ES6新引入的特性。修复了ES5引入的for...in的不足

// for...of不能循环普通的对象，需要通过和Object.keys()搭配使用

=> 箭头函数内部没有 this
-------------------------------------------------------------------------------
只有火狐支持的：
JavaScript 1.6 特性：
Array generics：
var words = "These are just words";
    Array.filter(words, function (value) {
    return value.indexOf("s") === -1;
});

String generics：
var arr = ["Firefox", "Safari", "Opera"];
String.replace(arr, /[aoueiy]/, "");

String generics, global flag：
var arr = ["Firefox", "Safari", "Opera"];
String.replace(arr, /[aoueiy]/g, "");

大部分 1.7 的特性只有火狐支持。iojs也是部分支持。实现上有区别
----------------------
测试 getters 和 setters, 及 Object.defineProperty：
http://www.robertnyman.com/javascript/javascript-getters-setters.html#regular-getters-and-setters-object-literal-notation
Object literal notation 对象字面量： ie9+
var lost = {
    loc: "Island",
    get location() {
        return this.loc;
    },
    set location(val) {
        this.loc = val;
    }
};
lost.location = "Another island";
console.log(lost, lost.location);

----
Object.defineProperty 对象定义属性： ie9+
var lost = {
    loc: "Island"
};

Object.defineProperty(lost, "location", {
    get: function() {
        return this.loc;
    },
    set: function(val) {
        this.loc = val;
    }
});

lost.location = 'america';
console.log(lost, lost.location);
---------------------------------------------------------

在 JavaScript 1.8 引入 Array extras: reduce
var a = [10, 20, 30];
var total = a.reduce(function(first, second) { return first + second; }, 0);
alert(total) // Alerts 60
-------
多维数组：
var a = new Array(4);
for (i = 0; i < 4; i++) {
  a[i] = new Array(4);
  for (j = 0; j < 4; j++) {
    a[i][j] = "[" + i + "," + j + "]";
  }
}

This example creates an array with the following rows:

Row 0: [0,0] [0,1] [0,2] [0,3]
Row 1: [1,0] [1,1] [1,2] [1,3]
Row 2: [2,0] [2,1] [2,2] [2,3]
Row 3: [3,0] [3,1] [3,2] [3,3]
-------
Array comprehensions：
var numbers = [1, 2, 3, 4];
var doubled = [i * 2 for (i of numbers)];
alert(doubled); // Alerts 2,4,6,8
eq:
var doubled = numbers.map(function(i){return i * 2;});

var numbers = [1, 2, 3, 21, 22, 30];
var evens = [i for (i of numbers) if (i % 2 === 0)];
alert(evens); // Alerts 2,22,30
eq:
var evens = numbers.filter(function(i){return i % 2 === 0;});
---
var numbers = [1, 2, 3, 21, 22, 30];
var doubledEvens = [i * 2 for (i of numbers) if (i % 2 === 0)];
alert(doubledEvens); // Alerts 4,44,60
-------
var today = new Date();
var endYear = new Date(1995, 11, 31, 23, 59, 59, 999);

-------
<script type="application/javascript;version=1.7"></script>
void： 操作符丢弃一个表达式的返回值.

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/New_in_JavaScript/1.7
let： 操作符创建一个临时变量, 有效作用域仅为当前表达式.
    Variables declared by let have as their scope the block in which they are defined。

function letTests() {
  let x = 10;
  // let-statement
  let (x = x + 20) {
    alert(x);  // 30
  }
  // let-expression
  alert(let (x = x + 20) x);  // 30
  // let-definition
  {
    let x = x + 20;  // x here evaluates to undefined
    alert(x);  // undefined + 20 ==> NaN
  }
}

function add3(obj) {
   for ( let i in obj )
     yield (parseInt(i, 10) + 2);
 }

 let it = add3([2, 3, 4]);
 try {
   while (true) {
     console.log( it.next() + "\n");
   }
 } catch (err if err instanceof StopIteration) {
   console.log("End of record.\n");
 }

Arrow Function：
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

Destructuring assignment ： 分割代入
function fib() {
  var i = 0, j = 1;
  while (true) {
    yield i;
    [i, j] = [j, i + j];
  }
}

var g = fib();
for (var i = 0; i < 10; i++)
  console.log(g.next());

多值返回：
function f() {
  return [1, 2];
}
var a, b;
[a, b] = f();

对象循值：
let obj = { width: 3, length: 1.5, color: "orange" };

for (let [name, value] in Iterator(obj)) {
  console.log("Name: " + name + ", Value: " + value);
}

pulling out fields of interest from each object：
var people = [
  {name: "Mike Smith", family: {mother: "Jane Smith", father: "Harry Smith", sister: "Samantha Smith"}, age: 35 },
  {name: "Tom Jones", family: {mother: "Norah Jones", father: "Richard Jones", brother: "Howard Jones"}, age: 25 } ];

for each (let {name: n, family: { father: f } } in people) {
  console.log("Name: " + n + ", Father: " + f);
}

Pulling fields from objects passed as function parameter：
function userId({id}) {
  return id;
}

function whois({displayName: displayName, fullName: {firstName: name}})
  console.log(displayName + " is " + name);
}

var user = {id: 42, displayName: "jdoe", fullName: {firstName: "John", lastName: "Doe"}};

console.log("userId: " + userId(user));
whois(user);
-------------------------------------------------------------------------------
http://www.infoq.com/cn/articles/generator-and-asynchronous-programming/
     //http://www.zcfy.cc/article/async-functions-making-promises-friendly-1566.html
     小心！避免过度强制先后顺序

尽管你写的代码看起来是同步的，要确保不要错过并行处理的机会。

async function series() {
  await wait(500);
  await wait(500);
  return "done!";
}

执行以上代码要 1000 毫秒，而：

async function parallel() {
  const wait1 = wait(500);
  const wait2 = wait(500);
  await wait1;
  await wait2;
  return "done!";
}

function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}

async function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // log them in sequence
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
http://exploringjs.com/es6/ch_promises.html
// Promise 是一个异步传值的容器
function asyncFunc() {
    const blank = [];
    setTimeout(() => blank.push('DONE'), 100);
    return blank;
}
const blank = asyncFunc();
// Wait until the value has been filled in
setTimeout(() => {
    const x = blank[0]; // (A)
    console.log('Result: ' + x);
}, 200);

以上代码 500 毫秒完成，因为两个 wait 是同时发生的。让我们看看一个实际的例子。
异步流程控制问题：

    自定义事件式方案
    Promise/Deferred
    高阶函数篡改回调函数

高阶函数在异步编程中的使用：

高阶函数在异步编程中的使用，最广泛、最知名的莫过于async和step这两个库，它将用户正常传递进来的回调函数替换成自己包装了特殊逻辑的函数，然后再传递给异步调用。当异步调用结束后，先执行的是特殊逻辑，然后才是用户传入的回调函数。
// 闭包
var pending = (function () {
  var count = 0;
  // done 函数， 传入回调
  return function (callback) {
    count++;
    // done 函数执行后的返回函数，即 fs.readFile('file1.txt', 'utf8', returnFunc); returnFunc = done()
    return function () {
      count--;
      if (count === 0) {
        callback();
      }
    };
  };
}());

var done = pending(function () {
  console.log('all is over');
});

// 执行完后，调用 returnFunc
fs.readFile('file1.txt', 'utf8', done());
fs.readFile('file2.txt', 'utf8', done());

上述代码中，done执行了两次，每次执行的过程中，将计数器count加一，然后返回一个函数。当fs.readFile这个异步调用结束后，done执行后的回调函数会得到执行，计数器减一。当计数器回到0的时候，意味着多个异步调用的回调函数都已经执行，此时执行传入的回调函数。因为非阻塞的原因，done()生成的函数不会立即执行，使得计数器可以正常地增加值，结束后才慢慢减少值。
-----------------------
Generator：
https://ponyfoo.com/articles/es6-generators-in-depth
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/The_Iterator_protocol
constructor GeneratorFunction {}
@@iterator @@iterator()
next next()
    arguments  null
    caller null
    length 1
    name "next"
    apply apply()
    bind bind()
    call call()
    constructor Function()
    isGenerator isGenerator()
    toSource toSource()
    toString toString()
throw throw()

var g = generator()
// a generator object g is built using the generator function
typeof g[Symbol.iterator] === 'function'
// it's an iterable because it has an @@iterator
typeof g.next === 'function'
// it's also an iterator because it has a .next method
g[Symbol.iterator]() === g
// the iterator for a generator object is the generator object itself
console.log([...g])
// <- ['f', 'o', 'o']
console.log(Array.from(g))
// <- ['f', 'o', 'o']
--------------------
只有火狐：
function double5() {
    var i = 0,
        j = 5,
        k;
    while (true) {
        yield i;
        k = i;
        i = j;
        j += i;
    }
}

var g = double5(),
    resultValues = [];
for (var i = 0; i < 5; i++) {
    resultValues.push(g.next());
}
console.log(resultValues); //  [0, 5, 10, 20, 40]
-------------------------------------------------------------------------------
var gen = generator();

function driveGenerator() {
  if (gen.next()) {
    window.setTimeout(driveGenerator, 0);
  } else {
    gen.close();
  }
}

function generator() {
  while (i < something) {
    /** stuff **/

    ++i;
    /** 100 loops per yield **/
    if ((i % 100) == 0) {
      yield true;
    }
  }
  yield false;
}
------------------
function* Hello() {
  // 我习惯用大驼峰命名因为这就好比generator的构造函数
  yield 1
  yield 2
}

var hello = Hello() // hello 是一个generator
var a = hello.next() // a: Object {value: 1, done: false}
var b = hello.next() // b: Object {value: 2, done: false}
var c = hello.next() // c: Object {value: undefined, done: true}

yield就是相当于是另一种return, return使用时函数就结束了, 而使用yield的时候,
函数会卡在那个yield的地方, 等待下一个next

所有带有 * 前缀的函数都表示这个函数会返回一个 generator 对象。
GeneratorFunction 里面可以使用 yield关键字，可以理解为在当前位置设置断点。

根本上来说，generator 会同步地 yield 出数据
（译注：如果对Python比较熟悉的话，应该对ES6的generator不陌生，这里的yield其实和Python的yield语句差不多一个意思）

var gen = (function* (num) {
  console.log(num) //  print 11
  var a = yield 1
  console.log(a) //  print 22
  var b = yield 1
  console.log(b) // print 33
})(11)

gen.next()
gen.next(22)
gen.next(33, 44)

每次.next()调用时，返回一个对象，这个对象具备两个属性，
布尔型的done，它表示这个Generator对象的逻辑块是否执行完成。
value， yield 语句后的表达式的结果。
yield的返回值和 yield 后面的东西毫无关系(但不能没有, 不然是undefined), 【返回值就是next函数中第一个参数】。

真正让 Generator 具有价值的是 yield 关键字，这个 yield 关键字让 Generator 内部的逻辑能够切割成多个部分。
可以简单地理解为yield关键字将程序逻辑划分成几部分，每次.next()执行时执行一部分。
这使得程序的执行单元再也不是函数，复杂的逻辑可以通过yield来暂停。
这类似于将一个函数的逻辑分拆为四个函数，但它们共享上下文。

对于Generator而言，它不仅可以将逻辑的单元切分得更细外，
还能在暂停和继续执行的间隔中，动态传入数据，使得代码逻辑可以更灵活。
----------
通过Generator进行流程控制的几个要点。
首先，每个异步方法都需要标准化为yield关键字能接受的方法，使我们有机会注入特殊逻辑，这个过程被TJ称为thunkify。
其次，需要巧妙地将异步调用执行完成得到的结果通过.next()传递给下一段流程。
最后，需要递归地将业务逻辑执行完成。

需要注意的是yield只能暂停Generator内部的逻辑，它并不是真正暂停整个线程，Generator外的业务逻辑依然会继续执行下去。
----------
是否是generatorFunction的判断方法

function isGeneratorFunction(obj) {
  return obj && obj.constructor && 'GeneratorFunction' === obj.constructor.name
}
function isGenerator(obj) {
  return obj && 'function' == typeof obj.next && 'function' == typeof obj.throw;
}
yield后面可以跟 *anothergenerator，这样当前的断点就会进入到anothergenerator的generatorfunction里面，
等子generator全部执行完后再回来继续执行。这个其实有点类似递归的意思。
function* run() {
    console.log("step in child generator");
    return "child over";
    var b =
        yield 'running';
    console.log(b);
    console.log("step out child generator")

}
var runGenerator = run();

function* start() {
    var a =
        yield 'start';
    console.log(a);
    var childValue =
        yield * runGenerator;
    console.log("childValue==" + childValue);
    var c =
        yield 'end';
    console.log(c);
    return 'over';
}
var it = start();
console.log(it.next());
//Object {value: "start", done: false}
console.log(it.next(22));
//22
//step in child generator
//childValue==child over
//Object {value: "end", done: false}
console.log(it.next(333));
//333 Object {value: "over", done: true}

另外子 generatorfunction 的 return 值会做为 yield * generator的返回值。
------
var fs = require('fs');
//这个函数的参数是一个异步调用函数，调用之后，得到一个新的函数，这个函数在重新整理了参数列表后，添加了一个实际被调用到的回调函数。这个新的函数执行后，会调用真正的异步函数，然后再次返回一个函数，最后返回的函数的作用是为了随时注入新的逻辑（pass）。在参数列表后添加的回调函数中，它会将结果传递给最终给到的函数。
var helper = function(fn) {
    return function() {
        var args = [].slice.call(arguments);
        var pass;
        args.push(function() { // 在回调函数中植入收集逻辑
            if (pass) {
                pass.apply(null, arguments);
            }
        });
        fn.apply(null, args);

        return function(fn) { // 传入一个收集函数
            pass = fn;
        };
    };
};
var readFile = helper(fs.readFile);
var flow = function*() {
    var txt =
        yield readFile('file2.txt', 'utf8');
    console.log(txt);
};

var generator = flow();
var ret = generator.next(); // 执行readFile('file1.txt', 'utf8');
// 通过这样置入特殊逻辑后，使得flow中的代码能够按期望顺利执行，通过yield巧妙地将回调函数得到的值转换为类似返回值。
ret.value(function(err, data) {
    if (err) {
        throw err;
    }
    generator.next(data);
});
--------------------
模拟 co ：
function thunkify( fn ){
    return function() {
        // before logic， 在执行 fn 前先做一些事情，如参数整理等
        var args = new Array(arguments.length);
        // node 大环境
        var ctx = this;
        for (var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        // 正常本来这里应该 fn ( args ) 了
        // 结果又 return 了，包包再扔出去，generatour.next()
        // 其实还是要 before 先做些事情，但不在这里做了
        // 把 befone 的部分逻辑放到 done 回调函数里了，
        // 要让别的环境（函数）驱动下
        return function (done){
            var called;
            args.push( function () {
                if (called) return;
                // done 必然要把原来的参数带着
                done.applay(null, arguments);
                called = true;
            });
            // done 要接收别的函数的执行结果，那么 done 就是得作为
            // 其他函数的回调，在调用函数执行完后，再执行对结果的处理。
            try {
                fn.applay( ctx, args );
            } catch (err){
                // 也包括错误处理
                done(err);
            }

        }

    }
}
function thunkify(fn) {
    assert('function' == typeof fn, 'function required');
    // readFile() 包装后的函数
    return function() {
        var args = new Array(arguments.length);
        var ctx = this;

        for (var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        // 收集参数后， 返回的函数为 yield 后面语句执行后的 value 或 value array 的 item 项。
        // done 为 item 项的回调函数
        return function(done) {
            var called;
            console.log("thunkify done: ", done)
            // 在回调函数中植入收集逻辑，先执行植入的逻辑函数
            args.push(function() {
                if (called) return;
                called = true;
                // console.dir("thunkify argumentss:", arguments);
                done.apply(null, arguments);
            });

            try {
                // console.log("thunkify args:", args);
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
};

var fs = require('fs');
// 模拟 thrunkify
var helper = function(fn) {
    // 下面的 item 函数
    return function() {
        var args = [].slice.call(arguments);
        var pass;
        args.push(function() { // 在回调函数中植入收集逻辑
            if (pass) {
                pass.apply(null, arguments);
            }
        });
        fn.apply(null, args);

        return function(fn) { // 传入一个收集函数
            pass = fn;
        };
    };
};

var readFile = helper(fs.readFile);

var co = function(flow) {
    var generator = flow();
    var next = function(data) {
        var ret = generator.next(data);
        // yield [readFile('file1.txt', 'utf8'), readFile('file2.txt', 'utf8')] 返回值是 value
        // co out ret: { value: [ [Function], [Function] ], done: false }
        if (!ret.done) {
            if (Array.isArray(ret.value)) {
                var count = 0;
                var results = [];
                ret.value.forEach(function(item, index) {
                    count++;
                    // 下面是 node 的典型回调函数 callback,
                    // item 的回调 似 readFile 中的 callback， 比如 readFile('file1.txt', 'utf8', callback)
                    // item 的回调函数为 thunkify 中的返回函数，执行 item
                    item(function(err, data) {
                        count--;
                        if (err) {
                            throw err;
                        }
                        results[index] = data;
                        if (count === 0) {
                            next(results);
                        }
                    });
                });
            } else {
                ret.value(function(err, data) {
                    if (err) {
                        throw err;
                    }
                    next(data);
                });
            }
        }
    };
    next();
};

co(function*() {
    var results =
        yield [readFile('file1.txt', 'utf8'), readFile('file2.txt', 'utf8')];
    console.log(results[0]);
    console.log(results[1]);
    var file3 =
        yield readFile('file3.txt', 'utf8');
    console.log(file3);
});

var _sleep = function(ms, fn) {
    setTimeout(fn, ms);
};
var sleep = helper(_sleep);

co(function*() {
    console.time('sleep1');
    yield sleep(1000);
    yield sleep(1000);
    console.timeEnd('sleep1');
    console.time('sleep2');
    yield [sleep(1000), sleep(1000)];
    console.timeEnd('sleep2');
});

--------------------------
http://segmentfault.com/blog/kk_470661/1190000000593885
另一个ES6中的新特性是WeakMap。
简单的说，一个 WeakMap实例能够使用对象引用作为键，然后和一个数据相联系，而不需要真正把数据存储在对象上。

被标记的模板语法：
如果你尝试调用一个普通方法去调用模板语法函数你只能从第一个参数得到一个字符串。如果你用特殊的被标记模板语法调用方式，那么你就会得到一个模板语法的组合体。你将会获得所有字符串碎片，并且得到所有每个插入式表达式的结果。
function greeting(strings, value1) {
  console.log('Strings:', strings);
  console.log('Value1:', value1);
}

var place = 'World';

// If we try to call our function in the normal way, we're really just passing a string as the first argument
greeting(`Hello ${place}`);
// Log output:
// Strings: 'Hello World'
// Value1: undefined

// invoking our function as a Tagged Template Literal - note the lack of parenthesis
greeting`Hello ${place}`
// Log output:
// Strings: ['Hello ', '']
// Value1: 'World'


react项目在 IE9 10 中上来就报错了。
经过一系列排查是因为底层 base 这个模块有问题。
就算es5在各个浏览器里实现的也不近相同， 所以es2015是标准模块，在IE这个坑爹的浏览器里一些方法不同，导致报错。
所以 引入babel-preset-es2015-loose 来解决次问题。