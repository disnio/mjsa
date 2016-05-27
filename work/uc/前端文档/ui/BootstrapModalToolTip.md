## Bootstrap Modal ToolTip（提示框插件）
用于简单的弹出提示，然后运行回调。

    <script type="text/javascript">
    UI.inTip("你要显示的消息").then(function(){
        // 提示点击关闭后你要运行的回调
        callback();
    })
    </script>