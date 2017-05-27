/*
 * @Author: Allen
 * @Date:   2016-11-14 14:17:13
 * @Last Modified by:   Allen
 * @Last Modified time: 2017-05-16 16:33:10
 */

app.factory('getData', ['$http', '$q', function($http, $q) {
    return function(cig) {
        var def = $q.defer();
        if (cig.method.toLowerCase() == "get") {
            cig.method = "jsonp";
            cig.url = cig.url + '?callback=JSON_CALLBACK';
        }

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

// 类型
app.factory('Confirm', function($uibModal, $q) {
    return function(config) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: ucConfig.ServerReferenceJavaScript + "/Scripts/js/tpl/Confirm.html",
            controller: ['$scope', '$q', '$uibModalInstance', function($scope, $q, $uibModalInstance) {
                $scope.msg = config.msg || '';
                $scope.url = config.url || '';
                $scope.showMsg = function() {
                    return config.msg != "";
                };
                $scope.showPic = function() {
                    return config.url != "";
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

function formatTime(isoTime) {
    return moment(isoTime).format('YYYY-MM-DD hh:mm:ss')
}

function formatDate(isoTime) {
    return moment(isoTime).format('YYYY-MM-DD')
}

app.factory('delayToastr', ['$q', '$timeout', 'toastr', function($q, $timeout, toastr) {
    return function(cig) {
        var def = $q.defer();
        if (cig.result) {
            toastr.success(cig.msg)
            $timeout(function() {
                def.resolve()
            }, cig.interval);
        } else {
            def.reject();
            toastr.error(cig.msg);
        }
        return def.promise;
    }
}]);
