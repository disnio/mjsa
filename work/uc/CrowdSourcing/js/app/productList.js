/*
* @Author: anchen
* @Date:   2016-05-05 18:15:50
* @Last Modified by:   Allen
* @Last Modified time: 2016-08-11 14:27:46
*/

$(function() {
    var cid = UT.queryString.parse().cid || 0;
    var keyword = UT.queryString.parse().keyword || "";
    
    //服务库页面左侧列表
   var productListOpt = {
       "type": "get",
       // 接口
       "name": '/Service/GetService',
       "data": {
           cid: cid,
           keyword: keyword
       },
       "dataType": "jsonp"
   };
   UT.jaxJson(productListOpt).then(function(data) {
       //console.log(data);

       $("#yc_list01").append(UT.tplRender($("#productListTpl").html(), {
           datas: data.Data
       }, function(data){
            _.each(data.datas, function(v){                
                var t = $(v.Description).text();
                v.Description = _.size(t) > 30 ? t.substr(0, 30)+'...' : t;
            });
        }));

   });
   //服务库页面右侧优质服务推荐列表
   var productServeOpt = {
       "type": "get",
       // 接口
       "name": '/Service/QualityServiceList',
       "dataType": "jsonp"
   };
   UT.jaxJson(productServeOpt).then(function(data) {
       console.log(data);

       $("#recommend01").append(UT.tplRender($("#productServiceTpl").html(), {
           datas: data.Data
       }, function(data){
            _.each(data.datas, function(v){                
                var t = $(v.Description).text();
                v.Description = _.size(t) > 30 ? t.substr(0, 30)+'...' : t;
            });
        }));
       $(".comm_yc p img").remove();

   });
});

