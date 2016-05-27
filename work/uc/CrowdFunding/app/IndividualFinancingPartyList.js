/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-04-14 16:50:05
 */


'use strict';
require(['jquery', '_', './js/uc.ut' ,'loading'], function($, _, UT, purl, loading) {
    $(function () {
        $(".partyListDetail").click(function (e) {

            console.log($(this).attr("data-lid"));

            var optIncubator = {
                "name": '/CFFinancingParty/PersonalInfo',
                "data": { LID: $(this).attr("data-lid") }
            };

            UT.jaxJson(optIncubator).then(function (data) {
                var template = _.template($("#individualTemplate").html());
                var tempdata = {
                    "item": data.Data
                };

                if (data.Data.IsExistAccount == false) {
                    $(".modal-body").empty().append("个人信息不存在。");
                }
                else {
                    $(".modal-body").empty().append(template(tempdata));
                }

                $("#detailDialog").modal('show').css("width:500px;");
            });

        });
    });
});
