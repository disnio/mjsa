// Allen wu 2015-12-12


// 根据 界面参数调节然后更改 action 参数，触发提交
// search.aspx?RoomType=0&Address=%u5317%u4eac&RentedType=1&Latitude=39.929986&Longitude=116.395645
// ?RoomType=0&Address=北京&RentedType=1

var url = $.url();
var baseUrl = ucConfig.ServerReferenceDataSyncMgmtAPI + "/ReservationSearch/";

// var baseUrl = "http://allen.ucdl.cn/DataSyncMgmtAPI/ReservationSearch/";
var utils = uc.utils({
    "baseUrl": baseUrl
});
// 查询参数临时存放
var mReq = {
    // 目的地
    "City": url.param("Address") || "广州",
    "RoomType": url.param("RoomType") || 0,
    "RentedType": url.param("RentedType") || 1,
    // 关键词
    "Address": url.param("Address") || "广州",
    "Longitude": 0,
    "Latitude": 0,
    "PagingIndex": 0,
    "PagingSize": 10,
    "PagingOrder": 1,
    "RentedbyDay": url.param("RentedbyDay") || false,
    "RentedbyHour": url.param("RentedbyHour") || false,
    "RentedbyMonth": url.param("RentedbyMonth") || false,
    "MaxRental": url.param("MaxRental") || 200,
    "MinRental": url.param("MinRental") || 0,
    "MinCapacity": url.param("MinCapacity") || 0,
    "Capacity": url.param("Capacity") || 10,
    "Distance": url.param("Distance") || 500,
    "MinDistance": url.param("Distance") || 0,
    "Amenities": false,
    "BreakRoom": url.param("BreakRoom") || false,
    "WirelessInternet": url.param("WirelessInternet") || false,
    "CopierOrPrinter": url.param("WirelessInternet") || false,
    "OnSiteParking": url.param("OnSiteParking") || false,
    "Catering": url.param("Catering") || false
};
console.log(mReq)
var pCrowd = {
    "path": "GetCrowdfundingSpaceByCondition",
    "data": mReq,
    "dataType": "jsonp"
};

function G(id) {
    return document.getElementById(id);
}

var mapGetPoint = function(address) {
    var adress = $.trim(address);
    var mdef = $.Deferred();
    var sLatLong = {
        Address: adress || '',
        Longitude: 0,
        Latitude: 0
    };

    var posll = store.get("posLL") || {};

    console.log(adress, posll)
    if (_.isEmpty(adress)) {
        adress = "广州市";
    }
    if (posll.Address === adress && (posll.Latitude != 0 || posll.Latitude != 0)) {
        mdef.resolve($.extend(mReq, sLatLong, posll));

    } else {
        var citys = ["上海", "重庆", "广州", "北京", "天津", "杭州", "济南", "南京", "福州", "南宁", "昆明", "成都", "西宁", "银川", "兰州", "西安", "太原", "石家庄", "沈阳", "长春", "哈尔滨", "呼和浩特", "郑州", "合肥", "武汉", "长沙", "贵阳", "南昌", "拉萨", "乌鲁木齐"];
        
        if(_.include(citys, adress)){
           adress = adress + "市"; 
        }        

        new BMap.Geocoder().getPoint(adress, function(point) {
            if (point) {
                mdef.resolve($.extend(mReq, sLatLong, {
                    Address: adress,
                    Longitude: point.lng,
                    Latitude: point.lat
                }));

                store.set("posLL", $.extend(sLatLong, {
                    Address: adress,
                    Longitude: point.lng,
                    Latitude: point.lat
                }));
            } else {
                mdef.reject({
                    "error": '你给的地址没有对应数据，抱歉！'
                });
            }
        }, "");
    }

    return mdef;
};
var gcount = 0;
var getRoom = function(render) {
    gcount += 1;
    // $.cookie("mreq", mReq);
    console.log(pCrowd)
    utils.jaxGetJson(pCrowd).then(function(data) {
        render(data)
    }, function(err) {
        alert("查询数据发生错误，请稍后重试");
    });
};

// 动态调节最大价格参数
var sRoomTime = {
    "RoomType": 1,
    "RentedByDay": true,
    "RentedByHour": false,
    "RentedByMonth": false
};

var pMaxMin = {
    "path": "GetRoomMaxAndMinPrice",
    "data": sRoomTime,
    "dataType": 'jsonp'
};
// 注意获取最大最小价格后，仍然需要手动设置合理的默认价格取值！
var getMPrice = function(opt) {
    var pdef = $.Deferred();
    utils.jaxGetJson(opt).then(function(data) {
        pdef.resolve(data);
    });

    return pdef;
};
// mapMain.clear();

// 添加地图上的指示标志， 根据查询得到的位置
var remarkMainMap = function(data, mq) {
    var mapMain = new TMap("mapView");
    mapMain.clear();

    mapMain.addMarker(mq.Longitude, mq.Latitude, mq.Address);
    // mapMain.map.centerAndZoom(new BMap.Point(mq.Longitude, mq.Latitude), 14);
    $.each(data.Data, function(i, v) {
        // if (i === 0) {
        //     console.log(i, v.LocationLongitude, v.LocationLatitude)
        // }
        // <%=Jaguar.I18N.Translater.Translate("images/assests/maps:e-icon.png")%> icon
        mapMain.addMarker(v.LocationLongitude, v.LocationLatitude, mq.Address, 'https://secure-demo.ucdl.cn/shared/images/assests/maps/e-icon.png',
            function() {
                showDetailLink('a', G('detaillink' + v.ID), {
                    "Longitude": v.LocationLongitude,
                    "Latitude": v.LocationLatitude
                });

            }
        );
    });
    // 添加自动缩放
    mapMain.autoSize();
};

// 结果列表
var renderRoom = function(data) {

    $("#LLocationCount").text(data.Query.Total);
    $("#TAddress").val(mReq.Address);
    _.each(data.Data, function(v, i) {
        v.LocationDistance = v.LocationDistance.toFixed(2);
    });
    var template = _.template($("#pt").html());
    var tempdata = {
        "rooms": data.Data,
        "showImage": baseUrl
    };
    $("#results").empty();
    $("#results").append(template(tempdata));


    // 获取到roomlist后，地图添加位置标记
    $("#results li").hover(function() {
            $(this).css("background-color", "#FFC").css("cursor", "pointer");
        },
        function() {
            $(this).css("background-color", "#FFF").css("cursor", "auto");
        }
    );
};

var renderR = function(data) {
    // 4.渲染列表显示
    renderRoom(data);
    var galleries = $('.ad-gallery').adGallery({
        width: 500,
        height: 340,
        slideshow: {
            enable: false
        }
    });
    $("div.holder").jPages({
        containerID: "results",
        perPage: 5,
        startPage: 1,
        startRange: 1,
        midRange: 5,
        endRange: 1
    });
    remarkMainMap(data, mReq);
};
// 获取数据后初始化右侧的参数值
var initControl = function() {
    $("#burl").text(utils.baseUrl);
    // 根据 Room Type 设置过滤
    $("#rtype button").each(function(i, v) {

        if ($(v).attr("data-rtype") == mReq.RoomType) {
            $(v).addClass('active').siblings().removeClass('active');
        }
    })

    $("#ddlDuration").val(mReq.RentedType);

    // roomtype and rentedtype and search
    // 要设置为原来的初始值，建立数据 -----    
    $("#CapacitySlider").slider({
        range: "max",
        min: 1,
        max: 300,
        value: mReq.Capacity,
        slide: function(event, ui) {
            $("#TCapacity").val(ui.value);
        },
        stop: function(event, ui) {
            mReq.Capacity = ui.value;
            // 返回小于此容量的数据

            getRoom(renderR);
        }
    });
    $("#TCapacity").val($("#CapacitySlider").slider("value"));
    // 显示价格
    getMPrice(pMaxMin).then(function(data) {
        // 默认价格，暂时
        // console.log("price DATA:", data)      
        $("#PriceSlider").slider({
            range: "max",
            min: data.MinPrice,
            max: data.MaxPrice,
            value: mReq.MaxRental,
            slide: function(event, ui) {
                $("#TPrice").val(ui.value);
            },
            stop: function(event, ui) {
                mReq.MaxRental = ui.value;
                // 返回小于此价格的数据
                // console.log("price sotp:", ui.value)
                getRoom(renderR);
            }
        });
        $("#TPrice").val($("#PriceSlider").slider("value"));

    });
    // 显示距离    
    $("#DistanceSlider").slider({
        range: "max",
        min: 0,
        max: 2000,
        value: mReq.Distance,
        slide: function(event, ui) {
            $("#TDistance").val(ui.value);
        },
        stop: function(event, ui) {
            mReq.Distance = ui.value;
            // 返回小于此距离的数据
            getRoom(renderR);
        }
    });
    $("#TDistance").val($("#DistanceSlider").slider("value"));

};
// Amenities 便利设置
$("#CAmenities label").each(function(i, v) {
    $(v).find("input[type='checkbox']").prop("checked", function(i, val) {
        mReq[$(this).parent().attr("data-v")] = val;
        return val;
    });
});

// $("#CAmenities label").click(function(e) {

//     $(this).find("input[type='checkbox']").prop("checked", function(i, val) {
//         mReq[$(this).parent().attr("data-v")] = !val;
//         getRoom(renderR);
//         return !val;
//     });
// });
$("#CAmenities input[type='checkbox']").click(function(e) {

    $(this).prop("checked", function(i, val) {
        // console.log(val)
        mReq[$(this).next().attr("data-v")] = val;
        getRoom(renderR);
        return val;
    });
});
// 1.保存经纬度数据，防止去查询相同的数据
// 2.初始化控制面板

mapGetPoint(mReq.Address).then(function(data) {
    console.log(mReq.Address)
    // 生成post 查询参数 
    $.extend(mReq, data);
    // 3.获取房间列表数据
    getRoom(renderR);

}, function(err) {
    alert("你查找的地址没有对应信息，抱歉！");
});
initControl();


var capacityChangeValue;

function showOffice1() {
    showOffice();
    $("#TCapacity").val("3");
    $("#CapacitySlider").slider("value", "3");
    getRoom(renderR);
}

function showMeeting1() {
    showMeeting();
    $("#TCapacity").val("20");
    $("#CapacitySlider").slider("value", "20");
    getRoom(renderR);
}

function showConference1() {
    showConference();
    $("#TCapacity").val("150");
    $("#CapacitySlider").slider("value", "150");
    getRoom(renderR);
}

function showOffice() {
    capacityChangeValue = 20 / 20;
    $("#CapacitySlider").slider({
        min: 1,
        max: 20
    });
    mReq.roomType = 1;

    $("#bOffice").addClass("active");
    $("#bMeeting").removeClass("active");
    $("#bConference").removeClass("active");
    // 添加月
    if ($("#ddlDuration option[value='3']").length == 0) {
        $("#ddlDuration").append("<option value='3'>Month</option>");
    }
}

function showMeeting() {
    capacityChangeValue = (50 - 4) / 20;
    $("#CapacitySlider").slider({
        min: 4,
        max: 50
    });
    mReq.roomType = 0;
    $("#bOffice").removeClass("active");
    $("#bMeeting").addClass("active");
    $("#bConference").removeClass("active");
    $("#ddlDuration option[value='3']").remove();
}
// 传入房间最大容量值 RoomMaximumCapacity 100
function showConference() {
    capacityChangeValue = (100 - 50) / 20;
    $("#CapacitySlider").slider({
        min: 50,
        max: 100
    });
    mReq.roomType = 2;
    $("#bOffice").removeClass("active");
    $("#bMeeting").removeClass("active");
    $("#bConference").addClass("active");
    $("#ddlDuration option[value='3']").remove();
}

$(".ctrWid input[type='button']").click(function(e) {
    var ctrEl = $(e.currentTarget);
    var El = ctrEl.parent().find(".ui-slider");
    var Elv = ctrEl.parent().prev("input");
    var eCurValue = El.slider("option", "value");
    var eAct = ctrEl.val();
    var minC = El.slider("option", "min");
    var maxC = El.slider("option", "max");
    var cvalue, changevalue;
    var props = '';
    if (El.attr("id") == "CapacitySlider") {
        changevalue = 1;
        props = "Capacity";
    }

    if (El.attr("id") == "PriceSlider") {
        changevalue = maxC / 20;
        props = "MaxRental";
    }

    if (El.attr("id") == "DistanceSlider") {
        changevalue = 20;
        props = "Distance";
    }
    if (eAct == "-") {
        cvalue = parseInt(eCurValue) - parseInt(changevalue);
    } else {
        cvalue = parseInt(eCurValue) + parseInt(changevalue);
    }

    if (cvalue < minC) {
        cvalue = minC;
    }

    if (cvalue > maxC) {
        cvalue = maxC;
    }
    Elv.val(cvalue)
    El.slider("value", cvalue);
    mReq[props] = cvalue;
    getRoom(renderR);
});

// 通过基本值进行调节
function capacityDown() {
    var tCapacity = $("#CapacitySlider").slider("option", "value");
    capacityValue = parseInt(tCapacity) - parseInt(capacityChangeValue);
    var minCapacity = $("#CapacitySlider").slider("option", "min");
    if (capacityValue < minCapacity) {
        capacityValue = minCapacity;
    }
    $("#TCapacity").val(capacityValue);
    $("#CapacitySlider").slider("value", capacityValue);
    getRoom(renderR);
}

function capacityUp() {
    var tCapacity = $("#CapacitySlider").slider("option", "value");
    capacityValue = parseInt(tCapacity) + parseInt(capacityChangeValue);
    var maxCapacity = $("#CapacitySlider").slider("option", "max");
    if (capacityValue > maxCapacity) {
        capacityValue = maxCapacity;
    }
    $("#TCapacity").val(capacityValue);
    $("#CapacitySlider").slider("value", capacityValue);
    getRoom(renderR);
}


function priceDown() {
    var tPrice = $("#PriceSlider").slider("option", "value");
    var changePrice = $("#PriceSlider").slider("option", "max") / 20;
    mReq.MaxRental = parseInt(tPrice) - parseInt(changePrice);
    var minPrice = $("#PriceSlider").slider("option", "min");
    if (mReq.MaxRental < minPrice) {
        mReq.MaxRental = minPrice;
    }
    $("#TPrice").val(mReq.MaxRental);
    $("#PriceSlider").slider("value", mReq.MaxRental);
    getRoom(renderR);
}

function priceUp() {
    var tPrice = $("#PriceSlider").slider("option", "value");
    var changePrice = $("#PriceSlider").slider("option", "max") / 20;
    mReq.MaxRental = parseInt(tPrice) + parseInt(changePrice);
    var maxPrice = $("#PriceSlider").slider("option", "max");
    if (mReq.MaxRental > maxPrice) {
        mReq.MaxRental = maxPrice;
    }
    $("#TPrice").val(mReq.MaxRental);
    $("#PriceSlider").slider("value", mReq.MaxRental);
    getRoom(renderR);
}

function distanceDown() {
    var tDistance = $("#DistanceSlider").slider("option", "value");
    mReq.Distance = parseInt(tDistance) - 2000 / 20;
    var minDistance = $("#DistanceSlider").slider("option", "min");
    if (mReq.Distance < minDistance) {
        mReq.Distance = minDistance;
    }
    $("#TDistance").val(mReq.Distance);
    $("#DistanceSlider").slider("value", mReq.Distance);
    getRoom(renderR);
}

function distanceUp() {
    var tDistance = $("#DistanceSlider").slider("option", "value");
    mReq.Distance = parseInt(tDistance) + 2000 / 20;
    var maxDistance = $("#DistanceSlider").slider("option", "max");
    if (mReq.Distance > maxDistance) {
        mReq.Distance = maxDistance;
    }
    $("#TDistance").val(mReq.Distance);
    $("#DistanceSlider").slider("value", mReq.Distance);
    getRoom(renderR);
}

// 初始化地图在弹窗
function IniMap(mapDiv) {
    var arr = _.rest(arguments);
    var map = new TMap(mapDiv);
    map.addMarker(mReq.Longitude, mReq.Latitude, mReq.Address);
    map.addMarker(mReq.Longitude, mReq.Latitude, mReq.Address, 'https://secure-demo.ucdl.cn/shared/images/assests/maps/e-icon.png');
    // map.addMarker(mReq.Longitude, mReq.Latitude, mReq.Address, '<%=Jaguar.I18N.Translater.Translate("images/assests/maps:e-icon.png")%>');
    if (!_.isEmpty(arr)) {
        map.addMarker(arr.Longitude, arr.Latitude, mReq.Address, 'https://secure-demo.ucdl.cn/shared/images/assests/maps/e-icon.png');
        // console.log("initMap addMarker: ", arr)

    } else {
        map.addMarker(mReq.Longitude, arr.Latitude, mReq.Address, 'https://secure-demo.ucdl.cn/shared/images/assests/maps/e-icon.png');

    }
    map.autoSize();
}


function showDetailLink(event, tt2) {
    //prevent collapse from firing
    if (event.stopPropagation) {
        event.stopPropagation();
    }


    var index = $(tt2).attr("id").replace("detaillink", "");
    var map = G("mapView" + index),
        lng, lat;
    // console.log(map)
    // 激活标签 OverView Gallery Map，是否激活弹出地图标签
    if (map.a) {
        $("#detailModal" + index + " a[href=#overview" + index + "]").tab('show');
        $("#detailModal" + index).modal({
            backdrop: true,
            show: true
        });

        var lng = $(tt2).attr("Lng");
        var lat = $(tt2).attr("Lat");
        setTimeout(function() {
            IniMap(map, {
                "Longitude": lng,
                "Latitude": lat
            });
        }, 500);

    } else {
        map.a = 1;
        $("#detailModal" + index + " a[href=#map" + index + "]").tab('show');
        $("#detailModal" + index).modal({
            backdrop: true,
            show: true
        });
        var arr = _.rest(arguments);
        var lngp = $(arr).attr("Lng");
        var latp = $(arr).attr("Lat");
        // console.log("els link:", lngp, latp)


        setTimeout(function() {

            IniMap(map, {
                "Longitude": lngp,
                "Latitude": latp
            });
            $("#detailModal" + index + " a[href=#overview" + index + "]").tab('show');
        }, 500);
    }
    // 弹出窗口图片展示
}

function showMapLink(event, tt3, arr) {
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    var arr = _.rest(1, _.toArray(arguments));
    var index = $(tt3).attr("id").replace("maplink", "");
    $("#detailModal" + index + " a[href=#map" + index + "]").tab('show');
    $("#detailModal" + index).modal({
        show: true
    });

    var map = G("mapView" + index);
    if (!map.a) {
        var lng = $(tt3).attr("Lng");
        var lat = $(tt3).attr("Lat");
        setTimeout(function() {
            IniMap(map, {
                "Longitude": lng,
                "Latitude": lat
            });

            map.a = 1;
        }, 500)

    }
    // 弹出窗口图片展示
}

// 房间类型更改
$("#rtype button").click(function(e) {
    mReq.RoomType = $(e.currentTarget).attr("data-rtype");
    // console.log(mReq.RoomType )
    $(e.currentTarget).addClass('active').siblings().removeClass('active');
    getRoom(renderR);

});
// 租赁时间方式更改
$("#RentedType").change(function(e) {
    mReq.RentedType = $(e.currentTarget).val();
    getRoom(renderR);
});

$("#DSort").change(function(e) {
    mReq.PagingOrder = $(e.currentTarget).val();
    getRoom(renderR);
});

$("#BSearch").click(function(e) {
    var sAddress = $.trim($("#TAddress").val());
    if (!_.isEmpty(sAddress)) {
        mReq.Address = sAddress;
        mReq.City = sAddress;
        mapGetPoint(mReq.Address).then(function(data) {
            // 生成post 查询参数 
            $.extend(mReq, data);
            // 3.获取房间列表数据
            getRoom(renderR);

        }, function(err) {
            console.log("getPoint fail: ", err);
        });
    } else {
        return false;
    }

});
