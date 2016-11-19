/* 
 * @Author: Allen
 * @Date:   2016-11-14 14:17:13
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-11-19 10:59:03
 */
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

