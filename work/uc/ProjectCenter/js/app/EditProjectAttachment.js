define(['ui', 'jquery.fileupload', 'jquery.migrate', 'jquery.fileupload-process', 'jquery.fileupload-validate'], function(UI) {
    $(function() {

        var opt = {
            upload: $.fn.fileupload,
            container: $('#fileupload'),
            url: ImgSingleUploadUrl,
            
            maxFileSize: 15000000, // 15MB
            minFileSize: 1000, // 1k
            callback: function(temp) {
                $("#preview").empty();
                $("#preview").append('<img src="' + temp.url + '" />');
                $("#IconID").val(temp.id);
                if (!temp.isUploaded) {
                    $("#fileerror").text(temp.message);
                    return;
                }
                var saveUrl = ServerReferenceFileCenterAPI + "?AttachmentID=" + temp.id + "&AttachmentName=" + temp.name;
                $("form").attr("action", saveUrl).submit();
            }
        };

        // $('#fileupload').fileupload(opt).prop('disabled', !$.support.fileInput).parent().addClass(jQuery.support.fileInput ? undefined : 'disabled');
        UI.fileUpload(opt);

        if ($('#hidApplyProjectSuccess').html() == "True") {
            UI.genSingleModal({
                // 显示或隐藏关闭按钮
                btnClose: true,
                // 关闭按钮名称
                btnCloseName: "取消",
                btnSave: false,
                btnSaveName: "提交",
                // 弹窗标题
                title: "请等待审核!",
                // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
                body: $('<a class="have-information">查看已发布的项目信息</a><a class="go-on">继续发布</a>'),
                // 关闭按钮点击时运行
                close: function(modal) {
                    console.log("close")
                },
                // 保存按钮点击是运行， modal 为传入的弹窗实例
                save: function(modal) {
                    console.log("save")
                },
                // 弹窗打开后运行
                callback: function(modal) {
                    console.log("callback");
                    $(".have-information").click(function() {
                        if (SessionHelper > 0) {
                            window.location.href = ucConfig.ServerReferenceLocationCenter + "/ProjectSpace/myprojectlist";
                        } else {
                            window.location.href = ucConfig.ServerReferenceJavaScript + "/CFMyProjects/ViewProjectList";
                        }
                    });
                    $(".go-on").click(function() {
                        window.location.href = ucConfig.ServerReferenceJavaScript + "/CFMyProjects/EditProjectBasis";
                    });

                }
            });
        }


        $(".btn-savesuccess").click(function(e) {
            e.preventDefault();
            UI.inTip("保存成功!").then(function() {
                $("form").attr("action", ucConfig.ServerReferenceJavaScript + "/CFMyProjects/UpdataProjectAttachment").submit();

            });
        });

    });
});
