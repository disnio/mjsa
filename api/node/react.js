webstorm sourcemaps, 编辑配置，设置正确端口，然后调试运行后，webpack . 右键 visualize source map。
生成的文件 bundle.js 右键 specify local file 建立关联。

$ npm install --save react react-dom babelify babel-preset-react
$ browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js

$ npm install --save react react-dom babel-preset-react
$ webpack
npm install --global babel-cli
npm install babel-preset-react
---------------------
//安装react
npm install react --save
npm install react-dom --save
//安装babel-loader
npm install babel-loader --save-dev
npm install babel-core --save-dev
npm install babel-preset-es2015 --save-dev  //支持ES2015
npm install babel-preset-react --save-dev //支持jsx
npm install babel-preset-stage-0 --save-dev //支持ES7
//但是还不够
npm install babel-polyfill --save
/*
Polyfilla是一个英国产品,在美国称之为Spackling Paste(译者注:刮墙的,在中国称为腻子).记住这一点就行:把旧的浏览器想象成为一面有了裂缝的墙.这些[polyfills]会帮助我们把这面墙的裂缝抹平,还我们一个更好的光滑的墙壁(浏览器)
*/
npm install babel-runtime  --save
npm install babel-plugin-transform-runtime --save-dev
------------------------
/*减少打包的时候重复代码，以上要注意是放在dev还是非dev上！*/
npm install webpack-dev-server -g
webpack-dev-server --progress --colors
"dev":"webpack-dev-sever --devtool eval --progress --colors --hot --content-base build"
//webpack-dev-server 创建一个服务器8080端口的
//devtool eval --为你的代码创建源地址，可以代码快速定位
//progress --显示进度条
//colors --命令行带颜色
//content-base build --指向设置的输出目录
//一旦启动这个就会用服务器去监听代码文件的变化，从而每次变化都自动合并
引用模块，webpack提供了require()API（也可以通过添加bable插件来支持ES6的import语法）。
webpack提供了强大的热更新支持，即HMR(hot module replace)。
webpack启动一个本地webserver（webpack-dev-server），负责处理由webpack生成的静态资源请求。
注意webpack-dev-server是把所有资源存储在内存的，所以你会发现在本地没有生成对应的chunk访问却正常。

npm install loder-css --save-dev
webpack ./entry.js boudle.js --moudle-bind 'css=style!css' --progress --colors --watch /
//in package.json
"deploy": "NODE_ENV=production webpack -p --config webpack.production.config.js"

如果要指定另外的配置文件，可以执行：webpack --config webpack.custom.config.js --display-error-details
webpack -w 提供watch方法，实时进行打包更新
webpack -p 对打包后的文件进行压缩
webpack -d 提供SourceMaps，方便调试

plugins: [
    new webpack.IgnorePlugin(/file\.js$/)
]
Note: require.ensure only loads the modules, it doesn’t evaluate them.
Note: AMD require loads and evaluate the modules. In webpack modules are evaluated left to right.
http://localhost:8080/webpack-dev-server/bundle 内嵌 iframe 模式加载页面
entry参数定义了打包后的入口文件，可以是个字符串或数组或者是对象；
如果是数组，数组中的所有文件会打包生成一个filename文件；
如果是对象，可以将不同的文件构建成不同的文件:

plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
]

path: 打包文件存放的绝对路径
publicPath: 网站运行时的访问路径
filename:打包后的文件名

注意，require()还支持在资源path前面指定loader，即require(![loaders list]![source path])形式：
require("!style!css!less!bootstrap/less/bootstrap.less");
require()时指定的loader会覆盖配置文件里对应的loader配置项。

var path = require('path');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
//这个可以使jquery变成全局变量，妮不用在自己文件require('jquery')了
// var thirdPlugin = new webpack.ProvidePlugin({$: 'jquery'});
var ignoreFiles = new webpack.IgnorePlugin(/\.\.\/lib\/jquery.js$/);
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    // context: __dirname + '/src', 这个会影响 css
    // entry: [
    //     'webpack/hot/dev-server',
    //     'webpack-dev-server/client?http://localhost:8080',
    //     'babel-polyfill',
    //     path.resolve(__dirname, 'src/app.js')
    // ],
    // 想在项目中require一些其他的类库或者API，而又不想让这些类库的源码被构建到运行时文件中，
    // 可以通过配置externals参数来解决这个问题：
    externals: {
      "jquery": "jQuery",
      'react': 'window.React',
      'react-dom':'ReactDOM',
    },
    // webpack编译输出的文件包括以下2种：

    // entry：入口，可以是一个或者多个资源合并而成，由html通过script标签引入
    // chunk：被entry所依赖的额外的代码块，同样可以包含一个或者多个文件
    // 其中entry项是入口文件路径映射表，output项是对输出文件路径和名称的配置，
    // 占位符如[id]、[chunkhash]、[name]等分别代表编译后的模块id、chunk的hashnum值、chunk名等，
    // 可以任意组合决定最终输出的资源格式。
    // hashnum的做法，基本上弱化了版本号的概念，版本迭代的时候chunk是否更新只取决于chnuk的内容是否发生变化。
    // 总会有一些功能是使用过程中才会用到的，出于性能优化的需要，对于这部分资源我们希望做成异步加载，
    // 所以这部分的代码一般不用打包到入口文件里边。
    
    // 对于这一点，webpack提供了code splitting，即使用require.ensure()作为代码分割的标识。
    // webpack将require.ensure()包裹的部分单独打包了，
    // 即图中看到的[hash].chunk.js，既解决了异步加载的问题，又保证了加载到的是最新的chunk的内容。
    // 例如某个需求场景，根据url参数，加载不同的两个UI组件，示例代码如下：

    // var component = getUrlQuery('component');

    // if('dialog' === component) {
    //     require.ensure([], function(require) {
    //         var dialog = require('./components/dialog');
    //         // todo ...
    //     });
    // }

    // if('toast' === component) {
    //     require.ensure([], function(require) {
    //         var toast = require('./components/toast');
    //         // todo ...
    //     });
    // }
    // 多个入口文件之间可能公用一个模块，可以使用CommonsChunkPlugin插件对指定的chunks进行公共模块的提取
    // 下面代码示例演示提取所有入口文件公用的模块，将其独立打包：
    // var chunks = Object.keys(entries);
    // plugins: [
    //     new CommonsChunkPlugin({
    //         name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
    //         chunks: chunks,
    //         minChunks: chunks.length // 提取所有entry共同依赖的模块
    //     })
    // ],
    // entry: {
    //   vendor: ["jquery", "other-lib"],
    //   app: "./entry"
    // }
    // new CommonsChunkPlugin({
    //   name: "vendor",

    //   // filename: "vendor.js"
    //   // (Give the chunk a different name)

    //   minChunks: Infinity,
    //   // (with more entries, this ensures that no other module
    //   //  goes into the vendor chunk)
    // })
    entry: {
        app: "./src/app.js",
        bottom: "./src/bottom.js"
    },
    entry:{
        app  :[path.resolve(__dirname,'app/main.js'),],
        react: ['babel-polyfill','react','react-dom']
    },
    output: {
        path: path.resolve(debug ? '__build' : './assets/'),
        path: path.resolve(__dirname, 'public/build'),
        // path: path.join(__dirname, "build"),
        // publicPath: "/build/",
        // path: "/home/proj/cdn/assets/[hash]",
        // publicPath: "http://cdn.example.com/assets/[hash]/"
        // filename: "[name].js"
        filename: debug ? '[name].js' : 'js/[chunkhash:8].[name].min.js',
        chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
        publicPath: debug ? '/__build/' : ''
    },

    // test项表示匹配的资源类型，loader或loaders项表示用来加载这种类型的资源的loader
    // ！用来定义loader的串联关系，"-loader"是可以省略不写的，多个loader之间用“!”连接起来，
    // 但所有的加载器都需要通过 npm 来加载。
    // https://github.com/webpack/docs/wiki/shimming-modules
    // {test: require.resolve('jquery'), loader: 'expose?jQuery'},
    // {test: require.resolve('pen'), loader: 'exports?window.Pen'},
    module: {
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!scss?sourceMap'},
            
            // {test: /\.less$/, loader: 'style!css!less'},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            // /src\/lib/, !babel
            // {test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate'}, 
            // {test: /\.html$/, loader: 'raw'}, 
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { 
                test: /\.jsx?$/,
                loaders: ['react-hot', 'jsx?harmony'],
                include: [
                    path.resolve(__dirname, "app/src"),
                    path.resolve(__dirname, "app/test")
                ],
                query: {
                    presets: ['es2015', 'react']
                }

            },
            {
                loader : 'babel-loader',
                exclude: [
                    //在node_modules的文件不被babel理会
                    path.resolve(__dirname, 'node_modules'),
                ]，
                include: [
                    //指定app这个文件里面的采用babel
                    path.resolve(__dirname, 'app'),
                ],
                test： /\.jsx?$/,
                query : {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'url-loader?limit=8192&name=build/[name].[ext]'
                    // hash:8的意思是取图片内容hashsum值的前8位，这样做能够保证引用的是图片资源的最新修改版本，保证浏览器端能够即时更新。
                loaders: [
                    'image?{bypassOnDebug: true, progressive:true, \
                      optimizationLevel: 3, pngquant:{quality: "65-80"}}',
                    'url?limit=10000&name=img/[hash:8].[name].[ext]',
                ]
            },
            {
                test: /\.(woff|eot|ttf)$/i,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            },

         // {
         //      //文件加载器，处理文件静态资源
         //      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
         //      loader: 'file-loader?name=./fonts/[name].[ext]'
         //  }
            {test: /\.(tpl|ejs)$/, loader: 'ejs'},
            {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html?attrs=img:src img:data-src"
            }


        ]
    }
    // webpack在构建包的时候会按目录的进行文件的查找，
    // resolve属性中的extensions数组中用于配置程序可以自行补全哪些文件后缀：
    // resolve: {
    //     // Default: ["web_modules", process.cwd() +"node_modules"]
    //     root: [ path.resolve('./app/modules'), path.resolve('./vendor/modules')],
    //     alias: {
    //         'jquery': path.resolve(__dirname, 'public/lib/jquery.js'),
    //     }
    // },
    // https://segmentfault.com/a/1190000004284681
    // 在模块开发过程中，我们可能会对可以复用的组件封装成一个可被git管控的模块，
    // 并在引用的过程中采用带[版本号的方式引用]，这就要求我们在webpack.config.js中添加相关alias配置
    // 深入源码之ModuleAliasPlugin if(request.request != aliasValue)
    ,resolve: {
      // 查找module的话从这里开始查找
        root: [
            __dirname + '/app/assets/js',
        ], //绝对路径
        extensions: ['', 'css', 'less', '.coffee', '.js', '.jsx'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js',
            'react-dom' : './libs/react-dom.js',
            'react' : './libs/react.js',
            'mod/slider': '/path/mods/mod/slider/0.0.5',
            'mod/footer': '/path/mods/mod/footer/0.0.2',
            'mod/slider/0.0.3': '/path/mods/mod/slider/0.0.3',
            'mod/header': '/path/mods/mod/header/0.0.1',
            'mod/slider/0.0.1': '/path/mods/mod/slider/0.0.1'
        }
    }
    // ,devServer: {
    //     hot: true
    // }
    // new webpack.HotModuleReplacementPlugin() 
    ,
    // plugins: [ignoreFiles, commonsPlugin, new ExtractTextPlugin("[name].css")]
    plugins: [
        new webpack.ProvidePlugin({ //加载jq
            $: 'jquery',
            jQuery: "jquery",
            "window.jQuery": "jquery",
            React: "react/addons",
            "window.React": "react/addons",
            Fluxxor: "fluxxor",
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['index','list','about'], //提取哪些模块共有的部分
            minChunks: 3 // 提取至少3个模块共有的部分
        }),
        new webpack.optimize.CommonsChunkPlugin('react', 'react.js'),

        new ExtractTextPlugin('css/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        
        //HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/index.html', //生成的html存放路径，相对于path
            template: './src/view/index.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/list.html', //生成的html存放路径，相对于path
            template: './src/view/list.html', //html模板路径
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'list'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/about.html', //生成的html存放路径，相对于path
            template: './src/view/about.html', //html模板路径
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'about'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),

        new webpack.HotModuleReplacementPlugin() //热加载
    ],
        //使用webpack-dev-server，提高开发效率
    devServer: {
        contentBase: './',
        host: 'localhost',
        port: 9090, //默认8080
        inline: true, //可以监控js变化
        hot: true, //热启动
    },
    devServer: {
        publicPath:'http://localhost:8080/static/',
        proxy: {
            "*": "http://localhost:54999"
        },
        inline: true,
        hot: true
    },
    // 调试映射生成
    devtool: "source-map"
};

----------
  "scripts": {
    "prestart": "gulp",
    "build": "webpack",
    "dev": "webpack-dev-server --inline --devtool eval --progress --colors --line --hot",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  --
  context: __dirname + '/src',
  entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'src/app.js')
  ],
  output: {
      // path: path.resolve(__dirname, 'build'),
      // filename: 'bundle.js'
      path: path.join(__dirname, "build"),
      // publicPath: "build/",
      filename: "bundle.js"
  }

webpack.IgnorePlugin 把不想 bundle 的文件排除掉
单独打包样式：
npm install extract-text-webpack-plugin --save-dev
----------------------------
ReferenceError: webpackJsonp is not defined
用了CommonsChunkPlugin生成了公共文件，但是页面还没有引用这个公共文件
---------
// babel --presets react src --watch --out-dir build
// 在 packages.json 中的scripts下加上：
// "pack": "webpack --progress --colors --watch"
// 输入 npm run-script pack 来执行 
-----------------------------------------------------
// app.js
var http = require('http');
var koa = require('koa');
var serve = require('koa-static');

var app = koa();
var debug = process.env.NODE_ENV !== 'production';
// 开发环境和生产环境对应不同的目录
var viewDir = debug ? 'src' : 'assets';

// 处理静态资源和入口文件
app.use(serve(path.resolve(__dirname, viewDir), {
    maxage: 0
}));

app = http.createServer(app.callback());

app.listen(3005, '0.0.0.0', function() {
    console.log('app listen success.');
});
// app.js
var router = require('koa-router')();
var routes = require('./routes');
routes(router, app);
app.use(router.routes());
// routes.js
var proxy = require('koa-proxy');
var list = require('./mock/list');
module.exports = function(router, app) {
    // mock api
    // 可以根据需要任意定制接口的返回
    router.get('/api/list', function*() {
        var query = this.query || {};
        var offset = query.offset || 0;
        var limit = query.limit || 10;
        var diff = limit - list.length;

        if(diff <= 0) {
            this.body = {code: 0, data: list.slice(0, limit)};
        } else {
            var arr = list.slice(0, list.length);
            var i = 0;

            while(diff--) arr.push(arr[i++]);

            this.body = {code: 0, data: arr};
        }
    });

    // proxy api
    router.get('/api/foo/bar', proxy({url: 'http://foo.bar.com'}));
}

// 将webpack开发服务器以中间件的形式集成到local webserver，不需要cli方式启动（少开一个cmd tab）：
// app.js
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpack = require('webpack');
var webpackConf = require('./webpack.config');

app.use(webpackDevMiddleware(webpack(webpackConf), {
    contentBase: webpackConf.output.path,
    publicPath: webpackConf.output.publicPath,
    hot: true,
    stats: webpackConf.devServer.stats
}));
----------------------------------------------------------------
webpack解决了资源依赖的问题，这使得封装组件变得很容易，例如：

// js/components/component-x.js
require('./component-x.css');

// @see https://github.com/okonet/ejs-loader
var template = require('./component-x.ejs');
var str = template({foo: 'bar'});

function someMethod() {}

exports.someMethod = someMethod;
使用：// js/a.js
import {someMethod} from "./components/component-x";
someMethod();
---------------------
由于入口文件是手动使用script引入的，在webpack编译之后入口文件的名称和路径一般会改变，即开发环境和生产环境引用的路径不同：

// 开发环境
// a.html
// <script src="/__build/vendors.js"></script>
// <script src="/__build/a.js"></script>
// 生产环境
// a.html
// <script src="http://cdn.site.com/js/460de4b8.vendors.min.js"></script>
// <script src="http://cdn.site.com/js/e7d20340.a.min.js"></script>
webpack提供了HtmlWebpackPlugin插件来解决这个问题，HtmlWebpackPlugin支持从模板生成html文件，
生成的html里边可以正确解决js打包之后的路径、文件名问题，配置示例：

// webpack.config.js
plugins: [
    new HtmlWebpackPlugin({
        template: './src/a.html',
        filename: 'a',
        inject: 'body',
        chunks: ['vendors', 'a']
    })
]

这里资源根路径的配置在output项：
// webpack.config.js
output: {
    publicPath: debug ? '/__build/' : 'http://cdn.site.com/'
}

在项目开发中，可能会有许多额外的任务需要完成，
比如对于使用compass生成sprites的项目，因目前webpack还不直接支持sprites，所以还需要compass watch，
再比如工程的远程部署等，所以需要使用一些构建工具或者脚本的配合，打通研发的链路。
--------------------------------------------------------------------------------
// onScroll doesn't work in IE8 https://github.com/facebook/react/issues/631
// http://facebook.github.io/react/downloads.html#individual-downloads
// <script src="https://fb.me/react-with-addons-0.14.6.js"></script>
// https://github.com/xcatliu/react-ie8
// <script src="build/es5-shim.js"></script>
// <script src="build/es5-sham.js"></script>
<Component {...this.props} more="values" />
React.createElement(Component, Object.assign({}, this.props, { more: 'values' }));

The ... syntax is part of the Object Rest Spread proposal.
// 核心概念
// 相信组件的方式优于模板+显示逻辑。标记和生成的代码应该紧密的绑定在一起。
// 显示逻辑经常很复杂使用模板就去表达就会变的很臃肿。
// the Babel REPL.
// 自动绑定和事件代理
// 界面元素作为简单的状态机，状态改变触发渲染基于这个新的状态。
// 设置状态 setState(data, callback), 合并 data 到 this.state 重新渲染组件。
var LikeButton = React.createClass({
    getInitialState: function() {
        return {liked: false};
    },
    handleClick: function(event) {
        this.setState({liked: !this.state.liked});
    },
    render: function() {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
            <p onClick={this.handleClick}>
                You {text} this. Click to toggle.
            </p>
        );
    }
});

ReactDOM.render(
    <LikeButton />,
    document.getElementById('example')
);
// https://facebook.github.io/react/docs/reusable-components.html
// PropTypes exports a range of validators 确认你收到的是正确的数据. 
// 性能的原因 propTypes is only checked in development mode.
// getDefaultProps() will be cached and used to ensure that this.props.value will have a value 

var ComponentWithDefaultProps = React.createClass({
  getDefaultProps: function() {
    return {
      value: 'default value'
    };
  }
  /* ... */
});

Transferring Props: A Shortcut {...this.props}

Mixins : mixins: [SetIntervalMixin]

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.forEach(clearInterval);
    }
};
// https://facebook.github.io/react/docs/working-with-the-browser.html
var TickTock = React.createClass({
    mixins: [SetIntervalMixin], // Use the mixin
    getInitialState: function() {
        return {seconds: 0};
    },
    componentDidMount: function() {
        this.setInterval(this.tick, 1000); // Call a method on the mixin
    },
    tick: function() {
        this.setState({seconds: this.state.seconds + 1});
    },
    render: function() {
        return (
            <p>React has been running for {this.state.seconds} seconds</p>
        );
    }
});

ReactDOM.render(
    <TickTock />,
    document.getElementById('example')
);

// ES6 : The API is similar to React.createClass with the exception of getInitialState. Instead of providing a separate getInitialState method, you set up your own state property in the constructor.

// Another difference is that propTypes and defaultProps are defined as properties on the constructor instead of in the class body.

// You'll have to explicitly use .bind(this) or arrow functions =>.

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick.bind(this)}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
Counter.propTypes = { initialCount: React.PropTypes.number };
Counter.defaultProps = { initialCount: 0 };

// Transferring with ... in JSX 
var FancyCheckbox = React.createClass({
  render: function() {
    var { checked, ...other } = this.props;
    var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
    // `other` contains { onClick: console.log } but not the checked property
    return (
      <div {...other} className={fancyClass} />
    );
  }
});

ReactDOM.render(
  <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
    Hello world!
  </FancyCheckbox>,
  document.getElementById('example')
);

var FancyCheckbox = React.createClass({
  render: function() {
    var checked = this.props.checked;
    var other = _.omit(this.props, 'checked');
    var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
    return (
      React.DOM.div(_.extend({}, other, { className: fancyClass }))
    );
  }
});
// form: 
getInitialState: function() {
    return {value: 'Hello!'};
},
handleChange: function(event) {
    this.setState({value: event.target.value});
},
render: function() {
    var value = this.state.value;
    return <input type="text" value={value} onChange={this.handleChange} />;
}

render: function() {
    // defaultChecked
    return <input type="text" defaultValue="Hello!" />; 
}

// Mounting

//     getInitialState(): object is invoked before a component is mounted. Stateful components should implement this and return the initial state data.
//     componentWillMount() is invoked immediately before mounting occurs.
//     componentDidMount() is invoked immediately after mounting occurs. Initialization that requires DOM nodes should go here.

// Updating

//     componentWillReceiveProps(object nextProps) is invoked when a mounted component receives new props. This method should be used to compare this.props and nextProps to perform state transitions using this.setState().
//     shouldComponentUpdate(object nextProps, object nextState): boolean is invoked when a component decides whether any changes warrant an update to the DOM. Implement this as an optimization to compare this.props with nextProps and this.state with nextState and return false if React should skip updating.
//     componentWillUpdate(object nextProps, object nextState) is invoked immediately before updating occurs. You cannot call this.setState() here.
//     componentDidUpdate(object prevProps, object prevState) is invoked immediately after updating occurs.

// Unmounting

//     componentWillUnmount() is invoked immediately before a component is unmounted and destroyed. Cleanup should go here.
// Mounted Methods

// Mounted composite components also support the following method:

//     component.forceUpdate() can be invoked on any mounted component when you know that some deeper aspect of the component's state has changed without using this.setState().

// ReactDOM.render() will return a reference to your component's backing instance 
// https://facebook.github.io/react/docs/more-about-refs.html
// The ref Callback Attribute The referenced component will be passed in as a parameter, and the callback function may use the component immediately, or save the reference for future use (or both).
    <script src="../build/react.js"></script>
    <script src="lib/react-with-addons-0.14.6.js"></script>
    <script src="../build/react-dom.js"></script>
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({
    getInitialState: function() {
        return {items: ['hello', 'world', 'click', 'me']};
    },
    handleAdd: function() {
        var newItems =
            this.state.items.concat([prompt('Enter some text')]);
        this.setState({items: newItems});
    },
    handleRemove: function(i) {
        var newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({items: newItems});
    },
    render: function() {
        var items = this.state.items.map(function(item, i) {
            return (
                <div key={item} onClick={this.handleRemove.bind(this, i)}>
                    {item}
                </div>
            );
        }.bind(this));
        return (
            <div>
                <button onClick={this.handleAdd}>Add Item</button>
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {items}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});

ReactDOM.render(
    <TodoList />,
    document.getElementById('example')
);
// https://facebook.github.io/react/docs/create-fragment.html
if (this.props.swapped) {
  children = createFragment({
    right: this.props.rightChildren,
    left: this.props.leftChildren
  });
} else {
  children = createFragment({
    left: this.props.leftChildren,
    right: this.props.rightChildren
  });
}