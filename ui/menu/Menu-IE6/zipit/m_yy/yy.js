$(function(e) {
    isIE6Br = isIE6();

    $("#navbar .sub-menu>li").unbind("mouseover").bind("mouseover", function(e) {
        $(this).addClass("hover");
    }).unbind("mouseout").bind("mouseout", function(e) {
        $(this).removeClass("hover");
    });
    // 用 mouseenter 修正ie6闪烁
    $("li.dropmenu").mouseenter(function(){
        $(this).siblings().removeClass("hover");
        $(this).addClass("hover");
    }).mouseleave(function(){
        $(this).removeClass("hover");
        
    });

    $.each($("#courseTab .sub-menu>li"), function(i, n) {
        var subItem = $(n).find(".sub-item");
        if (!subItem) {
            return;
        }
        // 弹出栏高度计算
        var itemHeight = subItem.find("dt").length * 30;
        if (itemHeight < 222) {
            itemHeight = 222;
        }
        // 这里的计算会引起问题，在项少的情况下。
        var typeHeight = 38; //$(n).height(); 
        // 导航项高度
        var totalHeight = $("#courseTab .sub-menu>li").length * typeHeight;
        // 弹出栏相对的父栏top
        var top = (i - 1) * typeHeight;
        // 保持弹出栏，大致在弹出菜单纵向范围上下。
        if (itemHeight + top + 41 > totalHeight) {
            top -= itemHeight + top - totalHeight;
        }

        if (i == 0) {
            subItem.css("top", (top + 35) + "px");
        } else {
            // 用于调节弹出位置超出底边top+11，项少时候加大。
            subItem.css("top", (top+11) + "px");
        }
    });

});



var isFixedNavbar = false;
var isIE6Br = false;

function bindWindowScrollEventHandler() {
    var top = 80;
    $(window).scroll(function(e) {
        if (isIE6Br) {
            return;
        }
        var t = $(document).scrollTop();

        if (top < t) {
            if (!isFixedNavbar) {
                if ($("#navbar").css("position") != "fixed") {
                    $("#navbar").css("top", "0px");
                    $("#navbar").css("position", "fixed");
                    isFixedNavbar = true;
                }
            }
        } else {
            if ($("#navbar").css("position") == "fixed") {
                $("#navbar").css("position", "static");
                isFixedNavbar = false;
            }
        }
    });

}

function isIE6() {
    //alert("$.browser.version = " + $.browser.version);
    if ($.browser.msie && $.browser.version<=9) {
        return true;
    }
    return false;
}

