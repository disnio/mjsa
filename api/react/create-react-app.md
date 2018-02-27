# create-react-app

https://github.com/facebook/create-react-app

cnpm：
https://cnpmjs.org/
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm set registry https://registry.npm.taobao.org/

全局安装：
npm install create-react-app -g

创建 react 项目：
create-react-app my-app
cd my-app
运行该项目，启动本地服务器 localhost:3000
npm start

项目特征：
React, JSX, ES6, and Flow 语法支持.
ES6 语言标准扩展如对象扩展.
Autoprefixed CSS.
单元测试运行
开发服务器.
内建脚本打包 JS, CSS, and images for production, with hashes and sourcemaps.
自动刷新
加入了eslint的功能

可编译出生产环境的代码，且文件名带hash值，方便做cache。
npm run build

开发环境中，react应用是跑在3000端口的，可是api服务可能跑在3001端口
只需要在package.json文件中，加一个配置项就可以了。
开发模式中代理设置
比如："proxy": "http://localhost:3001/"
https://github.com/chimurai/http-proxy-middleware#options

create-react-app 全局的命令行工具用来创建一个新的项目
react-script 生成的项目所需要的开发依赖

每次创建项目都会用最新的 react-script。更新已有项目打开更新日志检查当前使用的版本。
然后应用修改。

npm run eject
默认所有配置是隐藏起来的，要想自定义配置，需要运行词命令。
单向操作，不能回退。

不 eject 的方法：
引入 react-app-rewired 插件来实现配置覆盖。需要在根目录新建一个 config-overrides.js
还需要重写下npm start等相关命令。

react等作为全局变量不打包：
首先在config -> webpack.config.prod.js 的配置里加入如下代码：
module.exports = {
  ...
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  ...
}
并修改 public -> index.html 引入 react 和 react-dom

添加ant-design：
npm install antd babel-plugin-import --save-dev
在config -> webpack.config.dev.js 和 webpack.config.prod.js 里
（或者 .babelrc 文件）的babel-loader的options配置里，加入如下代码：
plugins: [
  ['import', { libraryName: 'antd', style: 'css' }]  // `style: true` 会加载 less 文件
]

whatwg-fetch ie10+， promise， object-assign

编辑器选用安装 ESLint 插件，然后项目根目录添加文件 .eslintrc:
{
  "extends": "react-app"
}


所有的源码都要放到src目录下
想要构建项目必须包含下面两个文件:

public/index.html 模板文件
src/index.js 入口

安装sass或less：
npm install sass-loader node-sass --save-dev
或
npm install less-loader less --save-dev
test: /\.(css|scss|sass)$/
...
use:[
  {
  ...
  },
  "sass-loader"
]

npm install react-app-rewired --save-dev
https://github.com/codebandits/react-app-rewire-css-modules
npm install --save-dev codebandits/react-app-rewire-css-modules sass-loader node-sass

*.module.css
*.module.sass
*.module.scss
/* config-overrides.js */

const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
    // ...
    config = rewireCssModules(config, env);
    // ...
    return config;
}

import styles from './App.module.scss';

export default ({text}) => (
    <div className={styles.app}>{text}</div>
)


----------------------------------------
什么时候引用 public 文件夹

建议从js 导入 样式图像字体，公共目录通常应对变通的较少使用的方法。less common cases:
需要一个特定文件名的文件在构建输出，如  manifest.webmanifest.
有成千上万的图片需要动态引用根据路径。
你想包含一些小的脚本在打包之外。
有些库可能不兼容于 webpack，你只能通过 script 标签来引用。


https://babeljs.io/docs/plugins/preset-env/#top
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


持续集成：
https://docs.travis-ci.com/user/getting-started/