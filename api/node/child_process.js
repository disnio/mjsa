spawn('cmd', [opt])
exec('cmd opt')
// spawn 是异步中的异步，子进程一开始就从流中返回数据到node。运行指定程序。
// exec 是同步中的同步，子进程结束后才返回所有的buffer 数据。运行复杂命令。

// 中文乱码的问题，通过 iconv-lite 转码 buffer 到 binary， 再解码成 cp936(gbk)
const iconv = require('iconv-lite');
let cp = require('child_process');
var binaryEncoding = 'binary';
var encoding = 'cp936';
cp.exec('\"'+ePath+ '\"', { encoding: binaryEncoding }, function(err, stdout, stderr){
      console.log(iconv.decode(new Buffer(stdout, binaryEncoding), encoding), "error"+iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
});


// 原文：https://blog.csdn.net/he_min/article/details/82912729
// exit 事件，子进程的标准输入、输出流仍为开启的状态。
// close 是在输入输出流被终止时触发。
// fork 创建的子进程具有内部的通信通道。子进程退出需要调用 process.exit(),
// 每个都是新的 v8 实例。

var cp = require('child_process');

var n = cp.fork(__dirname + '/sub.js');

n.on('message', function(m) {
  console.log('PARENT got message:', m);
});

n.send({ hello: 'world' });
// sub.js
process.on('message', function(m) {
  console.log('CHILD got message:', m);
});
// 同步方法
process.send({ foo: 'bar' });

// sub
function fib(n) {
    if (n < 2) {
        return 1;
    } else {
        return fib(n - 2) + fib(n - 1);
    }
}
/**
 * process send message
 */
process.on('message', function(m) {
    process.send({result: fib(m.input)});   // TODO: send message
});

var cp = require('child_process');  // TODO: 引入child_process模块
var child = cp.fork('sub.js');  // TODO: 每个请求都单独生成一个新的子进程
/**
 * fork message event
 */
child.on('message', function(m) {
    console.info('斐波那契数列: ' + m.result + '\n');
});
/**
 * child_process send message
 */
var input = parseInt('10');
child.send({input : 1});    // TODO: send message
for(var i = 1; i < input; i++) {
    child.send({input : i});    // TODO: send message
}