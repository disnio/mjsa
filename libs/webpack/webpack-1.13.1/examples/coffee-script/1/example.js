webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	console.log(__webpack_require__(1));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  cool: "stuff",
	  answer: 42,
	  external: __webpack_require__(2),
	  again: __webpack_require__(2)
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	console.log("yeah coffee-script");

	module.exports = 42;


/***/ }
]);