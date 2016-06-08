/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*jshint browser:true */
	'use strict';

	// require('./vendor.js')();

	var appModule = __webpack_require__(2);

	if (false) {
	  // jshint ignore:line
	  require('./config/production')(appModule);
	}

	angular.element(document).ready(function () {
	  angular.bootstrap(document, [appModule.name], {
	    //strictDi: true
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = angular.module('app', ['lumx',
	/* modules */
	__webpack_require__(3).name]);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = angular.module('app.layout', []).directive('lumxNavbar', __webpack_require__(4));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavCtrl = function NavCtrl() {
	  _classCallCheck(this, NavCtrl);

	  this.app = __webpack_require__(5);
	};

	exports.default = function () {
	  __webpack_require__(6);
	  return {
	    controller: NavCtrl,
	    controllerAs: 'nav',
	    template: __webpack_require__(7)
	  };
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
		"title": "Module Loaders",
		"version": "0.3.0",
		"links": [
			{
				"text": "Webpack",
				"link": "http://webpack.github.io"
			},
			{
				"text": "Require.js",
				"link": "http://requirejs.org/"
			},
			{
				"text": "Jspm",
				"link": "http://jspm.io/"
			}
		]
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<header class=\"header bgc-light-blue-600\" ng-cloak>\n  <h1 class=\"main-logo\">\n    <a href=\"/\" class=\"main-logo__link\" lx-ripple=\"white\">\n      <span class=\"main-nav--title\">{{::nav.app.title}} </span>\n      <span class=\"main-nav--version\">v{{::nav.app.version}}</span>\n    </a>\n  </h1>\n\n  <nav class=\"main-nav main-nav--lap-and-up\">\n    <ul>\n      <li ng-repeat=\"n in nav.app.links\">\n        <a href=\"{{::n.link}}\" class=\"main-nav__link\" lx-ripple=\"white\">\n          {{::n.text}}</a>\n      </li>\n    </ul>\n  </nav>\n  <nav class=\"main-nav main-nav--palm\">\n    <lx-dropdown position=\"right\" from-top=\"true\" width=\"150px\">\n      <button class=\"btn btn--l btn--white btn--icon\" lx-ripple=\"white\" lx-dropdown-toggle>\n        <i class=\"mdi mdi-dots-vertical\"></i>\n      </button>\n\n      <lx-dropdown-menu>\n        <ul>\n          <li ng-repeat=\"n in nav.app.links\">\n            <a ng-href=\"{{::n.link}}\" class=\"main-nav__link\" lx-ripple=\"white\">\n              <span style=\"color: rgba(0, 0, 0, 0.541176)\">{{::n.text}}</span>\n            </a>\n          </li>\n        </ul>\n      </lx-dropdown-menu>\n    </lx-dropdown>\n  </nav>\n</header>\n"

/***/ }
/******/ ]);