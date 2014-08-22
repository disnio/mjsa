$.extend({
    isTooltipMaxSize: true,
    changeTooltipSize: function (isMax) {
        this.isTooltipMaxSize = isMax;
        this.ajaxTooltip();
    },
    ajaxTooltip: function (url, title, width, height) {
        if (!width) width = 300;
        if (!height) height = 200;

        title = '';

        var modalObj = $('#simple_TooltipDiv');
        var winHeight = $(window).height();

        var modalObjBody;
        if (modalObj.size() <= 0) {
            modalObj = $('<div id="simple_TooltipDiv" class="notice" style="position:absolute;z-index:1000;top:' + (winHeight + $(window).scrollTop()) + 'px;right:10px;overflow:auto;">\
            <div id="simple_TooltipDiv_Head" style="width:' + width + 'px;">\
                <div class="left">' + title + '</div>\
                <div class="right no_but"><div class="btn_min" title="最小化" onclick="$.changeTooltipSize(false);"></div><div class="btn_max" title="最大化" onclick="$.changeTooltipSize(true);"></div><div class="btn_close" title="关闭" onclick="$(\'#simple_TooltipDiv\').hide();"></div></div>\
                <div class="clear" style="clear:both;"></div>\
            </div>\
            <div id="simple_TooltipDiv_Body" style="width:' + width + 'px;height:' + height + 'px;"></div>\
            </div>');
            $('body').css('overflow-y', 'scroll').append(modalObj);
            modalObjBody = $('#simple_TooltipDiv_Body');

            if (!url) {
                modalObjBody.html('对不起,请传递url参数!');
            }
            else {
                $.get(url, function (result) {
                    modalObjBody.html(result);
                });
            }
        }
        else {
            $('#simple_TooltipDiv').css({ top: (winHeight + $(window).scrollTop()) + 'px;', display: '' });
            modalObjBody = $('#simple_TooltipDiv_Body');
        }

        if (this.isTooltipMaxSize) {
            modalObjBody.css('display', '');
        }
        var menuYloc = winHeight - (this.isTooltipMaxSize ? (modalObjBody.height() + $('#simple_TooltipDiv_Head').height()) : $('#simple_TooltipDiv_Head').height());
        modalObj.animate({ 'top': (menuYloc + $(window).scrollTop()) + 'px' }, 'slow', function () {
            if (!$.isTooltipMaxSize) {
                modalObjBody.css('display', 'none');
            }
        });

        $(window).scroll(function () {
            var offsetTop = (menuYloc + $(window).scrollTop()) + 'px';
            modalObj.animate({ top: offsetTop }, { duration: 10, queue: false });
        });
        //调用函数，获取数值
        window.onresize = $.ajaxTooltip;
    }
});