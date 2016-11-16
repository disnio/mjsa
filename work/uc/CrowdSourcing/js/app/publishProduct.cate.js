/* 
* @Author: Allen
* @Date:   2016-03-21 11:19:19
* @Last Modified by:   Allen
* @Last Modified time: 2016-03-29 13:20:43
*/
$(function() {
    
    // http://allen.ucdl.cn/CrowdSourcingWeb/product/CategoryListForPublishProduct
    var opt = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceJavaScript,
        "name": '/product/CategoryListForPublishProduct',
        "contentType": "application/json"
    };
    UT.jaxJson(opt, true).then(function(data) {
        
        UI.genSelect({
            list: data,
            container: $("#catelist")
        });        

    }, function(err) {
        alert('err');
    })

});
