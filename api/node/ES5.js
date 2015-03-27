ES5:
-------------------------------------------------------------------------
var arr = new Array(arrayLength);
var arr = Array(arrayLength);
// This has exactly the same effect
var arr = [];
arr.length = arrayLength;

注意: 如果你在上面的代码中为数组操作符传递了一个非整型的值，则将为代表数组的对象创建一个属性，而不是一个数组元素：
不建议对数组使用 for...in 循环进行遍历，它导致普通的元素和所有可枚举的属性都会出现在清单中
var arr = [];
arr[3.4] = "Oranges";
console.log(arr.length);                // 0
console.log(arr.hasOwnProperty[3.4]);   // true


JavaScript 1.6 中引入的 forEach() 方法
splice(index, count_to_remove, addelement1, addelement2, ...) 
sort() 也可以接收一个函数用于判定元素的比较结果。该函数对两个值进行比较并且返回以下三个值之一：

    如果在排序方式中 a 小于 b，则返回 -1 (或任何负数)
    如果在排序方式中 a 大于 b，则返回 1  (或任意正数)
    如果 a 和 b 被认为相等，则返回 0。
------------
正则表达式：
正则表达式字面量： var re = /ab+c/;
调用RegExp对象的构造函数： var re = new RegExp("ab+c");
使用构造函数，提供了对正则表达式运行时的编译。
当你知道正则表达式的模式会发生改变，或者你事先并不了解它的模式或者是从其他地方（比如用户的输入），
得到的代码这时比较适合用构造函数的方式。

(x)  
匹配‘x’并且记住匹配项。这个被叫做【捕获括号】。

(?:x)   
匹配'x'但是不记住匹配项。这种被叫做【非捕获括号】。

x(?=y)  
匹配'x'仅仅当'x'后面跟着'y'.这种叫做【正向肯定查找】。

x(?!y)  
匹配'x'仅仅当'x'后面不跟着'y',这个叫做【正向否定查找】。

\n 
当 n 是一个正整数，一个返回引用到最后一个与有n插入的正值表达式(counting left parentheses)匹配的副字符串。

比如 /apple(,)\sorange\1/ 匹配"apple, orange, cherry, peach."中的'apple, orange,' 。
\0  匹配 NULL (U+0000) 字符， 不要在这后面跟其它小数，因为 \0<digits> 是一个八进制转义序列。
---
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
console.log(newstr);
---
var re = /\w+\s/g;
var str = "fee fi fo fum";
var myArray = str.match(re);
console.log(myArray);

This displays ["fee ", "fi ", "fo "]. 
---
var pattern = /\s*;\s*/;
var nameList = names.split(pattern);
---
数组泛化(Array generics, introduced in JavaScript 1.6), 
提供了一种针对类数组对象运行 Array (实例)方法的途径. 每一个标准 Array (实例)方法在 Array 对象本身上有一个对应的泛化方法; 比如:

function alertArguments() {
   Array.forEach(arguments, function(item) {
     alert(item);
   });
 }

在旧版本的 JavaScript 中, 可以使用函数对象的 call 方法模拟这些泛化方法:

Array.prototype.forEach.call(arguments, function(item) {
   alert(item);
 });

数组泛化方法同样可以被使用在字符串上, 因为它们提供了顺序访问它们的字符的方式，而这和数组很类似:

Array.forEach("a string", function(chr) {
   alert(chr);
});

------------
Function Object:
var functionObjectName = new Function ([arg1, arg2, ... argn], functionBody);
------------

    // JavaScript 采用“IEEE 754 标准定义的双精度64位格式”
    // （"double-precision 64-bit format IEEE 754 values"）表示数字。
    // JavaScript 不区分整数值和浮点数值， 所有数字在 JavaScript 中均用浮点数值表示， 所以在进行数字运算的时候要特别注意。
0.1 + 0.2 = 0.30000000000000004
// 如果给定的字符串不存在数值形式，函数会返回一个特殊的值 NaN
parseInt("hello", 10)

NaN + 5 === NaN // true
// Infinity（正无穷）和 -Infinity（负无穷）
Boolean("")  // false
Boolean(234) // true

a.splice(start, delcount[, item1[, ...[, itemN]]])  
// 从 start 开始，删除 delcount 个元素，然后插入所有的 item。
// 
arguments.callee // 通常指向当前的（调用）函数，因此它可以用来进行递归调用

// 一个闭包就是一个函数和被创建的函数中的作用域对象的组合。
// 闭包允许你保存状态——所以它们通常可以代替对象来使用

// 在 IE 中，每当在一个 JavaScript 对象和一个本地对象之间形成循环引用时，就会发生内存泄露。如下所示：

function leakMemory() {
    var el = document.getElementById('el');
    var o = { 'el': el };
    el.o = o;
}

闭包：很容易发生无意识的内存泄露。如下所示：

function addHandler() {
    var el = document.getElementById('el');
    el.onclick = function() {
        this.style.backgroundColor = 'red';
    }
}
// 这段代码创建了一个元素，当它被点击的时候变红，但同时它也会发生内存泄露。为什么？因为对 el 的引用不小心被放在一个匿名内部函数中。这就在 JavaScript 对象（这个内部函数）和本地对象之间（el）创建了一个循环引用。

// 这个问题有很多种解决方法，最简单的一种是不要使用 el 变量：

function addHandler(){
    document.getElementById('el').onclick = function(){
        this.style.backgroundColor = 'red';
    };
}
// 有趣的是，有一种破坏因为闭包引入循环引用的窍门是添加另外一个闭包：

function addHandler() {
    var clickHandler = function() {
        this.style.backgroundColor = 'red';
    };
    (function() {
        var el = document.getElementById('el');
        el.onclick = clickHandler;
    })();
}
---
$(function() {
    var list = document.getElementById("list");

    for (var i = 1; i <= 5; i++) {
        var item = document.createElement("LI");
        item.appendChild( document.createTextNode("Item " + i) );

        // let j = i;
        // item.onclick = function(ev) {
        //     alert("Item " + j + " is clicked.");
        // };
        var clpp = (function(i){
            return function(){
                console.log("Item ", + i + " is clicked.");                
            }
        })(i);

        item.onclick = clpp;
        list.appendChild(item);
    }
})
// 内部函数被直接执行，并在 clickHandler 创建的闭包中隐藏了它的内容
// 继承方法
var o = {
  a: 2,
  m: function(b){
    return this.a + 1;
  }
};

console.log(o.m()); // 3
// 当调用 o.m 时,'this'指向了o.

var p = Object.create(o);
// p是一个对象, p.[[Prototype]]是o.

p.a = 12; // 创建p的自身属性a.

console.log(p.m()); // 13
// 调用p.m时, 'this'指向 p. 'this.a'则是12.
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain
var a = {a: 1}; 
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined, 因为d没有继承Object.prototype

hasOwnProperty 是 JavaScript 中唯一一个只涉及对象自身属性而不会遍历原型链的方法。
// ------------------------------------------------------------
// 在Person.prototype中加入方法
Person.prototype.walk = function() {
    console.log("I am walking!");
};
Person.prototype.sayHello = function() {
    console.log("Hello, I'm " + this.firstName);
};

// 定义Student构造器
function Student(firstName, subject) {
    // 调用父类构造器, 确保(使用Function#call)"this" 在调用过程中设置正确
    Person.call(this, firstName);

    // 初始化Student类特有属性
    this.subject = subject;
};

// [建立一个由Person.prototype继承而来的Student.prototype对象.]
// 注意: 常见的错误是使用 "new Person()"来建立Student.prototype.
// 这样做的错误之处有很多, 最重要的一点是我们在实例化时
// 不能赋予Person类任何的FirstName参数
// 调用Person的正确位置如下，我们从Student中来调用它
// ----------------------
Student.prototype = Object.create(Person.prototype);
// See note below

// 设置"constructor" 属性指向Student
Student.prototype.constructor = Student;
// ---------------------
// 更换"sayHello" 方法
Student.prototype.sayHello = function() {
    alert("Hello, I'm " + this.firstName + ". I'm studying " + this.subject + ".");
};

// 加入"sayGoodBye" 方法
Student.prototype.sayGoodBye = function() {
    alert("Goodbye!");
};

// 测试实例:
var student1 = new Student("Janet", "Applied Physics");
student1.sayHello(); // "Hello, I'm Janet. I'm studying Applied Physics."
student1.walk(); // "I am walking!"
student1.sayGoodBye(); // "Goodbye!"

// Check that instanceof works correctly
alert(student1 instanceof Person); // true 
alert(student1 instanceof Student); // true
// -----------------------------------------------------
// 对于“Student.prototype = Object.create(Person.prototype);”这一行，在不支持 Object.create方法的老JavaScript引擎中

function createObject(proto) {
    function ctor() {}
    ctor.prototype = proto;
    return new ctor();
}

// Usage:
Student.prototype = createObject(Person.prototype);
// -----------------------------------------------------
函数扩展bind使用如下：
// http://www.cnblogs.com/fsjohnhuang/p/3712965.html
function() {}.bind(thisArg[, arg1[, arg2, …]]);

// ie6-8:

if (! function() {}.bind) {
    Function.prototype.bind = function(context) {
        var self = this,
            args = Array.prototype.slice.call(arguments);

        return function() {
            return self.apply(context, args.slice(1));
        }
    };
}
var array_slice = Array.prototype.slice;
var Empty = function Empty() {};
Function.prototype.sbind = function(that) {
    // this 就是执行绑定的函数
    var target = this;
    // 截去传入的 this/ctx 上下文, 保留传入的参数
    var args = array_slice.call(arguments, 1);
    var bound;
    var binder = function() {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(array_slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(array_slice.call(arguments))
            );
        }
    };
    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }
    // bound is function ($0){ return binder.apply(this, arguments); }
    // binder.apply(this 是 Window 对象, arguments 是绑定后生成的新函数传入的参数
    // binder 作为参数传入 重命名为 binders, 在里面调用
    bound = Function('binders', 'return function (' + boundArgs.join(',') + '){ return binders.apply(this, arguments); }')(binder);

    console.log("bind bound:", bound.toSource())
        // Object.create, 原型继承
    if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        // Clean up dangling references.
        Empty.prototype = null;
    }
    return bound;
}

// <input id="button" type="button" value="点击我" />
// <span id="text">我会变色？</span>

var eleBtn = document.getElementById("button"),
    eleText = document.getElementById("text");

eleBtn.onclick = function(color) {
    color = color || "#003399";
    this.style.color = color;
}.bind(eleText, "#cd0000");
// ----------
var displayArgs = function(val1, val2, val3, val4) {
    console.log(val1 + " " + val2 + " " + val3 + " " + val4);
}

var emptyObject = {};

//将12 和 a作为第一个和第二个参数传入
var displayArgs2 = displayArgs.bind(emptyObject, 12, "a");

//将b c作为第三第四个参数传入
displayArgs2("b", "c"); //12 a b c
// -------------
var originalObject = {
    minimum: 50,
    maximum: 100,
    checkNumericRange: function(value) {
        console.log(this);
        if (typeof value !== 'number')
            return false;
        else
            return value >= this.minimum && value <= this.maximum;
    }
}

// 检测10是否在范围内,这次的this指向的是字面量originalObject
var result = originalObject.checkNumericRange(20);
console.log(result + " "); //false

console.log('-------------调皮的分隔线------------------');

var range = {
    minimum: 10,
    maximum: 20
};
// 构建一个新版的checkNumericRange
//这次的this指向的是range
var boundObjectWithRange = originalObject.checkNumericRange.bind(range);

// 检测10是否在范围内
var result = boundObjectWithRange(10);
console.log(result); //true
// ----------------------------------------------------

// 在函数体中调用eval，其代码的执行上下文会指向当前函数的执行上下文；
// 而new Function或Function中代码的执行上下文将一直指向全局的执行上下文。
var x = 'global';
void

function() {
    var x = 'local';
    eval('console.log(x);'); // 输出local
    (new Function('console.log(x);'))(); // 输出global
}();
-----------------------------------
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
Object.create：
var o;

// 创建一个原型为null的空对象
o = Object.create(null);


o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);


o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { writable:true, configurable:true, value: "hello" },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) { console.log("Setting `o.bar` to", value) }
}})


function Constructor(){}
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码


// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p
//42

o.q = 12
for (var prop in o) {
   console.log(prop)
}
//"q"

delete o.p
//false

//创建一个可写的,可枚举的,可配置的属性p
o2 = Object.create({}, { p: { value: 42, writable: true, enumerable: true, configurable: true } })

if (typeof Object.create != 'function') {
    (function () {
        var F = function () {};
        Object.create = function (o) {
            if (arguments.length > 1) {
              throw Error('Second argument not supported');
            }
            if (o === null) {
              throw Error('Cannot set a null [[Prototype]]');
            }
            if (typeof o != 'object') {
              throw TypeError('Argument must be an object');
            }
            F.prototype = o;
            return new F();
        };
    })();
}