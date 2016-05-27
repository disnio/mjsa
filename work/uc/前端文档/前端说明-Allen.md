# 前端文档说明
建立：*2016-03-24*，更新：*2016-05-04*
## Js 基础类库部分

### ajax 调用
普通调用：先声明 

    var UT = {};
依赖：jquery, lodash, uc.ut.js(工具库)
* [jaxJson ajax 调用](ut/jaxJson.html)
* [jaxPage ajax 分页](ut/jaxPage.html)
* [tplRender 模板渲染](ut/tplRender.html)
* [queryString 查询字符串处理](ut/queryString.html)


### ui 
普通调用：先声明 

    var UI = {};
依赖：jquery, lodash, uc.ui.js(界面库)

* [Bootstrap Modal 提示](ui/BootstrapModalToolTip.html)
* [文件上传](ui/FileUpload.html)
* [百度编辑器引入](ui/UMEditor.html)
* [联动选择器](ui/CascadeSelect.html)
### 存储

### tools 小工具部分
## Js 代码规范部分


## 前后交互
### 返回数据格式
        ```JSON
        <script type="text/javascript">
            // 返回数据，同项目中名称一致即可
            {                
                Success: true, // or false
                Msg:"返回的消息",
                Data: [], // or {}
                PageNum: 0, // 当前页号
                PageIndex:0, // 查询记录起始索引
                TotalRecords: 0 // 返回记录的总条数
                // ...
            };
        </script>

### 接口样板示例数据
后端提供：要求是实际后端接受的详细且命名有意义的几组数据。数据是最好的说明。

### 接口调用
后端提供：调用方式，具体参数及类型，跨域需提供jsonp接口。付在项目页面的script标签内。

## 目录结构
Scripts 脚本
    --js                    : 值定义脚本
    --lib                   : 第三方库
    --app                   : 基本同调用页面名称的页面代码
    --tpl                   : 模板
    --NuGet                 : 引入的文件
    --bower_components bower: 引入的目录
    --jQuery.FileUpload
    --UMEditor
    --cors                  : 上传返回代理页面
    --webconfig.js          : 后端动态生成或前端建立的公共配置文件，项目通用。

Content 样式
    --css  : 自定义样式
    --font : 字体
    --NuGet: 引入的文件
    --其它可以引入的第三方脚本样式
    --img  : 项目公共图像，越少越好

其它任务脚本可自建目录但建议放入 Scripts 内





