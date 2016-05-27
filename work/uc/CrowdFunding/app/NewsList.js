/* 
 * @Author: anchen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-04-14 16:48:22
 */

'use strict';
require(['jquery', '_', './js/uc.ut', 'purl', "text!tpl/NewsList_News.html", "loading"],
    function($, _, UT, purl, hnews) {
        // 最新资讯
        var optHotNews6 = {
            "name":  '/cfnews/list',
            "data": {
                newstype: 6
            }
        };

        $( ".tab-pane" ).isLoading({
            text:       "",
            position:   "overlay"
        });

        UT.jaxJson(optHotNews6).then(function(data) {

            _.each(data.Data, function(item) {
                item.NewsContent = item.NewsContent.substr(0, 80) + "...";
                item.CreationTime = item.CreationTime.split('.')[0].replace(/T/, ' ');
            });

            var template = _.template(hnews);
            var tempdata = {
                "hotNews": data.Data
            };
            $( ".tab-pane" ).isLoading("hide");

            $('#hotNews6').empty().append(template(tempdata));
        });
        // 媒体报道
        var optHotNews7 = {
            "name":  '/cfnews/list',
            "data": {
                newstype: 7
            }
        };

        UT.jaxJson(optHotNews7).then(function(data) {
            _.each(data.Data, function(item) {
                item.NewsContent = item.NewsContent.substr(0, 80) + "...";
                item.CreationTime = item.CreationTime.split('.')[0].replace(/T/, ' ');
            });

            var template = _.template(hnews);
            var tempdata = {
                "hotNews": data.Data
            };
            $( ".tab-pane" ).isLoading("hide");

            $('#hotNews7').empty().append(template(tempdata));
        });
    }
);
