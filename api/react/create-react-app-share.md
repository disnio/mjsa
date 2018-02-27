# create-react-app

[https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)


## cnpm
[https://cnpmjs.org/](https://cnpmjs.org/)

建议使用 cnpm 代替npm 安装依赖包，并始终使用

```
npm install -g cnpm --registry=https://registry.npm.taobao.org

npm set registry https://registry.npm.taobao.org/
```

全局安装

```
cnpm install create-react-app -g
```

## 创建 react 项目
```
create-react-app my-app
cd my-app
//运行该项目，启动本地服务器 localhost:3000
npm start
```

## 项目特征
* React, JSX, ES6, and Flow 语法支持.
* ES6 语言标准扩展如对象扩展.
* Autoprefixed CSS.
* 单元测试运行
* 开发服务器.
* 内建脚本打包 JS, CSS, and images for production, with hashes and sourcemaps.
* 自动刷新
* 加入了eslint的功能
* 可编译出生产环境的代码，且文件名带hash值，方便做cache。npm run build
* 开发环境中，react应用是跑在3000端口的，可是api服务可能跑在3001端口
只需要在package.json文件中，加一个配置项就可以了。
* 开发模式中代理设置
比如："proxy": "http://localhost:3001/"

## 组成
create-react-app 全局的命令行工具用来创建一个新的项目

react-script 生成的项目所需要的开发依赖

每次创建项目都会用最新的 react-script。

## Eject

npm run eject
脱离create-react-app 回归普通 webpack 配置方式
方便自定义，单向操作，不能回退。


**react等作为全局变量不打包：**
首先在config -> webpack.config.prod.js 的配置里加入如下代码：
```
module.exports = {
  ...
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  ...
}
```
并修改 public -> index.html 引入 react 和 react-dom

**添加ant-design：**
```
npm install antd babel-plugin-import --save-dev
```
在config -> webpack.config.dev.js 和 webpack.config.prod.js 里
（或者 .babelrc 文件）的babel-loader的options配置里，加入如下代码：
```
plugins: [
  ['import', { libraryName: 'antd', style: 'css' }]  // `style: true` 会加载 less 文件
]
```
或 config-overrides.js 中

```
config = injectBabelPlugin(["import", { libraryName: "antd-mobile", style: "css" }], config);
```

**不 eject 的方法：**

引入 react-app-rewired 插件来实现配置覆盖。

需要在根目录新建一个 config-overrides.js

还需要重写下npm start等相关命令。

## ESLint
编辑器选用安装 ESLint 插件，然后项目根目录添加文件 .eslintrc:
```
{
  "extends": "react-app"
}
```


## 安装sass或less
```
npm install sass-loader node-sass --save-dev
//或
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
```

## [react-app-rewired](https://github.com/codebandits/react-app-rewire-css-modules)

为 create-react-app 没有 eject 情况下重新配置 webpack
```
npm install --save-dev codebandits/react-app-rewire-css-modules sass-loader node-sass

/* config-overrides.js */

const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
    // ...
    config = rewireCssModules(config, env);
    // ...
    return config;
}
```

```
import styles from './App.module.scss';

```
<div className={styles.app}></div>

文件名必须：
*.module.css
*.module.sass
*.module.scss


## 什么时候引用 public 文件夹

>建议从js 导入样式图像字体，公共目录通常应对变通的较少使用的方法。

有成千上万的图片需要根据路径动态引用。

包含一些小的脚本在打包之外。

有些库不兼容于 webpack，只能通过 script 标签来引用。


## 一般原则

所有的源码都要放到src目录下

想要构建项目必须包含下面两个文件:

public/index.html 模板文件

src/index.js 入口