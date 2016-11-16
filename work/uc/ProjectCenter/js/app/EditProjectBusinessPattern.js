/* 
 * @Author: Allen
 * @Date:   2016-01-13 09:37:24
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-31 16:29:09
 */
'use strict';
require(['ut','ui','purl', 'bdeditor', 'validate', 'jquery.fileupload', 'bdlang'],
    function(UT, UI, purl, UE, validate) {

        $(function() {            
            $('textarea').each(function (i, v) { 
                var id = $(this).attr('id');                
                UE.getEditor(id);             
            });

            //点击下一步
            $('.btn-down').click(function (e) {
                e.preventDefault();
                var target = $('#Target').val();
                var demand = $('#Demand').val();
                var solution = $('#Solution').val();
                var profitModel = $("#ProfitModel").val();
                var competitor = $("#Competitor").val();
                var competitiveness = $("#Competitiveness").val();
                
                if (target == '') {
                   UI.inTip('目标用户或客户群体定位不能为空!');
                    return false;
                } else if (demand == '') {
                   UI.inTip('目标用户或客户群体目前困扰或需求定位不能为空!');
                    return false;
                } else if (solution == '') {
                   UI.inTip('满足目标用户或客户需求的产品或服务模式说明不能为空!');
                    return false;
                } else if (profitModel == '') {
                   UI.inTip('项目赢利模式说明不能为空!');
                    return false;
                } else if (competitor == '') {
                   UI.inTip('市场主要同行或竞争对手概述不能为空!');
                    return false;
                } else if (competitiveness == '') {
                   UI.inTip('项目主要核心竞争力说明不能为空!');
                    return false;
                } else {
                    $("form").attr("action", ucConfig.ServerReferenceJavaScript + "/CFMyProjects/UpdataProjectBusinessPattern?Step=EditProjectTeam");
                    $("form").submit();
                }
            });

        });
    }
);
