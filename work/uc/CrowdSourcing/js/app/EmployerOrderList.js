/*
* @Author: whj
* @Date:   2016-07-27 14:03:49
* @Last Modified by:   whj
* @Last Modified time: 2016-07-27 14:03:49
*/
$(function () {
    $('.form-control-static span').click(function () {
        $(".form-control-static span").eq($(this).index()).addClass("active").siblings().removeClass('active');
        var indexValue = $(".form-control-static span").eq($(this).index()).attr("status-value");
        console.log(indexValue);
        $("#Status").val(indexValue);
        $("#searchForm").submit();
    });
})


