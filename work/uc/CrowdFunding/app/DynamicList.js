/* 
 * @Author: Allen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   anchen
 * @Last Modified time: 2016-03-14 14:20:12
 */
'use strict';
require(['jquery', '_', './js/uc.ut', 'purl', "moment", "text!tpl/dynList.html", "loading"],
    function($, _, UT, purl, moment, dynList) {
        $(function() {

            $(".DynamicList").isLoading({
                text: "",
                position: "overlay"
            });
            var optDynList = {
                "name": '/cfproject/Dynamic/List',
                "data": ''
            };
            UT.jaxJson(optDynList).then(function (data) {
                _.each(data.Data, function(v, i){
                    v.opturl = ucConfig.ServerReferenceCrowdFunding + '/cfpdynamic/DynamicContent?id=' + v.LID;
                });
               
                var template = _.template(dynList);
                var tempdata = {
                    "datas": data.Data
                };
                $(".DynamicList").isLoading("hide");

                $(".DynamicList").append(template(tempdata));
            });

        });
    });
