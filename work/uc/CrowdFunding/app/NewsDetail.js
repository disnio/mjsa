/*
 * @Author: anchen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-05-31 10:37:07
 */

'use strict';
require(['ut', 'purl', "text!tpl/newsDetail_Cont.html", "moment"],
    function(UT, purl, newsCont) {
        var url = purl();
        var bid = url.param("id");
        // 新闻详情
        var optNewsCont = {
            "name":  '/CFNews/' + bid,
            "data": ''
        };
        UT.jaxJson(optNewsCont).then(function(data) {
  data.Data.CreationTime = moment(data.Data.CreationTime).format("YYYY-MM-DD");
            var template = _.template(newsCont);
            var tempdata = {
                "item": data.Data
            };
            $(".newsCont").append(template(tempdata));
        });
    }
);
