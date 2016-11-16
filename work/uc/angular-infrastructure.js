angular.module('Infrastructure.SDK', ['ui.bootstrap', 'toastr', 'angular-loading-bar']);
angular.module('Infrastructure.SDK').factory('HttpUtility', ['$q', function($q) {
    var factory = {
        wrapResponse: function(request) {
            var deferred = $q.defer();
            request.then(function(data) {
                deferred.resolve(data.data);
            }, function(data) {
                data.Success = false;
                data.Message = data.Status;
                deferred.reject(data);
            });
            return deferred.promise;
        },
        wrapJQueryResponse: function(request) {
            var deferred = $q.defer();
            request.then(function(data) {
                deferred.resolve(data);
            }, function(data) {
                data.Success = false;
                data.Message = data.Status;
                deferred.reject(data);
            });
            return deferred.promise;
        }
    };
    return factory;
}]);
angular.module('Infrastructure.SDK').directive("datepicker", function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            element.val(ngModel.$viewValue);

            function oncleared() {
                scope.$apply(function() {
                    ngModel.$setViewValue("");
                });
            }

            function onpicking(dp) {
                var date = dp.cal.getNewDateStr();
                scope.$apply(function() {
                    ngModel.$setViewValue(date);
                });
            }
            element.bind('click', function() {
                WdatePicker({
                    onpicking: onpicking,
                    onclearing: oncleared,
                    dateFmt: (attr.datefmt || 'yyyy-MM-dd')
                })
            });
            ngModel.$formatters.push(function(value) {
                if (value == '0001-01-01 00:00:00') return '';
                if (value && value.length > 10) return value.split(' ')[0];
                return value;
            });
            ngModel.$parsers.push(function(value) {
                if (value) {
                    if (value.length > 8) {
                        var date = value.split(' ')[0].split('-');
                        if (date.length >= 3) {
                            var sss = new Date(date[0], date[1] - 1, date[2]);
                            if (date[0] == sss.getFullYear() && date[1] == sss.getMonth() + 1 && date[2] == sss.getDate()) return date[0] + '-' + date[1] + '-' + date[2];
                        }
                    }
                    return ngModel.$modelValue;
                }
                return value;
            });
        }
    };
});
angular.module('Infrastructure.SDK').directive('ntszae', function() {
    return {
        priority: 1,
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            function toModel(value) {
                return Number(value);
            }

            function toView(value) {
                if (value == null || value == 0) return null;
                return value.toString();
            }
            ngModel.$formatters.push(toView);
            ngModel.$parsers.push(toModel);
        }
    };
});
angular.module('Infrastructure.SDK').directive('std', function() {
    return {
        priority: 1,
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            function toModel(value) {
                if (value == null) return value;
                return value.getFullYear() + '-' + value.getMonth() + 1 + '-' + value.getDate();
            }

            function toView(value) {
                if (value == null || angular.isDate(value)) return value;
                var temp = value.split(' ')[0].split('-');
                return new Date(temp[0], temp[1] - 1, temp[2]);
            }
            ngModel.$formatters.push(toView);
            ngModel.$parsers.push(toModel);
        }
    };
});
angular.module('Infrastructure.SDK').directive('checkboxlist', function() {
    return {
        priority: 1,
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            function toModel(value) {
                var key = attr.value;
                if (ngModel.$modelValue == null) return [key];
                var index = ngModel.$modelValue.indexOf(key);
                if (index > -1) {
                    ngModel.$modelValue.splice(index, 1);
                    return ngModel.$modelValue;
                } else {
                    ngModel.$modelValue.push(key);
                    return ngModel.$modelValue;
                }
            }

            function toView(value) {
                if (value != null && value.length) {
                    return value.indexOf(attr.value) > -1;
                }
                return false;
            }
            ngModel.$formatters.push(toView);
            ngModel.$parsers.push(toModel);
        }
    };
});
angular.module('Infrastructure.SDK').directive('ucFileUpload', function() {
    return {
        restrict: 'A',
        scope: {
            done: '&'
        },
        link: function(scope, element, attrs) {
            var mm = {
                upload: $.fn.fileupload,
                container: $(element),
                url: ucConfig.ServerReferenceFileCenterAPI + '/fileupload/ImgSingleUpload/' + ucConfig.ServerApplicationName,
                onlyImg: element.attr('onlyImg1') != undefined,
                callback: function(data) {
                    scope.$apply(function() {
                        scope.done({
                            data: data
                        });
                    })
                }
            };
            UI.fileUpload(mm);
        }
    };
});
angular.module("Infrastructure.SDK").directive("richbox", [function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attr, ngModel) {
            var _rb, _updated;
            _updated = false;
            _rb = (function() {
                function _rb() {
                    this.bindRender();
                    this.initEditor();
                    return;
                }
                _rb.prototype.initEditor = function() {
                    var _self = this;
                    var _editorId = attr.id;
                    this.editor = UM.getEditor(_editorId);
                    return this.editor.ready(function() {
                        _self.editorReady = true;
                        _self.editor.addListener("contentChange", function() {
                            if (!_updated) {
                                if (!scope.$$phase) {
                                    scope.$apply(function() {
                                        ngModel.$setViewValue(_self.editor.getContent());
                                    });
                                }
                            }
                            _updated = false;
                        });
                        if (_self.modelContent && _self.modelContent.length > 0) {
                            _self.setEditorContent();
                        }
                        scope.$on("$destroy", function() {
                            if (!attr.id && UM.delEditor) {
                                UM.delEditor(_editorId);
                            }
                        });
                    });
                };
                _rb.prototype.setEditorContent = function(content) {
                    if (content == null) {
                        content = this.modelContent;
                    }
                    if (this.editor && this.editorReady) {
                        this.editor.setContent(content);
                    }
                };
                _rb.prototype.bindRender = function() {
                    var _self = this;
                    ngModel.$render = function() {
                        _self.modelContent = (ngModel.$isEmpty(ngModel.$viewValue) ? "" : ngModel.$viewValue);
                        _updated = true;
                        _self.setEditorContent();
                    };
                };
                return _rb;
            })();
            new _rb();
        }
    };
}]);
