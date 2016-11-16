/* 
 * @Author: Allen
 * @Date:   2016-02-03 09:37:24
 * @Last Modified by:   czy
 * @Last Modified time: 2016-09-09 10:26:03
 */
'use strict';
require(['ut', 'ui', 'purl', 'bdeditor', 'validate', 'jquery.fileupload', 'bdlang', 'jquery.migrate'],
    function(UT, UI, purl, UE, validate) {

        $(function() {

            $('textarea').each(function(i, v) {
                var id = $(this).attr('id');
                UE.getEditor(id);

            });
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
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize: 1000000, // 1MB
                minFileSize: 1000, // 1k

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
                    if (data.textStatus == 'parsererror') { // IE9 fails on upload's JSON response
                        result = JSON.parse(data.jqXHR.responseText);
                    } else if (data.textStatus == 'success') {
                        result = data.result;
                    }

                    var temp = {};

                    if ($.browser.msie && $.browser.version < 10) {
                        temp.name = result.files.files[0].name;
                        temp.url = result.files.files[0].url;
                        temp.id = result.files.files[0].id;
                    } else {
                        temp.name = data.result.name;
                        temp.url = data.result.url;
                        temp.id = data.result.id;
                    }

                    $("#preview").empty();
                    $("#preview").append('<img src="' + temp.url + '" />');
                    $("#preview").css("display", "block");
                    $("#IconID").val(temp.id);
                }
            };

            if ($.browser.msie && $.browser.version < 10) {
                opt = $.extend(true, opt, ifopt);
                console.log("ie: ", opt);
            }

            $('#fileupload').fileupload(opt).prop('disabled', !$.support.fileInput).parent().addClass(jQuery.support.fileInput ? undefined : 'disabled');
            //form 表单提交前验证
            $("form").submit(function(){
                var DynamicTitleVal = $.trim($("#DynamicTitle").val());
                var DynamicContentVal = $.trim($("#DynamicContent").val());
                if(DynamicTitleVal == ""){
                    UI.inTip("请您输入动态标题！").then(function(){
                        $("#DynamicTitle").focus();
                    });
                    return false;
                }
                if(DynamicContentVal == ""){
                    UI.inTip("请您输入动态内容！").then(function(){
                        $("#DynamicContent").focus();
                    });
                    return false;
                }
            });
        });
    }
);
