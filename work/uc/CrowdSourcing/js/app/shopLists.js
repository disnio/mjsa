/*
 * @Author: Allen
 * @Date:   2015-03-29 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-11 14:29:27
 */

$(function() {
    //店铺街页面左侧列表
    var shopListOpt = {
        "type": "get",
        // 接口
        "name": '/Service/ShopList',
        "dataType": "jsonp"
    };
    UT.jaxJson(shopListOpt).then(function(data) {
        //console.log(data);

        $("#yc_list").append(UT.tplRender($("#shopListTpl").html(), {
            datas: data.Data
        }, function(data){
            _.each(data.datas, function(v){                
                var t = $(v.Description).text();
                v.Description = _.size(t) > 30 ? t.substr(0, 30)+'...' : t;
            });
        }));
        $(".yc_description p img").remove();
    });
    //店铺街页面右侧优质店铺推荐列表
    var QualityShopOpt = {
        "type": "get",
        // 接口
        "name": '/Service/QualityShopList',
        "dataType": "jsonp"
    };
    UT.jaxJson(QualityShopOpt).then(function(data) {
        //console.log(data);

        $("#recommend").append(UT.tplRender($("#QualityShopTpl").html(), {
            datas: data.Data
        }, function(data){
            _.each(data.datas, function(v){                
                var t = $(v.Description).text();
                v.Description = _.size(t) > 30 ? t.substr(0, 30)+'...' : t;
            });
        }));
        $(".right-recommend p img").remove();

    });

});





