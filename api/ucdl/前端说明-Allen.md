# 前端文档说明
建立：*2016-03-24*，更新：*2016-05-04*
## Js 基础类库部分
jquery^1.10, jquery-ui^1.10.4, angular^1.3.9, requireJs^2.1, lodash^3.6, uc.*.js
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
* [Bootstrap Modal 弹窗](ui/GenSingleModal.html)
* [文件上传](ui/FileUpload.html)
* [百度编辑器引入](ui/UMEditor.html)
* [联动选择器](ui/CascadeSelect.html)
### 存储

### tools 小工具部分
## Js 代码规范部分

无样式类名，需要遵守BEM规范，并以 【js-】 作为前缀。

主脚本文件命名同对应 模板文件名称，小驼峰命名。
代码格式按 sublime text 3，html、js、css 格式化。
函数命名遵守小驼峰命名。
变量声明放顶部，重要的变量命名要有意义。

其他以 google 规范为参考。

第三方样式注意与 bootstrap 的兼容调整。
内部样式需加自己的 namespace。
如果样式代码比较多或存在多个模板界面，最好提供 sass 源文件方便定制。
对应重写的bootstrap 样式，需遵守 BEM命名规范。
长类名中间用 【-】隔开，不要用下划线。

原型版本通过内嵌标签引入 js。产品版本需要 requireJs 做模块化。

## 后端写的js脚本
请放入Scripts/backend 目录下，可以根据需要创建对应的子目录。
脚本头部加注释：
    /* 
     - @Author: Tom
     - @Date:   2016-07-07
     */
便于前端跟踪。
脚本内部代码必要的需加注释。
如用到服务端变量，变量命名后放入script 标签，在脚本中引用。
*注意：内嵌在模板中js脚本，前端不做优化和跟踪。**

## 前后交互
### 返回数据格式
        ```JSON
        <script type="text/javascript">
            // 返回数据格式，没有的可省略
            {                
                Success: true, // or false
                Msg:"返回的消息",
                Data: [], // or {}
                PageNum: 0, // 分页参数的命名后端要统一
                PageIndex:0, // 查询记录起始索引
                TotalRecords: 20 // 返回记录的总条数
                PageSize: 10 // 每页条数
                // ...
            };
        </script>

### 接口接收的示例数据
后端提供：详细且命名有意义接近真实的几组数据。例如：

    接口地址：example.com/site/controller/action/api[/user/id] or [?user=user&&id=1]
    后端提供：调用方式，具体参数及类型，跨域需提供jsonp接口。
    提交的数据：
    type:get,
    data:{
        ActiveStatus: 1, // ??
        ActiveTopic: 2 // ??
        lid: 3 // ?? 等要写明具体代表什么
    },
    dataType: 'jsonp'

## 目录结构
Scripts 脚本
    --js                    : 值定义脚本
    --lib                   : 第三方库
    --app                   : 基本同调用页面名称的页面代码
    --tpl                   : 模板
    --backend               : 后端写的脚本
    --NuGet                 : 引入的文件
    --bower_components bower: 引入的目录
    --jQuery.FileUpload
    --UMEditor
    --cors                  : 上传返回代理页面

Content 样式
    --css  : 自定义样式及其它可以引入的第三方脚本样式
    --font : 字体
    --NuGet: 引入的文件    
    --img  : 项目公共图像，越少越好

其它任务脚本可自建目录但建议放入 Scripts 内





