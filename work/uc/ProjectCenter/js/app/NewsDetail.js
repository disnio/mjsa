/* 
 * @Author: anchen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   czy
 * @Last Modified time: 2016-08-01 09:48:51
 */

'use strict';
require(['ut','purl', "text!tpl/newsDetail_Cont.html"],
    function(UT, purl, newsCont) {
        var url = purl();
        var bid = url.param("id");
        // 新闻详情
        var optNewsCont = {
            "name":  '/CFNews/' + bid,
            "data": ''
        };
        UT.jaxJson(optNewsCont).then(function(data) {
            
            var template = _.template(newsCont);
            var tempdata = {
                "item": data.Data
            };
            $(".newsCont").append(template(tempdata));
        });
    }
);
