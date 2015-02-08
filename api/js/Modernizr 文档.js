Modernizr 文档

以后统一采用Html5文档类型。

meta X-UA-Compatible标签可以指定IE8以上版本浏览器以最高级模式渲染文档，同时如果已经安装Google Chrome Frame则直接使用Chrome Frame渲染。而指定渲染模式的meta X-UA-Compatible标签同样需要优先出现 ：

<meta charset="utf-8"> 
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
<title></title> 

<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]--> 
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]--> 
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]--> 
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]--> 

应用程序 - Local Storage、Indexed DB还有File API都会对应用程序编写有用。
游戏制作 - Canvas、WebGL适用于游戏制作。Web Sockets对网游特别是MMORPG类游戏很重要。
移动网络 -  就移动网络而言，geolocation API等Device API适用于制作地图、团购类网站。
网页编写 - 对传统信息类网站而言，Semantics和CSS3最为重要。

如果是一个主要面向移动设备，则主要将jQuery换成了Zepto.js，以适应移动设备。

一句忠告

Modernizr 是一个强大而有用的工具，但是这并不意味着你就应该使用它。 并不是在所有情形下均必须使用 Modernizr 给浏览器提供多种样式。 如果你主要关注的对象是 Internet Explorer，那么考虑使用IE conditional comments。 你也可以使用CSS层叠覆盖一些样式。 例如，先使用hexadecimal color，然后使用 rgba() 或 hsla() 覆盖它。 旧版本的浏览器会使用第一个值并且忽略第二个值。

Modernizr 真正地变成现实是当它与 polyfills 和其它 JavaScript 相结合的时候。但是记住，通常很容易创建属于你自己的适合支持功能的测试。例如，下面就是你测试某个浏览器是否支持 required 属性的全部代码（代码位于required_nomodernizr.html 中）：
var elem = document.createElement('input'); if (typeof elem.required != 'boolean') { // required is not supported }

----------------------------------------------------------------------
----------------------------------------------------------------------
http://yepnopejs.com/
Modernizr.load：
检测浏览器是否包含geolocation特性，如果有则加载geo.js脚本，没有则加载geo-polyfill.js

Modernizr.load({
  test: Modernizr.geolocation,
  yep : 'geo.js',
  nope: 'geo-polyfill.js'
});
-----------------------------------
// Give Modernizr.load a string, an object, or an array of strings and objects
装入所有的检测补丁
Modernizr.load([
  {
    // 需要检测的特性列表通过&&分隔
    test : Modernizr.fontface && Modernizr.canvas && Modernizr.cssgradients,
    // 如果没有，则装入下面的脚本和样式
    nope : ['presentational-polyfill.js', 'presentational.css']
  },
  // Functional polyfills 功能性补丁
  {
    // 判断是否存在websockets 和 JSON
    test : Modernizr.websockets && window.JSON,
    // 没有 socket-io.js and json2.js
    nope : 'functional-polyfills.js',
    // 不管有没有，都装入下面的脚本
    both : [ 'app.js', 'extra.js' ],
    complete : function () {
      // 此组的所有都加载完毕后执行
      myApp.init();
    }
  },
  // 然后就可以运行你自己的脚本了，如下
  'post-analytics.js'
]);

yepnope({
  test: Modernizr.geolocation,
  yep: {
    'rstyles': 'regular-styles.css'
  },
  nope: {
    'mstyles': 'modified-styles.css',
    'geopoly': 'geolocation-polyfill.js'
  },
  callback: function (url, result, key) {
    if (key === 'geopoly') {
      alert('This is the geolocation polyfill!');
    }
  }
});
yepnope({
  test: Modernizr.geolocation,
  yep: {
    'rstyles': 'regular-styles.css'
  },
  nope: {
    'mstyles': 'modified-styles.css',
    'geopoly': 'geolocation-polyfill.js'
  },
  callback: {
    'rstyles': function (url, result, key) {
      alert('This is the regular styles!');
    },
    'mstyles': function (url, result, key) {
      alert('This is the modified styles!');
    },
    'geopoly': function (url, result, key) {
      alert('This is the geolocation polyfill!');
    }
  }
});
-----------------------------------
Modernizr.load([
  {
    // 装入远程脚本
    load: '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js',
    complete: function () {
      if ( !window.jQuery ) {
        // 如果load 完后，没有获得远程脚本，那么就装入本地脚本代替，嵌套的 load
            Modernizr.load('js/libs/jquery-1.7.1.min.js');
      }
    }
  },
  {
    // 等上面的脚本加载完毕以后， 才能执行（装入）下面的，即依赖加载（加载插件等）。
    load: 'needs-jQuery.js'
  }
]);



----------------------------------------------------------------------
----------------------------------------------------------------------
CSS3：
Feature             Modernizr JS object property / CSS classname
@font-face          fontface
background-size     backgroundsize
border-image        borderimage
border-radius       borderradius
box-shadow          boxshadow
Flexible Box Model  flexbox

/* 边线模拟阴影， 在不支持阴影的浏览器中，通过边线代替。写法上有两种1: */
.box {
   border-bottom: 1px solid #666;
   border-right: 1px solid #777;
}
.boxshadow div.box {
   border: none;
   -webkit-box-shadow: #666 1px 1px 1px;
      -moz-box-shadow: #666 1px 1px 1px;
               box-shadow: #666 1px 1px 1px;
}
-----------------------------------
hsla()      hsla
.my_container {  /* no .hsla use necessary! */
   background-color: #ccc; /* light grey fallback */
   background-color: hsla(0, 0%, 100%, .5); /* white with alpha */
}
-----------------------------------
Multiple backgrounds        multiplebgs
opacity                     opacity
rgba()                      rgba
text-shadow                 textshadow
-----------------------------------
.glowy { /* 幽灵字符，带阴影的字符 */
    color: transparent;
    text-shadow: 0 0 10px black;
}
.no-textshadow {
    // 没有阴影则直接用黑色代替。
    color: black;
}
-----------------------------------
CSS Animations          cssanimations
CSS Columns             csscolumns
Generated Content (:before/:after)      generatedcontent
CSS Gradients           cssgradients （ 渐变 ）
没渐变特征或无脚本支持情况下用图代替
.no-js .glossy,
.no-cssgradients .glossy {
    background: url("images/glossybutton.png");
}
有渐变特性则用
.cssgradients .glossy {
    background-image: linear-gradient(top, #555, #333);
}
-----------------------------------
CSS Reflections         cssreflections
CSS 2D Transforms       csstransforms
CSS 3D Transforms       csstransforms3d
CSS Transitions         csstransitions
----------------------------------------------------------------------
----------------------------------------------------------------------
HTML5：
applicationCache    applicationcache
Canvas              canvas
if Modernizr.canvas tests false, you may want to load FlashCanvas or excanvas.

Canvas Text         canvastext
Drag and Drop       draganddrop
hashchange Event    hashchange
History Management  history
HTML5 Audio         audio
var audio = new Audio();
audio.src = Modernizr.audio.ogg ? 'background.ogg' :
            Modernizr.audio.mp3 ? 'background.mp3' :
                                  'background.m4a';
audio.play();
HTML5 Video         video
-----------------------------------
IndexedDB   indexeddb

Input Attributes：
autocomplete, autofocus, list, placeholder, max, min, multiple, pattern, required, step

Input Types：
search, tel, url, email, datetime, date, month, week, time, datetime-local, number, range, color
-----------------------------------
localStorage            localstorage
Cross-window Messaging  postmessage
sessionStorage          sessionstorage
Web Sockets             websockets
Web SQL Database        websqldatabase
Web Workers             webworkers

----------------------------------------------------------------------
----------------------------------------------------------------------
mq() 媒体查询测试

如果老的浏览器如(eg. oldIE) the mq() will always return false;
A max-width or orientation query will be evaluated against the current state, which may change later.
You should specify the media type, though commonly the all type is good enough:
Modernizr.mq('only all and (max-width: 400px)')
You must specify values. Eg. If you are testing support for the min-width media query use:
Modernizr.mq('(min-width: 0px)')
If you are testing solely for Media Query support itself, use:
Modernizr.mq('only all'); // true if MQ are supported, false if not
Sample usage:

Modernizr.mq('only screen and (max-width: 768px)')  // true
----------------------------------------------------------------------
插件添加：
addTest() Plugin API
JavaScript method:
Modernizr.addTest(str, fn)
Modernizr.addTest(str, bool)
Modernizr.addTest({str: fn, str2: fn2})
Modernizr.addTest({str: bool, str2: fn})

// Test for <track> element  support
Modernizr.addTest('track', function(){
  var video = document.createElement('video');
  return typeof video.addTextTrack === 'function'
});
假如上面测试通过, 将加入一个 .track类到 HTML 元素，并且 Modernizr.track will be true. IE6, of course, will now have a .no-track class.


----------------------------------------------------------------------
----------------------------------------------------------------------
http://github.com/h5bp/html5-boilerplate/
http://www.ibm.com/developerworks/cn/web/wa-html5boilerplate/
目录结构
每当我开始一个项目时，我都首先调整文件夹结构。现有结构没有任何错误：我只是喜欢将所有静态资产（脚本、flash 元素、图像、样式表）放置到一个名为 _assets 的顶级目录中。这样做将保持一个更整洁的根目录，将那些经常被引用的元素推到文件窗口中的目录树的顶端。除此之外，我还在 CSS 文件夹中添加两个子目录，分别用于 Web 字体和 CSS 图像。由于以前处理过许多将图像用作内容的站点，我喜欢将内容图像和界面图像分离开来，这就需要新建两个文件夹。


----------------------------------------------------------------------
----------------------------------------------------------------------
Respond.js
A fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more)
https://github.com/scottjehl/Respond

WARNING: Including @font-face rules inside a media query will cause IE7 and IE8 to hang during load. To work around this, place @font-face rules in the wide open, as a sibling to other media queries.

-