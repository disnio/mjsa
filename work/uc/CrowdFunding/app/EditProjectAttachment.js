define(['jquery.fileupload', 'jquery.migrate'], function($) {
    $(function() {
        var ifopt = {
            iframe: true,
            forceIframeTransport: true,
            redirect: ucConfig.ServerReferenceJavaScript + "/Scripts/cors/result.html?%s"
        };
        var opt = {
            url: ImgSingleUploadUrl,
            dataType: 'json',
            autoUpload: true,
            sequentialUploads: true,
            add: function(e, data) {
                $('body').append('<p class="upl">Uploading...</p>');
                //this will 'force' the submit in IE < 10 必须的                    
                $.each(data.files, function(i, file) {
                    file.jqXHR = data.submit()
                        .success(function(result, textStatus, jqXHR) {
                            // console.log("success: ", result);
                        })
                        .error(function(jqXHR, textStatus, errorThrown) {})
                        .complete(function(result, textStatus, jqXHR) {
                            // console.log("complate upload")
                        });
                });
            },
            always: function(e, data) {
                var result;
                $("#fileerror").text("");
                if (data.textStatus == 'parsererror') { // IE9 fails on upload's JSON response
                    result = JSON.parse(data.jqXHR.responseText);
                } else if (data.textStatus == 'success') {
                    result = data.result;
                }

                var temp = {};                

                if ($.browser.msie && $.browser.version < 10) {
                    temp.isUploaded = result.files.files[0].isUploaded;
                    temp.name = result.files.files[0].name;
                    temp.url = result.files.files[0].url;
                    temp.id = result.files.files[0].id;
                    temp.message = result.files.files[0].message;
                }else {
                    temp.isUploaded = data.result.isUploaded;
                    temp.name = data.result.name;
                    temp.url = data.result.url;
                    temp.id = data.result.id;
                    temp.message = data.result.message;
                }

                if(!temp.isUploaded) {
                    $("#fileerror").text(temp.message);
                    return;
                }

                var saveUrl = ServerReferenceFileCenterAPI + "?AttachmentID=" + temp.id + "&AttachmentName=" + temp.name;
                $("form").attr("action", saveUrl).submit();
            }
        };

        if ($.browser.msie && $.browser.version < 10) {
            opt = $.extend(true, opt, ifopt);
            // console.log("ie: ", opt);
        }
        // opt = $.extend(true, opt, ifopt);

        $('#fileupload').fileupload(opt).prop('disabled', !$.support.fileInput).parent().addClass(jQuery.support.fileInput ? undefined : 'disabled');
    });
});
