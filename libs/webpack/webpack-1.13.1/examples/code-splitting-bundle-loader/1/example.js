webpackJsonp([0,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)(function(fileJsExports) {
		console.log(fileJsExports);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var cbs = [], 
		data;
	module.exports = function(cb) {
		if(cbs) cbs.push(cb);
		else cb(data);
	}
	__webpack_require__.e/* nsure */(1, function(require) {
		data = __webpack_require__(2);
		var callbacks = cbs;
		cbs = null;
		for(var i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i](data);
		}
	});

/***/ }
]);