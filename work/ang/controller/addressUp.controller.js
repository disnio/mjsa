/* 
 * @Author: Allen
 * @Date:   2016-07-13 16:33:12
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-07-27 14:18:23
 */
angular.module('yoB').controller('addressCtrl', ["$scope", "$http", "$uibModalInstance", "$q", "pbFunc", "Province", "address", function($scope, $http, $uibModalInstance, $q, pbFunc, Province, address) {
    var vm = $scope.vm = {};
    vm.address = _.cloneDeep(address.data);
    $q.all([Province]).then(function(res) {

        vm.Province = res[0].data.Data;
        // vm.ProvinceID = 0;
        vm.hasProvinceID = function() {
            return vm.address.ProvinceID !== 0;
        };
        // vm.CityID = 0;
        vm.changeProvince = function(e) {
            vm.address.CityID = 0;
            pbFunc.getCity(vm.address.ProvinceID).then(function(data) {
                vm.City = data.data.Data;
            })
        };
        vm.hasCityID = function() {
            return vm.address.CityID !== 0;
        };
        // vm.AreaID = 0;
        vm.changeCity = function(e) {
            pbFunc.getArea(vm.address.CityID).then(function(data) {
                vm.Areas = data.data.Data;
            })
        };

        $q.all([pbFunc.getCity(vm.address.ProvinceID), pbFunc.getArea(vm.address.CityID)]).then(function(res) {
            vm.City = res[0].data.Data;
            vm.Areas = res[1].data.Data;
        });


        vm.ok = function() {
            var opt = {
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/address/editaddress',
            };
            $http.get(opt.webUrl + opt.name, {
                data: {
                    Id:vm.address.ID,
                    proviceID:vm.address.proviceID,
                    cityID:vm.address.cityID,
                    areaID:vm.address.areaID,
                    RegionAddress:vm.address.RegionAddress,
                    DetailAddress:vm.address.RegionAddress,
                    ReceiverName:vm.address.ReceiverName,
                    ReceiverContact:vm.address.ReceiverContact,
                    ZipCode:vm.address.ZipCode,
                    IsDefault:vm.address.IsDefault
                }
            }).then(function(data){                
                $uibModalInstance.close(vm.address);
            }, function(data){
                $uibModalInstance.dismiss(address.data);
            })

        };

        vm.cancel = function() {
            $uibModalInstance.dismiss(address.data);
        };
    });

    return vm;

}]);
