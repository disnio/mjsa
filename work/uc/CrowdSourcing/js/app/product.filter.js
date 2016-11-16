angular.module('yoB').filter('toTF', function() {
    return function(input) {
        if (input == false) {
            return "否"
        } else {
            return "是"
        }
    }
});

angular.module('yoB').filter('error', function() {
    var msg = {
        category: "必须选择商品分类",
        required: "必须填写",
        gtzero: "请填写大于0的数字",
        integer: "请填写大于0的整数",
        outlink: "无效的网址",
        ueditor: "请减少商品描述内容，否则无法发布成功！",
        minlength: function(n) {
            return "最少" + n + "个字符"
        },
        maxlength: function(n) {
            return "最多" + n + "个字符"
        }

    };
    return function(input, attrs) {
        switch (input) {
            case 'minlength':
                return msg[input](attrs['minlength']);
                break;
            case 'maxlength':
                return msg[input](attrs['maxlength']);
                break;
            default:
                return msg[input];
        }
    }
})
