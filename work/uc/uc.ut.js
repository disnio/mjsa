/*
 * @Author: Allen
 * @Date:   2015-12-04
 * @Last Modified by:   czy
 * @Last Modified time: 2017-05-05 11:01:57
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return (root.UT = factory(window.jQuery));
        });
    } else {
        root.UT = factory(root.jQuery);
    }
}(this, function(jQuery) {
    var localUrl = ucConfig.ServerReferenceLocalHost || host;
    var pathName = ucConfig.ServerApplicationName;
    var host = location.protocol + '://' + location.host;
    var baseUrl, webUrl;
    var kindex = _.findKey(ucConfig, function(n) {
        if (new RegExp('.*' + pathName + 'API', 'i').test(n)) {
            return true;
        }
    });
    var windex = _.findKey(ucConfig, function(n) {
        if (new RegExp('.*' + pathName, 'i').test(n)) {
            return true;
        }
        return false;
    });
    kindex != -1 ? baseUrl = ucConfig[kindex] : baseUrl = ucConfig.ServerReferenceLocalHost + 'API' || host;
    windex != -1 ? webUrl = ucConfig[windex] : webUrl = ucConfig.ServerReferenceLocalHost || host;

    /**
     * [jaxJson description]
     * @param  {[type]} opt [description]
     * @return {[type]}     [description]
     */
    var jaxJson = function(opt) {
        var args = [].slice.call(arguments);
        var isweb = args.length > 1 ? args[1] : false;
        var config = $.extend({
            type: "get",
            baseUrl: baseUrl,
            dataType: "json"
        }, opt);
        var optl;

        if (isweb) {
            config.url = !_.isUndefined(config.webUrl) ? config.webUrl + config.name : webUrl;
        } else {
            config.url = !_.isUndefined(config.baseUrl) ? config.baseUrl + config.name : baseUrl;
        }

        if (config.dataify) {
            config.data = JSON.stringify(config.data);
        }
        // http://tools.jb51.net/table/http_content_type
        optl = {
            url: config.url,
            type: config.type,
            data: config.data,
            contentType: config.contentType,
            dataType: config.dataType,
            xhrFields: config.xhrFields || {}
        };

        if (_.isFunction(config.success)) {
            $.ajax($.extend(optl, {
                success: config.success
            }));
        } else {
            if (config.local) {
                // local storage use
                return function() {
                    return $.ajax(optl);
                }
            } else {
                return $.ajax(optl);
            }
        }
    };
    // 模板渲染
    var tplRender = function(tpl, data) {
        var filterFn = _.last(_.toArray(arguments).slice(2)) || '';
        if (filterFn && $.isFunction(filterFn)) {
            filterFn.call(null, data);
        }
        var template = _.template(tpl);
        return template(data);
    };
    // ajax 分页
    var jaxPage = function(jaxopt) {
        var renderTpl = function(data, el, tpl, filterFn) {
            el.empty().append(tplRender(tpl, {
                "datas": data
            }, filterFn));
        };
        var getJaxPage = function(opt) {
            var defer = $.Deferred();

            jaxJson(opt.ajax, true).then(function(data) {
                if (typeof data == 'string') {
                    opt.el.empty();
                    defer.resolve(data);
                } else {
                    if (opt.pageData) {
                        renderTpl(data.Data[opt.pageData], opt.el, opt.tpl, opt.filterFn);
                    } else {
                        renderTpl(data.Data, opt.el, opt.tpl, opt.filterFn);
                    }
                    defer.resolve(data);
                }

            });
            return defer;
        };
        getJaxPage(jaxopt).then(function(data) {
            // error data format
            if (typeof data == 'string') {
                data = {
                    Data: [],
                    TotalNum: 0
                }
            }
            if (jaxopt.pageData) {
                data = data.Data;
            }
            // data change
            if ($.isFunction(jaxopt.beforePage)) {
                jaxopt.beforePage(data);
            }

            jaxopt.page.pageEl.empty();
            if (data.TotalNum) {
                jaxopt.pageFunc.call(jaxopt.page.pageEl, {
                    totalrecords: parseInt(data.TotalNum, 10),
                    recordsperpage: jaxopt.page.perPage,
                    length: jaxopt.page.numLen,
                    initval: 1,
                    go: jaxopt.page.go || "Go",
                    next: jaxopt.page.next || "Next",
                    prev: jaxopt.page.prev || "Prev",
                    first: jaxopt.page.first || "First",
                    last: jaxopt.page.last || "Last",
                    onchange: function(newPage) {
                        jaxopt.ajax.data.PageIndex = (parseInt(newPage, 10)) - 1;
                        getJaxPage(jaxopt);
                    }
                });
            }

            jaxopt.callback(data);
        });
    };
    // 查询字符串处理
    var queryString = function() {
        var parse = function(string) {
            var parsed = {};
            string = (string !== undefined) ? string : window.location.search;

            if (typeof string === "string" && string.length > 0) {
                if (string[0] === '?') {
                    string = string.substring(1);
                }

                string = string.split('&');

                for (var i = 0, length = string.length; i < length; i++) {
                    var element = string[i],
                        eqPos = element.indexOf('='),
                        keyValue, elValue;

                    if (eqPos >= 0) {
                        keyValue = element.substr(0, eqPos);
                        elValue = element.substr(eqPos + 1);
                    } else {
                        keyValue = element;
                        elValue = '';
                    }

                    elValue = decodeURIComponent(elValue);

                    if (parsed[keyValue] === undefined) {
                        parsed[keyValue] = elValue;
                    } else if (parsed[keyValue] instanceof Array) {
                        parsed[keyValue].push(elValue);
                    } else {
                        parsed[keyValue] = [parsed[keyValue], elValue];
                    }
                }
            }

            return parsed;
        };
        var stringify = function(obj) {
            var string = [];

            if (!!obj && obj.constructor === Object) {
                for (var prop in obj) {
                    if (obj[prop] instanceof Array) {
                        for (var i = 0, length = obj[prop].length; i < length; i++) {
                            string.push([encodeURIComponent(prop), encodeURIComponent(obj[prop][i])].join('='));
                        }
                    } else {
                        string.push([encodeURIComponent(prop), encodeURIComponent(obj[prop])].join('='));
                    }
                }
            }

            return string.join('&');
        };
        return {
            parse: parse,
            stringify: stringify
        };
    };
    // 映射 es5 {key, value[] || value}
    var umap = function() {
        var map = {};

        return {
            // objece array
            entries: function() {
                return Object.keys(map).map(function(key) {
                    return {
                        key: key,
                        value: map[key]
                    };
                });
            },
            get: function(key) {
                return map[key];
            },
            hasKey: function(key) {
                return !!map[key];
            },
            keys: function() {
                return Object.keys(map);
            },
            put: function(key, value) {
                if (!map[key]) {
                    map[key] = [];
                }

                map[key].push(value);
            },
            remove: function(key, value) {
                var values = map[key];

                if (!values) {
                    return;
                }

                var idx = values.indexOf(value);

                if (idx !== -1) {
                    values.splice(idx, 1);
                }

                if (!values.length) {
                    delete map[key];
                }
            }
        };
    };
    // 堆栈
    var ustack = function() {
        var stack = [];

        return {
            add: function(key, value) {
                stack.push({
                    key: key,
                    value: value
                });
            },
            get: function(key) {
                for (var i = 0; i < stack.length; i++) {
                    if (key == stack[i].key) {
                        return stack[i];
                    }
                }
            },
            keys: function() {
                var keys = [];
                for (var i = 0; i < stack.length; i++) {
                    keys.push(stack[i].key);
                }
                return keys;
            },
            top: function() {
                return stack[stack.length - 1];
            },
            remove: function(key) {
                var idx = -1;
                for (var i = 0; i < stack.length; i++) {
                    if (key == stack[i].key) {
                        idx = i;
                        break;
                    }
                }
                return stack.splice(idx, 1)[0];
            },
            removeTop: function() {
                return stack.splice(stack.length - 1, 1)[0];
            },
            length: function() {
                return stack.length;
            }
        };
    };
    // 需要 jquery.cookie
    var getCookie = function(name) {
        return $.cookie(name);
    };

    var setCookie = function(name, value, cfg) {
        $.cookie(name, value, cfg);
    };

    var deleteCookie = function(name, cfg) {
        $.removeCookie(name, cfg);
    };
    // 获取对象属性数量
    var getObjLen = function(obj) {
        var c = 0;
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                c += 1;
            }
        }
        return c;
    };
    // 汉字和英文长度
    var strlen = function(str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    };

    var cutStr = function(str, len) {
        var str_length = 0;
        var str_len = 0;
        var str_cut = new String();
        str_len = (str == null) ? 0 : str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < len) {
            return str;
        }
    };

    // enter 按下执行 callback
    var enterCall = function(event, callback) {
        var e = event ? event : window.event
        if (e.keyCode == 13) {
            callback();
        }
    };

    var log = function() {
        if (console && console.log) {
            console.log([].slice.call(arguments))
        } else {
            alert([].slice.call(arguments))
        }
    };

    return {
        jaxJson: jaxJson,
        tplRender: tplRender,
        jaxPage: jaxPage,
        queryString: queryString(),
        getCookie: getCookie,
        setCookie: setCookie,
        deleteCookie: deleteCookie,
        getObjLen: getObjLen,
        strlen: strlen,
        cutStr: cutStr,
        enterCall: enterCall,
        log: log
    };

}));
