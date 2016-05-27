/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   anchen
 * @Last Modified time: 2016-03-14 14:20:12
 */

'use strict';
require(['jquery', '_', './js/uc.ut', "text!tpl/infoList.html"],
    function($, _, UT, infoList) {
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
