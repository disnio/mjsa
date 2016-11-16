/* 
 * @Author: allen
 * @Date:   2016-01-05 15:52:00
 * @Last Modified by:   czy
 * @Last Modified time: 2016-08-01 09:48:49
 */

require(['ut','purl', "moment","text!tpl/myInterviewsList_Yt.html", "maxlength", "jPages"],
    function(UT, purl, moment, yt) {
        $('.rtextarea').maxlength({
            maxCharacters: 50,
            statusText: " 字符剩下"
        });

        function filterData(data) {
            return _.chain(data).sortBy(function(a, b) {
                return Math.max(parseInt(a.Id, 10), parseInt(b.Id, 10));
            }).each(function(item) {
                item.CreateDate = moment(item.CreateDate).format("YYYY-MM-DD HH:mm");
                // 可能缺失CreatorID 在回复后的返回数据中
                // item.CreatorID = _.random(32, 34);
            }).value();
        }

        function getYt(InterviewsID) {

            var optyt = {
                "name":  '/cfinvestingparty/GetInterviewsProjectContents',
                "data": {
                    'id': InterviewsID
                }
            };
            UT.jaxJson(optyt).then(function(data) {
                var sdata = filterData(data.Data);

                var template = _.template(yt);
                var tempdata = {
                    "datas": sdata,
                    "AccountID": AccountID
                };

                $("#" + InterviewsID + " .child-comments").empty().append(template(tempdata));

                var pageId = (InterviewsID.toString() + " .ytcomm .child-comments").toString();
                var dataSize = sdata.length;
                return [InterviewsID, pageId, dataSize];

            }).then(function(data) {
                if (data[2] > 5) {
                    $("#" + InterviewsID + " .holder").jPages({
                        containerID: data[1],
                        perPage: 5,
                        startPage: 1,
                        startRange: 1,
                        midRange: 5,
                        endRange: 1
                    });
                }

            });
        }

        // 发送回复
        function setYt(opt) {
            var optpost = {
                "name":  '/cfinvestingparty/CreateInterviewsProjectContents',
                "data": opt
            };
            UT.jaxJson(optpost).then(function(data) {
                var sdata = filterData(data.Data);
                var template = _.template(yt);
                var tempdata = {
                    "datas": sdata,
                    "AccountID": AccountID
                };
                $("#" + opt.interviewsId + " .child-comments").empty().append(template(tempdata));
                var pageId = ((opt.interviewsId).toString() + " .ytcomm .child-comments").toString();
                var dataSize = sdata.length;
                return [opt.interviewsId, pageId, dataSize];
            }).then(function(data) {
                if (data[2] > 5) {
                    $("#" + data[0] + " .holder").jPages({
                        containerID: data[1],
                        perPage: 5,
                        startPage: 1,
                        startRange: 1,
                        midRange: 5,
                        endRange: 1
                    });
                }
            });
        }

        var innerList = [];
        $(".cbInner").each(function(i, v) {
            var innerId = $(v).attr("id");
            innerList.push(innerId);
        });
        // 根据inner id 获取约谈数据

        // 为每个inner添加约谈
        _.each(innerList, function(v, i) {
            getYt(v);
        });

        $(".ytcomm").delegate('.send', 'click', function(e) {
            var iid = $(this).attr("data-id");
            var contentBox = $(this).closest('.textarea-wrapper').find(".rtextarea");
            var contents = contentBox.val();

            // 注意更改 accountId --------------------------------------
            var opts = {
                'interviewsId': iid,
                'accountId': AccountID,
                'contents': contents
            };
            $(this).closest('.ytcomm').find('.replay').show();
            contentBox.val("");
            setYt(opts);
        });

        $(".reply").click(function(e) {
            var replaybox = $(e.currentTarget).closest(".ytcomm").find(".replybox");
            replaybox.find(".rtextarea").empty();
            replaybox.show();
            $(this).hide();
        });

        $(".close").click(function(e) {
            $(this).closest('.ytcomm').find('.reply').show();
            $(this).closest('.replybox').hide();
        });


    }
);
