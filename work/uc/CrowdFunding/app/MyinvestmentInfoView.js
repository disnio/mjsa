'use strict';
require(['ut', 'ui'], function(UT, UI) {
    $(function() {
        var investHTML = $("#investH").html();
        $(".js-table").delegate("input[name='updateInvestmentInfoStatus_Approved']", "click", function(e) {
            var _CFInvestmentInfoID = $(e.currentTarget).attr("fid");

            UI.genSingleModal({
                // 显示或隐藏关闭按钮
                btnClose: false,
                // 关闭按钮名称
                btnCloseName: "取消",
                btnSave: true,
                btnSaveName: "确认",
                // 弹窗标题
                title: "确认投资",
                // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
                body: investHTML,
                // 关闭按钮点击时运行
                close: function(modal) {
                    console.log("close")
                },
                // 保存按钮点击是运行， modal 为传入的弹窗实例
                save: function(modal) {
                    var _RealInvestmentAmount = $(".investsum", modal).val();
                    var _Status = $("input[name='hiddenInvestmentInfoStatus_Approved']").val();
                    var opt_Financing = {
                        "type": "post",
                        "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                        "name": '/CFInvestingParty/updateCFInvestmentInfoStatus',
                        "dataType": "json",
                        "data": {
                            CFInvestmentInfoID: _CFInvestmentInfoID,
                            Status: _Status,
                            RealInvestmentAmount: _RealInvestmentAmount,
                            OrganizationID: _OrgainzationID,
                            CreatorID: _AccountID

                        }
                    };
                    console.log("xx", opt_Financing.data)
                    if (!/\d+[\.]?\d*/.test(_RealInvestmentAmount)) {
                        alert("金额格式00.00万元");
                    } else {
                         UT.jaxJson(opt_Financing).then(function(data) {
                            console.log(data);
                            if (data.Success) {
                                $(e.currentTarget).parent().prev(".js-realInvestmentAmount").text(_RealInvestmentAmount);
                                $(e.currentTarget).prop("disable", true);
                                alert("操作成功!")
                            } else {
                                alert(data.ErrorMsg);
                            }
                         });
                    }


                },
                // 弹窗打开后运行
                callback: function(modal) {

                    // $(".modal-body span", modal).html($(self).siblings("input[name='AmountUnits" + _CFInvestmentInfoID + "']").val());
                    // $('.modal-header', modal).attr("pid", _CFInvestmentInfoID);
                    console.log(_CFInvestmentInfoID)

                }

            });

        });
    });
});
