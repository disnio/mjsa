// 微信分享图片命名不能中文，绝对路径，同域。
// <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js" type="text/javascript"></script>

// 下面这个加到body 作为第一个子元素，作为分享图片的 hack
// <img id="wxlogo" src="" alt="" style="display: none; left: -1000px; top:0;">
$("#wxlogo").attr("src", PicUrl);
$.ajax({
    type: "get",
    // 后端微信令牌接口
    url: "api/wxapi/getsignature.ashx",
    dataType: "json",
    data: {
        url: location.href.split('#').toString()
    },
    success: function(data) {
        wx.config({
            debug: false,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: [
                'onMenuShareTimeline', 'onMenuShareAppMessage'
            ]
        });

        wx.ready(function() {
            var link = location.href.split('#').toString();
            // 分享朋友圈及朋友
            wx.onMenuShareTimeline({
                // 分享标题
                title: "",
                // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                link: link,
                //需要的缩略图地址
                imgUrl: PicUrl,
            });

            wx.onMenuShareAppMessage({
                // 分享标题
                title: "标题",
                // 分享描述
                desc: "描述",
                // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                link: link,
                // 分享图标
                imgUrl: PicUrl,
                success: function() {
                    // 用户确认分享后执行的回调函数
                }
            });

        });

    },
    error: function(xhr, status, error) {}
});