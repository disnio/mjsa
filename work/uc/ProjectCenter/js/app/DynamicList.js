/* 
 * @Author: Allen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   czy
 * @Last Modified time: 2016-08-01 09:48:50
 */
'use strict';
require(['ut','purl', "moment", "text!tpl/dynList.html", "loading"],
    function(UT, purl, moment, dynList) {
        $(function() {

            $(".DynamicList").isLoading({
                text: "",
                position: "overlay"
            });
            var optDynList = {
                "name": '/cfproject/Dynamic/List',
                "data": ''
            };
            UT.jaxJson(optDynList).then(function(data) {
                var template = _.template(dynList);
                var tempdata = {
                    "datas": data.Data
                };
                $(".DynamicList").isLoading("hide");

                $(".DynamicList").append(template(tempdata));
            });

        });
    });
