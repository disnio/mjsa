angular.module('ng-nsa', []).
directive('nsaAutoComplete', function() {
    return {
        restrict: 'EA',
        scope: {
            source: '='
        },
        link: function(scope, element, attrib) {
            scope.$watch('source', function(newVal, OldVal) {
                element.autocomplete({
                    source: newVal,
                    messages: {
                        noResults: '',
                        results: function() {}
                    }
                });
            })
        }
    }

});
