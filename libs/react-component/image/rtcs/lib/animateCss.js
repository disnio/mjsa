'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _animate = require('animate.css');

var _animate2 = _interopRequireDefault(_animate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.$ = window.jQuery = _jquery2["default"];

var animateCssExtend = function animateCssExtend() {
    ;$.fn.extend({
        animateCss: function animateCss(animationName, cb) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
                cb && cb();
            });
        }
    });
};

exports["default"] = animateCssExtend;
module.exports = exports['default'];