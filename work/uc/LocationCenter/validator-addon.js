var vaddon = {
    // 浮点两位最多，且大于0
    greatzero: jQuery.validator.addMethod("greatzero", function(value, element, param) {
        var decimal;
        if (/\-/.test(value)) {
            return false;
        }

        if (/\.\d+/.test(value)) {
            decimal = /\d*\.(\d*)/.exec(value)[1];
            if (parseFloat(value, 10) > 0 && decimal.toString().length <= 2) {
                return true;
            } else {
                return false;
            }
        } else {
            if (parseFloat(value, 10) > 0) {
                return true;
            } else {
                return false;
            }
        }

    }, $.validator.format("必须为大于0，最多2位小数的数字")),
    // 大于给定的输入值
    gt: jQuery.validator.addMethod("gt", function(value, element, param) {
        var little = $('input[name="' + param + '"]:visible').val();
        if (parseFloat(little, 10) < parseFloat(value, 10)) {
            return true;
        } else {
            return false;
        }
    }, $.validator.format("应该大于前面的值")),
        // 大于给定的输入值
    lt: jQuery.validator.addMethod("lt", function(value, element, param) {
        var gt = $('input[name="' + param + '"]:visible').val();
        if (parseFloat(gt, 10) > parseFloat(value, 10)) {
            return true;
        } else {
            return false;
        }
    }, $.validator.format("应该小于后面的值")),
    // 只允许中文
    zhcn: jQuery.validator.addMethod("isChinese", function(value, element) {
        return /^[\u0391-\uFFE5]+$/.test(value);
    }, "只能包含中文字符。"),
    // 只能输入[0-9]数字
    in09: jQuery.validator.addMethod("isDigits", function(value, element) {
        return this.optional(element) || /^\d+$/.test(value);
    }, "只能输入0-9数字"),
    // 手机号码验证    
    zhphone: jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
    }, "请正确填写您的手机号码。"),
    // 身份证
    idcard: jQuery.validator.addMethod("isIdCardNo", function(value, element) {
        //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;   
        return this.optional(element) || isIdCardNo(value);
    }, "请输入正确的身份证号码。"),
    // 字符验证，只能包含中文、英文、数字、下划线等字符。    
    zhennum: jQuery.validator.addMethod("stringCheck", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
    }, "只能包含中文、英文、数字、下划线等字符")

};
