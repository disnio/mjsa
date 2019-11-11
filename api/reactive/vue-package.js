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

// vee-validate 基于模板的验证 https://baianat.github.io/vee-validate/

// https://www.baidu.com/link?url=tjnUW8-gNR4HLB64E1A7Clm42IvJpRWHaDO0Vs9j4FDD0Jb9P5JK2FmwXSlqaXugmJLmXAMRleTSAI0OAmwP2AG8NQqWp4ozLrazoFXv-5aIfLkPNJ_bkPwWxj5uO02LfDY8I79OxzMfXFbUaWMQrmwqMXuGVjVmpm77rkU4aIkUsiT_ttX2b-Yb6TLLBef4&wd=&eqid=d186452e00000b28000000055d53b47a
// VuePress  静态站点生成器,无头 CMS,只提供纯api的cms，不包含任何客户端代码，也就是老子只负责api你手机，还是网页想咋用咋用。

// strapi https://strapi.io/documentation/3.0.0-beta.x/getting-started/quick-start.html

// VueStoreFront 是其它一个「无头CMS」框架，它是成立在Vue.js 和 Node 基本上的。VueStoreFront 是为诸如 Magento、Prestashop 和 Shopware 这样的电商平台而构建的，团结PWA，它还可以让网站可以离线行使。

// Gridsome 用 Vue 提供前端功能，并使用 GraphQL 管理数据。https://gridsome.org/

// Vuetify 是最好用的 UI 组件库之一。

// Quasar 是 Java“一次编写，随处运行”哲学的 JavaScript 版本。

// Vue Apollo。这个库是连接 Vue 和 GraphQL/Apollo 的一座桥梁

// Eagle.js 是一个使用 Vue 构建的功能强大、灵活且独特的幻灯片系统。