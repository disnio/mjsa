// d3.js d3的学习曲线确实比较陡，因为它的思想和我们通常绘图的方式不大一样： 1、它是声明式的，不是命令式的
// d3的第一个核心是：数据驱动的dom元素创建，把这个思想上的弯绕过来，掌握1/3了 2、它是数据处理包，不是图形绘制包
// d3的第二个核心是：它的大量的api，提供的是对数据的转换与处理，无论是scale、layout还是svg.line等，都仅仅是对数据的处理，和绘制图形与
// D OM操作没有半毛关系。把这个思想上的弯绕过来，又掌握1/3了 3、它的api通常返回的是一个函数，这个函数的具体功能，通过函数对象的方法约定。
// d3的javascript写法不是那么符合常人的逻辑，比如：调用d3.svg.line()，这个我们获得的是一个line函数，作用是把原始数据转化成svg
// 的 path元素的d属性需要的字符串，如果连起来写的话是这样： var nd=d3.svg.line()(data);
// 这样获得的nd才是可以塞给path的d属性的东西。把这个思想上的弯绕过来，又掌握1/3的
// 以上三点转过来以后，基本算理解d3背后的思路了，大约看文档也可以独立写点东西出来了。d3的使用模式如下： step1：准备数据 step2：创建dom
// step3：设置属性 d3.scale https://blog.csdn.net/matiascx/article/details/76421507
// https://blog.csdn.net/qq_26025363/article/details/78697204 d3.select
// https://blog.csdn.net/qq_26025363/article/details/78697191 d3.interpolate
// d3.quantize(interpolator, n) 取样
// https://blog.csdn.net/qq_26025363/article/details/78697208 d3.axis
// https://blog.csdn.net/qq_26025363/article/details/78697212 path
// https://blog.csdn.net/qq_26025363/article/details/78697217
// https://blog.csdn.net/matiascx/article/details/76421493
// stack.offset(d3.stackOffsetExpand); d3.layout
// https://blog.csdn.net/matiascx/article/details/76421553 d3.brush
// https://blog.csdn.net/lh_qppr/article/details/54345857
// -------------------------------------------------------- <line
// stroke-dasharray="5, 5" x1="10" y1="10" x2="190" y2="10" /> stroke-dasharray
// 短划线和缺口的长度 fill-rule   nonzero | evenodd | inherit 属性是指，
// 如何判断路径的哪一侧在路径所构成的形状的内部，从而判断fill属性如何给这个形状上色。 nonzero
// 这个值确定了某点属于该形状的“内部”还是“外部”。从点向任意方向的无限远处绘制射线，然后检测形状与射线相交的位置。开始于0数，射线上每次从左向右相交就加1
// ， 每次从右向左相交就减1。数一下相交次数，如果结果是0，点就在路径外面，否则认为，点在路径里面。 evenodd
// 这个值用确定了某点属于该形状的“内部”还是“外部”。从点向任意方向的无限远处绘制射线，并数一数给定形状与射线相交的路径段的数目，如果数目是奇数的，点在内部
// ， 如果数目是偶数的，点在外部。 shape-rendering 指定SVG元素<path>的渲染模式。 auto
// 让浏览器自动权衡渲染速度、平滑度、精确度。默认是倾向于精确度而非平滑度和速度。 optimizeSpeed 偏向渲染速度，浏览器会关闭反锯齿模式。（速度）
// crispEdges 偏向更加清晰锐利的边缘的渲染。浏览器在渲染的时候会关闭反锯齿模式，且会让线条的位置和宽度和显示器边缘对齐。（锐度）
// geometricPrecision 偏向渲染平滑的曲线。（平滑） <marker>元素自身不会显示，需要放在<defs>元素中，因为它是存放复用元素的；
// refX、refY属性可以指定标记的坐标系统中与路径的开始对齐，使得图像标记显示在精确的位置上；
// 将标记<marker>的orient属性设置为auto可以让标记自动旋转去匹配路径的方向；
// 若路径的起点、中间、终点都用同一个标记，则只需使用marker属性即可，不需要指定marker-start、marker-mid、marker-end
// foreignObject元素通常与<switch>元素和requiredExtensions属性联用，对用户代理支持作一个适合性标准化验，并在万一用户代
// 理 支持不可用的时候提供一个替代呈现。
// foreignObject元素允许包含外来的XML命名空间，其图形内容是别的用户代理绘制的。这个被包含的外来图形内容服从SVG变形和合成。
// <pattern>
// 使用预定义的图形对一个对象进行填充或描边，就要用到pattern元素。pattern元素让预定义图形能够以固定间隔在x轴和y轴上重复（或平铺）从而覆盖要涂
// 色 的区域。先使用pattern元素定义图案，然后在给定的图形元素上用属性fill或属性stroke引用用来填充或描边的图案。
// https://segmentfault.com/a/1190000009278935
// ----------------------------------  bbox = text.node().getBBox()  83 Pixymaps
// (Scrolling) --------------------------------------
// 直方图(Histogram)又称质量分布图。是一种统计报告图，由一系列高度不等的纵向条纹或线段表示数据分布的情况。
// 一般用横轴表示数据类型，纵轴表示分布情况。 直方图是数值数据分布的精确图形表示。
// 这是一个连续变量（定量变量）的概率分布的估计，并且被卡尔·皮尔逊（Karl Pearson）首先引入。它是一种条形图。
// 为了构建直方图，第一步是将值的范围分段，即将整个值的范围分成一系列间隔，然后计算每个间隔中有多少值。 这些值通常被指定为连续的，不重叠的变量间隔。
// 间隔必须相邻，并且通常是（但不是必须的）相等的大小。 Debugger is successfully started at
// localhost:60123.
// 1. Now you can open Google Chrome and navigate to chrome://inspect.
// 2. Then click Open dedicated DevTools for Node.
// 3. After click Add connection and add connection to localhost:60123
// ----------------------------------------------------------------------
// 图形数据函数（数据构造函数） + 构图算法（原型继承） + 动态 svg 结构（data enter update exit merge）= 图形
// 图形数据函数 = 数据映射插值 + 对应图形数据构造函数 图形数据构造函数 = 图形属性 + 图形构造函数 所有图形都有能映射到二维的 x 及 y
// --坐标值的对应值， 坐标轴
var _width = 600,
    _height = 300,
    _margins = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
    };
let xStart = () => _margins.left;
let xEnd = () => _width - _margins.right;
let yStart = () => _height - _margins.bottom;
let yEnd = () => _margins.top;
const quadrantWidth = () => _width - _margins.left - _margins.right;
const quadrantHeight = () => _height - _margins.top - _margins.bottom;
const renderAxes = svg => {
    const axesG = svg.append("g").attr("class", "axes");

    renderXAxis(axesG);
    renderYAxis(axesG);
};

const renderXAxis = axesG => {
    const xAxis = d3.axisBottom().scale(_x.range([0, quadrantWidth()]));

    axesG
        .append("g")
        .attr("class", "x axis")
        // 屏幕坐标转换到课本的笛卡尔坐标，y 取反
        .attr("transform", () => `translate(${xStart()}, ${yStart()})`)
        .call(xAxis);

    d3.selectAll("g.x g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", -quadrantHeight());
};

const renderYAxis = axesG => {
    var yAxis = d3.axisLeft().scale(_y.range([quadrantHeight(), 0]));

    axesG
        .append("g")
        .attr("class", "y axis")
        .attr("transform", () => `translate(${xStart()}, ${yEnd()})`)
        .call(yAxis);

    d3.selectAll("g.y g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", quadrantWidth())
        .attr("y2", 0);
};
// --折线图，图形本质都是 path 的 d 属性绘图 折线图，点到点的直线段连接
const renderLine = () => {
    // 构图算法 + 图形属性，后执行，坐标映射
    _line = d3
        .line()
        .x(function(d) {
            return _x(d.x);
        })
        .y(function(d) {
            return _y(d.y);
        });

    let pathLines = _bodyG.selectAll("path.line").data(_data);

    pathLines
        .enter()
        .append("path")
        .merge(pathLines)
        .style("stroke", function(d, i) {
            return _colors(i);
        })
        .attr("class", "line")
        .transition()
        .attr("d", function(d) {
            // svg 结构 + 构图算法
            return _line(d);
        });
};

// 折线点
const renderDots = () => {
    _data.forEach((list, i) => {
        let circle = _bodyG.selectAll("circle._" + i).data(list);
        // svg 结构 + 坐标映射
        circle
            .enter()
            .append("circle")
            .merge(circle)
            .attr("class", "dot _" + i)
            .style("stroke", function(d) {
                return _colors(i);
            })
            .transition()
            .attr("cx", function(d) {
                return _x(d.x);
            })
            .attr("cy", function(d) {
                return _y(d.y);
            })
            .attr("r", 4.5);
    });
};
// 折线构图坐标映射
var chart = lineChart()
    .x(d3.scaleLinear().domain([0, 10]))
    .y(d3.scaleLinear().domain([0, 10]));

// --面积图，折线 + 坐标的封闭区域的图形填充。
function renderAreas() {
    // 构图算法 + 图形属性
    var area = d3
        .area() // <-A
        .x(function(d) {
            return _x(d.x);
        })
        .y0(yStart())
        .y1(function(d) {
            return _y(d.y);
        });

    var pathAreas = _bodyG.selectAll("path.area").data(_data);

    pathAreas
        .enter() // <-B
        .append("path")
        .merge(pathAreas)
        .style("fill", function(d, i) {
            return _colors(i);
        })
        .attr("class", "area")
        .transition() // <-D
        .attr("d", function(d) {
            return area(d); // <-E
        });
}

// --单一柱状图，根据映射的坐标画矩形填充区

const renderBars = () => {
    let padding = 2;
    let bars = _bodyG.selectAll("rect.bar").data(_data);

    bars.enter()
        .append("rect")
        .merge(bars)
        .attr("class", "bar")
        .transition()
        .attr("x", function(d) {
            return _x(d.x);
        })
        .attr("y", function(d) {
            return _y(d.y) - _margin.bottom;
        })
        .attr("height", function(d) {
            return yStart() - _y(d.y);
        })
        .attr("width", function(d) {
            return Math.floor(quadrantWidth() / _data.length) - padding;
        });
};

// --散点图，根据映射的坐标画圆并根据半径填充
function renderBubbles() {
    _r.range([0, 50]); // <-B

    _data.forEach(function(list, i) {
        var bubbles = _bodyG.selectAll("circle._" + i).data(list);

        bubbles
            .enter()
            .append("circle") // <-C
            .merge(bubbles)
            .attr("class", "bubble _" + i)
            .style("stroke", function(d, j) {
                return _colors(j);
            })
            .style("fill", function(d, j) {
                return _colors(j);
            })
            .transition()
            .attr("cx", function(d) {
                return _x(d.x); // <-D
            })
            .attr("cy", function(d) {
                return _y(d.y); // <-E
            })
            .attr("r", function(d) {
                return _r(d.r); // <-F
            });
    });
}

// --打包图，根据构图算法和图形数据函数生成构图数据，然后就是画圆了。
function renderPack(svg) {
    if (!_bodyG) {
        _bodyG = svg.append("g").attr("class", "body");
    }
    // 构图算法
    let pack = d3.pack().size([_width, _height]);

    // 图形数据
    let root = d3
        .hierarchy(_nodes)
        .sum(_valueAccessor)
        .sort(function(a, b) {
            return b.value - a.value;
        });

    // 生成构图数据
    pack(root);

    renderCircles(root.descendants());

    renderLabel(root.descendants());
}

// --饼图，内径外径，起始角度结束角度。
const renderPie = () => {
    // 图形数据函数
    let pie = d3
        .pie()
        .sort(d => d.id)
        .value(d => d.value);
    // 构图算法 + 图形属性
    let arc = d3
        .arc()
        .outerRadius(_radius)
        .innerRadius(_innerRadius);

    if (!_pieG) {
        _pieG = _bodyG
            .append("g")
            .attr("class", "pie")
            .attr("transform", `translate(${_radius}, ${_radius})`);
    }

    renderSlices(pie, arc);
    renderLabels(pie, arc);
};

const renderSlices = (pie, arc) => {
    let slices = _pieG.selectAll("path.arc").data(pie(_data));
    slices
        .enter()
        .append("path")
        .merge(slices)
        .attr("class", "arc")
        .attr("fill", (d, i) => _colors(i))
        .transition()
        .duration(_duration)
        .attrTween("d", d => {
            let currentArc = this.__current__;

            if (!currentArc) {
                currentArc = {
                    startAngle: 0,
                    endAngle: 0
                };
            }

            let interpolate = d3.interpolate(currentArc, d);
            this.__current__ = interpolate(1);

            return function(t) {
                // 构图算法+数据
                return arc(interpolate(t));
            };
        });
};

// --堆叠区域图
const renderAreas = series => {
    // 构图算法 + 图形属性
    let area = d3
        .area()
        .x((d, i) => _x(i))
        .y0(d => _y(d[0]))
        .y1(d => _y(d[1]));

    let areaPaths = _bodyG.selectAll("path.area").data(series);

    areaPaths
        .enter()
        .append("path")
        .merge(areaPaths)
        .style("fill", (d, i) => _colors(i))
        .attr("class", "area")
        .transition()
        .attr("d", d => area(d));
};

const renderStack = svg => {
    if (!_bodyG) {
        _bodyG = svg
            .append("g")
            .attr("class", "body")
            .attr("transform", `translate(${xStart()}, ${yEnd()})`);
    }
    // 图形数据生成
    let stack = d3
        .stack()
        .keys(["value1", "value2", "value3"])
        .offset(d3.stackOffsetNone);

    let series = stack(_data);

    renderLines(series);
    renderAreas(series);
};

// --树图-简单图
function renderTree(svg) {
    // 构图数据函数
    root = d3.hierarchy(_nodes);

    // 图形算法
    let tree = d3.tree().size([_height - _margins.top - _margins.bottom, _width - _margins.left - _margins.right]);
    // 图形数据函数
    tree(root);

    renderTreeNodes(root);
    renderTreeLinks(root);
}
// 绘制节点
const renderTreeNodes = root => {
    // 根据数据画树节点，无根节点
    let nodes = root.descendants();

    let nodeElement = _bodyG.selectAll("g.node").data(nodes, function(d) {
        return d.id || (d.id = ++_i);
    });
    // 画单个节点，并变换坐标原点到相应节点
    let nodeEnter = nodeElement
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y}, ${d.x})`);
    // 绘制节点圆
    nodeEnter.append("circle").attr("r", 4);

    // merge new and old dom nodes equal data length 根据数据变化，合并 svg 标签节点，然后统一填充所有节点
    let nodeUpdate = nodeEnter
        .merge(nodeElement)
        .transition()
        .duration(_duration)
        .attr("transform", d => `translate(${d.y}, ${d.x})`);

    nodeUpdate.select("circle").style("fill", d => (d._children ? "lightsteelblue" : "#fff"));

    // 删除多余的 svg 标签节点 delete unnecessary
    let nodeExit = nodeElement
        .exit()
        .transition()
        .duration(_duration)
        .attr("transform", d => `translate(${d.y}, ${d.x})`)
        .remove();
    // 删除多余节点中的圆
    nodeExit
        .select("circle")
        .attr("r", 1e-6)
        .remove();

    renderLabels(nodeEnter, nodeUpdate, nodeExit);
};
// 节点文字
const renderTreeLabels = (nodeEnter, nodeUpdate, nodeExit) => {
    nodeEnter
        .append("text")
        .attr("x", d => (d.children || d._children ? -10 : 10))
        .attr("dy", ".35em")
        .attr("text-anchor", d => (d.children || d._children ? "end" : "start"))
        .text(d => d.data.name)
        .style("fill-opacity", 1e-6);

    nodeUpdate.select("text").style("fill-opacity", 1);

    nodeExit
        .select("text")
        .style("fill-opacity", 1e-6)
        .remove();
};
// 节点间连线
const renderTreeLinks = root => {
    let nodes = root.descendants().slice(1);
    let link = _bodyG.selectAll("path.link").data(nodes, d => d.id || (d.id = ++_i));

    link.enter()
        .insert("path", "g")
        .attr("class", "link")
        .merge(link)
        .transition()
        .duration(_duration)
        .attr("d", d => generateLinkPath(d, d.parent));

    link.exit().remove();
};
// 绘制连线
const generateLinkPath = (source, target) => {
    let path = d3.path();
    path.moveTo(target.y, target.x);
    path.bezierCurveTo((target.y + source.y) / 2, target.x, (target.y + source.y) / 2, source.x, source.y, source.x);

    return path.toString();
};

// --矩形树图
function renderTreeMap(svg) {
    if (!_bodyG) {
        _bodyG = svg.append("g").attr("class", "body");
        // 图形算法 + 图形属性
        _treeMap = d3
            .treemap()
            .size([_width, _height])
            .round(true)
            .padding(1);
    }

    // 构图数据
    let root = d3
        .hierarchy(_nodes)
        .sum(_valueAccessor)
        .sort((a, b) => b.value - a.value);

    _treeMap(root);

    // 数据生成
    var cells = _bodyG.selectAll("g").data(root.leaves(), function(d) {
        return d.data.name;
    }); // <-D

    renderCells(cells);
}

// 合并数据，坐标变换
function renderCells(cells) {
    let cellEnter = cells
        .enter()
        .append("g")
        .merge(cells)
        .attr("class", "cell")
        .attr("transform", d => `translate(${d.x0}, ${d.y0})`);

    renderRect(cellEnter, cells);
    renderText(cellEnter, cells);
}

// 绘制矩形
function renderRect(cellEnter, cells) {
    cellEnter.append("rect");
    cellEnter
        .merge(cells)
        .transition()
        .select("rect")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .style("fill", d => _colors(d.parent.data.name));
}

// 主题河流图 ThemeRiver Stream
function renderRiver(svg) {
    // 图形数据函数
    var stack = d3
        .stack()
        .keys(["value1", "value2", "value3", "value4"])
        .order(d3.stackOrderInsideOut)
        .offset(d3.stackOffsetWiggle);

    var series = stack(_data);

    renderRiverAreas(series);
}

function renderRiverAreas(series) {
    // 构图算法 + 图形属性
    var area = d3
        .area()
        .curve(d3.curveCardinal)
        .x(function(d, i) {
            return _x(i);
        })
        .y0(function(d) {
            return _y(d[0]);
        })
        .y1(function(d) {
            return _y(d[1]);
        });

    var areaPaths = _bodyG.selectAll("path.area").data(series);

    areaPaths
        .enter()
        .append("path")
        .merge(areaPaths)
        .style("fill", function(d, i) {
            return _colors(Math.random());
        })
        .attr("class", "area")
        .transition()
        .attr("d", function(d) {
            return area(d);
        });
}

// -- 拖拽
var drag = d3
    .drag() // <-A
    .on("drag", move);

svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", r)
    .attr("transform", function(d) {
        return "translate(" + d + ")";
    })
    .call(drag); // <-A

function move(d) {
    // 行为属性
    var x = d3.event.x, // <-C
        y = d3.event.y;
    // 边界检测，位置变换
    if (inBoundaries(x, y)) {
        d3.select(this).attr("transform", function(d) {
            // <-D
            return "translate(" + x + ", " + y + ")";
        });
    }
}

function inBoundaries(x, y) {
    return x >= 0 + r && x <= width - r && (y >= 0 + r && y <= height - r);
}

// --鼠标 实时位置
svg.on("mousemove", function() {
    //<-A

    var position = d3.mouse(svg.node()); //<-C

    positionLabel.text(position);
});

svg.on("click", function() {
    //<-D
    for (var i = 1; i < 5; ++i) {
        var position = d3.mouse(svg.node());

        var circle = svg
            .append("circle")
            .attr("cx", position[0])
            .attr("cy", position[1])
            .attr("r", 0)
            .style("stroke-width", 5 / i)
            .transition()
            // 指数延迟
            .delay(Math.pow(i, 2.5) * 50)
            .duration(2000)
            .ease(d3.easeQuadIn)
            .attr("r", r)
            .style("stroke-opacity", 0)
            // 动画结束监听
            .on("end", function() {
                d3.select(this).remove();
            });
    }
});

// --缩放
var svg = d3
    .select("body")
    .append("svg")
    .attr("style", "1px solid black")
    .attr("width", width)
    .attr("height", height)
    .call(
        d3
            .zoom()
            // 缩放范围
            .scaleExtent([1, 10])
            .on("zoom", function() {
                var transform = d3.event.transform;
                // 根据事件的 transform 参数，进行坐标变换和缩放
                svg.attr("transform", "translate(" + transform.x + "," + transform.y + ")scale(" + transform.k + ")");
            }) // <-D
    )
    .append("g");

// --加速仿真  velocity force simulation
var r = 4.5,
    nodes = [];
//
var force = d3
    // 力模拟
    .forceSimulation()
    // 加速度衰减
    .velocityDecay(0.1)
    // 透明度衰减
    .alphaDecay(0)
    // 力属性--碰撞属性（范围）--力量值
    .force("collision", d3.forceCollide(r + 0.5).strength(1));

var svg = d3.select("body").append("svg:svg");

// 时间变换节奏，控制点的数量，并采用力模拟的坐标数据。
force.on("tick", function() {
    svg.selectAll("circle")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        });
});

var previousPoint;

svg.on("mousemove", function() {
    var point = d3.mouse(this),
        node = {
            x: point[0],
            y: point[1],
            vx: previousPoint ? point[0] - previousPoint[0] : point[0],
            vy: previousPoint ? point[1] - previousPoint[1] : point[1]
        };

    previousPoint = point;

    svg.append("svg:circle")
        .data([node])
        .attr("class", "node")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r", 1e-6)
        .transition()
        .attr("r", r)
        .transition()
        .delay(5000)
        .attr("r", 1e-6)
        .on("end", function() {
            nodes.shift();
            force.nodes(nodes);
        })
        .remove();

    nodes.push(node);

    // force tick 可以控制数据列表的更新节奏。
    force.nodes(nodes);
});

// --力模型
