/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-04 13:28:46
 */
'use strict';
require(['ut', 'purl', "moment", "text!tpl/projectTab.html", "text!tpl/businessModel.html", "text!tpl/projectTeams.html", "text!tpl/projectPerformances.html", "text!tpl/projectSchedules.html", "text!tpl/projectAttachments.html", "text!tpl/projectDynamics.html", "loading"],
    function(UT, purl, moment, projectTab, businessModel, projectTeams, projectPerformances, projectSchedules, projectAttachments, projectDynamics) {
        // 插入总模板
        $(function() {
            $("#projectTab").html(projectTab);

            $('.tab-pane:not("#GetProjectComments")').isLoading({
                text: "",
                position: "overlay"
            });
            // CFMyProjects/MyProject/55 及 CFProject/GetProjectBasis?id=7 不统一参数
            var url = purl();
            var bid = url.param("id") || url.segment(-1);

            // 商业模式
            var optBusinessModel = {
                "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                dataType: "json",
                "name": '/CFProject/GetProjectBusinessModel',
                "data": {
                    id: bid
                }
            };


            UT.jaxJson(optBusinessModel).then(function(data) {
                if (!_.isUndefined(data.Data)) {
                    var template = _.template(businessModel);

                    var tempdata = {
                        "item": data.Data
                    };
                    $(".tab-pane").isLoading("hide");

                    $('#GetProjectBusinessModel').empty().append(template(tempdata));
                } else {
                    $('#GetProjectBusinessModel').empty().text("暂无数据");
                }


            });

            // 股东团队
            var optProjectTeams = {
                "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                dataType: "json",
                "name": '/CFProject/GetProjectTeams',
                "data": {
                    id: bid
                }
            };

            UT.jaxJson(optProjectTeams).then(function(data) {
                $(".tab-pane").isLoading("hide");
                var template = _.template(projectTeams);
                var tempdata = {
                    "datas": data.Data
                };

                $('#GetProjectTeams tbody').empty().append(template(tempdata));
            });

            // 历史情况
            var optProjectPerformances = {
                "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                dataType: "json",
                "name": '/CFProject/GetProjectPerformances',
                "data": {
                    id: bid
                }
            };

            UT.jaxJson(optProjectPerformances).then(function(data) {
                var template = _.template(projectPerformances);

                _.each(data.Data, function(v, i) {
                    v.Amounts = (function() {
                        var cadd = 0,
                            csub = 0;
                        _.each(v.Accountings, function(k) {
                            if (k.Amount >= 0) {
                                cadd += k.Amount;
                            } else {
                                csub += k.Amount;
                            }

                        });
                        return {
                            cadd: cadd,
                            csub: csub
                        }
                    })();
                });

                var tempdata = {
                    "datas": data.Data
                };

                $('#GetProjectPerformances .info').empty().append(template(tempdata));
            });

            // 未来计划
            var optProjectSchedules = {
                "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                dataType: "json",
                "name": '/CFProject/GetProjectSchedules',
                "data": {
                    id: bid
                }
            };

            UT.jaxJson(optProjectSchedules).then(function(data) {
                var template = _.template(projectSchedules);
                _.each(data.Data, function(v, i) {
                    v.Amounts = (function() {
                        var cadd = 0,
                            csub = 0;
                        _.each(v.Accountings, function(k) {
                            if (k.Amount >= 0) {
                                cadd += k.Amount;
                            } else {
                                csub += k.Amount;
                            }

                        });
                        return {
                            cadd: cadd,
                            csub: csub
                        }
                    })();
                });
                var tempdata = {
                    "datas": data.Data
                };

                if (!_.isEmpty(data.Data)) {
                    $('#GetProjectSchedules .info').empty().append(template(tempdata));
                } else {
                    $('#GetProjectSchedules .info').empty().text("暂无数据");

                }


            });

            // 项目附件
            var optProjectAttachments = {
                "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                dataType: "json",
                "name": '/CFProject/GetProjectAttachments',
                "data": {
                    id: bid
                }
            };

            UT.jaxJson(optProjectAttachments).then(function(data) {
                var template = _.template(projectAttachments);
                var tempdata = {
                    "datas": data.Data
                };

                $('#GetProjectAttachments .tab1 tbody').empty().append(template(tempdata));
            });

            // 项目动态
            var optProjectDynamics = {
                "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                dataType: "json",
                "name": '/CFProject/GetProjectDynamics',
                "data": {
                    id: bid
                }
            };

            UT.jaxJson(optProjectDynamics).then(function(data) {
                var template = _.template(projectDynamics);
                var tempdata = {
                    "datas": data.Data
                };
                if (!_.isEmpty(data.Data)) {
                    $('#GetProjectDynamics').empty().append(template(tempdata));
                } else {

                    $('#GetProjectDynamics').empty().text("暂无数据");
                }
            });

        });
    });
