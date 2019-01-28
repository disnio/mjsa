// https://developers.google.com/web/fundamentals/primers/service-workers/?hl=zh-cn
// 服务工作线程
// 它是一种 JavaScript 工作线程，无法直接访问 DOM。 服务工作线程通过响应 postMessage 接口发送的消息来与其控制的页面通信，页面可在必要时对 DOM 执行操作。
// 可编程网络代理，让您能够控制页面所发送网络请求的处理方式。
// 它在不用时会被中止，并在下次有需要时重启，因此，您不能依赖于服务工作线程的 onfetch 和 onmessage 处理程序中的全局状态。如果存在您需要持续保存并在重启后加以重用的信息，服务工作线程可以访问 IndexedDB API。
// 服务工作线程广泛地利用了 promise
// 首次注册该服务工作线程的页面需要再次加载才会受其控制。

// 依赖 Catch Api
// https://developer.mozilla.org/zh-CN/docs/Web/API/Cache
// https://juejin.im/post/5b06a7b3f265da0dd8567513
// http://taobaofed.org/blog/2018/08/08/workbox3/ ??
// https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope/importScripts
// 页面崩溃检测
if (navigator.serviceWorker.controller !== null) {
    let HEARTBEAT_INTERVAL = 5 * 1000; // 每五秒发一次心跳
    let sessionId = uuid();
    let heartbeat = function () {
        navigator
            .serviceWorker
            .controller
            .postMessage({
                type: 'heartbeat', id: sessionId, data: {} // 附加信息，如果页面 crash，上报的附加数据
            });
    }
    window.addEventListener("beforeunload", function () {
        navigator
            .serviceWorker
            .controller
            .postMessage({type: 'unload', id: sessionId});
    });
    setInterval(heartbeat, HEARTBEAT_INTERVAL);
    heartbeat();
}
// ---------
const CHECK_CRASH_INTERVAL = 10 * 1000; // 每 10s 检查一次
const CRASH_THRESHOLD = 15 * 1000; // 15s 超过15s没有心跳则认为已经 crash
const pages = {}
let timer
function checkCrash() {
    const now = Date.now()
    for (var id in pages) {
        let page = pages[id]
        if ((now - page.t) > CRASH_THRESHOLD) {
            // 上报 crash
            delete pages[id]
        }
    }
    if (Object.keys(pages).length == 0) {
        clearInterval(timer)
        timer = null
    }
}

worker.addEventListener('message', (e) => {
    const data = e.data;
    if (data.type === 'heartbeat') {
        pages[data.id] = {
            t: Date.now()
        }
        if (!timer) {
            timer = setInterval(function () {
                checkCrash()
            }, CHECK_CRASH_INTERVAL)
        }
    } else if (data.type === 'unload') {
        delete pages[data.id]
    }
})