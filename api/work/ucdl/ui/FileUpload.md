## FileUpload 文件上传 (jQuery.fileupload)
引用 Scripts 目录下的 jQuery.FileUpload，此为根据项目定制的，不要引用 Tools 目录下的。

    <div class="uploadimg">
        <input id="fileupload" type="file" name="uploadedfile" multiple="">
        <div id="preview" class="imgLiquidFill imgLiquid" style="width:150px; height:150px;">
        </div>
    </div> 

    <script src="~/Scripts/lodash.min.js"></script>
    <script src="~/Scripts/js/uc.ui.js"></script>
    <script type="text/javascript">
        // 服务端路径直接赋值到变量，例如：       
       var ServerReferenceFileCenterAPI = '@(System.Configuration.ConfigurationManager.AppSettings["ServerReferenceFileCenterAPI"]+ "/fileupload/ImgDownload/")'; 
       var ImgSingleUploadUrl = '@(System.Configuration.ConfigurationManager.AppSettings["ServerReferenceFileCenterAPI"]+ "/fileupload/ImgSingleUpload/profileCenter")';
    </script> 
    <script src="~/Scripts/js/lib/jquery-migrate-1.3.0.js"></script>
    <script src="~/Scripts/js/lib/jquery.ui.widget.js"></script>
    <script src="~/Scripts/jQuery.FileUpload/cors/jquery.xdr-transport.js"></script>
    <script src="~/Scripts/jQuery.FileUpload/jquery.iframe-transport.js"></script>
    <script src="~/Scripts/jQuery.FileUpload/jquery.fileupload.js"></script> 

    <script type="text/javascript">
    var opt = {
        upload: $.fn.fileupload, // 固定使用
        container: $('#fileupload'), // 传入容器
        url: ImgSingleUploadUrl, // 上传路径
        onlyImg: true, // 只上传 jpg/png/gif
        // 上传完成后调用，temp 为上传后文件信息
        // { name:, url:, message:, id:, isUploaded:,}
        callback: function(temp){
            // 保存文件的 id
            $("#FCFileID").val(temp.id)
            // 显示上传图片
            $("#preview").empty();
            $("#preview").append('<img src="' + temp.url + '" />');
            $(".imgLiquidFill").imgLiquid({
                fill: true
            });
            $("#preview").show();
        }
    };
    UI.fileUpload(opt);
    </script>