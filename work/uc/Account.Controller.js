var yob = angular.module('yoB', ['ngRoute', 'ui.bootstrap']);
yob.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/reg1', {
            template: $('#reg1').html(),
            controller: 'Reg1Ctrl'
        })
        .when('/reg2', {
            template: $('#reg2').html(),
            controller: 'Reg2Ctrl'
        })
        .when('/reg3', {
            template: $('#reg3').html(),
            controller: 'Reg3Ctrl'
        })
        .when('/reg4', {
            template: $('#reg4').html(),
            controller: 'Reg4Ctrl'
        })
        .when('/reg5', {
            template: $('#reg5').html(),
            controller: 'Reg5Ctrl'
        });
    $locationProvider.html5Mode(false);
}]);
// 注册
yob.factory('reg', [function() {
    return function(param) {
        var sdata = _.cloneDeep(param);
        var surl = '';
        sdata = _.omit(sdata, ['ckbprotocal', 'RePassword', 'Vcode', 'Dcode', 'UserRole']);        
        if (parseInt(param.UserRole.substring(3), 10) <= 3) {

            $.ajax({
                type: "get",
                url: oriurl,
                data: sdata,
                dataType: 'jsonp'
            }).then(function(data) {
                if (data.Success == 'false') {
                    alert("账号创建失败！")
                } else {
                    alert("账号注册成功！");
                    location.href = ucConfig.ServerReferenceJavaScript + "/Home/Index";
                }

            }, function(err) {
                alert("账号创建失败！")
            });
        } else {
            if(param.UserType == 0){
                surl = ourl;               
            }else {
                surl = turl;
            }

            $.ajax({
                type: "get",
                // 实际的接口地址
                url: surl,
                data: sdata,
                dataType: 'jsonp',
                // contentType: "application/json"
            }).then(function(data) {
                // console.log(data)
                if (data.Success == 'false') {
                    alert("账号创建失败！")
                } else {
                    alert("账号注册成功！");
                    location.href = ucConfig.ServerReferenceJavaScript + "/Home/Index";
                }

            }, function(err) {
                alert("账号创建失败！")
            });
        }

    }

}]);
// 个人用户
yob.controller('Reg1Ctrl', ['$scope', 'reg', function($scope, reg) {

    $scope.geRen = {
        UserRole: $scope.$parent.radioModel,
        UserName: '',
        Password: '',
        RePassword: '',
        ckbprotocal: false
    };
    $scope.reg1Disable = function() {
        return ($scope.reg1Form.$invalid || $scope.reg1Form.$pristine) || 　!$scope.geRen.ckbprotocal;
    };

    $scope.reg1Pub = function() {
        var sdata = _.cloneDeep($scope.geRen);
        sdata.TypeName = 'Personal';        
        sdata.Phone = sdata.UserName;
        // 暂时只有手机注册
        sdata.Email = '';
        sdata.PlatformID = PlatformID;
        reg(sdata);
    };
}]);
// 客户企业
yob.controller('Reg2Ctrl', ['$scope', 'reg', function($scope, reg) {
    $scope.kh = {
        UserRole: $scope.$parent.radioModel,
        UserName: '',
        Password: '',
        RePassword: '',
        CompanyName: '',
        ContactUserName: '',
        ckbprotocal: false
    };
    $scope.reg2Disable = function() {
        return ($scope.reg2Form.$invalid || $scope.reg2Form.$pristine) || 　!$scope.kh.ckbprotocal;
    };

    $scope.reg2Pub = function() {
        var sdata = _.cloneDeep($scope.kh);
        sdata.TypeName = 'BusinessCustomer';
        sdata.Phone = sdata.UserName;
        sdata.OrganizationName = sdata.CompanyName;
        sdata.Name = sdata.ContactUserName;
        sdata.Email = '';
        sdata.PlatformID = PlatformID;
        sdata = _.omit(sdata, ['CompanyName', 'ContactUserName']);

        reg(sdata);
    };
}]);
// 众创空间运营方
yob.controller('Reg3Ctrl', ['$scope', 'reg', function($scope, reg) {
    $scope.kj = {
        UserRole: $scope.$parent.radioModel,
        UserName: '',
        Password: '',
        RePassword: '',
        CompanyName: '',
        ContactUserName: '',
        SpaceName: '',
        Address: '',
        ckbprotocal: false
    };
    $scope.reg3Disable = function() {
        return ($scope.reg3Form.$invalid || $scope.reg3Form.$pristine) || 　!$scope.kj.ckbprotocal;
    };

    $scope.reg3Pub = function() {
        var sdata = _.cloneDeep($scope.kj);
        sdata.TypeName = 'PartnersCustomer';
        sdata.Phone = sdata.UserName;
        sdata.OrganizationName = sdata.CompanyName;
        sdata.Name = sdata.ContactUserName;
        sdata.CrowdspaceOrganizationName= sdata.SpaceName;
        sdata.CrowdspaceOrganizationAddress= sdata.Address;
        sdata.Email = '';
        sdata.PlatformID = PlatformID;
        sdata = _.omit(sdata, ['CompanyName', 'ContactUserName', 'SpaceName', 'Address']);
        reg(sdata);
    };
}]);
// 投资方
yob.controller('Reg4Ctrl', ['$scope', 'reg', function($scope, reg) {

    var tzInit = {
        UserRole: $scope.$parent.radioModel,
        UserName: '',
        Password: '',
        RePassword: '',
        // CompanyName: '',
        // ContactUserName: '',
        // Assets: 0,
        // NickName: '',
        // Instruction: '',
        // City: '',
        // RealName: '',
        // IDCard: '',
        // HomeAddress: '',
        // Phone: '',
        ckbprotocal: false
    };

    $scope.tz = _.cloneDeep(tzInit);
    $scope.tz.UserType = 0;
    $scope.citys = [{
        id: 1,
        value: '北京'
    }, {
        id: 2,
        value: '广州'
    }];
    $scope.OrganizationTypes = [{
        id: 1,
        value: '企业'
    }, {
        id: 2,
        value: '事业单位'
    }, {
        id: 3,
        value: '社会团体'
    }, {
        id: 4,
        value: '民办非企业单位'
    }, {
        id: 5,
        value: '党政级国家机关'
    }];
    $scope.isOrg = function() {
        return $scope.tz.UserType == 1;
    };

    $scope.uPhone = function(){        
        return !$scope.$parent.sms && !$scope.isOrg()
    };
    $scope.$watch(function() {
        return $scope.tz.UserType;
    }, function(utype) {
        
        $scope.tz = _.cloneDeep(tzInit);
        $scope.tz.UserType = utype;
    });

    $scope.reg4Disable = function() {
        return ($scope.reg4Form.$invalid || $scope.reg4Form.$pristine) || 　!$scope.tz.ckbprotocal;
    };
    $scope.reg4Pub = function() {
        var sdata = _.cloneDeep($scope.tz);
        // console.log(sdata);
        var pdata = {};
        
        if( sdata.UserType == '0' ){
            pdata.AssetsTypeID       = sdata.Assets;
            pdata.NickName           = sdata.NickName;
            pdata.Introduction       = sdata.Instruction;
            pdata.CityID             = sdata.City;
            pdata.RealName           = sdata.RealName;
            pdata.IdentificationCard = sdata.IDCard;
            pdata.Address            = sdata.HomeAddress;
            // if($scope.$parent.sms){
            //     pdata.Phone = sdata.UserName;
            //     pdata.Email ='';
            // }else{
            //     pdata.Phone = sdata.Phone;
            //     pdata.Email = sdata.UserName;            
            // }
            pdata.Phone = sdata.UserName;
            pdata.Email ='';
            pdata.IncubatorID = 2;
        }

        if( sdata.UserType == '1' ){

            pdata.OrganizationTypeID = sdata.OrganizationType;
            pdata.Introduction       = sdata.OrganizationIntroduction;
            pdata.CityID             = sdata.City;
            pdata.Code               = sdata.CompanyCode;
            pdata.Address            = sdata.CompanyAddress;

            // if($scope.$parent.sms){
            //     pdata.Phone = sdata.UserName;
            //     pdata.Email ='';
            // }else{
            //     pdata.Phone = sdata.Phone;
            //     pdata.Email = sdata.UserName;            
            // }
            // 13090619500312021x

            pdata.OrganizationName   = sdata.OrganizationName;
            pdata.ContactName        = sdata.ContactUserName;

            // 缺公司名称
            // pdata.OrganizationName        = sdata.CompanyName;
            pdata.Phone = sdata.CompanyPhone;
            pdata.Email ='';
            pdata.IncubatorID = 1;
        }

        pdata.UserName           = sdata.UserName;
        pdata.Password           = sdata.Password;
        
        pdata.UserTypeId = sdata.UserType;
        pdata.UserRole = sdata.UserRole;
        pdata.PlatformID = PlatformID;

        reg(pdata);

    };
}]);
// 服务商
yob.controller('Reg5Ctrl', ['$scope', 'reg', function($scope, reg) {
    $scope.fw = {
        UserRole: $scope.$parent.radioModel,
        UserType: 0,
        UserName: '',
        Password: '',
        RePassword: '',
        CompanyName: '',
        ContactUserName: '',
        ckbprotocal: false
    };


    $scope.isOrg = function() {
        return $scope.fw.UserType == 1;
    };

    $scope.reg5Disable = function() {
        return ($scope.reg5Form.$invalid || $scope.reg5Form.$pristine) || 　!$scope.fw.ckbprotocal;
    };

    $scope.reg5Pub = function() {
        var sdata = _.cloneDeep($scope.fw);
        var pdata = {};
 
        // if($scope.$parent.sms){
        //     pdata.Phone = sdata.UserName;
        //     pdata.Email ='';
        // }else{
        //     pdata.Phone = '';
        //     pdata.Email = sdata.UserName;            
        // }

        pdata.UserTypeId = sdata.UserType;
        pdata.UserName   = sdata.UserName;
        pdata.Password   = sdata.Password;
        pdata.UserRole   = sdata.UserRole;
        pdata.Phone      = sdata.UserName;
        pdata.Email      ='';
        pdata.PlatformID =PlatformID;

        if( sdata.UserType == 1 ) {            
            pdata.ContactName      = sdata.ContactUserName;
            pdata.OrganizationName = sdata.CompanyName;            
        }

        reg(pdata);
    };
}]);

yob.controller('MainCtrl', ['$scope', '$location', '$interval', function($scope, $location, $interval) {
    $scope.radioModel = $location.path().substring(1) || 'reg1';

    $scope.$on('$locationChangeSuccess', function() {
        if ($location.path().substring(1) != $scope.radioModel) {
            $scope.radioModel = $location.path().substring(1) || 'reg1';
        }
    });

    $scope.$watch(function() {
        return $scope.radioModel;
    }, function(n) {
        $location.path('/' + n);
    });

    $scope.sms = false;
    $scope.vcodeF = false;

    $scope.showSms = function() {        
        return $scope.sms;    
    };

    $scope.getVcode = function(e) {
        $(e.currentTarget).attr("src", "../Account/GetSafeValidateCode?time=" + Math.random());
        $scope.vcodeF = false;
    };

    $scope.getDcode = function(e, phone) {
        var _self = $(e.currentTarget);
        var count = 60;
        var t;
        // send code to user's phone
        $.ajax({
            "url": getDCodeUrl,
            "method": "post",
            "data": {
                "phoneNumber": phone
            }
        }).then(function(data) {
            t = $interval(function() {
                _self.val(count + "秒之后重新获取");
                _self.prop('disabled', true);
                count--;
                if (count == 0) {
                    $interval.cancel(t);
                    _self.prop('disabled', false);
                    _self.val("点击获取验证码");
                    count = 60;
                }
            }, 1000);
        }, function(err) {
            $interval.cancel(t);
            _self.prop('disabled', false);
            _self.val("点击获取验证码");
            count = 60;
        });
    }
}]);
// 验证邮箱和手机
yob.directive('emailPhone', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newVal) {
                if (!newVal) return;
                var regxPhone = /^1[3587][0-9]{9}$/;
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
// 验证注册的用户名唯一
yob.directive('uniqueUsername', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

            scope.$watch(attrs.ngModel, function (newVal) {
                if (!newVal) return;

                var form = attrs.form;
                $.ajax({
                    "url": usernameUrl,
                    "method": "get",
                    "data": {
                        "userName": newVal
                    }
                }).then(function (data) {
                    if (data.Success) {
                        scope.$apply(function () {
                            ctrl.$setValidity('uniqueUsername', true);
                            scope[form].UserName.$error.uniqueUsername = false;
                        })

                    } else {
                        scope.$apply(function () {
                            ctrl.$setValidity('uniqueUsername', false);
                            scope[form].UserName.$error.uniqueUsername = true;
                        })
                    }
                });
            });
        }
    };
});

// yob.directive('uniqueUsername', ['$q', '$parse', '$http', function($q, $parse, $http) {
//     return {
//         require: 'ngModel',
//         link: function(scope, element, attrs, ctrl) {

//             ctrl.$asyncValidators["uniqueUsername"] = function(newVal) {

//                 var form = attrs.form;
//                 return $http({
//                     url: usernameUrl,
//                     method: 'get',
//                     params: {
//                         "userName": newVal
//                     }
//                 }).then(function(data) {

//                     if (data.data.Success) {
//                         // ctrl.$setValidity('uniqueUsername', true);
//                         // scope[form].UserName.$error.uniqueUsername = false;
//                         console.log('true')
//                         return true;
//                     } else {
//                         console.log("exists")
//                         return $q.reject('exists');
//                         // ctrl.$setValidity('uniqueUsername', false);
//                         // scope[form].UserName.$error.uniqueUsername = true;

//                     }
//                 });
//             };
//         }
//     };
// }]);
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
                    "url": vDCodeUrl ,
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
