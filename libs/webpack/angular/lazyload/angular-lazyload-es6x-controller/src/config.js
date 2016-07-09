'use strict';

function appRoute($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            template: require('./pages/home/views/home.html'), // include small templates into routing configuration
            controller: 'HomeController as vm',
            // 
            resolve: {
                loadHomeController: function($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function() {
                        let module = require('./pages/home/home');
                        console.log("home:", module)
                        $ocLazyLoad.load({
                            name: module.name
                        });
                        deferred.resolve(module.controller);
                    });

                    return deferred.promise;
                },
                // 也可
                // loadHomeController1: ($q, $ocLazyLoad) => {
                //     return $q((resolve) => {
                //         require.ensure([], () => {
                //             let module = require('./pages/home/home.js')(Angular);

                //             console.log("home:", module)
                //             $ocLazyLoad.load({
                //                 name: 'homeApp'
                //             });
                //             resolve(module);
                //         });
                //     });
                // }
            }
        })
        .state('home.about', {
            url: '/about',
            template: require('./pages/home/views/home.about.html'),
            controller: 'HomeAboutController as vm'
        })
        .state('messages', {
            url: '/messages',
            template: require('./pages/messages/views/messages.html'),
            controller: 'MessagesController as vm',
            resolve: {
                loadMessagesController: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {                            
                            let module = require('./pages/messages/controllers/messages.controller');
                            
                            $ocLazyLoad.load({
                                name: module.name
                            });  
                            resolve(module.controller);
                        })
                    });
                }
            }
        })
        .state('messages.all', {
            url: '/all',
            template: require('./pages/messages/views/messages.all.html'),
            controller: 'MessagesAllController as vm',
            resolve: {
                loadMessagesAllController: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure(['./pages/messages/controllers/messages.all.controller'], () => {
                            // let msg = require('./commons/msg-store/index');
                            let module = require('./pages/messages/controllers/messages.all.controller');
                            // msgStore name: 
                            $ocLazyLoad.load({
                                name: module.name
                            });

                            console.log("load module: ", $ocLazyLoad.getModules() );
                            // console.log($ocLazyLoad.isLoaded('msg-store'));

                            resolve(module.controller);

                        })
                    });
                }
            }
        })
        // .state('messages.new', {
        //     url: '/new',
        //     templateProvider: ($q) => {
        //         return $q((resolve) => {
        //             require.ensure([], () => resolve(require('./pages/messages/views/messages.new.html')));
        //         });
        //     },
        //     controller: 'MessagesNewController as vm',
        //     resolve: {
        //         loadMessagesNewController: ($q, $ocLazyLoad) => {
        //             return $q((resolve) => {
        //                 require.ensure([], () => {
        //                     // load only controller module
        //                     let module = require('./pages/messages/controllers/messages.new.controller');
        //                     $ocLazyLoad.load({
        //                         name: module.name
        //                     });
        //                     resolve(module.controller);
        //                 })
        //             });
        //         }
        //     }
        // });
}

appRoute.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

export default appRoute;
