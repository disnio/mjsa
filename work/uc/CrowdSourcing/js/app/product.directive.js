    angular.module('yoB').directive('catemust', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                scope.$watch(scope.CategoryI, function(n) {
                    ctrl.$setViewValue(n);
                });
                ctrl.$parsers.unshift(function(viewValue) {
                    // console.log(viewValue)
                    if (_.isNumber(parseInt(viewValue, 10)) && viewValue != 0) {
                        ctrl.$setValidity('catemust', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('catemust', false);
                        return undefined;
                    }
                });
            }
        };
    });
    angular.module('yoB').directive('gtZero', function() {
        // $scope.numPattern = /^((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if (viewValue > 0) {
                        ctrl.$setValidity('gtzero', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('gtzero', false);
                        return undefined;
                    }
                });
            }
        };
    });
    // 更新总数量，根据规格项数量的变化
    angular.module('yoB').directive('calNum', function($parse) {
        return {
            require: ['ngModel'],
            link: function(scope, element, attrs, c) {
                scope.$watch(attrs.ngModel, function(newNum) {
                    if (!newNum) return;
                    var res = 0;
                    $(".skuNum").each(function(i, v) {
                        res += parseFloat($(v).val(), 10)
                    });

                    scope.produs.Num = res;
                });
            }
        }
    });
    angular.module('yoB').directive('integer', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                ctrl.$parsers.unshift(function(viewValue) {
                    if (/^\d+$/.test(viewValue) && viewValue > 0) {
                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('integer', false);
                        return undefined;
                    }
                });
            }
        };
    });
    angular.module('yoB').directive('outLink', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var urlReg = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

                ctrl.$parsers.unshift(function(viewValue) {
                    if (urlReg.test(viewValue)) {
                        ctrl.$setValidity('outlink', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('outlink', false);
                        return undefined;
                    }
                });
            }
        };
    });

    // yob.directive('ueditor', function() {
    //     return {
    //         restrict: 'A',
    //         require: 'ngModel',
    //         link: function(scope, element, attrs, ctrl) {
    //             var id = 'ueditor_' + Date.now();
    //             element[0].id = id;
    //             var ue = UM.getEditor(id, {
    //                 initialFrameWidth: '100%',
    //                 initialFrameHeight: '200',
    //                 autoHeightEnabled: true
    //             });
    //             // ue.setContent(ctrl.$viewValue);
    //             console.log()
    //             ue.ready(function() {
    //                 ue.addListener('contentChange', function() {
    //                     ctrl.$setViewValue(ue.getContent());
    //                     if (!scope.$$phase) {
    //                         scope.$apply();
    //                     }
    //                     // 需要测试序列化内容
    //                     var len = 10000 - ue.getPlainTxt().length;

    //                     if (len >= 0) {
    //                         ctrl.$setValidity('ueditor', true);
    //                         $("#rletter").text("还可输入：" + len + " 个字符。");

    //                     } else {
    //                         ctrl.$setValidity('ueditor', false);

    //                     }
    //                 });
    //             });
    //         }
    //     };
    // });
 
    angular.module('yoB').directive('wdateTime', function($parse){
        return {
            require: 'ngModel',
            // controllerAs:'vm',
            // scope 绑定到 vm
            // bindToController: true, 
            // template:'',
            // controller:'',
            // restrict:'EA',
            // scope:{},
            link: function(scope, elem, attrs, ctrl){
                var model = $parse(attrs.ngModel);
                $(elem).on('click', function(e){
                    WdatePicker({
                        onpicked:function() { 
                            scope.$apply(function(){                                
                                model.assign(scope, $dp.cal.getDateStr('yyyy-MM-dd'))
                            })
                        }
                    });                    
                });

            }
        }
    });
    // 字段7验证信息
    angular.module('yoB').directive('errField', function($compile){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                var subScope = scope.$new(true);
                subScope.hasError = function(){
                    return  ngModel.$dirty && ngModel.$invalid ;
                };
                subScope.errors = function(){
                    return ngModel.$error;
                };
                subScope.attrs = attrs;
                var tpl = '<span class="merror" ng-if="hasError()">' +
                            '<span ng-repeat="(name, wrong) in errors()" ng-if="wrong">'+
                            '{{name | error:attrs}}'+
                            '</span></span>';
                var hint = $compile(tpl)(subScope);
                
                elem.after(hint);

            }
        }
    });