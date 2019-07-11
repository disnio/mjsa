// x86体系的计算机都采用小端字节序（little endian），
// 相对重要的字节排在后面的内存地址，相对不重要字节排在前面的内存地址。

var littleEndian = (function() {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256;
})();

// 2的补码表示，将对应的正数值进行否运算，然后加1。

// 正向溢出（overflow）：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去1。
// 负向溢出（underflow）：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减去余值，再加上1。

// ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
// 就是分配内容用的，基本单位是 uint8。 slice transfer isView
var buffer = new ArrayBuffer(8);
buffer.byteLength === 8;

// DataView 视图是一个可以从 ArrayBuffer 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题。
// 包含 int/uint 8/16/32  float 32/64 的 get/set 方法，操作 ArrayBuffer

// TypedArray 9种类型的视图，视图部署数组接口，以指定格式解读2进制数据，数组成员同一数据类型。
// C 对应类型：
// BYTES_PER_ELEMENT

// Int8 signed char
// Uint8 unsigned char
// Uint8C （自动过滤溢出）Clamped

// Int16 short
// Uint16 unsigned short

// Int32 int
// Uint32 unsigned int

// Float32 float
// Float64 double

// File Api

// XMLHttpRequest:
// 服务器通过AJAX操作只能返回文本数据，即responseType属性默认为text。
// XMLHttpRequest第二版XHR2允许服务器返回二进制数据，这时分成两种情况。
// 如果明确知道返回的二进制数据类型，可以把返回类型（responseType）设为arraybuffer；
// 如果不知道，就设为blob。

// Fetch Api
// Canvas
// WebSockets

// Buffer 类以更优化和更适合 Node.js 的方式实现了 Uint8Array API，ArrayBuffer + DataView 的对象封装。

// Stream
// PassThrough 传输流用于测试
var through = require('through2');
var passThrough = through();
passThrough.write("hello");
passThrough._transform.name === "noop"; passThrough.readable === passThrough.writable === true;
// Since node 6.3.0 passThrough._readableState.buffer is a BufferList not an array