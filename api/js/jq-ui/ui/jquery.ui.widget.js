/*! jQuery UI - v1.11.1+CommonJS - 2014-09-17
 * http://jqueryui.com
 * Includes: widget.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if (typeof exports === "object") {
        // Node/CommonJS:
        factory(require("jquery"));

    } else {

        // Browser globals
        factory(jQuery);
    }
}(function() {
    /*!
     * jQuery UI Widget 1.11.1
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/jQuery.widget/
     */


    var widget_uuid = 0,
        widget_slice = Array.prototype.slice;

    $.cleanData = (function(orig) {
        return function(elems) {
            var events, elem, i;
            for (i = 0;
                (elem = elems[i]) != null; i++) {
                try {

                    // Only trigger remove when necessary to save time
                    events = $._data(elem, "events");
                    if (events && events.remove) {
                        $(elem).triggerHandler("remove");
                    }

                    // http://bugs.jquery.com/ticket/8235
                } catch (e) {}
            }
            orig(elems);
        };
    })($.cleanData);
    // $.widget( "ui.progressbar", {...});
    $.widget = function(name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype,
            // proxiedPrototype allows the provided prototype to remain unmodified
            // so that it can be used as a mixin for multiple widgets (#8876)
            proxiedPrototype = {},
            namespace = name.split(".")[0];

        name = name.split(".")[1];
        fullName = namespace + "-" + name;

        if (!prototype) {
            // 插件对象
            prototype = base;
            // 混入的基础对象
            base = $.Widget;
        }
        //创建一个自定义的伪类选择器
        //如 $(':ui-menu') 则表示选择定义了ui-menu插件的元素
        $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName);
        };
        // $.ui 命名空间获取
        $[namespace] = $[namespace] || {};
        // $.ui.progressbar 获取存在的构造函数, 这里存一份旧版的插件，如果这个插件已经被使用或者定义了
        existingConstructor = $[namespace][name];
        // constructor 存储了插件的实例，同时也创建了基于命名空间的对象，重写
        constructor = $[namespace][name] = function(options, element) {
            // {value:37} <div id="elem" class>
            //允许直接调用命名空间上的方法来创建组件
            //比如：$.ui.menu({},'#id') 这种方式创建的话，默认没有new 实例化。
            //因为_createWidget是prototype上的方法，需要new关键字来实例化
            //通过 调用 $.ui.menu 来实例化插件
            // allow instantiation without "new" keyword
            // 没有生成方法则调用构造函数
            if (!this._createWidget) {
                return new constructor(options, element);
            }
            console.log(this)
                // allow instantiation without initializing for simple inheritance
                // must use "new" keyword (the code above always passes args)
                //如果存在参数，则说明是正常调用插件, $(el).progressbar({ create: function(){ console.log("create") }, value: 20 }) 的参数
                // element 为 $(el)
            if (arguments.length) {
                this._createWidget(options, element);
            }
        };
        // extend with the existing constructor to carry over any static properties        
        // 将旧插件实例，及版本号、prototype合并到constructor
        $.extend(constructor, existingConstructor, {
            version: prototype.version,
            // copy the object used to create the prototype in case we need to
            // redefine the widget later
            _proto: $.extend({}, prototype),
            // track widgets that inherit from this widget in case this widget is
            // redefined after a widget inherits from it
            _childConstructors: []
        });
        //实例化父类 获取父类的  prototype。自定义组件 + Widget 的合并对象。
        basePrototype = new base();
        // we need to make the options hash a property directly on the new instance
        // otherwise we'll modify the options hash on the prototype that we're
        // inheriting from
        // 从基类导入默认选项, 这里深复制一份 options 合并两者
        basePrototype.options = $.widget.extend({}, basePrototype.options);
        // 包装原型代码中与基类同名的属性方法，生成 proxiedPrototype 代理原型对象 
        //原型中方法添加 this._super 和this.__superApply，调用到base上（最基类上）的方法 
        $.each(prototype, function(prop, value) {
            if (!$.isFunction(value)) {
                proxiedPrototype[prop] = value;
                return;
            }
            proxiedPrototype[prop] = (function() {
                var _super = function() {
                        // 包装基类
                        return base.prototype[prop].apply(this, arguments);
                    },
                    _superApply = function(args) {
                        return base.prototype[prop].apply(this, args);
                    };
                return function() {
                    // 保存原型里面的同名方法
                    var __super = this._super,
                        __superApply = this._superApply,
                        returnValue;

                    // 调用基类同名方法
                    this._super = _super;
                    this._superApply = _superApply;
                    // 调用原型代码方法
                    returnValue = value.apply(this, arguments);
                    // 调用原型同名方法
                    this._super = __super;
                    this._superApply = __superApply;

                    return returnValue;
                };
            })();
        });
        // 建立构造函数原型链里面包含：基类、代理原型对象
        constructor.prototype = $.widget.extend(basePrototype, {
            // TODO: remove support for widgetEventPrefix
            // always use the name + a colon as the prefix, e.g., draggable:start
            // don't prefix for widgets that aren't DOM-based
            widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        });

        // If this widget is being redefined then we need to find all widgets that
        // are inheriting from it and redefine all of them so that they inherit from
        // the new version of this widget. We're essentially trying to replace one
        // level in the prototype chain.
        // 存在老版本或以前定义的构造函数
        // 这里判定插件是否被使用了。一般来说，都不会被使用的。
        // 如果这个小部件被重新定义,我们需要找到所有小部件继承,重新定义他们,这样他们继承这个小部件的新版本。
        if (existingConstructor) {
            $.each(existingConstructor._childConstructors, function(i, child) {
                var childPrototype = child.prototype;

                // redefine the child widget using the same prototype that was
                // originally used, but inherit from the new version of the base
                $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
            });
            // remove the list of existing child constructors from the old constructor
            // so the old child constructors can be garbage collected
            delete existingConstructor._childConstructors;
        } else {
            // 父类添加当前插件的实例 主要用于作用域链查找
            base._childConstructors.push(constructor);
        }
        // 将此方法挂在jQuery对象上
        $.widget.bridge(name, constructor);
        return constructor;
    };
    // 扩展jq的extend方法，实际上类似$.extend(true,..) 深复制
    $.widget.extend = function(target) {
        var input = widget_slice.call(arguments, 1),
            inputIndex = 0,
            inputLength = input.length,
            key,
            value;
        for (; inputIndex < inputLength; inputIndex++) {
            for (key in input[inputIndex]) {
                value = input[inputIndex][key];
                if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
                    // Clone objects
                    if ($.isPlainObject(value)) {
                        target[key] = $.isPlainObject(target[key]) ?
                            $.widget.extend({}, target[key], value) :
                            // Don't extend strings, arrays, etc. with objects
                            $.widget.extend({}, value);
                        // Copy everything else by reference
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
        return target;
    };
    // bridge 是设计模式的一种，这里将对象转为插件调用
    $.widget.bridge = function(name, object) {
        // 1、初次实例化时将插件对象缓存在dom上，后续则可直接调用，
        // 避免在相同元素下widget的多实例化。简单的说，就是一个单例方法。
        // 2、合并用户提供的默认设置选项options
        // 3、可以通过调用插件时传递字符串来调用插件内的方法。如:$('#id').menu('hide') 实际就是实例插件并调用hide()方法。
        // 4、同时限制外部调用“_”下划线的私有方法
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = typeof options === "string",
                args = widget_slice.call(arguments, 1),
                returnValue = this;

            // allow multiple hashes to be passed on init
            options = !isMethodCall && args.length ?
                $.widget.extend.apply(null, [options].concat(args)) :
                options;
            // 已经实例化后，插件被调用
            if (isMethodCall) {
                this.each(function() {
                    var methodValue,
                        instance = $.data(this, fullName);
                    if (options === "instance") {
                        returnValue = instance;
                        return false;
                    }
                    if (!instance) {
                        return $.error("cannot call methods on " + name + " prior to initialization; " +
                            "attempted to call method '" + options + "'");
                    }
                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        return $.error("no such method '" + options + "' for " + name + " widget instance");
                    }
                    // value 方法调用后无返回值， option 方法调用后有返回值，widget 方法返回带 jquery
                    methodValue = instance[options].apply(instance, args);
                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue && methodValue.jquery ?
                            returnValue.pushStack(methodValue.get()) :
                            methodValue;
                        return false;
                    }
                });
            } else {
                this.each(function() {
                    var instance = $.data(this, fullName);
                    if (instance) {
                        instance.option(options || {});
                        if (instance._init) {
                            instance._init();
                        }
                    } else {
                        // 通过构造函数新建
                        $.data(this, fullName, new object(options, this));
                    }
                });
            }

            return returnValue;
        };
    };
    // 这里是真正的widget基类
    $.Widget = function( /* options, element */ ) {};
    $.Widget._childConstructors = [];

    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            // callbacks
            create: null
        },
        _createWidget: function(options, element) {

            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            this.uuid = widget_uuid++;
            this.eventNamespace = "." + this.widgetName + this.uuid;

            this.options = $.widget.extend({},
                this.options,
                this._getCreateOptions(),
                options);


            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();

            if (element !== this) {
                // 保存实例
                $.data(element, this.widgetFullName, this);
                // 注册 remove 事件
                this._on(true, this.element, {
                    remove: function(event) {
                        if (event.target === element) {
                            this.destroy();
                        }
                    }
                });
                this.document = $(element.style ?
                    // ownerDocument当前节点所在文档的文档节点.
                    element.ownerDocument :
                    // element is window or document
                    element.document || element);
                // defaultView 关联document的 window对象, parentWindow 当前窗口的父窗口对象.
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
            }
            // 外部 _create 方法
            this._create();

            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        // 销毁模块：去除绑定事件、去除数据、去除样式、属性
        destroy: function() {
            // 外部 _destroy 方法
            this._destroy();
            // we can probably remove the unbind calls in 2.0
            // all event bindings should go through this._on()
            this.element
                .unbind(this.eventNamespace)
                .removeData(this.widgetFullName)
                // support: jquery <1.6.3
                // http://bugs.jquery.com/ticket/9413
                .removeData($.camelCase(this.widgetFullName));
            this.widget()
                .unbind(this.eventNamespace)
                .removeAttr("aria-disabled")
                .removeClass(
                    this.widgetFullName + "-disabled " +
                    "ui-state-disabled");

            // clean up events and states
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: $.noop,

        widget: function() {
            return this.element;
        },

        option: function(key, value) {
            var options = key,
                parts,
                curOption,
                i;

            if (arguments.length === 0) {
                // don't return a reference to the internal hash
                return $.widget.extend({}, this.options);
            }

            if (typeof key === "string") {
                // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
                options = {};
                parts = key.split(".");
                key = parts.shift();
                if (parts.length) {
                    curOption = options[key] = $.widget.extend({}, this.options[key]);
                    for (i = 0; i < parts.length - 1; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]];
                    }
                    key = parts.pop();
                    if (arguments.length === 1) {
                        return curOption[key] === undefined ? null : curOption[key];
                    }
                    curOption[key] = value;
                } else {
                    if (arguments.length === 1) {
                        return this.options[key] === undefined ? null : this.options[key];
                    }
                    options[key] = value;
                }
            }

            this._setOptions(options);

            return this;
        },
        _setOptions: function(options) {
            var key;

            for (key in options) {
                this._setOption(key, options[key]);
            }

            return this;
        },
        _setOption: function(key, value) {
            this.options[key] = value;

            if (key === "disabled") {
                this.widget()
                    .toggleClass(this.widgetFullName + "-disabled", !!value);

                // If the widget is becoming disabled, then nothing is interactive
                if (value) {
                    this.hoverable.removeClass("ui-state-hover");
                    this.focusable.removeClass("ui-state-focus");
                }
            }

            return this;
        },

        enable: function() {
            return this._setOptions({
                disabled: false
            });
        },
        disable: function() {
            return this._setOptions({
                disabled: true
            });
        },
        // suppressDisabledCheck 跳过禁用的.
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement,
                instance = this;

            // no suppressDisabledCheck flag, shuffle arguments
            if (typeof suppressDisabledCheck !== "boolean") {
                handlers = element;
                element = suppressDisabledCheck;
                suppressDisabledCheck = false;
            }

            // no element argument, shuffle and use this.element
            if (!handlers) {
                handlers = element;
                element = this.element;
                delegateElement = this.widget();
            } else {
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element);
            }
            // 执行组件的事件处理器 [remove, mouseenter, mouseleave, focus, blur, ...]
            $.each(handlers, function(event, handler) {
                function handlerProxy() {
                    // allow widgets to customize the disabled handling
                    // - disabled as an array instead of boolean
                    // - disabled class as method for disabling individual parts
                    if (!suppressDisabledCheck &&
                        (instance.options.disabled === true ||
                            $(this).hasClass("ui-state-disabled"))) {
                        return;
                    }
                    return (typeof handler === "string" ? instance[handler] : handler)
                        .apply(instance, arguments);
                }

                // copy the guid so direct unbinding works
                if (typeof handler !== "string") {
                    handlerProxy.guid = handler.guid =
                        handler.guid || handlerProxy.guid || $.guid++;
                }

                var match = event.match(/^([\w:-]*)\s*(.*)$/),
                    eventName = match[1] + instance.eventNamespace,
                    selector = match[2];
                if (selector) {
                    delegateElement.delegate(selector, eventName, handlerProxy);
                } else {
                    element.bind(eventName, handlerProxy);
                }
            });
        },

        _off: function(element, eventName) {
            // remove.progressbar0
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            element.unbind(eventName).undelegate(eventName);
        },

        _delay: function(handler, delay) {
            function handlerProxy() {
                return (typeof handler === "string" ? instance[handler] : handler)
                    .apply(instance, arguments);
            }
            var instance = this;
            return setTimeout(handlerProxy, delay || 0);
        },

        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover");
                }
            });
        },

        _focusable: function(element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus");
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus");
                }
            });
        },

        _trigger: function(type, event, data) {
            var prop, orig,
                callback = this.options[type];

            data = data || {};

            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ?
                type :
                this.widgetEventPrefix + type).toLowerCase();
            // the original event may come from any element
            // so we need to reset the target on the new event
            event.target = this.element[0];

            // copy original event properties over to the new event
            orig = event.originalEvent;
            if (orig) {
                for (prop in orig) {
                    if (!(prop in event)) {
                        event[prop] = orig[prop];
                    }
                }
            }


            this.element.trigger(event, data);
            return !($.isFunction(callback) &&
                callback.apply(this.element[0], [event].concat(data)) === false ||
                event.isDefaultPrevented());
        }
    };

    $.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(method, defaultEffect) {
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            if (typeof options === "string") {
                options = {
                    effect: options
                };
            }
            var hasOptions,
                effectName = !options ?
                method :
                options === true || typeof options === "number" ?
                defaultEffect :
                options.effect || defaultEffect;
            options = options || {};
            if (typeof options === "number") {
                options = {
                    duration: options
                };
            }
            hasOptions = !$.isEmptyObject(options);
            options.complete = callback;
            if (options.delay) {
                element.delay(options.delay);
            }
            if (hasOptions && $.effects && $.effects.effect[effectName]) {
                element[method](options);
            } else if (effectName !== method && element[effectName]) {
                element[effectName](options.duration, options.easing, callback);
            } else {
                element.queue(function(next) {
                    $(this)[method]();
                    if (callback) {
                        callback.call(element[0]);
                    }
                    next();
                });
            }
        };
    });

    var widget = $.widget;



}));
