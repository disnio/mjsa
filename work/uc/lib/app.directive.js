/*
 * @Author: Allen
 * @Date:   2016-11-18 14:31:13
 * @Last Modified by:   Allen
 * @Last Modified time: 2017-05-17 09:57:47
 */


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

// word-size
app.directive('wordSize', function() {
    return {
        priority: 100,
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            var ws = parseInt(attr["wordSize"], 10);
            var leaveWords = ws;
            element.after('<p class="lwd"></p>');
            scope.$watch(attr.ngModel, function(nm) {
                if (!nm) return;
                var nlen = nm.length;
                if (nlen <= ws) {
                    leaveWords = ws - nlen;
                    if (attr["wordShow"] == "1" && nlen != 1) {
                        element.next("p.lwd").text("剩余字数：" + leaveWords).show();
                    }else{
                        element.next("p.lwd").hide();
                    }
                } else {
                    element.val(element.val().substr(0, ws))
                    ngModel.$setViewValue(element.val());
                }
            });

            ngModel.$parsers.unshift(function(v) {
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


// radiio-list
app.directive('radioList', function() {
    return {
        priority: 1,
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            scope.$watch(attrs.ngModel, function(value) {
                if (!value) return;
                if (value == null && value == 0) {
                    ngModel.$setValidity('radioList', false);
                    return undefined;
                } else {
                    ngModel.$setValidity('radioList', true);
                    return value;
                }
            });

            if (_.isNaN(ngModel.$modelValue)) {
                ngModel.$setValidity('radioList', false);
                return undefined;
            }
        }
    };
});


// 邮箱
app.directive('email', function($parse) {
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
app.directive('phone', function($parse) {
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
app.directive('tel', function($parse) {
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

// 邮编
app.directive('zip', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;
                var zip = /^[1-9][0-9]{5}$/;

                var result = zip.test(newVal);
                if (result) {
                    ctrl.$setValidity('zip', true);
                    return newVal;
                } else {
                    ctrl.$setValidity('zip', false);
                    return undefined;
                }
            });
        }
    };
});
// 验证身份证
app.directive('vCard', function($parse) {
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
                if(!n) return;
                var nm = editor.getContentTxt();
                var nlen = nm.length;
                if ( nlen<= ws) {
                    if(nlen > 0){
                        $("#lwd").show();
                    }
                    leaveWords = ws - nlen;
                    $("#lwd").text("剩余字数：" + leaveWords);

                    if(nlen == 0){
                        $("#lwd").hide();
                    }

                    ngModel.$setValidity('richSize', true);

                } else {
                    $("#lwd").text("剩余字数：0");
                    ngModel.$setValidity('richSize', false);
                    return undefined;
                }
            });

        }
    }
});

app.directive("datepicker", function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            minDate: "@?",
            time: "@?",
        },
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
                var minObj = {};
                var maxObj = {};

                if (!_.isUndefined(scope['minDate'])) {
                    minObj = {
                        minDate: scope['minDate']
                    }
                } else {
                    minObj = {
                        minDate: '2000-01-01T00:00:00.000Z'
                    }
                }

                if (!_.isUndefined(scope['maxDate'])) {
                    maxObj = {
                        maxDate: scope['maxDate']
                    }
                } else {
                    maxObj = {
                        maxDate: '2030-01-01T00:00:00.000Z'
                    }
                }

                var opt = _.assign({
                    onpicking: onpicking,
                    onclearing: oncleared,
                    dateFmt: (attr.datefmt || 'yyyy-MM-dd HH:mm:ss')
                }, minObj, maxObj);

                WdatePicker(opt);
            });

            ngModel.$formatters.push(function(value) {
                if (value) {
                    if (value.length > 10 && scope.time == undefined){
                        value = value.substring(0, 10);
                    }

                    if (value == '0001-01-01'){
                        return ''
                    }

                    if(scope.time == "true"){
                        value = value.substring(0, 19)
                    }
                    return value;
                }
                return value;
            });

            ngModel.$parsers.push(function(value) {
                var date, dateTime, sss;
                if (value) {
                    if (value.length > 8 && scope.time == undefined) {
                        date = value.split('T')[0].split(' ')[0].split('-');
                        if (date.length >= 3) {
                            sss = new Date(date[0], date[1] - 1, date[2]);
                            if (date[0] == sss.getFullYear() && date[1] == sss.getMonth() + 1 && date[2] == sss.getDate()) return date[0] + '-' + date[1] + '-' + date[2];
                        }
                    }

                    if (value.length > 8 && scope.time == "true") {
                        dateTime = value.split(' ');
                        date = dateTime[0].split('-');
                        if (date.length >= 3) {
                            sss = new Date(date[0], date[1] - 1, date[2]);
                            if (date[0] == sss.getFullYear() && date[1] == sss.getMonth() + 1 && date[2] == sss.getDate()) {
                                return date[0] + '-' + date[1] + '-' + date[2] + " " + dateTime[1];
                            }
                        }
                    }
                    return ngModel.$modelValue;
                }
                return value;
            });
        }
    };
});

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
                maxFileSize: 5000000,
                url: ucConfig.ServerReferenceFileCenterAPI + '/fileupload/ImgSingleUpload/' + ucConfig.ServerApplicationName,
                onlyImg: element.attr('onlyImg') != undefined,
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

app.directive('ucregionlist',
    function($http) {
        return {
            priority: 1,
            restrict: 'A',
            require: 'ngModel',
            template: '<select class="form-control" ng-change="rgProvince()" ng-model="rgProvinceID" ng-options="x.ID as x.Name for x in rgProvinceList"></select><select class="form-control" ng-change="rgCity()" ng-model="rgCityID" ng-options="x.ID as x.Name for x in rgCityList"></select><select class="form-control" ng-change="rgCounty()" ng-model="rgCountyID" ng-options="x.ID as x.Name for x in rgCountyList"></select>',
            scope: {
                ngModel: '='
            },
            link: function(scope, element, attr, ngModel) {
                // 区分原始值，不要改写

                ngModel.$formatters.length = 0;
                ngModel.$formatters.push(function toView(value) {
                    scope.flag = value != 1;
                    if (value) {
                        scope.rgProvinceID = (value.toString().substring(0, 5) + "0000000000") - 0;
                        scope.rgCityID = (value.toString().substring(0, 7) + "00000000") - 0;
                        scope.rgCountyID = value - 0;
                        scope.rgProvince(scope.flag);
                    }
                    return value;
                });

                var shen = {
                    ID: 10000000000,
                    Name: "省"
                };
                var shi = {
                    ID: 100000000,
                    Name: "市"
                };
                var qu = {
                    ID: 1,
                    Name: "区县"
                };

                $http.jsonp(ucConfig.ServerReferenceSystemAdminAPI + '/AdministrativeRegion/GetAdministrativeRegionByParentId?callback=JSON_CALLBACK&parentId=156000000000000')
                    .then(function(data) {
                        scope.rgProvinceList = [].concat(shen, data.data);
                        if (scope.flag) {
                            scope.rgProvince();
                        } else {
                            scope.rgCityList = [shi];
                            scope.rgCountyList = [qu];
                        }

                    });

                scope.rgProvince = function() {
                    $http.jsonp(ucConfig.ServerReferenceSystemAdminAPI + '/AdministrativeRegion/GetAdministrativeRegionByParentId?callback=JSON_CALLBACK&parentId=' + scope.rgProvinceID)

                    .then(function(data) {

                        scope.rgCityList = [].concat(shi, data.data);
                        if (data.data.length) {
                            if (scope.rgProvinceID != shen.ID) {
                                if (!scope.flag) {
                                    scope.rgCityID = scope.rgCityList[0].ID;
                                    ngModel.$setViewValue(scope.rgProvinceID);
                                }
                            }
                            if (scope.rgCityID != shi.ID) {
                                scope.rgCity();
                            }
                        } else {
                            if (scope.rgProvinceID != shen.ID) {
                                ngModel.$setViewValue(scope.rgProvinceID);
                            } else {
                                scope.rgCityID = scope.rgCityList[0].ID;
                            }
                        }
                    })
                };

                scope.rgCity = function() {
                    $http.jsonp(ucConfig.ServerReferenceSystemAdminAPI + '/AdministrativeRegion/GetAdministrativeRegionByParentId?callback=JSON_CALLBACK&parentId=' + scope.rgCityID)
                        .then(function(data) {

                            scope.rgCountyList = [].concat(qu, data.data);
                            if (data.data.length) {
                                if (scope.rgCityID != shi.ID) {
                                    if (!scope.flag) {
                                        scope.rgCountyID = scope.rgCountyList[0].ID;
                                        ngModel.$setViewValue(scope.rgCityID);
                                    }
                                }
                                if (scope.rgCountyID != qu.ID) {
                                    scope.rgCounty();
                                }
                            } else {
                                if (scope.rgCityID != shi.ID) {
                                    ngModel.$setViewValue(scope.rgCityID);
                                } else {
                                    scope.rgCountyID = scope.rgCountyList[0].ID;
                                }
                            }
                        })
                };
                scope.rgCounty = function() {
                    if (!scope.flag) {
                        ngModel.$setViewValue(scope.rgCountyID);
                    }
                }

            }
        }
    });

app.directive("richbox", [function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attr, ngModel) {
            var _rb, _updated;
            _updated =false;

            _rb = (function() {
                function _rb() {
                    this.bindRender();
                    this.initEditor();
                    return;
                }
                _rb.prototype.initEditor = function() {
                    var _editorId = attr.id;
                    this.editor =
                        UM.getEditor(_editorId);
                    var _self = this;

                    console.log(UM, this.editor)

                    return this.editor.ready(function() {

                        _self.editorReady = true;
                        var changeUE = function() {
                            console.log("change")

                            if (!_updated) {
                                if (!scope.$$phase) {
                                    scope.$apply(function() {
                                        ngModel.$setViewValue(_self.editor.getContent());
                                    });
                                }
                            }
                            _updated = false;
                        };
                        _self.editor.addListener("contentChange", changeUE);
                        _self.editor.addListener("selectionchange", changeUE);
                        if (_self.modelContent && _self.modelContent.length > 0) {
                            _self.setEditorContent();
                        }
                        scope.$on("$destroy",
                            function() {
                                console.log("destroy run", attr)
                                if (attr.id && UM.delEditor) {
                                    console.log("destroy")
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