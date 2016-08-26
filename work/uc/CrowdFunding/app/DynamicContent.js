/* 
* @Author: anchen
* @Date:   2016-01-13 15:03:07
* @Last Modified by:   Allen
* @Last Modified time: 2016-05-31 10:37:05
*/

'use strict';
require(['ut', 'purl', "moment", "text!tpl/dynamicDetail.html"],
    function (UT, purl, moment, detailtpl) {
        var url = purl();
        var id = url.param("id");

        var optDynamicDetail = {
            "name": '/cfproject/Dynamic/' + id,
            "data": ''
        };

        UT.jaxJson(optDynamicDetail).then(function (data) {
            data.Data.CreationTime = moment(data.Data.CreationTime).format("YYYY-MM-DD HH:mm:ss");
            var template = _.template(detailtpl);
            var tempdata = {
                "item": data.Data
            };

            $('#DynamicDetail').empty().append(template(tempdata));
        });

    }
);