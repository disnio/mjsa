define(['jquery.fileupload', 'jquery.migrate', 'jquery.fileupload-process', 'jquery.fileupload-validate'], function() {
    $(function() {
        var opt = {
            upload: $.fn.fileupload,
            container: $('#fileupload'),
            url: ImgSingleUploadUrl,
            onlyImg: true,
            maxFileSize: 1000000, // 1MB
            minFileSize: 1000, // 1k
            callback: function(temp) {
                $("#preview").empty();
                $("#preview").append('<img src="' + temp.url + '" />');
                $("#IconID").val(temp.id);
            }
        };
        UI.fileUpload(opt);
        //图片大于1M时不能提交
        $("#cjBtn").click(function(e) {
            e.preventDefault();            
            $("form").attr("action", ucConfig.ServerReferenceJavaScript + "/CFMyProjects/InsertProjectBasis").submit();            
        });



    });
});
