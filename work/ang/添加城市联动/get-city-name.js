/* 
 * @Author: Allen
 * @Date:   2016-11-14 14:17:13
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-11-16 10:54:05
 */

function region($scope, aRegionsID, areaText) {
    var sarea = {
        ProvinceID: 0,
        CityID: 0,
        AreaID: 0,
        Regions: [],
        text: ""
    };

    areaText[0] = "";
    sarea.Regions = /156(\d{2})(\d{2})(\d{2})000000/.exec(aRegionsID);
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

    var getProvinceOpt = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceSystemAdminAPI,
        "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
        "data": {
            parentId: 156000000000000
        },
        "dataType": "jsonp"
    };
    UT.jaxJson(getProvinceOpt, true).then(function(data) {

        var pindex = _.findIndex(data, {
            ID: parseInt(sarea.ProvinceID, 10)
        });

        $scope.$apply(function() {
            areaText[0] = data[pindex].Name;
        });

        if (sarea.Regions[2] !== "00") {
            var getCityOpt = {
                "type": "get",
                "webUrl": ucConfig.ServerReferenceSystemAdminAPI,
                "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
                "dataType": "jsonp",
                "data": {
                    parentId: sarea.ProvinceID
                }
            };
            UT.jaxJson(getCityOpt, true).then(function(data) {

                var cindex = _.findIndex(data, {
                    ID: parseInt(sarea.CityID, 10)
                });
                $scope.$apply(function() {
                    areaText[0] += data[cindex].Name;
                });

                if (sarea.Regions[3] != "00") {
                    var getAreaOpt = {
                        "type": "get",
                        "webUrl": ucConfig.ServerReferenceSystemAdminAPI,
                        "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
                        "dataType": "jsonp",
                        "data": {
                            parentId: sarea.CityID,
                        }
                    };
                    UT.jaxJson(getAreaOpt, true).then(function(data) {

                        var aindex = _.findIndex(data, {
                            ID: parseInt(sarea.CityID, 10)
                        });
                        $scope.$apply(function() {
                            areaText[0] += data[aindex].Name;
                        });
                    });
                }

            });
        }


    });
}
