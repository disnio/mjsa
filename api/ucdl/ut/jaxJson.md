## jaxJson ajax 调用
此接口可能会根据业务需求扩展，但调用函数名称不变，传参方式不变。

依赖：lodash.js 3.10， jQuery.js 项目默认至少是1.10.4 或 1.11.3。
webConfig.js 里面：

    <script type="text/javascript">
    // 根据项目 webconfig 自己生成， 或手动建立，最先引用在 layout.html 里面
    var ucConfig = {
        // 即为项目发布的目录
        ServerReferenceJavaScript: "http://allen.ucdl.cn/CrowdSourcingweb/",
        // 公共 api 接口
        ServerReferenceCrowdFundingAPI: "http://allen.ucdl.cn/cfapi"
    };
    </script>

目前分为 
#### web 调用
    <script type="text/javascript">
    var opt = {
        // 默认：get
        "type": "post",
        // web
        "webUrl": ucConfig.ServerReferenceJavaScript,
        // 实际的 web 接口
        "name": '/productlist/ProductDetail',
        // 默认：application/x-www-form-urlencoded
        "contentType": "application/json",
        // 默认 json，建议跨域时用 jsonp
        "dataType": "json",
        // 传输的数据为 json
        "dataify": true,
        // 数据参数
        "data": data,
        // 快速模式
        "success": function(data){
            console.log(data);
        }
    };
    // 快速模式
    UT.jaxJson(opt, true)
    // 异步模式
    UT.jaxJson(opt, true).then(function(data) {        
        if(data.Success == true){
            // 成功
        }else{
            // 失败
        } 
    });
    </script>    

#### api 调用
    <script type="text/javascript">
         var opt = {
            // 需要修改默认接口情况下，默认不需要写
            "baseUrl": ucConfig.ServerReferenceJavaScript,
            // 控制器/动作
            "name":  '/CFProject/GetProjectBasis',
            "data": {
                id: id
            }
            // 其它同 web 调用
        };
    </script>


