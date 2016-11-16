/* 
 * @Author: Allen
 * @Date:   2015-04-06
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-04-06 11:09:03
 */
$(function() {
    $(".widget .carousel").jCarouselLite({
        btnNext: ".widget .next",
        btnPrev: ".widget .prev",
        circular: false,
        speed: 300
    });
    
    $(".widget img").click(function(e) {
        var curIndex = $(e.currentTarget).parent().index();
        var lis = $(".carousel li");
        lis.removeClass("selected");
        lis.eq(curIndex).addClass("selected");
        $(".widget .mid img").attr("src", $(this).attr("src"));
    });
});
