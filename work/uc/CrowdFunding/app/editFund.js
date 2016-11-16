/* 
 * @Author: Allen
 * @Date:   2015-12-04 15:03:07
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-10 11:32:49
 */

var regTrim = /(^[,;\|]+)|([,;\|]+$)/ig;

'use strict';
require(['ut', 'ui', "text!tpl/createFund.html", 'moment', 'jquery.ui.widget', 'jquery.iframe-transport', 'jquery.fileupload', 'jquery.fileupload-process', 'imgLiquid'], function(UT, UI, createFund) {
    $(function() {
        //页面加载时先显示一案例

        var arr = [];
        var caseArr = $.parseJSON($("#InvestmentCases").val()) || [];
        _.each(caseArr, function(v) {
            v.InvestmentTime = moment(v.InvestmentTime).format("YYYY-MM-DD");
        });

        function caseFunc(opt) {
            this.CFFundID = opt.CFFundID || 0;
            this.CFInvestmentCaseID = opt.CFInvestmentCaseID || 0;
            this.Name = opt.Name || '';
            this.InvestmentTime = opt.InvestmentTime || moment().format("YYYY-MM-DD");
            this.InvestmentAmount = opt.InvestmentAmount || 0;
            this.AmountUnits = opt.AmountUnits || 1;
            this.Introduction = opt.Introduction || '';
        }

        function renderInsertBox() {
            var ibox = $("#insertBox")
            ibox.empty();
            _.each(caseArr, function(v, i) {
                ibox.append(UT.tplRender(createFund, {
                    index: i,
                    CFFundID: v.CFFundID,
                    CFInvestmentCaseID: v.CFInvestmentCaseID,
                    Name: v.Name,
                    InvestmentTime: v.InvestmentTime,
                    InvestmentAmount: v.InvestmentAmount || "",
                    AmountUnits: v.AmountUnits,
                    Introduction: v.Introduction
                }));
            });
        }

        renderInsertBox();

        $("#insertBox .caseBox").eq(0).find(".delete").remove();
        //点击按钮添加案例

        $(".insetBtn").click(function() {
            $("#insertBox .caseBox").each(function(index, element) {
                caseArr[index].CFFundID = $(element).find("input#InvestmentCases-CFFundID").val();
                caseArr[index].CFInvestmentCaseID = $(element).find("input#InvestmentCases-CFInvestmentCaseID").val();
                caseArr[index].Name = $(element).find("input#InvestmentCases-Name").val();
                caseArr[index].InvestmentTime = $(element).find("input#InvestmentCases-InvestmentTime").val();
                caseArr[index].InvestmentAmount = $(element).find("input#InvestmentCases-InvestmentAmount").val();
                caseArr[index].InvestmentAmount = caseArr[index].InvestmentAmount || 0;
                caseArr[index].AmountUnits = $(element).find("select#InvestmentCases-AmountUnits").val();
                caseArr[index].Introduction = $(element).find("textarea#InvestmentCases-Introduction").val();
            });
            $("input[name='InvestmentCases']").val(JSON.stringify(caseArr));

            caseArr.push(new caseFunc({}));

            renderInsertBox();

            //提交、保存草稿时替换name属性中的index
        });
        //点击删除按钮删除对应的案例
        $("#insertBox").delegate(".delete", "click", function(e) {
            $("#insertBox .caseBox").each(function(index, element) {
                caseArr[index].CFFundID = $(element).find("input#InvestmentCases-CFFundID").val();
                caseArr[index].CFInvestmentCaseID = $(element).find("input#InvestmentCases-CFInvestmentCaseID").val();
                caseArr[index].Name = $(element).find("input#InvestmentCases-Name").val();
                caseArr[index].InvestmentTime = $(element).find("input#InvestmentCases-InvestmentTime").val();
                caseArr[index].InvestmentAmount = $(element).find("input#InvestmentCases-InvestmentAmount").val();
                caseArr[index].InvestmentAmount = caseArr[index].InvestmentAmount || 0;
                caseArr[index].AmountUnits = $(element).find("select#InvestmentCases-AmountUnits").val();
                caseArr[index].Introduction = $(element).find("textarea#InvestmentCases-Introduction").val();
            });
            var delIndex = $(e.currentTarget).closest(".caseBox").attr("data-pid");
            caseArr.splice(delIndex, 1);
            renderInsertBox();
            $("input[name='InvestmentCases']").val(JSON.stringify(caseArr));

        });

        $(".submitBtns button").click(function(e) {
            e.preventDefault();
            var flag = $(e.currentTarget).attr("data-draft");
            var isDraft, mtxt;
            if (flag == '0') {
                isDraft = 0;
                mtxt = "是否确认提交创建基金，等待优创后台审核后显示？";
            } else {
                isDraft = 1;
                mtxt = "是否确认保存草稿？";
            }
            $("#js-isDraft").val(isDraft);

            $("#insertBox .caseBox").each(function(index, element) {
                caseArr[index].CFFundID = $(element).find("input#InvestmentCases-CFFundID").val();
                caseArr[index].CFInvestmentCaseID = $(element).find("input#InvestmentCases-CFInvestmentCaseID").val();
                caseArr[index].Name = $(element).find("input#InvestmentCases-Name").val();
                caseArr[index].InvestmentTime = $(element).find("input#InvestmentCases-InvestmentTime").val();
                caseArr[index].InvestmentAmount = $(element).find("input#InvestmentCases-InvestmentAmount").val();
                caseArr[index].InvestmentAmount = caseArr[index].InvestmentAmount || 0;
                caseArr[index].AmountUnits = $(element).find("select#InvestmentCases-AmountUnits").val();
                caseArr[index].Introduction = $(element).find("textarea#InvestmentCases-Introduction").val();
            });
            $("input[name='InvestmentCases']").val(JSON.stringify(caseArr));
            // 
            UI.genSingleModal({
                btnClose: true,
                // 关闭按钮名称
                btnCloseName: "取消",
                btnSave: true,
                btnSaveName: "确定",
                // 弹窗标题
                title: "提示",
                // 弹窗显示的内容或注入的模板如 $("#yourTpl").html()
                body: $('<p>' + mtxt + '</p>'),
                // 关闭按钮点击时运行
                close: function(modal) {
                    console.log("close");
                    return false;
                },
                // 保存按钮点击是运行， modal 为传入的弹窗实例
                save: function(modal) {
                    console.log("save");
                    $("form#fundForm").submit();
                    return false;
                },
                // 弹窗打开后运行
                callback: function(modal) {
                    console.log("callback")
                }
            });
        });
        // 投资分类
        var investmentCategoryID_old = $("#InvestmentCategoryID_old").val();
        $('.classification input[type="radio"]').each(function(i, v){
            if( $(v).val() == investmentCategoryID_old ){
                $(v).prop("checked", true);
            }else{
                $(v).prop("checked", false);
            }
        });
        //  股权投资类型 
        var waysArr = $("#InvestmentWays_old").val().split(',');
        var getInvestmentWaysOpt = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
            "name": '/cfinvestingparty/GetInvestmentWaysByInvestmentCategoryID',
            "data": {
                CFInvestmentCategoryID: investmentCategoryID_old
            },
            "dataType": "json"
        };
        UT.jaxJson(getInvestmentWaysOpt).then(function(data) {
            var labelArry = "";
            for (var i = 0; i < data.Data.length; i++) {
                labelArry += '<label><input type="checkbox" name="InvestmentWays" value=' + data.Data[i].ID + '>';
                labelArry += data.Data[i].Name;
                labelArry += '</label>';
            }
            $("#select-demo").append(labelArry);

            $('#select-demo input[type="checkbox"]').each(function(i, v) {
                if (_.includes(waysArr, $(v).val())) {
                    $(v).prop("checked", true);
                }
            });
        });

        var industrysArr = $("#Industrys").val().split(',');
        //获取投资行业
        var getIndustryOpt = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceSystemAdminAPI,
            "name": '/IndustryClassification/GetIndustryClassification',
            "dataType": "jsonp"
        };
        UT.jaxJson(getIndustryOpt).then(function(data) {
            var IndustryArry = "";
            for (var i = 0; i < data.length; i++) {
                IndustryArry += '<label><input type="checkbox" value=' + data[i].Name + ' id=' + data[i].LID + ' name="cbIndustrys">';
                IndustryArry += data[i].Name;
                IndustryArry += '</label>';
            }
            $("#check-Industrys").append(IndustryArry);
            var industryText = [];
            $('#check-Industrys input[type="checkbox"]').each(function(i, v) {
                if (_.includes(industrysArr, $(v).attr("id"))) {
                    $(v).prop("checked", true);
                    industryText.push($(v).val());
                }
            });
            $("#industry-text").html(industryText.join(","));

        });
        //选择投资行业
        $(".submit-Industrys").click(function() {
            var values = '',
                texts = '';
            $(".check-Industrys input:checkbox[name='cbIndustrys']:checked").each(function(index, elem) {
                values += $(elem).attr("id") + ',';
                texts += $(elem).val() + ',';
            });
            $("input:hidden[name='Industrys']").val(values.replace(regTrim, ""));
            $("#industry-text").html(texts.replace(regTrim, ""));
        });
        //选择投资地区

        var areasArr = $("#Areas").val().split(',');
        $(".submit-areas").click(function() {
            var values = '',
                texts = '';
            $(".check-areas input:checkbox[name='cbAreas']:checked").each(function(index, elem) {
                values += $(elem).attr("id") + ',';
                texts += $(elem).val() + ',';
            });
            $("input:hidden[name='Areas']").val(values.replace(regTrim, ""));
            $("#Areas-text").html(texts.replace(regTrim, ""));
        });
        //省市区三级联动
        var ProvinceID_old = $("#ProvinceID_old").val();
        var CityID_old = $("#CityID_old").val();
        var AreaID_old = $("#AreaID_old").val();
        // 初始化省市县区
        var getProvinceOpt = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceSystemAdminAPI,
            "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
            "data": {
                parentId: 156000000000000
            },
            "dataType": "jsonp"
        };
        UT.jaxJson(getProvinceOpt).then(function(data) {
            arr = data;
            var op = "";
            for (var i = 0; i < data.length; i++) {
                op += '<option value="' + data[i].LID + '"' + (data[i].LID == ProvinceID_old ? 'selected="trre"' : '') + '>';
                op += data[i].Name;
                op += '</option>';
            }
            $("#ProvinceID").append(op);
            //获取已保存的省份，投资地区
            var getAreaArry = "";
            for (var i = 0; i < arr.length; i++) {
                getAreaArry += '<label><input type="checkbox" value=' + arr[i].Name + ' id=' + arr[i].LID + ' name="cbAreas">';
                getAreaArry += arr[i].Name;
                getAreaArry += '</label>';
            }
            $("#check-areas").html(getAreaArry);

            var areaText = [];
            $('#check-areas input[type="checkbox"]').each(function(i, v) {
                if (_.includes(areasArr, $(v).attr("id"))) {
                    $(v).prop("checked", true);
                    areaText.push($(v).val());
                }
            });
            $("#Areas-text").html(areaText.join(","));
        });
        var getCityOpte = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceSystemAdminAPI,
            "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
            "dataType": "jsonp",
            "data": {
                parentId: ProvinceID_old,
            }
        };
        UT.jaxJson(getCityOpte).then(function(data) {
            var strocity = '';
            for (var i = 0; i < data.length; i++) {
                strocity += '<option value="' + data[i].LID + '"' + (data[i].LID == CityID_old ? 'selected="trre"' : '') + '>';
                strocity += data[i].Name;
                strocity += '</option>';
            }
            $('#CityID').append(strocity);
        });
        var getAreaOpte = {
            "type": "get",
            "baseUrl": ucConfig.ServerReferenceSystemAdminAPI,
            "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
            "dataType": "jsonp",
            "data": {
                parentId: CityID_old,
            }
        };
        UT.jaxJson(getAreaOpte).then(function(data) {
            var stroarea = '';
            for (var i = 0; i < data.length; i++) {
                stroarea += '<option value="' + data[i].LID + '"' + (data[i].LID == AreaID_old ? 'selected="trre"' : '') + '>';
                stroarea += data[i].Name;
                stroarea += '</option>';
            }
            $('#AreaID').append(stroarea);
        });
        //当省份发生改变时，城市改变
        $('#ProvinceID').change(function(e) {
            var ProvinceID = $('#ProvinceID').val();
            //清除城市和地区
            $('#CityID option:gt(0)').remove();
            $('#AreaID option:gt(0)').remove();
            var getCityOpt = {
                "type": "get",
                "baseUrl": ucConfig.ServerReferenceSystemAdminAPI,
                "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
                "dataType": "jsonp",
                "data": {
                    parentId: ProvinceID,
                }
            };
            UT.jaxJson(getCityOpt).then(function(data) {
                var strocity = '';
                for (var i = 0; i < data.length; i++) {
                    strocity += '<option value=' + data[i].LID + '>';
                    strocity += data[i].Name;
                    strocity += '</option>';
                }
                $('#CityID').append(strocity);
            });
        });
        //当城市改变时，县改变
        $("#CityID").change(function(e) {
            var CityID = $('#CityID').val();
            var getAreaOpt = {
                "type": "get",
                "baseUrl": ucConfig.ServerReferenceSystemAdminAPI,
                "name": '/AdministrativeRegion/GetAdministrativeRegionByParentId',
                "dataType": "jsonp",
                "data": {
                    parentId: CityID,
                }
            };
            UT.jaxJson(getAreaOpt).then(function(data) {
                var stroarea = '';
                for (var i = 0; i < data.length; i++) {
                    stroarea += '<option value=' + data[i].LID + '>';
                    stroarea += data[i].Name;
                    stroarea += '</option>';
                }
                $('#AreaID').append(stroarea);
            });
        });
        //投资方式, 页面加载显示股权投资的类型
        var modeArry = ['股权投资类型 :', '风控要求 :', ''];
        
        $(".select-mode").find(".kk").append(modeArry[0]);

        // 投资阶段初始化   

        var stageArr = $("#ProjectStages_old").val().split(',');
        $('.js-projectStages input[type="checkbox"]').each(function(i, v) {
            if (_.includes(stageArr, $(v).val())) {
                $(v).prop("checked", true);
            }
        });
        //点击按钮获取投资方式
        $(".classification label").click(function(e) {
            var x = $(".classification label").index(this);
            $(".select-mode").find(".kk").empty();
            $(".select-mode").find(".kk").append(modeArry[x]);
            var ID = $("input", this).val();
            $(".select-mode").show();
            //console.log(e, ID)

            var getInvestmentWaysOpt = {
                "type": "get",
                "baseUrl": ucConfig.ServerReferenceCrowdFundingAPI,
                "name": '/cfinvestingparty/GetInvestmentWaysByInvestmentCategoryID',
                "data": {
                    CFInvestmentCategoryID: ID
                },
                "dataType": "json"
            };
            UT.jaxJson(getInvestmentWaysOpt).then(function(data) {
                $('#select-demo').empty();
                var labelArry = "";
                for (var i = 0; i < data.Data.length; i++) {
                    labelArry += '<label><input type="checkbox"  name="InvestmentWays" value=' + data.Data[i].ID + '>';
                    labelArry += data.Data[i].Name;
                    labelArry += '</label>';
                }
                $("#select-demo").append(labelArry);
            });
        });
        //投资分类为“众筹投资”时，删除投资方式
        $(".classification label").eq(2).click(function() {
            $(".select-mode").hide();
        });

        //上传缩略图
        function npic() {
            this.IconID = ""; // 图片id上传后
            this.Status = 1; // 默认不动
            return this;
        };
        var csshopid = $("#ID").val();
        $(".fileupload-btn").click(function(e) {
            $("#fileupload").trigger("click");
        });
        // 上传
        var optFile = {
            upload: $.fn.fileupload,
            container: $('#fileupload'),
            url: ImgSingleUploadUrl,
            //onlyImg: true,
            callback: function(temp) {
                var pic = new npic();
                pic.IconID = temp.id;
                var pv = $(".preview");
                pv.empty();
                pv.append('<div class="imgLiquidFill"><img src="' + temp.url + '" class="img-thumbnail" data-iconid="' + temp.id + '" /></div>');
                pv.show();
                $("#FileIconID").val(temp.id);
                $(".imgLiquidFill", pv).imgLiquid({
                    fill: true
                });
            }
        };
        UI.fileUpload(optFile);
        var pv = $(".preview");
        var picThumb = $("#FileIconID").val();
        pv.empty();
        pv.append('<div class="imgLiquidFill"><img src="' + imgUrl + picThumb + '" class="img-thumbnail" data-iconid="' + picThumb + '" /></div>');
        pv.show();
        $(".imgLiquidFill", pv).imgLiquid({
            fill: true
        });
        
        //上传附件
        $(".fileupload-btn01").click(function(e) {
            $("#fileupload-file").trigger("click");
        });
        var imgType = ['.jpg', '.jpeg', '.png', '.gif'];
        // 上传
        var optFilefj = {
            upload: $.fn.fileupload,
            container: $('#fileupload-file'),
            // onlyImg: false,
            url: ImgSingleUploadUrl,
            callback: function(temp) {
                var pic = new npic();
                pic.IconID = temp.id;
                pic.type = temp.type;
                var pv = $("#preview-file");
                pv.empty();
                pv.append('<div class="imgLiquidFill"><span icon-id="' + temp.id + '">' + temp.name + '</span> </span></div>');
                pv.show();
                $(".imgLiquidFill", pv).removeClass('imgLiquidFill');
                $("#FileID").val(temp.id);
                $("#FileName").val(temp.name);
            }
        };

        UI.fileUpload(optFilefj);
        var pvfj = $("#preview-file");
        var fjid = $("#FileID").val();
        var fjname = $("#FileName").val();
        var fjtype = $("#FileType").val();
        pvfj.empty();
        pvfj.append('<div><span icon-id="' + fjid + '">' + fjname + '</span></div>');
        // 投资年限
        var timeNumber = $('.js-time-num input[type="number"]');
        
        timeNumber.change(function(e){
            var self = $(e.currentTarget);
            if(parseInt(self.val(), 10)<1){
                self.val(1);
            }
        });

    });
});
