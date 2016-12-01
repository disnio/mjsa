define([

    'angularUiRouter',
    'orange/module',
    'orange/controllers/base',    

], function() {

    'use strict';

    angular.module('futureStates.states.orange', [
        'ui.router',        
        'futureStates.orange'
    ]).config([
            '$stateProvider',
            '$urlRouterProvider',
            '$urlMatcherFactoryProvider',
            function($stateProvider,
                     $urlRouterProvider,
                     $urlMatcherFactoryProvider
                ) {

        $stateProvider            
            .state('app.orange', {
                url: '/orange',
                templateUrl: 'views/orange/base.html',
                controller: 'Orange.BaseCtrl'                
            });            
        }
    ]);
});