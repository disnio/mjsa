export default function AppRun(App, Router) {

    App.run(/*@ngInject*/ ($rootScope, $state, User, LocalStorage) => {

        User.initCurrentUser();
        Router.setRoutesCheckers($rootScope, $state, User);

        $rootScope.logOut = function () {
            User.removeCurrentUser();
            $state.transitionTo('auth.login');
        };

    });

}