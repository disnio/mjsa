var myAppModule = angular.module('myApp',[],
  function ($interpolateProvider) {
    $interpolateProvider.startSymbol('<[');
    $interpolateProvider.endSymbol(']>');
  });
{{ }} to <[ ]> for the current Angular app.
--------------------------------------------------
控制器组织：
var app = angular.module('angularjs-starter', []);
app.controller('ParentCtrl ', function($scope) {
  // methods to be inherited by all controllers
  // go here
});
app.controller('ChildCtrl', function($scope, $controller) {
  // this call to $controller adds the ParentCtrl's methods
  // and properties to the ChildCtrl's scope
  $controller('ParentCtrl', {$scope: $scope});
  // ChildCtrl's methods and properties go here
});
When you inject a service into an application, the $inject service first looks to check 
if an instance of the service already exists. If it does, the $inject service returns the 
existing instance. If it does not, the $inject service creates a new instance of the 
service and returns it.

constant methods which is best used to define a primitive value or object 
that will never change and needs to be made available for use by a module .s config method. 

The difference is that the primitive values and objects created using the value method 
can be changed. Another difference is that the singletons created using the value 
method cannot be used by a module.s config method. 

If you need to configure your service before instantiating it, using the 
provider method is the best way to define your service.

To review, use the constant method if you need to define values that will not change 
over the course of your application. Use the value method if you need to define values 
or models that will change over the course of your application. The service method 
should be used if you define your services as a class and need to invoke the definition.s 
constructor function. Use the factory method if you define your service as an object 
instance and do not need to invoke a constructor. Finally, if you need to configure your 
service in a module.s config method, use the provider method.
--------------------------------------

angular.module('myApp', ['myApp.directives']);
angular.module('myApp.directives', []);

At the time of writing, when developing for Internet Explorer 8 & 9 
browsers, the ng-app directive must be declared twice if you attach it 
to the html node. In addition to using the attribute to declare which 
module to use, you must also add the id tag of "ngApp", otherwise IE 
won.t notice it during the bootstrap process.
<input ng-model="data.property" autocomplete-input />
angular.directive('autocompleteInput', function () {
  return {
    require : 'ngModel', // ?|^
    link : function ($scope, $element, $attrs, ngModel) {
      ngModel.$render = function () {
        $element.val(ngModel.$viewValue || '');
      };
      $element.autocomplete({
        … //Define source, etc
        select : function (ev, ui) {
          $scope.$apply(function() {
            ngModel.$setViewValue(ui.item.value);
          });
        }
      });
    }
  }
});
-----------------------------------------------------------------------------------------
Angular（1.3.0） 开始减少了对IE8的支持。

1、IE浏览器不希望元素名以ng开头：因为它会认为这个前缀是一个XML命名空间。IE浏览器会忽略这些元素，
除非这些元素有一个正确的命名空间声明：
<!doctype html> 
<html xmlns:ng="http://angularjs.org"> 
<head> 
<!--[if lte IE 8] 
<script src="lib/json2.js"></script>
<script src="lib/angular-ui-ieshiv.js"></script> 
<script> 
    window.myCustomTags = ['myDirective']; 
    document.createElement('ng-view'); 
    // 其他自定义元素 
</script> 
<![endif]--> 
</head> 
<body> 
使用属性（attribute）形式的指令，这样就无需创建自定义元素来支持IE：
<div data-ng-view></div> 

2、为了AngularJS能在IE7及更早版本中工作，还需要一个JSON.stringify  polyfill 。可以使用JSON3  或者JSON2 实现。 

3、为了在IE中使用 ng-app 指令，还要设置元素的id为ng-app。 
<body id="ng-app" ng-app="myApp"> 

4、还可以利用angular-ui-utils 库的 ie-shiv 模块帮助我们在DOM中提供自定义元素。
这个shiv允许我们在全局作用域上添加自定义指令，它会为IE创建适当的声明。

polyfill：用来添加一些原生功能支持的功能。一个polyfill是一段代码(或者插件),提供了那些开发者们希望浏览器原生提供支持的功能.

shim：是一个库,它将一个新的API引入到一个旧的环境中,而且仅靠旧环境中已有的手段实现.
es5-shim是一个shim,而不是polyfill.因为它是在ECMAScript 3的引擎上实现了ECMAScript 5的新特性,而且在Node.js上和在浏览器上有完全相同的表现(译者注:作者的意思是因为它能在Node.js上使用,不光浏览器上,所以它不是polyfill).

根据 Modernizr 网站的说法，polyfill 是“在旧版浏览器上复制标准 API 的 JavaScript 补充”。“标准API”指的是 HTML5 技术或功能，例如 Canvas。“JavaScript补充”指的是可以动态地加载 JavaScript 代码或库，在不支持这些标准 API 的浏览器中模拟它们。例如，geolocation（地理位置）polyfill 可以在 navigator 对象上添加全局的 geolocation 对象，还能添加 getCurrentPosition 函数以及“坐标”回调对象，所有这些都是 W3C 地理位置 API 定义的对象和函数。因为 polyfill 模拟标准 API，所以能够以一种面向所有浏览器未来的方式针对这些 API 进行开发，最终目标是：
一旦对这些 API 的支持变成绝对大多数，则可以方便地去掉 polyfill，无需做任何额外工作。

-----------------------------------------
5、常见的浏览器里，IE是唯一缓存XHR请求的。
为了避免这一缺陷，可以在HTTP响应头中设置Cache-Control值为no-cache。 
可以像这样修改每个请求的默认HTTP头： 
.config(function($httpProvider) { 
    $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache'; 
});
------------ 
6、以让Google处理应用索引。常见的做法是使用后端程序为你的Angular应用提供服务。
Google和其他高级搜索引擎都支持 hashbang 格式的URL，我们可以用它来识别当前要访问的
页面。搜索引擎会将这个URL转换为一个自定义的URL格式，以便服务器可以访问它们。
http://www.ng-newsletter.com/#!/signup/page 
转变为URL： 
http://www.ng-newsletter.com/?+escaped_fragment_=/signup/page 

Google最初编写Ajax采集规范就是为了使用hashbang语法传送URL，这是一个为JS应用程序创建永久链接的原始方法。  

这需要在应用路由中使用hashPrefix（默认的）配置我们的应用： 
angular.module('myApp', []) 
.configure(['$location', function($location) { 
    $location.hashPrefix('!'); 
}]); 

HTML5 路由模式 ：
HTML5  pushState并不以相同的方式工作：它会修改浏览器的URL和历史记录。
为了让Angular应用“欺骗”搜索机器人，可以在header中添加一个简单的元素： 
<meta name="fragment" content="!"> 
这个元素会让Google蜘蛛使用新的爬行规范来抓取你的站点。当它遇到这个标签时，
它会使用?_escaped_fragment=标签重新访问站点，而不是采用标准的抓取站点的方式。

假设要在$location服务中使用HTML5模式，可以像这样设置页面以使用httml5Mode： 
angular.module('myApp', []) 
.configure(['$routeProvider', function($routeProvider) { 
    $routeProvider.html5Mode(true); 
}]); 

查询字符串中有了_escaped_fragment_后，我们可以让后端服务器提供静态的HTML而不是客户端应用。

后端服务器可以检测请求中是否包含_escaped_fragment_字段，如果包含，我们将提供静态HTML而不是纯Angular应用。 
还可以使用代理实现这个功能，比如Apache或者Nginx，或者是一个后端服务。

我们将会使用三种不同的方式演示如何从服务器端交付应用： 
 使用Node/Express中间件； 
 使用Apache重写URL； 
 使用Ngnix代理URL。

// 在你的app.js配置中共享创意 
app.use(function(req, res, next) { 
    var fragment = req.query._escaped_fragment_; 
 
    if(!fragment) return next(); 
 
    // 如果fragment为空，则服务于首页 
    if(fragment === "" || fragment === "/") 
        fragment = "/index.html"; 
 
    // 如果fragment不是以'/'开始的，则将'/'前置插入fragment 
    if(fragment.charAt(0) !== "/") 
        fragment = '/' + fragment; 
 
    // 如果fragment不是以'.html'结尾的，则将它插入fragment中 
    if(fragment.indexOf('.html') == -1) 
        fragment += ".html"; 
 
    // 服务于静态html快照 
    try { 
        var file = __dirname + "/snapshots" + fragment; 
        res.sendfile(file); 
    } catch (err) { 
        res.send(404); 
    } 
}); 
这个中间件认为我们的快照存放在叫做“/snapshots”的顶级目录中，然后会基于请求路径为文件提供服务。 
例如，当请求/时，它会提供index.html；当请求为/about时，它会提供snapshots目录中的about.html。
----------------------------------------------
------------------------------
可以使用mod_rewrite模块来检测路由请求中是否包含_escaped_fragment_查询参数。
要想使用重写机制，需要启用适当的模块： 
$ a2enmod proxy 
$ a2enmod proxy_http 

然后需要重新载入Apache配置： 
$ sudo /etc/init.d/apache2 reload 
可以在站点的虚拟主机配置中，或者位于服务器根目录的.htaccess文件中设置重写规则。 
RewriteEngine On 
Options +FollowSymLinks 
RewriteCond %{REQUEST_URI} ^/$ 
RewriteCond %{QUERY_STRING} ^_escaped_fragment_/?(.*)$ 
RewriteRule ^(.*)$ /snapshots/%1? [NC,L] 
----------------------------------------------------------------------------------
调试：
永远都不应该依靠还在应用程序生命周期内的DOM元素来获取该元素的属性。
这项技术一般都是出于调试的目的才使用的。 

var rootEle = document.querySelector("html"); 
var ele = angular.element(rootEle); 
---
在元素上使用scope()方法时，可以从该元素（或者父元素）上提取它的$scope对象： 
var scope = ele.scope(); 
---
通过使用controller()方法可以提取当前元素（或者父元素）的控制器： 
var ctrl = ele.controller(); 
// 或者 
var ctrl = ele.controller('ngModel'); 
---
通过在被选中的元素上使用injector()方法可以提取当前元素（或者包含它的元素）的注入器。 
var injector = ele.injector(); 
然后可以使用这个注入器在应用内实例化任意Angular对象，比如服务、其他控制器或者任意其他对象。 
---
通过在元素上使用inheritedData()方法可以提取与该元素$scope对象关联的数据。 
ele.inheritedData(); 
这个inheritedData()方法就是Angular在作用域链中查找数据的方式，它会遍历DOM直到找到一个特定的值或者直到找到最顶层的作用域。 

Chrome：，可以使用开发者工具提供的一些快捷方式。比如要简单地
查找你所感兴趣的元素，只需在浏览器中右击，然后选择审查元素。这个元素
本身存储在一个叫做$0的变量中，然后你可以通过调用angular.element($0)
的方式提取被Angular化的元素。 


----------------------------------------------------------------------------------
编译器：是AngularJS提供的一项服务，它通过遍历DOM来查找和它相关的属性.
编译： 遍历DOM并且收集所有的相关指令，生成一个链接函数。
链接： 给指令绑定一个作用域，生成一个动态的视图。
作用域模型的任何改变都会反映到视图上，并且视图上的任何用户操作也都会反映到作用域模型。
这使得作用域模型成为你的业务逻辑里唯一要关心的东西。

指令：是“当关联的HTML结构进入编译阶段时应该执行的操作”。
编译器编译到相关DOM时需要执行的函数。
http://www.angularjs.cn/category/docs/api

启动：
    浏览器载入HTML，然后把它解析成DOM。
    浏览器载入angular.js脚本。
    AngularJS等到DOMContentLoaded事件触发。
    AngularJS寻找ng-app指令，这个指令指示了应用的边界。
    使用ng-app中指定的模块来配置注入器($injector)。
    注入器($injector)是用来创建“编译服务($compile service)”和“根作用域($rootScope)”的。
    编译服务($compile service)是用来编译DOM并把它链接到根作用域($rootScope)的。
    ng-init指令将“World”赋给作用域里的name这个变量。
    通过{{name}}的替换，整个表达式变成了“Hello World”。

执行期：
Javascript的执行被分成原始部分和拥有AngularJS执行上下文的部分。
使用 $apply() 从普通Javascript上下文进入AngularJS执行上下文。
只有使用自定义的事件回调或者是第三方类库的回调时，才需要自己执行$apply。

    1、通过调用 scope.$apply(stimulusFn)来进入AngularJS的执行上下文，这里的stimulusFn是你希望在AngularJS执行上下文中执行的函数。
    2、AngularJS会执行stimulusFn()，这个函数一般会改变应用的状态。
    3、AngularJS进入$digest循环。这个循环是由两个小循环组成的，这两个小循环用来处理$evalAsync队列和$watch列表。这个$digest循环直到模型“稳定”前会一直迭代。这个稳定具体指的是$evalAsync对表为空，并且$watch列表中检测不到任何改变了。
    4、这个$evalAsync队列是用来管理那些“视图渲染前需要在当前栈框架外执行的操作的”。这通常使用 setTimeout(0)来完成的。用setTimeout(0)会有速度慢的问题。并且，因为浏览器是根据事件队列按顺序渲染视图的，还会造成视图的抖动。
    5、$watch列表是一个表达式的集合，这些表达式可能是自上次迭代后发生了改变的。如果有检测到了有改变，那么$watch函数就会被调用，它通常会把新的值更新到DOM中。
    6、一旦AngularJS的$digest循环结束，整个执行就会离开AngularJS和Javascript的上下文。这些都是在浏览器为数据改变而进行重渲染之后进行的。
    <input ng-model="name">
    <p>Hello {{name}}!</p>

    按下任何一个键(以X键为例)，都会触发一个 input 输入框的keydown事件；
    input 上的指令捕捉到 input 里值得改变，然后调用 $apply("name = 'X';")来更新处于AngularJS执行上下文中的模型；
    AngularJS将 name='X'应用到模型上；
    $digest 循环开始；
    $watch 列表检测到了name值的变化，然后通知 {{name}}变量替换的表达式，这个表达式负责将DOM进行更新；
    AngularJS退出执行上下文，然后退出Javascript上下文中的keydown事件；
    浏览器以更新的文本重渲染视图。

作用域(Scope)：来检测模型的改变和为表达式提供执行上下文的。
它是分层组织起来的，并且层级关系是紧跟着DOM的结构的。

控制器：视图背后的控制代码就是控制器。它的主要工作内容是构造模型，并把模型和回调方法一起发送到视图。
视图可以看做是作用域在模板(HTML)上的“投影(projection)”
作用域是一个中间地带，它把模型整理好传递给视图，把浏览器事件传递给控制器。控制器和模型的分离非常重要。
因为控制器和视图没有直接的调用关系，所以可以使多个视图对应同一个控制器。这对“换肤(re-skinning)”、适配不同设备（比如移动设备和台式机）、测试，都非常重要。

模型：模型就是用来和模板结合生成视图的数据。
视图：它仍然是HTML。浏览器将它解析成DOM， 然后这个DOM会作为输入传递给模板引擎，也就是我们的编译器。编译器查看其中的指令，找到的指令后，会开始监视指令内容中相应的模型。 这样做，就使得视图能“连续地”更新，不需要模板和数据的重新合并。你的模型也就成了你视图变化的唯一动因。
---------------------------------------------------------------------------
指令：“由某个属性、元素名称、css类名出现而导致的行为，或者说是DOM的变化”。
能让你以一种声明式的方法来扩展HTML表示能力。为DOM指定行为，或者改变它。
指令遵循驼峰式命名，如ngBind。指令可以通过使用指定符号转化成链式风格的的名称来调用，特定符号包括 : ,-,_。
可以选择给指令加上前缀，比如“x-”，“data-”来让它符合html的验证规则。
指令可以做为元素名，属性名，类名，或者注释。
指令可以通过很多不同的方式调用，但最后结果都是等效的。

字符串替换式：
在编译期间，编译器会用$interpolate服务去检查文本中是否嵌入了表达式。这个表达式会被当成一个监视器一样注册，并且在 作为$digest循环中的一部分，它会自动更新。

首先浏览器会用它的标准API将HTML解析成DOM。 你需要认清这一点，因为我们的模板必须是可被解析的HTML。这是AngularJS和那些“以字符串为基础而非以DOM元素为基础的”模板系统的区别之处。

DOM的编译是有$compile方法来执行的。 这个方法会遍历DOM并找到匹配的指令。一旦找到一个，它就会被加入一个指令列表中，这个列表是用来记录所有和当前DOM相关的指令的。 一旦所有的指令都被确定了，会按照优先级被排序，并且他们的compile方法会被调用。 指令的$compile()函数能修改DOM结构，并且要负责生成一个link函数（后面会提到）。$compile方法最后返回一个合并起来的链接函数，这是链接函数是每一个指令的compile函数返回的链接函数的集合。

通过调用一步所说的链接函数来将模板与作用域链接起来。这会轮流调用每一个指令的链接函数，让每一个指令都能对DOM注册监听事件，和建立对作用域的的监听。这样最后就形成了作用域的DOM的动态绑定。任何一个作用域的改变都会在DOM上体现出来。
---------------------------------------------------------------------------

模块和注入器：每个AngularJS应用都有一个唯一的注入器。注入器提供一个通过名字查找对象实例的方法。
它将所有对象缓存在内部，所以如果重复调用同一名称的对象，每次调用都会得到同一个实例。
如果调用的对象不存在，那么注入器就会让实例工厂(instance factory)创建一个新的实例。

一个模块就是一种配置注入器实例工厂的方式，我们也称为“提供者(provider)”。
注入器真正强大之处在于它可以用来调用方法和实例化的类型。
这个精妙的特性让方法和类型能够通过注入器请求到他们依赖的组件，而不需要自己加载依赖。
<div ng-controller="ClockCtrl">
  Current time is: {{ time.now }}
</div>

angular.module('test', [])
    .factory('time', function($timeout) {
        var time = {};

        (function tick() {
            time.now = new Date().toLocaleString();
            $timeout(tick, 1000);
        })();
        return time;
    }).controller('ClockCtrl',
        function ClockCtrl($scope, time) {            
            $scope.time = time;
        }
);

Factory method工厂函数：
工厂函数是用来创建指令的。它只会被调用一次：就是当编译器第一次匹配到相应指令的时候。你可以在其中进行任何初始化的工作。调用它时使用的是 $injector.invoke ， 所以它遵循所有注入器的规则。

Directive Definition Object 指令定义对象：
指令定义对象给编译器提供了生成指令需要的细节。这个对象的属性有：

编译函数是用来处理需要修改模板DOM的情况的。

链接函数负责注册DOM事件和更新DOM。
Pre-linking function 在子元素被链接前执行。不能用来进行DOM的变形，以为可能导致链接函数找不到正确的元素来链接。

Post-linking function 所有元素都被链接后执行。可以操作DOM的变形。

Directive Definition Object 指令定义对象
-----------------------------------------------------------------------------------------
指令：

指令定义对象给编译器提供了生成指令需要的细节。这个对象的属性有：

    名称name - 当前作用域的名称，在注册是可选的。

    优先级priority - 当一个DOM上有多个指令时，有会需要指定指令执行的顺序。 这个优先级就是用来在执行指令的compile函数前先排序的。高优先级的先执行。 相同优先级的指令顺序没有被指定谁先执行。

    终端terminal - 如果被设置为true，那么该指令就会在同一个DOM的指令集和中最后被执行。任何其他“terminal”的指令也仍然会执行，因为同级的指令顺序是没有被定义的。

    作用域scope- 如果被定义成：

        那么就会为当前指令创建一个新的作用域。如果有多个在同一个DOM上的指令要求创建新作用域，那么只有一个新的会被创建。 这一创建新作用域的规则不适用于模板的根节点，因为模板的根节点总是会得到一个新的作用域。

        {} 对象哈希 - 那么一个新的“孤立的”作用域就会被创建。这个“孤立的”作用域区别于一般作用域的地方在于，它不会以原型继承的方式直接继承自父作用域。这对于创建可重用的组件是非常有用的，因为可重用的组件一般不应该读或写父作用域的数据。 这个“孤立的”作用域使用一个对象哈希来表示，这个哈希定义了一系列本地作用域属性， 这些本地作用域属性是从父作用域中衍生出来的。这些属性主要用来分析模板的值。这个哈希的键值对是本地属性为键，它的来源为值。

            @ 或 @attr - 将本地作用域成员成员和DOM属性绑定。绑定结果总是一个字符串，因为DOM的属性就是字符串。如果DOM属性的名字没有被指定，那么就和本地属性名一样。比如说<widget my-attr="hello {{name}}"> 和作用域对象: { localName:'@myAttr' }。当name值改变的时候， 作用域中的LocalName也会改变。这个name是从父作用域中读来的（而不是组件作用域）。

            = 或 =expression(表达式) - 在本地作用域属性和父作用域属性间建立一个双向的绑定。如果没有指定父作用域属性名称，那就和本地名称一样。 比如 <widget my-attr="parentModel"> 和作用域对象: { localModel:'=myAttr' }, 本地属性localModel会反映父作用域中parentModel的值。localModel和parentModel的任一方改变都会影响对方。

            & 或 &attr - 提供了一种能在父作用域下执行表达式的方法。如果没有指定父作用域属性名称，那就和本地名称一样。 比如 <widget my-attr="count = count + value">和作用域对象：{ localFn:'increment()' }。本地作用域成员localFn会指向一个increment表达式的函数包装。通常你可以通过这个表达式从本地作用域给父作用域传值， 操作方法是将本地变量名和值得对应关系传给这个表达式的包装函数。比如说，这个表达式是increment(amount)，那么你就可以用调用localFn({amount:22})的方式指定amount的值。

    控制器controller - 控制器的构造对象。这个控制器函数是在预编译阶段被执行的，并且它是共享的，其他指令可以通过它的名字得到（参考依赖属性[require attribute]）。这就使得指令间可以互相交流来扩大自己的能力。会传递给这个函数的参数有：
        $scope - 当前元素关联的作用域。
        $element - 当前元素
        $attrs - 当前元素的属性对象。
        $transclude - 模板链接功能前绑定到正确的模板作用域：function(cloneLinkingFn)。

    请求require - 请求将另一个控制器作为参数传入到当前链接函数。 这个请求需要传递被请求指令的控制器的名字。如果没有找到，就会触发一个错误。请求的名字可以加上下面两个前缀：
        ? - 不要触发错误，这只是一个可选的请求。
        ^ - 没找到的话，在父元素的controller里面也查找有没有。

    限制restrict - EACM中的任意一个之母。它是用来限制指令的声明格式的。如果没有这一项。那就只允许使用属性形式的指令。
        E - 元素名称：<my-directive></my-directive>
        A - 属性： <div my-directive="exp"> </div>
        C - 类名：<div class="my-directive: exp;"></div>
        M - 注释： <!-- directive: my-directive exp -->

    模板template - 将当前的元素替换掉。 这个替换过程会自动将元素的属性和css类名添加到新元素上。更多细节请查考章节“创建widgets”。

    模板templateUrl - 和template属性一样，只不过这里指示的是一个模板的URL。因为模板加载是异步的，所有编译和链接都会等到加载完成后再执行。

    替换replace - 如果被设置成true那么现在的元素会被模板替换，而不是被插入到元素中。

    编译模板transclude - 将元素编译好，使得指令可以开始使用它。一般情况下需要和ngTransclude指令一起使用。 使用嵌入的好处在于链接好书可以获取到预绑定在作用域上的函数。在一个典型的初始化过程中，widget会创建一个孤立的作用域，但是嵌入并不是其中一个子成员，而是这孤立作用域的兄弟成员。这使得widget可以有一个私有的状态，并且嵌入被绑定在父作用于上。
        true - 嵌入指令的内容。
        'element' - 嵌入整个元素，包括优先级较低的指令。

    编译compile - 这就是后面将要讲到的编译函数。
    链接link - 这就是后面将要讲到的链接函数。只有没有提供编译函数时才会用到这个值。
-------------------------------------
<div ng-controller="Controller">
  <my-dialog ng-hide="dialogIsHidden" on-close="hideDialog()">
    Check out the contents, {{name}}!
  </my-dialog>
</div>

angular.module('docsIsoFnBindExample', [])
    .controller('Controller', ['$scope', '$timeout',
        function($scope, $timeout) {
            $scope.name = 'Tobias';
            $scope.hideDialog = function() {
                $scope.dialogIsHidden = true;
                $timeout(function() {
                    $scope.dialogIsHidden = false;
                }, 2000);
            };
        }
    ])
    .directive('myDialog', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
            // 点击 close, 触发 父 on-close 指令, 执行 hideDialog 函数。
                'close': '&onClose'
            },
            templateUrl: 'my-dialog-close.html'
        };
    });

<div class="alert">
  <a href class="close" ng-click="close()">&times;</a>
  <div ng-transclude></div>
</div>   
---------------------------------------
<my-tabs>
    <my-pane title="Hello">
        <h4>Hello</h4>
        <p>Lorem ipsum dolor sit amet</p>
    </my-pane>
    <my-pane title="World">
        <h4>World</h4>
        <em>Mauris elementum elementum enim at suscipit.</em>
        <p><a href ng-click="i = i + 1">counter: {{i || 0}}</a>
        </p>
    </my-pane>
</my-tabs>

<div class="tabbable">
    <ul class="nav nav-tabs">
        <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">
            <a href="" ng-click="select(pane)">{{pane.title}}</a>
        </li>
    </ul>
    <div class="tab-content" ng-transclude></div>
</div>

<div class="tab-pane" ng-show="selected" ng-transclude>
</div>

angular.module('docsTabsExample', [])
    .directive('myTabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                };

                this.addPane = function(pane) {
                    if (panes.length === 0) {
                        $scope.select(pane);
                    }
                    panes.push(pane);
                };
            },
            templateUrl: 'my-tabs.html'
        };
    })
    .directive('myPane', function() {
        return {
            require: '^myTabs',
            restrict: 'E',
            transclude: true,
            scope: {
                //将本地作用域成员和父级controller的 DOM属性绑定。hello, world。代表两个panel
                title: '@'
            },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            templateUrl: 'my-panel.html'
        };
    });

angular.module('docsTabsExample', [])
.directive('myPane', function() {
  return {
    require: ['^myTabs', '^ngModel'],
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope, element, attrs, controllers) {
      var tabsCtrl = controllers[0],
          modelCtrl = controllers[1];

      tabsCtrl.addPane(scope);
    },
    templateUrl: 'my-pane.html'
  };
});

默认情况下，AngularJS将模板生成的HTML代码嵌套在自定义标签<my-directive>内部。

AngularJS允许通过创建新的子作用域或者隔离作用域来解决这个常见问题。 
同之前在当前作用域介绍中介绍的继承作用域（子作用域）不同，隔离作用域同当
前DOM的作用域是完全分隔开的。为了给这个新的对象设置属性，我们需要显式地通
过属性传递数据。

当用如下代码将指令的作用域设置成一个只包含它自己的属性的干净对象时： 
scope: { 
// 错的
    someProperty: "needs to be set" 
} 
实际上创造的是隔离作用域。本质上，意味着指令有了一个属于自己的$scope对象，只能在指令的方法中或指令的模板字符串中使用。
<div my-directive 
    some-property="someProperty with @ binding"> 
</div> 
在作用域对象内部把someProperty值设置为@这个绑定策略。这个绑定策略告诉
AngularJS将DOM中some-property属性的值复制给新作用域对象中的someProperty属性： 
scope: { 
    someProperty: '@' 
}
显式指定绑定的属性名：
scope: { 
    someProperty: '@someAttr' 
} 
在这个例子中，被绑定的属性名是some-attr而不是some-property。

我们用属性将数据从DOM中复制到指令的隔离作用域中： 
<div my-directive 
    my-url="http://google.com" 
    my-link-text="Click me to go to Google"></div> 
 
angular.module('myApp', []) 
.directive('myDirective', function() { 
    return { 
        restrict: 'A', 
        replace: true, 
        scope: { 
            myUrl: '@', //绑定策略 
            myLinkText: '@' //绑定策略 
        }, 
        template: '<a href="{{myUrl}}">' + '{{myLinkText}}</a>' 
    }; 
}); 
----------------
<input type="text" ng-model="theirUrl">
<div my-directive some-attr="theirUrl" my-link-text="Click me to go to Google"></div>

angular.module('ngRouteExample', ['ngRoute'])
.directive('myDirective', function() { 
    return { 
        restrict: 'A', 
        replace: true, 
        scope: { 
            myUrl: '=someAttr', // 经过了修改 
            myLinkText: '@' 
        }, 
        template: '<div><label>My Url Field:</label> <input type="text"ng-model="myUrl" /> <a href="{{myUrl}}">{{myLinkText}}</a> </div>'
    };
});
---------------------------------------------
内置指令：

<input type="text" ng-model="someProperty" placeholder="TypetoEnable"> 
<button ng-model="button" ng-disabled="!someProperty">AButton</button> 
angular.module('myApp', []) 
.run(function($rootScope, $timeout) { 
    $rootScope.isDisabled = true; 
    $timeout(function() { 
        $rootScope.isDisabled = false; 
    }, 5000); 
}); 
ng-readonly 

<label>someProperty = {{someProperty}}</label> 
<input type="checkbox" 
       ng-checked="someProperty" 
       ng-init="someProperty = true" 
       ng-model="someProperty"> 

ng-selected可以对是否出现option标签的selected属性进行绑定： 
<label>Select Two Fish:</label> 
<input type="checkbox" 
       ng-model="isTwoFish"><br/> 
<select> 
  <option>One Fish</option> 
  <option ng-selected="isTwoFish">Two Fish</option> 
</select> 
----------------------
ng-href 和 ng-src都能有效帮助重构和避免错误，因此在改进代码时强烈建议用它们代替原来的href和src属性。 

<!-- 当 href 包含一个 {{expression}}时总是使用 ng-href --> 
<a ng-href="{{ myHref }}">I'm feeling lucky, when I load</a> 
将插值生效的事件延迟两秒，来观察实际的行为： 
angular.module('myApp', []) 
.run(function($rootScope, $timeout) { 
    $timeout(function() { 
        $rootScope.myHref = 'http://google.com'; 
    }, 2000); 
});

AngularJS会告诉浏览器在ng-src对应的表达式生效之前不要加载图像
------------------------------------------------------------------------
在指令中使用子作用域：
ng-app和ng-controller是特殊的指令，因为它们会修改嵌套在它们内部的指令的作用域。
任何具有ng-app属性的DOM元素将被标记为$rootScope的起始点。
通过run方法来访问$rootScope

ng-controller的作用是为嵌套在其中的指令创建一个子作用域，避免将所有操作
和模型都定义在$rootScope上。

模型指的是$scope上保存的包含瞬时状态数据的JavaScript对象。持久化状态的
数据应该保存到服务中，服务的作用是处理模型的持久化。

出于技术和架构方面的原因，绝对不要直接将控制器中的$scope赋值为值类型
对象（字符串、布尔值或数字）。DOM中应该始终通过点操作符.来访问数据。
遵守这个规则将使你远离不可预期的麻烦。

控制器应该尽可能简单。虽然可以用控制器来组织所有功能，但是将业务逻辑
移到服务和指令中是非常好的主意。

JavaScript对象要么是值复制要么是引用复制。字符串、数字和布尔型变量是值
复制。数组、对象和函数则是引用复制。

ng-include：可以加载、编译并包含外部HTML片段到当前的应用中。
跨域资源共享（Cross-Origin Resource Sharing，CORS）和同源规则（Same Origin Policy）
使用ng-include时AngularJS会自动创建一个子作用域。
如果你想使用某个特定的作用域，例如ControllerA的作用域，必须在同一个DOM元素上添加ng-controller ="ControllerA"指令
<div ng-include="/myTemplateName.html" 
     ng-controller="MyController" 
     ng-init="name = 'World'"> 
    Hello {{ name }} 
</div> 

ng-switch：
这个指令和ng-switch-when及on="propertyName"一起使用，
<input type="text" ng-model="person.name"/> 
<div ng-switch on="person.name"> 
    <p ng-switch-default>And the winner is</p> 
    <h1 ng-switch-when="Ari">{{ person.name }}</h1> 
</div> 

ng-view：指令用来设置将被路由管理和放置在HTML中的视图的位置。

ng-if：指令可以完全根据表达式的值在DOM中生成或移除一个元素
ng-if 同no-show和ng-hide指令最本质的区别是，它不是通过CSS显示或隐藏DOM节点，而是真正生成或移除节点。 
所以jq动态加的东西会消失。

ng-repeat：用来遍历一个集合或为集合中的每个元素生成一个模板实例
集合中的每个元素都会被赋予自己的模板和作用域。同时每个模板实例的作用域中都会暴露一些特殊的属性。
 $index：遍历的进度（0...length-1）。 
 $first：当元素是遍历的第一个时值为true。 
 $middle：当元素处于第一个和最后元素之间时值为true。 
 $last：当元素是遍历的最后一个时值为true。 
 $even：当$index值是偶数时值为true。 
 $odd：当$index值是奇数时值为true。 


ng-init：指令用来在指令被调用时设置内部作用域的初始状态。 

{{ }} ，实际上它是ng-bind的简略形式，用这种形式不需要创建新的元素，因此它常被用在行内文本中。 
在屏幕可视的区域内使用{{ }}会导致页面加载时未渲染的元素发生闪烁，用ng-bind 可以避免这个问题。 

<body ng-init="greeting='HelloWorld'"> 
    <p ng-bind="greeting"></p> 
</body> 

还可以在含有{{ }}的元素上使用ng-cloak指令： 
<body ng-init="greeting='HelloWorld'"> 
    <p ng-cloak>{{ greeting }}</p> 
</body> 
ng-cloak指令会将内部元素隐藏，直到路由调用对应的页面时才显示出来。

ng-bind-template：用来在视图中绑定多个表达式。 
<div  
ng-bind-template="{{message}}{{name}}"> 
</div>
This directive is needed since some HTML elements (such as TITLE and OPTION) cannot contain SPAN elements.

ng-model：指令用来将input、select、text area或自定义表单控件同包含它们的作用域中的属性进行绑定。
应该始终用ngModel来绑定$scope上一个数据模型内的属性，而不是$scope上的属性，
这可以避免在作用域或后代作用域中发生属性覆盖。 
例如： <input type="text" ng-model="modelName.someProperty" /> 

ng-show 和 ng-hide：根据所给表达式的值来显示或隐藏HTML元素。
元素的显示或隐藏是通过移除或添加 ng-hide 这个CSS类来实现的。

ng-change：这个指令会在表单输入发生变化时计算给定表达式的值。因为要处理表单输入，这个指令要
和ngModel联合起来使用。 

<div ng-controller="EquationController"> 
    <input type="text" ng-model="equation.x" ng-change="change()" /> 
    <code>{{ equation.output }}</code> 
</div> 

angular.module('ngRouteExample', [])
.controller('EquationController',function($scope) { 
    $scope.equation = {}; 
    $scope.change = function() { 
        $scope.equation.output 
            = parseInt($scope.equation.x) + 2; 
    }; 
});

ng-form：用来在一个表单内部嵌套另一个表单。
这意味着内部所有的子表单都合法时，外部的表单才会合法。这对于用ng-repeat动态创建表单是非常有用的。 
由于不能通过字符插值来给输入元素动态地生成name属性，所以需要将ng-form指令内每组重复的输入字段都包含在一个外部表单元素内。 

要指定提交表单时调用哪个JavaScript方法，使用下面两个指令中的一个。 
 ng-submit：在表单元素上使用。 
 ng-click：在第一个按钮或submit类型（input[type=submit]）的输入字段上使用。

<form name="signup_form" ng-controller="FormController" ng-submit="submitForm()" novalidate>
    <div ng-repeat="field in fields" ng-form="signup_form_input">
        <input type="text" name="dynamic_input" ng-required="field.isRequired" ng-model="field.name" placeholder="{{field.placeholder}}" />
        <div ng-show="signup_form_input.dynamic_input.$dirty && signup_form_input.dynamic_input.$invalid">
            <span class="error" ng-show="signup_form_input.dynamic_input.$error.required">
                The field is required.
            </span>
        </div>
    </div>
    <button type="submit" ng-disabled="signup_form.$invalid">
        Submit All
    </button>
</form>

angular.module('ngRouteExample', [])
.controller('FormController',function($scope) { 
    $scope.fields = [ 
        {placeholder: 'Username', isRequired: true}, 
        {placeholder: 'Password', isRequired: true}, 
        {placeholder: 'Email (optional)', isRequired: false} 
    ]; 
 
    $scope.submitForm = function() { 
        alert("it works!"); 
    }; 
}); 

ng-click：用来指定一个元素被点击时调用的方法或表达式。

ng-select用来将数据同HTML的<select>元素进行绑定。这个指令可以和ng-model以及ng-options指令一同使用，构建精细且表现优良的动态表单。 
ng-options的值可以是一个内涵表达式（comprehension  expression），其实这只是一种有趣的说法，简单来说就是它可以接受一个数组或对象，并对它们进行循环，将内部的内容提供给
select标签内部的选项。

<div ng-controller="CityController"> 
    <select ng-model="city" 
    ng-options="city.name for city in cities"> 
        <option value="">Choose City</option> 
    </select> 
    Best City: {{ city.name }} 
</div> 
.controller('CityController',function($scope) { 
    $scope.cities = [ 
      {name: 'Seattle'}, 
      {name: 'San Francisco'}, 
      {name: 'Chicago'}, 
      {name: 'New York'}, 
      {name: 'Boston'} 
    ]; 
}); 

ng-submit：用来将表达式同onsubmit事件进行绑定
<form ng-submit="submit()" 
      ng-controller="FormController"> 
    Enter text and hit enter: 
    <input type="text" 
          ng-model="person.name" 
          name="person.name" /> 
    <input type="submit" 
          name="person.name" 
          value="Submit" /> 
    <code>people={{people}}</code> 
    <ul ng-repeat="(index, object) in people"> 
        <li>{{ object.name }}</li> 
    </ul> 
</form> 
 
angular.module('myApp',[]) 
.controller('FormController',function($scope) { 
 
    $scope.person = { 
        name: null 
    }; 
 
    $scope.people = []; 
 
    $scope.submit = function() { 
        if ($scope.person.name) { 
            $scope.people.push({name: $scope.person.name}); 
            $scope.person.name = ''; 
        } 
    }; 
}); 
ng-class：在一个随机数大于5时将.red类添加到一个div上
绑定一个代表所有需要添加的类的表达式。重复
的类不会添加。当表达式发生变化，先前添加的类会被移除，新类会被添加。
<div ng-controller="LotteryController"> 
    <div ng-class="{red: x > 5}" 
        ng-if="x > 5">  
        You won! 
    </div> 
    <button ng-click="x = generateNumber()" 
        ng-init="x = 0"> 
        Draw Number 
    </button> 
    <p>Number is: {{ x }}</p> 
</div>
angular.module('myApp',[]) 
.controller('LotteryController', function($scope) { 
    $scope.generateNumber = function() { 
        return Math.floor((Math.random()*10)+1); 
    }; 
}); 

ng-attr-(suffix) ：
当AngularJS编译DOM时会查找花括号{{  some expression }}内的表达式。这些表达式会
被自动注册到$watch服务中并更新到$digest循环中，成为它的一部分
<svg> 
    <circle ng-attr-cx="{{ cx }}"><circle> 
</svg> 
-------------------------------------------------------------------------------------
指令：
directive() 方法可以接受两个参数： 
1. name（字符串） 
指令的名字，用来在视图中引用特定的指令。 
2. factory_function （函数） 
这个函数返回一个对象，其中定义了指令的全部行为。$compile服务利用这个方法返回的对象，在DOM调用指令时来构造指令的行为。 

通过对象来定义是最佳的方式。当返回一个函数时，这个函数通常被称作链接传递（postLink）函数，利用它我们
可以定义指令的链接（link）功能。
由于返回函数而不是对象会限制定义指令时的自由度，因此只在构造简单的指令时才比较有用。 

指令的工厂函数只会在编译器第一次匹配到这个指令时调用一次。和controller函数类似，
我们通过$injetor.invoke来调用指令的工厂函数。 

指令的生命周期开始于$compile方法并结束于link方法。

angular.module('myApp', []) 
.directive('myDirective', function() { 
    return { 
        // 指令在DOM中可以何种形式被声明
        restrict: String, 
        priority: Number, 
        //停止运行当前元素上比本指令优先级低的指令。但同当前指令优先级相同的指令还是会被执行。 
        terminal: Boolean, 
        //必须存在一个根DOM元素
        template: String or Template Function: function(tElement, tAttrs) (...}, 
        // 模 板的URL都 将 通过 AngularJS内 置 的 安全层 ， 特 别是$getTrusted ResourceUrl，这样可以保护模板不会被不信任的源加载。
        // 模板加载是异步的，意味着编译和链接要暂停，等待模板加载完成。 
        //模板加载后，AngularJS会将它默认缓存到$templateCache服务中。在实际生产中，可以提前将模板缓存到一个定义模板的JavaScript文件中，这样就不需要通过XHR来加载模板了。
        templateUrl: String, 
        replace: Boolean or String, 
        //当scope设置为true时，会从父作用域继承并创建一个新的作用域对象。
        //具有隔离作用域的指令最主要的使用场景是创建可复用的组件
        // false :共享； true: 继承； {}：隔离
        scope: Boolean or Object, 
        // 嵌入通常用来创建可复用的组件，典型的例子是模态对话框或导航栏。
        // 我们可以将整个模板，包括其中的指令通过嵌入全部传入一个指令中。这样做可以将任意内容和作用域传递给指令。transclude参数就是用来实现这个目的的，指令的内部可以访问外部指令的作用域，并且模板也可以访问外部的作用域对象。 
        transclude: Boolean, 
        controller: String or function(scope, element, attrs, transclude, otherInjectables) { ... }, 
        controllerAs: String, 
        require: String, 
        link: function(scope, iElement, iAttrs) { ... }, 
        compile: // 返回一个对象或连接函数，如下所示： 
            function(tElement, tAttrs, transclude) { 
                return { 
                    pre: function(scope, iElement, iAttrs, controller) { ... }, 
                    post: function(scope, iElement, iAttrs, controller) { ... } 
                } 
                // 或者 
                return function postLink(...) { ... } 
            } 
    }; 
});

ngRepeat是所有内置指令中优先级最高的，它总是在其他指令之前运行。

scope：
<div ng-controller='MainController'> 
    Outside myDirective: {{ myProperty }} 
    <div my-directive ng-init="myProperty = 'wow, this is cool'"> 
        Inside myDirective: {{ myProperty }} 
    </div> 
</div> 
 
angular.module('myApp', []) 
.controller('MainController', function($scope) { 
}) 
.directive('myDirective', function() { 
    return { 
        restrict: 'A', 
        scope: {}, 
        priority: 100, 
        template: '<div>Inside myDirective {{ myProperty }}</div>' 
    }; 
}); 
false:
Outside myDirective: wow, this is cool
Inside myDirective wow, this is cool

true:
Outside myDirective:
Inside myDirective wow, this is cool

{}:
Outside myDirective: wow, this is cool
Inside myDirective 
--------------------------
<div ng-init="myProperty='wow,thisiscool'"> 
    Surrounding scope: {{ myProperty }} 
    <div my-inherit-scope-directive></div> 
    <div my-directive></div> 
</div> 
angular.module('myApp', []) 
.directive('myDirective', function() { 
    return { 
        restrict: 'A', 
        template: 'Inside myDirective, isolate scope: {{ myProperty }}', 
        scope: {} 
    }; 
}) 
.directive('myInheritScopeDirective', function() { 
    return { 
        restrict: 'A', 
        template: 'Inside myDirective, isolate scope: {{ myProperty }}', 
        scope: true 
    }; 
}); 
Surrounding scope: wow,thisiscool
Inside myDirective, isolate scope: wow,thisiscool
Inside myDirective, isolate scope: 
--------------------------------------------------
指令内部的隔离作用域，同指令外部的作用域进行数据绑定。
@ 符号将本地作用域同DOM属性的值进行绑定。指令内部作用域可以使用外部作用域的变量
=可以将本地作用域上的属性同父级作用域上的属性进行双向的数据绑定。
&符号可以对父级作用域进行绑定，以便在其中运行函数。。意味着对这个值进行设置时会生成一个指向父级作用域的包装函数。 

告诉AngularJS编译器，将它从DOM元素中获取的内容放到它发现 ng-transclude指令的地方。
借助transclusion，我们可以将指令复用到第二个元素上，而无须担心样式和布局的一致性问题。
<div sidebox title="Links"> 
    <ul> 
        <li>First link</li> 
        <li>Second link</li> 
    </ul> 
</div> 
<div sidebox title="TagCloud"> 
    <div class="tagcloud"> 
        <a href="">Graphics</a> 
        <a href="">AngularJS</a> 
        <a href="">D3</a> 
        <a href="">Front-end</a> 
        <a href="">Startup</a> 
    </div> 
</div>
angular.module('ngRouteExample', [])
.directive('sidebox', function() { 
    return { 
        restrict: 'EA', 
        scope: { 
            title: '@' 
        }, 
        transclude: true, 
        template: '<div class="sidebox"> <div class="content"> <h2 class="header">{{ title }}</h2> <span class="content" ng-transclude> </span> </div> </div>'
    };
}); 

--------------
<div ng-controller="ExampleController">
  <input ng-model="title"> <br/>
  <textarea ng-model="text"></textarea> <br/>
  <pane title="{{title}}">{{text}}</pane>
</div>
angular.module('ngRouteExample', [])
   .directive('pane', function(){
      return {
        restrict: 'E',
        transclude: true,
        scope: { title:'@' },
        template: '<div style="border: 1px solid black;">' +
                    '<div style="background-color: gray">{{title}}</div>' +
                    '<ng-transclude></ng-transclude>' +
                  '</div>'
      };
  })
  .controller('ExampleController', ['$scope', function($scope) {
    $scope.title = 'Lorem Ipsum';
    $scope.text = 'Neque porro quisquam est qui dolorem ipsum quia dolor...';
  }]);
<pane title="Lorem Ipsum啊" class="ng-isolate-scope">
    <div style="border: 1px solid black;">
        <div style="background-color: gray" class="ng-binding">Lorem Ipsum啊</div>
        <ng-transclude>
            <span class="ng-binding ng-scope">Neque porro quisquam est qui dolorem ipsum quia dolor...是</span>
        </ng-transclude>
    </div>
</pane> 
---------------------------------------------- 
.directive('myDirective', function() { 
    restrict: 'A', 
    controller: function($scope, $element, $attrs, $transclude) { 
        // 控制器逻辑放在这里 
    } 
});
1. $scope 
与指令元素相关联的当前作用域。 
2. $element 
当前指令对应的元素。 
3. $attrs 
由当前元素的属性组成的对象
4. $transclude 
嵌入链接函数会与对应的嵌入作用域进行预绑定。 
transclude链接函数是实际被执行用来克隆元素和操作DOM的函数。
在控制器内部操作DOM是和AngularJS风格相悖的做法，但通过链接函数就可以实现这个需求。仅在compile参数中使用transcludeFn是推荐的做法。 
例如，我们想要通过指令来添加一个超链接标签。可以在控制器内的$transclude函数中实
现，如下所示： 
angular.module('myApp') 
.directive('link', function() { 
    return { 
        restrict: 'EA', 
        transclude: true, 
        controller:  
            function($scope, $element, $transclude, $log) { 
            $transclude(function(clone) { 
                var a = angular.element('<a>'); 
                a.attr('href', clone.text()); 
                a.text(clone.text()); 
                $log.info("Created new a tag in link directive"); 
                $element.append(a); 
            }); 
        } 
    }; 
}); 
指令的控制器和link函数可以进行互换。控制器主要是用来提供可在指令间复用的行为，但链接函数只能在当前内部指令中定义行为，且无法在指令间复用。
link函数可以将指令互相隔离开来，而controller则定义可复用的行为。

由于指令可以require其他指令所使用的控制器，因此控制器常被用来放置在多个指令间共享的动作。 
如果我们希望将当前指令的API暴露给其他指令使用，可以使用controller参数，否则可以使用link来构造当前指令元素的功能性。
如果我们使用了scope.$watch()或者想要与DOM元素做实时的交互，使用链接会是更好的选择。

$scope会在DOM元素被实际渲染之前传入到控制器中。在某些情况下，
例如使用了嵌入，控制器中的作用域所反映的作用域可能与我们所期望的不一样，这种情况下，$scope对象无法保证可以被正常更新。 

当想要同当前屏幕上的作用域交互时，可以使用被传入到link函数中的scope参数。


controllerAs参数用来设置控制器的别名，可以以此为名来发布控制器，并且作用域可以访问controllerAs。这样就可以在视图中引用控制器，甚至无需注入$scope。

但它给了我们可以在路由和指令中创建匿名控制器的强大能力。这种能力可以将动态的对象创建成为控制器，并且这个对象是隔离的、易于测试的。

例如，可以在指令中创建匿名控制器，如下所示： 
angular.module('myApp') 
.directive('myDirective', function() { 
    return { 
        restrict: 'A', 
        template: '<h4>{{ myController.msg }}</h4>', 
        controllerAs: 'myController', 
        controller: function() { 
            this.msg = "Hello World" 
        } 
    }; 
}); 
---------------------
restrict: 'EA', 
require: 'ngModel' 
//... 
指令定义只会查找定义在指令作当前用域中的ng-model=""。 
<!-- 指令会在本地作用域查找ng-model --> 
<div my-directive ng-model="object"></div> 
require：会将控制器注入到其值所指定的指令中，并作为当前指令的链接函数的第四个参数。
require参数的值可以用下面的前缀进行修饰，这会改变查找控制器时的行为： 
? 
如果在当前指令中没有找到所需要的控制器，会将null作为传给link函数的第四个参数。 
^ 
如果添加了^前缀，指令会在上游的指令链中查找require参数所指定的控制器。 
?^ 
将前面两个选项的行为组合起来，我们可选择地加载需要的指令并在父指令链中进行查找。
如果没有前缀，指令将会在自身所提供的控制器中进行查找，如果没有找到任何控制器（或具有指定名字的指令）就抛出一个错误。
--------------------------------------------------------------------------------
编译：
就是将包含模板的指令和添加行为的指令分离开来。如果一个元素已经有一个含有模板的指令了，
永远不要对其用另一个指令进行修饰。只有具有最高优先级的指令中的模板会被编译。 
------------------
编译后的模板会返回一个叫做模板函数的函数。我们有机会在指令的模板函数被返回前，对编译后的DOM树进行修改。
compile选项本身并不会被频繁使用，但是link函数则会被经常使用。本质上，当我们设置了link选项，实际上是创建了一个postLink()链接函数，以便compile()函数可以定义链接函数。 

如果设置了compile函数，说明我们希望在指令和实时数据被放到DOM中之前进行DOM操作，在这个函数中进行诸如添加和删除节点等DOM操作是安全的。
---
compile和link选项是互斥的。如果同时设置了这两个选项，那么会把compile 所返回的函数当作链接函数，而link选项本身则会被忽略。

如果模板被克隆过，那么模板实例和链接实例可能是不同的对象。因此在编译函数内部，我们只能转换那些可以被安全操作的克隆DOM节点。不要进行DOM事件监听器的注册。这个操作应该在链接函数中完成。 
----
编译函数负责对模板DOM进行转换。 
链接函数负责将作用域和DOM进行链接。

用link函数创建可以操作DOM的指令。

如果我们的指令很简单，并且不需要额外的设置，可以从工厂函数（回调函数）返回一个函数来代替对象。如果这样做了，这个函数就是链接函数。 

angular.module('myApp', []) 
.directive('myDirective', function() { 
    return { 
        link: function(scope, ele, attrs) { 
            return { 
                pre: function(tElement, tAttrs, transclude) { 
            // 在子元素被链接之前执行 
            // 在这里进行Don转换不安全 
            // 之后调用'lihk'h函数将无法定位要链接的元素 
                }, 
                post: function(scope, iElement, iAttrs, controller) { 
                // 在子元素被链接之后执行 
                // 如果在这里省略掉编译选项 
                //在这里执行DOM转换和链接函数一样安全吗 
                } 
            } 
        } 
});
。它会在模板编译并同作用域进行链接后被调用，因此它负责设置事件监听器，监视数据变化和实时的操作DOM。

-------------------------------------------------------------------------------
连接：
如果指令定义中有require选项，函数签名中会有第四个参数，代表控制器或者所依赖的指
令的控制器。 
// require 'SomeController', 
link: function(scope, element, attrs, SomeController) { 
    // 在这里操作DOM，可以访问required指定的控制器 
} 
如果require选项提供了一个指令数组，第四个参数会是一个由每个指令所对应的控制器组
成的数组。
scope 
指令用来在其内部注册监听器的作用域。 
iElement 
iElement参数代表实例元素，指使用此指令的元素。在postLink函数中我们应该只操作此
元素的子元素，因为子元素已经被链接过了。 
iAttrs 
iAttrs参数代表实例属性，是一个由定义在元素上的属性组成的标准化列表，可以在所有指
令的链接函数间共享。会以JavaScript对象的形式进行传递。 
controller 
controller参数指向require选项定义的控制器。如果没有设置require选项，那么
controller参数的值为undefined。
-------------------
ngModel：是一个用法特殊的指令，它提供更底层的API来处理控制器内的数据。

控制器在所有的指令间共享，因此指令可以将控制器当作通信通道（公共API）。
为了访问ngModelController必须使用require设置
angular.module('myApp') 
.directive('myDirective',function(){ 
    return { 
        require: '?ngModel', 
        link: function(scope, ele, attrs, ngModel) { 
            if (!ngModel) return; 
            // 现在我们的指令中已经有ngModelController的一个实例 
        } 
    }; 
}); 
注意，这个指令没有隔离作用域。如果给这个指令设置隔离作用域，将导致内部ngModel无法更新外部ngModel的对应值：AngularJS会在本地作用域以外查询值。

为了设置作用域中的视图值，需要调用ngModel.$setViewValue(value)函数。
value参数是我们想要赋值给ngModel实例的实际值。
这个方法会更新控制器上本地的$viewValue，然后将值传递给每一个$parser函数（包括验证器）。 

当值被解析，且$parser流水线中所有的函数都调用完成后，值会被赋给 $modelValue属性，并且传递给指令中ng-model属性提供的表达式。 
最后，所有步骤都完成后，$viewChangeListeners中所有的监听器都会被调用。

注意，单独调用$setViewValue()不会唤起一个新的digest循环，因此如果想更新指令，需要在设置$viewValue后手动触发digest。 

$setViewValue()方法适合于在自定义指令中监听自定义事件：
angular.module('myApp') 
.directive('myDirective', function() { 
    return { 
        require: '?ngModel', 
        link: function(scope, ele, attrs, ngModel) { 
            if (!ngModel) return; 
 
            $(function() { 
                ele.datepicker({ 
                    onSelect: function(date) { 
                        // 设置视图和调用apply 
                        scope.$apply(function() { 
                            ngModel.$setViewValue(date); 
                        }); 
                    } 
                }); 
            }); 
        } 
    }; 
}); 
---------------------------
<form name="myForm">
    <div contenteditable name="myWidget" ng-model="userContent" strip-br="true" required>Change me!</div>
    <span ng-show="myForm.myWidget.$error.required">Required!</span>
    <hr>
    <textarea ng-model="userContent"></textarea>
</form>
定义$render方法可以定义视图具体的渲染方式。这个方法会在$parser流水线完成后被调用。 
由于这个方法会破坏AngularJS的标准工作方式，因此一定要谨慎使用

angular.module('customControl', ['ngSanitize']).
directive('contenteditable', ['$sce',
    function($sce) {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function() {
                    element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$evalAsync(read);
                });
                read(); // initialize

                // Write data to the model

                function read() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html == '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        };
    }
]);

ngModelController中有几个属性可以用来检查甚至修改视图。 
1. $viewValue 
$viewValue属性保存着更新视图所需的实际字符串。 
2. $modelValue 
$modelValue由数据模型持有。$modelValue和$viewValue可能是不同的，取决于$parser
流水线是否对其进行了操作。 
3. $parsers 
$parsers的值是一个由函数组成的数组，其中的函数会以流水线的形式被逐一调用。
ngModel从DOM中读取的值会被传入$parsers中的函数，并依次被其中的解析器处理。 
这是为了对值进行处理和修饰。
4. $formatters 
$formatters的值是一个由函数组成的数组，其中的函数会以流水线的形式在数据模型的值
发生变化时被逐一调用。它和$parser流水线互不影响，用来对值进行格式化和转换，以便在绑
定了这个值的控件中显示。 
5. $viewChangeListeners 
$viewChangeListeners的值是一个由函数组成的数组，其中的函数会以流水线的形式在视
图中的值发生变化时被逐一调用。通过$viewChangeListeners，可以在无需使用$watch的情况
下实现类似的行为。
------------------------------------------------------------------
加载：
和配置块不同，运行块在注入器创建之后被执行，它是所有AngularJS应用中第一个被执行
的方法。
运行块通常用来注册全局的事件监听器。例如，我们会在.run()块中设置路由事件的监听器
以及过滤未经授权的请求。
angular.module('myApp', []) 
.run(function($rootScope, AuthService) { 
    $rootScope.$on('$routeChangeStart', function(evt, next, current) { 
        // 如果用户未登录 
        if (!AuthService.userLoggedIn()) { 
            if (next.templateUrl === "login.html") { 
                // 已经转向登录路由因此无需重定向 
            } else { 
                $location.path('/login'); 
            } 
        } 
    }); 
});  

-------------------------------------------------------------------
多视图 ：
ng-view：是由ngRoute模块提供的一个特殊指令，作用是在HTML中给$route对应的视图内容占位。 它会创建自己的作用域并将模板嵌套在内部。 
ngView指令遵循以下规则。 
 每次触发$routeChangeSuccess事件，视图都会更新。 
 如果某个模板同当前的路由相关联： 
  创建一个新的作用域； 
  移除上一个视图，同时上一个作用域也会被清除； 
  将新的作用域同当前模板关联在一起； 
  如果路由中有相关的定义，那么就把对应的控制器同当前作用域关联起来； 
  触发$viewContentLoaded事件； 
  如果提供了onload属性，调用该属性所指定的函数。

路由：
when和otherwise两个方法来定义应用的路由。
angular.module('myApp', []). 
    config(['$routeProvider', function($routeProvider) { 
        $routeProvider 
            .when('/', { 
                templateUrl: 'views/home.html', 
                controller: 'HomeController' 
            });  
    }]); 

配置对象中可以进行设置的属性包括controller、template、templateURL、resolve、redirectTo和reloadOnSearch。

controller属性：，那么这个指定的控制器会与路由所创建的新作用域关联在一起。

resolve属性：，AngularJS会将列表中的元素都注入到控制器中。如果这些依赖是
    promise对象，它们在控制器加载以及$routeChangeSuccess被触发之前，会被resolve并设置成一
    个值。 
    列表对象可以是： 
     键，键值是会被注入到控制器中的依赖的名字； 
     工厂，即可以是一个服务的名字，也可以是一个返回值，它是会被注入到控制器中的函
    数或可以被resolve的promise对象。

resolve: { 
    'data': ['$http', function($http) { 
        return $http.get('/api').then( 
            function success(resp) { return response.data; }, 
            function error(reason) { return false; } 
        ); 
    }]; 
} 
resolve会发送一个$http请求，并将data的值替换为返回结果的值。列表中的键 data 会被注入到控制器中，所以在控制器中可以使用它。

如果reloadOnSearch选项被设置为true（默认），当$location.search()发生变化时会重新
加载路由。如果设置为false，那么当URL中的查询串部分发生变化时就不会重新加载路由。这
个小窍门对路由嵌套和原地分页等需求非常有用。 

如果我们在路由参数的前面加上:，AngularJS就会把它解析出来并传递给$routeParams。
如果想要在控制器中访问需要把$routeParams注入进控制器： 
app.controller('InboxController', function($scope,$routeParams) { 
    // 在这里访问$routeParams 
}); 

 $location ： 服务
 $location服务没有刷新整个页面的能力。如果需要刷新整个页面，需要使用$window.location对象

 $location.search(); 
我们可以向这个方法中传入新的查询参数，来修改URL中的查询串部分： 
// 用对象设置查询 
$location.search({name: 'Ari', username: 'auser'}); 
// 用字符串设置查询 
$location.search('name=Ari&username=auser'); 

search方法可以接受两个参数。 
 search（可选，字符串或对象） 
这个参数代表新的查询参数。hash对象的值可以是数组。 
 paramValue（可选，字符串） 
如果search参数的类型是字符串，那么paramValue会做为该参数的值覆盖URL当中的对应值。如果paramValue的值是null，对应的参数会被移除掉。 
-----------------
标签（hashbang）是AngularJS用来同你的应用内部进行链接的技巧。标签模式是HTML5模
式的降级方案，URL路径会以#符号开头。标签模式不需要重写<a href=""></a>标签，也不需
要任何服务器端的支持。如果没有进行额外的指定，AngularJS将默认使用标签模式。
http://yoursite.com/#!/inbox/all 

如果要显式指定配置并使用标签模式，需要在应用模块的config函数中进行配置： 
angular.module('myApp', ['ngRoute']) 
    .config(['$locationProvider', function($locationProvider) { 
        $locationProvider.html5Mode(false); 
        $locationProvider.hashPrefix('!');
    }]); 

另外一种路由模式是html5模式。当浏览器不支持HTML5历史API时，$location服务会自动使用标签模式的URL作为替代方案。 
http://yoursite.com/inbox/all 

当在HTML5模式的AngularJS中写链接时，永远都不要使用相对路径。
另一个选择是在HTML文档的HEAD中用<base>标签来指定应用的基础URL： 
<base href="/base/url" /> 

路由事件 ：
我们需要给路由设置事件监听器，用$rootScope来监听这些事件。 
在路由变化之前会广播$routeChangeStart事件。
angular.module('myApp', []) 
    .run(['$rootScope', '$location', function($rootScope, $location)  { 
        $rootScope.$on('$routeChangeStart', function(evt, next, current) { 
        }); 
    }]); 
$routeChangeStart事件带有两个参数： 
 将要导航到的下一个URL； 
 路由变化前的URL。 

angular.module('myApp', []) 
    .run(['$rootScope', '$location', function($rootScope, $location) { 
        $rootScope.$on('$routeChangeSuccess', function(evt, next, previous) { 
        }); 
    }]); 
$routeChangeStart事件带有三个参数： 
 原始的AngularJS evt对象； 
 用户当前所处的路由； 
 上一个路由（如果当前是第一个路由，则为undefined）。

angular.module('myApp', []) 
    .run(function($rootScope, $location) { 
        $rootScope.$on('$routeChangeError', function(current, previous, rejection) { 
        }); 
    }); 
$routeChangeError事件有三个参数： 
 当前路由的信息； 
 上一个路由的信息； 
 被拒绝的promise的错误信息。 

$routeUpdate ：
AngularJS在reloadOnSearch属性被设置为false的情况下，重新使用某个控制器的实例时，会广播$routeUpdate事件。  

为了在应用的运行过程中给爬虫提供支持，我们需要在头部添加meta标签。这个元标记会让爬虫请求一个带有空的转义片段参数的链接，
服务器根据请求返回对应的HTML代码片段。 
<meta name="fragment" content="!"/>

$location服务不会重新加载整个页面，它只会单纯地改变URL。如果我们想重新加载整个
页面，需要用$window服务来设置地址。 
$window.location.href = "/reload/page"; 

如果我们想要在作用域的生命周期外使用$location服务，必须用$apply函数将变化抛到应用外部。因为$location服务是基于$digest来驱动浏览器的地址变化，以使路由事件正常工作的。 
-----------------------------------------------------------------------------------------
依赖注入：是一种设计模式，它可以去除对依赖关系的硬编码，从而可以在运行时改变甚至移除依赖关系。 
AngularJS使用$injetor（注入器服务）来管理依赖关系的查询和实例化。
事实上，$injetor负责实例化AngularJS中所有的组件，包括应用的模块、指令和控制器等。

通过annotate函数，在实例化时从传入的函数中把参数列表提取出来。

推断式注入声明：
在内部调用
函数对象的toString()方法，分析并提取出函数参数列表，然后通过$injector将这些参数注入进对象实例
injector.invoke(function($http, greeter) {}); 

显式注入声明：
行内注入声明：它同前面提到的通过$inject属性进行注入声明的原理是完全一样的，但允许我们在函数定义时从行内将参数传入。
angular.module('myApp') 
    .controller('MyController', ['$scope', 'greeter', function($scope, greeter) { 
 
    }]);  
$inject 方法：（一般不用）    
annotate()方法的返回值是一个由服务名称组成的数组，这些服务会在实例化时被注入到目
标函数中。
var injector = angular.injector(['ng', 'myApp']); 
injector.annotate(function($q, greeter) {}); 

get()根据名称返回服务的一个实例。 
has() 
instantiate()方法可以创建某个JavaScript类型的实例

invoke()方法会调用方法并从$injector中添加方法参数。 invoke()方法返回fn函数返回的值。 

ngMin：是一个为AngularJS应用设计的预压缩工具，它会遍历整个AngularJS应用并帮助我们设置好依赖注入。
例如，它会将如下代码： 
angular.module('myApp', []) 
.directive('myDirective', function($http) { }) 
.controller('IndexController', function($scope, $q) { 
}); 
转换成下面的形式： 
angular.module('myApp', []) 
.directive('myDirective', ['$http', function ($http) { }]) 
.controller('IndexController', [ '$scope', '$q',function ($scope, $q) {} ]); 

ngMin可以显著减少代码输入的工作量，并保持源文件的整洁。

$ npm install -g ngmin 
如果正在使用Grunt，我们可以安装grunt-ngmin插件。如果正在使用Rails，也可以通过Ruby的包管理工具gem来安装ngmin-rails。
$ ngmin input.js output.js 
#或者 
$ ngmin < input.js > output.js 
input.js是源文件，而 output.js则是转换过注入声明后的输出文件。 

ngMin希望我们的AngularJS源代码只由逻辑定义组成。
---------------------------------------------------------------------------------------
服务：

控制器只会在需要时被实例化，并且不再需要就会被销毁。这意味着每次切换路由或重新加载视图时，当前的控制器会被AngularJS清除掉。 
服务提供了一种能在应用的整个生命周期内保持数据的方法，它能够在控制器之间进行通信，并且能保证数据的一致性。 

服务是一个单例对象，在每个应用中只会被实例化一次（被$injector实例化），并且是延迟加载的（需要时才会被创建）。
服务提供了把与特定功能相关联的方法集中在一起的接口。

服务被注册后，AngularJS编译器就可以引用它，并且在运行时把它当作依赖加载进来。

factory API创建服务，是最常见也是最灵活的方式： 
angular.module('myApp.services', []) 
.factory('githubService', function() { 
    var serviceInstance = {}; 
    // 我们的第一个服务  
    return serviceInstance; 
});
// 用方括号声明工厂 
angular.module('myApp.services', []) 
    .factory('githubService', [function($http) { }]); 

 .factory('githubService', function($http) {
        var githubUrl = 'https://api.github.com';

        var runUserRequest = function(username, path) {
            // 从使用JSONP调用Github API的$http服务中返回promise 
            return $http({
                method: 'JSONP',
                url: githubUrl + '/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
            });
        };
        // 返回带有一个events函数的服务对象 
        return {
            events: function(username) {
                return runUserRequest(username, 'events');
            }, 
            setUsername: function(username) { 
                githubUsername = username; 
            } 
        };
    })
    .controller('ServiceController',
        function($scope, $timeout, githubService) {
            var timeout;
            $scope.$watch('username', function(newUserName) {
                if (newUserName) {
                    // 如果在进度中有一个超时(timeout) 
                    if (timeout) $timeout.cancel(timeout);
                    timeout = $timeout(function() {
                        githubService.events(newUserName)
                            .success(function(data, status) {
                                $scope.events = data.data;
                            });
                    }, 350);
                }
            });
        })
    .controller('ServiceController',  
        function($scope, githubService) { 
            $scope.setUsername = githubService.setUsername; 
        }); 

当服务成为了某个控制器的依赖，就可以在控制器中调用任何定义在这个服务对象上的方法。

服务在应用的生命周期内是单例模式的，因此可以将用户名安全地储存在其中。

共有5种方法用来创建服务： 
 factory() 
 service() 
 constant()  
 value() 
 provider() 

使用service()可以注册一个支持构造函数的服务，它允许我们为服务对象注册一个构造函数。 
service()函数会在创建实例时通过new关键字来实例化服务对象。 

var Person = function($http) { 
    this.getName = function() { 
        return $http({ method: 'GET', url: '/api/user'}); 
     }; 
}; 
angular.service('personService', Person); 
------------------
从技术上说，当我们假定传入的函数就是$get()时，factory()函数就是用provider()方法注册服务的简略形式。 

下面两种方法的作用完全一样，并且会创建同一个服务。 
angular.module('myApp') 
.factory('myService', function() { 
    return { 
        'username': 'auser' 
    }; 
}) 
// 这与上面工厂的用法等价 
.provider('myService', { 
    $get: function() { 
        return { 
            'username': 'auser' 
        }; 
    } 
}); 

是否可以一直使用.factory()方法来代替.provider()呢？ 
答案取决于是否需要用AngularJS的.config()函数来对.provider()方法返回的服务进行额外的扩展配置。

angular.module('myApp', []) 
.provider('githubService', function($http) { 
    // 默认的，私有状态 
    var githubUrl = 'https://github.com' 
 
    setGithubUrl: function(url) { 
        // 通过.config改变默认属性 
        if (url) { githubUrl = url } 
    }， 
    method: JSONP, // 如果需要，可以重写 
 
    $get: function($http) { 
        self = this; 
        return $http({ method: self.method, url: githubUrl + '/events'}); 
    } 
}) 
.config(function(githubServiceProvider) { 
    githubServiceProvider.setGithubUrl("git@github.com"); 
}); 
----
constant() 
可以将一个已经存在的变量值注册为服务，并将其注入到应用的其他部分当中。

value()方法返回以name参数的值为名称的注册后的服务实例。 
angular.module('myApp') 
.value('apiKey','123123123'); 

value()方法和constant()方法之间最主要的区别是，常量可以注入到配置函数中，而值不行。 
通常情况下，可以通过value()来注册服务对象或函数，用constant()来配置数据。 

$provide服务提供了在服务实例创建时对其进行拦截的功能，可以对服务进行扩展，或者用
另外的内容完全代替它。 

装饰器是非常强大的，它不仅可以应用在我们自己的服务上，也可以对AngularJS的核心服
务进行拦截、中断甚至替换功能的操作。事实上AngularJS中很多功能的测试就是借助
$provide.decorator()建立的。 
对服务进行装饰的场景有很多，比如对服务进行扩展，将外部数据缓存进localStorage的功能，
或者对服务进行封装以便在开发中进行调试和跟踪等。 

decorator()：函数可以接受两个参数。 
 name（字符串） 
将要拦截的服务名称。 
 decoratorFn（函数） 
在服务实例化时调用该函数，这个函数由injector.invoke调用，可以将服务注入这个函
数中。 

$delegate：是可以进行装饰的最原始的服务，为了装饰其他服务，需要将其注入进装饰器。

下面的代码展示了如何给githubService添加装饰器，从而为每个请求都加上一个时
间戳： 
var githubDecorator = function($delegate,$log) { 
    var events = function(path) { 
        var startedAt = new Date(); 
        var events = $delegate.events(path);  
        // 事件是一个promise 
        events.finally(function() { 
            $log.info("Fetching events" + 
                " took " + 
                (new Date() - startedAt) + "ms"); 
         }); 
        return events; 
    }; 
 
    return { 
        events: events 
    }; 
}; 
 
angular.module('myApp') 
.config(function($provide) { 
    $provide.decorator('githubService',githubDecorator); 
}); 
---------------------------------------------------------------------------------
通信： P:150
$http({ 
  method: 'GET', 
  url: '/api/users.json' 
}).success(function(data,status,headers,config) {  
  // 当相应准备就绪时调用 
}).error(function(data,status,headers,config) { 
  // 当响应以错误状态返回时调用 
}); 
设置对象
1. method（字符串） 
这个键是我们希望发送的请求的HTTP方法。它的值是下列各项其中之一：‘GET’、‘DELETE’、
‘HEAD’、‘JSONP’、‘POST’、‘PUT’。 
2. url（字符串） 
绝对或相对的URL，是请求的目标。 
3. params（字符串map或对象） 
这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是
字符串，会被JSON序列化。 
// 参数会转化为?name=ari的形式 
$http({ 
    params: {'name': 'ari'} 
}) 
4. data（字符串或对象） 

5. headers（对象） 
一个列表，每一个元素都是一个函数，它会返回代表随请求发送的HTTP头。如果函数的返
回值是null，对应的头不会被发送。 
6. xsrfHeaderName（字符串） 
保存XSFR令牌的HTTP头的名称。 
7. xsrfCookieName（字符串） 
保存XSFR令牌的cookie的名称。 
8. transformRequest（函数或函数数组）
通常用于在请求发送给服务器之前对其进行序列化。 
这个函数看起来是这样的： 
function(data,headers) {} 
9. transformResponse（函数或函数数组） 
这是一个函数或函数数组，用来对HTTP响应的响应体和头信息进行转换，并返回转换后的
版本。通常用来进行反序列化。 
这个函数看起来是这样的： 
function(data,headers) {} 
10. cache（布尔型或缓存对象） 
如果cache属性被设置为true，那么AngularJS会用默认的$http缓存来对GET请求进行缓存。
如果cache属性被设置为一个$cacheFactory对象的实例，那么这个对象会被用来对GET请求进
行缓存。 
11. timeout（数值型或promise对象） 
如果timeout被设置为一个数值，那么请求将会在推迟timeout指定的毫秒数后再发送。如
果被设置为一个promise对象，那么当该promise对象被resolve时请求会被中止。
12. withCredentials（布尔型） 
如果该属性被设置为true，那么XHR请求对象中会设置withCredentials标记。 
默 认 情 况 下， CORS请 求 不 会 发 送cookie， 而 withCredentials 标 记 会 在请 求 中 加 入
Access-Control-Allow-Credentials头，这样请求就会将目标域的cookie包含在请求中。 
13. responseType（字符串） 
responseType选项会在请求中设置XMLHttpRequestResponseType属性。我们可以使用以下
HTTP请求类型其中之一： 
 ""（字符串，默认）； 
 "arraybuffer"（ArrayBuffer）； 
 "blob"（blob对象）； 
 "document"（HTTP文档）； 
 "json"（从JSON对象解析而来的JSON字符串）； 
 "text"（字符串）； 
 "moz-blob"（Firefox的接收进度事件）； 
 "moz-chunked-text"（文本流）； 
 "moz-chunked-arraybuffer"（ArrayBuffer流）。 
------------------
缓存 HTTP 请求 ：
$http.get('/api/users.json',{ cache: true }) 
.success(function(data) {}) 
.error(function(data) {}); 
LRU（Least  Recenlty  Used，最近最少使用）缓存
var lru = $cacheFactory('lru',{ 
  capacity: 20 
}); 
// $http请求 
$http.get('/api/users.json', { cache: lru }) 
.success(function(data){}) 
.error(function(data){}); 
现在，最新的20个请求会被缓存。第21个请求会导致LRU从缓存中将时间比较老的请求移除掉。 

每次发送请求时都传入一个自定义缓存是很麻烦的事情（即使是在服务中）。可以通过应用的.config()函数给所有$http请求设置一个默认的缓存 
angular.module('myApp', []) 
.config(function($httpProvider, $cacheFactory) { 
    $httpProvider.defaults.cache = $cacheFactory('lru', { 
        capacity: 20 
    }); 
}); 
现在，所有的请求都会使用我们自定义的LRU缓存了。

拦截器：提供了一个从全局层面对响应进行处理的途径。 
实际上是$http服务的基础中间件，用来向应用的业务流程中注入新的逻辑。 
拦截器的核心是服务工厂，通过向$httpProvider.interceptors数组中添加服务工厂，在$httpProvider中进行注册。 
request
response 
requestError 
responseError 

设置$httpProvider ：
使用.config()可以向所有请求中添加特定的HTTP头，这非常有用，尤其是我们希望将身份
验证的头同请求一同发送，或设置响应类型的时候。 
默认的请求头保存在$httpProvider.defaults.headers.common对象中
angular.module('myApp', []) 
.config(function($httpProvider) { 
    $httpProvider.defaults.headers 
        .post['X-Posted-By'] = 'MyAngularApp'; 
}); 
---------------------------
使用$resource：
当同支持RESTful的数据模型一起工作时，它就派上用场了。
$resource服务可以将$http请求转换成save和update等简单形式。  
var User = $resource( '/api/users/:userId.json', { userId: '@id'} ); 
// 发起一个请求： 
// GET /api/users/123 
User.get({ 
    id: '123' 
}, function(resp) { 
    // 处理响应成功 
}, function(err) { 
    // 处理错误 
});
query向指定URL发送一个GET请求，并期望返回一个JSON格式的资源对象集合。 
// 发起一个请求： 
// GET /api/users 
User.query(function(users) { 
    // 读取集合中第一个用户 
    var user = users[0]; 
}); 
query()和get()方法之间唯一的区别是AngularJS期望query()方法返回数组。

// 发起一个请求： 
// POST /api/users 
// with the body {name: 'Ari'} 
User.save({}, { 
    name: 'Ari' 
}, function(response) { 
    // 处理响应成功 
}, function(response) { 
    // 处理非成功响应 
}); 

// 发起一个请求： 
// DELETE /api/users 
User.delete({}, { 
    id: '123' 
}, function(response) { 
    // 处理成功的删除响应 
}, function(response) { 
    // 处理非成功的删除响应 
}); 

remove方法和delete()方法的作用是完全相同的，它存在的意义是因为delete是JavaScript
的保留字，在IE浏览器中会导致额外的问题。 
// 发起一个请求： 
// DELETE /api/users 
User.remove({}, { 
    id: '123' 
}, function(response) { 
    // 处理成功的删除响应 
}, function(response) { 
    // 处理非成功的删除响应 
}); 
----

// 使用实例方法$save() 
User.get({id: '123'}, function(user) { 
    user.name = 'Ari'; 
    user.$save(); // Save the user 
}); 
// This is equivalent to the collection-level 
// resource call 
User.save({id: '123'}, {name: 'Ari'}); 
User.get({id: '123'}, function(user) { 
    $scope.user = user; 
});


要创建一个封装$resource的服务，需要将$resource的服务注入到我们用来封装的服务对象中，并像平时一样调用其中的方法。 
如下所示： 
angular.module('myApp', ['ngResource']) 
.factory('UserService', [ 
'$resource', function($resource) { 
 
    return $resource('/api/users/:id', { 
        id: '@' 
    }, { 
        update: { 
            method: 'PUT' 
        } 
    }); 
}]);  
如果我们使用的服务器要求在URL中输入端口号，例如http://localhost:3000，
我 们 必 须 对 URL 进 行 转 义 。 这 种 情 况 下 URL 规 则 看 起 来 是 这 样 的 ：
$resource('http://localhost\\:3000/api/users/:id.json')。 
-------------------
$object会立即返回一个空数组（或对象），在服务器返回信息后，数
组会被用新的数据填充。这对更新一个集合后，在作用域中立即重新拉取集合的场景很有用： 
messages.post(newMessage).then(function(newMsg){ 
    // 首先将消息设置成空数组 
    // 然后一旦getList是完整的就填充它 
    $scope.messages = messages.getList().$object; 
}, function(errorReason)  
    // 出现了一个错误 
}); 

var message = messages.get(123); 
message.remove(); // 发送DELETE HTTP请求 

嵌套资源是指包含在其他组件内部的组件。例如，一个特定作者所写过的所有书籍。
var author = Restangular.one('authors', 'abc123'); 
// 构建一个GET到/authors/abc123/books的请求 
var books = author.getList('books'); 

我们可以在代码中首先拉取一个作者并进行展示，然后获取他的书籍列表： 
Restangular.one('authors', 'abc123').then(function(author) { 
    $scope.author = author; 
}); 
 
// 然后在代码中将 
// 构建一个GET到/authors/abc123/authors的请求 
// 使用$scope.author，它是从服务器返回的真实对象 
$scope.author.getList('books'); 

Restangular也支持自定义HTTP方法。
// 映射一个GET到/users/abc123/biography的请求 
author.customGET("biography"); 
// 或者带有一个新bio对象的POST  
// as {body: "Ari's bio"} 
// 中间的两空字段是 
// 参数字段或任意自定义头部 
author.customPOST({body: 'Ari\'s Bio'},// post body 
    "biography", // 路由 
    {},          // 自定义参数 
    {});         // 自定义头部 

每一个HTTP方法都可以自定义查询参数和头。
使用了自定义查询参数，一个post方法看起来像这样： 
var queryParamObj = { role: 'admin' }, 
    headerObj = { 'x-user': 'admin' };  
 
messages.getList('accounts', queryParamObj, headerObj); 

将RestangularProvider注入到config()函数中，或者将Restangular注入到一个run()函数中，用这些方式对Restangular进行设置，无论在哪里使用Restangular都可以利用这些设置。

如果设置Restangular时需要用到其他服务，那么就在run()方法中设置，否则就在config()中进行设置。 

1. 设置 baseUrl 
通过setBaseUrl()方法给所有后端  API  请求设置  baseUrl。例如，如果  API  的地址是 
/api/vi 而不是服务器的根路径，可以进行如下设置： 
angular.module('myApp', ['restangular']) 
    .config(function(RestangularProvider) { 
        RestangularProvider.setBaseUrl('/api/v1'); 
    });

elementTransformers：可以在Restangular对象被加载后为其添加自定义方法。
angular.module('myApp', ['restangular']) 
    .config(function(RestangularProvider) { 
        // 3个参数： 
        // route 
        // 如果它是一个集合——布尔值（true/false）或者 
        // 如果你需要这两个选项以及变换器 
        // 则不发送 
        RestangularProvider.addElementTransformer('authors', false, function(element) { 
            element.fetchedAt = new Date(); 
            return element; 
        }); 
    }); 

对于扩展数据模型或集合有跨界方法可以使用。例如，如果我们只想更新authors资源，可
以用如下方法： 
angular.module('myApp', ['restangular']) 
    .config(function(RestangularProvider) { 
        // 3个参数： 
        // route 
        // 如果它是一个集合——布尔值（true/false）或者 
        // 如果你需要这两个选项以及变换器 
        // 则不发送 
        RestangularProvider.extendModel('authors', function(element) { 
            element.getFullName = function() { 
                return element.name + ' ' + element.lastName; 
            }; 
            return element; 
        }); 
    }); 

getList方法始终返回数组是非常重要的，如果响应中包含带有元信息和嵌套数组的对象，我们应该用responseInterceptors把它解析出来。 
responseInterceptors在每个响应从服务器返回时被调用。调用时会传入以下参数。 
 data：从服务器取回的数据。 
 operation：使用的HTTP方法。 
 what：所请求的数据模型。 
 url：请求的相对URL。 
 response：完整的服务器响应，包括响应头。 
 deferred：请求的promise对象。 


angular.module('myApp', ['restangular']) 
    .config(function(RestangularProvider) { 
        RestangularProvider.setResponseInterceptor(function(data, operation, what) { 
            if (operation == 'getList') { 
                var list = data[what]; 
                list.metadata = data.metadata; 
                return list; 
            } 
            return data; 
        }); 
    }); 
小提示：我们可以同时使用requestInterceptors和responseInterceptors来实现全页面范围内的加载提示。
使用setRequestInterceptor()来设置requestInterceptor。

angular.module('myApp', ['restangular']) 
    .config(function(RestangularProvider) { 
        RestangularProvider.setRequestInterceptor(function(elem, operation, what) { 
            if (operation === 'put') { 
                elem._id = undefined; 
                return elem; 
            } 
            return elem; 
        }); 
    }); 

自定义字段 ：
Restangular支持自定义字段，这对与非服务器通信非常有用，例如，同MongoDB数据库进行通
信，在这种场景中id字段不会映射到真的id上，在MongoDB中id字段实际上会映射到_id.$oid上。 
angular.module('myApp', ['restangular']) 
    .config(function(RestangularProvider) { 
        RestangularProvider.setRestangularFields({ 
            id: '_id.$oid' 
        }); 
    }); 
错误捕获：
angular.module('myApp', ['restangular']) 
    .config(function(RestangularProvider) { 
        RestangularProvider.setErrorInterceptor(function(resp) { 
            displayError(); 
            return false; // 停止promise链 
        }); 
    }); 
孤立资源：
angular.module('myApp', ['restangular']) 
    .config(function(RestangularProvider) { 
        RestangularProvider.setParentless(['cars']); 
    }); 

只通过一个切入点（主URL）来同后端服务器进行通信是非常好的做法，其他数据模型通过链接来指向相关联的资源。 

Restangular通过selfLink、oneUrl和allUrl来支持这个有用的做法。 
selfLink将路径设置为数据模型的一个属性，而数据模型通过链接同对应的资源相关联。
angular.module('myApp', ['restangular']) 
    .config(function(RestangularProvider) { 
        RestangularProvider.setRestangularFields({ 
            selfLink: 'link.href' 
        }); 
    }); 

首先读取所有作者的列表，这也是应用的主路由。 
$scope.authors = Restangular.all('authors').getList().$object; 
基于前面的设置，每一个作者都对应一个指向自己的链接，同样还有一个指向该作者对应的书籍的URL。可以像下面这样使用这些属性： 
var firstAuthor = authors[0]; 
firstAuthor.name="John"; 
 
// PUT到/authors/1988-author-1 
// url在firstAuthor.link.href中 
firstAuthor.put(); 
 
// GET到/books/for-author/1988-author-1 
var books = Restangular.allUrl('books', firstAuthor.books.href) 
    .getList().$object; 

通过将Restangular服务注入到工厂函数中，就可以方便地对Restangular进行封装。在工
厂函数内部，使用withConfig()函数来创建自定义设置。 

angular.module('myApp', ['restangular']) 
.factory('MessageService', ['Restangular', function(Restangular) { 
    var restAngular = Restangular.withConfig(function(Configurer) { 
        Configurer.setBaseUrl('/api/v2/messages'); 
    }); 
 
    var _messageService = restAngular.all('messages'); 
 
    return { 
        getMessages: function() { 
            return _messageService.getList(); 
        } 
    }; 
}]); 
---------------------
JSONP：的原理是通过<script>标签发起一个GET请求来取代XHR请求。JSONP生成一个<script>标签并插到DOM中，然后浏览器会接管并向src属性所指向的地址发送请求。 
当服务器返回请求时，响应结果会被包装成一个JavaScript函数，并由该请求所对应的回调函数调用。
$http 
.jsonp("https://api.github.com?callback=JSON_CALLBACK") .success(function(data) { 
    // 数据 
}); 

<script src="https://api.github.com?callback=angular.callbacks._0"  
    type="text/javascript"></script> 
注意，JSON_CALLBACK被替换成了一个特地为此请求生成的自定义函数。 
当 支 持 JSOPN 的 服 务 器 返 回 数 据 时 ， 数 据 会 被 包 装 在 由 AngularJS 生 成 的 具 名 函 数
angular.callbacks._0中。 
使用JSONP需要意识到潜在的安全风险。首先，服务器会完全开放，允许后端服务调用应用中的任何JavaScript。 
不受我们控制的外部站点（或者蓄意攻击者）可以随时更改脚本，使我们的整个站点变得脆弱。
服务器或中间人有可能会将额外的JavaScript逻辑返回给页面，从而将用户的隐私数据暴露出来。 
由于请求是由<script>标签发送的，所以只能通过JSONP发送GET请求。并且脚本的异常也很难处理。
使用JSONP一定要谨慎，同时只跟信任并可以控制的服务器进行通信。

近年来，W3C制定了跨域资源共享来通过标准的方式取代JSONP。

CORS规范：简单地扩展了标准的XHR对象，以允许JavaScript发送跨域的XHR请求。它会通过
预检查（preflight）来确认是否有权限向目标服务器发送请求。 

使用config()方法在应用模块上设置两个参数以达到此目的。 

首先，告诉AngularJS使用 XDomain，并从所有的请求中把 X-Request-With头移除掉。

angular.module('myApp', []) 
.config(function($httpProvider) { 
    $httpProvider.defaults.useXDomain = true; 
    delete $httpProvider.defaults.headers 
        .common['X-Requested-With']; 
}); 
现在可以发送CORS请求了。

支持CORS的服务器必须在响应中加入几个访问控制相关的头。 
 Access-Control-Allow-Origin 
这个头的值可以是与请求头的值相呼应的值，也可以是*，从而允许接收从任何来源发来的请求。 
 Access-Control-Allow-Credentials（可选） 
默认情况下，CORS请求不会发送cookie。如果服务器返回了这个头，那么就可以通过将withCredentials设置为true来将cookie同请求一同发送出去。

如果将$http发送的请求中的withCredentials设置为true，但服务器没有返回Access-Control-Allow-Credentials，请求就会失败，反之亦然。 
后端服务器必须能处理OPTIONS方法的HTTP请求。 
CORS请求分为简单和非简单两种类型。 

不符合简单请求标准的请求被称为非简单请求。如果想要支持PUT或DELETE方法，又或者想给请求设置特殊的内容类型，就需要发送非简单请求。

预请求 ：
浏览器发送的预请求是OPTIONS类型的，预请求中包含以下头信息： 
 Access-Control-Request-Method 
这个头是请求所使用的HTTP方法，会始终包含在请求中。 
 Access-Control-Request-Headers （可选) 
这个头的值是一个以逗号分隔的非简单头列表，列表中的每个头都会包含在这个请求中。 
服务器必须接受这个请求，然后检查HTTP方法和头的合法性。如果通过了检查，服务器会
在响应中添加下面这个头： 
 Access-Control-Allow-Origin 
这个头的值必须和请求的来源相同，或者是*符号，以允许接受来自任何来源的请求。 
 Access-Control-Allow-Methods 
这是一个可以接受的HTTP方法列表，对在客户端缓存响应结果很有帮助，并且未来发送的
请求可以不必总是发送预请求。 

 Access-Control-Allow-Headers 
如果设置了Access-Control-Request-Headers头，服务器必须在响应中添加同一个头。 

CORS并不是一个安全机制，只是【现代浏览器】实现的一个标准。在应用中设置安全策略依然是我们的责任。 
-----------------------------
XML格式转换成JavaScript对象：
$ bower install x2js 

创建一个工厂服务以开始使用这个轻量的XML解析器，这个服务的功能很简单，就是在DOM
中解析XML ② ： 
angular.factory('xmlParser', function() { 
    var x2js = new X2JS(); 
    return { 
        xml2json: x2js.xml2json, 
        json2xml: x2js.json2xml_str 
    }; 
}); 
借助这个轻量的解析服务，可以将$http请求返回的XML解析成JSON格式，如下所示： 
angular.factory('Data', [$http, 'xmlParser', function($http, xmlParser) { 
    $http.get('/api/msgs.xml', { 
        transformResponse: function(data) { 
            return xmlParser.xml2json(data); 
        } 
    }); 
}); 
------------------------------------
身份验证：
服务器端需求 
首先必须保证服务器端API的安全性。

保护客户端应用的两种方法。 
1. 服务器端视图渲染 
如果站点所有的HTML页面都是由后端服务器处理的，可以使用传统的授权方式，由服务器
端进行鉴权，只发送客户端需要的HTML。 

2. 纯客户端身份验证 
我们希望客户端和服务端的开发工作可以解耦并各自独立进行，且可以将组件独立地发布到
生产环境中，互相没有影响。因此，需要通过使用服务器端API来保护客户端身份验证的安全，
但并不依赖这些API来进行身份验证。 
通过【令牌授权】来实现客户端身份验证，服务器需要做的是给客户端应用提供授权令牌。 
令牌本身是一个由服务器端生成的随机字符串，由数字和字母组成，它与【特定的用户会话】相关联。 

uuid库是用来生成令牌的好选择。

当用户登录到我们的站点后，服务器会生成一个随机的令牌，并将【用户会话同令牌之间建立关联】，
用户无需将ID或其他身份验证信息发送给服务器。 

客户端发送的每个请求都应该包含此令牌，这样服务器才能根据令牌来对请求的发送者进行身份验证。 

服务器端则无论请求是否合法，都会将【对应事件的状态码】返回给客户端，这样客户端才能做出响应。

200  一切正常 
401  未授权的请求 
403  禁止的请求 
404  页面找不到 
500  服务器错误 

当客户端收到这些状态码时会做出相应的响应。 
数据流程如下： 
(1) 一个未经过身份验证的用户浏览了我们的站点； 
(2) 用户试图访问一个受保护的资源，被重定向到登录页面，或者用户手动访问了登录页面； 
(3)  用户输入了他的登录ID（用户名或电子邮箱）以及密码，接着AngularJS应用通过POST
请求将用户的信息发送给服务端； 
(4) 服务端对ID和密码进行校验，检查它们是否匹配； 
(5) 如果ID和密码匹配，服务端生成一个唯一的令牌，并将其同一个状态码为200的响应一起
返回。如果ID和密码不匹配，服务器返回一个状态码为401的响应。 

可以将路由定义为公共或非公共。 P：160
1. 保护API访问的资源 
创建一个$http拦截器并能够处理未通过身份验证的API请求
angular.module('myApp', []) 
.config(function($httpProvider) { 
    // 在这里构造拦截器 
    var interceptor = function($q, $rootScope, Auth) { 
        return { 
            'response': function(resp) { 
                if (resp.config.url == '/api/login') { 
                    // 假设API服务器返回的数据格式如下: 
                    // { token: "AUTH_TOKEN" } 
                    Auth.setToken(resp.data.token); 
                } 
                return resp; 
            }, 
            'responseError': function(rejection) { 
                // 错误处理 
                switch(rejection.status) { 
                case 401: 
                    if (rejection.config.url!=='api/login') 
                        // 如果当前不是在登录页面 
                        $rootScope.$broadcast('auth:loginRequired'); 
                    break; 
                case 403: 
                    $rootScope.$broadcast('auth:forbidden'); 
                    break; 
                case 404: 
                    $rootScope.$broadcast('page:notFound'); 
                    break; 
                case 500: 
                    $rootScope.$broadcast('server:error'); 
                    break; 
                } 
                return $q.reject(rejection); 
            } 
        }; 
    }; 
    $httpProvider.interceptors.push(interceptor); 
}); 


2. 使用路由定义受保护资源 
通过同拦截器协同工作，这种方式会更加有效。如果不通过拦截器检查状态码，用户依然有可能发送未经授权的请求。 

angular.module('myApp', ['ngRoute']) 
.constant('ACCESS_LEVELS', { 
    pub: 1, 
    user: 2 
}); 
通过把ACCESS_LEVELS设置为常量，可以将它注入到.config()和.run()代码块中，并在整个应用范围内使用。 
angular.module('myApp', ['ngRoute']) 
.config(function($routeProvider, ACCESS_LEVELS) { 
    $routeProvider 
        .when('/', { 
            controller: 'MainController', 
            templateUrl: 'views/main.html', 
            access_level: ACCESS_LEVELS.pub 
        }) 
        .when('/account', { 
            controller: 'AccountController', 
            templateUrl: 'views/account.html', 
            access_level: ACCESS_LEVELS.user 
        }) 
        .otherwise({ 
            redirectTo: '/' 
        }); 
}); 

为了验证用户的身份，需要创建一个服务来对已经存在的用户进行监视。同
时需要让服务能够访问浏览器的cookie，这样当用户重新登录时，只要会话有效就无需再次进行身份验证。
angular.module('myApp.services', []) 
.factory('Auth',  function($cookieStore,ACCESS_LEVELS) { 
    var _user = $cookieStore.get('user'); 
 
    var setUser = function(user) { 
        if (!user.role || user.role < 0) { 
            user.role = ACCESS_LEVELS.pub; 
        } 
        _user = user; 
        $cookieStore.put('user', _user); 
    }; 
 
    return { 
        isAuthorized: function(lvl) { 
            return _user.role >= lvl; 
        }, 
        setUser: setUser, 
        isLoggedIn: function() { 
            return _user ? true : false; 
        }, 
        getUser: function() { 
            return _user; 
        }, 
        getId: function() { 
            return _user ? _user._id : null; 
        }, 
        getToken: function() { 
            return _user ? _user.token : ''; 
        }, 
        logout: function() { 
            $cookieStore.remove('user'); 
            _user = null; } 
        } 
    }; 
}); 
现在，当用户已经通过身份验证并登录后，可以在$routeChangeStart事件中对其有效性进行检查。

angular.module('myApp', []) 
.run(function($rootScope, $location, Auth) { 
    // 给$routeChangeStart设置监听 
    $rootScope.$on('$routeChangeStart', function(evt, next, curr) { 
 
        if (!Auth.isAuthorized(next.$$route.access_level)) { 
            if (Auth.isLoggedIn()) { 
                // 用户登录了，但没有访问当前视图的权限 
                $location.path('/'); 
            } else { 
                $location.path('/login'); 
            } 
        } 
    }); 
});         

3. 发送经过身份验证的请求 
当我们通过了身份验证，并取回了用户的授权令牌后，就可以在向服务器发送请求时使用令牌。
通过令牌进行身份验证的安全性取决于通信所采用的通道，因此尽可能地使用 SSL 连接可以提高安全性。

手动使用身份令牌： 手动创建一个可以发送令牌的请求，只要将token当作参数或请求头添加到请求中即可。

angular.module('myApp', []) 
.service('Backend', function($http, $q, $rootScope, Auth) { 
    this.getDashboardData = function() { 
        $http({ 
            method: 'GET', 
            url: 'http://myserver.com/api/dashboard' , 
            params: { 
                token: Auth.getToken() 
            }
        }).success(function(data) { 
            return data.data; 
        }).catch(function(reason) { 
            $q.reject(reason); 
        }); 
    }; 
}); 


自动添加身份令牌：  更进一步，如果想要为每个请求都添加上当前用户的令牌，可以创建一
个请求拦截器，并将令牌当作参数添加进请求中。 
angular.module('myApp', []) 
.config(function($httpProvider) { 
    // 在这里构造拦截器 
    var interceptor = function($q, $rootScope, Auth) { 
        return { 
            'request': function(req) { 
                req.params = req.params || {}; 
                if (Session.isAuthenticated() && !req.params.token) { 
                    req.params.token = Auth.getToken(); 
                } 
                return req; 
            }, 
            'requestError': function(reqErr) { 
                return reqErr; 
            } 
        }; 
    }; 
}); 
--------------------------------------------------
promise：
Angular的事件循环给予了Angular特有的能力，能在$rootScope.$evalAsync阶段中执行
promise（关于运行循环的更多细节，参见第24章）。promise会坐等$digest运行循环结束。

.factory('GithubService', function($q, $http) { 
    // 从仓库获取事件 
    var getEventsFromRepo = function() { 
        // 任务 
    } 
    var service = { 
        makeMultipleRequests: function(repos) { 
            var d = $q.defer(), 
                percentComplete = 0, 
                output = []; 
            for (var i = 0; i < repos.length; i++) { 
                output.push(getEventsFromRepo(repos[i])); 
                percentComplete = (i+1)/repos.length * 100; 
                d.notify(percentComplete); 
            } 
 
            d.resolve(output); 
 
            return d.promise; 
        } 
    } 
    return service; 
});

因为finally是IE中JavaScript的一个保留字。纠结到最后，只好这样调用它了，['catch']也如此： 
promise['finally'](function() {}); 

(1) $q是跟Angular的$rootScope模型集成的，所以在Angular中，执行和拒绝都很快。 
(2) $q promise是跟Angular模板引擎集成的，这意味着在视图中找到的任何promise都会在视图中被执行或者拒绝。 
(3) $q很小，所以没有包含Q库的完整功能。


--------------------------------------------
-------------------------------------------
表达式：
    属性表达式：属性表达式是对应于当前的作用域的，不像Javascript对应的是全局window对象。
    允许未定义值：执行表达式时，AngularJS能够允许undefined或者null，不像Javascript会抛出一个异常。
    没有控制结构： 你不能在AngularJS表达式中使用“条件判断”、“循环”、“抛出异常”等控制结构。
    过滤器(类似unix中的管道操作符)： 你可以通过过滤器链来传递表达式的结果。例如将日期对象转变成指定的阅读友好的格式。

AngularJS要使用window作用域的话得用$window来指向全局window对象

模块：
angular.module('xmpl.service', []).
value('greeter', {
    salutation: 'Hello',
    localize: function(localization) {
        this.salutation = localization.salutation;
    },
    greet: function(name) {
        return this.salutation + ' ' + name + '!';
    }
}).
value('user', {
    load: function(name) {
        this.name = name;
    }
});

angular.module('xmpl.directive', []);

angular.module('xmpl.filter', []);

angular.module('xmpl', ['xmpl.service', 'xmpl.directive', 'xmpl.filter']).
run(function(greeter, user) {
    // This is effectively part of the main method initialization code
    greeter.localize({
        salutation: 'Bonjour'
    });
    user.load('World');
}).controller("xmplController", function XmplController($scope, greeter, user) {
    $scope.greeting = greeter.greet(user.name);
});

注入器：是一个负责查找和创建依赖的服务定位器。
res.header('Access-Control-Allow-Origin', '*');
Cros：
$http.defaults.useXDomain = true;

AngularJS启动并生成视图时，会将根ng-app元素同$rootScope进行绑定。$rootScope是所有$scope对象的最上层。
-------------------------
表达式的运算：
通过$parse这个内部服务来进行表达式的运算，
<div ng-controller="MyController"> 
  <input ng-model="expr" 
          type="text" 
          placeholder="Enter an expression" /> 
  <h2>{{ parseValue }}</h2> 
</div> 
angular.module("myApp", []) 
.controller('MyController',  
function($scope,$parse) { 
  $scope.$watch('expr', function(newVal, oldVal, scope) { 
    if (newVal !== oldVal) { 
      // 用该表达式设置parseFun 
      var parseFun = $parse(newVal); 
      // 获取经过解析后表达式的值 
      $scope.parsedValue = parseFun(scope); 
    } 
  }); 
}); 
------------------------
插值：
要在字符串模板中做插值操作，需要在你的对象中注入$interpolate服务
$interpolate服务返回一个函数，用来在特定的上下文中运算表达式。
    <div ng-controller="MyController">
        <input ng-model="to" type="email" placeholder="Recipient" />
        <textarea ng-model="emailBody"></textarea>
        <pre>{{ previewText }}</pre>
    </div>

angular.module('ngRouteExample', ['ngRoute'])
    .controller('MyController',
        function($scope, $interpolate) {
            $scope.to = 'ari@fullstack.io';
            $scope.emailBody = 'Hello {{ to }},\n\nMy name is Ari too!';
            // Set up a watch
            $scope.$watch('emailBody', function(body) {
                if (body) {
                    var template = $interpolate(body);
                    $scope.previewText =
                        template({
                            to: $scope.to
                        });
                }
            });
        });
-------------------------
表达式的开始和结束：
如果需要在文本中使用不同于{{ }}的符号来标识表达式的开始和结束，可以在
$interpolateProvider中配置。 
angular.module('Example',[])
    .config(['$interpolateProvider',
        function($interpolateProvider) {
            $interpolateProvider.startSymbol('__');
            $interpolateProvider.endSymbol('__');
        }
    ])
    .factory('EmailParser', ['$interpolate',
        function($interpolate) {
            // 处理解析的服务 
            return {
                parse: function(text, context) {
                    var template = $interpolate(text);
                    return template(context);
                }
            };
        }
    ])
    .controller('MyController', ['$scope', 'EmailParser',
        function($scope, EmailParser) {
            // 设置监听 
            $scope.$watch('emailBody', function(body) {
                if (body) {
                    $scope.previewText = EmailParser.parse(body, {
                        to: $scope.to
                    });
                }
            });
        }
    ]);
---------------------------------------
过滤器：
在HTML中的模板绑定符号{{ }}内通过|符号来调用过滤器。
在JavaScript代码中可以通过$filter来调用过滤器。

app.controller('DemoController', ['$scope', '$filter', 
  function($scope, $filter) {  
    $scope.name = $filter('lowercase')('Ari'); 
}]); 

以HTML的形式使用过滤器时，如果需要传递参数给过滤器，只要在过滤器名字后面加冒号
即可。如果有多个参数，可以在每个参数后面都加入冒号。
<!-- 显示：123.46 --> 
{{ 123.456789 | number:2 }} 

currecy：过滤器可以将一个数值格式化为货币格式

date：
{{ today | date:'medium' }}    <!-- Aug 09, 2013 12:09:02 PM -->  
{{ today | date:'short' }}     <!-- 8/9/1312:09PM --> 
{{ today | date:'fullDate' }}  <!-- Thursday, August 09, 2013 --> 
{{ today | date:'longDate' }}  <!-- August 09, 2013 --> 
{{ today | date:'mediumDate' }}<!-- Aug 09, 2013 --> 
{{ today | date:'shortDate' }} <!-- 8/9/13 --> 
{{ today | date:'mediumTime' }}<!-- 12:09:02 PM --> 
{{ today | date:'shortTime' }} <!-- 12:09 PM --> 
年份格式化 
四位年份：{{ today | date:'yyyy' }} <!-- 2013 --> 
两位年份：{{ today | date:'yy' }} <!-- 13 --> 
一位年份：{{ today | date:'y' }} <!-- 2013 --> 
  月份格式化 
英文月份：{{ today | date:'MMMM' }} <!-- August --> 
英文月份简写：{{ today | date:'MMM' }} <!-- Aug --> 
数字月份：{{ today |date:'MM' }} <!-- 08 --> 
一年中的第几个月份：{{ today |date:'M' }} <!-- 8 --> 
  日期格式化 
数字日期：{{ today|date:'dd' }} <!-- 09 --> 
一个月中的第几天：{{ today | date:'d' }} <!-- 9 --> 
英文星期：{{ today | date:'EEEE' }} <!-- Thursday --> 
英文星期简写：{{ today | date:'EEE' }} <!-- Thu --> 
  小时格式化 
24小时制数字小时：{{today|date:'HH'}} <!--00--> 
一天中的第几个小时：{{today|date:'H'}} <!--0--> 
12小时制数字小时：{{today|date:'hh'}} <!--12--> 
上午或下午的第几个小时：{{today|date:'h'}} <!--12--> 
  分钟格式化 
数字分钟数：{{ today | date:'mm' }} <!-- 09 --> 
一个小时中的第几分钟：{{ today | date:'m' }} <!-- 9 --> 
  秒数格式化 
数字秒数：{{ today | date:'ss' }} <!-- 02 --> 
一分钟内的第几秒：{{ today | date:'s' }} <!-- 2 --> 
毫秒数：{{ today | date:'.sss' }} <!-- .995 --> 
  字符格式化 
上下午标识：{{ today | date:'a' }} <!-- AM --> 
四位时区标识：{{ today | date:'Z' }} <!--- 0700 --> 
下面是一些自定义日期格式的示例： 
{{ today | date:'MMMd, y' }} <!-- Aug9, 2013 --> 
{{ today | date:'EEEE, d, M' }} <!-- Thursday, 9, 8--> 
{{ today | date:'hh:mm:ss.sss' }} <!-- 12:09:02.995 --> 

filter：过滤器可以从给定数组中选择一个子集，并将其生成一个新数组返回。
用自定义函数进行过滤（在这个例子中函数定义在$scope上）： 
{{ ['Ari','likes','to','travel'] | filter:isCapitalized }} 
<!-- ["Ari"] --> 
$scope.isCapitalized = function(str) { 
    return str[0] == str[0].toUpperCase(); 
}; 

json：过滤器可以将一个JSON或JavaScript对象转换成字符串

limitTo：过滤器会根据传入的参数生成一个新的数组或字符串

lowercase ：小写

number：过滤器将数字格式化成文本

orderBy：过滤器可以用表达式对指定的数组进行排序
当第一个参数是函数时，该函数会被当作待排序对象的getter方法。 
我们可以传入+或-来强制进行升序或降序排列
，通过将第二个参数设置为true可以将排序结果进行反转 | orderBy:'name':true 

自定义过滤器：
创建自定义过滤器需要将它放到自己的模块中。
angular.module('myApp.filters', []) 
.filter('capitalize', function() { 
  return function(input) { 
    // input是我们传入的字符串 
    if (input) { 
      return input[0].toUpperCase() + input.slice(1); 
  } 
}); 
{{ 'ginger loves dog treats' | lowercase | capitalize }} 
------------------------------------------------------
表单验证：
如果想要屏蔽浏览器对表单的默认验证行为，可以在表单元素上添加novalidate标记。

最小长度：在输入字段上使用AngularJS指令ng-minleng= "{number}"
<input type="text" ng-minlength="5" />
<input type="text" ng-maxlength="20" /> 

模式匹配：
<input type="text" ng-pattern="[a-zA-Z]" /> 
<input type="email" name="email" ng-model="user.email" /> 
<input type="number" name="age" ng-model="user.age" /> 
<input type="url" name="homepage" ng-model="user.facebook_url" /> 

访问这些属性： 
formName.inputFieldName.property 

未修改的表单：
formName.inputFieldName.$pristine 

修改过的表单： 
只要用户修改过表单，无论输入是否通过验证，该值都返回true 
formName.inputFieldName.$dirty 

合法的表单：
formName.inputFieldName.$valid 

formName.inputFieldName.$invalid 
错误：
formName.inputfieldName.$error 
如果验证失败，这个属性的值为true；如果值为false，说明输入字段的值通过了验证。

自定义验证：
------------------------------------------------------------------------------
$parsers ：
当用户同控制器进行交互，并且ngModelController中的$setViewValue()方法被调用时，
$parsers数组中的函数会以流水线的形式被逐个调用。第一个$parse被调用后，执行结果会传
递给第二个$parse，以此类推。
这些函数可以对输入值进行转换，或者通过$setValidity()函数设置表单的合法性。
使用$parsers数组是实现自定义验证的途径之一。
例如，假设我们想要确保输入值在某两个数值之间，可以在$parsers数组中入栈一个新的函数，这个函数会在验证链中被调用。 
每个$parser返回的值都会被传入下一个$parser中。当不希望数据模型发生更新时返回 undefined。 
angular.module('myApp') 
.directive('oneToTen', function() { 
   return { 
     require: '?ngModel', 
     link: function(scope, ele, attrs, ngModel) { 
       if (!ngModel) return; 
         ngModel.$parsers.unshift( 
           function(viewValue) { 
             var i = parseInt(viewValue); 
 
             if (i >= 0 && i < 10) { 
               ngModel.$setValidity('oneToTen', true); 
               return viewValue; 
             } else { 
                 ngModel.$setValidity('oneToTen', false); 
                 return undefined; 
             } 
         }); 
      } 
   }; 
});

当绑定的ngModel值发生了变化，并经过$parsers数组中解析器的处理后，这个值会被传递
给$formatters流水线：，$formatters中的函数也可以修改并格式化这些值 
这些函数更常用来处理视图中的可视变化
angular.module('myApp') 
.directive('oneToTen', function() { 
    return { 
        require: '?ngModel', 
        link: function(scope, ele, attrs, ngModel) { 
            if (!ngModel) return; 
 
            ngModel.$formatters.unshift(function(v) { 
                return $filter('number')(v); 
            }); 
        } 
    }; 
}); 

<input type="text" placeholder="Desired username" name="username" ng-model="signup.username" ng-minlength="3" ng-maxlength="20" ensure-unique="username" required />
app.directive('ensureUnique', function($http) { 
    return { 
        require: 'ngModel', 
        link: function(scope, ele, attrs, c) { 
            scope.$watch(attrs.ngModel, function(n) { 
                if (!n) return; 
                $http({ 
                    method: 'POST', 
                    url: '/api/check/' + attrs.ensureUnique, 
                    data: { 
                        field: attrs.ensureUnique, 
                        value: scope.ngModel 
                  } 
                }).success(function(data) { 
                    c.$setValidity('unique', data.isUnique); 
                }).error(function(data) { 
                    c.$setValidity('unique', false); 
                }); 
            }); 
        } 
    }; 
});
<form name="signup_form" novalidate ng-submit="signupForm()" ng-controller="signupController"> </form> 
app.controller('signupController', function($scope) {
    $scope.submitted = false; 
    $scope.signupForm = function() { 
        if ($scope.signup_form.$valid) { 
            // 正常提交 
        } else { 
            $scope.signup_form.submitted = true; 
        } 
    } 
}); 

在失焦后显示验证信息 ：
<input ng-class="{error: signup_form.name.$dirty && signup_form.name.$invalid}" 
    type="text" 
    placeholder="Name" 
    name="name" 
    ng-model="signup.name" 
    ng-minlength="3" 
    ng-maxlength="20" required ng-focus /> 

app.directive('ngFocus', [function() { 
    var FOCUS_CLASS = "ng-focused"; 
    return { 
        restrict: 'A', 
        require: 'ngModel', 
        link: function(scope, element, attrs, ctrl) { 
            ctrl.$focused = false; 
            element.bind('focus', function(evt) { 
                element.addClass(FOCUS_CLASS); 
                scope.$apply(function() { 
                    ctrl.$focused = true; 
                }); 
            }).bind('blur', function(evt) { 
                element.removeClass(FOCUS_CLASS); 
                scope.$apply(function() { 
                    ctrl.$focused = false; 
                }); 
            }); 
        } 
    }; 
}]); 
ngFocus指令给表单输入字段的blur和focus添加了对应的行为，添加了一个名为ng-focused的类，并将$focused的值设置为true。
接下来，可以根据表单是否具有焦点来展示独立的错误信息。
<div class="error" ng-show="signup_form.name.$dirty && signup_form.name.$invalid && !signup_form.name.$focused"> 
在ngModel控制器中使用$isEmpty()方法来判断输入字段是否为空

然而在发布的Angular 1.3中，Angular核心做了一个升级。它不再需要基于一个详细的表达式
状态创建元素显示或隐藏（正如我们在本章所做的那样）：
从1.3开始，Angular中新增了一个ngMessages指令， $ bower install --save angular-messages
告诉Angular将ngMessages作为应用程序的依赖模块引入， angular.module('myApp', ['ngMessages']); 
 
状态创建元素显示或隐藏（正如我们在本章所做的那样）。 
<form name="signup_form" novalidate ng-submit="signupForm()" 
ng-controller="signupController"> 
    <fieldset> 
        <legend>Signup</legend> 
        <div class="row"> 
            <div class="large-12 columns"> 
                <label>Your name</label> 
                <input type="text" placeholder="Name" name="name" ng-model="signup.name"  
                    ng-minlength=3 ng-maxlength=20 required /> 
                <div class="error" ng-show="signup_form.name.$dirty && signup_form.name.  
                    $invalid && signup_form.submitted"> 
                    <small class="error" ng-show="signup_form.name.$error.required"> 
                        Your name is required.</small> 
                    <small class="error" ng-show="signup_form.name.$error.minlength"> 
                        Your name is required to be at least 3 characters</small> 
                    <small class="error" ng-show="signup_form.name.$error.maxlength"> 
                        Your name cannot be longer than 20 characters </small> 
                </div> 
            </div> 
        </div> 
        <button type="submit">Submit</button> 
    </fieldset> 
</form> 
本质上这一功能会检查错误对象的状态发生了变化。此外，我们还得到了站点中每个表单需
要的很多额外的和重复的标记。这显然不是一个理想的解决方案。 
从1.3开始，Angular中新增了一个ngMessages指令。 
安装 
安装ngMessages很简单，因为它被打包成了一个Angular模块。首先下载这个模块： 
$ bower install --save angular-messages 
或者，也可以从angular.org下载该文件并将它保存到项目中。还需要将angular-messages.js这
个JavaScript引入我们的主HTML中： 
<script type="text/javascript" src="bower_components/angular-messages/angular-messages.js"> 
    </script> 
最后，我们还要告诉Angular将ngMessages作为应用程序的依赖模块引入，就像这样： 
angular.module('myApp', ['ngMessages']); 
现在，我们已经安装了ngMessages，然后可以马上开始使用它了。使用前面的例子作为基
础，你可以移除ng-show指令，然后使用ngMessages的一个更简洁的实现替换它。 

只需在ng-message指令旁边使用ng-messages-multiple属性，实现同时显示所有的错误。
<form name="signup_form" novalidate ng-submit="signupForm()" ng-controller="signupController"> 
     <label>Your name</label> 
    <input type="text" placeholder="Name" name="name" ng-model="signup.name" ng-minlength=3 ng-maxlength=20 required /> 
    <div class="error" ng-messages="signup_form.name.$error"> 
        <div ng-message="required">Make sure you enter your name</div> 
        <div ng-message="minlength">Your name must be at least 3 characters</div> 
        <div ng-message="maxlength">Your name cannot be longer than 20 characters</div> 
    </div> 
    <button type="submit">Submit</button> 
</form> 

ng-messages-include属性引入这个模板

创建一个自定义验证器验证用户名在一个注册表单中是否有效： 
app.directive('ensureUnipue', function($http) { 
    return { 
        require: 'ngModel', 
        link: function(scope, ele, attrs, ctrl) {  
            ctrl.$parsers.push(function(val) { 
               // 在这里添加验证 
            }); 
        } 
    } 
}); 
----------
<form name="signup_form" novalidate ng-submit="signupForm()" ng-controller="signupController" 
ensure-unique="/api/checkUsername.json"> 
    <label> 
        Your name 
    </label> 
    <input type="text" placeholder="Username" name="username" ng-model="signup.username" 
    ng-minlength=3 ng-maxlength=20 required /> 
    <div class="error" ng-messages="signup_form.username.$error"> 
        <div ng-message="required"> 
            Make sure you enter your username 
        </div> 
        <div ng-message="checkingAvailability"> 
            Checking... 
        </div> 
        <div ng-message="usernameAvailablity"> 
            The username has already been taken. Please choose another 
        </div> 
    </div> 
    <button type="submit"> 
        Submit 
    </button> 
</form> 

app.directive('ensureUnique', function($http) { 
    return { 
        require: 'ngModel', 
        link: function(scope, ele, attrs, ctrl) { 
            var url = attrs.ensureUnique; 
 
            ctrl.$parsers.push(function(val) { 
                if (!val || val.length === 0) { 
                    return; 
                } 
 
                ngModel.$setValidity('checkingAvailability', true); 
                ngModel.$setValidity('usernameAvailablity', false); 
 
                $http({ 
                    method: 'GET', 
                    url: url, 
                    params: { 
                        username: val 
                    } 
                }).success(function() { 
                    ngModel 
                        .$setValidity('checkingAvailability', false); 
                    ngModel 
                        .$setValidity('usernameAvailablity', true); 
                })['catch'](function() { 
                    ngModel 
                        .$setValidity('checkingAvailability', false); 
                    ngModel 
                        .$setValidity('usernameAvailablity', false); 
                }); 
                return val; 
            }) 
        } 
    } 
}); 

---------------------------------------------------------------------
要把事件沿着作用域链向上派送（从子作用域到父作用域），我们要使用$emit()函数。
要把事件向下传递（从父作用域到子作用域），我们使用$broadcast()函数

事件对象有以下属性。 
1. targetScope（作用域对象） 
这个属性是发送或者广播事件的作用域。 
2. currentScope（作用域对象） 
这个对象包含了当前处理事件的作用域。 
3. name（字符串） 
这个字符串是触发之后，我们正在处理的事件名称。 
4. stopPropagation（函数） 
stopPropagation()函数取消通过$emit触发的事件的进一步传播。 
5. preventDefault（函数） 
preventDefault把defaultPrevented标志设置为true。尽管不能停止事件的传播，我们可
以告诉子作用域无需处理这个事件（也就是说，可以安全地忽略它们）。 
6. defaultPrevented（布尔值） 
调用preventDefault()会把defaultPrevented设置为true。 

 核心系统的$emitted事件 ：
下面的事件从指令向上发送到包含指令调用的作用域。
1. $includeContentLoaded 
$includeContentLoaded事件当ngInclude的内容重新加载时，从ngInclude指令上触发。 
2. $includeContentRequested 
$includeContentRequested事件从调用ngInclude的作用域上发送。每次ngInclude的内容
被请求时，它都会被发送。 
3. $viewContentLoaded 
$viewContentLoaded事件每当ngView内容被重新加载时，从当前ngView作用域上发送。 


 核心系统的$broadcast事件 
1. $locationChangeStart 
当Angular从$location服务（通过$location.path()、$location.search()等）对浏览器
的地址作更新时，会触发$locationChangeStart事件。 
2. $locationChangeSuccess 
当且仅当浏览器的地址成功变更，又没有阻止$locationChangeStart事件的情况下，
$locationChangeSuccess事件会从$rootScope上广播出来。 
3. $routeChangeStart 
在路由变更发生之前，$routeChangeStart事件从$rootScope发送出来。也就是在路由服务
开始解析路由变更所需的所有依赖项时。 
这个过程通常涉及获取视图模板和解析route属性上所有依赖项的时候。 
4. $routeChangeSuccess 
在 所 有 路 由 依 赖 项 跟 着 $routeChangeStart 被 解 析 之 后 ， $routeChangeSuccess 被 从
$rootScope上广播出来。 
ngView指令使用$routeChangeSuccess事件来获悉何时实例化控制器并渲染视图。 
5. $routeChangeError 
如果路由对象上任意的resolve属性被拒绝了，$routeChangeError就会被触发（比如它们失
败了）。这个事件是从$rootScope上广播出来的。 
6. $routeUpdate 
如果$routeProvider上的reloadOnSearch属性被设置成false，并且使用了控制器的同一个
实例，$routeUpdate事件会被从$rootScope上广播。 
7. $destroy 
在作用域被销毁之前，$destroy事件会在作用域上广播。这个顺序给子作用域一个机会，在
父作用域被真正移除之前清理自身。 

指令并不一定要有视图模板。通常情况下，它们可以只作为视图之下处理数据的垫片。
ngModelController控制器就是这种功能派上用场的一个例子。 