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
DOM方法：
父窗口操作IFRAME：
window.frames["iframeSon"].document
IFRAME操作父窗口: window.parent.document

jquery方法:
在父窗口中操作 选中IFRAME中的所有输入框： 
$(window.frames["iframeSon"].document).find(":text");
在IFRAME中操作 选中父窗口中的所有输入框：
$(window.parent.document).find(":text");

1、 内容里有两个ifame
<iframe id="leftiframe"></iframe> 
<iframe id="mainiframe"></iframe>

leftiframe中jQuery改变mainiframe的src代码： 
$("#mainframe",parent.document.body).attr("src","http://www.radys.cn")

2、 如果内容里面有一个ID为mainiframe的ifame 
<iframe id="mainifame"></ifame> 
ifame包含一个someID 
<div id="someID">you want to get this content</div> 
得到someID的内容

$("#mainiframe").contents().find("someID").html() 
$("#mainiframe").contains().find("someID").text()
---------------------------------
window.frames["frameName"];
window.frames.frameName
window.frames[index]
2．子框架到父框架的引用
每个window对象都有一个parent属性，表示它的父框架。如果该框架已经是顶层框架，则window.parent还表示该框架本身。

3．兄弟框架间的引用
可以通过父框架来实现互相引用，

4．不同层次框架间的互相引用
框架的层次是针对顶层框架而言的。当层次不同时，只要知道自己所在的层次以及另一个框架所在的层次和名字，利用框架引用的window对象性质，可以很容易地实现互相访问，例如：

self.parent.frames["childName"].frames["targetFrameName"];

5．对顶层框架的引用

和parent属性类似，window对象还有一个top属性。它表示对顶层框架的引用，这可以用来判断一个框架自身是否为顶层框架，例如：

//判断本框架是否为顶层框架
if(self==top){
//dosomething
} 
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