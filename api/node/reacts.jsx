aria- 开头的 [网络无障碍] 属性
<div data-custom-attribute="foo" />
<div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} />
<div>{'First ' + String.fromCharCode(183) + ' Second'}</div>

React.initializeTouchEvents(true); 启用触摸事件处理。

React 把用户界面当作简单状态机。
React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。
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
React.render(
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

Transferring Props: A Shortcut {...this.props}

Mixins : mixins: [SetIntervalMixin]

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.forEach(clearInterval);
    }
};
// https://facebook.github.io/react/docs/working-with-the-browser.html
var TickTock = React.createClass({
    mixins: [SetIntervalMixin], // Use the mixin
    getInitialState: function() {
        return {seconds: 0};
    },
    componentDidMount: function() {
        this.setInterval(this.tick, 1000); // Call a method on the mixin
    },
    tick: function() {
        this.setState({seconds: this.state.seconds + 1});
    },
    render: function() {
        return (
            <p>React has been running for {this.state.seconds} seconds</p>
        );
    }
});

ReactDOM.render(
    <TickTock />,
    document.getElementById('example')
);/
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
    var items = this.state.items.map(function(item, i) {
      return (
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

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick.bind(this)}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
Counter.propTypes = { initialCount: React.PropTypes.number };
Counter.defaultProps = { initialCount: 0 };

// Transferring with ... in JSX 
var FancyCheckbox = React.createClass({
  render: function() {
    var { checked, ...other } = this.props;
    var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
    // `other` contains { onClick: console.log } but not the checked property
    return (
      <div {...other} className={fancyClass} />
    );
  }
});

ReactDOM.render(
  <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
    Hello world!
  </FancyCheckbox>,
  document.getElementById('example')
);

var FancyCheckbox = React.createClass({
  render: function() {
    var checked = this.props.checked;
    var other = _.omit(this.props, 'checked');
    var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
    return (
      React.DOM.div(_.extend({}, other, { className: fancyClass }))
    );
  }
});
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

// Mounting

//     getInitialState(): object is invoked before a component is mounted. Stateful components should implement this and return the initial state data.
//     componentWillMount() is invoked immediately before mounting occurs.
//     componentDidMount() is invoked immediately after mounting occurs. Initialization that requires DOM nodes should go here.

// Updating

//     componentWillReceiveProps(object nextProps) is invoked when a mounted component receives new props. This method should be used to compare this.props and nextProps to perform state transitions using this.setState().
//     shouldComponentUpdate(object nextProps, object nextState): boolean is invoked when a component decides whether any changes warrant an update to the DOM. Implement this as an optimization to compare this.props with nextProps and this.state with nextState and return false if React should skip updating.
//     componentWillUpdate(object nextProps, object nextState) is invoked immediately before updating occurs. You cannot call this.setState() here.
//     componentDidUpdate(object prevProps, object prevState) is invoked immediately after updating occurs.

// Unmounting

//     componentWillUnmount() is invoked immediately before a component is unmounted and destroyed. Cleanup should go here.
// Mounted Methods

// Mounted composite components also support the following method:

//     component.forceUpdate() can be invoked on any mounted component when you know that some deeper aspect of the component's state has changed without using this.setState().

// ReactDOM.render() will return a reference to your component's backing instance 
// https://facebook.github.io/react/docs/more-about-refs.html
// The ref Callback Attribute The referenced component will be passed in as a parameter, and the callback function may use the component immediately, or save the reference for future use (or both).
    <script src="../build/react.js"></script>
    <script src="lib/react-with-addons-0.14.6.js"></script>
    <script src="../build/react-dom.js"></script>
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
        var items = this.state.items.map(function(item, i) {
            return (
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