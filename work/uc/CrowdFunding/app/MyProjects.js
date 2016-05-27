/* 
 * @Author: Allen
 * @Date:   2016-01-13 15:03:07
 * @Last Modified by:   anchen
 * @Last Modified time: 2016-03-14 14:20:12
 */

'use strict';
require(['jquery', '_', './js/uc.ut', "text!tpl/myInvestedProjectList.html"],
    function($, _, UT, myInvestedProjectList) {

    //  投资人 项目认投管理 CrowdFundingWeb/CFInvestorModel/CMyProjects 我跟投的项目
    var optMyInvestedProjectList = {
        "name":  '/CFProject/MyInvestedProjectList',
        "data": {id: 7}
    };

    UT.jaxJson(optMyInvestedProjectList).then(function (data) {

        var template = _.template(myInvestedProjectList);
        var tempdata = {
            "datas": data.Data
        };

        $('#MyInvestedProjectList').empty().append(template(tempdata));
    });
});

// //            我收藏的项目
// $.getAjaxCode.ajaxRequest('cfproject/MyFllowedProjectList', {
// 'id': 0
// }, function (data) {
// var FllowedList = [];
// $.each(data.Data, function (key, option) {
//     FllowedList.push('<div class="myProjectList">');
//     FllowedList.push('<div class="cbInner">');
//     FllowedList.push('<div class="thumbnail fl">');
//     FllowedList.push('<img src="' + option.ProjectPicture + '" alt="">');
//     FllowedList.push('</div>');
//     FllowedList.push('<div class="summary fl">');
//     FllowedList.push('<ul>' +
//         '<li class="colTitle ct_2"><a href="#?id=' + option.ID + '">' + option.ProjectName + '</a> <span class="status_in">' + option.Status + '</span></li>' +
//         '<li><i class="fa fa-caret-right"></i> 地区：' + option.ProjectCity + '<span class="pad_01">行业：PC互联网</span></li>' +
//         '</ul>');
//     FllowedList.push('<ul class="proInfo">' +
//         '<li>融资金额:<em class="bg_1"><i class="fa fa-rmb" style="margin-right: 5px; padding-left:5px;vertical-align: middle;"></i> ' + $.commonFun.PriceFormat(option.PlanAmount) + '万 </em> ' +
//         '已融金额:<em  class="bg_2"> <i class="fa fa-rmb" style="margin-right: 5px; padding-left:5px;vertical-align: middle;"></i>' + $.commonFun.PriceFormat(option.FinishedAmount) + '万</em> 认投完成率：<span class="f_ora ct_8">' + option.FinishedRate + '</span> </li>' +
//         '<li>起投金额:<span class="f_ora ct_8" style="padding-right: 20px;">' + $.commonFun.PriceFormat(option.MinInvestAmount) + '万 </span>  被投资人约谈数:<span class="f_ora ct_8" style="padding-right: 20px;">' + option.CompanyNubmers + '次 </span></li>' +
//         '</ul>');
//     //                    跟投金额:<span class="f_ora ct_8" style="padding-right: 20px;">0.00万 </span>
//     FllowedList.push(' </div>');
//     FllowedList.push('<div class="detail"><i class="fa fa-chevron-circle-right"></i>项目简介： ' + option.ProjectIntroduction.substring(0, 80) + '...' + '</div>');
//     FllowedList.push('</div></div>');

// });
// $tagContent.find('.MyFllowedProjectList').empty().append(FllowedList.join(''));

// });