/*
* @Author: anchen
* @Date:   2016-05-05 18:22:06
* @Last Modified by:   anchen
* @Last Modified time: 2016-05-09 13:04:53
*/

$(function () {
    //店铺页面店铺详情页
    var ShopxqOpt = {
        "type": "get",
        // 接口
        "name": '/Service/GetShop',
        "dataType": "jsonp",
        // ajax 参数
        "data": {
            id: UT.queryString.parse(undefined).id
        }
    };
    UT.jaxJson(ShopxqOpt).then(function (data) {
        //console.log(data);
        var category = "";
        if (data.CategoryList != null) {
            for (var i = 0; i < data.CategoryList.length; i++) {
                category += data.CategoryList[i].CategoryName;
            }
        }
        data.CategoryName = category;
        $("#demo-img").append(UT.tplRender($("#ShopxqTpl").html(), {
            datas: data
        }));

        $(".carousel").jCarouselLite({
            btnNext: ".widget .next",
            btnPrev: ".widget .prev",
            circular: false,
            speed: 300
        });
        $(".widget img").click(function (e) {
            var curIndex = $(e.currentTarget).parent().index();
            var lis = $(".carousel li");
            lis.removeClass("selected");
            lis.eq(curIndex).addClass("selected");
            $(".widget .mid img").attr("src", $(this).attr("src"));
        });
    });
    //店铺页面店主推荐列表
    var ShopProductOpt = {
        "type": "get",
        // 接口
        "name": '/Service/ShopProductList',
        "dataType": "jsonp",
        // ajax 参数
        "data": {
            id: UT.queryString.parse(undefined).id
        }
    };
    UT.jaxJson(ShopProductOpt).then(function (data) {
        //console.log(data);

        $("#ul-list").append(UT.tplRender($("#ShopProductTpl").html(), {
            datas: data.Data
        }));
        $(".des-detail p img").remove();

    });
});
