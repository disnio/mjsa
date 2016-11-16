
'use strict';
require(['ut'], function (UT) {
    $(function () {
        $("input[name='updateFinancingInfoStatus_Approved']").bind("click", function () {
            $('#myModal').modal('show');
            var _CFFinancingInfoID = $(this).parents("tr").find("td > input[name='hiddenCFFinancingInfoID']").val();
            $('#myModal .modal-header').attr("pid", _CFFinancingInfoID);
        });
        $(".btn-invest").bind("click", function () {
            var  _CFFinancingInfoID = $('#myModal .modal-header').attr("pid")
            var _RealFinancingAmount = $("#myModal .investsum").val();
            var _Status = $("input[name='hiddenFinancingInfoStatus_Approved']").val();
            console.log(_CFFinancingInfoID);
            updateFinancingInfoStatusAjax(_CFFinancingInfoID, _Status, _AccountID, _OrgainzationID, _RealFinancingAmount);
        })
        $("input[name='updateFinancingInfoStatus_NotApproved']").bind("click", function () {
            var _CFFinancingInfoID = $(this).parents("tr").find("td > input[name='hiddenCFFinancingInfoID']").val();
            var _RealFinancingAmount = 0;
            var _Status = $("input[name='hiddenFinancingInfoStatus_NotApproved']").val();
            $(".btn-refuse").bind("click", function () {
                updateFinancingInfoStatusAjax(_CFFinancingInfoID, _Status, _AccountID, _OrgainzationID,_RealFinancingAmount);
            })
        });


        function updateFinancingInfoStatusAjax(_CFFinancingInfoID, _Status, _AccountID, _OrgainzationID, _RealFinancingAmount) {
            console.log("_AccountID=" + _AccountID + ",_OrgainzationID=" + _OrgainzationID + ",_CFFinancingInfoID=" + _CFFinancingInfoID + ",_Status=" + _Status);
            var opt_Financing = {
                "type": "post",
                "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                "name": '/CFInvestingParty/updateCFFinancingInfoStatus',
                //"contentType": "application/json",
                "dataType": "json",
                "data": {
                    CFFinancingInfoID: _CFFinancingInfoID,
                    Status: _Status,
                    RealFinancingAmount: _RealFinancingAmount,
                    OrganizationID: _OrgainzationID,
                    CreatorID: _AccountID
                }
            };
            console.log("123");
            UT.jaxJson(opt_Financing).then(function (data) {
                console.log(data);
                if (data.Success) {
                    $("tr[pid='@(item.CFFinancingInfoID)'] td").eq(9).html(_RealFinancingAmount);
                    $("tr>td#deal" + _CFFinancingInfoID+" input[type='button']").hide();
                }
                else {
                    alert(data.ErrorMsg);
                }
            })
        }
    })

});
