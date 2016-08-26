/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-04 13:30:26
 */

'use strict';
require(['ut', "text!tpl/infoList.html"],
    function(UT, infoList) {
        var optInfoList = {
            baseUrl: ucConfig.ServerReferenceJavaScript,
            dataType: 'json',
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
