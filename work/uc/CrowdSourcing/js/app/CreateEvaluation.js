/* 
* @Author: czy
* @Date:   2016-07-26 14:28:33
* @Last Modified by:   czy
* @Last Modified time: 2016-07-26 15:26:52
*/

'use strict';
var degree = ['1分 很差', '2分 不满', '3分 一般', '4分 满意', '5分 惊喜'];
$.ajaxSetup({
    async: false
});
$(document).ready(function () {
    var commentSubmit = function () {
        var list = [];
        $(".create-list li").each(function () {
            var productID = $(this).find(".productID").val();
            var productOrderID = $(this).find(".productOrderID").val();
            var productSKUID = $(this).find(".productSKUID").val();
            var content = $(this).find(".content").val();
            var star = $(this).find(".level_solid").length;
            var comment = {
                content: content,
                csproductid: productID,
                csproductorderid: productOrderID,
                csproductskuid: productSKUID,
                star: star
            };
            list.push(comment);
        });
        var fail = false;
        var emptyVaild = false;
        $.each(list, function (i, item) {
            if (item.content == "undefined" || item.content == null || $.trim(item.content) == "" || $.trim(item.content) == "请输入评论") {
                $(".msg").html("请确认全部商品的评论内容不为空");
                emptyVaild = true;
            }
            if (item.star <= 0) {
                $(".msg").html("请确认都全部商品进行了星级评价");
                emptyVaild = true;
            }
            if (emptyVaild) {
                $.post("../comment/createcomment",
                       {
                           content: item.content,
                           csproductorderid: item.csproductorderid,
                           csproductid: item.csproductid,
                           csproductskuid: item.csproductskuid,
                           star: item.star
                       },
                       function (data) {
                           if (data.Success == false) {
                               fail = true;
                           }
                       }
                 );
            }
        });
        if (emptyVaild == false) {
            if (fail) {
                $(".msg").html("评论失败");
            }
            else {
                $(".msg").html("评论成功");
                var t = setTimeout(function () { location.href = "../EmployerOrder/EmployerOrderList" }, 1000);
            }
            var list = [];
            $(".create-list li").each(function () {
                var productID = $(this).find(".productID").val();
                var productOrderID = $(this).find(".productOrderID").val();
                var productSKUID = $(this).find(".productSKUID").val();
                var content = $(this).find(".content").text();
                var star = $(this).find(".level_solid").length;
                var comment = {
                    content: content,
                    csproductid: productID,
                    csproductorderid: productOrderID,
                    csproductskuid: productSKUID,
                    star: star
                };
                list.push(comment);
            });
            var fail = false;
            var emptyVaild = false;
            $.each(list, function (i, item) {
                if (item.content == "undefined" || item.content == null || $.trim(item.content) == "" || $.trim(item.content) == "请输入评论") {
                    $(".msg").html("请确认全部商品的评论内容不为空");
                    emptyVaild = true;
                }
                if (item.star <= 0) {
                    $(".msg").html("请确认都全部商品进行了星级评价");
                    emptyVaild = true;
                }
                if (emptyVaild) {
                    $.post("../comment/createcomment",
                           {
                               content: item.content,
                               csproductorderid: item.csproductorderid,
                               csproductid: item.csproductid,
                               csproductskuid: item.csproductskuid,
                               star: item.star
                           },
                           function (data) {
                               if (data.Success == false) {
                                   fail = true;
                               }
                           }
                     );
                }
            });
            if (emptyVaild == false) {
                if (fail) {
                    $(".msg").html("评论失败");
                }
                else {
                    $(".msg").html("评论成功");
                    var t = setTimeout(function () { location.href = "../EmployerOrder/EmployerOrderList" }, 1000);
                }
            }
        }

    }
    $(".commentBtn").click(function () {
        commentSubmit();
    });
});
$(function () {
    $(".level i").click(function () {
        var num = $(this).index();
        var list = $(this).parent().find('i');
        for (var i = 0; i <= num; i++) {
            list.eq(i).attr('class', 'level_solid');
        }
        for (var i = num + 1, len = list.length - 1; i <= len; i++) {
            list.eq(i).attr('class', 'level_hollow');
        }
        $(this).parent().next().html(degree[num]);
    })


})