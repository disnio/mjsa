$(function() {
    var timer = null;
    $(".mtabs td>li>a>span").mouseenter(function (e) {
        
        $(".msub").hide();
        
        $(this).closest("a").next().show();
    });

    $(".mtabs td>li>a>span").mouseleave(function(e){
        var that = $(this).closest("a").next();
        
        timer = setTimeout(function(){
            that.hide();
        }, 400); 
    
    });
 
    $(".msub").mouseenter(function(e) {
        $(this).prev("a").addClass("up");
        clearTimeout(timer);
        timer = null;
        $(".msub li").mouseenter(function() {
            $(this).find(".m3sub").show();
            $(this).addClass("on");
        });

        $(".msub li").mouseleave(function() {
            $(this).find(".m3sub").hide();
            $(this).removeClass("on");
        });
    });

    $(".msub").mouseleave(function() {
        $(this).prev("a").removeClass("up");
        $(this).hide();
        $(this).find(".m3sub").hide();
    });

});
