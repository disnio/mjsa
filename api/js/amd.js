/*
 * Purl (A JavaScript URL parser) v2.3.1
 */

;
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.purl = factory();
    }
})(function() {
  
    function purl(url) {
        url = url || window.location.toString();

        return {
            url: url
        };
    }

    purl.jQuery = function($) {
        if ($ != null) {
            $.fn.url = function() {
                url = url || window.location.toString();

                return purl(url);
            };

            $.url = purl;
        }
    };

    purl.jQuery(window.jQuery);

    return purl;

});
