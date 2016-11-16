## 模块 module

es6 编译时确定模块的依赖关系，以及输入输出的变量。
es6的模块不是对象，而是通过export命令显式指定输出的代码。

CommonJs 是运行时确定。运行时得到对象，然后取得对象内的属性。

### 严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀0表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）

### export
export输出的变量就是本来的名字，但是可以使用as关键字重命名。

    function v1() { ... }
    function v2() { ... }

    export {
      v1 as streamV1,
      v2 as streamV2,
      v2 as streamLatestVersion
    };

    // 写法一
    export var m = 1;

    // 写法二
    var m = 1;
    export {m};

    // 写法三
    var n = 1;
    export {n as m};

在接口名与模块内部变量之间，建立了一一对应的关系.

    // 正确
    export function f() {};
    // 正确
    function f() {}
    export {f};

export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

    export var foo = 'bar';
    setTimeout(() => foo = 'baz', 500);

### import
命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。

如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
import命令具有提升效果，会提升到整个模块的头部，首先执行.

    import { firstName, lastName, year } from './profile';
    import { lastName as surname } from './profile';

如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
    
    export {es6 as default} from './someModule';
    // same as
    import {es6} from './someModule';
    export default es6;

es7 提案简化先输入后输出的写法，拿掉输出时的大括号。

    // 提案的写法
    export v from 'mod';
    // 现行的写法
    export {v} from 'mod';

    // import语句会执行所加载的模块
    import 'lodash';
    // 上面代码仅仅执行lodash模块，但是不输入任何值。

    //整体加载
    import * as circle from './circle';

### export default

    function add(x, y) {
      return x * y;
    }
    export {add as default};
    // 就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。
    // 后面不能跟变量声明语句。

    import customName, { otherMethod } from './export-default';

### es6 模块加载的实质
CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。
CommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。

export 过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。

### 循环引用
CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

ES6模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

---------------------------------------------------
## 生成器
Generator函数是协程在ES6的实现，最大特点就是可以交出函数的执行权（即暂停执行）
。异步操作需要暂停的地方，都用yield语句注明。只有在调用next 方法时才会执行。

    function* f() {
      for(var i=0; true; i++) {
        var reset = yield i;
        if(reset) { i = -1; }
      }
    }
    var g = f();
    g.next() // { value: 0, done: false }
    g.next() // { value: 1, done: false }
    g.next(true) // { value: 0, done: false }

    function* foo(x) {
      var y = 2 * (yield (x + 1));
      var z = yield (y / 3);
      return (x + y + z);
    }
    var a = foo(5);
    a.next() // Object{value:6, done:false}
    a.next() // Object{value:NaN, done:false}
    a.next() // Object{value:NaN, done:true}

    var b = foo(5);
    b.next() // { value:6, done:false }
    b.next(12) // { value:8, done:false }
    b.next(13) // { value:42, done:true }

可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
yield 语句本身没有返回值，或者说总是返回undefined。
next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。

V8引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。
从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。

    function wrapper(generatorFunction) {
      return function (...args) {
        let generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
      };
    }
    const wrapped = wrapper(function* () {
      console.log(`First input: ${yield}`);
      return 'DONE';
    });
    wrapped().next('hello!')

for...of循环可以自动遍历Generator函数，且此时不再需要调用next方法。
自动取得 yield 执行的值。

    function* fibonacci() {
      let [prev, curr] = [0, 1];
      for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
      }
    }
    for (let n of fibonacci()) {
      if (n > 1000) break;
      console.log(n);
    }
    function* numbers () {
      yield 1
      yield 2
      return 3
      yield 4
    }
    [...numbers()] // [1, 2]
    Array.from(numbers()) // [1, 2]
    let [x, y] = numbers();

yield*语句，用来在一个Generator函数里面执行另一个Generator函数。等同于在Generator函数内部，部署一个for...of循环。
yield*命令可以很方便地取出嵌套数组的所有成员。

    function* iterTree(tree) {
      if (Array.isArray(tree)) {
        for(let i=0; i < tree.length; i++) {
          yield* iterTree(tree[i]);
        }
      } else {
        yield tree;
      }
    }
    const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
    for(let x of iterTree(tree)) {
      console.log(x);
    }
    改成构造函数，就可以对它执行new命令了。

    function* gen() {
      this.a = 1;
      yield this.b = 2;
      yield this.c = 3;
    }
    function F() {
      return gen.call(gen.prototype);
    }
    var f = new F();
    f.next();  // Object {value: 2, done: false}
    f.next();  // Object {value: 3, done: false}
    f.next();  // Object {value: undefined, done: true}
    f.a // 1
    f.b // 2
    f.c // 3

Generator与状态机

    var ticking = true;
    var clock = function() {
      if (ticking)
        console.log('Tick!');
      else
        console.log('Tock!');
      ticking = !ticking;
    }
    var clock = function*() {
      while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
      }
    };
多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。
这种可以并行执行、交换执行权的线程（或函数），就称为协程。
在内存中，子例程只使用一个栈（stack），而协程是同时存在多个栈，但只有一个栈是在运行状态，也就是说，协程是以多占用内存为代价，实现多任务的并行。

Generator函数被称为“半协程”（semi-coroutine），意思是只有Generator函数的调用者，才能将程序的执行权还给Generator函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。

Ajax是典型的异步操作，通过Generator函数部署Ajax操作，可以用同步的方式表达。

    function* main() {
      var result = yield request("http://some.url");
      var resp = JSON.parse(result);
        console.log(resp.value);
    }
    function request(url) {
      makeAjaxCall(url, function(response){
        it.next(response);
      });
    }
    var it = main();
    it.next();

    Q.fcall(step1)
      .then(step2)
      .then(step3)
      .then(step4)
      .then(function (value4) {
        // Do something with value4
      }, function (error) {
        // Handle any error from step1 through step4
      })
      .done();

      function* longRunningTask() {
      try {
        var value1 = yield step1();
        var value2 = yield step2(value1);
        var value3 = yield step3(value2);
        var value4 = yield step4(value3);
        // Do something with value4
      } catch (e) {
        // Handle any error from step1 through step4
      }
    }
    scheduler(longRunningTask());
    function scheduler(task) {
      setTimeout(function() {
        var taskObj = task.next(task.value);
        // 如果Generator函数未结束，就继续调用
        if (!taskObj.done) {
          task.value = taskObj.value
          scheduler(task);
        }
      }, 0);
    }

利用Generator函数，可以在任意对象上部署iterator接口。

    function* iterEntries(obj) {
      let keys = Object.keys(obj);
      for (let i=0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]];
      }
    }
    let myObj = { foo: 3, bar: 7 };
    for (let [key, value] of iterEntries(myObj)) {
      console.log(key, value);
    }

Generator可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为Generator函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。

### Promise
如果某些事件不断地反复发生，一般来说，使用stream模式是比部署Promise更好的选择。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。

Promise对象是一个构造函数，用来生成Promise实例。

    var promise = new Promise(function(resolve, reject) {
      // ... some code
      if (/* 异步操作成功 */){
        resolve(value);
      } else {
        reject(error);
      }
    });
    promise.then(function(value) {
      // success
    }, function(error) {
      // failure
    });

    function loadImageAsync(url) {
      return new Promise(function(resolve, reject) {
        var image = new Image();
        image.onload = function() {
          resolve(image);
        };
        image.onerror = function() {
          reject(new Error('Could not load image at ' + url));
        };
        image.src = url;
      });
    }

    var getJSON = function(url) {
      var promise = new Promise(function(resolve, reject){
        var client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
        function handler() {
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(this.statusText));
          }
        };
      });
      return promise;
    };
    getJSON("/posts.json").then(function(json) {
      console.log('Contents: ' + json);
    }, function(error) {
      console.error('出错了', error);
    });

var p = Promise.race([p1,p2,p3]);
只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。

    var p = Promise.race([
      fetch('/resource-that-may-take-a-while'),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000)
      })
    ])
    p.then(response => console.log(response))
    p.catch(error => console.log(error))


    done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。
    finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。

    Promise.prototype.finally = function (callback) {
      let P = this.constructor;
      return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
      );
    }


    使用Generator函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。

    function getFoo () {
      return new Promise(function (resolve, reject){
        resolve('foo');
      });
    }
    var g = function* () {
      try {
        var foo = yield getFoo();
        console.log(foo);
      } catch (e) {
        console.log(e);
      }
    };
    function run (generator) {
      var it = generator();
      function go(result) {
        if (result.done) return result.value;
        return result.value.then(function (value) {
          return go(it.next(value));
        }, function (error) {
          return go(it.throw(error));
        });
      }
      go(it.next());
    }
    run(g);

上面代码的Generator函数g之中，有一个异步操作getFoo，它返回的就是一个Promise对象。函数run用来处理这个Promise对象，并调用下一个next方法。

## trunk 求值策略
var x = 1;
function f(m){
  return m * 2;
}
f(x + 5)

上面代码先定义函数f，然后向它传入表达式x + 5。请问，这个表达式应该何时求值？

一种是【传值调用】（call by value），即在进入函数体之前，就计算x + 5的值（等于6），再将这个值传入函数f 。C语言就采用这种策略。

另一种是【传名调用】（call by name），即直接将表达式x + 5传入函数体，只在用到它的时候求值。Haskell语言采用这种策略。

f(x + 5)
// 传名调用时，等同于
(x + 5) * 2

编译器的【传名调用】实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做Thunk函数。

    function f(m){
      return m * 2;
    }
    f(x + 5);
    // 等同于
    var thunk = function () {
      return x + 5;
    };
    function f(thunk){
      return thunk() * 2;
    }

Js是传值调用。在Js中，Thunk函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。
本质还是为了在需要的时候执行求值。

    // 正常版本的readFile（多参数版本）
    fs.readFile(fileName, callback);
    
    // Thunk版本的readFile（单参数版本）
    var readFileThunk = Thunk(fileName);
    readFileThunk(callback);
    
    var Thunk = function (fileName){
      return function (callback){
        return fs.readFile(fileName, callback);
      };
    };

这个单参数版本，就叫做Thunk函数。
任何函数，只要参数有回调函数，就能写成Thunk函数的形式。

    // ES5版本
    var Thunk = function(fn){
      return function (){
        var args = Array.prototype.slice.call(arguments);
        return function (callback){
          args.push(callback);
          return fn.apply(this, args);
        }
      };
    };
    
    // ES6版本
    var Thunk = function(fn) {
      return function (...args) {
        return function (callback) {
          return fn.call(this, ...args, callback);
        }
      };
    };

生产环境的转换器，建议使用Thunkify模块。只允许回调函数执行一次

Thunk函数现在可以用于Generator函数的自动流程管理。

    var fs = require('fs');
    var thunkify = require('thunkify');
    var readFile = thunkify(fs.readFile);
    
    var gen = function* (){
      var r1 = yield readFile('/etc/fstab');
      console.log(r1.toString());
      var r2 = yield readFile('/etc/shells');
      console.log(r2.toString());
    };
yield命令用于将程序的执行权移出Generator函数，
那么就需要一种方法，将执行权再交还给Generator函数。
Generator函数的执行过程，其实是将同一个回调函数，反复传入next方法的value属性。这使得我们可以用递归来自动完成这个过程。

Thunk函数真正的威力，在于可以自动执行Generator函数。

co 模块可以让你不用编写Generator函数的执行器。co(gen);
co函数返回一个Promise对象，因此可以用then方法添加回调函数。
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});

当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。
（1）回调函数。将异步操作包装成Thunk函数，在回调函数里面交回执行权。
（2）Promise 对象。将异步操作包装成Promise对象，用then方法交回执行权。

co模块其实就是将两种自动执行器（Thunk函数和Promise对象），包装成一个模块。
使用co的条件是，Generator函数的yield命令后面，只能是Thunk函数或Promise对象。

    var fs = require('fs');    
    var readFile = function (fileName){
      return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
          if (error) reject(error);
          resolve(data);
        });
      });
    };
    
    var gen = function* (){
      var f1 = yield readFile('/etc/fstab');
      var f2 = yield readFile('/etc/shells');
      console.log(f1.toString());
      console.log(f2.toString());
    };
    
    然后，手动执行上面的Generator函数。    
    var g = gen();    
    g.next().value.then(function(data){
      g.next(data).value.then(function(data){
        g.next(data);
      });
    });

    co(function* () {
      var values = [n1, n2, n3];
      yield values.map(somethingAsync);
    });
    
    function* somethingAsync(x) {
      // do something async
      return y
    }

上面的代码允许并发三个somethingAsync异步操作，等到它们全部完成，才会进行下一步。

### Async 函数就是Generator函数的语法糖

    var gen = function* (){
      var f1 = yield readFile('/etc/fstab');
      var f2 = yield readFile('/etc/shells');
      console.log(f1.toString());
      console.log(f2.toString());
    };

    var asyncReadFile = async function (){
      var f1 = await readFile('/etc/fstab');
      var f2 = await readFile('/etc/shells');
      console.log(f1.toString());
      console.log(f2.toString());
    };

async 函数就是将Generator函数的星号（*）替换成 async，
将 yield 替换成 await，仅此而已。
函数完全可以看作多个异步操作，包装成的一个Promise对象，而await命令就是内部then命令的语法糖。

    async function getTitle(url) {
      let response = await fetch(url);
      let html = await response.text();
      return html.match(/<title>([\s\S]+)<\/title>/i)[1];
    }
    getTitle('https://tc39.github.io/ecma262/').then(console.log)

async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。

    async function fn(args){
      // ...
    }
    // 等同于
    function fn(args){
      return spawn(function*() {
        // ...
      });
    }

所有的async函数都可以写成上面的第二种形式，其中的 spawn 函数就是自动执行器。

同Generator函数一样，async函数返回一个Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

    function timeout(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
    
    async function asyncPrint(value, ms) {
      await timeout(ms);
      console.log(value)
    }
    
    asyncPrint('hello world', 50);

    // 函数声明
    async function foo() {}

    // 函数表达式
    const foo = async function () {};

    // 对象的方法
    let obj = { async foo() {} };

    // 箭头函数
    const foo = async () => {};

第一点，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。

    async function myFunction() {
      try {
        await somethingThatReturnsAPromise();
      } catch (err) {
        console.log(err);
      }
    }
    // 另一种写法
    async function myFunction() {
      await somethingThatReturnsAPromise().catch(function (err){
        console.log(err);
      };
    }