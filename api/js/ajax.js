ajax的同源策略，同一个域名或子域名，并且端口一致。一个ajax请求被发送，所有的请求都会附带主语的cookie信息一起发送。
跨域策略文件。
cross-origin resource sharing.
corss赋予前端代码访问可信的远程服务的权限。ie》=8
服务器添加为受信任的数据源：
http协议的响应头添加：
Access-Control-Allow-Origin: example.com
Access-Control-Request-Method: GET,POST

var req = new XMLHttpRequest();
req.open("POST","/endpoint",true);
req.setRequestHeader("Authorization",oauth_signature);

ie:XDomainRequest 代替上面进行跨域通信，只支持GET，POST，不支持验证和自定义字段，
只支持“Content-Type:text/plain”类型的请求。

jsonp ： 所有script 标签获取脚本文件不受跨域的限制。
jsonCallback({"data":"foo"})

内部系统不要跨域，只ajax。

rest：
创建：post，更新：put，

ajax抓取规则：
http://twitter.com/#!/maccman
http://twitter.com/?_escape_fragment_=maccan
uglyUrl

websocket 服务器直接推送信息到客户端

白名单属性避免恶意输入，序列化时不要在json中包含模型名称。
curl -v http://twitter.com/?_escape_fragment_=maccan 302 redircted to http://twitter.com/maccman

---------------------
REST 风格的 CRUD 类似下面这样：
    create → POST   /collection
    read → GET   /collection[/id]
    update → PUT   /collection/id
    delete → DELETE   /collection/id

Backbone.sync 的语法为 sync(method, model, [options])。
    method – CRUD 方法 ("create", "read", "update", 或 "delete")
    model – 要被保存的模型（或要被读取的集合）
    options – 成功和失败的回调函数，以及所有 jQuery 请求支持的选项

Backbone.emulateHTTP = true;
老的浏览器不支持 Backbone 默认的 REST/HTTP，此时可以开启 Backbone.emulateHTTP 。 设置该选项将通过 POST 方法伪造 PUT 和 DELETE 请求，此时该请求会向服务器传入名为 _method 的参数。 设置该选项同时也会向服务器发送 X-HTTP-Method-Override 头。

Backbone.emulateHTTP = true;
model.save();  // POST 到 "/collection/id", 附带 "_method=PUT" + header.

emulate JSONBackbone.emulateJSON = true
同样老的浏览器也不支持发送 application/json 编码的请求， 设置 Backbone.emulateJSON = true; 后 JSON 模型会被序列化为 model 参数， 请求会按照 application/x-www-form-urlencoded 的内容类型发送，就像提交表单一样。 

------------------------------------
AngularJS的$resource相比于$http更加适合于与RESTful数据源交互
http://www.oschina.net/translate/learning-javascript-design-patterns?cmp&p=17
MVVM的全称是Model View ViewModel
对这种模式的实现，大部分都是通过在view层声明数据绑定来和其他层分离的，这样就方便了前端开发人员和后端开发人员 的分工，前端开发人员在html标签中写对viewmodel的绑定数据，model和viewmodel是后端开发人员通过开发应用的逻辑来维护这两层。

Model仅仅关注数据信息，不关心任何行为；她不格式化数据或者影响数据在浏览器中的展现，这些不是他的职责；格式化数据是view层的任务，同时业务逻辑层被封装在viewmodel中，用来和model进行交互。

通过ajax调用服务器服务来进行读写Model数据。

View是指应用中和用户直接交互的部分，他是一个交互式的UI来表示ViewModel的状态，View被认为是主动的，而不是被动的？这句话的意思是说被动的View在应用中不关心model的领域，model的领域在controller中维护；MVVM的主动式的View包含数据绑定，事件和需要理解model和viewmodel的行为，尽管这些行为可以和属性对应，view仍然需要响应viewmodel的事件,同时View不负责控制状态。

KnockoutJS的view层就是一个简单的html文档，它里面会有关联到viewmodel的数据声明，同时KnockoutJS的view层显示从ViewModel中获取的数据，传递命令给viewmodel,并且更新viewmodel改变的状态。

可以认为ViewModel是一个专门用于数据转换的Controller,可以把Model中的信息转换为View中的信息，同时从View专递命令给Model

从这个意义上来说，ViewModel看上去更像一个Model,但是它控制着View的很多显示逻辑，同时ViewModel也暴漏一些方法用来维护view的状态，根据View的行为和事件来更新model

ViewModel位于UI层的后面，暴漏数据给View,可以认为是View层的数据和行为的源

KnockoutJS把ViewModel解释为数据的展现和表现在UI上的行为，他不是ui需要持久化的数据模型，但是他可以持有用户存储的数据；Knockout的 ViewModels是采用javascript对象实现的，不用关心html标签，这种抽象的方法可以使它们的实现保持简单。 
---------------------------------
对于企业信息管理系统而言，一个基础服务(比如帐号管理)，简单点的方式是使用页面来管理数据，然后使用服务的方式来发布数据，说简单点，就是建一个项目，其中有两部分：一部分是增删改查页面，一部分是供其他系统调用的数据服务，这种设计可以降低在系统构架初期的复杂度，即：先设计只读式的服务，等到应用扩展到一定程度后，再扩展为读写式的服务。

新建MVC项目后第一步当然是考虑访问权限问题，页面部分采用SSO来控管权限肯定是没有错的，服务部分值的思考下，如果仅是自已公司的系统调用，那么使用SSO认证是可行的，只要在以后的Request中加入FormsAuthentication的Ticket即可，如果服务需要做成开放应用，那么使用oauth是个不错的选择，但是这个方案似乎有点太重量级了，次点的方法使用Http Basick认证，当然视情况也可以使用SSO的授权。

访问授权问题越早考虑越好
http://www.cnblogs.com/think8848/archive/2009/12/01/1614520.html
如果把Atom10ItemFormatter<TSyndicationItem>做为WCF服务方法的参数类型，再使用HTTP 的PUT方式把数据推到WCF服务的方法上，这个Atom10ItemFormatter<TSyndicationItem>应该会将推进来的XML数据自动转换成SyndicationItem对象吧
---------------------------------------------------------
-----------------------------------------------------------
REST架构下，浏览器怎么发送put与delete请求：
例如后台已经搞定，REST服务已经建好了，那么前台浏览器怎么使用呢？

------解决方案--------------------
前端比较麻烦，因为：
The other HTTP methods (i.e. other than GET and POST) are not available in HTML 4.1 or XHTML 1.0.

---也就是说实际上HTML5以前，FORM都仅支持GET和POST。---

即便你尝试自己用Ajax来做，都未必能成功。
在jQuery的文档中说：
The type of request to make ("POST" or "GET"), default is "GET". Note: Other HTTP request methods, such as PUT and DELETE, can also be used here, but they are not supported by all browsers.（最后一句话：不是所有浏览器支持其它方式）
------解决方案--------------------
可以用POST来代替PUT和DELETE, 比如你可以埋一个hidden field叫 _method, <input type= "hidden " name= "_method " value= "PUT "> . 这样,你在后台可以根据这个字段来识别. 
-------------------------------------------------
http://www.myexception.cn/operating-system/889647.html
幂等有以下几种定义： 　　对于单目运算，如果一个运算对于在范围内的所有的一个数多次进行该运算所得的结果和进行一次该运算所得的结果是一样的，那么我们就称该运算是幂等的。
安全和幂等的意义在于：当操作没有达到预期的目标时，我们可以不停的重试，而不会对资源产生副作用。从这个意义上说，POST操作往往是有害的，但很多时候我们还是不得不使用它。

还有一点需要注意的就是，创建操作可以使用POST，也可以使用PUT，区别在于POST 是作用在一个集合资源之上的（/uri），而PUT操作是作用在一个具体资源之上的（/uri/xxx），再通俗点说，如果URL可以在客户端确定，那么就使用PUT，如果是在服务端确定，那么就使用POST，比如说很多资源使用数据库自增主键作为标识信息，而创建的资源的标识信息到底是什么只能由服务端提供，这个时候就必须使用POST。
------------------------------------------------
两者都能向服务器发送数据，提交的“内容”[注1]的格式相同，都是
var_1=value_1&var_2=value_2&....

get 和 post 区别如字面，一个是get（获取），一个是post（发送）。

get用来告诉服务器需要获取哪些内容（uri+query），向静态页面（uri）请求则直接返回文件内容给浏览器，向一个动态页面请求时可以提供查询参数（query）以获得相应内容。

post用来向服务器提交内容，主要是为了提交，而不是为了请求内容，就是说post的初衷并不要求服务器返回内容[注2]，只是提交内容让服务器处理（主要是存储或者处理之后再存储）。
------
首先说下什么是REST，这个四个字母是Representational State Transfer的简写，它是一套设计原则：表示性状态转移。接着我们再看下Web背后的暗藏的设计理念和传统的Web服务（RPC式的）的差别：

    Web是基于资源的，但很多传统的Web服务并不会暴露资源；
    Web是基于URI与链接的，但很多传统的Web服务一般也只暴露一个URI和零个链接；
    Web是基于HTTP的，但很多传统的Web服务几乎很少使用HTTP的特性；
    Web是可以面向对象的，但很多传统的Web服务几乎都面向过程。

从而传统的Web服务，就会出现一些不好地方：

    不具有寻址性；
    不具有可缓存性；
    没有连通性；
    不是冥等的，也不是安全的；
    不符合统一接口（通常一个不同服务的操作千差万别）；
    不透明（即你熟悉了一个服务不代表另一个也熟悉）。

大家可能对上面的一些关键词不太理解，现在我就做一下说明，这里还包括一些下面可能用到的词语：

    寻址性：如果一个Web服务将其数据集里有价值的部分作为资源发布出来，那么该应用就是可以寻址的，每个资源必须对应唯一的一个URI，建议同一资源的不同表示也对应一个URI；
    资源状态：即关于资源的信息，一定要保存到服务器端，且只能以表示的实现的形式发给客户端；
    应用状态：即关于客户端在应用中所处的状态信息，比如起始页码，一定要保存到客户端，可以作为请求的一部分发给服务端，甚至成为资源状态的一部分；
    冥等性：不管你对某资源做多少次同样的操作，结果总是一样的；
    安全性：始终不会改变服务器的状态；
    连通性：资源应该是可以容易的相互连接起来的，服务器通过超媒体（即超文本表示里的链接和表单）可以引导资源从一个状态进入下一个状态，Roy Field也在论文里说：“将超媒体作为应用状态的引擎”；
    统一接口：客户端和资源之间的所有交互都应该是通过为数不多的几个基本的HTTP方法进行的。

若一个REST式的服务从不保存任何应用状态，那么就称它为无状态的。在一个无状态的应用里，服务是按照当前的资源状态来独立处理各个客户端请求的，是冥等的。而无状态的好处是：

    提升应用的规模十分简单；
    具有更高的可靠性，就是说多次重发一对一个资源的请求是冥等的。

若一个服务的连通性做得好，那么客户端就不需要去理解这个服务的潜在规则来构造uri。在REST式服务中，对于HTTP几个基本方法的约定：

    GET：用于获取关于资源的信息；
    HEAD：只获取报头（一些元信息），不获取表示；
    PUT：请求设定资源状态（创建或者修改），若客户端向一个URI发送PUT请求时未提供表示，则表明此URI处已经存在一个资源了；
    DELETE：请求用于删除资源；
    POST：请求为已有的资源创建一个从属资源或者；
    OPTIONS：请求用于查看一个资源支持统一接口里的哪些方法。

重载POST方法虽然可以不违背REST的设计原则（符合最低要求），但它是违反面向资源的架构原则的，而统一接口的好处并不在于它所暴露的具体方法，而在于统一性，从而提高与其他Web服务的兼容性。一个服务应该是自描述的，而不依赖于辅助的文字描述来告诉程序员怎么编码，而且，依赖于URI构造规则的客户端是比较脆弱的，一但改变了规则，所有客户端都要重写。在REST式的Web服务的资源设计时，要注意资源的合理设计，资源可以分为三类：

    预定义的一次性资源：比如服务的主页；
    大量（或者无数个）对应于个数据项的资源；
    大量（或者无数个）对应于一个可能的算法输出结果的资源。

记住：拿不准时，就可以把它作为资源。在设计资源的URI时，路径变量被用于分隔一个层次结构或者有向图的元素，如果同一层次的多项数据有次序关系就用逗号（ , ），如果同一层次的多项数据没有先后关系就用分号（ ; ）。表示应当是人类可读的，但同时也应当是面向计算机的。也应当是有用的，应该暴露的是有价值的数据而不是无用的数据。记住，你的服务可能要考虑版本化的问题，如果拿不准就在资源的最前面加上路径变量来表示版本吧。
----------------------------------------------
<a href="/users/1">view</a>  
<form action="/users/1" method="post" accept="text/html">  
    <input type="text" name="name" />  
    <input type="text" name="email" />  
    <input type="submit" value="create"/>  
</form>

资源多重表述
也就是客户端，可以通过修改"Accept"请求头信息，来要求服务器端返回不同类型的数据结果，如：
Accept: text/json 返回JSON数据
Accept: text/xml 返回XML数据
Accept: text/html 返回HTML页面
Accept: text/wml 返回WML页面 

