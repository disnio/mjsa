$(function() {
/*登录*/	
    var k = !0;
    $(".loginmask").css("opacity", 0.8);
    $(".thirdlogin ul li:odd").css({
        marginRight: 0
    });
    $(".openlogin").click(function() {
        k && "0px" != $("#loginalert").css("top") && ($("#loginalert").show(), $(".loginmask").fadeIn(500), $("#loginalert").animate({
            top: 0
        },
        400, "easeOutQuart"))
    });
    $(".loginmask,.closealert").click(function() {
        k && (k = !1, $("#loginalert").animate({
            top: -600
        },
        400, "easeOutQuart",
        function() {
            $("#loginalert").hide();
            k = !0
        }), $(".loginmask").fadeOut(500))
    });
 
/*注册*/
    $("#sigup_now,.reg a").click(function() {
        $("#reg_setp,#setp_quicklogin").show();
        $("#reg_setp").animate({
            left: 0
        },
        500, "easeOutQuart")
    });
    $(".back_setp").click(function() {
        "block" == $("#setp_quicklogin").css("display") && $("#reg_setp").animate({
            left: "100%"
        },
        500, "easeOutQuart",
        function() {
            $("#reg_setp,#setp_quicklogin").hide()
        })
    });
});
/*
本代码由【素材家园】收集并编辑整理;
尊重他人劳动成果;
转载请保留【素材家园】链接 - 【www.sucaijiayuan.com】
*/