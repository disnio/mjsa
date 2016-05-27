## jaxPage ajax 分页调用
此接口可能会根据业务需求扩展，但调用函数名称不变，传参方式不变。

依赖：jaxJson里面：

    <script type="text/javascript">
    var jaxOpt = {
        ajax: {
            "type": "post",
            // 本地路径
            "webUrl": ucConfig.ServerReferenceJavaScript,
            // 接口
            "name": '/active/mycreationactive/',            
            "contentType": "application/json",
            // 参数序列化
            "dataify": true,
            // ajax 参数
            "data": {
                ActiveStatus: -1,
                ActiveTopic: "",
                // 上面为实际项目的例子参数可无，下面为 ajax 分页参数
                PageIndex: 0,
                PageSize: 2
            }
        },
        // 放置返回数据列表容器
        el: $("#myfqr"),
        // 列表模板
        tpl: mactivefq,
        // 分页插件
        pageFunc: $.fn.smartpaginator,
        // 分页
        page: {
            // 页码容器
            pageEl: $(".myfqr-holder"),
            // 每页包含的数量
            perPage: 2,
            // 总页数
            numLen: __3__
        }
    };

    UT.jaxPage(jaxOpt)
    </script>



