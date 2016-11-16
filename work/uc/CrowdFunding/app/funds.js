/* 
 * @Author: czy
 * @Date:   2016-07-30 13:58:54
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-10 15:14:10
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
            FundMajorID: url.param("FundMajorID") || '',
            StationProvinceID: url.param("StationProvinceID") || '',
            IndustryID: url.param("IndustryID") || '',
            InvestmentProvinceID: url.param("InvestmentProvinceID") || '',
            AmountRange: url.param("AmountRange") || '',
            Word: ''
        };
        //获取基金列表 - 条件—__地区【省】：
        //http://xiong.ucdl.cn/SystemAdminAPI/AdministrativeRegion/GetAdministrativeRegionByParentId?parentId=156000000000000
        var getProvinceOpt = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceSystemAdminAPI,
            "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
            "dataType": "json",
            "data": {
                parentId: 156000000000000
            }
        }
        UT.jaxJson(getProvinceOpt).then(function(data) {
            //console.log(data);
            var op = "";
            for (var i = 0; i < data.length; i++) {
                op += '<a data-id= ' + data[i].LID + '>';
                op += data[i].Name;
                op += '</a>';
            }
            $("#regionAdd").append(op);
            if (sopt.StationProvinceID == '') {
                if (!$("#regionAdd a:first").hasClass('active')) {
                    $("#regionAdd a:first").addClass('active')
                }
            } else {
                $("#regionAdd a").each(function(i, v) {
                    //console.log($(v).attr("data-id"));
                    if ($(v).attr("data-id") == sopt.StationProvinceID) {
                        $("#regionAdd a").removeClass('active');
                        $(v).addClass('active');
                    }
                })
            }
            $("#regionBdd").append(op);
            if (sopt.InvestmentProvinceID == '') {
                if (!$("#regionBdd a:first").hasClass('active')) {
                    $("#regionBdd a:first").addClass('active')
                }
            } else {
                $("#regionBdd a").each(function(i, v) {
                    //console.log($(v).attr("data-id"));
                    if ($(v).attr("data-id") == sopt.InvestmentProvinceID) {
                        $("#regionBdd a").removeClass('active');
                        $(v).addClass('active');
                    }
                })
            }
        });
        //获取基金列表 - 条件—__行业：
        //http://xiong.ucdl.cn/SystemAdminAPI/IndustryClassification/GetIndustryClassification
        var getindusOpt = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceSystemAdminAPI,
            "name": '/IndustryClassification/GetIndustryClassification',
            "dataType": "json"
        }
        UT.jaxJson(getindusOpt).then(function(data) {
            // console.log(data);
            var indus = "";
            for (var i = 0; i < data.length; i++) {
                indus += '<a data-id=' + data[i].LID + '>';
                indus += data[i].Name;
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
        UT.jaxJson(getmodeOpt).then(function(data) {
            // console.log(data);
            var modes = "";
            for (var i = 0; i < data.Data.length; i++) {
                modes += '<a data-id=' + data.Data[i].ID + '>';
                modes += data.Data[i].Name;
                modes += '</a>';
            }
            $("#investmentMode").append(modes);
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
        //获取基金列表 - 条件—__基金主体/资金类型：
        //http://xiong.ucdl.cn/CrowdFundingAPI/CFInvestingParty/GetCFFundMajor
        var getmodeOpt = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
            "name": '/CFInvestingParty/GetCFFundMajor',
            "dataType": "json"
        }
        UT.jaxJson(getmodeOpt).then(function success(data) {
            // console.log(data);
            var types = "";
            for (var i = 0; i < data.Data.length; i++) {
                types += '<a data-id=' + data.Data[i].ID + '>';
                types += data.Data[i].Name;
                types += '</a>';
            }
            $("#capitalType").append(types);
            if (sopt.FundMajorID == '') {
                if (!$("#capitalType a:first").hasClass('active')) {
                    $("#capitalType a:first").addClass('active')
                }
            } else {
                $("#capitalType a").each(function(i, v) {
                    //console.log($(v).attr("data-id"));
                    if ($(v).attr("data-id") == sopt.FundMajorID) {
                        $("#capitalType a").removeClass('active');
                        $(v).addClass('active');
                    }
                })
            }
        }, function error(err){
            console.log(err)
        });
        //点击”约谈项目方“相应弹窗出项
        $(".yuetan").click(function() {
            var FinancingPartyID = $("input[name='FinancingPartyID']").val();
            var IsFinancingParty = $("input[name='IsFinancingParty']").val();
            var CreatorID = $("input[name='CreatorID']").val();
            if (!CreatorID || CreatorID == "0") {
                window.location = ucConfig.ServerReferenceUserCenter + "/Account/Login?FromAPP=" + encodeURIComponent(window.location.href);
                return false;
            } else if (!FinancingPartyID || FinancingPartyID == "0") {
                alert("您不是融资方,不能投递项目");
                return false;
            } else if (!IsFinancingParty || IsFinancingParty == "0") {
                alert("您不是融资方,不能投递项目");
                return false;
            }
            var yuetanHtml = $("#yuetanTpl").html();
            var self = this;
            UI.genSingleModal({
                // 显示或隐藏关闭按钮
                btnClose: false,
                // 关闭按钮名称
                btnCloseName: "取消",
                btnSave: true,
                btnSaveName: "提交申请",
                // 弹窗标题
                title: "约谈投资方",
                // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
                body: $(yuetanHtml),
                // 关闭按钮点击时运行
                close: function(modal) {
                    console.log("close")
                },
                // 保存按钮点击是运行， modal 为传入的弹窗实例
                save: function(modal) {
                    console.log("save")
                    var CFFundID = $(self).siblings("input[name='CFFundID']").val();
                    var OrganizationID = $("input[name='OrgainzationID']").val();
                    var CreatorID = $("input[name='CreatorID']").val();
                    var CFProjectId = $("#FinancingPartyProjectid option:selected").val();
                    var Contents = $("#yt-state").val();
                    if (!CreatorID || CreatorID == "0") {
                        //window.location = ucConfig.ServerReferenceUserCenter + "/Account/Login?FromAPP=" + encodeURIComponent(window.location.href);
                    }
                    console.log("CFFundID=" + CFFundID + ",CFProjectId=" + CFProjectId + ",CreatorID=" + CreatorID + ",OrganizationID=" + OrganizationID + ",Contents=" + Contents);
                    var optYt = {
                        "type": "post",
                        "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                        "name": '/CFInvestingParty/AddFundInterviews',
                        //"contentType": "application/json",
                        "dataType": "json",
                        "data": {
                            CFFundID: CFFundID,
                            CreatorID: CreatorID,
                            OrganizationID: OrganizationID,
                            CFProjectId: CFProjectId,
                            Contents: Contents

                        }
                    }
                    UT.jaxJson(optYt, true).then(function(data) {
                        console.log(data);
                        if (data.Success && data.ID > 0) {
                            alert("约谈成功");
                        } else {
                            alert(data.ErrorMsg);
                        }
                    });
                },
                // 弹窗打开后运行
                callback: function(modal) {
                    var FinancingPartyID = $("input[name='FinancingPartyID']").val();
                    var OrganizationID = $("input[name='OrgainzationID']").val();
                    var CreatorID = $("input[name='CreatorID']").val();
                    var CFInvestmentCategoryID = $(self).siblings("input[name='CFInvestmentCategoryID']").val();
                    console.log(CFInvestmentCategoryID);
                    // var CFProjectId = $("#FinancingPartyProjectid option:selected").val();

                    var optGetMyCFProject = {
                        "type": "get",
                        "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                        "name": '/CFFinancingParty/GetMyCFProject',
                        //"contentType": "application/json",
                        "dataType": "json",
                        "data": {
                            CreatorID: CreatorID,
                            OrganizationID: OrganizationID,
                            FinancingPartyID: FinancingPartyID,
                            CFInvestmentCategoryID: CFInvestmentCategoryID

                        }
                    }
                    UT.jaxJson(optGetMyCFProject, true).then(function(data) {
                        console.log(data)
                        var getarea = '';
                        for (var i = 0; i < data.Data.length; i++) {
                            getarea += '<option value=' + data.Data[i].CFProjectID + '>';
                            getarea += data.Data[i].CFProjectName;
                            getarea += '</option>';
                        }
                        $('#FinancingPartyProjectid').append(getarea);
                    });

                }
            });
        });
        //点击”投递项目“相应弹窗出项
        $(".toudi").click(function(e) {
            console.log(e)
            var self = $(e.currentTarget);

            var p = self.parent();

            //判断是否登陆和是否为融资方
            var CFFundID = self.siblings("input[name=CFFundID]").val();
            var CFInvestmentCategoryID = self.siblings("input[name=CFInvestmentCategoryID]").val();
            var CreatorID = $("input[name=CreatorID]").val();
            var OrgainzationID = $("input[name=OrgainzationID]").val();
            var FinancingPartyID = $("input[name=FinancingPartyID]").val();
            var IsFinancingParty = $("input[name=IsFinancingParty]").val();

            if (!CreatorID || CreatorID == "0") {
                window.location = ucConfig.ServerReferenceUserCenter + "/Account/Login?FromAPP=" + encodeURIComponent(window.location.href);
                return false;
            } else if (!FinancingPartyID || FinancingPartyID == "0") {
                UI.inTip("您不是融资方,不能投递项目");
                return false;
            } else if (!IsFinancingParty || IsFinancingParty == "0") {
                UI.inTip("您不是融资方,不能投递项目");
                return false;
            }
            var rognziHtml = $("#rongziTpl").html();
            //弹窗显示
            UI.genSingleModal({
                btnClose: false,
                btnCloseName: "取消",
                btnSave: true,
                btnSaveName: "提交申请",
                title: "申请融资",
                body: $(rognziHtml),
                save: function(modal) {
                    //点击”提交申请按钮“，发送数据
                    var user = {};
                    user.CFProjectId = $("#entryName", modal).val();
                    user.FinancingAmount = $("#amount", modal).val();
                    user.AmountUnits = $("#amountUnit", modal).val();
                    user.InvestmentReasons = $("#reason", modal).val();
                    user.OrganizationID = OrgainzationID;
                    user.CreatorID = CreatorID;
                    user.CFFundID = CFFundID;
                    user.CFInvestmentCategoryID = CFInvestmentCategoryID;
                    var applyfinancingOpt = {
                        "type": "post",
                        "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                        "name": '/CFFinancingParty/AddCFFinancingInfo',
                        "dataType": "json",
                        "data": user
                    };
                    
                    UT.jaxJson(applyfinancingOpt, true).then(function(data) {
                        console.log(data);
                        if (data.ID >= 0) {
                            if (data.Success == false) {
                                UI.inTip(data.ErrorMsg);
                            }
                            if (data.Success == true) {
                                UI.inTip(data.ErrorMsg);
                            }
                        } else {
                            UI.inTip(data.ErrorMsg);
                        }
                    });

                },
                callback: function(modal) {
                    // 请求项目名称列表

                    var getEntryOpt = {
                        "type": "get",
                        "webUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                        "name": '/CFFinancingParty/GetMyCFProject',
                        "dataType": "json",
                        "data": {
                            CreatorID: CreatorID,
                            OrganizationID: OrgainzationID,
                            FinancingPartyID: FinancingPartyID,
                            CFInvestmentCategoryID: CFInvestmentCategoryID

                        }
                    }
                    UT.jaxJson(getEntryOpt, true).then(function(data) {                        
                        var nameArry = '';
                        for (var i = 0; i < data.Data.length; i++) {
                            nameArry += '<option value=' + data.Data[i].CFProjectID + '>';
                            nameArry += data.Data[i].CFProjectName;
                            nameArry += '</option>';
                        }
                        $('#entryName').append(nameArry);
                    });
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
