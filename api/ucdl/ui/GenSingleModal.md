## Bootstrap Modal 弹窗封装
uc.ui.js

    <script type="text/javascript">
    genSingleModal({
        // 显示或隐藏关闭按钮
        btnClose: true,
        // 关闭按钮名称
        btnCloseName: "取消",
        btnSave: true,
        btnSaveName: "提交",
        // 弹窗标题
        title: "test",
        // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
        body: $('<p>内容</p>'),
        // 关闭按钮点击时运行
        close: function(modal) {
            console.log("close")
        },
        // 保存按钮点击是运行， modal 为传入的弹窗实例
        save: function(modal){
            console.log("save")
        },
        // 前期的处理工作，如验证自定义的添加
        before:function(modal){
            vaddon.greatzero;
        },
        // 弹窗打开后运行
        callback: function(modal) {
            $(".footer p", modal).click(function() {
                $(this).css("color", "red")
            })
            console.log("callback")
        },
        // 保存前条件判断，返回true则通过保存，fasle 则不保存
        // cond 和 valid 是互斥关系，只能有一个
        cond: function(modal){
            var numEl = $('input[name="num"]', modal);
            if(/\d+/.test( numEl.val() )){
                return true;
            }else {
                $('.modal-body span', modal).text("not a number");
                return false;
            }
        },
        valid: {
            // form 的id
            form: "#rzform",
            // 等同 jquery.validate.js 的 rules 和 messages
            rules: {
                amountnum: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                amountnum: {
                    required: "融资需求必填",
                    digits: "必须输入整数" 
                }
            },
            // 错误提示放置，默认在 modal > .row > #errorMsg 里面放置，可重写函数
            errorPlacement: function(error, element) {
                var errEl = element.closest(".row").find("#errorMsg");
                errEl.empty();
                error.appendTo(errEl);
            },
            // 默认不写
            debug: false,
            // ajax 提交不用写，直接执行 save 里的
            submitHandler：function(form) {
                return false;
            },
        }
    });
    </script>