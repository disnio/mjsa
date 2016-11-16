/*
 * @Author: Allen
 * @Date:   2015-03-29 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-17 16:28:33
 */

$(function() {
    var id = purl().segment(-1);
    var opt = {
        "type": "get",
        "webUrl": ucConfig.ServerReferenceJavaScript,
        "name": '/product/productdetailinfo/' + id,
        "contentType": "application/json"
    };

    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function() {
        $("#locationCity").html(remote_ip_info.city);
        $("#provinceID").html(remote_ip_info.city);
    });
    var stockNum;
    UT.jaxJson(opt, true).then(function(data) {
        console.log(data);

        var PropertiesNameToObj = function(p) {
            if (_.isString(p)) {
                var iarr = p.split(",");
                var ret = _.zipObject(_.map(iarr, function(v, i) {
                    return v.split(":");
                }));
                return ret;
            } else {
                return [];
            }
        };
        // 数据skulist 属性名转对象
        _.each(data.Data.SKUList, function(v, i) {
            v.PropertiesName = PropertiesNameToObj(v.PropertiesName);
        });
        // 默认返回最小价格的商品规格组合
        var getMinPriceObj = function(data) {
            var minPObj = _.min(data.Data.SKUList, function(item) {
                return item.Price;
            });
            return minPObj;
        };

        // 初始化选择界面
        var skus = _.filter(data.Data.OptionList, {
            IsSKU: true
        });
        var mpo = getMinPriceObj(data);
        $(".js-name").data('lid', mpo.LID);
        // console.log(mpo)
        // 渲染规格
        $("#skuList").append(UT.tplRender($("#skuTpl").html(), {
            datas: {
                skus: skus,
                curobj: mpo
            }
        }, function(data){
            
        }));
        // 基本信息
        stockNum = mpo.Num;
        $("#name h1").text(data.Data.Name || "暂无名称");
        $("#p-price").text(mpo.Price);
        $("#stockNum").text(mpo.Num);
        // 图片显示
        if (!_.isEmpty(data.Data.PictureList)) {
            $(".carousel").empty().append(UT.tplRender($("#pictureTpl").html(), {
                datas: data.Data.PictureList
            }, function(data) {
                if (_.isEmpty(data.datas)) {
                    return;
                } else {
                    data.datas[0].IsMainPic = true;
                    _.each(data.datas, function(v, i) {
                        v.Url = ucConfig.ServerReferenceFileCenterAPI + '/fileupload/ImgDownload/' + v.IconID;
                    })
                }
            }));
            var mainPic = _.find(data.Data.PictureList, {
                "IsMainPic": true
            });

            // 高亮主图
            if (_.isUndefined(mainPic)) {
                mainPic = data.Data.PictureList[0];
                $(".carousel li:first").addClass("selected");
            } else {
                var mpicIndex = _.findIndex(data.Data.PictureList, {
                    "IsMainPic": true
                });
                $(".carousel li").eq(mpicIndex).addClass("selected");
            }

            $("#jcl-demo .mid").empty().append('<img/ src="' + mainPic.Url + '">');

            $(".widget .carousel").jCarouselLite({
                btnNext: ".widget .next",
                btnPrev: ".widget .prev",
                circular: false,
                speed: 300
            });

            if (data.Data.PictureList.length <= 3) {
                $(".widget a").addClass('hide');
            }
            $(".widget img").click(function(e) {
                var curIndex = $(e.currentTarget).parent().index();
                var lis = $(".carousel li");
                lis.removeClass("selected");
                lis.eq(curIndex).addClass("selected");
                $(".widget .mid img").attr("src", $(this).attr("src"));
            });
        } else {
            $(".widget").addClass('hide');
        }

        // 商品属性
        $("#zbOpt").empty().append(UT.tplRender($("#optTpl").html(), {
            datas: data.Data.OptionList
        }, function(data) {
            data.datas = _.filter(data.datas, function(v) {
                return v.IsSKU == false;
            });
        }));
        // 价格项
        if (!_.isEmpty(mpo.PriceList)) {
            $(".priceItem").empty().append(UT.tplRender($("#priceItemTpl").html(), {
                datas: mpo.PriceList
            }));
        }

        $("#p-description .p-detail").html(data.Data.Description || "暂无商品详情");
        // -----
        // 根据属性名查询对应的skuList 对象
        var getSkuFromPropertiesName = function(pn) {
            // skulist 里的  PropertiesName 未转化为对象
            var nsku = _.find(data.Data.SKUList, function(item) {
                return _.isEqual(item.PropertiesName, pn);
            });
            return nsku;
        };
        // 初始的规格选项
        var isku = _.clone(mpo.PropertiesName);
        // 生成字符串属性名
        var genSkuPropertiesName = function(PropertiesName) {
            return _.map(_.pairs(PropertiesName), function(v, i) {
                return v.join(":")
            }).toString();
        };

        // 规格选择
        $(".choose").delegate('.item a', 'click', function(e) {
            e.preventDefault();
            var _self = $(e.currentTarget);
            var choose = _self.closest(".p-choose");
            var pkey = choose.find(".dt").data("key");
            var p = _self.parent();
            var txt = _self.text();
            if ($(p).hasClass(".selected")) {
                return;
            } else {
                isku[pkey] = txt;
                p.siblings().removeClass("selected");
                $(p).addClass("selected");
            }

            // 选择正确的属性名后更新价格和名称
            mpo = getSkuFromPropertiesName(isku);
            $(".js-name").data('lid', mpo.LID);
            // -----
            $("#name h1").text(data.Data.Name || "暂无名称");
            $("#p-price").text(mpo.Price);
            $("#stockNum").text(mpo.Num);
            $(".priceItem").empty().append(UT.tplRender($("#priceItemTpl").html(), {
                datas: mpo.PriceList
            }));
            // 选择正确的属性名后，判断输入框中的值是否大于库存量  czy
            // stockNum = mpo.Num;
            $("#Number").val(1);
            // if(parseInt(reVal)>stockNum){
            //     $("#errorTip").show();
            //     $("#errorMsg").text("您所选择的商品数量超过库存！");
            //     $(".js-buy").prop("disabled", true);
            //     $("#reduce").prop("disabled", false);
            //     return false;
            // }
        });

        // 立即购买，加入购物车
        $(".js-buy").click(function(e) {

            var pdata = {};

            pdata.Num = $("#Number").val();
            pdata.SKUID = $(".js-name").data('lid');

            pdata.ProductID = data.Data.LID;
            pdata.BuyNow = $(e.currentTarget).attr("data-buy") == "0" ? true : false;
            // console.log(pdata)
            // pdata.Creator= 100002;

            var opt = {
                "baseUrl": ucConfig.ServerReferenceCrowdSourcingAPI,
                "type": "get",
                "name": '/ShoppingCard/AddToShoppingCard',
                "contentType": "application/json",
                "dataType": "jsonp",
                "data": pdata
            };

            UT.jaxJson(opt).then(function(data) {
                // console.log(data)
                var buyNowOpt;
                if (data.Success == true) {
                    buyNowOpt = {
                        "baseUrl": ucConfig.ServerReferenceCrowdSourcingAPI,
                        "type": "get",
                        "name": '/ShoppingCard/SubmitSelectedItems',
                        "contentType": "application/json",
                        "dataType": "jsonp",
                        "data": {
                            shoppingCardIDs: data.Data
                        }
                    };
                    if (pdata.BuyNow) {
                        UT.jaxJson(buyNowOpt).then(function(data) {
                            location.href = ucConfig.ServerReferenceJavaScript + '/shoppingcard/confirmorder';
                        });
                    } else {
                        UI.inTip(data.Msg).then(function() {
                            location.href = ucConfig.ServerReferenceJavaScript + '/shoppingcard/index';
                        });
                    }

                } else {                    
                    if(data.State == 1){
                        location.href = ucConfig.ServerReferenceUserCenter + '/Account/Login?FromAPP=' + ucConfig.ServerReferenceCrowdSourcing + '/productlist/productdetail/' + pdata.ProductID;
                    }
                    UI.inTip(data.Msg);
                }

            });
        });

        // $('#myTab a:last').tab('show')
        //添加发货地址
        $(".select-addr").hover(function() {
            $(this).find(".addrBox-area").show();
            $(this).find(".delegete").children('img').attr("src", "/CrowdSourcing/Content/img/xiala01.png");
            $(this).find(".default-address").css("backgroundColor", "#fff");
        },function(){
            $(this).find(".addrBox-area").hide();
            $(this).find(".delegete").children('img').attr("src", "/CrowdSourcing/Content/img/xiala.png");
            $(this).find(".default-address").css("backgroundColor", "transparent");

        });
        
        //定位当前城市
        //通过调用新浪IP地址库接口查询用户当前所在省份、城市
        var parr = [],
            carr = [];
        var genTpl = function(data) {
            var tpl = "";
            for (var i = 0; i < data.length; i++) {
                tpl += '<li id=' + data[i].LID + '><span>';
                tpl += data[i].Name;
                tpl += '</span></li>';
            }
            return tpl;
        };

        var getResion = function(id) {
            // 发货区域，省
            var opt = {
                "type": "get",
                "baseUrl": ucConfig.ServerReferenceJavaScript,
                "contentType": "application/json",
                "name": '/product/regionlist/' + id,
                "dataType": "json"
            };
            return UT.jaxJson(opt)
        };

        getResion(0).then(function(data) {
            parr = data.Data;
            var provinceArry = genTpl(data.Data);
            $("#provinceBox").append(provinceArry);
            $("#provinceID").addClass('current');
        });
        var resionArr = {
            resion: [],
            id: ''
        };
        //点击省份获取城市
        $("#provinceBox").delegate("li", "click", function() {
            var selectID = $(this).attr("id");
            var selectValue = $(this).children('span').html();
            if(resionArr.resion.length >= 1){
                resionArr.resion = [];
            }
            resionArr.resion.push({
                ID: selectID,
                Name: selectValue
            });
            resionArr.id = selectID;

            $("#provinceID").html(selectValue);
            getResion(selectID).then(function(data) {
                $('#provinceBox').empty();
                $("#cityID").html("--请选择--");
                var cityArry = genTpl(data.Data);
                $("#cityBox").append(cityArry);
                $(".area-title li").removeClass('current');
                $("#cityID").addClass('current');

            });
            console.log(data.Data.AreaList)
            _.each(data.Data.AreaList, function(area) {
                if (area.AdministrativeRegionID+'' === resionArr.id) {
                    $(".js-buy").prop("disabled", false);
                    $(".add-statics").text("有货")
                }else{
                    $(".js-buy").prop("disabled", true);
                    $(".add-statics").text("无货")
                }
                console.log("area：", area)
            })
        });

        //点击城市获取地区
        $("#cityBox").delegate("li", "click", function() {
            var selectID = $(this).attr("id");
            var selectValue = $(this).children('span').html();
            if(resionArr.resion.length >= 2){
                resionArr.resion = resionArr.resion.slice(0,1);
            }
            resionArr.resion.push({
                ID: selectID,
                Name: selectValue
            });

            resionArr.id = selectID;
            $("#cityID").html(selectValue);

            getResion(selectID).then(function(data) {
                $('#cityBox').empty();
                var areaArry = genTpl(data.Data);
                $("#areaBox").append(areaArry);
                $(".area-title li").removeClass('current');
                $("#countyID").addClass('current');
            });
            _.each(data.Data.AreaList, function(area) {
                if (area.AdministrativeRegionID+'' === resionArr.id) {
                    $(".js-buy").prop("disabled", false);
                    $(".add-statics").text("有货")
                }else{
                    $(".js-buy").prop("disabled", true);
                    $(".add-statics").text("无货")
                }
            })
        });
        //点击地区获取地区值
        $("#areaBox").delegate("li", "click", function() {
            var areaName = $(this).children('span').html();
            var selectID = $(this).attr("id");
            //把获取的省市区值赋给默认值
            var defaultArry = [];
            defaultArry[0] = $("#provinceID").html();
            defaultArry[1] = $("#cityID").html();
            defaultArry[2] = areaName;
            if(resionArr.resion.length = 3){
                resionArr.resion.pop();
            }
            resionArr.resion.push({
                ID: selectID,
                Name: areaName
            });
            resionArr.id = selectID;

            $("#locationCity").html(defaultArry);
            $(".addrBox-area").hide();
            $(".default-address").css("backgroundColor", "transparent");
            $(".default-address").css("border", "none");
            $(".default-address").find(".delegete").children('img').attr("src", "/CrowdSourcing/Content/img/xiala.png");

            _.each(data.Data.AreaList, function(area) {
                if (area.AdministrativeRegionID+'' === resionArr.id) {
                    $(".js-buy").prop("disabled", false);
                    $(".add-statics").text("有货")
                }else{
                    $(".js-buy").prop("disabled", true);
                    $(".add-statics").text("无货")
                }
            })

        });

        if (_.isEmpty(data.Data.AreaList)) {
            $(".js-buy").prop("disabled", false);
            $(".add-statics").text("有货")
        } else {
            $(".js-buy").prop("disabled", true);
            $(".add-statics").text("无货")
        }


        
        $(".area-title li").click(function() {
            var x = $(".area-title li").index(this);
            $(".area-title li").removeClass('current');
            $(".area-title li").eq(x).addClass('current');
        });
        //再次选择地址，点击“-请选择-”获取省份
        $("#provinceID").click(function() {
            $("#cityBox").empty();
            $("#areaBox").empty();
            var provinceArry01 = genTpl(parr);
            $("#provinceBox").html(provinceArry01);
        });
        //商品数量加减
        var t = $("#Number");
        //默认数量为1，减少按钮设为不可点击
        $("#reduce").prop("disabled", true);
        //选择数量后刷新页面，如果数量值大于1，减少按钮设为可点击
        if(parseInt(t.val())>1){
                $("#reduce").prop("disabled", false);
            }
        //数量增加操作
        $("#plus").click(function() {
            t.val(parseInt(t.val()) + 1);
            if (parseInt(t.val()) > 1) {
                $("#reduce").prop("disabled", false);
                if(parseInt(t.val()) > stockNum){
                    // $("#errorTip").show();
                    // $("#errorMsg").text("您所填写的商品数量超过库存！");
                     t.val(parseInt(stockNum));
                    $(".js-buy").prop("disabled", true);
                }
            }
        });
        //数量减少操作
        $("#reduce").click(function() {
            t.val(parseInt(t.val()) - 1);
            if (parseInt(t.val()) == 1) {
                $("#reduce").prop("disabled", true);
            }
            if (parseInt(t.val()) <= stockNum) {
             $("#errorTip").hide();   
            }
        });
        //判断输入数量是否为整数以及输入数量是否大于库存量
        $("#Number").keyup(function(){
            var value = $(this).val();
            if((/^(\+|-)?\d+$/.test( value ))&&value>0){  
                if(value>stockNum){
                    // $("#errorTip").show();
                    // $("#errorMsg").text("您所填写的商品数量超过库存！");
                    t.val(parseInt(stockNum));
                    $(".js-buy").prop("disabled", true);
                }
                if(value<=stockNum){
                    $("#errorTip").hide();
                }
                return true;
            }else{  
                jQuery("#Number").val("1");  
                return false;  
            }  
        });
        //购买商品详情页，获取店铺信息
        var shopID = data.Data.ShopID;
        var productID = data.Data.productID;
        var shopinfoOpt = {
            "type": "get",
            "webUrl": ucConfig.ServerReferenceCrowdSourcing,
            "name": '/productlist/shopinfo',
            "contentType": "application/json",
            "data": {
                shopid: shopID
            }
        };
        UT.jaxJson(shopinfoOpt, true).then(function(data) {
            
            $("#media-heading a").html(data.Data.Name);
            if (data.Data.IsSelfShop == true) {
                $(".table-classification").show();
            }
            $("#jianjie").append(data.Data.Description);
            $("#jianjie br").remove();
            $("#imgIcon img").attr("src", ucConfig.ServerReferenceFileCenterAPI + '/fileupload/ImgDownload/' + data.Data.IconID);
            $(".enterShop").attr("href", ucConfig.ServerReferenceJavaScript + '/shop/details?id=' + data.Data.ID);
            $("#imgIcon").attr("href", ucConfig.ServerReferenceJavaScript + '/shop/details?id=' + data.Data.ID);
            $("#media-heading a").attr("href", ucConfig.ServerReferenceJavaScript + '/shop/details?id=' + data.Data.ID);
        });
        //购买商品详情页，获取店铺其他商品
        var shopotherOpt = {
            "type": "get",
            "webUrl": ucConfig.ServerReferenceCrowdSourcing,
            "name": '/productlist/shopproductlist',
            "contentType": "application/json",
            "data": {
                shopid: shopID,
                productid: id
            }
        };
        UT.jaxJson(shopotherOpt, true).then(function(data) {
            $("#otherPro").append(UT.tplRender($("#otherProTpl").html(), {
                datas: data.Data
            }, function(data){
                _.each(data.datas, function(v){
                    v.href = ucConfig.ServerReferenceJavaScript + "/productlist/productdetail/" + v.ID
                });
            }));
        });

        // degree 参数 选填 默认显示全部（显示全部时可以不填） 0全部 1差评 2中评 3好评
         
        function plPage(opt) {
            var jaxOpt = {
                ajax: {
                    "type": "get",
                    "webUrl": ucConfig.ServerReferenceJavaScript,
                    "name": '/productlist/productcommentlist',
                    "contentType": "application/json",
                    //"dataify": true,
                    "data": {
                        id: opt.id,
                        degree: opt.degree,
                        pageIndex: 0,
                        pageSize: 2
                    }
                },
                pageData: 'CommentList',
                // 放置返回数据列表容器
                el: opt.el,
                // 列表模板
                tpl: $("#plTpl").html(),
                // 分页插件
                pageFunc: $.fn.smartpaginator,
                // 分页
                page: {
                    // 页码容器
                    pageEl: opt.pageEl,
                    // 每页包含的数量
                    perPage: 2,
                    // 总页数
                    numLen: 3
                },
                callback: opt.callback
            };

            UT.jaxPage(jaxOpt)
        }

        function plHead(data) {
            $('a[data-degree="0"]').text("全部评价（" + data.TotalAmount + "）");
            $('a[data-degree="3"]').text("好评（" + data.PositiveAmount + "）");
            $('a[data-degree="2"]').text("中评（" + data.NeutralAmount + "）");
            $('a[data-degree="1"]').text("差评（" + data.NegativeAmount + "）");
        }
        plPage({
            id: data.Data.LID,
            degree: 0,
            el: $(".js-all-comment"),
            pageEl: $(".js-all-page"),
            callback: function(data) {
                plHead(data);
                var plt = {
                    hao: (data.PositiveAmount / data.TotalAmount).toFixed(2) * 100 || 0,
                    zhong: (data.NeutralAmount / data.TotalAmount).toFixed(2) * 100 || 0,
                    cha: (data.NegativeAmount / data.TotalAmount).toFixed(2) * 100 || 0
                };

                $(".evaluate-summary_overview span").text((plt.hao).toFixed(0) + "%");

                var $hao = $(".js-bar-hao");
                $(".barBox-percent", $hao).text("好评（" + plt.hao.toFixed(0) + "%）");
                $(".progress-bar", $hao).attr("aria-valuenow", plt.hao.toFixed(0)).css("width", plt.hao + "%");

                var $zhong = $(".js-bar-zhong");
                $(".barBox-percent", $zhong).text("中评（" + plt.zhong.toFixed(0) + "%）");
                $(".progress-bar", $zhong).attr("aria-valuenow", plt.zhong.toFixed(0)).css("width", plt.zhong + "%");

                var $cha = $(".js-bar-cha");
                $(".barBox-percent", $cha).text("差评（" + plt.cha.toFixed(0) + "%）");
                $(".progress-bar", $cha).attr("aria-valuenow", plt.cha.toFixed(0)).css("width", plt.cha + "%");

            }
        });


        $('.js-tab-pl').on('shown.bs.tab', function(e) {
            // newly activated tab          e.target 
            // previous active tab          e.relatedTarget 

            switch ($(e.target).data("degree")) {
                case 0:
                    plPage({
                        id: data.Data.LID,
                        degree: 0,
                        el: $(".js-all-comment"),
                        pageEl: $(".js-all-page"),
                        callback: function(data) {
                            plHead(data)
                        }
                    });
                    break;
                case 3:
                    plPage({
                        id: data.Data.LID,
                        degree: 3,
                        el: $(".js-hao-comment"),
                        pageEl: $(".js-hao-page"),
                        callback: function(data) {
                            plHead(data)
                        }
                    });
                    break;
                case 2:
                    plPage({
                        id: data.Data.LID,
                        degree: 2,
                        el: $(".js-zhong-comment"),
                        pageEl: $(".js-zhong-page"),
                        callback: function(data) {
                            plHead(data)
                        }
                    });
                    break;
                case 1:
                    plPage({
                        id: data.Data.LID,
                        degree: 1,
                        el: $(".js-cha-comment"),
                        pageEl: $(".js-cha-page"),
                        callback: function(data) {
                            plHead(data)
                        }
                    });
                    break;
            }

        });

    });
});
