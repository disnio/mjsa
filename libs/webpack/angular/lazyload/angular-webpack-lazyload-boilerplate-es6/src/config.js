/**
 *
 * @param App
 * @param Router
 */
export default function AppConfig(App, Router) {

    App.config( /*@ngInject*/ ($stateProvider, $locationProvider, $urlRouterProvider, ConfigProvider) => {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider

        // AUTH routes
            .state('auth', {
                url: '/auth',
                abstract: true,
                templateProvider: () => {
                    return Router.loadTemplate('apps/auth/pages/auth.html');
                },
                resolve: /*@ngInject*/ $ocLazyLoad => {
                    return Router.loadModule('apps/auth/auth.module', $ocLazyLoad);
                },
                isLoggedIn: false
            })
            // AUTH.LOGIN route
            .state('auth.login', {
                url: '/login?token',
                templateProvider: () => {
                    return Router.loadTemplate('apps/auth/pages/login/login.html');
                },
                controller: 'LoginCtrl',
                controllerAs: 'lc',
                resolve: /*@ngInject*/ $ocLazyLoad => {
                    return Router.loadPageModule('apps/auth/pages/login/login.module', $ocLazyLoad);
                },
                isLoggedIn: false
            })

        // MAIN routes
        .state('main', {
                url: '/',
                abstract: true,
                templateProvider: () => {
                    return Router.loadTemplate('apps/main/pages/main.html');
                },
                controller: 'MainCtrl',
                controllerAs: 'mc',
                resolve: /*@ngInject*/ $ocLazyLoad => {
                    return Router.loadModule('apps/main/main.module', $ocLazyLoad);
                },
                isLoggedIn: true
            })
            // MAIN.HOME
            .state('main.home', {
                url: 'home',
                templateProvider: () => {
                    return Router.loadTemplate('apps/main/pages/home/home.html');
                },
                resolve: /*@ngInject*/ $ocLazyLoad => {
                    return Router.loadPageModule('apps/main/pages/home/home.module', $ocLazyLoad);
                },
                isLoggedIn: true
            })
            // MAIN.WELCOME
            .state('main.about', {
                url: 'about',
                templateProvider: () => {
                    return Router.loadTemplate('apps/main/pages/about/about.html');
                },
                resolve: /*@ngInject*/ $ocLazyLoad => {
                    return Router.loadPageModule('apps/main/pages/about/about.module', $ocLazyLoad);
                },
                isLoggedIn: true
            });

        $urlRouterProvider.otherwise('/home');

    });

}
