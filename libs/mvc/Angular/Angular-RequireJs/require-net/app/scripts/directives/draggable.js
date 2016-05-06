define(['directives/directives'], function (directives) {
    directives.directive('draggable', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            //may need the model to be passed in here so we can apply changes to its left/top positions
            link: function (scope, element, attrs) {

                element.draggable(
                  {
                      stop: function (event, ui) {
                          scope.$apply(function() {
                              scope.updatePosition(
                                  scope.imageitem.name,
                                  {
                                      left: ui.position.left,
                                      top: ui.position.top
                                  }
                              );
                          });
                      }
                  });
            }
        };
    }]);
});
