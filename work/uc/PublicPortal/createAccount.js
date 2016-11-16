$(function() {
    var url = $.url();
    $(".btnLogin").prop("disabled", true);

    var userEP = {
        "email": false,
        "phone": false
    };

    // 验证电话和邮箱
    jQuery.validator.addMethod("phoneAndEmail", function(value, element, param) {
        var pdom = $(element).closest("form");

        var regxPhone = /^1[358][0-9]{9}$/;
        var regxEmail = /\w@\w*\.\w/;
        if (regxPhone.test(value)) {
            userEP.phone = true;
            userEP.email = false;
            // 如果用户输入的是手机号，则隐藏手机
            $(".Emaildl", pdom).hide();
            $(".SMSdl", pdom).show();
            $(".SMSdlDcode", pdom).show();
        }

        if (regxEmail.test(value)) {
            userEP.phone = false;
            userEP.email = true;

            $(".Emaildl", pdom).show();
            $(".SMSdl", pdom).hide();
            $(".SMSdlDcode", pdom).hide();
        }
        var result = regxPhone.test(value) || regxEmail.test(value);
        // console.log(value, result)
        if (result) {
            return true;
        }
    }, $.validator.format("请确保输入的是格式正确的邮箱或有效的手机号!"));

    // 动态验证码（手机发送）
    jQuery.validator.addMethod("dCode", function(value, element, param) {
        var pdom = $(element).closest("form");
        var $getCodeBtn = $('.getCode', pdom);
        return $.ajax({
            "url": imageCodeUrl,
            "method": "post",
            "data": {
                "imageCode": value
            }
        }).then(function(data) {
            if (data == "success") {
                $getCodeBtn.prop('disabled', false);
                $(element).closest(".form-group").find(".jerror").empty();
                return true;
            } else {
                $getCodeBtn.prop('disabled', true);
                // $(element).closest(".form-group").find(".jerror").empty();
                return false;
            }
        });
    }, $.validator.format("动态验证码不正确"));

    // 图形验证码
    jQuery.validator.addMethod("vCode", function(value, element, param) {
        var pdom = $(element).closest("form");

        var result = false;
        $.ajax({
            url: vCodeUrl,
            method: "post",
            async: false,
            data: {
                "vCode": $("#Vcode", pdom).val()
            },
            "success": function(data) {
                if (data == "success") {
                    // console.log("true")
                    $(element).closest(".form-group").find(".jerror");
                    result = true;
                    $('.getCode').prop('disabled', false);
                }
            }
        });

        return result;
    }, $.validator.format("验证码不正确"));

    // 手机号码格式
    jQuery.validator.addMethod("vPhone", function(value, element, param) {
        var regxPhone = /^1[358][0-9]{9}$/;
        var result = regxPhone.test(value)
        return result;
    }, $.validator.format("手机号不正确"));

    // 协议
    jQuery.validator.addMethod("ckbprotocal", function(value, element, param) {
        var pdom = $(element).closest("form");
        var ck = $(".ckbprotocal", pdom).prop("checked");

        return ck;
    }, $.validator.format("请接受我们的协议"));


    // 模拟
    // $.mockjax({
    //     url: 'http://allen.ucdl.cn/PublicPortalWeb/Account/regapi',
    //     dataType: "json",
    //     // contentType: "application/json",
    //     response: function(settings){                   
    //         this.responseText = { "data": "ajaxSubmit is ok"};
    //     }
    // }); 
    // $.mockjax({
    //     url: 'http://allen.ucdl.cn/GovernmentPortal/GPGovernmentRegist/GovernmentRegist',
    //     dataType: "json",
    //     // contentType: "application/json",
    //     response: function(settings){                   
    //         this.responseText = { "lmdata": "ajaxSubmit is ok", settings};
    //     }
    // });

    var nowTab = "#reg1";
    var fdom1 = $("#f1").html();
    var fdom2 = $("#f2").html();
    $(nowTab).find("form").append(fdom1);

    var validForm = {
        errorPlacement: function(error, element) {
            var errEl = element.closest(".form-group").find(".col-sm-11 .jerror");

            errEl.empty();
            error.appendTo(errEl);
        },
        // debug:true,
        // errorClass: "jerror",
        // errorContainer: ".form-group .jerror",
        submitHandler: function(form) {
                      
            return false;
        },
        rules: {
            UserName: {
                required: true,
                phoneAndEmail: true
            },
            Password: {
                required: true,
                minlength: 6
            },
            RePassword: {
                required: true,
                minlength: 6,
                equalTo: "#Password"
            },
            Vcode: {
                required: true,
                vCode: true
            },
            Dcode: {
                required: true,
                dCode: true
            },
            ckbprotocal: {
                ckbprotocal: true
            },
            txtName: {
                required: true,
                minlength: 2,
                maxlength: 200
            },
            txtContacts: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
            txtContactPhone: {
                required: true,
                vPhone: true
            },
            txtRegistAddress: {
                required: true,
                maxlength: 500
            }

        },
        messages: {
            UserName: {
                required: "请输入用户名：您的邮箱或手机号"
            },
            Password: {
                required: "请输入密码",
                minlength: "密码长度6-14位"
            },
            RePassword: {
                required: "请输入确认密码",
                minlength: "密码长度6-14位",
                equalTo: "您输入的两次密码不一致，请重新输入"
            },
            txtName: {
                required: "请输入名称",
                minlength: "输入字符长度不少于2",
                maxlength: "输入字符长度不能超过200"
            },
            txtContacts: {
                required: "请输入联系人",
                minlength: "输入字符长度不少于3",
                maxlength: "输入字符长度不能超过50"
            },
            txtContactPhone: {
                required: "请输入手机号码",
                vPhone: "输入正确的手机号码"
            },
            txtRegistAddress: {
                required: "请输入联系地址",
                maxlength: "输入字符长度不能超过500"
            }
        }
    };


    var validator;

    function actab(tab, tgroup) {
        if (!_.isUndefined(validator)) {

            validator.resetForm();
        }
        $("form").empty();
        var form = $(tab).find("form");
        // console.log(tab)
        if (tab == "#reg1" || tab == "#reg2" || tab == "#reg3") {
            form.empty().append(fdom1);
        }

        if (tab == "#reg4") {
            form.empty().append(fdom2);
            $(".lmname").text("联盟名称：");
        }

        if (tab == "#reg5") {
            form.empty().append(fdom2);
            $(".lmname").text("政务部门名称：");
        }
        setTimeout(function() {            
            validator = form.validate(validForm);
            // console.log(validator)
        }, 500);

    }

    actab(nowTab, ".ucf1");

});
