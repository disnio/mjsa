/* 
 * @Author: czy
 * @Date:   2016-07-21 10:37:19
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-10 13:48:53
 */

'use strict';
require(['ut', 'ui', 'purl'], function(UT, UI, purl) {
    $(function() {
        $(".js-tou-xm").click(function() {
            var CreatorID = $("#CreatorID").val();
            var OrganizationID = $("#OrganizationID").val();
            var FinancingPartyID = $("#FinancingPartyID").val();
            var IsFinancingParty = $("input[name='IsFinancingParty']").val();
            var CFInvestmentCategoryID = $("input[name='CFInvestmentCategoryID']").val();
            if (!CreatorID || CreatorID == "0") {
                window.location = ucConfig.ServerReferenceUserCenter + "/Account/Login?FromAPP=" + encodeURIComponent(window.location.href);
                return false;
            } else if (!FinancingPartyID || FinancingPartyID == "0") {
                alert("您不是融资方,不能投递项目");
                return false;
            } else if (!IsFinancingParty || IsFinancingParty == "0") {
                alert("您不是融资方,不能投递项目");
                return false;
            }
            $('#myModal').modal('show');
            $("#FinancingPartyProject").empty();
            var optGetMyCFFund = {
                "type": "get",
                "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                "name": '/CFFinancingParty/GetMyCFProject',
                //"contentType": "application/json",
                "dataType": "json",
                "data": {
                    CreatorID: CreatorID,
                    OrganizationID: OrganizationID,
                    FinancingPartyID: FinancingPartyID,
                    CFInvestmentCategoryID: CFInvestmentCategoryID
                }
            };
            console.log(optGetMyCFFund.data)
            // UT.jaxJson(optGetMyCFFund, true).then(function(data) {
            //     console.log(data)
            //     var area = '';
            //     for (var i = 0; i < data.Data.length; i++) {
            //         area += '<option value=' + data.Data[i].CFProjectID + '>';
            //         area += data.Data[i].CFProjectName;
            //         area += '</option>';
            //     }
            //     $('#FinancingPartyProject').append(area);
            // });

        });

        $("#submit-Industrys").click(function() {
            var CFFundID = purl().param("id") || purl().segment(-1);
            console.log(CFFundID);
            var CreatorID = $("#CreatorID").val();
            var OrganizationID = $("#OrgainzationID").val();
            var CFProjectId = $("#FinancingPartyProject option:selected").val();
            var FinancingAmount = $("#FinancingAmount").val();
            var AmountUnits = $("#AmountUnits option:selected").val();
            var InvestmentReasons = $("#InvestmentReasons").val();
            var user = {};
            user.CFFundID = CFFundID;
            user.CFProjectId = CFProjectId;
            user.FinancingAmount = FinancingAmount;
            user.AmountUnits = AmountUnits;
            user.InvestmentReasons = InvestmentReasons;
            user.OrganizationID = OrganizationID;
            user.CreatorID = CreatorID;
            if (!user.CFFundID || user.CFFundID == "0") {
                alert("基金参数获取失败");
                return false;
            } else if (!user.CFProjectId || user.CFProjectId == "0") {
                alert("请选择融资项目");
                return false;
            } else if (!user.FinancingAmount || !/[1-9]\d*\.?\d*/.test(user.FinancingAmount)) {
                alert("金额格式00.00万元");
                return false;
            } else if (!user.InvestmentReasons || !/\S{2,200}/.test(user.InvestmentReasons)) {
                alert("请输入2-200字符长度的投资原因");
                return false;
            }

            var getOpt = {
                "type": "post",
                "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                "name": '/CFFinancingParty/AddCFFinancingInfo',
                //"contentType": "application/json",
                "dataType": "json",
                "data": user
            }
            UT.jaxJson(getOpt, true).then(function(data) {
                console.log(data);
                $('#myModal').on('hidden.bs.modal', function(e) {
                    if (data.ID >= 0) {
                        if (data.Success == false) {
                            alert("融资方式和基金类型不匹配，申请失败");
                        }
                        if (data.Success == true) {
                            alert("已提交申请，等待回复");
                        }
                    } else {
                        alert(data.ErrorMsg);
                    }

                });


            });
        });

        $(".btn-yttzf").click(function() {
            var FinancingPartyID = $("#FinancingPartyID").val();
            var IsFinancingParty = $("input[name='IsFinancingParty']").val();
            var OrganizationID = $("#OrgainzationID").val();
            var CreatorID = $("#CreatorID").val();
            var CFInvestmentCategoryID = $("input[name='CFInvestmentCategoryID']").val();
            if (!CreatorID || CreatorID == "0") {
                window.location = ucConfig.ServerReferenceUserCenter + "/Account/Login?FromAPP=" + encodeURIComponent(window.location.href);
                return false;
            } else if (!FinancingPartyID || FinancingPartyID == "0") {
                alert("您不是融资方,不能投递项目");
                return false;
            } else if (!IsFinancingParty || IsFinancingParty == "0") {
                alert("您不是融资方,不能投递项目");
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
                title: "约谈投资方",
                // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
                body: $(deliverHtml),
                // 关闭按钮点击时运行
                close: function(modal) {
                    console.log("close")
                },
                // 保存按钮点击是运行， modal 为传入的弹窗实例
                save: function(modal) {
                    var CFFundID = purl().param("id") || purl().segment(-1);
                    console.log(CFFundID)
                    var CreatorID = $("#CreatorID").val();
                    var OrganizationID = $("#OrgainzationID").val();
                    var CFProjectId = $("#FinancingPartyProjectid option:selected").val();
                    var Contents = $("#yt-state").val();

                    console.log("CFFundID=" + CFFundID + ",CFProjectId=" + CFProjectId + ",CreatorID=" + CreatorID + ",OrganizationID=" + OrganizationID + ",Contents=" + Contents);
                    var optYt = {
                        "type": "post",
                        "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                        "name": '/CFInvestingParty/AddFundInterviews',
                        //"contentType": "application/json",
                        "dataType": "json",
                        "data": {
                            CFFundID: CFFundID,
                            CreatorID: CreatorID,
                            OrganizationID: OrganizationID,
                            CFProjectId: CFProjectId,
                            Contents: Contents

                        }
                    }
                    UT.jaxJson(optYt, true).then(function(data) {
                        console.log(data);
                        if (data.Success && data.ID > 0) {
                            alert("约谈成功");
                        } else {
                            alert(data.ErrorMsg);
                        }
                    });
                },
                // 弹窗打开后运行
                callback: function(modal) {
                    $(".footer p", modal).click(function() {
                        $(this).css("color", "red")
                    })
                    console.log("callback");

                    // var CFProjectId = $("#FinancingPartyProjectid option:selected").val();

                    var optGetMyCFProject = {
                        "type": "get",
                        "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                        "name": '/CFFinancingParty/GetMyCFProject',
                        //"contentType": "application/json",
                        "dataType": "json",
                        "data": {
                            CreatorID: CreatorID,
                            OrganizationID: OrganizationID,
                            FinancingPartyID: FinancingPartyID,
                            CFInvestmentCategoryID: CFInvestmentCategoryID
                        }
                    }
                    UT.jaxJson(optGetMyCFProject, true).then(function(data) {
                        var getarea = '';
                        for (var i = 0; i < data.Data.length; i++) {
                            getarea += '<option value=' + data.Data[i].CFProjectID + '>';
                            getarea += data.Data[i].CFProjectName;
                            getarea += '</option>';
                        }
                        $('#FinancingPartyProjectid').append(getarea);
                    });

                }

            });
        });

        $(".fund-collect").click(function() {
            var CFFundID = purl().param("id") || purl().segment(-1);
            console.log(CFFundID);
            var CreatorID = $("#CreatorID").val();
            if (!CreatorID || CreatorID == "0") {
                //window.location = ucConfig.ServerReferenceUserCenter + "/Account/Login?FromAPP=" + encodeURIComponent(window.location.href);
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
            UT.jaxJson(optCollect, true).then(function(data) {
                console.log(data);
                if (data.Success && data.ID > 0) {
                    alert("收藏成功");
                } else {
                    alert(data.ErrorMsg);
                }

            });
        });

    });
});
