/* 
 * @Author: czy
 * @Date:   2016-08-05 17:01:53
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-10 17:04:45
 */

'use strict';
require(["ui", "ut", "purl"], function(UI, UT, purl) {
    $(function() {

        var url = purl();
        var oriurl = url.attr('protocol') + '://' + url.attr('host') + url.attr('path');
        var gourl = function() {
            var res = '';
            _.each(sopt, function(v, i) {
                if (_.isArray(v)) {
                    res += i + '=' + v.join(',') + "&";
                } else {
                    res += i + '=' + v + "&";
                }
            })
            var gurl = oriurl + '?' + res;
            console.log(gurl)

            setTimeout(function() {
                window.location.replace(gurl);
            }, 400);
            console.log(gurl);
        };
        //条件筛选
        var sopt = {
            InvestmentCategoryID: url.param("InvestmentCategoryID") || '',
            CityID: url.param("CityID") || '',
            IndustryID: url.param("IndustryID") || '',
            AmountRange: url.param("AmountRange") || '',
            Word: ''
        };
        //获取项目列表 - 所在地区：
        //http://xiong.ucdl.cn/CrowdFundingAPI/CFProject/ProjectsIndustryList
        var getProvinceOpt = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
            "name": '/CFProject/ProjectsCityList',
            "dataType": "json"
        }
        UT.jaxJson(getProvinceOpt).then(function(data) {
                //console.log(data);
                var op = "";
                for (var i = 0; i < data.Data.length; i++) {
                    op += '<a data-id= ' + data.Data[i].ID + '>';
                    op += data.Data[i].Name;
                    op += '</a>';
                }
                $("#regionAdd").append(op);
                if (sopt.CityID == '') {
                    if (!$("#regionAdd a:first").hasClass('active')) {
                        $("#regionAdd a:first").addClass('active')
                    }
                } else {
                    $("#regionAdd a").each(function(i, v) {
                        //console.log($(v).attr("data-id"));
                        if ($(v).attr("data-id") == sopt.CityID) {
                            $("#regionAdd a").removeClass('active');
                            $(v).addClass('active');
                        }
                    })
                }
            })
        //获取项目列表 - 所属行业：
        http://xiong.ucdl.cn/CrowdFundingAPI/CFProject/ProjectsCityList
        var getindusOpt = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
            "name": '/CFProject/ProjectsIndustryList',
            "dataType": "json"
        }
        UT.jaxJson(getindusOpt).then(function(data) {
            console.log(data);
            var indus = "";
            for (var i = 0; i < data.Data.length; i++) {
                indus += '<a data-id=' + data.Data[i].ID + '>';
                indus += data.Data[i].Name;
                indus += '</a>';
            }
            $("#industryIn").append(indus);
            if (sopt.IndustryID == '') {
                if (!$("#industryIn a:first").hasClass('active')) {
                    $("#industryIn a:first").addClass('active')
                }
            } else {
                $("#industryIn a").each(function(i, v) {
                    //console.log($(v).attr("data-id"));
                    if ($(v).attr("data-id") == sopt.IndustryID) {
                        $("#industryIn a").removeClass('active');
                        $(v).addClass('active');
                    }
                })
            }
        });
        //获取基金列表 - 条件—__投资方式/融资方式：
        //http://xiong.ucdl.cn/CrowdFundingAPI/CFInvestingParty/GetCFInvestmentCategory
        var getmodeOpt = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
            "name": '/CFInvestingParty/GetCFInvestmentCategory',
            "dataType": "json"
        }
        var Typearry ='';
        UT.jaxJson(getmodeOpt).then(function(data) {
            console.log(data);
            var modes = "";
            for (var i = 0; i < data.Data.length; i++) {
                modes += '<a data-id=' + data.Data[i].ID + '>';
                modes += data.Data[i].Name;
                modes += '</a>';
            }
            $("#investmentMode").append(modes);
            Typearry = data;
            //console.log(Typearry);
            if (sopt.InvestmentCategoryID == '') {
                if (!$("#investmentMode a:first").hasClass('active')) {
                    $("#investmentMode a:first").addClass('active')
                }
            } else {
                $("#investmentMode a").each(function(i, v) {
                    //console.log($(v).attr("data-id"));
                    if ($(v).attr("data-id") == sopt.InvestmentCategoryID) {
                        $("#investmentMode a").removeClass('active');
                        $(v).addClass('active');
                    }
                })
            }
        });
        //点击”约谈项目方“相应弹窗出项
        $(".yuetan").click(function() {
                //判断是否登陆和是否为投资方
                var CFProjectID = $(this).siblings("input[name=CFProjectID]").val();
                var CFInvestmentCategoryID = $(this).siblings("input[name=CFInvestmentCategoryID]").val();
                var CreatorID = $("input[name=CreatorID]").val();
                var OrgainzationID = $("input[name=OrgainzationID]").val();
                var InvestingPartyID = $("input[name=InvestingPartyID]").val();

                if (!CreatorID || CreatorID == "0") {
                    window.location = ucConfig.ServerReferenceUserCenter + "/Account/Login?FromAPP=" + encodeURIComponent(window.location.href);
                    return false;
                } else if (!InvestingPartyID || InvestingPartyID == "0") {
                    UI.inTip("您不是投资方,不能申请投资");
                    return false;
                }
                var yuetanHtml = $("#yuetanTpl").html();
                
                UI.genSingleModal({
                    // 显示或隐藏关闭按钮
                    btnClose: false,
                    // 关闭按钮名称
                    btnCloseName: "取消",
                    btnSave: true,
                    btnSaveName: "提交申请",
                    // 弹窗标题
                    title: "约谈项目方",
                    // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
                    body: $(yuetanHtml),
                    // 关闭按钮点击时运行
                    close: function(modal) {
                        //console.log("close")
                    },
                    // 保存按钮点击是运行， modal 为传入的弹窗实例
                    save: function(modal) {
                        //点击“提交申请”，发送数据
                        var user = {};
                        user.CFProjectID = CFProjectID;
                        user.CFFundID = $("#projectnameList option:selected", modal).val();
                        user.Contents  = $("#Contents", modal).val();
                        user.OrganizationID = OrgainzationID;
                        user.CreatorID = CreatorID;
                        
                        //console.log(user); 
                        var applymasgOpt = {
                            "type": "post",
                            "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                            "name": '/CFInvestingParty/AddFundInterviews',
                            "dataType": "json",
                            "data": user
                        }
                        UT.jaxJson(applymasgOpt, true).then(function(data) {                            
                            UI.inTip(data.ErrorMsg);                            
                        }); 
                       
                    },
                    // 弹窗打开后运行
                    callback: function(modal) {
                        // 请求项目名称列表
                        // http://czy.ucdl.cn/CrowdFundingAPI/CFInvestingParty/GetMyCFFund
                        var getprojectNameOpt = {
                            "type": "get",
                            "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                            "name": '/CFInvestingParty/GetMyCFFund',
                            "dataType": "json",
                            "data": {
                                CreatorID: CreatorID,
                                OrganizationID: OrgainzationID,
                                CFInvestmentCategoryID: CFInvestmentCategoryID
                               
                            }
                        }
                        UT.jaxJson(getprojectNameOpt, true).then(function(data) {
                            //console.log(data);
                            var nameArry = '';
                            for (var i = 0; i < data.Data.length; i++) {
                                nameArry += '<option value=' + data.Data[i].CFFundID + '>';
                                nameArry += data.Data[i].CFFundName;
                                nameArry += '</option>';
                            }
                            $('#projectnameList').append(nameArry);
                        });
                        
                    },
                    // 保存前条件判断，返回true则通过保存，fasle 则不保存
                    cond: function(modal) {
                        var user = {};
                        user.Contents  = $("#Contents", modal).val();
                       if (!/\S{2,200}/.test(user.Contents)) {
                            UI.inTip("请输入2-200字符长度的投资原因");
                            return false;
                        }
                        return true;
                    }

                });
            })
            //点击”投递项目“相应弹窗出项
        $(".toudi").click(function() {
                //判断是否登陆和是否为融资方
                var CFProjectID = $(this).siblings("input[name=CFProjectID]").val();
                var CFInvestmentCategoryID = $(this).siblings("input[name=CFInvestmentCategoryID]").val();
                var CreatorID = $("input[name=CreatorID]").val();
                var OrgainzationID = $("input[name=OrgainzationID]").val();
                var InvestingPartyID = $("input[name=InvestingPartyID]").val();
                var InvestmentCategory = $(this).siblings("input[name=InvestmentCategory]").val();
                if (!CreatorID || CreatorID == "0") {
                    window.location = ucConfig.ServerReferenceUserCenter + "/Account/Login?FromAPP=" + encodeURIComponent(window.location.href);
                    return false;
                } else if (!InvestingPartyID || InvestingPartyID == "0") {
                    UI.inTip("您不是投资方,不能申请投资");
                    return false;
                }
                var rognziHtml = $("#rongziTpl").html();
                //弹窗显示
                UI.genSingleModal({
                    btnClose: false,
                    btnCloseName: "取消",
                    btnSave: true,
                    btnSaveName: "提交申请",
                    title: "申请投资",
                    body: $(rognziHtml),
                    save: function(modal) {
                        //点击”提交申请按钮“，发送数据
                        var user = {};
                        user.CFProjectID = CFProjectID;
                        user.CFInvestmentCategoryID = $("#CFInvestmentCategoryID option:selected", modal).val();
                        user.InvestmentAmount = $("#amount", modal).val();
                        user.AmountUnits = $("#amountUnit option:selected", modal).val();
                        user.InvestmentReasons = $("#reason", modal).val();
                        user.OrganizationID = OrgainzationID;
                        user.CreatorID = CreatorID;
                        user.CFFundID = $("#entryName option:selected", modal).val();
                        var applyfinancingOpt = {
                            "type": "post",
                            "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                            "name": '/CFInvestingParty/AddCFInvestmentInfo',
                            "dataType": "json",
                            "data": user
                        }
                        UT.jaxJson(applyfinancingOpt, true).then(function(data) {
                                UI.inTip(data.ErrorMsg);
                        });
                    },
                    callback: function(modal) {
                        // 请求基金名称列表
                        $("#CFInvestmentCategoryIDval").val(InvestmentCategory);
                        var getEntryOpt = {
                            "type": "get",
                            "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                            "name": '/CFInvestingParty/GetMyCFFund',
                            "dataType": "json",
                            "data": {
                                CreatorID: CreatorID,
                                OrganizationID: OrgainzationID,
                                CFInvestmentCategoryID: CFInvestmentCategoryID,
                                InvestmentCategory:InvestmentCategory
                            }
                        }
                        UT.jaxJson(getEntryOpt, true).then(function(data) {
                            //console.log(data);
                            var nameArry = '';
                            for (var i = 0; i < data.Data.length; i++) {
                                nameArry += '<option value=' + data.Data[i].CFFundID + '>';
                                nameArry += data.Data[i].CFFundName;
                                nameArry += '</option>';
                            }
                            $('#entryName').append(nameArry);
                        });
                        //投资类型
                        var typeArry = '';
                        //console.log(Typearry);
                        for (var i = 0; i < Typearry.Data.length; i++) {
                            typeArry += '<option value=' + Typearry.Data[i].ID + '>';
                            typeArry += Typearry.Data[i].Name;
                            typeArry += '</option>';
                        }
                        //console.log(typeArry);
                        $('#CFInvestmentCategoryID').append(typeArry);
                        
                    },
                    // 保存前条件判断，返回true则通过保存，fasle 则不保存
                    cond: function(modal) {
                        var user = {};
                        user.FinancingAmount = $("#amount", modal).val();
                        user.InvestmentReasons = $("#reason", modal).val();
                        if (!/[1-9]\d*\.?\d*/.test(user.FinancingAmount)) {
                            UI.inTip("输入金额为必填项，请您填写正确的数字格式");
                            return false;
                        } else if (!/\S{2,200}/.test(user.InvestmentReasons)) {
                            UI.inTip("请输入2-200字符长度的投资原因");
                            return false;
                        }
                        return true;
                    }
                });
            });
            //投资金额高亮显示
        if (sopt.AmountRange == '') {
            if (!$("#investmentAmount a:first").hasClass('active')) {
                $("#investmentAmount a:first").addClass('active')
            }
        } else {
            $("#investmentAmount a").each(function(i, v) {
                //console.log($(v).attr("data-id"));
                if ($(v).attr("data-id") == sopt.AmountRange) {
                    $("#investmentAmount a").removeClass('active');
                    $(v).addClass('active');
                }
            })
        }
        // 点击搜索标签
        $(".modes").delegate('a', 'click', function(e) {
            e.preventDefault();
            var curr = $(e.currentTarget);
            var currpid = curr.closest(".row").attr("pid");
            sopt[currpid] = curr.attr("data-id");
            gourl();
        });
        $(".searchBox .search-btn01").click(function(e) {
            var sinput = $('#inputPassword');
            var stxt = sinput.val() || '';
            sopt.Word = stxt;
            gourl();
            //console.log(sopt)
        });

    })

})
