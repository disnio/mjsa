/* 
 * @Author: czy
 * @Date:   2016-07-27 09:59:28
 * @Last Modified by:   czy
 * @Last Modified time: 2016-07-28 17:06:47
 */

'use strict';

$(function() {
    var userid = $("#userID").val();
    //console.log(userid);
    //追加评论
    $("#comment-list").delegate('.reply', 'click', function(e) {
        var ID = $(e.currentTarget).attr("data-pid");
        $("#appendSubmitBtn").click(function(event) {
            var AppendComment = $("#message-text").val();
            var AppendCommentOpt = {
                "type": "get",
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/comment/appendcomment',
                "contentType": "application/json",
                "data": {
                    Content: AppendComment,
                    Id: ID
                }
            };
            UT.jaxJson(AppendCommentOpt, true).then(function(data) {
                console.log(data);
                UI.inTip(data.Msg).then(function() {
                    if (data.Success == true) {
                        textOpt();
                    }
                });
            });
        });
    });
    //
   
    //分页显示
    function textOpt() {
        var jaxOpt = {
            ajax: {
                "type": "get",
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/comment/getcommentlistforbuyer',
                "contentType": "application/json",
                "data": {
                    buyerid: userid,
                    pageIndex: 1,
                    Pagesize: 5
                }
            },
            pageData: "CommentList",
            // 放置返回数据列表容器
            el: $("#comment-list"),
            // 列表模板
            tpl: $("#commentListTpl").html(),
            // 分页插件
            pageFunc: $.fn.smartpaginator,
            // 分页
            page: {
                // 页码容器
                pageEl: $("#smart-paginator"),
                // 每页包含的数量
                perPage: 5,
                // 总页数
                numLen: 3
            },
            callback: function(data) {
                
            } 
        };

        UT.jaxPage(jaxOpt)
    }
    textOpt();

})
