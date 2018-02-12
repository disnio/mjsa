/*
* @Author: Allen
* @Date:   2016-11-10 10:08:51
* @Last Modified by:   wsc
* @Last Modified time: 2018-02-01 16:13:14
*/
时刻关注状态变化，会引起重渲染。非控制组件（获取一次值，验证当提交时），和控制组件（需要验证，格式化，关联其它表单元素等）。
什么情况下使用redux优缺点：向深层子组件传递数据时，状态多且复杂深层的对象。
什么样的数据要放到状态管理里面：容器组件相关及服务端获取的请求数据及响应数据。
性能方面都关注那些要点：高阶组件，纯组件，props 和 state 在组件中的变化 shouldComponent 是否需要重新渲染，
但比较也是有成本的，组件加 key。

关注每个组件的性能如何测试：写容器组件，加时间state 在 willMount设起始时间，didMount 中计算出时间差。

https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
"hoist-non-react-statics": "^2.2.1", 应用高阶组件包裹组件，要把组件的静态方法复制到包裹组件里。
selector 选择器本身就是 redux-react 的基本概念
------------------------
首先任何避开业务场景的技术选型都是耍流氓
http://web.jobbole.com/90635/?repeat=w3tc
-------------------------
https://tech.youzan.com/mobx_vs_redux/
redux 的缺点
1、 action和reducer太繁琐。一套或者几套action和reducer的组合，看起来很不错，但是一旦功能和需求多了，action和reducer就会很混乱。
（函数化）

2、store和state的模棱两可。没有严格的定义哪些存store，哪些存internal state。（组件数据交互）。

3、dispatch是同步的，而且dispatch没办法确认action是否执行成功.(UI 反应)

首先要承认的是redux是非常棒的框架，但是只适合资深redux玩家和中大型项目。

作者：Jim Liu
https://www.zhihu.com/question/63726609/answer/256024071
Redux是基于纯函数的，为了保证它的“纯度”，它的reducer函数必须是严格的 S' = f(S) 的形态，所以，与其说Redux是“状态管理”库，
不如说它是“状态转移管理”库，因为Redux是无状态的，状态是在你的程序里的，你自己维持状态，它只是给你提供了一个状态转移的统一方式。
这使得它的整个模型看起来是非常干净。而事实上我们在开发实际项目当中可能有小半（maybe大半）的reducer场景其实应该是
S' = await fAsync(S) 的形态，比方说，我点了一个计数器+1的按钮，在一个美丽的DEMO里，它就+1了，但放到生产需求里，
很可能是要先发起一个Ajax请求，请求OK了再+1，甚至这时候不是+1，而是直接和服务端同步一个新的值。
但异步的reducer就破坏了它的“纯度”，因为异步是不确定的，先发不一定先至，这会破坏reducer的“可回放性”，
它引以为豪的replay就不成立了，它的基石就崩塌了。这就注定了它解决不了异步的问题，然后它为了让自己显得很白玉无瑕，死活也不愿意碰异步那摊子脏东西，什么？你要在reducer里发起一个Ajax请求？对不起这不是我们的best practice，
我们对此嗤之以鼻，你如果真要这么做，那就……做去吧。于是Redux在解决异步问题上的“残疾”就注定给它擦屁股的库会如雨后春笋一样的涌现出来，比如其他回答里提到的dva，再比如redux-saga，它们都是勇士，做了redux所不愿意做的那摊子脏活。
这个过程又引入了新的麻烦，一方面是异步本身带来的复杂度，比如redux-saga里的every和latest；另一方面是代码写起来的麻烦，
比如redux-saga里各种yield，还有可以堆成山的胶水代码。所以你觉得redux写起来很麻烦，麻烦就对了，这不是幻觉，因为它为了保证自己的简洁，把麻烦的事情抛给了你。结论很简单，要么就引入更多“生态”，
让别人帮你解决麻烦，让它们对你输出价值观。要么就别走redux的函数式路线，去你大爷的纯函数，
用别的价值观，我用全局变量全局事件，用watch，用observable，用whatever，反正不用你
------------------------------
https://www.cnblogs.com/itlyh/p/6057518.html
http://geek.csdn.net/news/detail/208121
前端应用的状态容器，提供可预测的状态管理，其基本定义可以用下列公式表示:
(state, action) => newState
其特点可以用以下三个原则来描述。
单一数据源
在 Redux 中，整个应用的状态以状态树的形式，被存储在一个单例的 store 中。

状态数据只读
惟一改变状态数据的方法是触发 action，action 是一个用于描述已发生事件的普通对象。

使用纯函数修改状态
在 Redux 中，通过纯函数，即 reducer 来定义如何修改 state。
1. React有props和state: 【props意味着父级分发下来的属性】【父组件的state传递给子组件  子组件使用props获取】，
【state意味着组件内部可以自行管理的状态】，并且整个React没有数据向上回溯的能力，也就是说数据只能单向向下分发，
（单向数据流）或者自行内部消化。
理解这个是理解React和Redux的前提。
2. 一般构建的React组件内部可能是一个完整的应用，它自己工作良好，你可以通过属性作为API控制它。但是更多的时候发现React根本无法让两个组件互相交流，使用对方的数据。
然后这时候不通过DOM沟通（也就是React体制内）解决的唯一办法就是提升state，将state放到共有的父组件中来管理，再作为props分发回子组件。
3. 子组件改变父组件state的办法只能是通过onClick触发父组件声明好的回调，也就是父组件提前声明好函数或方法作为契约描述自己的state将如何变化，再将它同样作为属性交给子组件使用。
这样就出现了一个模式：数据总是单向从顶层向下分发的，但是只有子组件回调在概念上可以回到state顶层影响数据。这样state一定程度上是响应式的。
4. 为了面临所有可能的扩展问题，最容易想到的办法就是把所有state集中放到所有组件顶层，然后分发给所有组件。
5. 为了有更好的state管理，就需要一个库来作为更专业的顶层state分发给所有React应用，这就是Redux。让我们回来看看重现上面结构的需求：
a. 需要回调通知state (等同于回调参数) -> action
b. 需要根据回调处理 (等同于父级方法) -> reducer
c. 需要state (等同于总状态) -> store
对Redux来说只有这三个要素：
a. action是纯声明式的数据结构，只提供事件的所有要素，不提供逻辑。
b. reducer是一个匹配函数，action的发送是全局的：所有的reducer都可以捕捉到并匹配与自己相关与否，相关就拿走action中的要素进行逻辑处理，修改store中的状态，不相关就不对state做处理原样返回。
c. store负责存储状态并可以被react api回调，发布action.
当然一般不会直接把两个库拿来用，还有一个binding叫react-redux, 提供一个Provider和connect。很多人其实看懂了redux卡在这里。
a. Provider是一个普通组件，可以作为顶层app的分发点，它只需要store属性就可以了。它会将state分发给所有被connect的组件，不管它在哪里，被嵌套多少层。
b. connect是真正的重点，它是一个科里化函数，意思是先接受两个参数（数据绑定mapStateToProps和事件绑定mapDispatchToProps），再接受一个参数（将要绑定的组件本身）：
mapStateToProps：构建好Redux系统的时候，它会被自动初始化，但是你的React组件并不知道它的存在，因此你需要分拣出你需要的Redux状态，所以你需要绑定一个函数，它的参数是state，简单返回你关心的几个值。
mapDispatchToProps：声明好的action作为回调，也可以被注入到组件里，就是通过这个函数，它的参数是dispatch，通过redux的辅助方法bindActionCreator绑定所有action以及参数的dispatch，就可以作为属性在组件里面作为函数简单使用了，不需要手动dispatch。这个mapDispatchToProps是可选的，如果不传这个参数redux会简单把dispatch作为属性注入给组件，可以手动当做store.dispatch使用。这也是为什么要科里化的原因。
http://cn.redux.js.org/docs/introduction/docs/introduction/Motivation.html
https://github.com/reactjs/redux
npm install --save redux
npm install --save react-redux
npm install --save-dev redux-devtools
gist [主旨、要点]

应用的整个状态存储在对象树，单一的 store。
改变状态树的唯一方式是发送 emit 一个 action，一个对象描述了发生什么。
指定 how the actions 转换 状态树，你写纯的 reducers。

UI 不单单是对服务器端或业务逻辑状态的复制。实际上还有很多状态是针对具体的渲染目标。
我们倾向于使用不可变的数据模型。
我们把可以改变 state 的函数串联起来作为原点放置在顶层。
---------
Flux 确保所有 action 首先通过一个 dispatcher，
然后再是 store，最后通知所有的 store 监听器。

单向数据流。

当我们用 flux 以及它的单向数据流的时候，上面的例子就会变成这样子：
1) 用户点击按钮 A
2) 点击按钮A的处理程序会触发一个被分发的 action，并改变 Store A
3) 因为其它的 Store 也被这个 action 通知了，所以 Store B 也会对相同的 action 做出反应
4) View B 因为 Store A 和 Store B 的改变而收到通知，并重新渲染

来看一下我们是如何避免 Store A 和 Store B 直接相关联的。
Store 只能被 action 修改，别无他选。并且当所有 Store 响应了 action 后，View 才会最终更新。由此可见，数据总是沿着一个方向进行流动

// 如何在应用程序的整个生命周期内维持所有数据？
// 如何修改这些数据？
// 如何把数据变更传播到整个应用程序？
//
 Redux (https://github.com/rackt/redux) 是一个“可预测化状态的 JavaScript 容器”。

// 如何在应用程序的整个生命周期内维持所有数据？
//      以你想要的方式维持这些数据，例如 JavaScript 对象、数组、不可变数据，等等。
//      我们把应用程序的数据称为状态。这是有道理的，因为我们所说的数据会随着时间的推移发生变化，这其实就是应用的状态。
//      但是我们把这些状态信息转交给了 Redux（还记得么？Redux 就是一个“容纳状态的容器”）。
// 如何修改这些数据？
//      我们使用 reducer 函数修改数据（在传统的 Flux 中我们称之为 store）。
//      Reducer 函数是 action 的订阅者。
//      Reducer 函数只是一个纯函数，它接收应用程序的当前状态以及发生的 action，然后返回修改后的新状态（或者有人称之为归并后的状态）。
// 如何把数据变更传播到整个应用程序？
//      使用订阅者来监听状态的变更情况。

// Redux 帮你把这些连接起来。
// 总之 Redux 提供了：
//     1）存放应用程序状态的容器
//     2）一种把 action 分发到状态修改器的机制，也就是 reducer 函数
//     3）监听状态变化的机制

createStore 函数必须接收一个能够修改应用状态的函数。

import { createStore } from 'redux'

var store = createStore(() => {})

// Reducer 与 Store 区别：
// 你可能已经注意到，在简介章节中的 Flux 图表中，有 Store，但没有
// Redux 中的 Reducer。那么，Store 与 Reducer 到底有哪些区别呢？
// 因此在传统的 Flux 中，Store 本身可以保存 state，但在 Redux 中，每次调用 reducer
// 时，都会传入待更新的 state。这样的话，Redux 的 store 就变成了
// “无状态的 store” 并且改了个名字叫 Reducer。
var reducer = function (...args) {
    console.log('Reducer was called with args', args)
}

var store_1 = createStore(reducer)
// 输出：Reducer was called with args [ undefined, { type: '@@redux/INIT' } ]

// 看出来了吗？我们的 reducer 被调用了，但我们并没有 dispatch 任何 action...
// 这是因为在初始化应用 state 的时候，
// Redux dispatch 了一个初始化的 action ({ type: '@@redux/INIT' })
// 小结一下：调用  reducer ，只是为了响应一个派发来的 action 。
// 在继续之前，我们先来想象一下拥有很多 action 的 reducer 长什么样子

var reducer_1 = function (state = {}, action) {
    console.log('reducer_1 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        case 'DO_SOMETHING':
            // ...
        case 'LEARN_SOMETHING':
            // ...
        case 'HEAR_SOMETHING':
            // ...
        case 'GO_SOMEWHERE':
            // ...
        // etc.
        default:
            return state;
    }
}
// reducer 是可以处理任何类型的数据结构的。你完全可以选择那些符合你的需求的
// 数据结构作为 state 的值。（例如，字面量对象、数组、布尔值、字符串或其它不可变结构）

// 在这种多个 reducer 的模式下，我们可以让每个 reducer 只处理整个应用的部分 state 。
// 那么，我们怎么合并所有的 reducer？ 我们又该如何告诉 Redux 每个 reducer 只处理一部分 state 呢？
// 其实这很简单。我们使用 combineReducers 辅助函数。

// combineReducers 接收一个对象并返回一个函数，当 combineReducers 被调用时，它会去调用每个
// reducer，并把返回的每一块 state 重新组合成一个大 state 对象（也就是 Redux 中的 Store）。

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
var store_0 = createStore(reducer)


console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())

// 但是，等一下！我们是不是可以用一个 action creator 去发送一个 action？我们确实可以
// 用一个 actionCreator，但由于它只是返回一个 action，那么就意味着它不会携带任何东西
// 到这个例子中。但为了面对未来遇到的困难，我们还是以正确的方式，
// 即以 flux 理论去做吧。让我们使用这个 action creator 发送一个我们想要的 action：

var setNameActionCreator = function (name) {
    return {
        type: 'SET_NAME',
        name: name
    }
}

store_0.dispatch(setNameActionCreator('bob'))

------------
import { createStore, combineReducers } from 'redux';

var reducer = combineReducers({
    speaker: function (state = {}, action) {
        console.log('speaker was called with state', state, 'and action', action)

        switch (action.type) {
            case 'SAY':
                return {
                    ...state,
                    message: action.message
                }
            default:
                return state;
        }
    }
});
var store_0 = createStore(reducer);

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
};

console.log("\n", 'Running our async action creator:', "\n")
store_0.dispatch(asyncSayActionCreator_1('Hi'))
// 在 Redux 中，中间件是纯粹的函数，
// 有明确的使用方法并且严格的遵循以下格式：
/*
    var anyMiddleware = function ({ dispatch, getState }) {
        return function(next) {
            return function (action) {
                // 你的中间件业务相关代码
            }
        }
    }
*/

// 如上所述，中间件由三个嵌套的函数构成（会依次调用）：
// 1) 第一层向其余两层提供分发函数和 getState 函数
//    （因为你的中间件或 action creator 可能需要从 state 中读取数据）
// 2) 第二层提供 next 函数，它允许你显式的将处理过的输入传递给下一个中间件或 Redux
//    （这样 Redux 才能调用所有 reducer)。
// 3) 第三层提供从上一个中间件或从 dispatch 传递来的 action，
//     这个 action 可以调用下一个中间件（让 action 继续流动) 或者
//     以想要的方式处理 action。

// 使用柯里化，你可以简化上述函数：
/*
    // "curry" may come any functional programming library (lodash, ramda, etc.)
    var thunkMiddleware = curry(
        ({dispatch, getState}, next, action) => (
            // 你的中间件业务相关代码
        )
    );
*/

// 我们为异步 action creator 提供的中间件叫 thunk middleware
// 它的代码在：https://github.com/gaearon/redux-thunk.
// 它看上去是这样 (为了可读性使用 ES5 语法书写该函数）:

var thunkMiddleware = function ({ dispatch, getState }) {
    // console.log('Enter thunkMiddleware');
    return function(next) {
        // console.log('Function "next" provided:', next);
        return function (action) {
            // console.log('Handling action:', action);
            return typeof action === 'function' ?
                action(dispatch, getState) :
                next(action)
        }
    }
}
-----

// 为了让 Redux 知道我们有一个或多个中间件，我们使用 Redux 的
// 辅助函数：applyMiddleware.

// applyMiddleware 接收所有中间件作为参数，返回一个供 Redux createStore 调用的函数。
// 当最后这个函数被调用时，它会产生一个 Store 增强器，用来将所有中间件应用到 Store 的 dispatch 上。
// (来自 https://github.com/rackt/redux/blob/v1.0.0-rc/src/utils/applyMiddleware.js)

// 下面就是如何将一个中间件应用到 Redux store：

import { createStore, combineReducers, applyMiddleware } from 'redux'

const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
// 针对多个中间件， 使用：applyMiddleware(middleware1, middleware2, ...)(createStore)

var reducer = combineReducers({
    speaker: function (state = {}, action) {
        console.log('speaker was called with state', state, 'and action', action)

        switch (action.type) {
            case 'SAY':
                return {
                    ...state,
                    message: action.message
                }
            default:
                return state
        }
    }
})

const store_0 = finalCreateStore(reducer)
// 输出:
//     speaker was called with state {} and action { type: '@@redux/INIT' }
//     speaker was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_s.b.4.z.a.x.a.j.o.r' }
//     speaker was called with state {} and action { type: '@@redux/INIT' }

// 现在 store 的 middleware 已经准备好了，再来尝试分发我们的异步 action：

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            console.log(new Date(), 'Dispatch action now:')
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
}

console.log("\n", new Date(), 'Running our async action creator:', "\n")

store_0.dispatch(asyncSayActionCreator_1('Hi'))
// 输出:
//     Mon Aug 03 2015 00:01:20 GMT+0200 (CEST) Running our async action creator:
//     Mon Aug 03 2015 00:01:22 GMT+0200 (CEST) 'Dispatch action now:'
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }
------

import { createStore, combineReducers } from 'redux'

var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

var reducer = combineReducers({ items: itemsReducer })
var store_0 = createStore(reducer)

store_0.subscribe(function() {
    console.log('store_0 has been updated. Latest store state:', store_0.getState());
    // 在这里更新你的视图
})

var addItemActionCreator = function (item) {
    return {
        type: 'ADD_ITEM',
        item: item
    }
}

store_0.dispatch(addItemActionCreator({ id: 1234, description: 'anything' }))
----------------------------------------------
事件数据行为：
[Action 是把数据从应用传到 store 的有效载荷。]
它是 store 数据的唯一来源。
store.dispatch() 将 action 传到 store。
action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作.
应该尽量减少在 action 中传递的数据。

Action 创建函数 就是生成 action 的方法。
Redux 中只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程。

store 里能直接通过 store.dispatch() 调用 dispatch() 方法，
但是多数情况下你会使用 react-redux 提供的 connect() 帮助器来调用。
[bindActionCreators() 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上。]

Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。

建议你尽可能地把 state 范式化，不存在嵌套。
把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据。

归并处理 (state, action)：
[reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state]。

注意每个 reducer 只负责管理全局 state 中它负责的一部分。
每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。


function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todoApp(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    }
}

Redux 提供了 combineReducers() 工具类来做上面 todoApp 做的事情

import { combineReducers } from 'redux';

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp;

使用 action 来描述 "要发生什么"，和使用 reducers 来 "根据 action 更新 state"。

Store 就是把它们联系到一起的对象。Store 有以下职责：

    维持应用的 state；
    提供 getState() 方法获取 state；
    提供 dispatch(action) 方法[更新 state]；
    通过 subscribe(listener) 注册监听器;
    通过 subscribe(listener) 返回的函数注销监听器。

当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。

import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)

createStore() 的第二个参数是可选的, 用于设置 state 初始状态。
这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致

发起 Actions, 现在我们已经创建好了 store
-----
严格的单向数据流是 Redux 架构的设计核心。

这意味着应用中所有的数据都遵循相同的生命周期，这样可以让应用变得更加可预测且容易理解。
同时也鼓励做数据范式化，这样可以避免使用多个且独立的无法相互引用的重复数据。

Redux 应用中数据的生命周期遵循下面 4 个步骤：

调用 store.dispatch(action)。
Redux store 调用传入的 reducer 函数。
根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。combineReducers()
Redux store 保存了根 reducer 返回的完整 state 树。
所有订阅 store.subscribe(listener) 的监听器都将被调用；
监听器里可以调用 store.getState() 获得当前 state。
现在，可以应用新的 state 来更新 UI。
如果你使用了 React Redux 这类的绑定库，这时就应该调用 component.setState(newState) 来更新。

