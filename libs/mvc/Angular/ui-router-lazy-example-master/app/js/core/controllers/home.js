define([

    'core/module'    

], function(coreModule) {

    'use strict';

    var controller = function($rootScope, $scope, $state, $timeout) {
		$scope.message = 'I am home controller';

		$scope.gotoState = function(state) {
			$state.go(state);
		};
    };    

    coreModule.controller('HomeCtrl', ['$rootScope', '$scope', '$state', '$timeout', controller]);
});