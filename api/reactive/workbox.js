// 2019-02-20
// app 和 web
// 消息推送
// 离线使用
// 入口友好

// https://www.cnblogs.com/EnSnail/p/9824198.html
// pwa:
// Notification API ：浏览器推送标准接口
// Service Worker：用户离线时，可以从缓存中启动web应用

// 比如在苹果手机上，前文提到的service worker中缓存并不是永久保存。而且service worker支持的不完善，PWA的功能体验要低于安卓手机.
// 一个最明显的不同在于安卓版本的PWA会保留你的登录状态，并且会系统级推送消息。而在苹果上，这两点都做不到.

// PWA最大推动者为谷歌与W3C，而苹果与谷歌无论在硬件产品线，软件产品线都存在很大的竞争关系。

// PWA对开发者来说，最重要的意义或在于绕过Apple Store审核，直接推给用户。

// 任何没办法实现商业化的技术和产品对开发者都是耍流氓.
// 微信最核心的优势或许就是对开发者商业化上的扶持。
// 小程序完成了PWA未完成的使命。

// 微信走对了两条路：广告与支付。
// 广告无疑还是当下互联网最普遍的流量变现方式，而支付的重要性不亚于当初支付宝于淘宝的重要性。
// 支付即信用托管。
// 所以小程序是有商业价值的，而且这种商业价值可持续。

// 无论是PWA ，小程序，还是快应用，哪个可以让开发者和商家更快更便捷地搭建自己的服务并推广出去进而形成商业闭环才是最重要的。

// 墙过去
// https://developers.google.com/web/tools/workbox/guides/get-started
// workbox-cli 中文文档
// https://blog.csdn.net/lecepin/article/details/85619034
// webpack 中使用 workbox 实现 PWA
// https://blog.csdn.net/mjzhang1993/article/details/79584854
// PWA之Workbox缓存策略分析
// https://blog.csdn.net/weixin_33816300/article/details/87366963
//  workbox 3.0 详解
// https://zoumiaojiang.com/article/amazing-workbox-3/?hmsr=joyk.com&utm_medium=referral&utm_source=joyk.com

// Service Worker 生命周期
// https://juejin.im/entry/57f89f938ac2470058ac32c4

// Service Worker 全面进阶
// https://juejin.im/post/591028fc2f301e006c291c4b


// web-push
// https://juejin.im/post/59d9b38ef265da064a0f72cc