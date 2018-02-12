create-react-app 全局命令行工具建立应用
react-script 生成项目中的开发依赖

每次创建项目都会用最新的 react-script。更新已有项目打开更新日志检查当前使用的版本。
然后应用修改。

npm run eject
单向操作，不能回退。当不满意构建工具和配置选项，可以驱逐此项。
将一处简单构建依赖从你的项目中。作为替代将复制所有配置文件和过渡依赖到你的项目中。
所有的命令除了 eject 仍将可以使用。但是他们将指向被复制的脚本。

whatwg-fetch ie10+ promise object-assign

You would need to install an ESLint plugin for your editor first.
Then, add a file called .eslintrc to the project root:
{
  "extends": "react-app"
}

想要构建项目必须包含下面两个文件:

public/index.html 模板文件
src/index.js 入口

包装 node-sass 执行使用 chokidar 替换 Gaze 当监视文件时候.
Gaze 在docker 和虚拟机中占有很多资源chokidar不会.
npm install --save node-sass-chokidar

   "scripts": {
+    "build-css": "node-sass-chokidar src/ -o src/",
+    "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
     "start": "react-scripts start",
     "build": "react-scripts build",

npm install --save npm-run-all
-    "start": "react-scripts start",
-    "build": "react-scripts build",
+    "start-js": "react-scripts start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build-js": "react-scripts build",
+    "build": "npm-run-all build-css build-js"

----------------------------------------
什么时候引用 public Folder

建议从js 导入 样式图像字体，公共目录通常应对变通的较少使用的方法。less common cases:
需要一个特定文件名的文件在构建输出，如  manifest.webmanifest.
有成千上万的图片需要动态引用根据路径。
你想包含一些小的脚本在打包之外。
有些库可能不兼容于 webpack，你只能通过 script 标签来引用。

开发模式中代理设置：
"proxy": "http://localhost:4000",
https://github.com/chimurai/http-proxy-middleware#options
---------------------------------------------------------------
react-script 项目包含：

config/webpack.config.dev.js
// @remove-on-eject-begin
baseConfig: {
extends: [require.resolve('eslint-config-react-app')],
},
ignore: false,
useEslintrc: false,
// @remove-on-eject-end
-----------------------------------------
// @remove-on-eject-begin
babelrc: false,
presets: [require.resolve('babel-preset-react-app')],
// @remove-on-eject-end
此项通过在 babelrc 文件中应用 transform-runtime 来代替。包含的有：

对象解构 babel-plugin-transform-es2015-destructuring

类属性 babel-plugin-transform-class-properties
class Bork {
    //Property initializer syntax
    instanceProperty = "bork";
    boundFunction = () => {
      return this.instanceProperty;
    }

    //Static class properties
    static staticProperty = "babelIsCool";
    static staticFunction = function() {
      return Bork.staticProperty;
    }
  }

-----------------------------------------
// 使用 Object.assign 直接, 代替 Babel extends helper.
// Note that this assumes `Object.assign` is available.
// { ...todo, completed: true }
babel-plugin-transform-object-rest-spread

// Transforms JSX
babel-plugin-transform-react-jsx

// 补充运行时需要的 async/await 和 generators
[
    require.resolve('babel-plugin-transform-runtime'),
    {
      helpers: false,
      polyfill: false,
      regenerator: true,
    },
],

// 使 React 的警告包含更多的关于变量的信息
// babel-preset-react 中没有包括
// Adds component stack to warning messages
require.resolve('babel-plugin-transform-react-jsx-source'),
// Adds __self attribute to JSX which React will use for some warnings
require.resolve('babel-plugin-transform-react-jsx-self'),
-----------------------------------------
切换编译输出代码的运行环境
测试或服务端：
  module.exports = {
    presets: [
      // ES features necessary for user's Node version
      [
        require('babel-preset-env').default,
        {
          targets: {
            node: 'current',
          },
        },
      ],
      // JSX, Flow
      require.resolve('babel-preset-react'),
    ],
    plugins: plugins.concat([
      // Compiles import() to a deferred require()
      require.resolve('babel-plugin-dynamic-import-node'),
    ]),
  };
浏览器端
  module.exports = {
    presets: [
      // Latest stable ECMAScript features
      [
        require.resolve('babel-preset-env'),
        {
          targets: {
            // React parses on ie 9, so we should too
            ie: 9,
            // We currently minify with uglify
            // Remove after https://github.com/mishoo/UglifyJS2/issues/448
            uglify: true,
          },
          // Disable polyfill transforms
          useBuiltIns: false,
          // Do not transform modules to CJS
          modules: false,
        },
      ],
      // JSX, Flow
      require.resolve('babel-preset-react'),
    ],
    plugins: plugins.concat([
      // function* () { yield 42; yield 43; }
      [
        require.resolve('babel-plugin-transform-regenerator'),
        {
          // Async functions are converted to generators by babel-preset-env
          async: false,
        },
      ],
      // Adds syntax support for import()
      require.resolve('babel-plugin-syntax-dynamic-import'),
    ]),
  };
-----------------------------
补充说明：babel-preset-react 包括
flow 语法类型检查 preset-flow
syntax-jsx babel 分析jsx
transform-react-jsx 转换jsx 到 react 函数调用
transform-react-display-name 添加 displayName 到 React.createClass 调用
-----------------------------


https://docs.travis-ci.com/user/getting-started/