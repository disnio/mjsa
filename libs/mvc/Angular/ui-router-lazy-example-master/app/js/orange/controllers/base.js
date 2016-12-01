define([

    'orange/module'    

], function(orangeModule) {

    'use strict';

    var controller = function($rootScope, $scope, $timeout) {
    	$scope.message = 'I am orange controller';
        
    };

    orangeModule.controller('Orange.BaseCtrl', ['$rootScope', '$scope', '$timeout', controller]);
});