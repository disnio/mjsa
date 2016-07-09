/**
 * 引入相关css文件
 */
require('../css/bootstrap.css');
require('../css/animate.css');
require('../css/font-awesome.css');
require('../css/style.css');
require('../vendors/bootstrap.min.js');
require('../vendors/jquery.peity.min.js');
//定义主模块，配置相关路由
angular.module('app', ['ngAnimate', require('angular-ui-router'), require('oclazyload'), require('angular-local-storage'), require('./services/tokenInterceptor'), require('./services/loginService')])
    .config(function($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
        $httpProvider.interceptors.push('tokenInterceptor');
        $urlRouterProvider.otherwise("/login");
        $stateProvider
        //404路由配置
            .state('404', {
                url: '/404',
                templateProvider: function($q) {
                    var deferred = $q.defer();
                    require.ensure(['../404.html'], function(require) {
                        var template = require('../404.html');
                        deferred.resolve(template);
                    }, '404-tpl');
                    return deferred.promise;
                }
            })
            //主页路由
            .state('main', {
                url: '/main',
                templateProvider: function($q) {
                    var deferred = $q.defer();
                    require.ensure(['./views/main/main.html'], function(require) {
                        var template = require('./views/main/main.html');
                        deferred.resolve(template);
                    }, 'main-tpl');
                    return deferred.promise;
                },
                controller: 'MainController', //控制器名称 可以使用controller As ** 语法
                resolve: {
                    'app.main': function($q, $ocLazyLoad) {
                        var deferred = $q.defer();
                        require.ensure(['./views/main/main'], function() {
                            var mod = require('./views/main/main'); //要异步加载的模块
                            $ocLazyLoad.load({
                                name: 'app.main' //模块名称
                            });
                            deferred.resolve(mod.controller); //输出控制器
                        }, 'main-ctl');
                        return deferred.promise;
                    }
                },
                access: { requiredLogin: true }
            })
            //登录路由
            .state('login', {
                url: '/login',
                templateProvider: function($q) {
                    var deferred = $q.defer();
                    require.ensure(['./views/login/login.html'], function(require) {
                        var template = require('./views/login/login.html');
                        deferred.resolve(template);
                    }, 'login-tpl');
                    return deferred.promise;
                },
                controller: 'LoginController', //控制器名称 可以使用controller As ** 语法
                resolve: {
                    'app.main': function($q, $ocLazyLoad) {
                        var deferred = $q.defer();
                        require.ensure(['./views/login/login'], function() {
                            var mod = require('./views/login/login'); //要异步加载的模块
                            $ocLazyLoad.load({
                                name: 'app.login' //模块名称
                            });
                            deferred.resolve(mod.controller); //输出控制器
                        }, 'login-ctl');
                        return deferred.promise;
                    }
                }
            })
            // var isHistoryApi = !!(window.history && history.pushState); //判断浏览器是否支持html5的history
            // if (isHistoryApi && location.protocol !== 'file:') { $locationProvider.html5Mode(true); }
    })
    .run(function($rootScope, $state, $location, localStorageService, AuthenticationService) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                if (toState.access && toState.access.requiredLogin && !localStorageService.get('token')) {
                    event.preventDefault(); //很重要，http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
                    $state.go('login');
                }
            });
    });
