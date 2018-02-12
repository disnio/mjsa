/*
* @Author: wsc
* @Date:   2018-01-08 15:16:49
* @Last Modified by:   wsc
* @Last Modified time: 2018-01-08 15:19:16
*/

 // 输入表单被键盘遮挡住了
if (/Android/gi.test(navigator.userAgent)) {
    window.addEventListener('resize', function () {
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
            window.setTimeout(function () {
                document.activeElement.scrollIntoViewIfNeeded();
            }, 0);
        }
    })
}

// 禁止手机端点击input框跳出输入法
// 第一种方式：<input disalbed/>，添加disabled，禁用输入框；
// 第二种方式：不使用input,使用其他非焦点获取的标签来代替，比如div；
// 第三种方式：通过js控制，<input onfocus="this.blur();"/>