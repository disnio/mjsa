require('./main.css');
//这里可以不用再引用app.token模块，因为已经在全局引入了
module.exports = angular.module('app.main', [])
    .controller('MainController', function($scope, $http, $state, AuthenticationService, localStorageService) {
        $("span.pie").peity("pie", { fill: ["#1ab394", "#d7d7d7", "#ffffff"] });
        $http({ method: 'GET', url: 'https://cnodejs.org/api/v1/topics' }).
        success(function(data, status, headers, config) {
            console.log(data);
        }).
        error(function(data, status, headers, config) {

        });
        //退出
        $scope.logout = function() {
            //清空登录信息
            AuthenticationService.isLogged = false;
            localStorageService.set('token', null);
            $state.go('login');
        }
    });
