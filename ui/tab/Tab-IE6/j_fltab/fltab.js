/* get the url query */
/*
function GetQueryString(str) {
    var LocString = String(window.document.location.href);
    var rs = new RegExp("(^|)" + str + "=([^\&]*)(\&|$)", "gi").exec(LocString),
        tmp;
    if (tmp = rs) return decodeURIComponent(tmp[2]);
    return "";
}

function addCookie(name, value, expiresHours) {
    var cookieString = name + "=" + encodeURIComponent(value);
    //判断是否设置过期时间 
    if (expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime() + expiresHours * 3600 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
}

function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return decodeURIComponent(arr[1]);
    }
    return "";
}
*/
/* 列表标签 */
;(function($){
    $.fn.flTab = function(options) {
        return this.each(function() {
            var opts = $.extend({}, options);
            console.log(opts);
            var t = $(this),
                tit = t.find(opts.tabHead),
                tpanels = t.find(opts.tabPanel),
                tevt = opts.tabEvt,
                tcur = opts.tabCur,
                tindex = opts.tabIndex;
            tit.bind(tevt, function() {
                    $(this).addClass(tcur).siblings().removeClass(tcur);
                    tpanels.eq(tit.index($(this))).show().siblings().hide();
               
            });
            opts.tabEvt === 'click' ? tit.eq(tindex).click() : tit.eq(tindex).mouseover();
            
        });
        // 默认配置项
        
        $.fn.flTab.defaults = {
            tabHead : ".lTabHeader li",  
            tabPanel: ".lTabPanel ul",
            tabCur  : "lTcurr", 
            tabEvt  : "mouseover", 
            tabIndex: 0 
        };
    };
})(jQuery);
