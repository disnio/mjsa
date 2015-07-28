// set up directive for chosen dropdowns http://harvesthq.github.io/chosen/
app.directive('chosen', function () {
    var linker = function (scope, element, attr) {
        var model = attr['ngModel'];

        /* Added this in so that you could preselect items */
        scope.$watch(model, function () {
            element.trigger("liszt:updated");
        });

        scope.$watch('employees', function () {
            element.trigger('liszt:updated');
        });

        element.chosen();
    };

    return {
        retrict: 'A',
        link: linker
    };
});

app.directive('datepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            var model = attr['ngModel'];
            $(function () {
                element.datepicker({
                    dateFormat: hotelDateFormat.toLowerCase().replace('yyyy', 'yy'), // defined on asp mvc view
                    onSelect: function (date) {
                        ctrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    };
});

//initialize a jquery ui button with an icon and no text
app.directive('uiiconbutton', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            $(function () {
                var opts = {};
                if (attr.uiiconbutton != undefined && attr.uiiconbutton != "") {
                    opts = {
                        icons: {
                            primary: attr.uiiconbutton
                        },
                        text: false
                    };
                }
                element.button(opts);
            });
        }
    };
});

// from https://github.com/lavinjj/angularjs-spinner
app.directive('loadingWidget', ['_START_REQUEST_', '_END_REQUEST_', function (_START_REQUEST_, _END_REQUEST_) {
    return {
        restrict: "A",
        link: function (scope, element) {
            element.hide();

            scope.$on(_START_REQUEST_, function () {
                element.show();
            });

            scope.$on(_END_REQUEST_, function () {
                element.hide();
            });
        }
    };
} ]);


// <notification data-ng-model="message"></notification>
app.directive('notification', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ngModel: '='
        },
        template: '<span class="notify ui-state-highlight">{{ ngModel }}</span>',
        link: function (scope, element, attr) {
            scope.$watch('ngModel', function (message) {
                if (message == undefined) {
                    element.hide();
                    return;
                }
                
                element.fadeIn();
                $timeout(function () {
                    element.fadeOut();
                    console.log("notify");
                }, 3000);
            });
        }
    };
});
