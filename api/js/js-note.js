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