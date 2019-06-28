// net.Server net.Socket
// https://www.cnblogs.com/zmxmumu/p/6212054.html
// net.Server ref() 将 server 加入事件系统.
// net.Socket drain 当写缓存为空时触发，end 接收到 FIN 包时触发， lookup 解析主机时连接之前触发
// 创建socket 套接字，绑定ip和端口，启动监听，等待客户端连接，与客户端进行通信，关闭socket连接。
// 创建socket 套接字，连接server 服务器，与服务器进行通信，关闭socket。


// http.ClientRequest 类, http.request() 内部创建并返回。 它表示正在进行的请求，且其请求头已进入队列。
// http.Server 类, 此类继承自 net.Server
// http.ServerResponse 类, 此对象由 HTTP 服务器在内部创建，而不是由用户创建。 它作为第二个参数传给 'request' 事件。

// IncomingMessage 对象由 http.Server 或 http.ClientRequest 创建，并分别作为第一个参数传给 'request' 和 'response' 事件。 它可用于访问响应状态、消息头、以及数据。 它实现了可读流接口。