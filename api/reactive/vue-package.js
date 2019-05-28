// vue-virtual-scroller 滚动性能提高在可视范围

// vue-scroll 滚动事件添加，记录滚动位置

// vue-affix 侧边滚动菜单对应激活

// vue-scrollactive 滚动激活菜单

import fastclick from 'fastclick';
fastclick.attach(document.body);

// vuex-persist 持久化存储可定制

import axiosRetry, {isNetworkOrIdempotentRequestError} from 'axios-retry';

axiosRetry(service, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 2000;
    },

    retryCondition: function (err) {
        if (/.*timeout/.test(err)) {
            Message.error("连接超时")
            return true;
        }

        return isNetworkOrIdempotentRequestError
    }
});

// validator

// vue-quill-editor quill-emoji quill-image-extend-module quill-image-resize-module

"<p>评论1222222222<span class=\"ql-emojiblot\" data-name=\"wink\">﻿<span contenteditable=\"false\"><span class=\"ap ap-wink\">😉</span></span>﻿</span></p>"

评论1😁