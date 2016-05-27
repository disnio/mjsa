/* 
 * @Author: Allen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-05-26 16:55:52
 */

'use strict';
require(['jquery', '_', './js/uc.ut', './js/uc.ui', 'purl', "maxlength"], function($, _, UT, UI, purl) {
    // 约谈项目方
    var pid;
    // 约谈项目方，需要一个接口查询是否约谈过，登录判断才可进行约谈。
    var ytDialog = dialog({
        title: '约谈项目方',
        content: $("#inProModal"),
        okValue: '提交约谈',
        ok: function() {
            var contents = $("#inProTxt").val() || '';
            var ytopt = {
                "webUrl": ucConfig.ServerReferenceJavaScript,
                "name": '/CFInvestingParty/CreateInterviews',
                "data": {
                    'projectId': pid,
                    'contents': contents
                },
                "dataType": "html"
            };

            UT.jaxJson(ytopt, true).then(function(data) { 
                ytDialog.close();               
                UI.inTip(data);
            });
            return false;
        },
        cancelValue: '取消',
        cancel: function() {}
    });
    $(".inProBtn").click(function(e) {
        var _self = this;
        if (AccountID === '0') {
            e.stopPropagation();
            UI.inTip("请先登录再约谈项目方！");
            return;
        }
        pid = $(this).attr("data-pid");
        // 跨域需要jsonp
        var ytopt = {
            "name": '/CFInvestingParty/IsInterviews',
            "data": {
                'projectId': pid,
                'accountId': AccountID
            },
            dataType: "json"
        };

        UT.jaxJson(ytopt).then(function(data) {
            var pjname = $(_self).attr("data-pname");
           
            if (data === true) {
                UI.inTip("已经约谈过了");
                return;
            } else {
                $("#inProTxt").val('');
                $("#inProModal .cytname").text(pjname);
                ytDialog.width(600).show();
            }

        });

    });

    $('#inProTxt').maxlength({
        maxCharacters: 100,
        statusText: " 字符剩下"
    });

    // 取消收藏该项目------------------------------适当修改
    $("#cCollProBtn").click(function() {
        var loc = $(this).closest(".cbInner").find(".summary a:first").attr("href");
        var aid = purl(loc).param("id");

        var nscopt = {
            "webUrl": ucConfig.ServerReferenceJavaScript,
            "name": '/CFInvestingParty/UnFavorite',
            "data": {
                'projectId': aid
            },
            "dataType": "html"
        };

        UT.jaxJson(nscopt, true).then(function(data) {            
            UI.inTip(data);
            location.reload();
        });

    });
});
