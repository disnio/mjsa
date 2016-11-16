/* 
* @Author: whj
* @Date:   2016-08-05 09:14:33
* @Last Modified by:   Allen
* @Last Modified time: 2016-08-09 15:54:56
*/
require(['ut'], function (UT) {
    $(function () {
        //点击接受按钮
        $("input[name='updateInvestmentInfoStatus_Accepted']").bind("click", function (e) {
            var _Status = $("input[name='hiddenInvestmentInfoStatus_Accepted']").val();
            var _CFInvestmentInfoID = $(this).parent().siblings().children("input").val();
            var _FinancingPartyID = $("input[name='FinancingPartyID'").val();
            var _OrganizationID = $("input[name='OrgainzationID'").val();
            var _CreatorID = $("input[name='CreatorID'").val();
            console.log(_CFInvestmentInfoID);
            if (!!_CreatorID && _CreatorID != "0") {
                updateCFInvestmentInfoStatus(_CFInvestmentInfoID, _Status, _FinancingPartyID, _OrganizationID, _CreatorID)
            }
            else {
                alert("请登录");
            }
        });
        //点击拒绝按钮
        $("input[name='updateInvestmentInfoStatus_NotAccepted']").bind("click", function (e) {
            var _Status = $("input[name='hiddenInvestmentInfoStatus_NotAccepted']").val();
            var _CFInvestmentInfoID = $(this).parent().siblings().children("input").val();
            var _FinancingPartyID = $("input[name='FinancingPartyID'").val();
            var _OrganizationID = $("input[name='OrgainzationID'").val();
            var _CreatorID = $("input[name='CreatorID'").val();
            console.log(_CFInvestmentInfoID);

            if (!!_CreatorID && _CreatorID != "0") {
                updateCFInvestmentInfoStatus(_CFInvestmentInfoID, _Status, _FinancingPartyID, _OrganizationID, _CreatorID)
            }
            else {
                alert("请登录");
            }
        });

        //点击确定按钮
        $("input[name='updateInvestmentInfoStatus_Confirmed']").bind("click", function (e) {
            var _Status = $("input[name='hiddenInvestmentInfoStatus_Confirmed']").val();
            var _CFInvestmentInfoID = $(this).parent().siblings().children("input").val();
            var _FinancingPartyID = $("input[name='FinancingPartyID'").val();
            var _OrganizationID = $("input[name='OrgainzationID'").val();
            var _CreatorID = $("input[name='CreatorID'").val();
            console.log(_CFInvestmentInfoID);
            if (!!_CreatorID && _CreatorID != "0") {
                updateCFInvestmentInfoStatus(_CFInvestmentInfoID, _Status, _FinancingPartyID, _OrganizationID, _CreatorID)

            }
            else {
                alert("请登录");
            }
        });
        function updateCFInvestmentInfoStatus(_CFInvestmentInfoID, _Status, _FinancingPartyID, _OrganizationID, _CreatorID) {
            var opt_FundManagementStatus = {
                "type": "post",
                "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                "name": '/CFFinancingParty/updateCFInvestmentInfoStatus',
                "dataType": "json",
                "data": {
                    Status: _Status,
                    CFInvestmentInfoID: _CFInvestmentInfoID,
                    FinancingPartyID: _FinancingPartyID,
                    OrganizationID: _OrganizationID,
                    CreatorID: _CreatorID
                }

            };
            UT.jaxJson(opt_FundManagementStatus, true).then(function (data) {
                console.log(data);
                if (data.Success) {
                    alert("操作成功");
                    window.location.reload();
                } else {
                    alert(data.ErrorMsg);
                }

            });
        };
    });
});