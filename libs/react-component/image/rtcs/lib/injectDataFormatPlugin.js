'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.$ = window.jQuery = _jquery2["default"];

var injectDataFormatPlugin = function injectDataFormatPlugin() {

    $.fn.injectDataFormatPlugin = function (parameter, getApi) {
        if (typeof parameter == 'function') {
            //重载
            getApi = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            getApi = getApi || function () {};
        }
        var defaults = {
            type: 'currency',
            tofixed: 2
        };
        var options = $.extend({}, defaults, parameter);
        return this.each(function () {
            //对象定义
            var $this = $(this);
            var _api = {};
            var format = {
                currency: function currency(str, tofixed) {
                    var reg = new RegExp('([\\d,]+\\.?(\\d{0,' + tofixed + '})?).*');
                    str = str.replace(/[^\d\.]/g, '').replace(/^[^\d]/, '').replace(reg, '$1');
                    var value = (+str).toFixed(tofixed);
                    var result = '';
                    if (str) {
                        var number = value.split('.')[0];
                        if (number) {
                            //处理整数部分
                            number = number.replace(/\d(?=(?:\d{3})+\b)/g, '$&,');
                        }
                        result = str.replace(/(\d)*(\.\d*)?/, number + '$2');
                    }
                    return result;
                },
                mobile: function mobile(str) {
                    var temp = (str.replace(/\s/g, '') + 'xxxxxxxxxxx').substr(0, 11);
                    var result = $.trim(temp.replace(/x/g, '').replace(/^(\d{7})/, '$1 ').replace(/^(\d{3})/, '$1 '));
                    if (temp.match(/^1[3|4|5|7|8|x][0-9x]{9}/)) {
                        return result;
                    } else {
                        return result.substr(0, result.length - 1);
                    }
                }
            };
            _api.format = function (value) {
                return format[options.type](value, options.tofixed);
            };
            _api.setValue = function (value) {
                var s = format[options.type](value, options.tofixed);
                if (s != value) {
                    $this.val(s);
                }
            };
            $this.on({
                input: function input() {
                    var value = $this.val();
                    _api.setValue(value);
                }
            });
            getApi(_api);
        });
    };
};

exports["default"] = injectDataFormatPlugin;
module.exports = exports['default'];