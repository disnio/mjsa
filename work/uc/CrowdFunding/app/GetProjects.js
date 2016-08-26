/* 
 * @Author: Allen
 * @Date:   2015-12-04 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-12 15:25:00
 */

'use strict';
require(['ut', 'purl', "loading", "smartpaginator", "imgLiquid"],
    function(UT) {
        // 获取分类检索的城市
        var optxmcity = {
            "name": '/CFProject/ProjectsCityList',
            "data": '',
            dataType:"json",            
        };

        UT.jaxJson(optxmcity).then(function(data) {
            var template = _.template($("#zcxm-city").html());
            var tempdata = {
                "datas": data.Data
            };
            $(".fl-city dd").append(template(tempdata));
        });

        var optxmhang = {
            "name": '/CFProject/ProjectsIndustryList',
            "data": ''
        };

        UT.jaxJson(optxmhang).then(function(data) {
            var template = _.template($("#zcxm-hang").html());
            _.each(data.Data, function(v, i) {

            });
            var tempdata = {
                "datas": data.Data
            };
            $(".fl-hang dd").append(template(tempdata));
        });

        var flxmCity = {},
            flxmHang = {},
            sortInfo = {},
            pagingInfo = {
                "PageSize": 5,
                "PageIndex": 1
            },
            xmingResPagingInfo = {},
            xmedResPagingInfo = {};
        // 注册点击事件给行业和城市，获取相关查询属性
        $(".categoryList").delegate('dd a', 'click', function(e) {
            var curEl = $(e.currentTarget);
            var dlp = curEl.closest('dl');

            if (dlp.hasClass("fl-city")) {
                flxmCity.ID = curEl.attr("city-id");
                flxmCity.Name = curEl.text();
                flxmCity.Vale = curEl.attr("city-value");
            } else {
                flxmHang.ID = curEl.attr("hang-id");
                flxmHang.Name = curEl.text();
                flxmHang.Vale = curEl.attr("hang-value");
            }
            curEl.siblings('a').removeClass("active");
            curEl.addClass('active');
            getXmList();

        });
        // 页面数据预填
        $(".filterBar li").bind("click", function(e) {
            e.preventDefault();

            var El = $(this);
            var Ela = El.find('a');
            var Eli = El.find('i');
            Ela.addClass('ct_8');
            El.siblings('li').find('a').removeClass("ct_8");
            sortInfo.SortName = El.attr("info");

            if (Eli.hasClass("fa-long-arrow-down")) {
                sortInfo.SortDirection = "Asc";
                Eli.removeClass("fa-long-arrow-down");
                Eli.addClass("fa-long-arrow-up");
            } else {
                sortInfo.SortDirection = "Desc";
                Eli.removeClass("fa-long-arrow-up");
                Eli.addClass("fa-long-arrow-down");
            }
            getXmList();
        });
        // 模板对象，进度显示，获取数据，填充模板，分页
        // 填充项目模板
        var renderXm = function(id, data) {
            $("#" + id).empty();
            if (id === "xming") {
                $.extend(xmingResPagingInfo, data.PagingInfo);
                if (_.isEmpty(data.Data)) {
                    $('#paging').hide();
                } else {
                    $('#paging').show();
                }
            }

            if (id === "xmed") {
                $.extend(xmedResPagingInfo, data.PagingInfo);
                if (_.isEmpty(data.Data)) {
                    $('#paged').hide();
                } else {
                    $('#paged').show();
                }
            }

            var template = _.template($("#zcxm").html());
            var tempdata = {
                "datas": data.Data
            };
            $('#' + id).append(template(tempdata));
            $(".imgLiquidFill").imgLiquid({
                fill: false
            });

        };
        var getXmList = function() {
            // 进行中
            getXm(0,  "/CFProject/GetPorojectsByCondition", pagingInfo).then(function(data) {
                // console.log("resPagingInfo:", xmingResPagingInfo)
                // renderXm("xming", data);
                $('#paging').smartpaginator({
                    totalrecords: xmingResPagingInfo.Total,
                    recordsperpage: xmingResPagingInfo.PageSize,
                    length: 2,
                    next: '下一页',
                    prev: '上一页',
                    first: '第一页',
                    last: '末页',
                    theme: 'green',
                    controlsalways: false,
                    display: 'single',
                    onchange: function(newPage) {
                        // $('#pagings').html('Page ings # ' + newPage);
                        xmingResPagingInfo.PageIndex = newPage;
                        getXm(0,  "/CFProject/GetPorojectsByCondition", xmingResPagingInfo);
                    }
                });
            });
            getXm(1, "/CFProject/GetPorojectsByCondition", pagingInfo).then(function(data) {
                // console.log("resPagingInfo:", xmingResPagingInfo)
                // renderXm("xmed", data);

                $('#paged').smartpaginator({
                    totalrecords: xmedResPagingInfo.Total,
                    recordsperpage: xmedResPagingInfo.PageSize,
                    length: 2,
                    next: '下一页',
                    prev: '上一页',
                    first: '第一页',
                    last: '末页',
                    theme: 'green',
                    controlsalways: false,
                    display: 'single',
                    onchange: function(newPage) {
                        // $('#pagings').html('Page ings # ' + newPage);
                        xmedResPagingInfo.PageIndex = newPage;
                        getXm(1, "/CFProject/GetPorojectsByCondition", xmedResPagingInfo);
                    }
                });
            });
            // getXm(2, "/CFProject/GetPorojectsByCondition", pagingInfo).then(function(data){
            //     console.log("getXm2: ", data);
            // })
        };
        // 获取数据填充完后返回
        var getXm = function(type, path, pageOpt) {
            var defer = $.Deferred();
            var optxm = {
                "name": path,
                "data": {
                    "Type": type,
                    "City": {
                        "ID": flxmCity.ID || 0,
                        "Name": flxmCity.Name || '',
                        "Value": flxmCity.Value || ''
                    },
                    "Industry": {
                        "ID": flxmHang.ID || 0,
                        "Name": flxmHang.Name || '',
                        "Value": flxmHang.Value || ''
                    },
                    "SortingInfo": [{
                        "SortName": sortInfo.SortName,
                        "SortDirection": sortInfo.SortDirection
                    }],
                    "PagingInfo": {
                        "PageSize": pageOpt.PageSize,
                        "PageIndex": pageOpt.PageIndex,
                        "Total": pageOpt.Total
                    }
                }
            };
            $("#xmed").isLoading({
                text: "",
                position: "overlay"
            });

            // 获取数据后应该进行分页
            UT.jaxJson(optxm).then(function(data) {
                $("#xmed").isLoading("hide");

                if (type === 0) {
                    renderXm("xming", data);
                }
                if (type === 1) {
                    renderXm("xmed", data);
                }
                // if ( type === 2 ){
                //     console.log("type2: ", data);
                // }
                defer.resolve(data);
            });

            return defer;
        };

        getXmList();

    }
);
