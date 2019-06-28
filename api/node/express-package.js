// accepts 基于 negotiator 请求 type mime language charset encoding 检测

// array-flatten flatten(arry) 数组打平

// body-parser 分析进来的请求体在一个中间件中，不处理 multipart bodies 应该用 busboy formidable.
// 只解析json, raw body, text body, url-encoded form body
// 中间件工厂函数，处理req.body 分析 content-type 请求头匹配的 type。
// bodyParser.json() bodyParser.raw() bodyParser.text() bodyParser.urlencoded()

// bytes 数字转字节表示的容量 bytes(1024) output 1kb 或 反向解析 vice-versa

// content-type 构造或解析 HTTP Content-Type header， contentType.parse(string)

// depd 标记模块为废弃

// http-errors 构造 HTTP errors 对象 for Express, Koa, Connect, etc
// createError(401, 'Please login to view this page.')
// createError([status], [message], [properties])
// new createError[code || name]([msg]))

// https://github.com/jshttp
// on-finished 在 node.js 请求对象来自于HTTP Server 的 connect/upgrade 事件
// 当模块被使用在 http connect request 或 请求带着 Upgrade 头。 onFinished(req/res, listener)

// destroy, a stream, stream.destroy() call

// ee-first 拿第一个事件 in a set of event emitters and event pairs, then clean up after itself.
// first(arr, listener)

// raw-body 获取整个流的缓存区作为 Buffer or a string. 解析请求体。
// getRawBody(stream, [options], [callback])

// typeis(req, ['text/*']) Checks if the request is one of the types.
// typeis.hasBody(request) typeis.is(mediaType, ['json'])

// content-disposition  分析构造附件下载 HTTP Content-Disposition header

// cookie cookie parser and serializer

// cookie-signature

// encodeurl  Encode a URL to a percent-encoded form

// escape-html Escape string for use in HTML

// etag  generates HTTP ETags

// finalhandler 作为最后的步骤响应 http 请求

// res.setHeader('Content-Security-Policy', "default-src 'none'")
// res.setHeader('X-Content-Type-Options', 'nosniff') 对IE9、IE11的 content-type 验证有影响。
// Content Security Policy  https://imququ.com/post/content-security-policy-reference.html
// 主要是用来定义页面可以加载哪些资源，减少 XSS 的发生。

// fresh(reqHeaders, resHeaders)
function isFresh(req, res) {
    return fresh(req.headers, {
        etag: res.getHeader("ETag"),
        "last-modified": res.getHeader("Last-Modified")
    });
}

// parseurl Parse a URL with memoization. parseurl.original(req) parseurl(req)
// case 0x3f: /* ?  */
// case 0x09: /* \t */
// case 0x0a: /* \n */
// case 0x0c: /* \f */
// case 0x0d: /* \r */
// case 0x20: /*    */
// case 0x23: /* #  */

// path-to-regexp 转换路径字符串如： /user/:name into a regular expression.

// proxy-addr 地址是否可信任 proxyaddr(req, trust)

// range-parser Range header field parser.

// send  streaming files from the file system as a http response supporting partial responses (Ranges), conditional-GET negotiation (If-Match, If-Unmodified-Since, If-None-Match, If-Modified-Since)
// send(req, path, [options])

// Vary 是一个HTTP响应头部信息，它决定了对于未来的一个请求头，应该用一个缓存的回复(response)还是向源服务器请求一个新的回复。它被服务器用来表明在 content negotiation algorithm（内容协商算法）中选择一个资源代表的时候应该使用哪些头部信息（headers）.

// multiparty 文件上传

// vhost 子域名映射到对应的 app

// oidc-client-js openid