// 添加 playsinline and controls="true" 才能 safari 播放
// webkit-playsinline这个属性是ios 10中设置可以让视频在小窗内播放
{
    /* <video class="video-js" id="pc-video" playsinline x5-video-player-type="h5" autoplay="true" controls="true"><source src="fifa.mp4" type="video/mp4"/></video> */ }
// 如果是流媒体服务端发送，则需要 mp4 byte-range 相应头设置.
// https://www.jianshu.com/p/fecdec504ab0
// https://javascript.ctolib.com/tclyjy-wechat-h5-video.html


// https://www.cnblogs.com/ympjsc/p/10320569.html
//必须在weixin JSAPI的WeixinJSBridgeReady才能生效，该方法对ios生效，对部分android生效，实现页面加载完自动播放功能

//模拟点击事件

<video id="shakeVideo"
    preload="auto"
    controls
    autoplay
    webkit-playsinline="true"
    playsinline="true"
    poster="https://act.mcake.com/fangli/2018/pc/zhou-nian/video/video-load.png"
    src="https://act.mcake.com/fangli/2018/pc/zhou-nian/video/zhounian-7.mp4">
</video>
// 在video标签上加上属性：webkit-playsinline(对IOS - 兼容)
// playsinline(对IOS 10 + 兼容)
// 在ios中微信内置浏览器中，小窗播放视频
// 解决video在android系统下，微信内置浏览器内自动全屏的问题（该方法并没有亲自尝试过，只是可以拿来参考一下）
// A、 在video标签加上属性：x5-video-player-type='h5'(针对x5内核)
// x5-video-player-fullscreen='true'(防止横屏)
// 新版的 微信 TBS 内核（>=036849）支持一个叫 同层播放器 的视频播放器，这个不需要申请白名单，
//只需给 video 设置两个属性 x5-video-player-type="h5" 和 x5-video-player-fullscreen="true"，播放效果
var video = document.getElementById("shakeVideo");
video.play();
document.addEventListener('WeixinJSBridgeReady', function () {
    video.play();
}, false);
// https://www.cnblogs.com/zzsdream/p/6372528.html !!!
// https://github.com/fregante/iphone-inline-video
// https://www.cnblogs.com/xiaoyan2017/p/9904049.html 像陌陌、抖音