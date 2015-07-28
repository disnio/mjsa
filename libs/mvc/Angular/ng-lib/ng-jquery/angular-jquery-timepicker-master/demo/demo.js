var app = angular.module('testApp', ['ui.timepicker']);

app.controller('TimepickerCtrl', function ($scope) {
    $scope.date = new Date();

    $scope.increaseDate = function(date) {
        date.setDate(date.getDate() + 1);
    };

    $scope.increaseHour = function(date) {
        date.setHours(date.getHours() + 1);
    };
});
