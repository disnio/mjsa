// yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
// yarn config set registry https://registry.npm.taobao.org -g
// https://github.com/zenparsing/zen-observable
// symbol-observable
// observable 媒体方向检测
import * as ResizeController from "properjs-resizecontroller";
var resizer = new ResizeController();
resizer.on('orientationchange', () => {
    console.log("landscape")
});

// 工作线程创建 workerpool body-scroll-lock 底层元素滚动锁定

// nzh 数字和中文转换

// memoize-one 保留最后的计算结果

// hash.js 指纹计算

// css-animation 元素动画

// dom-closest 发现第一个祖先元素

// unified 文本处理

// scrollama  滚动监测 similar to something like Waypoints

// rimraf rm -rf for node.

// reqwest ajax 兼容到 ie6

// majo 文件及内容操作

// dekko 检测输出文件或目录结构是否有效

// docsearch.js 文档内容检索

// enquire-js 服务端渲染错误避免

// clipboard-copy 复制传入的文本 copy-to-clipboard 可配置 mime

// jsesc 更好的序列化和转义

// fuse.js  lightweight fuzzy-search 轻量模糊搜索

// iconv-lite Pure JS character encoding conversion

// merge-descriptors 合并对象使用描述符，其实就是 express.js p:42 mixin(app, EventEmitter.prototype, false);
// Object.getOwnPropertyNames Object.getOwnPropertyDescriptor Object.prototype.hasOwnProperty.call

// ms 时间转毫秒 ms('2 days') ms('2h')

// fd-slicer  Safe fs.ReadStream and fs.WriteStream using the same fd.

// buffertools

// pcap capturing, decoding, and analyzing packets.
// centos7 libpcap-devel libpcap; win10 https://nmap.org/download.html npcap-0.906.exe nmap-7.70
// https://nmap.org/man/zh/
// https://www.tcpdump.org/

// nan 插件开发工具----！！！

// default-gateway 获得默认网关

// ipaddr.js ipv4/6 地址操作库

// netcat===!!

// async-each-series

// datagram-stream udp

// hexer stream spy transform chunk 16进制表示与字符串的呈现

// nanoid

// through2 stream.Transform this._transform

// cli-table

// network 工具集合 address

// node-arp 读 mac 地址

// progress-stream 流的进度监控

// speedometer 速度测量

// readable-stream 稳定调用版替换node stream

// batched-stream 零散的数据流 批量打包后发送

// https://wol.aquilatech.com/  网络唤醒远程开机 https://www.iplaysoft.com/wol.html

// Node-RED node.js 物联网开发，树莓派, 安卓等 https://nodered.org/ https://www.jianshu.com/p/be1c98280c71

// yargs 命令行参数操作

// boxen 命令行画盒子

// jsonfile 读写json 文件

// inquirer 交互命令行接口，不同于 commander, vorpal or args.
// 你想要构建一个按顺序确定选项的“交互式”CLI 实用程序时用它（类似运行 npm init 时的方法，它会问你一系列问题来生成 package.json 文件）

// Commander：
// 你要构建一个 CLI 实用程序，将所有参数作为命令行上的标志时就用它。

// ora 终端的 spin

// pkg 命令行打包 node.js 项目成可执行文件

// semver npm 的语义版本号解读

// UPX - the Ultimate Packer(加壳压缩程序) for eXecutables, upx Node cross-platform wrapper for UPX

// cash Cross-platform Linux commands in ES6
// netrat

// https://github.com/mscdex  node.js c++ 程序转换包
// SSH2 client and server modules written in pure JavaScript for node.js  !!!

// imap 邮件客户模块

// ---------- stream ------------
// concat-stream Return a writeable stream that will fire cb(data) with all of the data
// that was written to the stream. 流数据合并后传入回调。

// binary-split split buffer

// end-of-stream 流完成回调

// pump 把流串联在一起，当有一个关闭时销毁所有。当流中发生错误或关闭时候，可以执行回调，来处理错误和管道完成。
stream.reduce(pipe)
// pumpify pipeline()

// stream-shift 流的读操作 next buffer/object in streams readable queue; state.buffer.head.data.length/state.buffer[0].length/state.length/state.buffer.length
var rs = stream._readableState; rs.objectModel ? stream.read() : stream.read(getStateLength(rs));
var data = shift(stream);

// stream-each each(stream, iterator, cb) iterate the data in the stream by calling the iterator function with (data, next) where data is a chunk and next is a callback. Call next when you are already to consume the next chunk.
// 对可读流，每次读取的数据块进行迭代后执行next(),进行下一次读取处理。

// split-array-stream 数组元素放到转换流中 push an array of items into a Transform stream;
// is-stream-ended Check if the stream has ended; stream.ended/stream._readableState.ended Boolean(ended).valueOf()

// inherits 浏览器友好的类 node util 的继承。

// duplexify
// writeable.write(chunk, en, cb)
// 返回: <boolean> 如果流需要等待 'drain' 事件触发才能继续写入更多数据，则返回 false，否则返回 true。
Duplexify.prototype._write = function(data, enc, cb) {
    if (this.destroyed) return
    if (this._corked) return onuncork(this, this._write.bind(this, data, enc, cb))
    if (data === SIGNAL_FLUSH) return this._finish(cb)
    if (!this._writable) return cb()
    // 如果流需要等待 'drain' 事件触发才能继续写入更多数据，则返回 false，否则返回 true。
    if (this._writable.write(data) === false) this._ondrain = cb
    else if (!this.destroyed) cb()
}

// random
// tree-model manipulate and traverse tree-like structures
// array-to-tree (data, options) {parentProperty: parent_id, childrenProperty: children, customID: id}
// nested-property read, write, a data structure's nested property via a string like "a.b.c.1"
// merge-sort merge sort 合并排序

// flush-write-stream a write stream constructor that supports a flush function that is called
// before finish is emitted.

// parallel-transform allows you to run your transforms in parallel without changing the order of the output.
// cyclist 循环队列

// from2 ({ objectMode: true }, read(size, next)) 创建可读流 readable streams that properly handle backpressue. (背压处理)


stream.Writable
drain, pipe, unpipe, finish
cork, uncork, writable, write, end
_write(chunk, en, cb), _writev(chunks, cb), _destroy(err, cb), _final(cb)

stream.Readable
readable, data, end
readable, read(size), pipe(destination), unpipe, pause, resume, unshift(chunk), wrap
_read, _destroy, push

stream.Transform
finish, end
_flush, _transform(chunk, en, cb)

// globby User-friendlly glob matching

// memfs 内存文件系统

// minimist 参数分析带修饰符

// fkill Fabulously(惊人的，难以置信的) kill process. Cross-platform. one or more process IDs/names/ports to kill.
await fkill(1337);

// fkill-cli

// fs-extra promise support for the fs mehtods.

// globby User-Friendly glob matching. based on fast-glob. stream support.
// multimatch Match against a list instead of the filesystem.
// matcher Simple wildcard matching.

// iterall !! for of and for await of loops allows breaking out of a loop early with a break statement.
// the forEach and forAwaitEach functions(much like Array's forEach) do not support early break.

// shortid short non-sequential url-friendly unique id generator.

// watch Utilities for watching file trees

// clipboardy Access the system clipboard (copy/paste)

// resolve implements the node require.resolve() algorithm such that you can resolve() on behalf of a file asynchronously and synchronously.

// nyc 命令行接口

// asyncdi 依赖注入
// This regex detects the arguments portion of a function definition
// Thanks to Angular for the regex
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
// Detect the dependencies using the regex
this.deps = Function.toString.call(fn)
    .match(FN_ARGS)[1]

// https://github.com/tc39/proposal-observable
// @samverschueren/stream-to-observable Convert Node Streams into ECMAScript-Observables

// any-observable Support any Observable library and polyfill
// zen-observable

// builtin-modules 列出 nodejs的内建模块

// chrono-node 从字符串中分析出日期

// date-fns 时间工具集

// dev-null Use it whenever you need to interrupt stream flow for instance if you want to log the state of a stream instead of its output.

// diff text diff implementation

// endent dedent 字符串代码缩进调整

// fast-deep-equal
// fast-memoize

// ERR_CONNECTION_REFUSED
// https://blog.csdn.net/gulang03/article/details/89217273

// image-extensions 图像的扩展名集合

// install-packages 安装包

// intersection-observer polyfill

// is-hotkey 浏览器事件是否匹配热键 isHotkey('mod+s', e)

// isomorphic-unfetch  切换在unfetch & node-fetch for client & server

// loader-utils utils for webpack loaders

// magic-string 小巧的工具生成， generate a source map

// mdast-util-to-string mdast utility get the plain text content of a node
// mdast markdown abstract syntax tree

// meow cli app helper

// ms 毫秒转换工具

// object-hash 用值和对象生成 hash

// octicons

// https://github.com/sindresorhus/promise-fun
// "p-finally"
// "p-lazy"
// "p-limit"
// "p-reflect"
// "p-settle"
// "p-waterfall"

// parent-module 返回调用的父节点

// Traefik HTTP 反向署理和负载均衡器，除了支持 Docker 之外，它还支持诸如 Kubernetes、Rancher 和 Amazon Elastic Container 等处事

// pify Promisify a callback-style function

// Pluralize 单复数变化

// raf-schd A throttle function that uses requestAnimationFrame to limit the rate at which a function is called.