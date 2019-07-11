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

// ora 终端的 spin

// pkg 命令行打包 node.js 项目成可执行文件

// semver npm 的语义版本号解读

// UPX - the Ultimate Packer(加壳压缩程序) for eXecutables, upx Node cross-platform wrapper for UPX

// cash Cross-platform Linux commands in ES6
// netrat

// https://github.com/mscdex  node.js c++ 程序转换包
// SSH2 client and server modules written in pure JavaScript for node.js  !!!

// imap 邮件客户模块

// concat-stream 流合并后回调

// binary-split split buffer

// end-of-stream 流完成回调

// pump 当流中发送错误或发生器关闭时候，可以执行回调。pipe()
// pumpify pipeline()

// stream-shift next buffer/object in streams readable queue

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