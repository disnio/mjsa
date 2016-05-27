/* 
 * @Author: allen
 * @Date:   2016-03-10 16:13:32
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-03-22 16:35:55
 */

/**
 * [ Ajax 本地存储， 用于缓存持久的数据。 ]
 *  options: {
 *       localCache: true, // 启用
 *       cacheTTL: 5, // 小时
 *       cacheKey: 'youkey' // 缓存 key 
 *       isCacheValid: function() {
 *           return true; // false 删除缓存
 *       } 
 * }
 * @return {[Object]}         [lo]
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function(jQuery) {

    /**
     * { 获取传入的缓存前缀 }
     *
     * @method     genCacheKey
     * @param      {<string>}  options  { 缓存前缀 }
     * @return     {<string>}  { 暂时为传入的前缀 }
     */
    var genCacheKey = function(options) {
        // 需要生成随机数或指定值
        return options.cacheKey;
    };

    /**
     * { 获取本地缓存函数对象 }
     *
     * @method     getStorage
     * @return     {obj}  { localStorage }
     */
    var getStorage = function(storage) {
        if (!storage) return false;
        if (storage === true) return window.localStorage;
        if (typeof storage === "object" && 'getItem' in storage &&
            'removeItem' in storage && 'setItem' in storage) {
            return storage;
        }
        throw new TypeError("localCache 必须为 true, " + "或对象是否可执行本地存储接口.");
    };

    /**
     * { 从缓存在获取存储的对象 }
     *
     * @method     getValue
     * @return     {Object}  { 缓存的对象 }
     */
    var getValue = function(options) {
        var storage = getStorage(options.localCache),
            hourstl = options.cacheTTL || 5,
            cacheKey = genCacheKey(options),
            cacheValid = options.isCacheValid,
            ttl,
            value;

        if (!storage) return;
        ttl = storage.getItem(cacheKey + 'cachettl');

        if (cacheValid && typeof cacheValid === 'function' && !cacheValid()) {
            storage.removeItem(cacheKey);
        }

        if (ttl && ttl < +new Date()) {
            storage.removeItem(cacheKey);
            storage.removeItem(cacheKey + 'cachettl');
            ttl = 0;
        }

        value = storage.getItem(cacheKey);
        // if ttl is 0, then fetch data from server
        return {
            value: value || '',
            ttl: ttl || 0
        }
    };
    // 设置缓存值
    var setValue = function(options, data) {
        var storage = getStorage(options.localCache),
            hourstl = options.cacheTTL || 5,
            cacheKey = genCacheKey(options),
            ttl;
        var strdata = JSON.stringify(data);

        try {
            storage.setItem(cacheKey, strdata);
        } catch (e) {
            storage.removeItem(cacheKey);
            storage.removeItem(cacheKey + 'cachettl');
            console.log('Cache Error:' + e, cacheKey, strdata);
        }

        if (!ttl) {
            storage.setItem(cacheKey + 'cachettl', +new Date() + 1000 * 60 * 60 * hourstl);
        }
    };

    /**
     * { Ajax 获取缓存值，过期或没有则调用 ajax 获取，同事缓存结果。 }
     *
     * @method     jaxStorage
     * @param      {<type>}    options  { options }
     * @param      {Function}  jax      { jaxJson执行调用 }
     * @return     {Object}         { 返回缓存值的延迟对象 }
     */
    var jaxStorage = function(options, jax) {   
        var def = new $.Deferred(),
            ret = getValue(options),
            ttl = parseInt(ret.ttl, 10),
            res;
        if ($.isEmptyObject(ret.value) || ret.value === '' || ret.value === undefined) {
            res = {};
        } else {
            res = $.parseJSON(ret.value);
        }

        if (ttl === 0) {            
            jax().then(function(data) {
                def.resolve(data);
                setValue(options, data);
            });
        } else {
            def.resolve(res);
        }
        return def;
    };

    return {
        getValue  : getValue,
        setValue  : setValue,
        jaxStorage: jaxStorage
    }

}));
