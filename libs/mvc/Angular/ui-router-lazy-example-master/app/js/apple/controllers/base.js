define([

    'apple/module'    

], function(appleModule) {

    'use strict';

    var controller = function($rootScope, $scope, $timeout) {
    	$scope.message = 'I am apple controller';
        
    };

    appleModule.controller('Apple.BaseCtrl', ['$rootScope', '$scope', '$timeout', controller]);
});