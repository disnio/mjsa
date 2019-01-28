(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

html {
    font-size: 16px;
}

// https://www.zhangxinxu.com/wordpress/2016/08/vw-viewport-responsive-layout-typography/
// @media screen and (min-width: 375px) {
//     html {
//         /* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
//         font-size: calc(100% + 2 * (100vw - 375px) / 39);
//         font-size: calc(16px + 2 * (100vw - 375px) / 39);
//     }
// }
// @media screen and (min-width: 414px) {
//     html {
//         /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
//         font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
//         font-size: calc(18px + 4 * (100vw - 414px) / 586);
//     }
// }
// @media screen and (min-width: 600px) {
//     html {
//         /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
//         font-size: calc(125% + 4 * (100vw - 600px) / 400);
//         font-size: calc(20px + 4 * (100vw - 600px) / 400);
//     }
// }
// @media screen and (min-width: 1000px) {
//     html {
//         /* 1000px往后是每100像素0.5px增加 */
//         font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000);
//         font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
//     }
// }