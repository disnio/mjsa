webpackJsonp([0,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	function getTemplate(templateName, callback) {
		__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(1)("./"+templateName)]; (function(tmpl) {
			callback(tmpl());
		}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	}
	getTemplate("a", function(a) {
		console.log(a);
	});
	getTemplate("b", function(b) {
		console.log(b);
	});

/***/ }
]);