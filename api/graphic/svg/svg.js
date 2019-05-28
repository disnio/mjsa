
// https://blog.csdn.net/iteye_3606/article/details/82475799

// http://cubic-bezier.com/#.17,.67,.83,.67
// 贝塞尔插值，3次
// matrix( 1 , 0 , 0 , 1 , 0 , 0 )
// 1 2 3 4 5 6
// 1. 正常值为1，定义的是 scaleX 通过设置 X 轴的值来定义缩放。值：>=0
// 2. 正常值为0，定义的是 skew 定义 2D 倾斜
// 3. 正常值为0，定义的是 rotate 定义2D 旋转角度
// 4. 正常值为1，定义的是 scaleY 通过设置 Y 轴的值来定义缩放。值：>=0
// 5. 正常值为0，定义的是 translateX 通过设置 X 轴的值来定义左右位移。值：任意
// 6. 正常值为0，定义的是 translateY 通过设置 Y 轴的值来定义上下位移。值：任意

// https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-矩阵/
// 缩放(scale)
// matrix(sx, 0, 0, sy, 0, 0);
// x' = ax+cy+e = s*x+0*y+0 = s*x;
// y' = bx+dy+f = 0*x+s*y+0 = s*y;

// 旋转(rotate)
// matrix(cosθ,sinθ,-sinθ,cosθ,0,0)
// x' = x*cosθ-y*sinθ+0 = x*cosθ-y*sinθ
// y' = x*sinθ+y*cosθ+0 = x*sinθ+y*cosθ

// 拉伸(skew)
// matrix(1,tan(θy),tan(θx),1,0,0)
// x' = x+y*tan(θx)+0 = x+y*tan(θx)
// y' = x*tan(θy)+y+0 = x*tan(θy)+y
// 其中，θx表示x轴倾斜的角度，θy表示y轴，两者并无关联。

//  jquery 的插入 append innerHtml 解析出的是 html的命名空间，不是svg的命名空间。
function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

var circle= makeSVG('circle', {cx: 100, cy: 50, r:40, stroke: 'black', 'stroke-width': 2, fill: 'red'});
document.getElementById('s').appendChild(circle);

// A 指令
// rx ： 橢圓的 x 軸半徑 ( 根據不同的終點換算成比例 )
// ry ： 橢圓的 y 軸半徑 ( 根據不同的終點換算成比例 )
// x-axis-rotation ： 弧線與 x 軸的夾角
// large-arc-flag ： 1 為大角度弧線，0 為小角度弧線 ( 必須有三個點 )
// sweep-flag ： 1 為順時針方向，0 為逆時針方向
// x ： 終點 x 座標
// y ： 終點 y 座標

// 滤镜

// -----------------------------------------------------------
// https://blog.csdn.net/yhdsbyhdsb/article/details/45919877
// https://www.oxxostudio.tw/articles/201407/svg-15-filter-feComponentTransfer.html

// feComponentTransfer滤镜的主要作用为每个像素点颜色的转换，包括亮度、对比度、色彩平衡的调整等。

// 其采用的方法为对每一个颜色通道进行独立的操作。

// feComponentTransfer拥有四个子元素：

// feFuncR、feFuncG、feFuncB、feFuncA，

// 分别对输入值的红色、绿色、蓝色与透明度四个通道的值进行数值处理。

// 四个子元素包括以下常用属性：

// type：每一个通道下数值处理的方法类型。

// 取值：identity / table / discrete / linear /gamma。

// identity：颜色值不变化。

// table：颜色值根据提供的tableValues值进行转变。

// tableValues为n个值，v0，v1，...，vn-1，0=< v <= 1，值从v0到vn-1依次增大，将颜色通道分为n-1个范围。

// 如：

//<feFuncR type="table" tableValues="0.0 0.7 0.9 1.0" />
// tableValues共有四个值，原始红色通道别划分为3个范围： 0.00 -- 0.33 ，0.33 -- 0.66 ， 0.66 -- 1.00。
// 我们给出的tableValues的值将红色通道重新划分为3个范围： 0.00 -- 0.70，0.70 -- 0.90，0.90 -- 1.00。

// 当输入值为 0.5 时，0.5为原始通道中第二个范围（0.33 -- 0.66） 范围的中间值，对应到新的通道范围的第二个范围（0.70 -- 0.90）的中间值 0.80，则0.80为输出值。

// -----------------------------------------------------------
// <feFlood> 填充区域指定的颜色和 alpha 等级。放置一个图像在另一个之上， in in2 使用 mode 属性决定怎样组合像素。 normal 第一个图像的像素放到第二个上，透明的部分则被第二个穿透。

// -----------------------------------------------------------
// <feMerge>和< feMergeNode>：融合, 允许滤镜效果的同时作用而不是依次作用。
// 其他的滤镜层通过result属性储存他们的输出值，然后引入feMergeNode子元素中使用它们。
// 下面的 feMergeNode 层级越靠上
// -----------------------------------------------------------
// https://www.jianshu.com/p/175631f45ec6 ps 混合模式详解
// https://helpx.adobe.com/cn/photoshop/using/blending-modes.html
// <feBlend>控制的滤镜效果为左上方半圆,而不是右下方阴影半圆，右下方阴影半圆为被< feOffset>偏移的< feGaussianBlur>高斯模糊。着重看每个id为dropShadow系列的filter的< feBlend>标签

// 有两个属性”in”和”in2”，其中”in”属性会顶层生效，“in2”会底层生效；然而可以通过”mode”属性来控制其中的生效效果，”mode”属性有normal | multiply | screen | darken | lighten，具体的效果通过单词即可推测。

// multiply 正片叠底，对亮色/暗色影响明显,可以使对比降低。 结果色总是较暗的颜色。任何颜色与黑色正片叠底产生黑色。任何颜色与白色正片叠底保持不变。


// -----------------------------------------------------------
// https://www.oxxostudio.tw/articles/201410/svg-30-filter-feConvolveMatrix.html
// https://cloud.tencent.com/developer/section/1424100
// feConvolveMatrix 卷积滤波器实现包括模糊，边缘检测，锐化，压花和斜切。 針對每個像素與四周像素進行矩陣運算。
// Convolution Matrix 就是透過每個像素本身與周圍像素的矩陣運算，算出這個圖形裏頭每個像素的 RGBA 分別會變成如何，演算過後有可能彼此差異變大(銳利)，也有可能差異變小(模糊)，也有可能整個反相(浮雕或反相)，也因此可以做出基本的模糊、銳利或浮雕...等的效果
// order 矩阵的大小  divisor 预设值  bias 偏移量  targetX targetY 目标像素的中心位置。 edgeMode = duplicate 镜像重复 wrap 单纯的重复  none 不重复
// kernelMatrix

// <feMorphology/> operator= erode 腐蚀 dilate 膨胀 radius  削弱或扩张源图像

// <feColorMatrix/> 将RGB值每个通道的值设置成小于 1 创建一个 darken 效果，反之，将每个通道值设置成大于 1 可以创建一个 lighten 效果。 负值代表消除程度，正值代表增加。

// feDisplacementMap : 使用另一个输入值( in2 )取代一个图像的像素值( in )

// feOffset ：用来创建阴影

// feSpecularLighting : 通过 alpha 创建凹凸贴图，又将其称之为镜面

// feTile : 指图像如何重复填补空间

// feTurbulence : 允许创建纹理

// feDiffuseLighting ：定义了一个光源