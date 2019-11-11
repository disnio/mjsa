## UMEditor 百度编辑器引入
引用 Scripts 目录下的 UMEditor 这个是根据项目定制的，不要复制 Tools 目录里的。
    <link rel="stylesheet" type="text/css" href="~/Scripts/UMEditor/themes/default/css/umeditor.css">

    <script src="~/Scripts/UMEditor/umeditor.config.js"></script>
    <script src="~/Scripts/UMEditor/umeditor.js"></script>
    <script src="~/Scripts/UMEditor/lang/zh-cn/zh-cn.js"></script>
    <script type="text/javascript">
    $('textarea').each(function(i, v) {
        var id = $(this).attr('id');
        UM.getEditor(id);
    });
    </script>