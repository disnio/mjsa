## jquery-ui-bootstrap ##
5/13/2015 4:02:46 PM 

https://github.com/jackzhaojun/jquery-ui-bootstrap

## jqui-core ##

z-index： ie 返回 0 未指定时，其他返回字符串。ie 中无法区分一个 0 显式值和无值。

.scrollParent() 获取最近的可滚动的祖先。

.zIndex() 为元素获取 z-index。

.disableSelection() 禁用匹配元素集合内的文本内容。

.enableSelection() 启用匹配元素集合内的文本内容。

:data 选择数据已存储在指定的键下的元素。

:focusable 选择可被聚焦的元素。

:tabbable 选择用户可通过 tab 键聚焦的元素。

$.ui.plugin 废弃. 用 $.widget() 代替。

过滤器选择器函数的写法：

$("element:visible") 
$.expr.filters.visible( element )

**扩展选择器：**

`$.extend( $.expr[ ":" ], {
    data: $.expr.createPseudo ?
        $.expr.createPseudo(function( dataName ) {
            return function( elem ) {
                return !!$.data( elem, dataName );
            };
        }) : 
        // support: jQuery <1.8
        function( elem, i, match ) {
            return !!$.data( elem, match[ 3 ] );
        }         
})`

p:252 事件绑定

$.support.selectstart = "onselectstart" in document.createElement( "div" );

IE/Safari/Chrome可以用 onselectstart 阻止用户选定元素内文本

## jqui-widget ##

jQuery.widget.bridge( name, constructor ) 由 $.widget() 创建的对象和 jQuery API 之间的中介。

constructor 当插件被调用时要实例化的对象。

作用：

    连接一个常规的 js 构造函数到 jQuery API。
    自动创建对象实例，并存储在元素的 $.data 缓存内。
    允许调用公有方法。
    防止调用私有方法。
    防止在未初始化的对象上调用方法。
    防止多个初始化。

为了使用桥（bridge）的所有特性，您的对象原型需要有一个 _init() 方法。
该方法在调用插件且实例已存在时调用。

您还需要有一个 option() 方法。

jQuery.widget( name [, base ], prototype ) 使用相同的抽象化来创建有状态的 jQuery 插件。

Base Widget 部件库（Widget Factory）使用的基础小部件。

匹配的jq集合（数组）的第一个元素就是当前操作元素 element = $( element || this.defaultElement || this )[ 0 ];

选择 ui 组件：$(":ui-progressbar")

http://www.2cto.com/kf/201410/342653.html

$(that.options.filter, that.element[0]);

autocomplete:
http://blogs.uuu.com.tw/Articles/post/2014/12/31/%E4%BD%BF%E7%94%A8jQuery-UI-AutoComplete-Widget%E9%80%A3%E7%B5%90%E9%81%A0%E7%AB%AF%E8%B3%87%E6%96%99%E4%BE%86%E6%BA%90-1.aspx

dropable:
http://blogs.uuu.com.tw/Articles/post/2014/06/04/jQuery-UI-%E2%80%93-Droppable-Widget%E7%B0%A1%E4%BB%8B.aspx

dragable:
http://blogs.uuu.com.tw/Articles/post/2014/01/01/jQuery-UI-%E2%80%93-Draggable-Widget%E7%B0%A1%E4%BB%8B.aspx

addBack()函数用于将之前匹配的元素加入到当前匹配的元素中

ui.menu: 
menus.children(":not(.ui-menu-item):has(a)")

_itemRole: function() {
    return {
        menu: "menuitem",
        listbox: "option"
    }[this.options.role];
},