http://angular-ui.github.io/ui-router/
$urlRouter 服务：
href(urlMatcher, params, options) url 生成方法，通过给定的 UrlMatcher生成编译后的 url。
    urlMatcher 作为生成url的模板
    params 参数对象，用来填充匹配的需求参数.
    options : absolute 默认 false. 为真则生成绝对地址.
$bob = $urlRouter.href(new UrlMatcher("/about/:person"), {
  person: "bob"
});
// $bob == "/about/bob";
sync()
触发更新，同时地址栏改变也会触发。 也是 $locationChangeSuccess。
通常用作阻止上面默认事件，然后加入自定义逻辑如（路由保护，授权，配置，重定向等）处理完后，
调用$urlRouter.sync()，进行转换。

angular.module('app', ['ui.router'])
  .run(function($rootScope, $urlRouter) {
    $rootScope.$on('$locationChangeSuccess', function(evt) {
      // Halt state change from even starting
      evt.preventDefault();
      // Perform custom logic
      var meetsRequirement = ...
      // Continue with the update and state transition if logic allows
      if (meetsRequirement) $urlRouter.sync();
    });
});

$stateProvider
.state('state1', {
  url: "/state1",
  templateUrl: "partials/state1.html"
})
.state('state1.list', {
  url: "/list",
  templateUrl: "partials/state1.list.html",
  controller: function($scope) {
    $scope.items = ["A", "List", "Of", "Items"];
  }
})
---------
ui-sref: 把路由状态绑定到a 标签，如果状态已经关联了url，指令将自动生成和更新 href 属性，通过 
$state.href() 方法。 点击链接将触发状态转换并带着选项参数。参数被传递到 $state.go()。


<ANY ui-sref="{string}" stateName
     ui-sref-opts="{Object}">
   ...
</ANY>
ui-sref-active 在元素或父元素，如果ui-sref 状态或子状态激活，ui-sref-active 所在元素添加对应类。
类插入只发生一次。
<ul>
  <li ui-sref-active="active" class="item">
    <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
  </li>
</ul>
<ul>
  <li ui-sref-active="active" class="item active">
    <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
  </li>
</ul>

<ANY ui-state="{string}"
     ui-state-params="{Object}" 参数到 $state.href()
     ui-state-opts="{Object}"> 参数的 $state.go()
   ...
</ANY>

ui-view 指令告诉$state 在什么位置放置模板。
$viewContentLoaded(event, viewName)

<div ui-view></div>
<div ui-view="chart"></div> 
<div ui-view="data"></div> 
$stateProvider.state("home", {
  views: {
    "": {
      template: "<h1>HELLO!</h1>"
    },
    "chart": {
      template: "<chart_thing/>"
    },
    "data": {
      template: "<data_thing/>"
    }
  }    
})

$state.get(stateOrName, context) 返回状态的配置对象

$state.go(to, params, options) 转换到一个新状态，通过内部调用 $state.transitionTo自动设置选项：
{
    location: true, 更新url
    inherit: true, 从当前 url 基础参数
    relative: $state.$current,  相对转换的根路径
    notify: true
}


$state.go('^') - will go to a parent state
$state.go('^.sibling') - will go to a sibling state
$state.go('.child.grandchild') - will go to grandchild state

$state.href(stateOrName, params, options) 根据参数生成新的 url，基于 stateOrName
expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");

$state.includes(stateOrName, params, options)
当前激活的状态是否等于或是stateOrName 的子状态。
$state.$current.name = 'contacts.details.item';
 
// Using partial names
$state.includes("contacts"); // returns true
$state.includes("contacts.details"); // returns true

$state.$current.name = 'contacts.details.item.url';
$state.includes("*.details.*.*"); // returns true
$state.includes("*.details.**"); // returns true
$state.includes("**.item.**"); // returns true

$state.is(stateOrName, params, options)
<div ng-class="{highlighted: $state.is('.item')}">Item</div>

$state.reload(state)

$state.transitionTo(to, toParams, options)

$stateChangeError
$stateChangeStart
$stateChangeSuccess(event, toState, toParams, fromState, fromParams)
$stateNotFound
-------------------------------
ui-router-extras
--------------------------------------
Sticky States：（粘性状态）
概况：
粘性状态可认为是ui-router 路由状态树的根，能够一直运行甚至在路由退出后。
粘性状态有着和正常状态不同的生命周期。
Dom $state 和 粘性状态的控制器及所有被激活的子状态一直保持直到下面两种情况发生：
父级的粘性状态退出，父级的粘性状态激活。

如果兄弟粘性状态（或兄弟子状态）被激活，粘性状态树则转为非激活。直到以上情况导致他退出。

这个特征是基于 tabs 用例。此用例下需要一个tab 的状态在应用中不退出当切换到其它 tab 的时候。
用户应该能够在前后标签直接切换没有任何条件终止他们的流程。 url 只能够反映激活 tab 的状态树。

对于 tabs 用例，粘性状态工作的很好当他被表为 Deep State Redirect.
API：
定义 Sticky state
sticky: true， 另外也可标记状态用 deepStateRedirect: true 使tab 能重定向。
声明named view 在状态，指向 named ui-view 在父状态的模板。

var parentState = {
    name: 'foo',
    url: '/foo',
    template: '<div ui-view="bar" ng-show="$state.includes("foo.bar") />'
}

var myStickyState = {
    name: 'foo.bar',
    url: '/bar',
    deepStateRedirect: true,
    sticky: true,
    views: {
        'bar': {
            template: '<div>Foo Bar Stuff!  </div> <div ui-view> <!-- foo.bar.* goes here --> </div>,
            controller: 'barCtrl',
        }
    }
}

$stickyState 服务提供了一对帮助函数：
$stickyState.getInactiveStates() 返回 array

$stickyState.reset(inactiveStateName, [stateParams])
inactiveStateName 退出状态 * 退出所有，stateParams 匹配的非激活状态退出。
-----------------------------------------------------
Deep State Redirect：（深度状态重定向 dsr）
dsr 能加入状态定义。
当dsr标记的子状态被激活， ui-router-extrass 记住状态及其参数。当导航到其它的状态树，dsr标记
的最近激活的子状态被保存。当转回到被dsr标记的状态，就直接用已保存的状态和参数。

基本场景是基于导航特征。 tabs 情况下，标记 tab deepStateRedirect. 能够转回以前的状态。
deepStateRedirect: true (or dsr: true for short). 
var myState = {
    name: 'foo.bar',
    url: '/bar',
    template: '<div></div>,
    controller: 'barCtrl',
    deepStateRedirect: true
}

// $state.go("foo", { fooID: 1, barID: 1 })
// params: ["fooID"]
var myState = {
    name: 'foo',
    url: '/foo/:fooID/:barID',
    template: '<div></div>,
    controller: 'fooCtrl',
    deepStateRedirect: {
        default: { state: "foo.bar.baz.defaultSubState", params: { defaultStateParam1: "99" } },
        params: true,
        fn: function($dsr$) {
            var shouldRedirect = // TODO finish docs;
        }
    }
}
var $dsr$ = {
  redirect: { state: redirect.state, params: redirect.params },
  to: { state: toState.name, params: toParams }
}

Return falsey to cancel the redirect

Return truthy to accept the redirect

Return an object { state: redirectState, params: redirectParams } to change the redirect
--------------------------------
FutureStates Delayed state definition 未来状态，延迟状态定义
延迟声明的状态
两种 phases 启动和执行应用。config and runtime.
ui-router 提供了 $stateProvider 用于声明应用的路由状态在 config 过程。
一旦应用进入 runtime 过程。$stateProvider 通常不再有效。
未来状态可以认为是整个路由状态树的占位符，它完整的定义暂时未知。
未来状态在 config 期间声明，运行时也可。当导航到此时将替换整个 ui-router 状态。
整个路由状态用 $stateProvider 来注册。

延后状态绑定处理
当路由转回请求的状态不存在， $futureStatesProvider 检查缺失的状态十分能映射到 FutureState, 或其后代.
当发现对应的状态的占位符，他就假定转换发生时有效的根据url。
他就开始懒加载整个 ui-router 的状态定义。
如果重试失败， stateChangeError 发生。

延迟加载状态代码或模板
延迟绑定状态在运行时允许你去加载状态从一个文件或者服务端api。但是延迟绑定并不能独自解决延迟加载js
代码和模板在需要时。必须使用其他工具动态加载状态模板和控制器，并把他们添加进angular环境。
FutureState 不知道怎样去加载代码在需要时。不能自己执行延迟加载状态代码（控制器和视图）。可以使用
requireJs and angularAMD .
angularAMD 使用 requireJs 去加载和注入 angular 代码到 DI 系统。

$futureStateProvider: 主要的配置定。注入到 config or provider 块。提供一个api 去注册 FutureStates.
$futureState: 服务的运行时部分。很少使用这个。

FutureState objects: 用户定义的占位符对象描述了一个将来的 ui-router 状态。
StateFactory objects: 用户定义的工厂对象，根据给定的占位符FutureState 对象,构建并返回一个完整的
ui-router 状态定义或者注册一个完整的ui-router 状态（或整个状态树）用$stateProvider定义,
在FutureState占据的位置。

$futureStateProvider.futureState (futureStateDefinition) 
This method registers a FutureState object as a placeholder for a full UI-Router state or state tree. 

$futureStateProvider.stateFactory (type, stateFactory) 
This method registers a StateFactory function for FutureState of type type. 

$futureStateProvider.addResolve (resolveFunction) 核心是获取延迟的状态
This method adds a resolve function. Resolve functions are injected functions that return a promise. 
$futureStateProvider won't reject any state transitions or routes until all resolveFunction promises have been resolved. 
Resolves may be used to defer routing until 【the states have been loaded】 via $http, for instance. 

每个 FutureState  包括：
stateName： 状态的占位符名。试图转换到FutureState 描述的这个状态或子状态将触发一个完整ui-router 状态的懒加载

url： 占位符 url路径片段（片段是将要访问状态的url前缀，不是状态源码的 url）试图导航到以这个片段开始的url将
触发FutureState 描述的路由状态懒加载。

type：通过type去选择注册的 StateFactory。
var adminModuleFutureState = {
    stateName: 'app.admin',
    url: '/admin',
    type: 'ngload',
    src: 'js/modules/admin.js' // example custom attr
}

StateFactory 工厂服务转换 FutureState 到一个完整的 UI-Router 状态,或者状态树。
一个 StateFactory 是注入服务函数在运行时使用。调用的时候，函数被注入带着 FutureState.
函数处理 FutureState 然后转换它为一个完整的ui-router 状态。函数应返回 promise，
他被 resolved 当完整的 ui-router 状态加载完。

注册完成的 UI-Router 状态或树用 UI-Router's $stateProvider
或返回 the state by resolving the promise with the state
If the promise resolves to an object, Future States will register that object using $stateProvider.state(obj).
If the promise is rejected, Future States will trigger $urlRouter.otherwise(). 

var templateLoadStateFactory = function($q, $timeout, futureState) {
    var d = $q.defer();
    $timeout(function() {
      var fullUiRouterState = {
        name: futureState.stateName,
        url: futureState.urlPrefix,
        template: '<h1>Template</h1>'
      }
      d.resolve(fullUiRouterState); // Async resolve of ui-router state promise
    }, 1000);
    return d.promise; // ui-router state promise returned
}