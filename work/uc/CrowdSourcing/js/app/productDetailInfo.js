/*
* @Author: whj
* @Date:   2016-07-14 18:15:50
* @Last Modified by:   whj
* @Last Modified time: 2016-06-16 13:03:49
*/
$(function () {
        //https://web-dev.ucdl.cn/crowdsourcing/product/productdetailInfo/12
        console.log("WHJ--------");
        var optopt = {
            "type": "get",
            "webUrl": ucConfig.ServerReferenceJavaScript,
            "name": '/product/productdetailInfo',
            "contentType": "application/json",
            "dataType": "json",
            "data": { id: 12 }
        };
        UT.jaxJson(optopt, true).then(function (data) {
            console.log(data);
            showProductdetail(data);
        });

        function showProductdetail(data) {
            $(".category").html(data.Data.CategoryName);
            $(".title").html(data.Data.Name);
            $(".shop-Price").html("¥" + data.Data.Price);
            $(".shop-State img").attr('src', (ucConfig.ServerReferenceFileCenterAPI + "/fileupload/MediaSmall/" + data.Data.PictureList[0].IconID));
            $(".shop-Describe").html(data.Data.Description);
           
            if (data.Data.OptionList.length > 0) {
                console.log(data.Data.OptionList);
            }
        }

})

