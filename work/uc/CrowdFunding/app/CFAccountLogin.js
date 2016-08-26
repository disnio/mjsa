/* 
 * @Author: Allen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-05-31 10:37:05
 */

'use strict';
require(['ut', 'purl', "validate"], function(UT, purl, validate) {
    var url = purl();
    var errmsg = url.param("ErrorMsg") || '';
    var qr = url.attr('query');
    var qfile = url.attr('path');
    var qpath = _.last( qfile.split('/') );
    // if(qpath === "ReservationSearch"){
    //     errmsg = _.last( _.last( qr.split("?") ).split("=") );
    // }
    if(errmsg != ''){
        errmsg = _.last( _.last( qr.split("?") ).split("=") );
        $("#herrbox").text(errmsg);
        $("#dLabel1").trigger("click");
    }
    $(".mlform").validate({
        errorPlacement: function(error, element) {
            var errEl = $(element).parent(".mlbox").next(".herrbox");
            errEl.empty();
            error.appendTo(errEl);
        },
        errorContainer: "#mlform .herrbox",
        submitHandler: function(form) {           

            // $(form).ajaxSubmit({
            //     url: $("#mlform").attr("action"),
            //     type: "post",
            //     success: function(data) {
            //         // $("#lbefore").hide();
            //         // $("#lafter").find("span").text(data.UCAccountName).andBack().show();
            //     },
            //     error: function(err) {
            //         // console.log("err:", err);
            //         // $("#lbefore").show();
            //         // $("#lafter").hide();
            //     }

            // });
            form.submit();
        },
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 5,
                maxlength: 14
            }
        },
        messages: {
            username: {
                required: "请输入用户名：您的邮箱或手机号"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度6-14位"
            }
        }
    });

});
