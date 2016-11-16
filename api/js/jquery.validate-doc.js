jquery.validate

// https: //jqueryvalidation.org/category/methods/
step: 可被整除的数
normalizer(value)
rules: {
    field: {
        required: true,
        url: true,
        normalizer: function(value) {
            // Trim the value of the `field` element before
            // validating. this trims only the value passed
            // to the attached validators, not the value of
            // the element itself.
            var url = value;

            // Check if it doesn't start with http:// or https:// or ftp://
            if (url && url.substr(0, 7) !== "http://" && url.substr(0, 8) !== "https://" && url.substr(0, 6) !== "ftp://") {
                // then prefix with http://
                url = "http://" + url;
            }

            // Return the new url
            return url;

        }
    },
    mobile_phone: {
        require_from_group: [1, ".phone-group"]
    },
    home_phone: {
        require_from_group: [1, ".phone-group"]
    },
    work_phone: {
        require_from_group: [1, ".phone-group"]
    },
    // Makes details required only if #other is checked.
    details: {
        required: "#other:checked"
    },
    // Makes "parent" required only if age is below 13.
    parent: {
        required: function(element) {
            return $("#age").val() < 13;
        },
        rangelength: [2, 6],
        range: [13, 23],
        // 数字
        number: true,
        // 整数大于等于0
        digits: true,
        minlength: 3,
        min: 13,
        extension: "xls|csv",
        // "2016/09/11" "2016-09-11" 都可
        dateISO: true,
        date: true,
        // 整数的卡号，中间不带-
        creditcard: true,
        // Makes a file upload accept only specified mime-types.
        accept: "audio/*",


    },
    password_again: {
        equalTo: "#password"
    },

    email: {
        required: true,
        email: true,
        remote: {
            url: "check-email.php",
            type: "post",
            data: {
                username: function() {
                    return $("#username").val();
                }
            }
        }
    }




}

form.validate({
    // 调试不提交
    debug: false,
    // 验证通过处理提交
    submitHandler: function(form) {
        $(form).ajaxSubmit();
    },
    // 验证未通过，提交处理
    invalidHandler: function(event, validator) {
        // 'this' refers to the form
        var errors = validator.numberOfInvalids();
        if (errors) {
            var message = errors == 1 ? 'You missed 1 field. It has been highlighted' : 'You missed ' + errors + ' fields. They have been highlighted';
            $("div.error span").html(message);
            $("div.error").show();
        } else {
            $("div.error").hide();
        }
    },
    // 默认：:hidden 元素忽略，验证时忽略的元素
    ignore: ".ignore",
    // 验证规则的键值对
    rules: {
        contact: {
            required: true,
            email: {
                // 依赖，选中
                depends: function(element) {
                    return $("#contactform_email").is(":checked");
                }
            }
        }
    },
    messages: {
        name: "Please specify your name",
        email: {
            required: "We need your email address to contact you",
            email: "Your email address must be in the format of name@domain.com"
        }
    },

    groups: {
        username: "fname lname"
    },

    errorPlacement: function(error, element) {
        if (element.attr("name") == "fname" || element.attr("name") == "lname") {
            error.insertAfter("#lastname");
        } else {
            error.insertAfter(element);
        }
    },
    // 默认 true，验证当提交的时候。false 不验证提交
    onsubmit: false,
    // 元素失去焦点时，验证。function(element, event) 自己验证
    onfocusout: false,
    onkeyup: false,
    onclick: false,
    // 提交没通过，聚焦在最后元素无效元素或第一个元素
    focusInvalid: false,
    // 默认 false。如果 true 清除 errorClass 从无效元素，隐藏所有的错误信息
    focusCleanup: true,
    // 默认 error
    errorClass: "invalid",
    // 默认 "valid"
    validClass: "success",
    // "label" 放置错误信息的元素
    errorElement: "em",
    // 包裹包含错误信息元素的外层标签
    wrapper: "li",
    // 验证时候隐藏或显示，所有错误信息都放在此元素内部
    errorLabelContainer: "#messageBox1 ul",
    errorContainer: "#messageBox1, #messageBox2",
    showErrors: function(errorMap, errorList) {
        $("#summary").html("Your form contains " + this.numberOfInvalids() + " errors, see details below.");
        this.defaultShowErrors();
    },
    // 错误信息标签的放置位置(default: 错误元素标签后) The error label to insert into the DOM.
    errorPlacement: function(error, element) {
        error.appendTo(element.parent("td").next("td"));
    },
    // 验证通过给元素标签添加类，也可以有文本。字符串被作为类。
    success: function(label) {
        label.addClass("valid").text("Ok!")
    },
    // 高亮无效的域
    highlight: function(element, errorClass, validClass) {
        $(element).addClass(errorClass).removeClass(validClass);
        $(element.form).find("label[for=" + element.id + "]")
            .addClass(errorClass);
    },
    unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass).addClass(validClass);
        $(element.form).find("label[for=" + element.id + "]")
            .removeClass(errorClass);
    }
});

// 检查表单是否验证通过，或所有选择的元素有效通过。需要先调用 validate()
form.valid()
    // 读取或添加、删除验证规则
element.rules()
$("#myinput").rules("add", {
    required: true,
    minlength: 2,
    messages: {
        required: "Required input",
        minlength: jQuery.validator.format("Please, at least {0} characters are necessary")
    }
})
$("#myinput").rules("remove");
$("#myinput").rules("remove", "min max");

// 选择符
: blank
    : filled: unchecked

// https://jqueryvalidation.org/category/validator/
$.validator.methods.email = function(value, element) {
    return this.optional(element) || /[a-z]+@[a-z]+\.[a-z]+/.test(value);
}

jQuery.validator.addClassRules({
    name: {
        required: true,
        minlength: 2
    },
    zip: {
        required: true,
        digits: true,
        minlength: 5,
        maxlength: 5
    }
});

jQuery.validator.setDefaults({
  debug: true
});

var template = jQuery.validator.format("{0} is not a valid value");
// later, results in 'abc is not a valid value'
alert(template("abc"));

jQuery.validator.addMethod( name, method [, message ] )

// Adds and shows error message programmatically.
var validator = $( "#myshowErrors" ).validate();
validator.showErrors({
  "firstname": "I know that your firstname is Pete, Pete!"
});

var validator = $( "#myform" ).validate();
validator.resetForm();

// Returns the number of invalid fields.
validator.numberOfInvalids()
// Validates the form, returns true if it is valid, false otherwise.
// Triggers form validation programmatically.
validator.form();

// Validates a single element, returns true if it is valid, false otherwise.
validator.element( "#myselect" );
invalidElements()
