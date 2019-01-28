/*
* @Author: wsc
* @Date:   2018-03-23 09:25:38
* @Last Modified by:   wsc
* @Last Modified time: 2018-04-12 09:58:12
*/
// canvas 操作 video http://html5doctor.com/video-canvas-magic/
CanvasRenderingContext2D.globalCompositeOperation
属性设置要在绘制新形状时应用的合成操作的类型，其中type是用于标识要使用的合成或混合模式操作的字符串。


echarts:
http://www.echartsjs.com/gallery/editor.html?c=doc-example/text-block-fregment
字体不能设置动态大小。
字体不能渐变
边界路径不能独立发光。

axisLabel: {
    color: '#fff',
    formatter: (value, index) => {
        // 竖线前面为定义的富文本标签
        return [
            '{national|}',
            '{title|' + value + '}'
        ].join('\n')
    },
    rich: {
        title: {
            color: '#eee',
            align: 'center',
            lineHeight: 10
        },
        national: {
            height: 30,
            backgroundColor: {
                image: nationalImg
            },
            lineHeight: 40

        },
    }
},
// 重合的bar
zlevel: 0,
barWidth: '相同',
barGap: '-100%',

鼠标高亮可以通过渐变去除：
itemStyle: {
    color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0,
            color: '#2D3B6C' // 0% 处的颜色
        }, {
            offset: 1,
            color: '#2D3B6C' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
    }

}

zrender 4.0.2 不支持文字渐变：
export function getFill(fill) {
    return (fill == null || fill === 'none')
        ? null
        // TODO pattern and gradient?
        : (fill.image || fill.colorStops)
        ? '#000'
        : fill;
}

d3 在canvas 中只提供数据结构，绘制仍需要canvas 本身的 api

// 加载图像
image.onload = function() {
    context.drawImage(image, 0, 0);
};

// 16进制 #f90f90 转换成rgb 颜色
var color = (function () {
    var div = document.createElement('div');
    div.style.backgroundColor = color;
    document.body.appendChild(div);
    var c = window.getComputedStyle(div).backgroundColor;
    document.body.removeChild(div);
    return c;
})();

// 计算出内容长度
var span = document.createElement('span');
span.style.position = 'absolute';
span.style.whiteSpace = 'nowrap';
span.style.font = 'bold ' + fontSize + 'px "microsoft yahei", sans-serif';
span.innerText = obj.value;
span.textContent = obj.value;
document.body.appendChild(span);
// 求得文字内容宽度
this.width = span.clientWidth;
// 移除dom元素
document.body.removeChild(span);