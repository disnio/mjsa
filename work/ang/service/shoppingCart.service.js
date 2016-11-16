/* 
 * @Author: Allen
 * @Date:   2016-07-13 16:33:12
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-10-21 10:40:36
 */
// 获取购物车里商品列表
yob.factory('shoppingCardList', function($http) {
    var opt = {
        type: "get",
        webUrl: ucConfig.ServerReferenceCrowdSourcing,
        name: '/ShoppingCard/ShoppingCardList',
        contentType: "application/json",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        }
    };

    return UT.jaxJson(opt, true)
});

yob.factory('shoppingCardBuyList', function($http) {
    var opt = {
        type: "get",
        webUrl: ucConfig.ServerReferenceCrowdSourcing,
        name: '/ShoppingCard/GetSelectedProductsFromShoppingCard',
        contentType: "application/json",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        }
    };

    return UT.jaxJson(opt, true)
});
yob.factory('addressList', function($http) {
    var opt = {
        "baseUrl": ucConfig.ServerReferenceCrowdSourcing,
        "name": '/address/getaddresslist'
    };
    return $http.get(opt.baseUrl + opt.name)
});

yob.factory('Province', function($http) {
    // 发货区域，省
    var getProvinceOpt = {
        "webUrl": ucConfig.ServerReferenceJavaScript,
        "name": '/product/regionlist/' + 0,
    };
    return $http.get(getProvinceOpt.webUrl + getProvinceOpt.name);
});
// 公共服务对象，处理商品相关属性
yob.factory('pbFunc', function($http) {
    return {
        getCity: function(id) {
            // 发货区域，省            
            var getCityOpt = {
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/product/regionlist/' + id,
            };
            return $http.get(getCityOpt.webUrl + getCityOpt.name);
        },
        getArea: function(id) {
            // 发货区域，省            
            var getAreaOpt = {
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/product/regionlist/' + id,
            };
            return $http.get(getAreaOpt.webUrl + getAreaOpt.name);
        }
    }
});
