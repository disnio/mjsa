// babel 全局安装则不必每个都安装了

// webpack - dev - middleware: 服务器自动编译当 webpack.config 修改后， 生成打包文件在内存，
// 并自动加载生成的文件到连接的服务器， 并刷新页面。
// Offers a dev middleware
// for webpack, which arguments a live bundle to a directory.
// https: //github.com/webpack/webpack-dev-middleware
//     It serves the files emitted from webpack over a connect server.
// webpack 通过一个连接的服务器发送文件。 一些优于打包的地方：
// 没有文件写到磁盘， 处理文件在内存。
// 文件改变在监视模式， 中间件不再提供旧的打包文件， 延迟请求直到编译完成。 不比等着刷新。

{
    var config = require('./webpack.config');
    var compiler = webpack(config);
    var webpackDevOptions = {
        noInfo: true,
        historyApiFallback: true,
        publicPath: config.output.publicPath,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };

    app.use(require('webpack-dev-middleware')(compiler, webpackDevOptions));
    app.use(require('webpack-hot-middleware')(compiler));
}
// -- -- -- -- -- -- -- -
// webpack - hot - middleware: webpack.config 配置文件的热加载， 添加到你自己的服务器中。
// Webpack hot reloading you can attach to your own server
// https: //github.com/glenjamin/webpack-hot-middleware
entry: [
    'webpack-hot-middleware/client'
]
plugins: [
new webpack.HotModuleReplacementPlugin()
]
// 见上面配置， 同时和 webpack - dev - middleware 使用

// -------------
// webpack-dev-server: webpack 可集成的开发服务器， 提供热加载功能。
// https: //webpack.js.org/configuration/dev-server/#devserver
// https: //github.com/webpack/webpack-dev-server
// 它在底层使用了 webpack - dev - middleware。

// react - hot - loader： 更新到3 .0 测试版， 引用方式改变， webpack 2.0 升级自带es2015支持。
// https: //github.com/gaearon/react-hot-loader/tree/master/docs#starter-kits
// react 的 webpack 插件。 需要使用 react - router 4, 3 对异步路由不支持。 "react-hot-loader": "next",

// .babelrc ----------------------------------
{
    "presets": ["es2015-loose", "stage-0", "react"],
    "plugins": ["react-hot-loader/babel"]
}

// react-transform: babel 插件， 自定义react 的转换， 废弃 in react - hot - loader 3。
// https: //github.com/gaearon/babel-plugin-react-transform
// https: //github.com/gaearon/react-transform
.babelrc: {
    "presets": ["react", "es2015", "stage-0"],
    "env": {
        "development": {
            "plugins": [
                ["react-transform", {
                    "transforms": [{
                        "transform": "react-transform-hmr", // 废弃 in react-hot-loader 3
                        "imports": ["react"],
                        "locals": ["module"]
                    }, {
                        "transform": "react-transform-catch-errors", // 废弃 in react-hot-loader 3
                        "imports": ["react", "redbox-react"]
                    }]
                }]
            ]
        }
    }
}

// 3 以后废弃下面的插件，都集成了
// "react-hot-loader": "^1.3.0",
// "babel-plugin-react-transform": "^2.0.0",
// "react-transform-catch-errors": "~1.0.2",
// "react-transform-hmr": "~1.0.4",
// --------------------------------------------
// https: //www.npmjs.com/package/babel-plugin-transform-runtime
// The runtime transformer plugin does three things:
// Automatically requires babel - runtime / regenerator when you use generators / async functions.
// Automatically requires babel - runtime / core - js and maps ES6 static methods and built - ins.
// Removes the inline babel helpers and uses the module babel - runtime / helpers instead.

// "babel-runtime": "^6.26.0", // 一个编译后文件引用的公共库，可以有效减少编译后的文件体积

// "react-async-component": "^1.0.0-beta.3", // 组件懒加载

// es6 编译插件
// babel-preset-umi:
// transform-typeof-symbol typeof Symbol() === "symbol";
// transform-unicode-regex  匹配 unicode 字符的修饰符 u
var string = "foo💩bar";
var match = string.match(/foo(.)bar/u);
// transform-sticky-regex
// const a = /o+/y; in
// var a = new RegExp("o+", "y"); out

// transform-new-target
function Foo() {
console.log(new.target);
}

Foo(); // => undefined
new Foo(); // => Foo

// plugin-transform-literals
var b = 0b11; // binary integer literal
var o = 0o7; // octal integer literal
const u = 'Hello\u{000A}\u{0009}!'; // unicode string literals, newline and tab out:
var b = 3; // binary integer literal
var o = 7; // octal integer literal
const u = 'Hello\n\t!'; // unicode string literals, newline and tab

// babel-plugin-react-require https://www.npmjs.com/package/babel-plugin-react-require

// @babel/plugin-syntax-dynamic-import
// @babel/plugin-proposal-optional-catch-binding
// @babel/plugin-proposal-async-generator-functions

// @babel/plugin-proposal-decorators
// @babel/plugin-proposal-class-properties

// @babel/plugin-proposal-nullish-coalescing-operator 为空返回 default
var foo = object.foo ?? "default";

// @babel/plugin-proposal-optional-chaining
const baz = obj ?.foo ?.bar ?.baz;
const baz = obj ?.foo ?.bar ?.baz(); // 42
const baz = new obj?.foo?.bar?.baz();

// @babel/plugin-proposal-pipeline-operator stage 1 阶段）允许以一种易读的方式去对函数链式调用。
// 管道操作符是单参数函数调用的语法糖 expression |> function
let url = "%21" |> decodeURI;

// @babel/plugin-proposal-do-expressions
let a = do {
    if(x > 10) {
        'big';
    } else {
        'small';
    }
};

// @babel/plugin-proposal-function-bind
// https://babeljs.io/docs/en/babel-plugin-proposal-function-bind
obj::func
// is equivalent to:
func.bind(obj)

::obj.func
// is equivalent to:
obj.func.bind(obj)

obj::func(val)
// is equivalent to:
func.call(obj, val)

::obj.func(val)
// is equivalent to:
obj.func.call(obj, val)

// babel-plugin-macros penv.macro
// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
// https://juejin.im/entry/5ad41747518825558002b2a7

import { useContext } from 'react'
import { __RouterContext } from 'react-router-dom'

export default function useRouter() {
  return useContext(__RouterContext)
}

// AbortController abortController.signal abortController.abort

// const mediaQueryLists = queries.map(q => window.matchMedia(q));

// ref.current.contains(event.target) useOnClickOutside
