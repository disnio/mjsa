define([

    'angularUiRouter',
    'core/controllers/home',

], function() {

    'use strict';

    angular.module('futureStates.states.core', [
        'ui.router',
    ]).config([
        '$stateProvider',
        '$urlRouterProvider',
        '$urlMatcherFactoryProvider',
        function($stateProvider,
            $urlRouterProvider,
            $urlMatcherFactoryProvider
        ) {

            $stateProvider
                .state('app', {
                    abstract: true,
                    template: '<ui-view/>'
                })
                .state('app.home', {
                    url: '/',
                    templateUrl: 'views/core/home.html',
                    controller: 'HomeCtrl'
                });
        }
    ]);
});
