/* 
* @Author: czy
* @Date:   2016-07-27 10:58:16
* @Last Modified by:   czy
* @Last Modified time: 2016-07-27 15:44:39
*/

'use strict';
$(function(){
    var getCommentOpt = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceJavaScript,
        "name": '/buyerservicemanagement/getservicedetailInfo',
        "contentType": "application/json",
        "data": {
            serviceId: UT.queryString.parse(undefined).serviceId
        }
    };
    UT.jaxJson(getCommentOpt, true).then(function(data) {
        //console.log(data);
        $("#ServiceNote").append(UT.tplRender($("#ServiceNoteTpl").html(), {
               datas: data.Data.LogList
           }));
    
        if(data.Data.LogList.length==0){
            $(".nolist").show();
        }
        $("#user-status").html(data.Data.StatusName);
        $("#ServiceName").html(data.Data.ServiceName);
        $("#fee").html(data.Data.NonRecuringFee);
        $("#buyData").html(data.Data.BuyDate);
        $("#userLife").html("无");
        $("#startTime").html(data.Data.BeginDate);
        $("#stopTime").html(data.Data.EndDate);
        $("#userName").html(data.Data.ServiceUserName);
        $("#seller").html(data.Data.ProviderName);
        });
        
        


})