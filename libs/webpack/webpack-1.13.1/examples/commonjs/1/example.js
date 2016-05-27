webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var inc = __webpack_require__(1).increment;
	var a = 1;
	console.log( inc(a) ); // 2

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var add = __webpack_require__(2).add;
	exports.increment = function(val) {
	    return add(val, 1);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	exports.add = function() {
	    var sum = 0, i = 0, args = arguments, l = args.length;
	    while (i < l) {
	        sum += args[i++];
	    }
	    return sum;
	};

/***/ }
]);