/* 
 * @Author: Allen
 * @Date:   2015-12-04 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-03-30 16:33:47
 */

/*
 * web调用：jaxJson(opt, true) 不写第二个参数或为false 默认调用接口 ucConfig.ServerReferenceActiveCenterAPI;
 * opt.webUrl : web地址
 * opt.name   : 具体接口
 * opt.data       : 参数
 * opt.contentType: 发送的数据编码 
 * (默认："application/x-www-form-urlencoded"，"application/json" 需要JSON.stringify() 序列化,)
 * opt.dataType: 返回的数据类型
 * opt.local: true 调用本地缓存 localstorage， 返回 promise
 * opt.dataify: true 序列化参数
 * 调用：
 * jaxGetJson(opt, true).then(function(data){
 *   // data 为服务端返回数据
 * }, function(err){
 *   // err 为服务端返回的错误信息，第二个函数可以不写
 * })
 *
 * jaxPage: ajax 分页调用
    var jaxOpt = {
        ajax: {
            "type": "post",
            "webUrl": ucConfig.ServerReferenceJavaScript,
            "name": '/active/mycreationactive/',
            "contentType": "application/json",
            "dataify": true,
            "data": {
                ActiveStatus: -1,
                ActiveTopic: "",
                PageIndex: 0,
                PageSize: 2
            }
        },
        el: $("#myfqr"),
        tpl: mactivefq,
        pageFunc: $.fn.smartpaginator,
        page: {
            pageEl: $(".myfqr-holder"),
            perPage: 2,
            numLen: 3
        }
    };
 * 
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
    var baseUrl = ucConfig.ServerReferenceActiveCenterAPI;
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

        if (config.local) {
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
    };
    
    var tplRender = function(tpl, data) {
        var filterFn = _.last(_.toArray(arguments).slice(2)) || '';        
        if (filterFn && $.isFunction(filterFn)) {
            filterFn.call(null, data);
        }
        var template = _.template(tpl);
        return template(data);
    };

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
            if( data.TotalNum){
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
    var queryString = function(){
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
    return {
        jaxJson: jaxJson,
        tplRender: tplRender,
        jaxPage: jaxPage,
        queryString: queryString()
    }

    if( typeof UT !== 'undefined' && $.isEmptyObject(UT) ){
        // 直接引入脚本文件
        UT = res;
    }else {
        // AMD 方式引入
        return res
    }


}));
