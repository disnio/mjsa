requireApi
markdown 标记语言做笔记
Error: Mismatched anonymous define() module: function ()
脱离 requirejs 单独引用第三方文件会报此错误。
-------------------------------------------------
www/

    index.html
    js/
        app/
            sub.js
        lib/
            jquery.js
            canvas.js
        app.js

<script data-main="js/app.js" src="js/require.js"></script>

//and in app.js:

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['jquery', 'canvas', 'app/sub'],
function   ($,        canvas,   sub) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});

Definition Functions with Dependencies
//my/shirt.js now has some dependencies, a cart and inventory
//module in the same directory as shirt.js
define(["./cart", "./inventory"], function(cart, inventory) {
        //return an object to define the "my/shirt" module.
        return {
            color: "blue",
            size: "large",
            addToCart: function() {
                inventory.decrement(this);
                cart.add(this);
            }
        }
    }
);

my/cart.js
my/inventory.js
my/shirt.js


Define a Module as a Function

//A module definition inside foo/title.js. It uses
//my/cart and my/inventory modules from before,
//but since foo/title.js is in a different directory than
//the "my" modules, it uses the "my" in the module dependency
//name to find them. The "my" part of the name can be mapped
//to any directory, but by default, it is assumed to be a
//sibling to the "foo" directory.
define(["my/cart", "my/inventory"],
    function(cart, inventory) {
        //return a function to define "foo/title".
        //It gets or sets the window title.
        return function(title) {
            return title ? (window.title = title) :
                   inventory.storeName + ' ' + cart.name;
        }
    }
);

--------------------------------------------------
Define a Module with Simplified CommonJS Wrapper

define(function(require, exports, module) {
        var a = require('a'),
            b = require('b');

        //Return the module value
        return function () {};
    }
);

Define a Module with a Name

//Explicitly defines the "foo/title" module:
define("foo/title",
    ["my/cart", "my/inventory"],
    function(cart, inventory) {
        //Define foo/title object in here.
   }
);
//和上面等同，把依赖别名等放入函数内部。参数要require
//Relative module names inside define()
define('when/delay-test', function (require) {

	var delay, when;

	delay = require('when/delay');
	when = require('when');
});

define(function(require) {
    var mod = require("./relative/name");
});

相对路径很有用，如果你创建一些模块在一个目录里面, 这样你就能共享目录和其他人或项目, 并且在你想得到一个方法在这个目录的相邻模块中也就不需要知道目录名称了。



 生成urls相对一个模块. 把 "require" 作为依赖 使用 require.toUrl() 生成 URL:

define(["require"], function(require) {
    var cssUrl = require.toUrl("./style.css");
});

Console debugging: 
调用一个已经通过 require(["module/name"] , function(){}) 装入的模块在控制台里面, 可以:

require("module/name").callSomeFunction()

使用相对路径如 './module/name', 那么要在define内。


