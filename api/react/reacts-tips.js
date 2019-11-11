// context 的坑
// context 相当于一个全局变量，难以追溯数据源，很难找到是在哪个地方中对 context 进行了更新。
// 组件中依赖 context，会使组件耦合度提高，既不利于组件复用，也不利于组件测试。
// 当 props 改变或是 setState 被调用，getChildContext 也会被调用，生成新的 context，但 shouldComponentUpdate 返回的 false 会 block 住 context，导致没有更新，这也是精读文章的重点内容。