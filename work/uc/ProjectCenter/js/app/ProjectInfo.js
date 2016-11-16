/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-03 14:17:11
 */

'use strict';
require(['ut', 'purl', "text!tpl/projectBasicInfo.html", 'moment'],
    function (UT, purl, projectBasisInfo) {
        var url = purl();
        var id = url.param("id") || url.segment(-1);

        var optProjectBasisInfo = {
            "baseUrl": ucConfig.ServerReferenceProjectCenterAPI,
            "dataType": 'jsonp',
            "name": '/CFProject/GetProjectBasis',
            "data": {
                id: id
            }
        };

        UT.jaxJson(optProjectBasisInfo).then(function (data) {
            data.Data.CompanyEstablishingDate = moment(data.Data.CompanyEstablishingDate).format("YYYY-MM-DD");

            data.Data.FinancingAmount = (data.Data.FinancingAmount / 10000).toFixed(0);
            data.Data.InvestmentAmount = (data.Data.InvestmentAmount / 10000).toFixed(0);
            data.Data.MinFollowInvestmentAmount = (data.Data.MinFollowInvestmentAmount / 10000).toFixed(0);
            data.Data.MinLeadInvestmentAmount = (data.Data.MinLeadInvestmentAmount / 10000).toFixed(0);
            data.Data.EditUrl = ucConfig.ServerReferenceProjectCenter + "/CFMyProjects/EditProjectBasis/" + data.Data.Id;

            data.Data.IsEdit = true;
            if (data.Data.StatusID == 2 || data.Data.StatusID == 4) {
                data.Data.IsEdit = false;
            }

            var template = _.template(projectBasisInfo);
            var tempdata = {
                "item": data.Data
            };

            $('#ProjectDetail').empty().append(template(tempdata));
        });

        // $("#EditProjectBasis").attr("href", $("#EditProjectBasis").attr("href")+"@ViewBag.ID");
    }
);