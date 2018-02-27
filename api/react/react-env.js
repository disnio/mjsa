// babel 全局安装则不必每个都安装了

webpack-dev-middleware:服务器自动编译当 webpack.config 修改后，生成打包文件在内存，
并自动加载生成的文件到连接的服务器，并刷新页面。
Offers a dev middleware for webpack, which arguments a live bundle to a directory.
https://github.com/webpack/webpack-dev-middleware
It serves the files emitted from webpack over a connect server.
webpack 通过一个连接的服务器发送文件。一些优于打包的地方：
没有文件写到磁盘，处理文件在内存。
文件改变在监视模式，中间件不再提供旧的打包文件，延迟请求直到编译完成。不比等着刷新。

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
---------------
webpack-hot-middleware: webpack.config 配置文件的热加载，添加到你自己的服务器中。
Webpack hot reloading you can attach to your own server
https://github.com/glenjamin/webpack-hot-middleware
entry: [
    'webpack-hot-middleware/client'
]
plugins: [
    new webpack.HotModuleReplacementPlugin()
]
见上面配置，同时和 webpack-dev-middleware 使用
// -------------
webpack-dev-server: webpack 可集成的开发服务器，提供热加载功能。
https://webpack.js.org/configuration/dev-server/#devserver
https://github.com/webpack/webpack-dev-server
它在底层使用了 webpack-dev-middleware。

react-hot-loader：更新到3.0测试版，引用方式改变，webpack 2.0 升级自带es2015支持。
https://github.com/gaearon/react-hot-loader/tree/master/docs#starter-kits
react 的 webpack 插件。需要使用 react-router 4, 3对异步路由不支持。
"react-hot-loader": "next",
// .babelrc ----------------------------------
{
  "presets": ["es2015-loose", "stage-0", "react"],
  "plugins": ["react-hot-loader/babel"]
}

react-transform: babel 插件，自定义react 的转换，废弃 in react-hot-loader 3。
https://github.com/gaearon/babel-plugin-react-transform
https://github.com/gaearon/react-transform
.babelrc:
{
  "presets": ["react", "es2015", "stage-0"],
  "env": {
    "development": {
      "plugins": [
        ["react-transform", {
          "transforms": [{
            "transform": "react-transform-hmr",// 废弃 in react-hot-loader 3
            "imports": ["react"],
            "locals": ["module"]
          }, {
            "transform": "react-transform-catch-errors",// 废弃 in react-hot-loader 3
            "imports": ["react", "redbox-react"]
          }]
        }]
      ]
    }
  }
}

// 3 以后废弃下面的插件，都集成了
"react-hot-loader": "^1.3.0", 
"babel-plugin-react-transform": "^2.0.0",
"react-transform-catch-errors": "~1.0.2",
"react-transform-hmr": "~1.0.4",
// --------------------------------------------
https : //www.npmjs.com/package/babel-plugin-transform-runtime
The runtime transformer plugin does three things :
Automatically requires babel - runtime / regenerator when you use generators / async functions.
Automatically requires babel - runtime / core - js and maps ES6 static methods and built - ins.
Removes the inline babel helpers and uses the module babel - runtime / helpers instead.