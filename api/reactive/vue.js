npm install --registry=https://registry.npm.taobao.org

v-bind: : 响应更新属性
v-on: @
.修饰符特殊方式绑定指令

computed 替换复杂表达式使模板简洁，会基于所依赖的数据进行缓存。 可以有 set 函数进行数据的反向赋值操作。
method 需要每次重新计算
watch 同步尽量用 computed 替换，通常用于异步或高性能消耗操作通过间接调用method。

<div v-bind:class="{active: isActive, 'text-danger': align}"  v-bind:class="classObj"></div>
data: {isActive:true, align: false}; data: {classObj:{isActive:true, align: false}}
classObj 也可是 computed
:class="[activeClass, errorClass]" data: {activeClass:"active", errorClass:"text-danger"}

v-bind:style="{color:activeColor, fontSize: fontSize + 'px' }" data: {activeColor:"red", fontSize: 30}
或直接绑定 data 中的对象

input key="username-input" 保证独立元素不复用

v-for :key=""

变化数组方法 push pop shift unshift splice sort reverse
或替换为新数组, 将一个数组替换为包含重叠对象的另一个数组，会是一种非常高效的操作

// 为元素设置新值
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)

vm.$set(vm.items, indexOfItem, newValue)
// 改变数组长度
vm.items.splice(newLength)

 Vue 无法检测到对象属性的添加或删除。直接操作对象不行。
 可以使用 Vue.set(object, key, value) 方法，将响应式属性添加到嵌套的对象上。也可 assign exentd

排序过滤等可以用 computed 或 method

v-for 优先级高于 v-if， v-if 在循环的每次迭代中运行。

当对组件使用 v-for 必须设置 key

组件外部的迭代数据传入组件需要额外使用props
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>

<button v-on:click="warn('Form cannot be submitted yet.', $event)">
<div v-on:scroll.passive="onScroll">...</div>
.passive 修饰符对于提高移动设备的性能尤其有用。

<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">做一些操作</div>

.exact 修饰符可以控制触发事件所需的系统辅助按键的准确组合。

v-model 将 Vue 实例中的 data 作为真实数据来源

<input type="radio" v-model="pick" v-bind:value="a">

<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>

<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>

<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>

可以添加 lazy 修饰符，从而转为在触发 change 事件后同步： <input v-model.lazy="msg" >
自动转换为 Number 类型
<input v-model.number="age" type="number">
<input v-model.trim="msg">

组件：可复用的 vue 实例
data 必须是函数

props 是指注册在组件选项上的自定义属性。当一个值，被放置在 props 中，
作为其中一个 prop，这个值就会成为组件实例上，一个可访问的属性。

Vue.component('blog-post', {
    props:['title'],
    template:`<h3 v-on:click="$emit('enlarge-text', 0.1)">{{title}}</h3>`
})
<blog-post title="aa" v-on:enlarge-text="fontSize+= $event"></blog-post>

v-on 监听的语法糖也会有所改动，监听的并不是$event.target.value，而是回调函数中的第一个参数.
不用于input 中的时候，父组件：<demo v-model="show"></demo>，子组件：this.$emit('input',false)
父组件隐式 v-on:input="something = arguments[0]" 进行了监听

export default {
        model: {
            prop: 'show',
            event: 'close'
        },
        props: ['show'],
        data () {
            return {
                value: 10
            }
        },
        methods: {
            closeModel () {
                this.$emit('close',false)
            }
        }
    }
    
组件内v-model 可以替换为：
<custome-input
    v-bind:value="searchText"
    v-on:input="searchText = $event"
    ></custome-input>

Vue.component('costome-input', {
    props:['value'],
    template:`
        <input
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
    `
})

<custome-input v-model="searchText"></custome-input>
// --------------------------------
<script src="https://unpkg.com/vue"></script>

<div id="dynamic-component-demo" class="demo">
  <button
    v-for="tab in tabs"
    v-bind:key="tab.name"
    v-bind:class="['tab-button', { active: currentTab.name === tab.name }]"
    v-on:click="currentTab = tab"
  >{{ tab.name }}</button>

  <component
    v-bind:is="currentTab.component"
    class="tab"
  ></component>
</div>

var tabs = [
  {
    name: 'Home',
    component: {
      template: '<div>Home component</div>'
    }
  },
  {
    name: 'Posts',
    component: {
      template: '<div>Posts component</div>'
    }
  },
  {
    name: 'Archive',
    component: {
      template: '<div>Archive component</div>',
    }
  }
]

new Vue({
  el: '#dynamic-component-demo',
  data: {
    tabs: tabs,
    currentTab: tabs[0]
  }
})
// ---------- prpp 命名
Vue.component('blog-post', {
  // 在 JavaScript 中使用驼峰式(camelCase)
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
<!-- 在 HTML 中使用串联式(kebab-case) -->
<blog-post post-title="hello!"></blog-post>

// ---------- Number 类型
<!-- 来告诉 Vue 它是以 JavaScript 表达式表现，而不是一个字符串 -->
<blog-post v-bind:likes="42"></blog-post>

<!-- 将一个变量，动态地分配到属性值上 -->
<blog-post v-bind:likes="post.likes"></blog-post>

建议你总是使用串联式命名(kebab-cased)来命名事件名称。

Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
//  自定义监听器绑定本地事件 $listeners
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将这些对象合并在一起，构成一个新的对象
      return Object.assign({},
        // 我们在父组件中添加的所有监听器
        this.$listeners,
        // 然后我们可以新增自定义的监听器，
        // 或覆盖掉一些监听器的行为。
        {
          // 这里确保组件能够正常运行 v-model 指令
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})

// ------ sync
this.$emit('update:title', newTitle)

<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>

.sync 修饰符，提供了这个模式的简写：

<text-document v-bind:title.sync="doc.title"></text-document>
<text-document v-bind.sync="doc"></text-document>
这会传递 doc 对象中的每个属性（例如 title），作为单独的 prop，然后为每个属性添加相应的 v-on:update 监听器。

父组件模板的内容，全部在父组件作用域内编译；子组件模板的内容，全部在子组件作用域内编译。

slot-scope 不再局限于 <template> 元素，而是可以在任何元素或任何组件中的插槽内容上使用。
<ul>
  <li
    v-for="todo in todos"
    v-bind:key="todo.id"
  >
    <!-- 我们为每个 todo 提供一个 slot 元素， -->
    <!-- 然后，将 `todo` 对象作为 slot 元素的一个 prop 传入。 -->
    <slot v-bind:todo="todo">
      <!-- 这里是回退内容(fallback content) -->
      {{ todo.text }}
    </slot>
  </li>
</ul>

<todo-list v-bind:todos="todos">
  <!-- 将 `slotProps` 作为插槽内容所在作用域(slot scope)的引用名称 -->
  <template slot-scope="slotProps">
    <!-- 为 todo items 定义一个模板， -->
    <!-- 通过 `slotProps` 访问每个 todo 对象。 -->
    <span v-if="slotProps.todo.isComplete">✓</span>
    {{ slotProps.todo.text }}
  </template>
</todo-list>

<todo-list v-bind:todos="todos">
  <template slot-scope="{ todo }">
    <span v-if="todo.isComplete">✓</span>
    {{ todo.text }}
  </template>
</todo-list>

// =-- keep-alive
需要保留切换前的状态，或者需要考虑重新渲染造成的性能问题，而尽量避免重新渲染。
https://jsfiddle.net/chrisvfritz/Lp20op9o/

// 访问子组件实例或子元素
<base-input ref="usernameInput"></base-input>
this.$refs.usernameInput

// 依赖注入
provide 选项允许我们指定，我们想要提供给后代组件的数据(data)/方法(methods)。
provide: function () {
  return {
    getMap: this.getMap
  }
}

在所有后代组件中，我们可以使用 inject 选项，来接收那些我们需要添加到当前实例中的特定属性：

inject: ['getMap']

依赖注入还是有缺陷的。它将子组件与你应用程序当前组织方式耦合起来，使得重构变得更加困难。

// 可编程的事件监听器
https://unpkg.com/pickaday@1.7.0
https://jsfiddle.net/chrisvfritz/1Leb7up8/

//
$forceUpdate 来实现强制更新

