/* 
 * @Author: whj
 * @Date:   2016-07-26 09:37:19
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-10 17:13:30
 */

'use strict';
require(['ut', 'purl'], function (UT, purl) {
    $(function () {
        $(".js-shen-tz").click(function(){
                var CreatorID = $("#CreatorID").val();
                var OrganizationID = $("#OrgainzationID").val();
                var InvestingPartyID = $("#InvestingPartyID").val();
                var CFInvestmentCategoryID = $(this).siblings("input[name=CFInvestmentCategoryID]").val();
                var InvestmentCategoryName = $(this).siblings("input[name=InvestmentCategoryName]").val();
                $("#CFInvestmentCategoryIDinput").val(InvestmentCategoryName);
                console.log(InvestmentCategoryName)
                if (!CreatorID || CreatorID == "0") {
                    window.location = ucConfig.ServerReferenceUserCenter + "/Account/Login?FromAPP=" + encodeURIComponent(window.location.href);
                    return false;
                }
                else if (!InvestingPartyID || InvestingPartyID == "0") {
                    alert("您不是投资方,不能申请投资");
                    return false;
                }
                $('#myModal').modal('show');

                $("#CFInvestmentCategoryID").empty();
                var optGetCFInvestmentCategory = {
                    "type": "get",
                    "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                    "name": '/CFInvestingParty/GetCFInvestmentCategory',
                    //"contentType": "application/json",
                    "dataType": "jsonp"
                }
                UT.jaxJson(optGetCFInvestmentCategory).then(function (data) {
                  
                });
                //绑定基金
                $("#FinancingPartyProject").empty();
                var optGetMyCFFund = {
                    "type": "get",
                    "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                    "name": '/CFInvestingParty/GetMyCFFund',
                    "dataType": "json",
                    "data": {
                        CreatorID: CreatorID,
                        OrganizationID: OrganizationID,
                        CFInvestmentCategoryID:CFInvestmentCategoryID,
                        InvestmentCategoryName:InvestmentCategoryName
                    }
                }
                UT.jaxJson(optGetMyCFFund, true).then(function (data) {
                    var area = '';
                    for (var i = 0; i < data.Data.length; i++) {
                        area += '<option value=' + data.Data[i].CFFundID + '>';
                        area += data.Data[i].CFFundName;
                        area += '</option>';
                    }
                    $('#FinancingPartyProject').append(area);
                });


        });

        $("#submit-Industrys").click(function () {
            var CFProjectId = purl().param("id") || purl().segment(-1);
            var CreatorID = $("#CreatorID").val();
            var OrganizationID = $("#OrganizationID").val();
            var CFFundId = $("#FinancingPartyProject option:selected").val();
            var InvestmentAmount = $("#InvestmentAmount").val();
            var AmountUnits = $("#AmountUnits option:selected").val();
            var InvestmentReasons = $("#InvestmentReasons").val();
            var CFInvestmentCategoryID = $("#CFInvestmentCategoryID option:selected").val();
            var user = {};
            user.CFFundID = CFFundId;
            user.CFProjectId = CFProjectId;
            user.InvestmentAmount = InvestmentAmount;
            user.AmountUnits = AmountUnits;
            user.InvestmentReasons = InvestmentReasons;
            user.OrganizationID = OrganizationID;
            user.CreatorID = CreatorID;
            user.CFInvestmentCategoryID = CFInvestmentCategoryID;
            if (!user.CFFundID || user.CFFundID == "0") {
                alert("请选择投资基金");
                return false;
            }
            else if (!user.CFProjectId || user.CFProjectId == "0") {
                alert("项目参数获取失败");
                return false;
            }
            else if (!user.InvestmentAmount || !/[1-9]\d*\.?\d*/.test(user.InvestmentAmount)) {
                alert("金额格式00.00万元");
                return false;
            }
            else if (!user.InvestmentReasons || !/\S{2,200}/.test(user.InvestmentReasons)) {
                alert("请输入2-200字符长度的投资原因");
                return false;
            }
            var getOpt = {
                "type": "post",
                "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                "name": '/CFInvestingParty/AddCFInvestmentInfo',
                "dataType": "json",
                "data": user
            }
            console.log("CFFundID=" + user.CFFundID);
            UT.jaxJson(getOpt, true).then(function (data) {
                console.log(data);
                $('#myModal').on('hidden.bs.modal', function (e) {
                    if (data.ID >= 0) {
                        if (data.Success == false) {
                            alert("投资方式和基金类型不匹配，申请失败");
                        }
                        if (data.Success == true) {
                            alert("已提交申请，等待回复");
                        }
                    }
                    else {
                        alert(data.ErrorMsg);
                    }

                });


            });
        })

        $(".btn-yt").click(function () {
            var CreatorID = $("#CreatorID").val();
            var InvestingPartyID = $("#InvestingPartyID").val();
            var CFInvestmentCategoryID = $(this).siblings("input[name=CFInvestmentCategoryID]").val();
            console.log(CFInvestmentCategoryID)
            if (!CreatorID || CreatorID == "0") {
                alert("请登录");
                return false;
            }
            else if (!InvestingPartyID || InvestingPartyID == "0") {
                    alert("您不是投资方,不能申请投资");
                    return false;
                }
            var deliverHtml = $("#ytHtml").html();
            UI.genSingleModal({
                // 显示或隐藏关闭按钮
                btnClose: false,
                // 关闭按钮名称
                btnCloseName: "取消",
                btnSave: true,
                btnSaveName: "提交申请",
                // 弹窗标题
                title: "约谈融资方",
                // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
                body: $(deliverHtml),
                // 关闭按钮点击时运行
                close: function (modal) {
                    console.log("close")
                },
                // 保存按钮点击是运行， modal 为传入的弹窗实例
                save: function (modal) {
                    var CFProjectId = purl().param("id") || purl().segment(-1);
                    var CreatorID = $("#CreatorID").val();
                    console.log(CreatorID)
                    var OrganizationID = $("#OrgainzationID").val();
                    console.log(OrganizationID)
                    var CFFundID = $("#InvestingPartyInvestor option:selected").val();
                    var Contents = $("#yt-state").val();
                    
                    var optYt = {
                        "type": "post",
                        "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                        "name": '/CFInvestingParty/AddFundInterviews',
                        "dataType": "json",
                        "data": {
                            CFFundID: CFFundID,
                            CreatorID: CreatorID,
                            OrganizationID: OrganizationID,
                            CFProjectId: CFProjectId,
                            Contents: Contents

                        }
                    }
                    UT.jaxJson(optYt, true).then(function (data) {
                        console.log(data);
                        if (data.ID >= 0) {
                            if (data.Success == false) {
                                alert("您已经约谈过,请勿重复约谈");
                            }
                            if (data.Success == true) {
                                alert("已提交申请，等待回复");
                            }
                        } else {
                            alert(data.ErrorMsg);
                        }
                    });
                },
                // 弹窗打开后运行
                callback: function (modal) {
                    $(".footer p", modal).click(function () {
                        $(this).css("color", "red")
                    })
                    console.log("callback");
                    var FinancingPartyID = $("#InvestingPartyID").val();
                    var OrganizationID = $("#OrgainzationID").val();
                    var CreatorID = $("#CreatorID").val();
                
                    //绑定基金
                    $("#FinancingPartyProject").empty();
                    var optGetMyCFProject = {
                        "type": "get",
                        "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                        "name": '/CFInvestingParty/GetMyCFFund',
                        "dataType": "json",
                        "data": {
                            CreatorID: CreatorID,
                            OrganizationID: OrganizationID,
                            CFInvestmentCategoryID:CFInvestmentCategoryID
                        }
                    }

                    UT.jaxJson(optGetMyCFProject, true).then(function (data) {
                        console.log(data)
                        var getarea = '';
                        for (var i = 0; i < data.Data.length; i++) {
                            getarea += '<option value=' + data.Data[i].CFFundID + '>';
                            getarea += data.Data[i].CFFundName;
                            getarea += '</option>';
                        }

                        $('#InvestingPartyInvestor').append(getarea);
                    });

                }

            });
        })


        $(".financing-collect").click(function () {
            var CFFundID = purl().param("id") || purl().segment(-1);
            console.log(CFFundID);
            var CreatorID = $("#CreatorID").val();
            if (!CreatorID || CreatorID == "0") {
                alert("请登录");
                return false;
            }
            var optCollect = {
                "type": "post",
                "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                "name": '/CFInvestingParty/AddFundCollect',
                //"contentType": "application/json",
                "dataType": "json",
                "data": {
                    CFFundID: CFFundID,
                    CreatorID: CreatorID

                }
            }
            UT.jaxJson(optCollect, true).then(function (data) {
                console.log(data);
                if (data.Success && data.ID > 0) {
                    alert("收藏成功");
                } else {
                    alert(data.ErrorMsg);
                }

            });
        });
    })

});
