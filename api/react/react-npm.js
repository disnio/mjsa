// debugx5.qq.com 清楚微信缓存

// react-faux-dom d3.js 集成

// @craco/craco create-react-app v2 配置集合

// react-cosmos 组件开发工具

// react-app-rewired v2 配置

// immer 不可变状态树创建，reducer/setState 中 状态更改。 prev state => draft state => next state

// @rematch/core 类似 dva 的 redux 的最佳实践的包装

// ------------------------------
// unstated 状态管理
// unstated : wen can't share this state with other components in our tree. nice parts of state api
// while sharing it across multiple components.

// Container, we're going to want another place to store our state and some of the logic for updating it.
// unstated 's setState returns a promise. 提供状态和操作状态的方法

// Subscribe, 作为消费者，消费 Container 的状态和方法
// Provider, 保存所有的实例在内部

// what state should I put into Unstated?
// First, use local component state as much as you possibly can.
// 使用库去抽象一点状态，你将不停的重复。
// 许多共享状态在组件间是局限在小部分组件树中的。建议使用内建的 createContext() api。
// ------------------------------

// https://github.com/final-form/react-final-form 表单

// https://github.com/icd2k3/react-router-breadcrumbs-hoc 面包屑

// react-sticky 粘性组件

// react-quill 编辑器

// bizcharts G2图表

// rc-animate 动效

// hooks api
// react-spring  (弹簧效果) spring-physics based animation library

// react-resize-aware 监听 resize events 在任何 html 元素

// react-measure 计算组件的尺寸，使用 ResizeObserver 检测元素尺寸的变化  Chrome 55
// --  MutationObserver, PerformanceObserver and IntersectionObserver,

// react-with-gesture  lets you bind richer mouse and touch events to any component or view.

// react-helmet 文档头管理

// react-slick 幻灯片

// enzyme react 测试工具，测试组件输出

// immutability-helper 操作一份拷贝的数据不改变原数据

// https://segmentfault.com/a/1190000010296756
// LogRocket，像 Sentry 和 Bugsnag 一样，整合了错误上报工具

// @reach/router 新路由，易使用

// apply-ref

// hoist-non-react-statics 把组件上的非react 标准属性复制到父组件中

// luxon immutable date wrapper 日期 https://moment.github.io/luxon/docs/

// next react framework

// pretty-proptypes  output of extract-react-types

// react-powerplug http://rena.to/react-powerplug/#/
// 无渲染的组件和工具集合，创建状态向下传递逻辑到子组件，操作数据通过 render props。

// react-adopt 当使用多于一个 render porps 组件，通过它来组合，each prop result from your mapper.

// https://www.docz.site/

// react-feather 开源的icon集合
// react-emotion 被替代 @emotion/styled @emotion/core
// emotion js 中写 css https://emotion.sh/docs/introduction
// emotion-normalize Normalize file for Emotion CSS-in-JS library.
// grid-styled 改名为 @rebass/grid 响应式网格系统，
// styled-system https://styled-system.com/ 快速UI 开发