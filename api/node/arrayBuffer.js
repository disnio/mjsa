x86体系的计算机都采用小端字节序（little endian），
相对重要的字节排在后面的内存地址，相对不重要字节排在前面的内存地址。

var int16View = new Int16Array(buffer);

for (var i = 0; i < int16View.length; i++) {
  console.log("Entry " + i + ": " + int16View[i]);
}
// Entry 0: 0
// Entry 1: 0
// Entry 2: 2
// Entry 3: 0
// Entry 4: 4
// Entry 5: 0
// Entry 6: 6
// Entry 7: 0
var littleEndian = (function() {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256;
})();

2的补码表示，将对应的正数值进行否运算，然后加1。

    正向溢出（overflow）：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去1。
    负向溢出（underflow）：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减去余值，再加上1。

ArrayBuffer 内存中的一段2进制数据，只能通过视图读写。

TypedArray 9种类型的视图，视图部署数组接口，以指定格式解读2进制数据，数组成员同一数据类型。
    BYTES_PER_ELEMENT

    Int8 signed char
    Uint8 unsigned char
    Uint8C （自动过滤溢出）Clamped

    Int16 short
    Uint16 unsigned short

    Int32 int
    Uint32 unsigned int

    Float32 float
    Float64 double

    File Api

    XMLHttpRequest:
    服务器通过AJAX操作只能返回文本数据，即responseType属性默认为text。
    XMLHttpRequest第二版XHR2允许服务器返回二进制数据，这时分成两种情况。
    如果明确知道返回的二进制数据类型，可以把返回类型（responseType）设为arraybuffer；
    如果不知道，就设为blob。

    Fetch Api
    Canvas
    WebSockets


DataView 自定义复合格式的视图，数组成员不同数据类型。
4byte 32bit interger

=IF(A2<0,"负","")&TEXT(TRUNC(ABS(ROUND(A2,2))),"[DBNum2]")&"元"&IF(ISERR(FIND(".",ROUND(A2,2))),"",TEXT(RIGHT(TRUNC(ROUND(A2,2)*10)),"[DBNum2]"))&IF(ISERR(FIND(".0",TEXT(A2,"0.00"))),"角","")&IF(LEFT(RIGHT(ROUND(A2,2),3))=".",TEXT(RIGHT(ROUND(A2,2)),"[DBNum2]")&"分","整")