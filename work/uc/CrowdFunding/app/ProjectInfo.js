/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-05-27 09:18:25
 */

'use strict';
require(['jquery', '_', './js/uc.ut', 'purl', "text!tpl/projectBasicInfo.html", "moment"],
    function($, _, UT, purl, projectBasisInfo) {
        var url = purl();
        var id = url.param("id") || url.segment(-1);

        var optProjectBasisInfo = {
            "name":  '/CFProject/GetProjectBasis',
            "data": {
                id: id
            }
        };

        UT.jaxJson(optProjectBasisInfo).then(function(data) {
            _.each(data.Data, function(v){
                if(_.isUndefined(v)){
                    v = ''
                }
            });
            data.Data.CompanyEstablishingDate = data.Data.CompanyEstablishingDate ? moment(data.Data.CompanyEstablishingDate).format("YYYY-MM-DD"):"";

            data.Data.FinancingAmount = (data.Data.FinancingAmount / 10000).toFixed(0);
            data.Data.InvestmentAmount = (data.Data.InvestmentAmount / 10000).toFixed(0);
            data.Data.MinFollowInvestmentAmount = (data.Data.MinFollowInvestmentAmount / 10000).toFixed(0);
            data.Data.MinLeadInvestmentAmount = (data.Data.MinLeadInvestmentAmount / 10000).toFixed(0);

            var template = _.template(projectBasisInfo);
            var tempdata = {
                "item": data.Data
            };

            $('#ProjectDetail').empty().append(template(tempdata));
        });

        // $("#EditProjectBasis").attr("href", $("#EditProjectBasis").attr("href")+"@ViewBag.ID");
    }
);