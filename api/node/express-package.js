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

// multer 处理 multipart/form-data 类型的表单数据，它主要用于上传文件. 它是写在 busboy 之上非常高效。

// vhost 子域名映射到对应的 app

// oidc-client-js openid

// express-history-api-fallback A tiny, accurate, fast Express middleware for single page apps with client side routing.
const root = `${__dirname}/public`
app.use(express.static(root))
app.use(fallback('index.html', { root }))

// keystone 5
// bolt 项目管理

// @changesets/cli The primary implementation of changesets(变更日志). Helps you manage the versioning and changelog
// entries for your packages.

// MDX https://github.com/mdx-js/mdx markdown 中嵌入 jsx https://mdxjs.com/
// @mdx-js/react
// @mdx-js/mdx
// 【gatsby】 生成 react 静态网站，利用 graphql 可对接后端。 https://github.com/gatsbyjs/gatsby
// gatsby-plugin-sharp sharp 图像处理库，resize,fluid,fixed
// gatsby-remark-copy-linked-files 复制md引用的文件到根目录中（public）
// gatsby-remark-images 给图像外层添加容器，设置响应尺寸，设置占位符 blur up
// gatsby-transformer-remark Parses MarkDown files using Remark
// gatsby-source-filesystem 本地文件转为各种类型数据（.json -> json data, .md -> markdown remark）

// get-contrast 两个颜色的对比度？
// lunr 浏览器中的全文本搜索

// @preconstruct/hook

// ci-info continuous integration environment. 含各大集成环境列表。

// cloudinary 图像，视频，数字资源 管理平台。
// https://cloudinary.com/

// codecov Codecov.io support for node.js. detect your CI provider and all coverage reports and uploads them to Codecov.

// codemirror 编辑器特别适合代码

// cross-fetch fetch api

// dataloader as part of your application's data fetching layer to provide a simplified and consistent API over various remote data sources such as databases or web services via batching and caching.

// dumb-passwords 愚蠢密码验证

// ensure-error 确保错误拥有正确的格式, name, message, stack
// pino logger
// express-pino-logger  log with pino
// http://getpino.io/#/

// facepaint  Dynamic style values for css-in-js

// falsey 自定义 false 值，返回 false

// flushable 立即或放弃执行，cancel, flush, pending.

// keystone-email 邮件发送模块

// knex.js sql 查询适配 (MSSQL, MySQL, PostgreSQL, SQLite3, Oracle)

// listr Terminal task list 终端任务列表，执行

// mjml  响应式 email 框架。MJML is a markup language created by Mailjet and designed to reduce the pain of coding a responsive email. https://github.com/mjmlio/mjml

// Joi 验证
const schema = joi.object().keys({
    id: joi.string().guid().required(),
    username: joi.string().alphanum().min(8).required()
})

// 数据库驱动程序、ORM 和查询构建器等内容。先别急着找 ORM，我强烈建议你先确认自己的确用得着 ORM 再说。很多时候用原始的 SQL 或查询构建器就够了，而 ORM 会加入另一层抽象，性价比不够高。

// mysql、node-postgres：
// 在不需要完整的 ORM 时使用，它们使用原始的 SQL 查询数据库（这些是驱动程序）

// node-mongodb-native：
// 在不需要完整的 ORM 时使用，它会直接查询 MongoDB

// Mongoose：
// 你更想在 MongoDB 上使用 ORM 时用它

// Knex：
// 你不需要完整的 ORM 解决方案，只是想在写查询代码时方便一些就用它。
// Knex 是一个生成 SQL 的查询构建器。
// 你有一个 Postgres、MSSQL、MySQL、MariaDB、SQLite3、Oracle 或 Amazon Redshift 数据库。

// Objection.js：
// 你想要一个支持 Knex 所有功能的 ORM，不用查询 DSL（所以你写的代码更接近原始 SQL），还有一个基于 Promise 的 API 和详尽的文档。

// PM2：
// 你需要一个能够在服务崩溃时重新启动服务，并能用来控制集群的进程管理器时选它。
// 注意：据说 PM2 可能违反 AGPL 许可证，相关讨论可以看 这里。我认为它用起来没什么问题。但如果你有问题 / 疑虑就请咨询你的法律部门，因为我不是律师。

// forever：
// 你想要一个能在服务崩溃时重启服务的进程管理器时可以选它。
// 你的部署比较小（支持集群的 pm2 适用于更大规模的部署）。如果你只有少量服务 / 进程，那么用 forever 就很合适。

// nodemon：
// 你想监视应用程序中的任何代码更改，并在本地开发时自动重启服务器时用它。
// 它非常适合开发工作！

// Web Socket 这里我单推 primus。它支持所有流行的 Web Socket 实现，而且更新维护很勤快；如果你想换个库用，那么改一行代码就能轻松切换不同的库了。
// Primus：
// 你需要 Web Socket，但又不想局限在某个特定的 Web Socket 实现时用它。

// Swagger-node：
// 你需要为 REST API 编写文档，并需要针对端点测试请求时用它。

// Winston：
// 在需要日志库和不同的日志输出时使用。

// Bunyan：
// 在需要日志库时使用，并且可以处理 JSON 是唯一的日志输出的情况。
// 你想为不同的组件、请求或功能使用不同的日志记录器（比如说这些记录器可能以不同的方式解析）。

// Morgan：
// 在使用 Express 并且想要记录 HTTP 请求时使用。
// 注意：它是和类似 Winston 或 Bunyan 的工具并用的。由于它是中间件，所以知道如何处理请求并记录它，但不会像 Winston 和 Bunyan 那样负责传输到日志输出中

// Uppy 是一款用来构建上传界面的JS框架