
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
/ * 透明iframe * /
.shade-iframe { filter: alpha(opacity=0); opacity: 0; z-index: 1; }

/ * 高度 * /
function adjustIFramesHeightOnLoad(iframe) { 
    var iframeHeight = Math.min(iframe.contentWindow.window.document.documentElement.scrollHeight, iframe.contentWindow.window.document.body.scrollHeight); 
    $(iframe).height(iframeHeight); 
} 

<iframe src="init.jsp" id="c-c-iframe" name="c-c-iframe" width="500px;" frameborder="0" scrolling="no" marginwidth="0" marginheight="0"></iframe >

$(function() {
    $("#c-c-iframe").load(function() {
        $(this).height($(this).contents().find("#content").height() + 40);
    });
});

$(function() {
    $("#workArea").load(function() {
        var height = $(this).contents().find("#box").height() + 40;
        //这样给以一个最小高度 
        $(this).height(height < 400 ? 400 : height);
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

iframe框架的HTML：<iframe src="test.html" id="iframeSon" width="700″ height="300″ frameborder="0″ scrolling="auto"></iframe>

1.在父窗口中操作 选中IFRAME中的所有单选钮
$(window.frames["iframe1"].document).find("input[@type='radio']").attr("checked","true");

2.在IFRAME中操作 选中父窗口中的所有单选钮
$(window.parent.document).find("input[@type='radio']").attr("checked","true");

iframe框架的：
<iframe src="test.html" id="iframe1″ width="700″ height="300″ frameborder="0″ scrolling="auto"></iframe>

$("#testId", document.frames("iframename").document).html();
根据iframename取得其中ID为"testId"元素

$(window.frames["iframeName"].document).find("#testId").html()
作用同上

1、 内容里有两个ifame
<iframe id="leftiframe"...</iframe> 
<iframe id="mainiframe..</iframe>

leftiframe中jQuery改变mainiframe的src代码： 
$("#mainframe",parent.document.body).attr("src","http://www.radys.cn")

2、 如果内容里面有一个ID为mainiframe的ifame 
<iframe id="mainifame"...></ifame> 
ifame包含一个someID 
<div id="someID">you want to get this content</div> 
得到someID的内容

$("#mainiframe").contents().find("someID").html() html 或者 $("#mainiframe").contains().find("someID").text()值
---------------------------------
一个页面中的所有框架以集合的形式作为window 对象的属性提供，例如：window.frames就表示该页面内所有框架的集合，这和表单对象、链接对象、图片对象等是类似的，不同的是，这些集合是 document的属性。因此，要引用一个子框架，可以使用如下语法：

window.frames["frameName"];

window.frames.frameName

window.frames[index]
2．子框架到父框架的引用

每个window对象都有一个parent属性，表示它的父框架。如果该框架已经是顶层框架，则window.parent还表示该框架本身。

3．兄弟框架间的引用

如果两个框架同为一个框架的子框架，它们称为兄弟框架，可以通过父框架来实现互相引用，例如一个页面包括2个子框架：

<frameset rows="50%,50%">

<frame src="1.html" name="frame1" />

<frame src="2.html" name="frame2" />

</frameset>

在frame1中可以使用如下语句来引用frame2：

self.parent.frames["frame2"];

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