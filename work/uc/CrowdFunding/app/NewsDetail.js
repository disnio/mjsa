/*
 * @Author: anchen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   anchen
 * @Last Modified time: 2016-05-16 17:19:29
 */

'use strict';
require(['jquery', '_', './js/uc.ut', 'purl', "text!tpl/newsDetail_Cont.html", "moment"],
    function($, _, UT, purl, newsCont) {
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
