app.directive('catemust', function() {
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
// 大于 0
app.directive('gtZero', function() {
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

// integer
app.directive('integer', function() {
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
app.directive('outLink', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            var urlReg = /^(https?):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

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
// ueeditor
yob.directive('ueditor', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var id = 'ueditor_' + Date.now();
            element[0].id = id;
            var ue = UM.getEditor(id, {
                initialFrameWidth: '100%',
                initialFrameHeight: '200',
                autoHeightEnabled: true
            });
            // ue.setContent(ctrl.$viewValue);
            console.log()
            ue.ready(function() {
                ue.addListener('contentChange', function() {
                    ctrl.$setViewValue(ue.getContent());
                    if (!scope.$$phase) {
                        scope.$apply();
                    }
                    // 需要测试序列化内容
                    var len = 10000 - ue.getPlainTxt().length;

                    if (len >= 0) {
                        ctrl.$setValidity('ueditor', true);
                        $("#rletter").text("还可输入：" + len + " 个字符。");

                    } else {
                        ctrl.$setValidity('ueditor', false);

                    }
                });
            });
        }
    };
});
// time
app.directive('wdateTime', function($parse) {
    return {
        require: 'ngModel',
        // controllerAs:'vm',
        // scope 绑定到 vm
        // bindToController: true, 
        // template:'',
        // controller:'',
        // restrict:'EA',
        // scope:{},
        link: function(scope, elem, attrs, ctrl) {
            var model = $parse(attrs.ngModel);
            $(elem).on('click', function(e) {
                WdatePicker({
                    onpicked: function() {
                        scope.$apply(function() {
                            model.assign(scope, $dp.cal.getDateStr('yyyy-MM-dd'))
                        })
                    }
                });
            });

        }
    }
});
// 字段7验证信息
app.directive('errField', function($compile) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            var subScope = scope.$new(true);
            subScope.hasError = function() {
                return ngModel.$dirty && ngModel.$invalid;
            };
            subScope.errors = function() {
                return ngModel.$error;
            };
            subScope.attrs = attrs;
            var tpl = '<span class="merror" ng-if="hasError()">' +
                '<span ng-repeat="(name, wrong) in errors()" ng-if="wrong">' +
                '{{name | error:attrs}}' +
                '</span></span>';
            var hint = $compile(tpl)(subScope);

            elem.after(hint);

        }
    }
});

// word-size
app.directive('wordSize', function() {
    return {
        priority: 100,
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            var ws = parseInt(attr["wordSize"], 10);
            var leaveWords = ws;
            scope.$watch(attr.ngModel, function(nm) {
                if (!nm) return;
                // leaveWords = ws - nm.length;

                if (nm.length <= ws) {
                    leaveWords = ws - nm.length;
                    element.next("p").text("剩余字数：" + leaveWords);
                } else {
                    element.val(element.val().substr(0, ws))
                    ngModel.$setViewValue(element.val());
                }
            });

            ngModel.$parsers.unshift(function(v) {
                console.log("v: ", v)
                if (v.length > 0) {
                    return v;
                } else {
                    return "";
                }

            })

            ngModel.$formatters.push(function(value) {
                if (value == null) return "";
                return value.toString();
            });
        }
    };
});

// err-field
app.directive('errField', ['$compile', function($compile) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            var errObj = {};
            var subScope = scope.$new(true);
            subScope.hasError = function() {
                return ngModel.$dirty && ngModel.$invalid;
            };
            subScope.errors = function() {
                var err = ngModel.$error;

                _.each(err, function(v, i) {

                    switch (i.toString()) {
                        case "required":
                            errObj.required = attrs['errRequired'];
                            break;
                    }
                });
                return errObj;
            };
            subScope.attrs = attrs;
            var title = $(elem).closest("form-group").find("label").text();
            var tpl = '<div role="tooltip" class="tooltip bottom tooltip-error"  ng-if="hasError()"> <div class="tooltip-arrow"></div> <div class="tooltip-inner"> <p class="tip" ng-repeat="(name, wrong) in errors()" ng-if="wrong">{{wrong}}</p></div></div>';
            var hint = $compile(tpl)(subScope);
            elem.after(hint);
        }
    }
}]);
// radiio-list
app.directive('radioList', function() {
    return {
        priority: 1,
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            scope.$watch(attrs.ngModel, function(value) {
                if (!value) return;
                console.log("v: ", value)
                if (value == null && value == 0) {
                    ngModel.$setValidity('radioList', false);
                    return undefined;
                } else {
                    ngModel.$setValidity('radioList', true);
                    return value;
                }
            });

            // console.log("n:", ngModel.$modelValue)
            if (_.isNaN(ngModel.$modelValue)) {
                ngModel.$setValidity('radioList', false);
                return undefined;
            }
        }
    };
});

// 验证邮箱和手机
yob.directive('emailPhone', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;
                var regxPhone = /^1[35876][0-9]{9}$/;
                var regxEmail = /\w@\w*\.\w/;
                if (regxPhone.test(newVal)) {
                    scope.$parent.sms = true;
                }

                if (regxEmail.test(newVal)) {
                    scope.$parent.sms = false;
                }

                var result = regxPhone.test(newVal) || regxEmail.test(newVal);
                if (result) {
                    ctrl.$setValidity('emailPhone', true);
                    return newVal;
                } else {
                    ctrl.$setValidity('emailPhone', false);
                    return undefined;
                }
            });
        }
    };
});
// 邮箱
yob.directive('email', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;
                var regxEmail = /\w@\w*\.\w/;


                var result = regxEmail.test(newVal);
                if (result) {
                    ctrl.$setValidity('email', true);
                    return newVal;
                } else {
                    ctrl.$setValidity('email', false);
                    return undefined;
                }
            });
        }
    };
});
// 手机
yob.directive('phone', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;
                var regxPhone = /^1[35876][0-9]{9}$/;

                var result = regxPhone.test(newVal);
                if (result) {
                    ctrl.$setValidity('phone', true);
                    return newVal;
                } else {
                    ctrl.$setValidity('phone', false);
                    return undefined;
                }
            });
        }
    };
});
// 电话
yob.directive('tel', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;
                var regxPhone = /^(\d{2,4}-?)?\d{7,8}$/;

                var result = regxPhone.test(newVal);
                if (result) {
                    ctrl.$setValidity('tel', true);
                    return newVal;
                } else {
                    ctrl.$setValidity('tel', false);
                    return undefined;
                }
            });
        }
    };
});

// 验证注册的用户名唯一1
yob.directive('uniqueUsername', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {

            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;

                var form = attrs.form;
                $.ajax({
                    "url": usernameUrl,
                    "method": "get",
                    "data": {
                        "userName": newVal
                    }
                }).then(function(data) {
                    if (data.Success) {
                        scope.$apply(function() {
                            ctrl.$setValidity('uniqueUsername', true);
                            scope[form].UserName.$error.uniqueUsername = false;
                        })

                    } else {
                        scope.$apply(function() {
                            ctrl.$setValidity('uniqueUsername', false);
                            scope[form].UserName.$error.uniqueUsername = true;
                        })
                    }
                });
            });
        }
    };
});
// 验证注册的用户名唯一2
yob.directive('uniqueUsername', ['$q', '$parse', '$http', function($q, $parse, $http) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {

            ctrl.$asyncValidators["uniqueUsername"] = function(newVal) {

                var form = attrs.form;
                return $http({
                    url: usernameUrl,
                    method: 'get',
                    params: {
                        "userName": newVal
                    }
                }).then(function(data) {

                    if (data.data.Success) {
                        // ctrl.$setValidity('uniqueUsername', true);
                        // scope[form].UserName.$error.uniqueUsername = false;
                        console.log('true')
                        return true;
                    } else {
                        console.log("exists")
                        return $q.reject('exists');
                        // ctrl.$setValidity('uniqueUsername', false);
                        // scope[form].UserName.$error.uniqueUsername = true;

                    }
                });
            };
        }
    };
}]);
// 验证两次输入密码相等
yob.directive('equalPassword', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;
                var eq = scope[attrs.form][attrs.equalPassword].$viewValue;
                if (newVal === eq) {
                    ctrl.$setValidity('equalPassword', true);
                    scope[attrs.form][attrs.equalPassword].$setValidity('equalPassword', true);
                    return newVal;
                } else {
                    ctrl.$setValidity('equalPassword', false);
                    return undefined;
                }
            });
        }
    };
});
// 图形验证码
yob.directive('vVcode', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;

                $.ajax({
                    url: vImageCodeUrl,
                    method: "post",
                    data: {
                        "imageCode": newVal
                    },
                    success: function(data) {
                        scope.$apply(function() {
                            if (data == true) {
                                ctrl.$setValidity('vVcode', true);
                                scope.$parent.vcodeF = true;
                                return newVal;
                            } else {
                                ctrl.$setValidity('vVcode', false);
                                scope.$parent.vcodeF = false;
                                return undefined;
                            }
                        });

                    }
                });
            });
        }
    };
});
// 短信验证码
yob.directive('vDcode', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {

                if (!newVal) return;
                $.ajax({
                    "url": vDCodeUrl,
                    "method": "post",
                    "data": {
                        "vCode": newVal
                    }
                }).then(function(data) {
                    scope.$apply(function() {
                        if (data == true) {
                            ctrl.$setValidity('vDcode', true);
                            return newVal;
                        } else {
                            ctrl.$setValidity('vDcode', false);
                            return undefined;
                        }
                    });
                });


            });
        }
    };
});
// 验证手机号
yob.directive('vPhone', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;
                var regxPhone = /^1[3578][0-9]{9}$/;

                var result = regxPhone.test(newVal);
                if (result) {
                    ctrl.$setValidity('vPhone', true);
                    return newVal;
                } else {
                    ctrl.$setValidity('vPhone', false);
                    return undefined;
                }
            });
        }
    };
});
// 验证身份证
yob.directive('vCard', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;
                var regxCard = /^[1-9]\d{5}[1-9]\d{3}(((0[13578]|1[02])(0[1-9]|[12]\d|3[0-1]))|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))(\d{4}|\d{3}[xX])$/;

                var result = regxCard.test(newVal);
                if (result) {
                    ctrl.$setValidity('vCard', true);
                    return newVal;
                } else {
                    ctrl.$setValidity('vCard', false);
                    return undefined;
                }
            });
        }
    };
});

app.factory('HttpUtility', ['$q', function($q) {
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
// datepicker
app.directive("datepicker", function() {
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
                // return value;
            });
        }
    };
});
// ntszae 数串转换
app.directive('ntszae', function() {
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
// std 日期
app.directive('std', function() {
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
// checkboxlist
app.directive('checkboxlist', function() {
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
// ucFileUpload
app.directive('ucFileUpload', function() {
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
// richbox
app.directive("richbox", [function() {
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
app.directive('richSize', function() {
    return {
        priority: 0,
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            var ws = parseInt(attr["richSize"], 10);
            var leaveWords = ws;
            element.after('<p id="lwd"></p>');
            var _editorId = attr.id;
            var editor = UM.getEditor(_editorId);

            scope.$watch(function() {
                return ngModel.$modelValue;
            }, function(n) {
                var nm = editor.getContentTxt();
                if (nm.length <= ws) {
                    leaveWords = ws - nm.length;
                    console.log(nm, leaveWords)
                    $("#lwd").text("剩余字数：" + leaveWords);

                    ngModel.$setValidity('richSize', true);

                } else {
                    ngModel.$setValidity('richSize', false);
                    return undefined;
                }
            });

        }
    }
});