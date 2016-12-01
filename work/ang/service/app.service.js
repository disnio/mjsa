/* 
 * @Author: Allen
 * @Date:   2016-11-14 14:17:13
 * @Last Modified by:   czy
 * @Last Modified time: 2016-11-25 11:12:02
 */
app.factory('getData', ['$http', '$q', function($http, $q) {
    return function(cig) {
        var def = $q.defer();
        $http(cig).success(function(data) {
            def.resolve(data);
        }).error(function err(data) {
            data.Success = false;
            data.Message = data.Status;
            def.reject(data);
        });

        return def.promise;
    }
}]);
app.factory('getProvince', function() {
    var getProvinceOpt = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceSystemAdminAPI,
        "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
        "data": {
            parentId: 156000000000000
        },
        "dataType": "jsonp"
    };
    return UT.jaxJson(getProvinceOpt, true);
});

app.factory('getCity', function() {
    return function(pid) {
        var getCityOpt = {
            "type": "get",
            "webUrl": ucConfig.ServerReferenceSystemAdminAPI,
            "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
            "dataType": "jsonp",
            "data": {
                parentId: pid
            }
        };
        return UT.jaxJson(getCityOpt, true);
    }

});

app.factory('getAre', function() {
    return function(cid) {
        var getAreaOpt = {
            "type": "get",
            "webUrl": ucConfig.ServerReferenceSystemAdminAPI,
            "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
            "dataType": "jsonp",
            "data": {
                parentId: cid,
            }
        };
        return UT.jaxJson(getAreaOpt, true)
    }
});

app.factory('getRea', function() {
    return function(aid) {
        var sarea = {
            ProvinceID: 0,
            CityID: 0,
            AreaID: 0,
            Regions: []
        };

        sarea.Regions = /156(\d{2})(\d{2})(\d{2})000000/.exec(aid);
        _.each(sarea.Regions, function(id, i) {
            switch (i) {
                case 1:
                    sarea.ProvinceID = '156' + sarea.Regions[1] + '0000000000';
                    break;
                case 2:
                    sarea.CityID = '156' + sarea.Regions[1] + sarea.Regions[2] + '00000000';
                    break;
                case 3:
                    sarea.AreaID = '156' + sarea.Regions[1] + sarea.Regions[2] + sarea.Regions[3] + '000000';
                    break;
            }
        });

        return sarea;
    }
});

// 申报年限
app.factory('getYearList', function() {

    var opt = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceChinaIEF,
        "name": '/EFData/GetYearList',
        "dataType": "json"
    };
    return UT.jaxJson(opt, true)

});
// 所属领域
app.factory('getProjectIndustryList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetProjectIndustryList'
    };
    return getData(opt)
});
// 类型
app.factory('GetCompanyTypeList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetCompanyTypeList'
    };

    return getData(opt)
});

// 属性
app.factory('GetCompanyPropertyList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetCompanyPropertyList'
    };

    return getData(opt)
});
// 成熟度
app.factory('GetProjectStageList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetProjectStageList'
    };

    return getData(opt)
});
// 水平
app.factory('GetProjectLevelList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetProjectLevelList'
    };

    return getData(opt)
});
// 合作方式
app.factory('GetProjectCooperationList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetProjectCooperationList'
    };

    return getData(opt)
});
// 展示方式
app.factory('GetDisplayFormList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetDisplayFormList'
    };
    return getData(opt)
});
// 初审状态
app.factory('GetFirstAuditStatusList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetFirstAuditStatusList'
    };
    return getData(opt)
});

// 会议评审状态
app.factory('GetMeetingEvaluationStatusList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetMeetingEvaluationStatusList'
    };
    return getData(opt)
});

// 网络评审状态
app.factory('GetExpertEvaluationStatusList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetExpertEvaluationStatusList'
    };
    return getData(opt)
});
// 评审等级
app.factory('GetGradeList', function(getData) {
    var opt = {
        method: 'get',
        url: ucConfig.ServerReferenceChinaIEF + '/EFData/GetGradeList'
    };
    return getData(opt)
});

app.factory('Confirm', function($uibModal, $q) {
    return function(config) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: ucConfig.ServerReferenceJavaScript + "/Scripts/js/tpl/Confirm.html",
            controller: ['$scope', '$q', '$uibModalInstance', function($scope, $q, $uibModalInstance) {
                $scope.msg = config.msg || '';
                $scope.url = config.url || '';
                $scope.showMsg = function(){
                    return config.msg!="";
                };
                $scope.showPic = function(){
                    return config.url!="";
                };
                $scope.ok = function() {
                    $uibModalInstance.close(true);
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss(false);
                };
            }],
            // windowClass: "cg"
        });

        return modalInstance.result
    }
});
