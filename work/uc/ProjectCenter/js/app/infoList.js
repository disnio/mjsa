/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   czy
 * @Last Modified time: 2016-08-01 09:48:50
 */

'use strict';
require(['ut', "text!tpl/infoList.html"],
    function(UT, infoList) {
        var optInfoList = {
            "name":  '/CFNews/ListTop',
            "data": ''
        };
        UT.jaxJson(optInfoList).then(function(data) {
            var template = _.template(infoList);
            var tempdata = {
                "datas": data.Data
            };
            $(".infoList").append(template(tempdata));
        });

    }
);
