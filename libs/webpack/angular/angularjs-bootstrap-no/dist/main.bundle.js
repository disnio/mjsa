webpackJsonp([1],[
/* 0 */
/*!*******************************************!*\
  !*** D:/wamp/www/es6/webpack/app/main.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(/*! angular */ 3);
	__webpack_require__(/*! ui-router */ 2);
	__webpack_require__(/*! ocLazyLoad */ 6);

	// require('bootstrap-sass-loader!../bootstrap-sass.config.js');

	angular.module('webpack.angular', ['ui.router', 'oc.lazyLoad', __webpack_require__(/*! ./components/core */ 17).name, __webpack_require__(/*! ./components/header */ 19).name, __webpack_require__(/*! ./state1 */ 20).name, __webpack_require__(/*! ./state2 */ 22).name]);

	angular.module('webpack.angular').config( /*@ngInject*/["$stateProvider", "$locationProvider", "$urlRouterProvider", function ($stateProvider, $locationProvider, $urlRouterProvider) {
	  $stateProvider.state('state1', {
	    url: '/state1',
	    template: __webpack_require__(/*! ./state1/state1.jade */ 15),
	    controller: 'State1Controller',
	    controllerAs: 'ctrl'
	  }).state('state2', {
	    url: '/state2',
	    template: __webpack_require__(/*! ./state2/state2.jade */ 16),
	    controller: 'State2Controller',
	    controllerAs: 'ctrl'
	  });

	  // $locationProvider.html5Mode(true);

	  $urlRouterProvider.otherwise('/state1');
	}]);

/***/ },
/* 1 */
/*!***************************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/components/util/register.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	'use strict';

	/**
	 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
	 */

	function register(appName) {

	    var app = angular.module(appName);

	    return {
	        directive: directive,
	        controller: controller,
	        service: service,
	        provider: provider,
	        factory: factory
	    };

	    function directive(name, constructorFn) {

	        constructorFn = _normalizeConstructor(constructorFn);

	        if (!constructorFn.prototype.compile) {
	            // create an empty compile function if none was defined.
	            constructorFn.prototype.compile = function () {};
	        }

	        var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);

	        // Decorate the compile method to automatically return the link method (if it exists)
	        // and bind it to the context of the constructor (so `this` works correctly).
	        // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
	        // returns `this.link` from within the compile function.
	        _override(constructorFn.prototype, 'compile', function () {
	            return function () {
	                originalCompileFn.apply(this, arguments);

	                if (constructorFn.prototype.link) {
	                    return constructorFn.prototype.link.bind(this);
	                }
	            };
	        });

	        var factoryArray = _createFactoryArray(constructorFn);
	        app.directive(name, factoryArray);
	        return this;
	    }

	    function controller(name, contructorFn) {
	        app.controller(name, contructorFn);
	        return this;
	    }

	    function service(name, contructorFn) {
	        app.service(name, contructorFn);
	        return this;
	    }

	    function provider(name, constructorFn) {
	        app.provider(name, constructorFn);
	        return this;
	    }

	    function factory(name, constructorFn) {
	        constructorFn = _normalizeConstructor(constructorFn);
	        var factoryArray = _createFactoryArray(constructorFn);
	        app.factory(name, factoryArray);
	        return this;
	    }

	    /**
	     * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
	     * we need to pull out the array of dependencies and add it as an $inject property of the
	     * actual constructor function.
	     * @param input
	     * @returns {*}
	     * @private
	     */
	    function _normalizeConstructor(input) {
	        var constructorFn;

	        if (input.constructor === Array) {
	            //
	            var injected = input.slice(0, input.length - 1);
	            constructorFn = input[input.length - 1];
	            constructorFn.$inject = injected;
	        } else {
	            constructorFn = input;
	        }

	        return constructorFn;
	    }

	    /**
	     * Convert a constructor function into a factory function which returns a new instance of that
	     * constructor, with the correct dependencies automatically injected as arguments.
	     *
	     * In order to inject the dependencies, they must be attached to the constructor function with the
	     * `$inject` property annotation.
	     *
	     * @param constructorFn
	     * @returns {Array.<T>}
	     * @private
	     */
	    function _createFactoryArray(constructorFn) {
	        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
	        var args = constructorFn.$inject || [];
	        var factoryArray = args.slice(); // create a copy of the array
	        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
	        // dependency, and the final item is the factory function itself.
	        factoryArray.push(function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            //eslint-disable-line no-shadow
	            //return new constructorFn(...args);
	            var instance = new (Function.prototype.bind.apply(constructorFn, [null].concat(args)))(); //eslint-disable-line new-cap
	            for (var key in instance) {
	                instance[key] = instance[key];
	            }
	            return instance;
	        });

	        return factoryArray;
	    }

	    /**
	     * Clone a function
	     * @param original
	     * @returns {Function}
	     */
	    function _cloneFunction(original) {
	        return function () {
	            return original.apply(this, arguments);
	        };
	    }

	    /**
	     * Override an object's method with a new one specified by `callback`.
	     * @param object
	     * @param methodName
	     * @param callback
	     */
	    function _override(object, methodName, callback) {
	        object[methodName] = callback(object[methodName]);
	    }
	}

	module.exports = register;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/*!*************************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/components/core/core.scss ***!
  \*************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */
/*!*****************************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/components/header/header.scss ***!
  \*****************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */
/*!******************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/state1/state1.scss ***!
  \******************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 12 */
/*!******************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/state2/state2.scss ***!
  \******************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 13 */,
/* 14 */
/*!*****************************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/components/header/header.jade ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = "<nav class=\"navbar navbar-inverse navbar-fixed-top\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">Webpack AngularJS Boilerplate</a></div><div id=\"navbar\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li ui-sref-active=\"active\"><a ui-sref=\"state1\">Home</a></li><li ui-sref-active=\"active\"><a ui-sref=\"state2\">Page 2</a></li></ul></div></div></nav>";

/***/ },
/* 15 */
/*!******************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/state1/state1.jade ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = "<header></header><div class=\"container\"><div class=\"starter-template\"><h1>Bootstrap starter template</h1><h2>Some documentation will come here</h2><p class=\"lead\">Use this boilerplate to start a new project using Webpack, AngularJS and Bootstrap.</p></div></div>";

/***/ },
/* 16 */
/*!******************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/state2/state2.jade ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = "<header></header><div class=\"container\"><div class=\"starter-template starter-template-alt\"><h1>Another state</h1><p class=\"lead\">Some new information here.</p></div></div>";

/***/ },
/* 17 */
/*!************************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/components/core/index.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(/*! ./core.scss */ 9);

	var mod = angular.module('core', []);

	module.exports = mod;

/***/ },
/* 18 */
/*!***************************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/components/header/header.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Header =
	/*@ngInject*/
	function Header() {
	  _classCallCheck(this, Header);

	  this.template = __webpack_require__(/*! ./header.jade */ 14);
	  this.restrict = 'E';
	  this.controller = HeaderController;
	  this.controllerAs = 'ctrl';
	  this.bindToController = true;
	  this.scope = {};
	};

	var HeaderController =
	/*@ngInject*/
	function HeaderController() {
	  _classCallCheck(this, HeaderController);
	};

	module.exports = Header;

/***/ },
/* 19 */
/*!**************************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/components/header/index.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(register) {'use strict';

	__webpack_require__(/*! ./header.scss */ 10);

	var mod = angular.module('foo.header', []);

	register(mod.name).directive('header', __webpack_require__(/*! ./header.js */ 18));

	module.exports = mod;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! registerjs */ 1)))

/***/ },
/* 20 */
/*!***************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/state1/index.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(register) {'use strict';

	__webpack_require__(/*! ./state1.scss */ 11);

	var mod = angular.module('foo.state1', []);

	register(mod.name).controller('State1Controller', __webpack_require__(/*! ./state1.js */ 21));

	module.exports = mod;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! registerjs */ 1)))

/***/ },
/* 21 */
/*!****************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/state1/state1.js ***!
  \****************************************************/
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var State1Controller =
	/*@ngInject*/
	["$state", function State1Controller($state) {
	  _classCallCheck(this, State1Controller);

	  this.$state = $state;

	  this.somevar = 3;
	}];

	module.exports = State1Controller;

/***/ },
/* 22 */
/*!***************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/state2/index.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(register) {'use strict';

	__webpack_require__(/*! ./state2.scss */ 12);

	var mod = angular.module('foo.state2', []);

	register(mod.name).controller('State2Controller', __webpack_require__(/*! ./state2.js */ 23));

	module.exports = mod;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! registerjs */ 1)))

/***/ },
/* 23 */
/*!****************************************************!*\
  !*** D:/wamp/www/es6/webpack/app/state2/state2.js ***!
  \****************************************************/
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var State2Controller =
	/*@ngInject*/
	["$state", function State2Controller($state) {
	  _classCallCheck(this, State2Controller);

	  this.$state = $state;
	}];

	module.exports = State2Controller;

/***/ }
]);