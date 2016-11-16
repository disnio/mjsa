/* 
 * @Author: Allen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   czy
 * @Last Modified time: 2016-08-01 09:48:50
 */

'use strict';
require(['ut', 'ui', 'purl', "maxlength"], function(UT, UI, purl) {
    // 约谈项目方
    var pid;
    // 是否约谈过应提前判断，服务端应给对应接口，和提交约谈的接口不同
    // $(".inProBtn").click(function(e) {
    //     pid = $(this).attr("data-pid");
    //     $("#inProTxt").val('');
    //     var pjname = $(this).closest(".cbInner").find(".ProjectCreateName");
    //     $("#inProModal .cytname").text(pjname.text());
    // });
    $(".inProBtn").click(function(e) {
        // $("#inProBtn .modal-dialog").hide();
        if (AccountID === '0') {
            e.stopPropagation();
            $("#inProModal").modal('hide');
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
            var pjname = $(this).closest(".cbInner").find(".ProjectCreateName");
            
            if (data === true) {
                $("#inProModal").modal('hide');
                UI.inTip("已经约谈过了");
                return;
            } else {
                $("#inProBtn").find(".modal-dialog").css("display", "block");
                $("#inProTxt").val('');
                $("#inProModal .cytname").text(pjname.text());
                // $("#inProModal").modal('show');                                              
            }

        });

    });
    $("#inProSubmit").click(function() {
        var contents = $("#inProTxt").val() || '';
        var ytopt = {
            "webUrl": ucConfig.ServerReferenceJavaScript,
            "name": '/CFInvestingParty/CreateInterviews',
            "data": {
                'projectId': pid,
                'contents': contents
            }
        };

        UT.jaxJson(ytopt, true).then(function(data) {
            $("#inProModal").modal('hide');
            UI.inTip(data);
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
            }
        };

        UT.jaxJson(nscopt, true).then(function(data) {
            // $("#inProModal").modal('hide');
            UI.inTip(data);
            location.reload();
        });

    });
});
