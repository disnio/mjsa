/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-05-31 10:37:06
 */


'use strict';
require(['ut' ,'loading'], function(UT, purl, loading) {
    $(function() {
        // 轮播
        var optSlide = {
            "name": '/cfpicture/advimages',
            "data": ''
        };
        $(".carousel-control").hide();
        $('#carousel-example-generic').isLoading({
            text: "",
            position: "overlay"
        });

        UT.jaxJson(optSlide).then(function(data) {

            var template = _.template($("#imgBannerT").html());
            var tempdata = {
                "imgs": data
            };
            $('#carousel-example-generic').isLoading("hide");

            $('#carousel-example-generic').empty().append(template(tempdata));
            $(".carousel-control").show();
        });

        // 首页项目概况
        var optxm = {
            "name": '/CFProject/ProjectsSummary',
            "data": ''
        };

        UT.jaxJson(optxm).then(function(data) {
            data.FinanacingAmountTotal = (data.FinanacingAmountTotal / 10000).toFixed(2);
            var template = _.template($("#pt").html());
            var tempdata = {
                "item": data
            };
            $(".MallCount").append(template(tempdata));
        });

        // 最新资讯
        $('.pane-content').isLoading({
            text: "",
            position: "overlay"
        });

        $(".tab-content .btn").hide();
        var optHotNews6 = {
            "name": '/cfnews/list',
            "data": {
                newstype: 6
            }
        };

        UT.jaxJson(optHotNews6).then(function(data) {
            _.each(data.Data, function(item) {
                item.NewsContent = item.NewsContent.substr(0, 80) + "...";
                item.CreationTime = item.CreationTime.split('.')[0].replace(/T/, ' ');
            });

            var template = _.template($("#hotNewsT").html());
            var tempdata = {
                "hotNews": data.Data
            };
            $('.pane-content').isLoading("hide");
            $(".tab-content btn").show();

            $('#homeContent').empty().append(template(tempdata));
        });

        // 媒体报道
        var optHotNews7 = {
            "name": '/cfnews/list',
            "data": {
                newstype: 7
            }
        };

        UT.jaxJson(optHotNews7).then(function(data) {
            _.each(data.Data, function(item) {
                item.NewsContent = item.NewsContent.substr(0, 80) + "...";
                item.CreationTime = item.CreationTime.split('.')[0].replace(/T/, ' ');
            });
            $('.pane-content').isLoading("hide");

            var template = _.template($("#hotNewsT").html());
            var tempdata = {
                "hotNews": data.Data
            };

            $('#profileContent').empty().append(template(tempdata));
        });

        // 最新上线项目 已改为后端实现
        // cfproject/SucceedProjectList    
        // var optLastPro = {
        //     "name":  '/CFProject/LatestProjectList',
        //     "data": ''
        // };

        // UT.jaxJson(optLastPro).then(function(data) {
        //     _.each(data.Data, function(item) {
        //         item.PlanAmount = (item.PlanAmount / 10000).toFixed(0);
        //         item.MinInvestAmount = (item.MinInvestAmount / 10000).toFixed(0);
        //         item.ProjectIntroduction = $(item.ProjectIntroduction).text().substr(0, 80);
        //     });
        //     var template = _.template($("#lastProT").html());
        //     var tempdata = {
        //         "lastProjects": data.Data
        //     };
        //     $('#latestProject').empty().append(template(tempdata));
        // });

        //热门认投 已改为后端实现
        // var optHotPro = {
        //     "name":  '/CFProject/hotprojectlist',
        //     "data": ''
        // };

        // UT.jaxJson(optHotPro).then(function(data) {
        //     _.each(data.Data, function(item) {
        //         item.FinishedAmount = (item.FinishedAmount / 10000).toFixed(0);
        //         item.PlanAmount = (item.PlanAmount / 10000).toFixed(0);
        //         item.MinInvestAmount = (item.MinInvestAmount / 10000).toFixed(0);
        //     });

        //     var template = _.template($("#hotProT").html());
        //     var tempdata = {
        //         "hotProjects": data.Data
        //     };
        //     $('#hotProject').empty().append(template(tempdata));
        // });


    });
});
