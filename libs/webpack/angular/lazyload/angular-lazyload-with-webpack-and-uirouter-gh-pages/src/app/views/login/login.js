module.exports = angular.module('app.login', [])
    .controller('LoginController', function($scope, $state, AuthenticationService, localStorageService) {
        $scope.username = "";
        $scope.password = "";
        $scope.login = function() {
            console.log($scope.username);
            if ($scope.username === 'admin' && $scope.password === 'admin') {
                AuthenticationService.isLogged = true;
                localStorageService.set('token', 'eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk');
                $state.go('main');
            } else {
                $scope.username = "";
                $scope.password = "";
            }
        }
    });
