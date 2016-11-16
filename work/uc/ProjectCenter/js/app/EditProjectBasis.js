/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   czy
 * @Last Modified time: 2016-09-19 15:57:54
 */
'use strict';
require(['ut', 'ui', 'bdeditor', 'bdlang', 'maxlength'],
    function(UT, UI, UE) {

        $(function() {
            var te;
            $('textarea').each(function(i, v) {
                var id = $(this).attr('id');
                te = UE.getEditor(id);
            });
            // 项目简介字数限制
            $('.edui-body-container').maxlength({
                maxCharacters: 200,
                statusText: " 个剩余字数",
                ue: {
                    isuse: true,
                    id: "Introduction",
                    UE: UE
                }
            });
            //获取项目所属行业
            //https://newapi-test.ucdl.cn/SystemAdminAPI/IndustryClassification/GetIndustryClassification
            // var getIndustryOpt = {
            //     "type": "get",
            //     "webUrl": ucConfig.ServerReferenceSystemAdminAPI,
            //     "name": '/IndustryClassification/GetIndustryClassification',
            //     "dataType": "json"
            // };
            // UT.jaxJson(getIndustryOpt, true).then(function(data) {
            //     console.log(data);
            //     var IndustryArry = "";
            //     for (var i = 0; i < data.length; i++) {
            //         IndustryArry += '<option value=' + data[i].LID + '>';
            //         IndustryArry += data[i].Name;
            //         IndustryArry += '</option>';
            //     }
            //     $("#IndustryID").empty().append(IndustryArry);
            // });

        });
    }
);
