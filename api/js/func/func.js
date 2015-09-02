/**
 * Created by Administrator on 2015/8/31.
 * 函数编程通用函数
 */

// 判存在
function existy(x) {
    // undefined == null is true; undefined === null is false
    return x!= null;
}

// 判是否为真
function truthy(x) {
    return (x !== false) && existy(x);
}

// 执行失败抛出
function fail(thing) {
    throw new Error(thing);
}
// 输出控制台警告
function warn(thing) {
    console.log(["WARNING:", thing].join(' '));
}

// 输出控制台日志
function note(thing) {
    console.log(["NOTE:", thing].join(' '));
}

// 判断是否可以通过下标访问
function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

// 返回数组的第 n 个元素
function nth(a, index) {
    if (!_.isNumber(index)) fail("Expected a number as the index");
    if (!isIndexed(a)) fail("Not supported on non-indexed type");
    if ((index < 0) || (index > a.length - 1))
        fail("Index value is out of bounds");
    return a[index];
}

// 返回数组的第二个元素
function second(a) {
    return nth(a, 1);
}

// 合并数组
function cat() {
    // 数组合并
    var head = _.first(arguments);
    if (existy(head))
        return head.concat.apply(head, _.rest(arguments));
    else
        return [];
}

// 合并后面数组 tail 到给定数组 head
function construct(head, tail) {
    return cat([head], _.toArray(tail));
}

// 满足条件 cond 执行动作 action， 否则返回 undefined
function doWhen(cond, action) {
    if(truthy(cond))
        return action();
    else
        return undefined;
}

// 调用方法
function invoker (NAME, METHOD) {
    return function(target /* args ... */) {
        if (!existy(target)) fail("Must provide a target");
        var targetMethod = target[NAME];
        var args = _.rest(arguments);
        return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
            return targetMethod.apply(target, args);
        });
    };
}

// 执行函数序列，返回函数需加目标参数
function dispatch(/* funs */) {
    var funs = _.toArray(arguments);
    var size = funs.length;
    return function(target /*, args */) {
        var ret = undefined;
        var args = _.rest(arguments);
        for (var funIndex = 0; funIndex < size; funIndex++) {
            var fun = funs[funIndex];
            ret = fun.apply(fun, construct(target, args));
            if (existy(ret)) return ret;
        }
        return ret;
    };
}

// 字符串反转
function stringReverse(s) {
    if (!_.isString(s)) return undefined;
    return s.split('').reverse().join("");
}

// 满足条件的第一次执行后的结果
var rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);

// 基于如下数据结构的图的方法 nexts() depthSearch()
//var influences = [['Lisp', 'Smalltalk'], ['Lisp', 'Scheme'], ['Smalltalk', 'Self'], ['Scheme', 'JavaScript'], ['Scheme', 'Lua'], ['Self', 'Lua'], ['Self', 'JavaScript']];
// 图的下一个节点
function nexts(graph, node) {
    if (_.isEmpty(graph)) return [];
    var pair = _.first(graph);
    var from = _.first(pair);
    var to = second(pair);
    var more = _.rest(graph);
    if (_.isEqual(node, from))
        return construct(to, nexts(more, node));
    else
        return nexts(more, node);
}

// 深度搜索
function depthSearch(graph, nodes, seen) {
    if (_.isEmpty(nodes)) return rev(seen);
    var node = _.first(nodes);
    var more = _.rest(nodes);
    if (_.contains(seen, node))
        return depthSearch(graph, more, seen);
    else
        return depthSearch(graph, cat(nexts(graph, node), more), construct(node, seen));
}
// 确认所有执行的函数都返回真
function andify(/* preds */) {
    var preds = _.toArray(arguments);
    return function(/* args */) {
        var args = _.toArray(arguments);
        var everything = function(ps, truth) {
            if (_.isEmpty(ps))
                return truth;
            else
                return _.every(args, _.first(ps))
                    && everything(_.rest(ps), truth);
        };
        return everything(preds, true);
    };
}

// 确认至少一个函数执行返回真
function orify(/* preds */) {
    var preds = _.toArray(arguments);
    return function(/* args */) {
        var args = _.toArray(arguments);
        var something = function(ps, truth) {
            if (_.isEmpty(ps))
                return truth;
            else
                return _.some(args, _.first(ps))
                    || something(_.rest(ps), truth);
        };
        return something(preds, false);
    };
}

// 数组的长度
function tcLength(ary, n) {
    var l = n ? n : 0;
    if (_.isEmpty(ary))
        return l;
    else
        return tcLength(_.rest(ary), l + 1);
}

// 偶数判断相互调用
function evenSteven(n) {
    if (n === 0)
        return true;
    else
        return oddJohn(Math.abs(n) - 1);
}
// 奇数判断
function oddJohn(n) {
    if (n === 0)
        return false;
    else
        return evenSteven(Math.abs(n) - 1);
}
// 数组平合
function flat(array) {
    if (_.isArray(array))
        return cat.apply(null, _.map(array, flat));
    else
        return [array];
}

// 深度克隆
var counter = 0;
function deepClone(obj) {
    if (!existy(obj) || !_.isObject(obj))
        return obj;

    var temp = new obj.constructor();
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = deepClone(obj[key]);
        }
    }
    console.log( counter++, temp );
    return temp;
}
// 持续调用，求最终结果
function trampoline(fun /*, args */) {
    var result = fun.apply(fun, _.rest(arguments));
    while (_.isFunction(result)) {
        result = result();
    }
    return result;
}

// 偏函数
function partial(fun /*, pargs */) {
    var pargs = _.rest(arguments);
    return function(/* arguments */) {
        var args = cat(pargs, _.toArray(arguments));
        return fun.apply(fun, args);
    };
}