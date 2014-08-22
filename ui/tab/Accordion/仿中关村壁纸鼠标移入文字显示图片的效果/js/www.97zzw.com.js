/*
本代码由97站长网收集并编辑整理;
尊重他人劳动成果;
转载请保留97站长网链接 - www.97zzw.com
*/$(document).ready(function() {
            $list_li = $(".list li");
            $list_li.eq(0).addClass("active");
            $list_li.mouseover(function(){
                $(this).addClass("active").siblings().removeClass("active");
           });
        });