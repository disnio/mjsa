递归：
http://www.nowamagic.net/librarys/veda/detail/2314
对于递归，最好的理解方式便是从函数的功能意义的层面来理解。
了解一个问题如何被分解为它的子问题，这样对于递归函数代码也就理解了。
递归本质上也是函数的调用，调用的函数是自己或者不是自己其实没什么区别。
在函数调用时总会把一些临时信息保存到堆栈，堆栈只是为了函数能正确的返回，仅此而已。

在函数实现时，因为解决大问题的方法和解决小问题的方法往往是同一个方法，
所以就产生了函数调用它自身的情况。另外这个解决问题的函数必须有明显的结束条件，
这样就不会产生无限递归的情况了。

递归的思想就是：把问题分解成为规模更小的、具有与原问题有着相同解法的问题。

    可以通过递归调用来缩小问题规模，且新问题与原问题有着相同的形式。
    存在一种简单情境，可以使递归在简单情境下退出。

递归调用返回的结果总被直接返回，则称为尾部递归。尾部递归的函数有助将算法转化成函数编程语言，
而且从编译器角度来说，亦容易优化成为普通循环。
这是因为从电脑的基本面来说，所有的循环都是利用重复移跳到代码的开头来实现的。如果有尾部归递，
就只需要叠套一个堆栈，因为电脑只需要将函数的参数改变再重新调用一次。
利用尾部递归最主要的目的是要优化。
---------------------------------------------------
http://www.nowamagic.net/librarys/veda/detail/2331
Continuation则是另一种函数调用方式。它不采用堆栈来保存上下文，而是把这些信息保存在continuation record中。
这些continuation record和堆栈的activation record的区别在于，它不采用后入先出的线性方式，所有record被组成一棵树（或者图），
从一个函数调用另一个函数就等于给当前节点生成一个子节点，然后把系统寄存器移动到这个子节点。一个函数的退出等于从当前节点退回到父节点。

这些节点的删除是由garbage collection来管理。如果没有引用这个record，则它就是可以被删除的。

这样的调用方式和堆栈方式相比的好处在哪里呢？

最大的好处就是，它可以让你从任意一个节点跳到另一个节点。而不必遵循堆栈方式的一层一层的return方式。
比如说，在当前的函数内，你只要有一个其它函数的节点信息，完全可以选择return到那个函数，而不是循规蹈矩地返回到自己的调用者。
你也可以在一个函数的任何位置储存自己的上下文信息，然后，在以后某个适当的时刻，从其它的任何一个函数里面返回到自己现在的位置。

有一种设计的风格叫做continuation-passing-style。它的基本思想是：当需要返回某些数据的时候，不是直接把它当作函数的返回值，
而是接受一个叫做continuation的参数，这个参数就是一个call-back函数, 它接受这个数据，并做需要做的事情。

举个例子：
x = f();
print x;

把它变成continuation-passing-style, 则是：

f(print);

f()函数不再返回x, 而是接受一个函数，然后把本来要返回的x传递给这个函数。
---------------------------------------------------
_.reduce() 反复对同一对象进行操作。

多层函数返回的 return 是为了间隔传参数。
function createScaleFunction(FACTOR) {
    return function(v) {
        return _.map(v, function(n) {
            return (n * FACTOR);
        });
    };
}
var scale10 = createScaleFunction(10);
scale10([1,2,3]);
//=> [10, 20, 30]
// ---------闭包作用域
var pingpong = (function() {
    var PRIVATE = 0;
    return {
        inc: function(n) {
            return PRIVATE += n;
        },
        dec: function(n) {
            return PRIVATE -= n;
        }
    };
})();

pingpong.inc(10);

pingpong.dec(7);

pingpong.div = function(n) { return PRIVATE / n };
pingpong.div(3);
// ReferenceError: PRIVATE is not defined
//---------
function plucker(FIELD) {
    return function(obj) {
        // 
        return (obj && obj[FIELD]);
    };
}
var best = {title: "Infinite Jest", author: "DFW"};
var getTitle = plucker('title');
console.log( getTitle(best) );
var books = [{title: "Chthon"}, {stars: 5}, {title: "Botchan"}];
var third = plucker(2);
third(books);
//=> {title: "Botchan"}
var nums = [1,2,3,null,5];
function fnull(fun /*, defaults */) {
    var defaults = _.rest(arguments);
    return function(/* args */) {
        // 传进来的参数长度只有1
        var args = _.map(arguments, function(e, i) {
            return existy(e) ? e : defaults[i];
        });
        console.log( args );
        return fun.apply(null, args);
    };

};

var safeMult = fnull(function(total, n) { return total * n }, 1, 1);
console.log( _.reduce(nums, safeMult) );
// //{message: "Hi!",    type: "display"    from: "http://localhost:8080/node/frob" }
function checker(/* validators */) {
    var validators = _.toArray(arguments);
    return function(obj) {
        return _.reduce(validators, function(errs, check) {
            if (check(obj))
                return errs
            else
                return _.chain(errs).push(check.message).value();
        }, []);
    };
}

function validator(message, fun) {
    var f = function(/* args */) {
        return fun.apply(fun, arguments);
    };
    f['message'] = message;
    return f;
}

function hasKeys() {
    var KEYS = _.toArray(arguments);
    var fun = function(obj) {
        return _.every(KEYS, function(k) {
            return _.has(obj, k);
        });
    };
    fun.message = cat(["Must have values for keys:"], KEYS).join(" ");
    return fun;
}
--------------------------------------------------
function doWhen(cond, action) {
    if(truthy(cond))
        return action();
    else
        return undefined;
}

function stringReverse(s) {
    if (!_.isString(s)) return undefined;
    return s.split('').reverse().join("");
}

function invoker (NAME, METHOD) {
    return function(target /* args ... */) {
        if (!existy(target)) fail("Must provide a target");
        var targetMethod = target[NAME];
        var args = _.rest(arguments);
        return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
            return targetMethod.apply(target, args);
        });
    };
};

function dispatch(/* funs */) {
    var funs = _.toArray(arguments);
    var size = funs.length;
    return function(target /*, args */) {
        var ret = undefined;
        var args = _.rest(arguments);
        for (var funIndex = 0; funIndex < size; funIndex++) {
            var fun = funs[funIndex];
            ret = fun.apply(fun, construct(target, args));
            if (existy(ret)) return ret;
        }
        return ret;
    };
}

var rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);


function isa(type, action) {
    return function(obj) {
        if (type === obj.type)
            return action(obj);
    }
}
---------------------------------------------------
function toHex(n) {
    var hex = n.toString(16);
    return (hex.length < 2) ? [0, hex].join(''): hex;
}

function rgbToHexString(r, g, b) {
    return ["#", toHex(r), toHex(g), toHex(b)].join('');
}
// 偏函数
function partial(fun /*, pargs */) {
    var pargs = _.rest(arguments);
    return function(/* arguments */) {
        var args = cat(pargs, _.toArray(arguments));
        return fun.apply(fun, args);
    };
}

function condition1(/* validators */) {
    var validators = _.toArray(arguments);
    return function(fun, arg) {
        var errors = mapcat(function(isValid) {
            return isValid(arg) ? [] : [isValid.message];
        }, validators);
        if (!_.isEmpty(errors))
            throw new Error(errors.join(", "));
        return fun(arg);
    };
}

-------------------------------------------------
// 根据 BDD、TDD 测试原则，怎么调用函数，那么就怎样去设计。所以必须在适当时候引入测试开发。
var evenNums = andify(_.isNumber, isEven);
evenNums(1,2);
//=> false
evenNums(2,4,6,8);
//=> true
evenNums(2,4,6,8,9);
//=> false
function andify(/* preds */) {
    var preds = _.toArray(arguments);
    return function(/* args */) {
        var args = _.toArray(arguments);
        var everything = function(ps, truth) {
            if (_.isEmpty(ps))
                return truth;
            else
                return _.every(args, _.first(ps))
                    && everything(_.rest(ps), truth);
        };
        return everything(preds, true);
    };
}

function orify(/* preds */) {
    var preds = _.toArray(arguments);
    return function(/* args */) {
        var args = _.toArray(arguments);
        var something = function(ps, truth) {
            if (_.isEmpty(ps))
                return truth;
            else
                return _.some(args, _.first(ps))
                    || something(_.rest(ps), truth);
        };
        return something(preds, false);
    };
}

function tcLength(ary, n) {
    var l = n ? n : 0;
    if (_.isEmpty(ary))
        return l;
    else
        return tcLength(_.rest(ary), l + 1);
}

tcLength(_.range(10));

--------------------------------------------------
开始项目前通常要定义两种函数：判存在 existy ，判真假 truth 。
function existy(x) {
    // undefined == null is true; undefined === null is false
    return x!= null;
}

function truthy(x) {
    return (x !== false) && existy(x);
}

function fail(thing) {
    throw new Error(thing);
}

function warn(thing) {
    console.log(["WARNING:", thing].join(' '));
}

function note(thing) {
    console.log(["NOTE:", thing].join(' '));
}

function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
    if (!_.isNumber(index)) fail("Expected a number as the index");
    if (!isIndexed(a)) fail("Not supported on non-indexed type");
    if ((index < 0) || (index > a.length - 1))
        fail("Index value is out of bounds");
    return a[index];
}

function second(a) {
    return nth(a, 1);
}
when I use the word “function” I mean a function that exists on its own and when I use
“method” I mean a function created in the context of an object.

function splat(fun) {
    return function(array) {
        return fun.apply(null, array);
    };
}

function complement(pred) {
    return function() {
        // 取反
        return !pred.apply(null, _.toArray(arguments));
    };
}
// 模拟 _.reject()
_.filter(['a', 'b', 3, 'd'], complement(_.isNumber));

function mapcat(fun, coll) {
    return cat.apply(null, _.map(coll, fun));
}

function cat() {
    // 数组合并
    var head = _.first(arguments);
    if (existy(head))
        return head.concat.apply(head, _.rest(arguments));
    else
        return [];
}

function construct(head, tail) {
    return cat([head], _.toArray(tail));
}

var library = [{
    title: "SICP",
    isbn: "0262010771",
    ed: 1
}, {
    title: "SICP",
    isbn: "0262510871",
    ed: 2
}, {
    title: "Joy of Clojure",
    isbn: "1935182641",
    ed: 1
}];

function project(table, keys) {
    return _.map(table, function (obj) {
        // 传给_.pick 的参数组合
        return _.pick.apply(null, construct(obj, keys));
    });
};

function rename(obj, newNames) {
    return _.reduce(newNames, function (o, nu, old) {
            if (_.has(obj, old)) {
                o[nu] = obj[old];
                return o;
            } else
                return o;
        },
        _.omit.apply(null, construct(obj, _.keys(newNames))));
};

function as(table, newNames) {
    return _.map(table, function (obj) {
        return rename(obj, newNames);
    });
};

function restrict(table, pred) {
    return _.reduce(table, function (newTable, obj) {
        if (truthy(pred(obj)))
            return newTable;
        else
            return _.without(newTable, obj);
    }, table);
};
//SELECT title, isbn, edition FROM ( SELECT ed AS edition FROM library ) EDS WHERE edition > 1;
restrict(
    project(
        as(library, {ed: 'edition'}),
        ['title', 'isbn', 'edition']),
    function (book) {
        return book.edition > 1;
    });
----------------------------------------------------


--------------------------------------------------------------------------------------
避免空比较：
typeof name === "string"/"number"/"boolean"/"undefined"
如果期望的值是null 则可以和null 比较。使用 ===/!==

var elem = document.getElementById("id");
if(elem !== null){
    element.className = "found";
}

typeof null === "object" // true

引用值是对象 object。
内置引用类型：Object, Array, Data, Error, 使用 instanceof 进行检测。

var now = new Data();
console.log( now instanceOf Date);

检测函数要用 typeof 可以跨 frame 使用。

ie8 bug：检测dom函数都返回object 而不是 function

可以用 in 判断存在即检测属性：
if("querySelectorAll" in document){
    images = document.querySelector("img");
}

数组检测：标准方法 ES5 isArray ie9+

function isArray(value){
    if(typeof Array.isArray === "function"){
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

ie8 bug：dom 没从 Object 继承，所以没有 hasOwnProperty() 方法。
if( "hasOwnProperty" in object && object.hasOwnProperty(propname) )
---------------------------
把配置数据从代码分类出来 Props2Js

抛出自定义错误：
throw new Error("Something bad happened.");

不要 throw "ms"
如果 try 包含了 return 语句，必须等 finally 完成后才返回。
try {
    // 应用逻辑知道调用特定函数的原因，也最适合处理
    someMightCauseAnError();
} cache (ex){
    handleError();
} finally {
    continueDoingOther();
}

错误只应该在应用程序栈最深处抛出。

错误类型：
Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError

function myError(msg){
    this.msg = msg;
}
myError.prototype = new Error();

try{}
cache(ex){
    if(ex instanceof myError){

    }else{}
}

不是自己的对象不要动，不覆盖，不新增，可创建插件，不删除方法。继承来做事情。Object.create(obj,{})

Polyfill 功能模拟

ES5 引入了防止修改对象的方法：
防止扩展：禁止未对象添加属性和方法，已存在的可以修改和删除。
密封：    禁止删除，可修改。 Object.seal() Object.isSealed()
冻结：    不可删除和修改。Object.freeze()  Object.isFrozen()

var person = {
    name: "Nicholas"
};
Object.preventExtension(person);
console.log(Object.isExtensible(person)); //false
person.age = 25; // 失败默默; strict 模式下抛出错误
-----------------------------------
可特性检测
然后用户代理检测最好只检测以前的版本。 userAgent
不要避免浏览器推断
---------------------------------
自动构建一定要。 《编写可维护的 js》

目录分组，第三方代码独立，确定创建（编译后）的位置，保持测试代码的完整性。

Ant build.xml  Builer 工具集
任务：构建中的一个步骤。
目标：一组有序任务集合。
项目：所有目标的容器。
---------------------------------
