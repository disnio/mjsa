$(function () {
    // Change this to the location of your server-side upload handler:
    // var url = 'http://www.wuaim.com/upload';
    var url = 'http://localhost:8000/uploads';
    // 日志: done: [{"name":"Chrysanthemum.jpg","jqXHR":{}}]
    // 日志: success: undefined
    // 日志: complate upload  用 forceIframeTransport 和ie一样只拿到上传的文件名，其它属性没有。
    $('#fileupload').fileupload({
            url: url,
            iframe: true,
            dataType: 'json',
//            发送端的
//             redirect: "http://localhost:4000/cors/result.html?%s",
            sequentialUploads: true,
            // forceIframeTransport: true,
            add: function (e, data) {
                //this will 'force' the submit in IE < 10 必须的 或 iframe transport

                $.each(data.files, function (i, file) {

                    file.jqXHR = data.submit()
                        .success(function (result, textStatus, jqXHR) {
                            console.log("success: ", result);
                        })
                        .error(function (jqXHR, textStatus, errorThrown) {
                        })
                        .complete(function (result, textStatus, jqXHR) {
                            console.log("complate upload")
                        });

                });

            },
            done: function (e, data) {
                console.log("done: ", JSON.stringify(data.files));
                $('.upl').remove();
                if (jQuery.browser.msie && (jQuery.browser.version == '8.0' || jQuery.browser.version == '9.0')) {
                    // 仅仅返回 name
                    $.each(data.files, function (index, file) {
                        $('<p/>').text(file.name).appendTo('#files');
                    });
                } else {
                    $.each(data.files, function (index, file) {
                        $('<p/>').text(file.name).appendTo('#files');
                    });
                }
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            },
            always: function (e, data) {
                var result;
                if (data.textStatus == 'parsererror') { // IE9 fails on upload's JSON response
                    result = JSON.parse(data.jqXHR.responseText);
                } else if (data.textStatus == 'success') {
                    result = data.result;
                }
                console.log("always: ", result)
            }
        }
    );
});