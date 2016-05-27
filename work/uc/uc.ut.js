/* 
 * @Author: Allen
 * @Date:   2015-12-04
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-05-04 11:29:28
 */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', '_'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery', '_'));
    } else {
        // Browser globals
        factory(jQuery, _);
    }
}(function(jQuery, _) {
    var baseUrl = ucConfig.ServerReferenceCrowdSourcingAPI;
    /**
     * [jaxJson description]
     * @param  {[type]} opt [description]
     * @return {[type]}     [description]
     */
    var jaxJson = function(opt) {

        var isweb = _.rest(arguments)[0] || false;
        var config = {
            "type": "get",
            "baseUrl": baseUrl,
            "dataType": "json"
        };
        config = $.extend(config, opt);

        if (isweb) {
            config.url = config.webUrl + config.name;
        } else {
            config.url = config.baseUrl + config.name;
        }

        if (config.dataify) {
            config.data = JSON.stringify(config.data);
        }

        if (_.isFunction(config.success)) {
            // 快速
            $.ajax({
                url: config.url,
                type: config.type,
                data: config.data,
                contentType: config.contentType,
                dataType: config.dataType,
                success: config.success
            });
        } else {
            if (config.local) {
                // local storage use
                return function() {
                    return $.ajax({
                        url: config.url,
                        type: config.type,
                        data: config.data,
                        contentType: config.contentType,
                        dataType: config.dataType
                    });
                }
            } else {
                return $.ajax({
                    url: config.url,
                    type: config.type,
                    data: config.data,
                    contentType: config.contentType,
                    dataType: config.dataType
                });
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
            }), filterFn);
        };
        var getJaxPage = function(opt) {
            var defer = $.Deferred();

            jaxJson(opt.ajax, true).then(function(data) {
                renderTpl(data.Data, opt.el, opt.tpl, opt.filterFn);
                defer.resolve(data);
            });
            return defer;
        };
        getJaxPage(jaxopt).then(function(data) {
            jaxopt.page.pageEl.empty();
            if (data.TotalNum) {
                jaxopt.pageFunc.call(jaxopt.page.pageEl, {
                    totalrecords: parseInt(data.TotalNum, 10),
                    recordsperpage: jaxopt.page.perPage,
                    length: jaxopt.page.numLen,
                    initval: 1,
                    onchange: function(newPage) {
                        jaxopt.ajax.data.PageIndex = (parseInt(newPage, 10) - 1);
                        getJaxPage(jaxopt);
                    }
                });
            }
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

    var scout = function(data){
        console.log(JSON.stringify(data));
    };

    var res = {
        jaxJson: jaxJson,
        tplRender: tplRender,
        jaxPage: jaxPage,
        queryString: queryString(),
        scout: scout
    };

    if (typeof UT !== 'undefined' && $.isEmptyObject(UT)) {
        // 直接引入脚本文件
        UT = res;
    } else {
        // AMD 方式引入
        return res
    }


}));
