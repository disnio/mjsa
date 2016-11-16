/* 
 * @Author: Allen
 * @Date:   2016-11-04 10:09:28
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-11-15 14:10:27
 */

app.controller('incubationCtrl', ["$scope", "$q", "incubationSer", function($scope, $q, incubationSer) {
    $q.all([incubationSer]).then(function(res) {
        $scope.incubationList = res[0];
        $scope.noData = function() {
            return false;
        }
    }, function(err) {
        // UI.inTip(err);
        $scope.incubationList = [];
        $scope.noData = function() {
            return true;
        }
    });
}]);
app.factory("incubationSer", ["$http", "$q", function($http, $q) {
    var def = $q.defer();

    var incubationOpt = {
        baseUrl: ucConfig.ServerReferenceProjectCenterAPI,
        name: '/ProjectSpace/GetPrivateProjectByCreatorID',
        type: "get",
        dataType: "json",
        data: {
            CreatorID: CreatorID,
            OrganizationID: OrganizationID
        }
    };

    UT.jaxJson(incubationOpt).then(function(data) {
        if (data.Success == true) {
            def.resolve(data.Data.List);
        } else {
            if (data.Message == null) {
                data.Message = "没有数据"
            }
            def.reject(data.Message);
        }
    });

    return def.promise;
}]);
