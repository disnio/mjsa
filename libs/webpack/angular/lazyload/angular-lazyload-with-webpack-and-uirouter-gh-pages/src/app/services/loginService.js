angular.module('app.auth', [])
    .factory('AuthenticationService', function() {
        var auth = {
            isLogged: false
        }
        return auth;
    })
    .factory('UserService', function($http) {
        return {
            logIn: function(username, password) {
                return $http.post('/login', { username: username, password: password });
            },
            logOut: function() {

            }
        }
    });
module.exports = 'app.auth'; //直接暴露模块名称,方便require引入
