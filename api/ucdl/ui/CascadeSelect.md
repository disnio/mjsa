## Cascade Select 多级联动选择器
理论上不限制层级，可以构建省市三级联动和多层级选择

#### 服务端返回数据格式
    Data：[
        {ID:1, ParentID:0, ...},
        // ...
    ] 
#### 前端调用
    <script type="text/javascript">
        UI.genSelect({
            list: Data,
            container: $("#catelist"),
            // 可选
            beforeCallback: function(data){
                // 数据预处理
            },
            callback: function(){
                // 界面渲染后处理，拿数据
            },
            // 初始化界面需要激活的id， 可选
            activeID: id,
            // 作为 select 值的 key，定制返回结果字段 
            key: selectKey,
            class: "form-control you-custom-class"

        });
    </script>
