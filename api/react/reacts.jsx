http://taobaofed.org/
Redux-Devtools
redux !!! 优化：http://dev.qq.com/topic/579083d1c9da73584b02587d
框架的稳定性和业务的稳定性是两个不同的方向，业务需要的是容错，而框架需要的是兜底。
https://css-tricks.com/learning-react-redux/
http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html
http://www.theodo.fr/blog/2016/03/getting-started-with-react-redux-and-immutable-a-test-driven-tutorial-part-2/
https://css-tricks.com/learning-react-redux/
中间件 让你在每个 action 对象分发出去之前，注入一个自定义的逻辑来解释你的 action 对象。
http://cn.redux.js.org/docs/recipes/ReducingBoilerplate.html
---------------------------------------------
ReactDOM.unstable_renderSubtreeIntoContainer
ReactDOM 中不稳定的 API 方法 unstable_renderSubtreeIntoContainer 。它的作用很简单，就是更新组件到传入的 DOM 节点上，我们在这里使用它完成了在组件内实现跨组件的 DOM 操作。

这个方法与 render 是不是很相似，但 render 方法缺少了一个插件某一个节点的参数。从最终 ReactDOM 方法实现的源代码 react/src/renderers/dom/client/ReactMount.js 中了解 unstable_renderSubtreeIntoContainer 与 render 方法对应调用的方法区别是：

render: ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);

unstable_renderSubtreeIntoContainer: ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);

源代码证明了我们的猜想，也就说明两者区别在于是否传入父节点。
-------------------------------------

链接：https://www.zhihu.com/question/66068748/answer/238387766
1）React 的事件绑定，在服务端渲染时，并不会以 <div onclick="xxx" /> 这种内联事件形态出现。所以，ReactDOMServer 渲染的内容在「结构-样式-行为」铁三角关系里，缺失了「行为」
2）在 React v15 版本里，ReactDOM.render 方法可以根据 data-react-checksum 的标记，复用 ReactDOMServer 的渲染结果，不重复渲染，而是根据 data-reactid 属性，找到需要绑定的事件元素，进行事件绑定的处理。补完「结构-样式-行为」。
3）在 React v16 版本里，ReactDOMServer 渲染的内容不再有 data-react 的属性，而是尽可能复用 SSR 的 HTML 结构。这就带来了一个问题，ReactDOM.render 不再能够简单地用 data-react-checksum 的存在性来判断是否应该尝试复用，如果每次 ReactDOM.render 都要尽可能尝试复用，性能和语义都会出现问题。
所以， ReactDOM 提供了一个新的 API， ReactDOM.hydrate()

4）在 React v17 版本里，ReactDOM.render 则直接不再具有复用 SSR 内容的功能。
见：https://github.com/facebook/react/blob/master/src/renderers/dom/shared/__tests__/ReactRenderDocument-test.js#L32-L34

结论：hydrate 描述的是 ReactDOM 复用 ReactDOMServer 服务端渲染的内容时尽可能保留结构，并补充事件绑定等 Client 特有内容的过程。
------------------
尝试把尽可能多的组件无状态化。
State 应该包括那些可能被组件的事件处理器改变并触发用户界面更新的数据。

计算所得数据
React 组件
基于 props 的重复数据
--------------------
aria- 开头的 [网络无障碍] 属性
<div data-custom-attribute="foo" />
<div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} />
<div>{'First ' + String.fromCharCode(183) + ' Second'}</div>

React.initializeTouchEvents(true); 启用触摸事件处理。

React 把用户界面当作简单状态机。
React 只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。
React 来决定如何最高效地更新 DOM

** 尝试把尽可能多的组件无状态化。**
这样做能隔离 state，把它放到最合理的地方，也能减少冗余，同时易于解释程序运作过程。

常用的模式是创建多个只负责渲染数据的无状态（stateless）组件，在它们的上层创建一个有状态（stateful）组件并把它的状态通过 props 传给子级。
这个有状态的组件封装了所有用户的交互逻辑，而这些无状态组件则负责声明式地渲染数据。

this.props.children 是一个不透明的数据结构： 通过 React.Children 工具类 来操作

子级校正（Reconciliation）
校正就是每次 render 方法调用后 React 更新 DOM 的过程。

有时候需要做细粒度的性能控制。这种情况下，
可以重写 shouldComponentUpdate() 方法返回 false 来让 React 跳过对子树的处理。
键值仅需要在兄弟节点中唯一，而不是全局唯一。
// http://reactjs.cn/react/docs/reusable-components.html
React.PropTypes 提供很多验证器 (validator) 来验证传入数据的有效性。
  propTypes: {
    children: React.PropTypes.element.isRequired
  },
getDefaultProps() 可以保证 this.props.value 有默认值
-------------------------------------------------------------------------
Redux 就是用来确保 state 变化的可预测性，主要的约束有：

    state 以单一对象存储在 store 对象中
    state 只读
    使用纯函数 reducer 执行 state 更新

  action 可以理解为应用向 store 传递的数据信息

  reducer 实际上就是一个函数：(previousState, action) => newState。
  用来执行根据指定 action 来更新 state 的逻辑

combineReducers(reducers) 可以把多个 reducer 合并成一个 root reducer

store 是一个单一对象：
    管理应用的 state
    通过 store.getState() 可以获取 state
    通过 store.dispatch(action) 来触发 state 更新
    通过 store.subscribe(listener) 来注册 state 变化监听器，也是操作state的中间件
    通过 createStore(reducer, [initialState]) 创建

------
mixin
var React = require('react');
var ReactDOM = require('react-dom');

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var TickTock = React.createClass({
  mixins: [SetIntervalMixin], // 引用 mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // 调用 mixin 的方法
  },
  tick: function() {
    if(this.state.seconds < 5){
      this.setState({seconds: this.state.seconds + 1});
    }else {
      this.componentWillUnmount();
    }
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds
      </p>
    );
  }
});

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);

-----/ 解构赋值，防止不必要的属性向下传递
var FancyCheckbox = React.createClass({
  render: function() {
    var { checked, ...other } = this.props;
    var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
    // `other` 包含 { onClick: console.log } 但 checked 属性除外
    return (
      <div {...other} className={fancyClass} />
    );
  }
});
ReactDOM.render(
  <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
    Hello world!
  </FancyCheckbox>,
  document.body
);
///
<input type="text" defaultValue="Hello!" />;
与 HTML 不同，React 组件必须在任何时间点描绘视图的状态，而不仅仅是在初始化时。

React.findDOMNode(component)函数，你可以调用这个函数来获取该组件的DOM结点。
findDOMNode()仅在挂载的组件上有效（也就是说，组件已经被放进了DOM中）。
我们提供will方法，会在某些行为发生之前调用，和did方法，会在某些行为发生之后调用。

refs属性允许你引用 render() 返回的相应的支撑实例（ backing instance ）。
这样就可以确保在任何时间总是拿到正确的实例。
你可以通过调用 this.refs.myInput.getDOMNode() 直接获取到组件的 DOM 节点。
var MyComponent = React.createClass({
    componentDidMount: function () {
        $(this.myTextInput).css('border','1px solid red');
        console.log("x: ", this.myTextInput)
    },
    getInput: function () {
      console.log(this.myTextInput.value);
    },
    render: function () {
        // The ref attribute is a callback that saves a reference to the
        // component to this.myTextInput when the component is mounted.
        return (
            <div>
                <input type="text" ref={(c) => this.myTextInput = c} onKeyUp={this.getInput}/>
            </div>
        );
    }
});
------------------------------------------------------------------------addons
require('react/addons')
TransitionGroup和CSSTransitionGroup，用于处理动画和过渡，这些通常实现起来都不简单，例如在一个组件移除之前执行一段动画。
LinkedStateMixin，用于简化用户表单输入数据和组件 state 之间的双向数据绑定。
classSet，用于更加干净简洁地操作 DOM 中的 class 字符串。
cloneWithProps，用于实现 React 组件浅复制，同时改变它们的 props 。
update，一个辅助方法，使得在 JavaScript 中处理不可变数据更加容易。

setState() 将总是触发一次重绘，除非在 shouldComponentUpdate() 中实现了条件渲染逻辑。

如果 render() 方法从 this.props 或者 this.state 之外的地方读取数据，你需要通过调用 forceUpdate() 告诉 React 什么时候需要再次运行 render()
--------------------------------------------------------------------------------
// onScroll doesn't work in IE8 https://github.com/facebook/react/issues/631
// http://facebook.github.io/react/downloads.html#individual-downloads
// <script src="https://fb.me/react-with-addons-0.14.6.js"></script>
// https://github.com/xcatliu/react-ie8
// <script src="build/es5-shim.js"></script>
// <script src="build/es5-sham.js"></script>
<Component {...this.props} more="values" />
React.createElement(Component, Object.assign({}, this.props, { more: 'values' }));

The ... syntax is part of the Object Rest Spread proposal.
// 核心概念
// 相信组件的方式优于模板+显示逻辑。标记和生成的代码应该紧密的绑定在一起。
// 显示逻辑经常很复杂使用模板就去表达就会变的很臃肿。
// the Babel REPL.
// 自动绑定和事件代理
// 界面元素作为简单的状态机，状态改变触发渲染基于这个新的状态。
// 设置状态 setState(data, callback), 合并 data 到 this.state 重新渲染组件。
var LikeButton = React.createClass({
    getInitialState: function() {
        return {liked: false};
    },
    handleClick: function(event) {
        this.setState({liked: !this.state.liked});
    },
    render: function() {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
            <p onClick={this.handleClick}>
                You {text} this. Click to toggle.
            </p>
        );
    }
});

ReactDOM.render(
    <LikeButton />,
    document.getElementById('example')
);

-----------------
// https://facebook.github.io/react/docs/reusable-components.html
// PropTypes exports a range of validators 确认你收到的是正确的数据.
// 性能的原因 propTypes is only checked in development mode.
// getDefaultProps() will be cached and used to ensure that this.props.value will have a value

var ComponentWithDefaultProps = React.createClass({
  getDefaultProps: function() {
    return {
      value: 'default value'
    };
  }
  /* ... */
});

------------------
Transferring Props: A Shortcut {...this.props}
var CheckLink = React.createClass({
  render: function() {
    // This takes any props passed to CheckLink and copies them to <a>
    return <a {...this.props}>{'√ '}{this.props.children}</a>;
  }
});

ReactDOM.render(
  <CheckLink href="/checked.html">
    Click here!
  </CheckLink>,
  document.getElementById('example')
);
----------------------

require('./test.scss');
// var ReactCSSTransitionGroup = require('react-addons-linked-state-mixin');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var TodoList = React.createClass({
  getInitialState: function() {
    return {items: ['hello', 'world', 'click', 'me']};
  },
  handleAdd: function() {
    var newItems =
      this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  },
  handleRemove: function(i) {
    var newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  },
  render: function() {
    // 拼接 html，只要函数里面用到了 this 就要用 bind 把 this 传进去。
    var items = this.state.items.map(function(item, i) {
      return (
        // 注意这里，传值的规范 this.handleRemove.bind(this, i)，函数要用 bind 传值。
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    }.bind(this));
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

ReactDOM.render(
  <TodoList />,
  document.getElementById('example')
);
-----------
var WithoutLink = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  render: function() {
    var valueLink = this.linkState('message');
    var handleChange = function(e) {
      valueLink.requestChange(e.target.value);
    };
    return <input type="text" value={valueLink.value} onChange={handleChange} />;
  }
});

var update = require('react-addons-update');
-----------------
// ES6 : The API is similar to React.createClass with the exception of getInitialState. Instead of providing a separate getInitialState method, you set up your own state property in the constructor.

// Another difference is that propTypes and defaultProps are defined as properties on the constructor instead of in the class body.

// You'll have to explicitly use .bind(this) or arrow functions =>.
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: parseInt(props.initialCount, 10)};
        this.tick = this.tick.bind(this);
    }

    tick() {
        this.setState({count: this.state.count + 1});
    }

    render() {
        return (
            <div onClick={this.tick}>
                Clicks: {this.state.count}
            </div>
        );
    }
}
Counter.propTypes = {initialCount: React.PropTypes.number};
Counter.defaultProps = {initialCount: 0};

import React from 'react'
import ReactDOM from 'react-dom'
require("../styles/main.scss");
import Counter from "./tick.jsx"; // or
var Counter = require("./tick.jsx").Counter;

ReactDOM.render(
    <Counter initialCount={1} />,
    $("#counter")[0]
);
----------------------------
const HelloMessage = (props) => <div>Hello, {props.name}</div>;
HelloMessage.propTypes = {
  name: React.PropTypes.string
}
HelloMessage.defaultProps = {
  name: 'John Doe'
}
ReactDOM.render(<HelloMessage name="Mădălina"/>, mountNode);
----------------------------

// form:
getInitialState: function() {
    return {value: 'Hello!'};
},
handleChange: function(event) {
    this.setState({value: event.target.value});
},
render: function() {
    var value = this.state.value;
    return <input type="text" value={value} onChange={this.handleChange} />;
}

render: function() {
    // defaultChecked
    return <input type="text" defaultValue="Hello!" />;
}

<select multiple={true} value={['B', 'C']}>
----------------------------------
挂载
getInitialState(): object在组件被挂载之前调用。状态化的组件应该实现这个方法，返回初始的state数据。
componentWillMount()在挂载发生之前立即被调用。
componentDidMount()在挂载结束之后马上被调用。需要DOM节点的初始化操作应该放在这里。

更新
componentWillReceiveProps(object nextProps)当一个挂载的组件接收到新的props的时候被调用。该方法应该用于比较this.props和nextProps，然后使用this.setState()来改变state。
shouldComponentUpdate(object nextProps, object nextState): boolean当组件做出是否要更新DOM的决定的时候被调用。实现该函数，优化this.props和nextProps，以及this.state和nextState的比较，如果不需要React更新DOM，则返回false。
componentWillUpdate(object nextProps, object nextState)在更新发生之前被调用。你可以在这里调用this.setState()。
componentDidUpdate(object prevProps, object prevState)在更新发生之后调用。

移除
componentWillUnmount()在组件移除和销毁之前被调用。清理工作应该放在这里。
挂载的方法（Mounted Methods）

_挂载的_复合组件也支持如下方法：
<input ref={ function(component){ React.findDOMNode(component).focus();} } />
getDOMNode(): DOMElement可以在任何挂载的组件上面调用，用于获取一个指向它的渲染DOM节点的引用。
forceUpdate()当你知道一些很深的组件state已经改变了的时候，可以在该组件上面调用，而不是使用this.setState()。
------------------------
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  return (
    <div>
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);




// https://facebook.github.io/react/docs/create-fragment.html
if (this.props.swapped) {
  children = createFragment({
    right: this.props.rightChildren,
    left: this.props.leftChildren
  });
} else {
  children = createFragment({
    left: this.props.leftChildren,
    right: this.props.rightChildren
  });
}

顶层API：
--------------------------------------------------
React.Component 是通过 es6 类定义的。用于es6 的组件创建。
----
React.createClass 通过指定的格式创建一个组件类。一个组件执行 render 方法 返回单一的子结构。
这个子类结构可以很深，不同于标准的原型类，调用不需要 new。已经在后方包装好了。
----
React.createElement (string/ReactClass type, object props, children) 创建并返回一个新的
ReactElement 通过指定的格式创建一个组件类。一个组件执行给定的类型。type 参数可以是 html 标签名
或一个 ReactClass(通过 React.createClass 创建的)
----
React.cloneElement( ReactElement element, object props, children)
新的 children 将替换原来的children。 保留原来的 props 并与新的 props 浅合并。 不像
React.addons.cloneWithProps key 和 ref 将被保留。
----
React.createFactory(string/ReactClass type) 返回一个函数，这个函数处理给定 type 的 ReactElement.
和 createElement 相似，也可以是 html 标签。
----
React.isValidElement(* object) 验证对象是一个 ReactElement

React.DOM  提供了createElement 比较便利的包装对 DOM组件。仅仅在不使用 jsx 的情况下。
例如：React.DOM.div(null, 'hello')
----
React.PropTypes 包含好多类型，组件的 propTypes 对象使用它验证传递到组件的 props 的类型。
https://facebook.github.io/react/docs/reusable-components.html
----
React.Children 提供了处理 this.props.children 的不透明数据结构。
  React.Children.map/forEach/count/only/toArray
--------
ReactDOM 提供了DOM 特定的方法，脱离 react model。
----
ReactDOM.render( ReactElement, DOMElement, function callback)
把 ReactElement 渲染到提供的容器，并返回一个组件的引用，或返回空对无状态组件。
如果 ReactElement 已经渲染到了容器，他将执行一个【更新】仅操作DOM根据需要，显示最后的组件。
回调在渲染完或更新后调用。
将来版本渲染可恩是异步的在某些情况下。如果你需要一个根组件实例的引用，优选方案是添加一个回调 ref 给根元素。
----
ReactDOM.unmountComponentAtNode(DOMElement container)
移除React 组件从 DOM 并且清除事件句柄和状态(handlers state)。 如果组件没映射在容器，那什么都不做。
返回 true 解除成功。 false 如果无组件可可移除。
----
ReactDOM.findDOMNode(ReactComponent component)
组件已映射到DOM, 返回对应的浏览器的 DOM 元素。多数情况可以附加 ref 到节点避免使用这个函数。
这个方法主要用在读 DOM 外面的值。不能被用在无状态的组件上。也必须在映射以后才可调用。

组件 API：
----------------------------------------
ReactComponent 的实例创建是在渲染的时候。可以重用在后面的渲染，也可以通过组件方法的 this 访问。
通过存储 render的返回值，可以在组件外面访问它。内部的其他组件可以使用 refs 达到同样的结果。
----
setState(func|object nextState, func callback) 执行浅合并，nextState 到 current state.
这是一个基本的方法去触发 UI 更新从 event handlers 和 服务端请求回调。
setState(function(previousState, currentProps) {
  return {myInteger: previousState.myInteger + 1};
});
第二个参数的回调在setState 执行完，组件重新渲染完。
绝不要直接操作 this.state, 一定要通过调用 setState。
总是触发 re-render 除非渲染逻辑条件在 shouldComponentUpdate() 执行。
它也不直接操作，而是建立一个挂起的状态转换。
如果操作的对象在被使用，并且逻辑不能执行在 shouldComponentUpdate()，
在调用的 setState() 仅当新状态不同于以前的状态将避免不必要的 re-renders.
----
replaceState 像 setState() 但是要删除已不在nextState中存在的 state keys。
不能在 es6 class 组件中用。
----
forceUpdate(callback) 通常组件的 state 或 props 发生变化，组件将重新渲染。
然而如果一些改变比较隐晦（如深度的对象）或者你的 render() 方法依赖一些其他的数据，
你需要告诉 React 重新运行下 render() 通过调用 forceUpdate().
调用 forceUpdate() 引起 render() 被调用在组件上，但跳过组件自己的 shouldComponentUpdate().
调用将触发方法正常的生命周期在子组件中，包括他们的 shouldComponentUpdate().
React 仅更新 DOM 如果标记改变。
通常要避免都使用 forceUpdate, 并且 render() 仅来自于 props 和 state。
----
isMounted 返回 true 如果组件渲染到 DOM。可以使用这个方法图监视异步调用：setState or forceUpdate。
不能在es6 class 组件中使用。
----------------------------------
组件规范和生命期
当通过 React.createClass 创建组件，应该提高规范的对象，他包含 render 方法和其他可选的包含在
生命期的方法描述在这里。
----
ReactElement render() 必须的。
当调用，检查 this.props 和 this.state 并且返回一个单一的子元素。这个子元素既是一个虚拟的本地DOM组件的描述，
（如： <div /> or React.DOM.div()）也是其他你定义的复合组件。
你也可以返回 null 或 false 来表示你不想有任何的渲染。
render 函数并不修改组件的 state, 不从Dom读或写 及其他的交互在浏览器。
想交互则通过 componentDidMount或其他方法代替。保证 render 的纯性。
----
getInitialState 在组件映射后调用一次。返回值当做 this.state 的初值。
----
getDefaultProps 当类被创建后，调用一次并缓存。值在映射中根据 this.props 来设置如果父组没指定 prop。
在任何实例被建立前调用也不依赖于 this.props。避免返回复杂的对象，他是跨实例共享而不是复制的。

propTypes object 验证 props。

mixins array mixins 共享行为在多个组件。

statics object 定义静态方法，在组件类中调用。
var MyComponent = React.createClass({
  statics: {
    customMethod: function(foo) {
      return foo === 'bar';
    }
  },
  render: function() {
  }
});

MyComponent.customMethod('bar');  // true

displayName 显示调试信息用于. jsx 自动设置。
------------------------------------------
生命期方法：
----
Mounting: componentWillMount 调用一次在初始化渲染发生时。如果在里面调用了 setState，
render() 将查看更新后的 state 并且根据期望的状态改变执行一次 render 。
----
Mounting: componentDidMount 执行一次在渲染时候。在这个周期点，你可以访问 refs 。
子组件的该方法要先调用。集成其他js 或 ajax 应在这个方法里。
----
Updating: componentWillReceiveProps (object nextPorps) 当组件接受新 props 时调用。
不在初始时调用。使用这个的时机是反映 prop 转换在 render 调用前通过更新状态使用 this.setState()。
在这个函数内调用 this.setState 不触发 render。
componentWillReceiveProps: function(nextProps) {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
}
http://reactjs.cn/react/blog/2016/01/08/A-implies-B-does-not-imply-B-implies-A.html
class Component extends React.Component {
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps.data.bar);
    }
    render() {
        return <div>Bar {this.props.data.bar}!</div>;
    }
}

var container = document.getElementById('example');

var mydata = {bar: 'drinks'};
ReactDOM.render(<Component data={mydata} />, container);
mydata.bar = 'food'
ReactDOM.render(<Component data={mydata} />, container);
mydata.bar = 'noise'
ReactDOM.render(<Component data={mydata} />, container);

----
优化：http://taobaofed.org/blog/2016/08/12/optimized-react-components/
        //

import PureRenderMixin from 'react-addons-pure-render-mixin';
class FooComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return <div className={this.props.className}>foo</div>;
  }
}
Updating: shouldComponentUpdate(nextProps, nextState)
收到新的 props 和 state 渲染前调用。不能在初始化和 forceUpdate 触发。

当调用这个返回 false 的时候，你必然确认新的state 和 props 不需要组件更新。
render 将完全跳过直到下一次 state 变化。另外 componentWillMount componentDidMount 也不被调用。
----
Updating: componentWillUpdate(nextProps, nextState)
渲染前调用当新的 props 和 state 收到。用于执行预处理在更新前。不能调用 this.setState在这里。

----
Updating: componentDidUpdate(prevProps, prevState) 组件更新完Dom后调用。

--
Unmounting: componentWillUnmount 组件去除映射前调用。
-------------------------------------------------
SyntheticEvent 综合事件：
boolean        bubbles
boolean        cancelable
DOMEventTarget currentTarget
boolean        defaultPrevented
number         eventPhase
boolean        isTrusted
DOMEvent       nativeEvent
void           preventDefault()
boolean        isDefaultPrevented()
void           stopPropagation()
boolean        isPropagationStopped()
DOMEventTarget target
number         timeStamp
string         type
http://reactjs.cn/react/docs/events.html
this.setState({eventType: event.type});
If you want to access the event properties in an asynchronous way,
you should call event.persist() on the event, which will remove the
synthetic event from the pool and allow references to the event to be retained by user code.
-------------------------------------
虚拟DOM
React Elements 的基本类型：type props key ref。
轻量、无状态、不可变、虚拟表示的DOM元素。
var child = React.createElement('li', null, "text content");
React.createElement('ul', {className: 'my-list'}, child);

工厂 ：创建元素的快捷方式
var div = React.createFactory('div');
var root = div({ className: 'my-div' });
ReactDOM.render(root, document.getElementById('example'));

var root = React.DOM.ul({ className: 'my-list' },
             React.DOM.li(null, 'Text Content')
           );
使用 jsx 则不需要工厂。

节点：ReactElement ReactText Array of ReactNode/ReactFragment

组件：http://reactjs.cn/react/docs/glossary.html
var componentA = ReactDOM.render(<MyComponent />, document.getElementById('example'));
var componentB = ReactDOM.render(<MyComponent />, document.getElementById('example'));
componentA === componentB; // true
----------------------------------------------
内联样式：
var divStyle = {
  color: 'white',
  backgroundImage: 'url(' + imgUrl + ')',
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};

ReactDOM.render(<div style={divStyle}>Hello World!</div>, mountNode);
------
If-Else in JSX
if-else 语句不能工作在 JSX. 因为JSX 是函数调用和对象构造的语法糖.
// This JSX:
ReactDOM.render(<div id="msg">Hello World!</div>, mountNode);
// 被转换成 this JS:
ReactDOM.render(React.createElement("div", {id:"msg"}, "Hello World!"), mountNode);
可以在内部使用三元运算符（ternary)
ReactDOM.render(<div id={condition ? 'msg' : null}>Hello World!</div>, mountNode);
或者 if 语句放在 jsx 外面：
var loginButton;
if (loggedIn) {
  loginButton = <LogoutButton />;
} else {
  loginButton = <LoginButton />;
}

return (
  <nav>
    <Home />
    {loginButton}
  </nav>
);
如果你更喜欢内联，定义立即调用表达式可以：
return (
  <section>
    <h1>Color</h1>
    <h3>Name</h3>
    <p>{this.state.color || "white"}</p>
    <h3>Hex</h3>
    <p>
      {(() => {
        switch (this.state.color) {
          case "red":   return "#FF0000";
          case "green": return "#00FF00";
          case "blue":  return "#0000FF";
          default:      return "#FFFFFF";
        }
      })()}
    </p>
  </section>
);
jsx root 要返回一个node, 三元符里也是一个。像素px 可以不写。

通常组件组件子元素是一个组件数组。
var GenericWrapper = React.createClass({
  componentDidMount: function() {
    console.log(Array.isArray(this.props.children)); // => true
  },

  render: function() {
    return <div />;
  }
});

ReactDOM.render(
  <GenericWrapper><span>{1}</span><b>{"he"}</b></GenericWrapper>,
  mountNode
);
当仅有一个子元素时候，就没有被包装成数组：
var GenericWrapper = React.createClass({
  componentDidMount: function() {
    console.log(Array.isArray(this.props.children)); // => false

    // warning: yields 5 for length of the string 'hello', not 1 for the
    // length of the non-existent array wrapper!
    console.log(this.props.children.length);
  },

  render: function() {
    return <div />;
  }
});

ReactDOM.render(<GenericWrapper>hello</GenericWrapper>, mountNode);
--------------------
加载初始化数据通过 ajax:
获取数据在componentDidMount 当响应到达，保存数据到state,触发ui 的更新渲染。
当获取异步使用 componentWillUnmount 去取消请求。

var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        {this.state.username}s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  mountNode
);
-----
No child:
ReactDOM.render(<div>{false}</div>, mountNode);
String "false" as input value:
ReactDOM.render(<input value={false} />, mountNode);
-----
父子组件通信通过传递 props.
子组件相互通信可以通过设置全局事件
var handleClick = function(i, props) {
    console.log('You clicked: ' + props.items[i]);
};

function GroceryList(props) {
    return (
        <div>
            {props.items.map(function(item, i) {
                return (
                    <div onClick={handleClick.bind(this, i, props)} key={i}>{item}</div>
                );
            })}
        </div>
    );
}

ReactDOM.render(
    <GroceryList items={['Apple', 'Banana', 'Cranberry']} />, document.getElementById('example2')
);
也可以暴露子组件的方法供父组件来调用：
-------
var Todo = React.createClass({
    render: function() {
        return <div onClick={this.props.onClick}>{this.props.title}</div>;
    },

    //this component will be accessed by the parent through the `ref` attribute
    animate: function() {
        console.log('Pretend %s is animating', this.props.title);
    }
});

var Todos = React.createClass({
    getInitialState: function() {
        return {items: ['Apple', 'Banana', 'Cranberry']};
    },

    handleClick: function(index) {

        var items = this.state.items.filter(function(item, i) {
            return index !== i;
        });
        this.setState({items: items}, function() {
            if (items.length === 1) {
                this.refs.item0.animate();
            }
        }.bind(this));
    },

    render: function() {
        return (
            <div>
                {this.state.items.map(function(item, i) {
                    console.log(this)
                    var boundClick = this.handleClick.bind(this, i);
                    return (
                        <Todo onClick={boundClick} key={i} title={item} ref={'item' + i} />
                    );
                }, this)}
            </div>
        );
    }
});

ReactDOM.render(<Todos />, document.getElementById('example2'));