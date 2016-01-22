// $ npm install --save react react-dom babelify babel-preset-react
// $ browserify -t [ babelify --presets [ react ] ] main.js -o bundle.js

// $ npm install --save react react-dom babel-preset-react
// $ webpack

// npm install --global babel-cli
// npm install babel-preset-react

npm install webpack-dev-server -g
npm install loder-css --save-dev
webpack ./entry.js boudle.js --moudle-bind 'css=style!css' --progress --colors --watch /

plugins: [
    new webpack.IgnorePlugin(/file\.js$/)
]
Note: require.ensure only loads the modules, it doesn’t evaluate them.
Note: AMD require loads and evaluate the modules. In webpack modules are evaluated left to right.
http://localhost:8080/webpack-dev-server/bundle 内嵌 iframe 模式加载页面

module.exports = {
  entry: {
    app: "./app.js",
    vendor: ["jquery", "underscore", ...],
  },
  output: {
    filename: "bundle.js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ]
};
---------
// babel --presets react src --watch --out-dir build
// 在 packages.json 中的scripts下加上：
// "pack": "webpack --progress --colors --watch"
// 输入 npm run-script pack 来执行 

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
);

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