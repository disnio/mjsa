/* 
 * @Author: czy
 * @Date:   2016-07-22 15:43:25
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-09-20 13:17:59
 */

$(function() {

    //页面进来以列表形式显示全部项目
    //分页显示
    var totalOpt = function() {
        var MyproSpace = {};
        MyproSpace.SpaceID = SpaceID;
        MyproSpace.StageID = $("#StageID").val();
        MyproSpace.Status = $("#Status").val();
        MyproSpace.Name = $("#proName").val();
        MyproSpace.OrganizationID = OrganizationID;
        MyproSpace.CreationDateMin = $("#d4311").val();
        MyproSpace.CreationDateMax = $("#d4312").val();
        MyproSpace.PageIndex = 1;
        MyproSpace.PageSize = -1;




        var jaxOpt = {
            ajax: {
                "type": "post",
                "webUrl": ucConfig.ServerReferenceProjectCenterAPI,
                "name": '/CFProject/GerProjectListBySearchCondition',
                "dataType": "json",
                "data": MyproSpace
            },
            pageData: "",
            // 放置返回数据列表容器
            el: $("#Mypro-list"),
            // 列表模板
            tpl: $("#MyprojectListTpl").html(),
            // 分页插件
            pageFunc: $.fn.smartpaginator,
            // 分页
            page: {
                next: "下一页",
                prev: "上一页",
                first: "首页",
                last: "尾页",
                // 页码容器
                pageEl: $("#smart-paginator"),
                // 每页包含的数量
                perPage: 100,
                // 总页数
                numLen: 3
            },
            callback: function(data) {
                var _creatorid = CreatorID;
                var _spaceid = SpaceID;
                //申请入孵
                $(".pro-list").delegate('.js-applyrf', 'click', function(e) {
                    e.preventDefault();
                    var _projectid = $(this).attr("data-projectid");
                    //判断是否进行申请过入驻
                    var is_applyrf = {
                        "type": "get",
                        "baseUrl": ucConfig.ServerReferenceLocationCenterAPI,
                        "name": '/ProjectSpace/IsRFApply',
                        "dataType": "json",
                        "data": {
                            ProjectID: _projectid,
                            SpaceID: _spaceid
                        }
                    };

                    UT.jaxJson(is_applyrf).then(function(data) {
                        if (data.Success && data.Data == 1) {
                            //如果该项目未入孵,则调用入孵接口
                            var Modalrufu = $("#Modal-rufu").html();
                            UI.genSingleModal({
                                // 显示或隐藏关闭按钮
                                btnClose: false,
                                // 关闭按钮名称
                                btnCloseName: "取消",
                                btnSave: true,
                                btnSaveName: "确认",
                                // 弹窗标题
                                title: "请选择您打算入驻的众创空间",
                                // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
                                body: $(Modalrufu),
                                // 关闭按钮点击时运行
                                close: function(modal) {
                                    //console.log("close")
                                },
                                // 保存按钮点击是运行， modal 为传入的弹窗实例
                                save: function(modal) {

                                    var _SpaceID = $(".radioCrowdSpaceList:checked").val();
                                    console.log(_SpaceID);
                                    console.log("_SpaceID=" + _SpaceID);

                                    if (!_SpaceID || _SpaceID < 1) {
                                        UI.inTip("请选择项目");
                                        return false;
                                    } else {

                                    }
                                    if (!$("input:checkbox.cb-accept").is(":checked")) {
                                        UI.inTip("您必须理解并接受协议才能入住项目空间");
                                        return false;
                                    }


                                    var applyrf = {
                                        "type": "post",
                                        "baseUrl": ucConfig.ServerReferenceLocationCenterAPI,
                                        "name": '/ProjectSpace/ApplyProjectSpaceInSide',
                                        "dataType": "json",
                                        "data": {
                                            CFProjectID: _projectid,
                                            LCCrowdSpaceID: _SpaceID,
                                            ApplicantID: _creatorid,
                                            ApplicationType: 'rufu'
                                        }
                                    };

                                    UT.jaxJson(applyrf).then(function(data) {
                                        if (data.Success && data.Data > 0) {
                                            UI.inTip("申请入孵成功！");
                                        } else {
                                            UI.inTip("申请失败！");
                                        }
                                    });
                                },
                                // 弹窗打开后运行
                                callback: function(modal) {

                                    var optGetMyCFProjectSpace = {
                                        "type": "get",
                                        "baseUrl": ucConfig.ServerReferenceLocationCenterAPI,
                                        "name": '/CrowdSpace/GetManagerCrowdSpaceByOrganizationID',
                                        "contentType": "application/json",
                                        "dataType": "jsonp",
                                        "data": {
                                            OrganizationID: mangerOrganizationID
                                        }

                                    };
                                    UT.jaxJson(optGetMyCFProjectSpace).then(function(data) {
                                        console.log(data);
                                        $("#spacelist").empty().append(UT.tplRender($("#MarkerSpaceDetail").html(), {
                                            datas: data.Data.List
                                        }));
                                        $(".radioList").delegate('.radioCrowdSpaceList', 'change', function(event) {
                                            var hrefId = $(this).val();
                                            console.log("123456");
                                            $(".AgreementUrl").attr("href", ucConfig.ServerReferenceLocationCenter + "/CrowdSpace/AgreementShow?lid=" + hrefId);
                                        });

                                    });

                                }
                            });
                        }
                    });
                });
                //申请退孵
                $(".pro-list").delegate('.js-applytf', 'click', function(e) {
                    e.preventDefault();

                    var _projectid = $(this).attr("data-projectid");

                    //判断是否进行申请过退孵
                    var is_applytf = {
                        "type": "get",
                        "baseUrl": ucConfig.ServerReferenceLocationCenterAPI,
                        "name": '/ProjectSpace/IsTFApply',
                        "dataType": "json",
                        "data": {
                            ProjectID: _projectid,
                            SpaceID: _spaceid
                        }
                    };
                    console.log(is_applytf);
                    UT.jaxJson(is_applytf).then(function(data) {
                        if (data.Success && data.Data == 1) {

                            //申请退孵弹框
                            var Modaltuifu = $("#Modal-tuifu").html();
                            UI.genSingleModal({
                                // 显示或隐藏关闭按钮
                                btnClose: true,
                                // 关闭按钮名称
                                btnCloseName: "取消",
                                btnSave: true,
                                btnSaveName: "提交",
                                // 弹窗标题
                                title: "申请退孵",
                                // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
                                body: $(Modaltuifu),
                                // 关闭按钮点击时运行
                                close: function(modal) {},
                                // 保存按钮点击是运行， modal 为传入的弹窗实例
                                save: function(modal) {

                                    var _ApplicantReason = $("#tf-reason", modal).val();
                                    var _ImprovingSuggestion = $("#tf-suggest", modal).val();

                                    //如果该项目未申请退孵,则调用申请退孵
                                    var applyrf = {
                                        "type": "post",
                                        "baseUrl": ucConfig.ServerReferenceLocationCenterAPI,
                                        "name": '/ProjectSpace/ApplyProjectSpaceInSide',
                                        "dataType": "json",
                                        "data": {
                                            CFProjectID: _projectid,
                                            LCCrowdSpaceID: _spaceid,
                                            ApplicantID: _creatorid,
                                            ApplicationType: 'tuifu',
                                            ApplicantReason: _ApplicantReason,
                                            ImprovingSuggestion: _ImprovingSuggestion
                                        }
                                    };

                                    UT.jaxJson(applyrf).then(function(data) {
                                        if (data.Success && data.Data > 0) {
                                            UI.inTip("申请退孵成功！");
                                        } else {
                                            UI.inTip("申请失败！");
                                        }
                                    });
                                },
                                // 弹窗打开后运行
                                callback: function(modal) {
                                    $(".footer p", modal).click(function() {
                                        $(this).css("color", "red")
                                    })
                                }
                            });


                        } else {
                            //如果已经退孵,则提示消息
                            UI.inTip(data.Msg);
                        }
                    });

                });

                //申请项目融资
                $(".pro-list").delegate('.js-applyrongzi', 'click', function(e) {
                    e.preventDefault();
                    var _projectid = $(this).attr("data-projectid");
                    //判断是否进行申请过融资
                    var is_applyrz = {
                        "type": "get",
                        "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                        "name": '/CFProject/GetFinancingProject',
                        "dataType": "json",
                        "data": {
                            ID: _projectid
                        }
                    };
                    UT.jaxJson(is_applyrz).then(function(data) {
                        if (data.Success && data.Data == 1) {
                            var myrzHtml = $("#applyrz").html();
                            UI.genSingleModal({
                                // 显示或隐藏关闭按钮
                                btnClose: true,
                                // 关闭按钮名称
                                btnCloseName: "取消",
                                btnSave: true,
                                btnSaveName: "提交",
                                // 弹窗标题
                                title: "申请项目融资",
                                // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
                                body: $(myrzHtml),
                                // 关闭按钮点击时运行
                                close: function(modal) {
                                    //console.log("close")
                                },
                                // 保存按钮点击是运行， modal 为传入的弹窗实例
                                save: function(modal) {
                                    var amount = $("#amountNum", modal).val();
                                    var stockMin = $("#minNum", modal).val();
                                    var stockMax = $("#maxNum", modal).val();
                                    var reason = $("#to-text", modal).val();
                                    var interest = $("#interest", modal).val();
                                    var AccountID = $("#AccountID").val();
                                    var radioChecked = $("input[name='myfinancing']:checked", modal).val();
                                    
                                    $("#errorMsg").html("shuzi");
                                    var applyrongzi = {};
                                    if (radioChecked == 1) {
                                        applyrongzi = {
                                            "type": "post",
                                            "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                                            "name": '/CFProject/CreateProject',
                                            "dataType": "json",
                                            "data": {
                                                "ID": _projectid,
                                                "LCLocationID": _spaceid,
                                                "Creator.ID": _creatorid,
                                                "FinancingParty.ID": OrganizationID,
                                                "FinancingAmount": amount,
                                                "InvestmentCategory.ID": radioChecked,
                                                "StockFinancingInfo.CFInvestorShareProportionMin": stockMin,
                                                "StockFinancingInfo.CFInvestorShareProportionMax": stockMax,
                                                "StockFinancingInfo.CFFundFor": reason
                                            }
                                        };
                                    } else {
                                        applyrongzi = {
                                            "type": "post",
                                            "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                                            "name": '/CFProject/CreateProject',
                                            "dataType": "json",
                                            "data": {
                                                "ID": _projectid,
                                                "LCLocationID": _spaceid,
                                                "Creator.ID": _creatorid,
                                                "FinancingParty.ID": OrganizationID,
                                                "FinancingAmount": amount,
                                                "InvestmentCategory.ID": radioChecked,
                                                "DebtFinancingInfo.CFInvestorHighestInterestRates": interest,
                                                "DebtFinancingInfo.CFFundFor": reason
                                            }
                                        };
                                    }
                                    UT.jaxJson(applyrongzi).then(function(data) {
                                        console.log(data);
                                        UI.inTip(data.Msg);
                                    });
                                },

                                // 弹窗打开后运行
                                callback: function(modal, valid) {
                                    //融资方式不同，分别显示“股权稀释比例”和“可承担的最高利息”
                                    //默认显示“股权融资”
                                    $(".select-pane").hide();
                                    $(".select-pane.one").show();
                                    $(".fs-selected label").click(function() {
                                        var x = $(this).attr("data-val");
                                        $(".select-pane").hide();
                                        if (x == "1") {
                                            $(".one").show();
                                        } else {
                                            $(".two").show();
                                        }
                                    });
                                },
                                // cond: function(modal) {
                                //     // var amount = $("#amountNum", modal).val();

                                //     // if(amount!="" && parseFloat(amount)>=0){
                                //     //      return true;
                                //     // }else{
                                //     //     $("#errorMsg", modal).html("必须为数字");
                                //     //     return false;
                                //     // }

                                // },
                                before: function($modal){
                                    vaddon.gt;
                                    vaddon.lt;
                                },
                                valid: {
                                    form: "#rzform",
                                    rules: {
                                        amountnum: {
                                            required: true,
                                            // digits: true,
                                            greatzero: true,
                                        },
                                        minNum: {
                                            required: true,
                                            range:[0.001, 99.999],
                                            lt: "maxNum"
                                        },
                                        maxNum: {
                                            required: true,
                                            range:[0.001, 99.999],
                                            gt: "minNum"
                                        },
                                        interest: {
                                            required: "input[name='myfinancing']:checked",
                                            range:[0.001, 99.999]
                                        }
                                    },
                                    messages: {
                                        amountnum: {
                                            required: "融资需求必填",
                                            digits: "必须输入整数"
                                        },
                                        minNum: {                                            
                                            required: "股权稀释比例最大值必须填写",
                                            range: "股权稀释比例要大于0, 小于100"
                                        },
                                        maxNum: {
                                            required: "股权稀释比例最大值必须填写",
                                            range: "股权稀释比例要大于0, 小于100"
                                        },
                                        interest: {
                                            required: "必填",
                                            range:"可承担的最高利息要大于0, 小于100"
                                        }
                                    }
                                }
                            });

                        } else {
                            //如果已经申请融资,则提示消息
                            UI.inTip(data.Msg);
                        }
                    });
                });

                //申请毕业
                $(".pro-list").delegate('.js-applyBy', 'click', function(e) {
                    e.preventDefault();
                    var _projectid = $(this).attr("data-projectid");
                    var _creatorid = $(this).attr("data-creatorid");

                    //判断是否可进行项目毕业申请
                    var is_applyby = {
                        "type": "post",
                        "baseUrl": ucConfig.ServerReferenceLocationCenterAPI,
                        "name": '/ProjectSpace/IsApplyProjectGraduation',
                        "dataType": "json",
                        "data": {
                            CFProjectID: _projectid,
                            LocationID: _spaceid,
                            ApplicantID: _creatorid
                        }
                    };
                    UT.jaxJson(is_applyby).then(function(data) {
                        if (data.Success && data.Data == 1) {
                            var applyrongby = {};
                            applyrongby = {
                                "type": "post",
                                "baseUrl": ucConfig.ServerReferenceLocationCenterAPI,
                                "name": '/ProjectSpace/ApplyProjectGraduation',
                                "dataType": "json",
                                "data": {
                                    CFProjectID: _projectid,
                                    LocationID: _spaceid,
                                    ApplicantID: _creatorid
                                }
                            };
                            UT.jaxJson(applyrongby).then(function(data) {
                                UI.inTip(data.Msg);
                            });
                        } else {
                            //如果已经申请,则提示消息
                            UI.inTip(data.Msg);
                        }
                    });
                });
            },
            filterFn: function(data) {
                _.each(data.datas, function(v) {
                    v.CreationDate = moment(v.CreationDate).format("YYYY/MM/DD");
                });
            }
        };



        UT.jaxPage(jaxOpt);
    };
    totalOpt();
    //点击搜索精确查找
    $("#btn-search").click(function(e) {
        e.preventDefault();
        totalOpt();
    });
});
