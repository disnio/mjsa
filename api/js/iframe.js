服务端访问控制:
https://boutell.com/newfaq/misc/urllength.html
IE8's maximum URL length is 2,048 chars and 5165 characters when following a link.
ie9 4043
Firefox  65,536 characters

apache 4000, 8,192-byte limit on an individual field in a request.
https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests
https://developer.mozilla.org/en-US/docs/Web/HTTP/Server-Side_Access_Control
Cross-Origin Resource Sharing: https://www.w3.org/TR/cors/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
header('Content-Type:application:json;charset=utf8');
header('Content-Type:text/html;charset=utf8');
header('Content-Type: application/xml');
header('Content-Type: text/html');
header('Content-Type: text/plain');

Access-Control-Request-Headers
Access-Control-Request-Method: DELETE

header('Access-Control-Allow-Origin:http://client.ycdl.com');
header('Access-Control-Allow-Origin: x-requested-with');

header('Access-Control-Allow-Methods:GET,POST,PUT,DELETE,OPTIONS');

header('Access-Control-Allow-Credentials:true');

header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Access-Control-Allow-Headers:X-PINGARUNER');
header('Access-Control-Allow-Headers:Content-Type, Authorization, Accept,X-Requested-With');

    Cache-Control
    Content-Language
    Content-Type
    Expires
    Last-Modified
    Pragma

header('Access-Control-Max-Age: 1728000');
header("Content-Length: 0");

header('Cache-Control: no-cache');
header('Pragma: no-cache');
header('Access-Control-Allow-Credentials: true');
Access-Control-Expose-Headers
header("HTTP/1.1 403 Access Forbidden");

    <?php
    $ret = array(
        'name' => isset($_POST['name'])? $_POST['name'] : '',
        'gender' => isset($_POST['gender'])? $_POST['gender'] : ''
    );

    header('content-type:application:json;charset=utf8');

    $origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '';

    $allow_origin = array(
        'http://www.client.com',
        'http://www.client2.com'
    );

    if(in_array($origin, $allow_origin)){
        header('Access-Control-Allow-Origin:'.$origin);
        header('Access-Control-Allow-Methods:POST');
        header('Access-Control-Allow-Headers:x-requested-with,content-type');
    }

    echo json_encode($ret);
    ?>
----------------FormData--------------------
var fd = new FormData();

fd.append("file", form.find(':file')[0].files[0]);

$.ajax(form.prop('action'), {
    type: "post",
    cache: false,
    // 不能有其他的 fileds，否则不能发送
    data: fd,
    mimeTypes:"multipart/form-data",
    contentType: false,
    processData: false
})
----------
跨站点文件上传需要设置：
Access-Control-Allow-Headers Content-Type, Content-Range, Content-Disposition
https://github.com/blueimp/jQuery-File-Upload/wiki/Browser-support
多文件上传需要 ie10+
-------------------------------------
跨域 Cookie
xhrFields: {
    withCredentials: true
},
crossDomain: true,

header("Access-Control-Allow-Credentials: true");

There is another way. If you use SSL on the non-default https port, it will keep sending the cookies. For example, if your URL is something like this https://example.com:8443/xxxx, then it will send the cookies.

I experience the same issue you have. My web app (internal web app) was working with https but in a non standard port and it just works fine. When I configure to use 443, it stops working because the cookies are not sent by XDomainRequest object.

XDomainRequest ie8-9 发送请求是不包含cookie信息的，浏览器本身机制决定。而且只支持 content-type: "text/plain"
不能跨协议发送数据 http->https 是不允许的。
跨域发送授权信息只能通过 post body 或 url

有一种跨域需要特别注意就是在 https 协议下发送 https 请求，除了使用 proxy 代理外其他方法都无解，会被浏览器直接block掉。
www.adobe.com/devnet/articles/crossdomain_policy_file_spec.html
WIRESHARK Fiddler

postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。
ostMessage的使用方式也相当简单：
otherWindow.postMessage(message, targetOrigin, [transfer]);
otherWindow是对接收方窗口的引用，一般可以是以下几种方式：
window.frames[0].postMessage
document.getElementsByTagName('iframe')[0].contentWindow
window.opener.postMessage
event.source.postMessage
window.open 返回的引用
---------
除了包含:

 buy.api.example.com/?sessionId=$sessionId&otherparameters=test

and set your webservice to check the query string if cookies are not present.
----------
From my experience, if both domains are in your control better to use postMessage
---------------------------------------------------
abort(), getAllResponseHeaders(), getResponseHeader()
void open(
   DOMString method,
   DOMString url,
   optional boolean async,
   optional DOMString user,
   optional DOMString password
);
send(ArrayBuffer data); 废弃
send(ArrayBufferView data);
send(Blob data);
send(Document data);
send(DOMString? data);
send(FormData data);
setRequestHeader(DOMString header, DOMString value);

XMLHttpRequest.onreadystatechange
XMLHttpRequest.readyState
0   UNSENT  open() has not been called yet.
1   OPENED  send() has been called.
2   HEADERS_RECEIVED    send() has been called, and headers and status are available.
3   LOADING     Downloading; responseText holds partial data.
4   DONE    The operation is complete.

XMLHttpRequest.status
XMLHttpRequest.statusText
XMLHttpRequest.response
XMLHttpRequest.responseType "json" ie10不支持

XMLHttpRequest.responseXML
XMLHttpRequest.responseText
"arraybuffer"
"blob"
"document"
"json"
"text"

XMLHttpRequest.withCredentials
XMLHttpRequest.upload
XMLHttpRequest.timeout

http://www.telerik.com/blogs/details/using-cors-with-all-modern-browsers
<!--[if lt IE 10]>
<!--iecors provides a jQuery ajax custom transport for IE8/9 XDR-->
<script src="scripts/jquery.iecors.js"></script>
<![endif]-->
关于ie89:
http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx

var xdr = new XDomainRequest();
    if (xdr) {
        xdr.onerror = function () {
//                    alert('xdr onerror');
        };
        xdr.ontimeout = function () {
//                    alert('xdr ontimeout');
        };
        xdr.onprogress = function () {
//                    alert("XDR onprogress");
//                    alert("Got: " + xdr.responseText);
        };
        xdr.onload = function() {
//                    alert('onload' + xdr.responseText);
            callback(xdr.responseText);
        };
        xdr.timeout = 5000;
        xdr.open("get", thisURL);
        xdr.send();
    } else {
//                alert('failed to create xdr');
    }

// setTimeout(function () {
//     xdr.send();
// }, 0);
The XDomainRequest object handles differently in every IE.

In IE9 -> the XDomainRequest object requires that all handles are given a method. Meaning, that handles like onerror, onload, ontimeout, and onprogress are all given something to do. Without defining a method for these handles then you'll get a network response of "operation aborted".

In IE7/8/9 -> the XDomainRequest is ASYNC by default. It will execute the code further down the stack regardless of the xdr object completing or not. Putting a setTimeout may be a solution but shouldnt be.

In this case, trigger an event and listen for the event before executing any further code. An example of this would be (in jquery)...

// call this method in xdr onload
$(document).trigger("xdr_complete");

// use this wrapper in code you want to execute after the complete of xdr
$(document).bind("xdr_complete", function(){ ... });
In IE7/IE8 you'll notice it working. IE7 and IE8 are rather "loose" in that they don't abort when there are missing method for the handles.


---------------------------------------------------
The problem was that IE9 does not understand the format of "JSON" in the encoding cp1251,
even though it is clearly stated in the response header.
Translation of the JSON response in utf-8 solved the problem with IE9.

所有使用JSON的方案都有一个错误，就是无法实现POST。
那目前实现POST的方法是1、建立一个iframe，iframe内的JS创建一个form表单，
并可以将接收到的参数放入表单中POST提交。2、将iframe页面插入到页面中。

3、针对现代浏览器，将数据通过postMessage()方法传入iframe中。针对不支持此方法的浏览器，
通过URL HASH的方法将参数传入iframe中。（由于URL有长度限制，所以不能传播大数据）
-----------
首先假设你请求数据的网站为B。要看你是否可以控制（修改里面的代码）。
1  jsonp  缺点 只能get请求 ，需要修改B网站的代码
2 cors 刘子龙说的方案，这个方案缺点 是 ie6 7 兼容不好（倒是不见得要兼容）。需要B网站在响应中加头
3 postMessage   缺点也是 ie6 7 兼容不好（倒是不见得要兼容）。需要修改B网站的代码
4 iframe window.name 传值得方式很巧妙，兼容性也很好。但是也是需要你能修改B网站代码
5 服务端主动请求B网站，兼容性好而且你客户端的代码还是原来的ajax，缺点是感觉不好。。
6 类似5 用nginx把B网站的数据url反向代理。

我觉得吧，如果你不能修改B网站的代码老老实实5 6 方案如果能修改B网站
方案2的修改应该是最简单的。就算是B网站你可以修改，还有种需求处理起来比较麻烦的，
就是有的数据需要登录之后才能取。最直接的方案，B网站提供数据的url 进去先提供用户名密码，走下登录再走取数据，最后返回数据。但是往往最直接的方案都不是好的方案。。。
（登录请求=》返回令牌=》带令牌请求受限数据）所以最好用是方案2  然后B网站有oauth 功能，
你的页面加个登陆后，用户登陆后客户端保存好token_key，然后取数据。
（这个方案类似通过sessionid得到session。因为安全相关的原因，通过通过sessionid得到session 这样的需求并不是所有语言的所有框架都会提供的）当然oauth方案也有坏处，
就是B网站本来没有oauth，要加上一个会略麻烦。所以还可以选择方案2 加上withcredentials=true 这个方案。
当然登录页面还是需要的这个问题已经是4年前的了，不过跨域请求似乎是个永恒的问题，
正好最几天刚刚也遇到了类似的需求，就写得多了一点了。最近需要将原来的一个web网站写成手机版本，
我是用的html5 加cordova 打包成手机程序的， 方案2  cors  然后加withcredentials=true
然后在登录请求后重写手机客户端的cookie 方案能很好满足我的需求。

---------
如果用现代浏览器，就用XHR 2.0的Access-Control-Allow吧
如果要兼容古代浏览器，请用iframe代理，这样把问题从“跨域POST”转化为“跨域iframe之间的通信”，
条件是接收POST的域名要部署一个html文件作为跨域的“桥”来用，也就是说那个域名必须是受你控制的。
----------
JSONP是JS跨域的hacker写法，是伪跨域的，需要服务器端配合返回回调，而且参数是JSON格式。
HTML5支持form的跨域操作，传递二进制都没有问题，XMLHTTPRequest 2.0也可以实现相应异步操作。
属于官方跨域的操作方式，前提是需要服务器端设置header里接收所有域或者指定域的请求，
而且是不全兼容的。总结来说，两种方式都是需要服务器支持的。另外谈下代理的事情，
如果只是用户身份认证的话，其实是可以通过后台语言解决的。
python的requests,urllib还有php的curl等都是可以做到模拟用户登录的，
前提是服务器后台没做防盗链。如果做代理也搞不定的话，还是有方法的。

--------
跨域问题，目前地球上最好、最方便（没有之一）的解决方案是，利用Apache转发。
1.前台后台的代码都不需要改动，也不需要为跨域去专门写代码或改代码。
2.Apache非常容易安装：Win上有WAMP，Linux上有LAMP；且Apache的转发设置起来非常简单方便。
开发时甚至可以直接把转发配置为客户端到VS或Eclipse，方便调试；
上线后把转发切换成客户端到Apache自身或IIS或Tomcat或WebLogic或Nginx等等。

xdomainrequest 在火狐下不设置 contentType 服务端返回json 时候：正常返回数据。ie8,9不能。10 no test.

子域代理不能突破ie8,9. post 数据

-------------------------------------------------------------
// form：
jquery-validate:

混合内容拦截（Mixed Content Blocking），所谓混合内容就是 HTTPS 资源和 HTTP 资源混合显示在页面上。
默认会阻止在 HTTPS 页面中显示活动的 HTTP 内容。
活动的内容包括：脚本、样式表、插件内容、内联框架、web 字体和 websocket。
https://developer.mozilla.org/zh-CN/docs/Security/MixedContent
火狐：about:config 修改为：security.mixed_content.block_active_content：false
IE：安全-自定义级别-显示混合内容-启用
Google Chrome的启动快键方式加上--allow-running-insecure-content（与前面的内容要有空格）。
"chrome.exe" --allow-running-insecure-content
// -------------------------------------------------------------------------

/ * 高度 * /
function adjustIFramesHeightOnLoad(iframe) {
    var iframeHeight = Math.min(iframe.contentWindow.window.document.documentElement.scrollHeight,
        iframe.contentWindow.window.document.body.scrollHeight);
    $(iframe).height(iframeHeight);
}

<iframe src="init.jsp" id="c-c-iframe" name="c-c-iframe" width="500px;" frameborder="0" scrolling="no" marginwidth="0" marginheight="0">
</iframe >

$(function() {
    $("#c-c-iframe").load(function() {
        $(this).height($(this).contents().find("#content").height() + 40);
    });
});

--------------------------
http://www.cnblogs.com/duankaige/archive/2012/09/20/2695012.html
iframe的调用包括以下几个方面：（调用包含html dom，js全局变量，js方法）

主页面调用iframe；
iframe页面调用主页面；
主页面的包含的iframe之间相互调用；

跨域是不能获取iframe内节点的。

主要知识点
1：document.getElementById("ii").contentWindow 得到iframe对象后，就可以通过contentWindow得到iframe包含页面的window对象，然后就可以正常访问页面元素了；

2：$("#ii")[0].contentWindow  如果用jquery选择器获得iframe，需要加一个【0】；

3：$("#ii")[0].contentWindow.$("#dd").val() 可以在得到iframe的window对象后接着使用jquery选择器进行页面操作;

4：$("#ii")[0].contentWindow.hellobaby="dsafdsafsdafsdafsdafsdafsadfsadfsdafsadfdsaffdsaaaaaaaaaaaaa"; 可以通过这种方式向iframe页面传递参数，在iframe页面window.hellobaby就可以获取到值，hellobaby是自定义的变量；

5：在iframe页面通过parent可以获得主页面的window，接着就可以正常访问父亲页面的元素了；

6：parent.$("#ii")[0].contentWindow.ff; 同级iframe页面之间调用，需要先得到父亲的window，然后调用同级的iframe得到window进行操作；

$(iframe, window.top.document).contents().find('body')[0].scrollHeight

$(iframe.contentWindow.document).height()

$(iframe.contentWindow.document.body).height()

iframe = $("<iframe src='javascript:false;' name='" + name +
            "' id='" + name + "' style='display:none'></iframe>");
iframe.one("load", function() {
    var doc = this.contentWindow ? this.contentWindow.document : (this.contentDocument ? this.contentDocument : this.document);
    var root = doc.documentElement ? doc.documentElement : doc.body;
    var textarea = root.getElementsByTagName("textarea")[0],
---------------------------------

-------------------------------------------------
自适应IFRAME高度 - jquery.cvautoheight.js

适用范围：

1.被嵌套的IFRAME内容可控制，因为该脚本就是运行在被嵌套的IFRAME中。

2.内容会根据操作实时变化的，比如说动态增加了数据。

3.不支持跨域。

 参数：
iframeid: '',       //父窗口中嵌套的IFRAME的ID，必要参数
container: '',     //用来获取高度的容器，可以是#ID，也可以是唯一的.Class，默认为整个document
timer: 0,           //循环间隔，适用于IFRAME内容会发生改变的情况，默认不循环
speed: 500       //动画时长，指撑开IFRAME时的平滑动作

经测试，循环自适应没有出现CPU或者内存疯长的问题。

实现：

//因为要读取父窗口的ID，所以无法跨域使用。
var iframe = parent.document.getElementById(param.iframeid);
if(iframe != null){
var subWeb = parent.document.frames ? parent.document.frames[param.iframeid].document : iframe.contentDocument;

var autoHeight = function(){
    if (iframe != null && subWeb != null) {
        //获取被嵌套IFRAME内容的高度
        var finalHeight = $(param.container).height();
        //平滑展开内容
        $(iframe).animate({ height: finalHeight }, param.speed);
    }
};

//循环自适应高度
if(param.timer > 0){
    setInterval(autoHeight, param.timer);
}
------------------------------------
bgiframe 插件用来轻松解决 IE6 z-index 的问题，如果网页上有浮动区块和下拉选单重叠时，在IE6会看到下拉选框总是把浮动区块覆盖住，无论怎么调整 z-index 都是没用的，而用 bgiframe 就可以轻松解决这个问题。

使用方法：

$(document).ready(function() {
  $('#floatingBox').bgiframe();
});

// 2019-08-06
X-Frame-Options 响应头
注意: CSP Level 2 规范中的 frame-ancestors 指令会替代这个非标准的 header。CSP 的 frame-ancestors 会在 Gecko 4.0 中支持，但是并不会被所有浏览器支持。然而 X-Frame-Options 是个已广泛支持的非官方标准，可以和 CSP 结合使用。
X-Frame-Options HTTP 响应头是用来给浏览器指示允许一个页面可否在 frame , iframe 或者 object 中展现的标记。网站可以使用此功能，来确保自己网站的内容没有被嵌到别人的网站中去，也从而避免了点击劫持 (clickjacking) 的攻击。

X-Frame-Options 有三个值:

DENY
表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。
SAMEORIGIN
表示该页面可以在相同域名页面的 frame 中展示。
ALLOW-FROM uri
表示该页面可以在指定来源的 frame 中展示。
换一句话说，如果设置为 DENY，不光在别人的网站 frame 嵌入时会无法加载，在同域名页面中同样会无法加载。另一方面，如果设置为 SAMEORIGIN，那么页面就可以在同域名页面的 frame 中嵌套。
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options这个页面写了通过Nginx和iis和Apache来解决这个问题
但是在我们平时的开发中可以通过设置header的值来解决这个问题

response.setHeader("X-Frame-Options", "SAMEORIGIN");// 解决IFrame拒绝的问题

https://www.baidu.com/link?url=CcYHVbdrXFUaUTFIxUXsIr_WY9i7cQEk0ewZxAngGzLfv63_W3yHSU848ay-2DuNlfktWiY0mpV8mxUZfKEby0EQT-bM9NnEDYcNbJAiTw3&wd=&eqid=fb4c067a00128a6d000000055d4a4780
https://www.cnblogs.com/Wayou/p/intro_to_content_security_policy.html
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors
child-src  与 frame-ancestors  看起来比较像。前者规定的是页面中可加载哪些 iframe，后者规定谁可以以 iframe 加载本页。 比如来自不同站点的两个网页 A 与 B，B，B 中有 iframe 加载了 A。那么

A 的 frame-ancestors 需要包含 B
B 的 child-src 需要包含 A