/*
* @Author: anchen
* @Date:   2016-05-05 18:03:48
* @Last Modified by:   Allen
* @Last Modified time: 2016-08-11 14:25:14
*/

$(function() {
    //商城首页左侧商品列表
    var shopListOpt = {
        "type": "get",
        // 接口
        "name": '/Service/GetService',
        "dataType": "jsonp"
    };
    UT.jaxJson(shopListOpt).then(function(data) {

        $("#proList").append(UT.tplRender($("#proListTpl").html(), {
            datas: data.Data
        }, function(data){
            _.each(data.datas, function(v){
                var t = $(v.Description).text();
                v.Description = _.size(t) > 30 ? t.substr(0, 30)+'...' : t;
            });
        }));
        console.log(data);
        $(".jianjie p img").remove();

    });
    //商城首页右侧优质店铺推荐列表
    var QualityShopOpt = {
        "type": "get",
        // 接口
        "name": '/Service/QualityShopList',
        "dataType": "jsonp"
    };
    UT.jaxJson(QualityShopOpt).then(function(data) {
        //console.log(data);

        $("#panel-body").append(UT.tplRender($("#QualityShopTpl").html(), {
            datas: data.Data
        }, function(data){
            _.each(data.datas, function(v){                
                var t = $(v.Description).text();
                v.Description = _.size(t) > 30 ? t.substr(0, 30)+'...' : t;
            });
        }));

    });
     //商城首页右侧优质服务推荐列表
    var QualityServiceOpt = {
        "type": "get",
        // 接口
        "name": '/Service/QualityServiceList',
        "dataType": "jsonp"
    };
    UT.jaxJson(QualityServiceOpt).then(function(data) {
        //console.log(data);

        $("#panel-body01").append(UT.tplRender($("#QualityServiceTpl").html(), {
            datas: data.Data
        }, function(data){
            _.each(data.datas, function(v){
                var t = $(v.Description).text();
                v.Description = _.size(t) > 30 ? t.substr(0, 30)+'...' : t;
            });
        }));

    });
});
