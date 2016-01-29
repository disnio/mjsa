/* 
 * @Author: anchen
 * @Date:   2016-01-28 10:52:04
 * @Last Modified by:   anchen
 * @Last Modified time: 2016-01-28 11:11:19
 */

'use strict';
require(['jquery', 'qtip'], function($, qtip) {
    $(function() {
        $('.hasTooltip').each(function() { // Notice the .each() loop, discussed below
            $(this).qtip({
                content: {
                    text: $(this).next('div') // Use the "div" element next to this for the content
                }
            });
        });
    });
});
