/*!
 * jQuery UI Mouse 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function($, undefined) {

    var mouseHandled = false;
    $(document).mouseup(function() {
        mouseHandled = false;
    });

    $.widget("ui.mouse", {
        version: "1.10.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var that = this;

            this.element
                // 绑定鼠标按下事件
                .bind("mousedown." + this.widgetName, function(event) {
                    return that._mouseDown(event);
                })
                .bind("click." + this.widgetName, function(event) {
                    // 阻止点击事件的判断
                    if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
                        $.removeData(event.target, that.widgetName + ".preventClickEvent");
                        // 停止冒泡立即
                        event.stopImmediatePropagation();
                        return false;
                    }
                });
            // 默认鼠标事件为 false，表示没有交互
            this.started = false;
        },

        // TODO: make sure destroying one instance of mouse doesn't mess with
        // other instances of mouse
        _mouseDestroy: function() {
        	// 解绑该部件的所有注册事件
            this.element.unbind("." + this.widgetName);
            // 如果有鼠标移动的事件代理，解绑鼠标移动和弹起事件
            if (this._mouseMoveDelegate) {
                $(document)
                    .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
                    .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            }
        },
        // 鼠标左键按下时执行的函数
        _mouseDown: function(event) {
            // 保证只有一个小部件在操作鼠标
            // don't let more than one widget handle mouseStart
            if (mouseHandled) {
                return;
            }

            // we may have missed mouseup (out of window) 
            // 通过 mouseup 清除文档鼠标事件，标记“阻止点击”等，交互已开始那么监听弹起事件
            (this._mouseStarted && this._mouseUp(event));
            // 保存按下事件
            this._mouseDownEvent = event;

            var that = this,
                btnIsLeft = (event.which === 1),
                // 左键
                // event.target.nodeName works around a bug in IE 8 with
                // disabled inputs (#7620)
                elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
            // 非左键或在忽略鼠标事件的元素上按下鼠标或非捕获则直接返回，
            if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
                return true;
            }

            this.mouseDelayMet = !this.options.delay;
            // 执行延迟
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    that.mouseDelayMet = true;
                }, this.options.delay);
            }
            // 距离条件判断
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                // 判断后确定交互是否开始
                this._mouseStarted = (this._mouseStart(event) !== false);
                if (!this._mouseStarted) {
                    event.preventDefault();
                    return true;
                }
            }

            // Click event may never have fired (Gecko & Opera) 点击触发是否开始
            if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
                $.removeData(event.target, this.widgetName + ".preventClickEvent");
            }

            // these delegates are required to keep context 鼠标移动代理，that 保存上下文
            this._mouseMoveDelegate = function(event) {
                return that._mouseMove(event);
            };
            // 鼠标松开代理
            this._mouseUpDelegate = function(event) {
                return that._mouseUp(event);
            };
            // 注册代理监听移动和弹起事件
            $(document)
                .bind("mousemove." + this.widgetName, this._mouseMoveDelegate)
                .bind("mouseup." + this.widgetName, this._mouseUpDelegate);

            event.preventDefault();

            mouseHandled = true;
            return true;
        },
        // 移动执行
        _mouseMove: function(event) {
            // IE mouseup check - mouseup happened when mouse was out of window
            // ie 8 鼠标离开窗口认为是 mouseup 事件
            if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
                return this._mouseUp(event);
            }
            // 交互开始，执行拖动，并阻止默认
            if (this._mouseStarted) {
                this._mouseDrag(event);
                return event.preventDefault();
            }
            // 根据条件开始交互，执行拖动或 松开停止交互
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted =
                    (this._mouseStart(this._mouseDownEvent, event) !== false);
                (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
            }
            // 拖动则代表不再目标上移动

            return !this._mouseStarted;
        },
        // 弹起执行
        _mouseUp: function(event) {
            // 注销文档绑定的鼠标事件
            $(document)
                .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
                .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            // 标记交互完成
            if (this._mouseStarted) {
                this._mouseStarted = false;
                // 按下和弹起在同一个元素，那么标记“阻止点击”
                if (event.target === this._mouseDownEvent.target) {
                    $.data(event.target, this.widgetName + ".preventClickEvent", true);
                }
                // 鼠标停止
                this._mouseStop(event);
            }

            return false;
        },

        _mouseDistanceMet: function(event) {
        	// 在 x 或 y 的最大移动距离判断
            return (Math.max(
                Math.abs(this._mouseDownEvent.pageX - event.pageX),
                Math.abs(this._mouseDownEvent.pageY - event.pageY)
            ) >= this.options.distance);
        },

        _mouseDelayMet: function( /* event */ ) {
            return this.mouseDelayMet;
        },

        // These are placeholder methods, to be overriden by extending plugin
        _mouseStart: function( /* event */ ) {},
        _mouseDrag: function( /* event */ ) {},
        _mouseStop: function( /* event */ ) {},
        _mouseCapture: function( /* event */ ) {
            return true;
        }
    });

})(jQuery);
