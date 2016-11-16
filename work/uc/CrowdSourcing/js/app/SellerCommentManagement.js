/*
* @Author: whj
* @Date:   2016-07-27 15:15:50
* @Last Modified by:   Allen
* @Last Modified time: 2016-07-29 14:40:24
*/
$(function () {
    //https://web-dev.ucdl.cn/crowdsourcing/comment/getcommentlistforseller
    var userid = $("#userID").val();  
    //回复
    $("#comment-list").delegate('.reply', 'click', function (e) {
        $("#myModal").modal("show");
        var ID = $(e.currentTarget).attr("data-pid");
        $("#appendSubmitBtn").click(function (event) {
            var ReplyComment = $("#message-text").val();
            var ReplyCommentOpt = {
                "type": "get",
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/comment/replycomment',
                "contentType": "application/json",
                "data": {
                    Content: ReplyComment,
                    Id: ID
                }
            };
            UT.jaxJson(ReplyCommentOpt, true).then(function (data) {
                
                $("#myModal").modal("hide");
                UI.inTip(data.Msg).then(function () {
                    if (data.Success == true) {
                        textOpt({
                            degree: 0,
                            productName: '',
                            sellerid: userid
                        });
                    }
                });
            });
        });
    });
    
    //分页显示
    function textOpt(opt) {
        var jaxOpt = {
            ajax: {
                "type": "get",
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/Comment/GetCommentListForSeller',
                "contentType": "application/json",
                "data": {
                    degree: opt.degree,
                    Pagesize: 2,
                    productName: opt.productName ,
                    sellerid: opt.sellerid
                }
            },
            pageData: "CommentList",
            // 放置返回数据列表容器
            el: $(".comment-list"),
            // 列表模板
            tpl: $("#SellerCommentTpl").html(),
            // 分页插件
            pageFunc: $.fn.smartpaginator,
            // 分页
            page: {
                // 页码容器
                pageEl: $("#smart-paginator"),
                // 每页包含的数量
                perPage: 2,
                // 总页数
                numLen: 3
            },
            callback: function (data) {

            }
        };

        UT.jaxPage(jaxOpt)
    }
//点击查询按钮
    $(".btnsearch").click(function (e) {
        var opt = {};
        opt.degree = $(".starselect option:selected").val() || 0;
        opt.productName = $(".js-product-name").val() || '';

        textOpt({
            degree:opt.degree,
            productName:opt.productName,
            sellerid: userid
        });
    });

    textOpt({
        degree: 0,
        productName: '',
        sellerid: userid
    });


})

