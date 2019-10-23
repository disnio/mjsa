
// 精读《怎么用 React Hooks 造轮子》
// https://github.com/dt-fe/weekly/blob/v2/080.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md

// react-use hooks 集合
// react-uid hooks
// react-use-form-state form 状态管理加事件 use hooks，无 file
// getFieldDecorator 还是基于 RenderProps 思路的，彻底的 Hooks 思路是利用之前说的 组件辅助方式，
// 提供一个组件方法集，用解构方式传给组件。

// https://github.com/ctrlplusb/easy-peasy redux hooks 的扩展

// react-hooks-render-props
// https://github.com/dai-shi/react-hooks-render-props 封装原有库，render props => hooks 这个人的需要关注

// https://www.npmjs.com/package/render-props

// https://github.com/dt-fe/weekly/blob/master/95.%E7%B2%BE%E8%AF%BB%E3%80%8AFunction%20VS%20Class%20%E7%BB%84%E4%BB%B6%E3%80%8B.md
// Function Component 不存在 this.props 的语法，因此 props 总是不可变的。Hooks 也是如此。capture value
// 利用 useRef 可以规避 capture value 特性
// this 在 Class Component 中是可变的，因此 this.props 的调用会导致每次都访问最新的 props。
// 并不是 props 变了，而是 this.props 指向了新的 props，旧的 props 找不到了
// 利用 Function Component + Hooks 可以实现 Class Component 做不到的 capture props、capture value，
// 而且 React 官方也推荐 新的代码使用 Hooks 编写。

// Function Component 替代 shouldComponentUpdate
const Button = React.memo(props => {
    // my component
});
// 或者在父级就直接生成一个自带 memo 的子元素：
function Parent(a, b) {
    const child1 = useMemo(() => <Child1 a={a}></Child1>, [a]);
    const child2 = useMemo(() => <Child1 b={b}></Child1>, [b]);
    return (
        <>
            {child1}
            {child2}
        </>
    )
}
// Class Component 的写法通常是：
class Button extends React.PureComponent {}
// 这样就自带了 shallowEqual 的 shouldComponentUpdate。

// 怎么替代 componentDidUpdate，由于 useEffect 每次 render 完执行，模拟一个 useUpdate 函数
const mounting = useRef(true);
useEffect(() => {
    if (mounting.current) {
        mounting.current = false;
    } else {
        fn();
    }
});

// 怎么替代 forceUpdate
const [ignore, forceUpdate] = useReducer(x => x + 1, 0);
function handleForce() {
    forceUpdate();
}

// useState 下标为 1 的项是用来更新数据的，而且就算数据没有变化，调用了也会刷新组件，所以我们可以把返回一个没有修改数值的 setValue
const useUpdate = () => useState(0)[1];

// state 聚合管理
function FunctionComponent() {
    const [state, setState] = useState({
      left: 0,
      top: 0,
      width: 100,
      height: 100
    });
}

setState(state => ({ ...state, left: e.pageX, top: e.pageY }));

// 获取上一个props， 利用 useEffect 在组件渲染完再执行
function Counter() {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);
    return (
        <h1>Now: {count}, before: {prevCount}</h1>
    )
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

// useState 整个函数都是 render, 因此每次初始化都会调用，如果初始值消耗时间，建议使用函数传入，这样只会执行一次。

// Function component 如果自定义 Hooks 命名和实现不够标准，函数与函数之间对接的沟通成本会更大。

// FC 是更彻底的状态驱动抽象，没有生命周期的概念，react 复制同步到 Dom

// 每次 Render 都有自己的 pros and state, capture value 特性
// 每次 Render 都有自己的 事件处理
// 每次 Render 都有自己的 Effects
// 利用 useRef 就可以绕过 Capture Value 的特性。可以认为 ref 在所有 Render 过程中保持着唯一引用，
// 因此所有对 ref 的赋值或取值，拿到的都只有一个最终状态，而不会在每个 Render 间存在隔离。
// 也可以简洁的认为，ref 是 Mutable 的，而 state 是 Immutable 的。

// Function Component 仅描述 UI 状态，React 会将其同步到 DOM，仅此而已。
// 然而舍弃了生命周期的同步会带来一些性能问题，所以我们需要告诉 React 如何比对 Effect。
// 虽然 React 在 dom 渲染时会 diff 内容，只对改变部分修改而不是整体替换，但却做不到对 effect 的增量识别。
// 因此需要开发者通过 useEffect 的第二个参数告诉 React 用到了哪些外部变量：

const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
    const id = setInterval(() => {
        dispatch({ type: "tick" });
    }, 1000);

    return clearInterval(id);
}, [dispatch]);

// 这就是一个局部 “Redux”，由于更新变成了 dispatch 所以不管更新时需要依赖多少变量，在调用更新的动作里都不需要依赖任何变量
// 具体更新操作在 reducer 函数里写就可以了。
// Dan 也将 useReducer 比作 Hooks 的的金手指模式，因为这充分绕过了 Diff 机制，不过确实能解决痛点！
// 只要不依赖 Function Component 内变量的函数都可以安全的抽出去：
// 如果非要把 Function 写在 Effect 外面呢？ 就用 useCallback 吧！

// 由于函数也具有 Capture Value 特性，经过 useCallback 包装过的函数可以当作普通变量作为 useEffect 的依赖。
// useCallback 做的事情，就是在其依赖变化时，返回一个新的函数引用，触发 useEffect 的依赖变化，并激活其重新执行。

// Function Component 中利用 useCallback 封装的取数函数，可以直接作为依赖传入 useEffect，useEffect 只要关心取数函数是否变化，而取数参数的变化在 useCallback 时关心，再配合 eslint 插件的扫描，能做到 依赖不丢、逻辑内聚，从而容易维护。

// 我们对组件增强时，组件的回调一般不需要销毁监听，而且仅需监听一次，这与 DOM 监听不同，因此大部分场景，
// 我们需要利用 useCallback 包裹，并传一个空数组，来保证永远只监听一次，而且不需要在组件销毁时注销这个 callback。
function useInputValue(initialValue) {
    let [value, setValue] = useState(initialValue);
    let onChange = useCallback(function(event) {
      setValue(event.currentTarget.value);
    }, []);

    return {
      value,
      onChange
    };
  }
// 有状态的组件没有渲染，有渲染的组件没有状态