/* 
* @Author: whj
* @Date:   2016-08-05 09:14:33
* @Last Modified by:   Allen
* @Last Modified time: 2016-08-10 14:11:03
*/

'use strict';
require(['ut'], function (UT) {
    $(function () {
        var AccountID = $("input#CreatorID").val();
        $("input[name='updateCFFundForManagement_Approved']").bind("click", function (e) {
            var _Status = $("input[name='hiddenCFFundForManagement_Approved']").val();
            var _CFFundID = $(this).parent().siblings().children("input").val();
            console.log(_CFFundID);
            if (!!AccountID) {
                FundManagementStatus(_CFFundID, _Status, _AccountID);
            }
            else {
                alert("请登录");
            }
        });
        $("input[name='updateCFFundForManagement_NotApproved']").bind("click", function (e) {
            var _Status = $("input[name='hiddenCFFundForManagement_NotApproved']").val();
            var _CFFundID = $(this).parent().siblings().children("input").val();
            if (!!AccountID) {
                FundManagementStatus(_CFFundID, _Status, _AccountID);
            }
            else {
                alert("请登录");
            }
        });


        function FundManagementStatus(_CFFundID, _Status, _AccountID) {
            var opt_FundManagementStatus = {
                "type": "post",
                "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                "name": '/CFInvestingParty/FundManagementStatus',
                "dataType": "json",
                "data": {
                    CFFundID: _CFFundID,
                    Status: _Status,
                    AccountID: _AccountID
                }

            };
            UT.jaxJson(opt_FundManagementStatus, true).then(function (data) {
                console.log(data)
                if (data.Success && data.CFFundID > 0) {
                    alert("操作成功");
                } else {
                    alert(data.ErrorMsg);
                }

            });
        };
    });
});