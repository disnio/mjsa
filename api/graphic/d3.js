d3.js
d3的学习曲线确实比较陡，因为它的思想和我们通常绘图的方式不大一样：
1、它是声明式的，不是命令式的
d3的第一个核心是：数据驱动的dom元素创建，把这个思想上的弯绕过来，掌握1/3了
2、它是数据处理包，不是图形绘制包
d3的第二个核心是：它的大量的api，提供的是对数据的转换与处理，无论是scale、layout还是svg.line等，都仅仅是对数据的处理，和绘制图形与DOM操作没有半毛关系。把这个思想上的弯绕过来，又掌握1/3了
3、它的api通常返回的是一个函数，这个函数的具体功能，通过函数对象的方法约定。
d3的javascript写法不是那么符合常人的逻辑，比如：调用d3.svg.line()，这个我们获得的是一个line函数，作用是把原始数据转化成svg的path元素的d属性需要的字符串，如果连起来写的话是这样：
var nd=d3.svg.line()(data); 这样获得的nd才是可以塞给path的d属性的东西。把这个思想上的弯绕过来，又掌握1/3的

以上三点转过来以后，基本算理解d3背后的思路了，大约看文档也可以独立写点东西出来了。d3的使用模式如下：
step1：准备数据
step2：创建dom
step3：设置属性

d3.scale
https://blog.csdn.net/matiascx/article/details/76421507
https://blog.csdn.net/qq_26025363/article/details/78697204
d3.select
https://blog.csdn.net/qq_26025363/article/details/78697191
d3.interpolate
d3.quantize(interpolator, n) 取样
https://blog.csdn.net/qq_26025363/article/details/78697208
d3.axis
https://blog.csdn.net/qq_26025363/article/details/78697212
path
https://blog.csdn.net/qq_26025363/article/details/78697217
https://blog.csdn.net/matiascx/article/details/76421493
stack.offset(d3.stackOffsetExpand);
d3.layout
https://blog.csdn.net/matiascx/article/details/76421553
d3.brush
https://blog.csdn.net/lh_qppr/article/details/54345857
--------------------------------------------------------
<line stroke-dasharray="5, 5" x1="10" y1="10" x2="190" y2="10" />
stroke-dasharray 短划线和缺口的长度

fill-rule   nonzero | evenodd | inherit 属性是指，
如何判断路径的哪一侧在路径所构成的形状的内部，从而判断fill属性如何给这个形状上色。
nonzero
这个值确定了某点属于该形状的“内部”还是“外部”。从点向任意方向的无限远处绘制射线，然后检测形状与射线相交的位置。开始于0数，射线上每次从左向右相交就加1，每次从右向左相交就减1。数一下相交次数，如果结果是0，点就在路径外面，否则认为，点在路径里面。
evenodd
这个值用确定了某点属于该形状的“内部”还是“外部”。从点向任意方向的无限远处绘制射线，并数一数给定形状与射线相交的路径段的数目，如果数目是奇数的，点在内部，如果数目是偶数的，点在外部。

shape-rendering 指定SVG元素<path>的渲染模式。
auto
让浏览器自动权衡渲染速度、平滑度、精确度。默认是倾向于精确度而非平滑度和速度。
optimizeSpeed
偏向渲染速度，浏览器会关闭反锯齿模式。（速度）
crispEdges
偏向更加清晰锐利的边缘的渲染。浏览器在渲染的时候会关闭反锯齿模式，且会让线条的位置和宽度和显示器边缘对齐。（锐度）
geometricPrecision
偏向渲染平滑的曲线。（平滑）

<marker>元素自身不会显示，需要放在<defs>元素中，因为它是存放复用元素的；
refX、refY属性可以指定标记的坐标系统中与路径的开始对齐，使得图像标记显示在精确的位置上；
将标记<marker>的orient属性设置为auto可以让标记自动旋转去匹配路径的方向；
若路径的起点、中间、终点都用同一个标记，则只需使用marker属性即可，不需要指定marker-start、marker-mid、marker-end

foreignObject元素通常与<switch>元素和requiredExtensions属性联用，对用户代理支持作一个适合性标准化验，并在万一用户代理支持不可用的时候提供一个替代呈现。
foreignObject元素允许包含外来的XML命名空间，其图形内容是别的用户代理绘制的。这个被包含的外来图形内容服从SVG变形和合成。

<pattern> 使用预定义的图形对一个对象进行填充或描边，就要用到pattern元素。pattern元素让预定义图形能够以固定间隔在x轴和y轴上重复（或平铺）从而覆盖要涂色的区域。先使用pattern元素定义图案，然后在给定的图形元素上用属性fill或属性stroke引用用来填充或描边的图案。
https://segmentfault.com/a/1190000009278935
----------------------------------
 bbox = text.node().getBBox()

 83 Pixymaps (Scrolling)

--------------------------------------
直方图(Histogram)又称质量分布图。是一种统计报告图，由一系列高度不等的纵向条纹或线段表示数据分布的情况。 一般用横轴表示数据类型，纵轴表示分布情况。
直方图是数值数据分布的精确图形表示。 这是一个连续变量（定量变量）的概率分布的估计，并且被卡尔·皮尔逊（Karl Pearson）首先引入。它是一种条形图。 为了构建直方图，第一步是将值的范围分段，即将整个值的范围分成一系列间隔，然后计算每个间隔中有多少值。 这些值通常被指定为连续的，不重叠的变量间隔。 间隔必须相邻，并且通常是（但不是必须的）相等的大小。

Debugger is successfully started at localhost:60123.
1. Now you can open Google Chrome and navigate to chrome://inspect.
2. Then click Open dedicated DevTools for Node.
3. After click Add connection and add connection to localhost:60123