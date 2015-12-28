<script src="http://libs.baidu.com/jquery/1.8.3/jquery.js"></script>

<script src="/js/src/easyXDM.debug.js"></script>

<script type = "text/javascript">
$(function() {  
    var baseUri = "http://127.0.0.1:8071/product/";
    // B 端
    var remote = new easyXDM.Rpc({
        local: "/js/src/name.html",
        swf: "/js/src/easyxdm.swf"
    }, 
    {
        // A 端 声明的方法，相对于此端为远程
        remote: {            
            alertMessage: {}
        },
        local: {// 本地方法声明， 在A端 为需要远程调用的方法，这里没有加入ACL，实际应用时候需要加上。
            getlist: function(fn){
                $.ajax({
                    type: "GET",
                    url: baseUri + "list",
                    dataType: "json",
                    //jsonp: "callback",
                    success: function (data) {
                        fn(data);  
                    }
                });
            },

            addProduct: function(data, fn){
                $.ajax({
                    type: "POST",
                    url: baseUri + "Create",
                    //contentType: 'application/json; charset=utf-8',
                    data: data, //$(formElement).serialize() 直接表单提交
                    dataType: "json"
                }).done(function(data) {
                    fn(data);
                }).fail(function(xhr, textStatus, err) {
                    console.log(err);
                });
            },

            upProduct: function(data, fn){
                $.post(baseUri + "Update", data, fn, "json"); 
            },

            delProduct: function(data, fn){
                $.post(baseUri + "Delete", data , fn, "json");
            }
        }
    });

});
</script>
