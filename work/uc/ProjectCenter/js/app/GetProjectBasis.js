/* 
 * @Author: Allen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-09-29 17:49:29
 */
// 'use strict';
require(['ut','ui','purl', "moment", "text!tpl/getProjectBasic_Info.html", "loading", "maxlength", 'jPages'],
    function(UT, UI, purl, moment, basicInfo) {
        $(function() {

            var url = purl();
            var bid = url.param("id");

            // 约谈项目方按钮要用到创建者名称
            var CreatorName = '';
            // 项目基本信息
            var xmopt = {
                baseUrl:ucConfig.ServerReferenceCrowdFundingAPI, 
                dataType: 'jsonp',
                "name": '/CFProject/GetProjectBasis/',
                "data": {
                    id: bid
                }
            };
            $(".subContent .detail").isLoading({
                text: "",
                position: "overlay"
            });
            UT.jaxJson(xmopt).then(function(data) {

                data.Data.CreationDate = moment(data.Data.CreationDate).format("YYYY-MM-DD HH:mm:ss");
                data.Data.CompanyEstablishingDate = moment(data.Data.CompanyEstablishingDate).format("YYYY-MM-DD");
                var template = _.template(basicInfo);
                CreatorName = data.Data.CreatorName;

                var itemdata = {
                    "item": data.Data
                };

                $(".subContent .detail").isLoading("hide");
                $(".subContent .detail").empty().append(template(itemdata));
            });


            function IsInterviews(e){

            }
            
            // 约谈项目方，需要一个接口查询是否约谈过，登录判断才可进行约谈。
            
            $("#inProBtn").click(function(e) {
                // $("#inProBtn .modal-dialog").hide();
                if (AccountID === '0') {
                    e.stopPropagation();
                    $("#inProModal").modal('hide');
                    UI.inTip("请先登录再约谈项目方！");
                    return;
                } 
                // 跨域需要jsonp
                var ytopt = {
                    "name": '/cfinvestingparty/IsInterviews',
                    "data": {
                        'projectId': bid,
                        'accountId': AccountID
                    },
                    dataType: "json"

                };

                UT.jaxJson(ytopt).then(function(data) {   

                    if(data === true) {
                        $("#inProModal").modal('hide');
                        UI.inTip("已经约谈过了");
                        return;                        
                    } else {            
                        $("#inProBtn").find(".modal-dialog").css("display", "block");
                        $("#inProTxt").val('');
                        $(".cytname").text(CreatorName);
                        // $("#inProModal").modal('show');                                              
                    }             

                });

            });
            // 约谈项目方
            $("#inProSubmit").click(function() {

                var contents = $("#inProTxt").val() || '';               
                var ytopt = {
                    "webUrl": ucConfig.ServerReferenceJavaScript,
                    "name": '/CFInvestingParty/CreateCollect',
                    "data": {
                        'projectId': bid,
                        'contents': contents
                    }
                };

                UT.jaxJson(ytopt, true).then(function(data) {                    
                    $("#inProModal").modal('hide');
                    UI.inTip(data);
                });

            });
            // 约谈留言字数限制
            $('#inProTxt').maxlength({
                maxCharacters: 100,
                statusText: " 字符剩下"
            });

            // 收藏该项目， 服务接口返回数据应该为json
            $("#collProBtn").click(function(e) {
                e.preventDefault();
                var scopt = {
                    "webUrl": ucConfig.ServerReferenceJavaScript,
                    "name": '/CFInvestingParty/CreateCollect',
                    "contentType": "application/json",                    
                    "data": {
                        'projectId': bid
                    }
                };
                if (AccountID == '0') {
                    e.stopPropagation();
                    $("#inProModal").modal('hide');
                    UI.inTip("请先登录再收藏项目！");
                    return;
                } else {
                    UT.jaxJson(scopt, true).then(function(data) {
                        console.log(data)
                        // $("#inProModal").modal('hide');
                        UI.inTip(data);
                    });
                }
            });

            // 融资金额及进度
            var rzopt = {
                "name": '/CFProject/GetPorojectFinancingInfo/' + bid,
                "data": ''
            };

            UT.jaxJson(rzopt).then(function(data) {
                data.ComplatedRate = ((data.RecognitionAmount / data.FinancingAmount) * 100).toFixed(2);
                data.FinancingAmount = (data.FinancingAmount / 10000).toFixed(2);
                data.AssessmentAmount = (data.AssessmentAmount / 10000).toFixed(2);
                data.StartingAmount = (data.StartingAmount / 10000).toFixed(2);
                data.RecognitionAmount = (data.RecognitionAmount / 10000).toFixed(2);

                // 融资金额
                $("#rz-je").text(data.FinancingAmount + '万');

                // 评估金额
                $("#rz-gf").text(data.AssessmentAmount + "万");

                // 款项拨付方式
                $("#rz-fs").text(data.PaymentType);

                // 起投金额
                $("#rz-qt").text(data.StartingAmount + '万');

                // 认投金额
                $("#rz-rt").text(data.RecognitionAmount + '万');

                // 跟投人数
                $("#rz-gt").text(data.FollowerCount + '人');

                // 询价人数
                $("#rz-xj").text(data.AssessorCount + '人');

                // 认投完成率
                $("#rz-wc").text(data.ComplatedRate + '%');

                $(".progressFinish").width(data.ComplatedRate + '%');
            });

        });
    });
