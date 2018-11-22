'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.$ = window.jQuery = _jquery2["default"];

var DOMScrollImage = function DOMScrollImage(moveImage) {
		var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
		//封装一个函数  使背景图片可以随着鼠标左右晃动
		//定义滚动背景容器变量
		var _move = $(moveImage),


		//获取当前窗口的尺寸并改变其中心为原点坐标，也可以改为仅获取指定层的坐标:oUl.offsetWidth
		x = document.body.offsetWidth / 2,
		    y = document.body.offsetHeight / 2;
		//设置当前窗口内的鼠标移动事件，也可以改为仅作用于指定层:oUl.onmousemove
		document.onmousemove = function (event) {
				//获取鼠标在当前窗口内的坐标值，也可以改为获取指定层的坐标:event.offsetX
				var mx = event.clientX,
				    my = event.clientY;
				//开始为每个要动的元素设置左边距和上边距，以每个元素的不同zIndex值来区别移动
				_move.style.marginLeft = (x - mx) / 90 * level + 'px';
		};
};

exports["default"] = DOMScrollImage;
module.exports = exports['default'];