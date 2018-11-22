'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('perfect-scrollbar/dist/css/perfect-scrollbar.css');

require('perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.$ = window.jQuery = _jquery2["default"];

var PerfectScroller = function PerfectScroller($scroller) {
	$($scroller).perfectScrollbar();
};

exports["default"] = PerfectScroller;
module.exports = exports['default'];