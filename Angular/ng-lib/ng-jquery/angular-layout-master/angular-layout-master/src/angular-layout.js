'use strict';

angular.module('angular-layout', [])
.directive('layout', function () {

    var callback = null;

    return {

        scope: {
            layout:"="
        },
        controller: function ($scope, $element, $attrs) {

            $scope.onHeightsChanged = function (pane, args,  s, options, layoutName) {

                if (pane === "center") {
                    $scope.layout.dimensions.center = {
                        height: args.height(),
                        width: args.width()
                    };
                } else if (pane === "north") {
                    $scope.layout.dimensions.north = {
                        height: args.height(),
                        width: args.width()
                    };
                }
                else if (pane === "south") {
                    $scope.layout.dimensions.south = {
                        height: args.height(),
                        width: args.width()
                    };
                }
                else if (pane === "east") {
                    $scope.layout.dimensions.east = {
                        height: args.height(),
                        width: args.width()
                    };
                }
                else if (pane === "west") {
                    $scope.layout.dimensions.west = {
                        height: args.height(),
                        width: args.width()
                    };
                }

                if (!$scope.$$phase) {
                    $scope.$apply(function () {
                        $scope.layout.dimensions;
                    });
                }

            };

            callback = $scope.onHeightsChanged;
        },
        link: function ($scope, $element, $attrs) {

            if( ! $scope.layout.dimensions ) {

                $scope.layout.dimensions= {
                    west: { height: 0, width: 0 },
                    center: { height: 0, width: 0 },
                    south: { height: 0, width: 0 },
                    north: { height: 0, width: 0 },
                    east:{ height: 0, width: 0 }
                };
            }

            if ( ! $scope.layout.panes ) {

                $scope.layout.panes = {};
            }

            $scope.layout.panes.onresize = callback;

            $(document).ready(function () {
                $element.layout($scope.layout);
            });

        }
    };
});
