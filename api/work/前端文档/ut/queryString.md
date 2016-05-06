## queryString 查询字符串处理
此接口可能会根据业务需求扩展，但调用函数名称不变，传参方式不变。
    <script type="text/javascript">
        // http://allen.ucdl.cn/CrowdSourcingWeb/productlist/ProductDetail?id=1
        UT.queryString.parse(string).id 
        // 1
        // 对象序列化为查询字符串
        UT.queryString.stringify(obj)
        // {num: ["1", "2", "3"]} 
        // -> "num[]=1&num[]=2&num[]=3"
        // {person: {name: "allen"}}
        // -> "person[name]=allen"
    </script>



    



