webpackJsonp([3],{

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(18);
	//这里可以不用再引用app.token模块，因为已经在全局引入了
	module.exports = angular.module('app.main', [])
	    .controller('MainController', ["$scope", "$http", "$state", "AuthenticationService", "localStorageService", function($scope, $http, $state, AuthenticationService, localStorageService) {
	        $("span.pie").peity("pie", { fill: ["#1ab394", "#d7d7d7", "#ffffff"] });
	        $http({ method: 'GET', url: 'https://cnodejs.org/api/v1/topics' }).
	        success(function(data, status, headers, config) {
	            console.log(data);
	        }).
	        error(function(data, status, headers, config) {

	        });
	        //退出
	        $scope.logout = function() {
	            //清空登录信息
	            AuthenticationService.isLogged = false;
	            localStorageService.set('token', null);
	            $state.go('login');
	        }
	    }]);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },

/***/ 18:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});