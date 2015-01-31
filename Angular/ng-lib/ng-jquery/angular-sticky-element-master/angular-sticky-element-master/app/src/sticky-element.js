'use strict';

angular.module('sticky-element')
  .directive('stickyElement', function ($window, $timeout) {
    return {
      restrict: 'AE',
      scope: {
        stickyShow: '=',
        stickyDirection: '@',
        stickyOptions: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.scrollHandler = function() {
          var st = angular.element($window).scrollTop();
          element.css('top', st);
        };

        var scrollTimeout;  // global for any pending scrollTimeout

        angular.element($window).on('scroll',function () {
            if (scrollTimeout) {
                // clear the timeout, if one is pending
                clearTimeout(scrollTimeout);
                scrollTimeout = null;
            }
            scrollTimeout = setTimeout(scope.scrollHandler, 250);
        });
        scope.$watch('stickyShow', function() {
          if (!scope.stickyShow) {
            element.waypoint('destroy');
            element.removeClass('stuck');
          }
          else {
            $timeout(function() {
              element.waypoint(function(direction) {
                  if (direction === scope.stickyDirection) {
                    element.addClass('stuck');
                  }
                  else {
                    element.removeClass('stuck');
                  }
              }, scope.stickyOptions);
              $.waypoints('refresh');
            });
          }
        });
        scope.$on('$destroy', function() {
            angular.element($window).off('scroll');
            element.waypoint('destroy');
            element.removeClass('stuck');
        });
      }
    };
  });
