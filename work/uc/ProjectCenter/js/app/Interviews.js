/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   czy
 * @Last Modified time: 2016-08-01 09:48:51
 */
'use strict';
require(['ut', 'ui', 'purl', "moment", "text!tpl/Interviews.html", "loading", "jPages"],
    function(UT, UI, purl, moment, InterviewsTpl) {
        // 约谈列表
        $(function() {
            var url = purl();
            var bid = url.param("id");

            function Interviews(bid) {
                $("#pageList").isLoading({
                    text: "",
                    position: "overlay"
                });
                var optInterviews = {
                    "name": '/CFFinancingParty/InterviewsList',
                    "data": {
                        id: bid
                    }
                };

                UT.jaxJson(optInterviews).then(function(data) {
                    _.each(data.Data, function(v) {
                        v.CreateDate = moment(v.CreateDate).format("YYYY-MM-DD HH:mm:ss");
                    });

                    var template = _.template(InterviewsTpl);
                    var tempdata = {
                        "datas": data.Data.reverse()
                    };
                    $("#pageList").isLoading('hide');
                    $('.table tbody').empty().append(template(tempdata));

                    if (data.Data.length > 5) {
                        $("#pageList").jPages({
                            containerID: "ytList tbody",
                            perPage: 5,
                            startPage: 1,
                            startRange: 1,
                            midRange: 5,
                            endRange: 1
                        });
                    }
                });
            }

            Interviews(bid);
            // 约谈回复

            $("#ytReplay").click(function(e) {
                $(".replybox").show();
                $(this).hide();
            });

            $(".close").click(function(e) {
                $("#ytReplay").show();
                $(".replybox").hide();
                $(".rtextarea").val('');
            });

            $(".send").click(function(e) {
                var contents = $(".rtextarea").val() || '';

                var ytopt = {
                    "name": CreateInterviewsContents,
                    "data": {
                        interviewsId: bid,
                        contentsId: 0,
                        contents: contents
                    }
                };

                UT.jaxJson(ytopt, true).then(function(data) {
                    UI.inTip(data);
                    $("#ytReplay").show();
                    $(".replybox").hide();
                    $(".rtextarea").val('');
                    if (data == "success") {
                        Interviews(bid);
                    }
                });
            });

        });
    }
);
