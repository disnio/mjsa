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
        // 返回数据后，通过pageData取的分页数据
        pageData: 'CommentList',
        // 分页
        page: {
            // 页码容器
            pageEl: $(".myfqr-holder"),            
            // 每页包含的数量
            perPage: 2,
            // 显示的按钮页数
            numLen: 3,
            go: "转到",
            next: "下一页",
            prev: "上一页",
            first: "第一页",
            last: "末页"
        },
        // 分页完成后的回调
        callback: function(data){},
        // 分页前对数据进行处理
        filterFn:: function(data){
            //data.datas
        },
        // 更改 TotalNum
        beforePage: function(data){}
    };

    UT.jaxPage(jaxOpt)
    </script>



