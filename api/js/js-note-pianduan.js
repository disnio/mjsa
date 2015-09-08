var
    setCss = function(_this, cssOption) { //设置元素样式
        //判断节点类型
        if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
            return;
        }
        for (var cs in cssOption) { //遍历节点与设置样式
            _this.style[cs] = cssOption[cs];
        }
        return _this;
    },
    /**
     * 获取鼠标在页面上的位置
     * _e        触发的事件
     * left:鼠标在页面上的横向位置, top:鼠标在页面上的纵向位置
     */
    getMousePoint = function(_e) {
        var _body = document.body,
            _left = 0,
            _top = 0;

        if (typeof window.pageYOffset != 'undefined') { //浏览器支持 pageYOffset, 那么可以使用pageXOffset 和 pageYOffset 获取页面和视窗之间的距离
            _left = window.pageXOffset;
            _top = window.pageYOffset;
        } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') { //如果浏览器指定了DOCTYPE并且支持compatMode
            _left = document.documentElement.scrollLeft;
            _top = document.documentElement.scrollTop;
        } else if (typeof _body != 'undefined') { //其他的如果浏览器支持document.body
            _left = _body.scrollLeft;
            _top = _body.scrollTop;
        }

        _left += _e.clientX;
        _top += _e.clientY;
        _mousepos.left = _left;
        _mousepos.top = _top;

        return _mousepos;
    },
    // 碰撞检测
    pointCheck = function(_event, _e, options) {
        var _pos = getMousePoint(_event),
            _w = options && options.width || _e.offsetWidth, //获取元素的宽度
            _h = options && options.height || _e.offsetHeight, //获取元素的高度
            _left = getAbsoluteLeft(_e),
            _top = getAbsoluteTop(_e);
        _pos.left += options && options.left || 0;
        //计算鼠标的top与left值，是否落入元素的left与top内即可
        if (_pos.left < (_left + _w) && _left < _pos.left && _pos.top > _top && _pos.top < (_top + _h)) {
            return true;
        }
        return false;
    },
