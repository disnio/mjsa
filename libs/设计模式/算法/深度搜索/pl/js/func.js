/**
 * Created by Administrator on 2015/8/31.
 * 函数编程通用函数
 */

function splat(fun) {
    return function(array) {
        return fun.apply(null, array);
    }
}

function unsplat(fun) {
    return function() {
        return fun.call(null, _.toArray(arguments));
    };
}

// 判存在
function existy(x) {
    // undefined == null is true; undefined === null is false
    return x != null;
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

function always(val){
    return function(){
        return val;
    };
}
function isEven(n) { return (n%2) === 0 }
// 防止不存在的函数
function fnull(fun /*, defaults */ ) {
    var defaults = _.rest(arguments);
    return function() {
        var args = _.map(arguments, function(e, i) {
            return existy(e) ? e : defaults[i];
        });

        return fun.apply(null, args);
    }
}

function defaults(d) {
    return function(o, k) {
        var varl = fnull(_.identity, d[k]);
        return o && o[k];
    }
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

function project(table, keys) {
    return _.map(table, function(obj) {
        return _.pick.apply(null, construct(obj, keys));
    });
}

function rename(obj, newNames) {

    return _.reduce(newNames, function(o, nu, old) {
        console.log(nu, old)
        if (_.has(obj, old)) {
            o[nu] = obj[old];
            return o;
        } else {
            return o;
        }
    }, _.omit.apply(null, construct(obj, _.keys(newNames))))
}

function as(table, newNames) {
    return _.map(table, function(obj) {
        return rename(obj, newNames);
    });
}

function restrict(table, pred) {
        return _.reduce(table, function(newTable, obj) {
            console.log(newTable, obj)
            if (truthy(pred(obj))) {
                return newTable;
            } else {
                return _.without(newTable, obj);
            }
        }, table)
    }
    // 满足条件 cond 执行动作 action， 否则返回 undefined
function doWhen(cond, action) {
    if (truthy(cond))
        return action();
    else
        return undefined;
}

// 对象校验
function checker() {
        var validators = _.toArray(arguments);
        return function(obj) {
            return _.reduce(validators, function(errs, check) {
                if (check(obj)) {
                    return errs;
                } else {
                    return _.chain(errs).push(check.message).value();
                }
            }, []);
        };
    }
    // 组合生成验证器及消息
function validator(message, fun) {
    var f = function() {
        return fun.apply(null, arguments);
    };
    f.message = message;
    return f;
}

function aMap(obj) {
        return _.isObject(obj);
    }
    // 返回函数判断对象是否存在给定的键值
function hasKeys() {
    var key = _.toArray(arguments);
    var fun = function(obj) {
        return _.every(key, function(k) {
            return _.has(obj, k);
        });
    };

    fun.message = cat(['Must have values for keys:'], key).join(" ");
    return fun;
}

// 调用方法
function invoker(NAME, METHOD) {
    return function(target /* args ... */ ) {
        if (!existy(target)) fail("Must provide a target");
        var targetMethod = target[NAME];
        var args = _.rest(arguments);
        return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
            return targetMethod.apply(target, args);
        });
    };
}

// 执行函数序列，返回函数需加目标参数
function dispatch( /* funs */ ) {
    var funs = _.toArray(arguments);
    var size = funs.length;
    return function(target /*, args */ ) {
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
function andify( /* preds */ ) {
    var preds = _.toArray(arguments);
    return function( /* args */ ) {
        var args = _.toArray(arguments);
        var everything = function(ps, truth) {
            if (_.isEmpty(ps))
                return truth;
            else
                return _.every(args, _.first(ps)) && everything(_.rest(ps), truth);
        };
        return everything(preds, true);
    };
}

// 确认至少一个函数执行返回真
function orify( /* preds */ ) {
    var preds = _.toArray(arguments);
    return function( /* args */ ) {
        var args = _.toArray(arguments);
        var something = function(ps, truth) {
            if (_.isEmpty(ps))
                return truth;
            else
                return _.some(args, _.first(ps)) || something(_.rest(ps), truth);
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
        console.log(counter++, temp);
        return temp;
    }
    // 持续调用，求最终结果
function trampoline(fun /*, args */ ) {
    var result = fun.apply(fun, _.rest(arguments));
    while (_.isFunction(result)) {
        result = result();
    }
    return result;
}

// 偏函数
function partial(fun /*, pargs */ ) {
    var pargs = _.rest(arguments);
    return function( /* arguments */ ) {
        var args = cat(pargs, _.toArray(arguments));
        return fun.apply(fun, args);
    };
}

function deepFreeze(obj) {
    if (!Object.isFrozen(obj)) {
        Object.freeze(obj);
    }

    for (var key in obj) {
        if (!obj.hasOwnProperty(key) || !_.isObject(obj[key])) {
            continue;
        }
        deepFreeze(obj[key]);
    }
}

function LazyChain(obj) {
    this._calls = [];
    this._target = obj;
}

LazyChain.prototype.invoke = function(methodName) {
    var args = _.rest(arguments);
    this._calls.push(function(target) {
        var meth = target[methodName];
        return meth.apply(target, args);
    });
    return this;
};

LazyChain.prototype.force = function() {
    return _.reduce(this._calls, function(target, trunk) {
        return trunk(target);
    }, this._target);
};

LazyChain.prototype.tap = function(fun) {
    this._calls.push(function(target) {
        fun(target);
        return target;
    });
    return this;
};

function pipeline(seed) {
    return _.reduce(_.rest(arguments), function(l, r) {
        return r(l);
    }, seed);
}

function actions(acts, done) {
    return function(seed) {
        var init = {
            values: [],
            state: seed
        };
        var intermediate = _.reduce(acts, function(stateObj, action) {
            var result = action(stateObj.state);
            var values = cat(stateObj.values, [result.answer]);
            return {
                values: values,
                state: result.state
            };
        }, init);

        var keep = _.filter(intermediate.values, existy);
        return done(keep, intermediate.state);
    }
}

function mSqr() {
    return function(state) {
        var ans = Math.sqrt(state);
        return {
            answer: ans,
            state: ans
        };
    }
}

function mNote() {
    return function(state) {
        note(state);
        return {
            answer: undefined,
            state: state
        };
    }
}

function mNeg() {
    return function(state) {
        return {
            answer: -state,
            state: -state
        };
    }
}

function lift(answerFun, stateFun) {
    return function() {
        var args = _.toArray(arguments);

        return function(state) {
            var ans = answerFun.apply(null, construct(state, args));
            var s = stateFun ? stateFun(state) : ans;
            return {
                answer: ans,
                state: s
            };
        };
    };
}

function stringifyArray(ary) {
    return ["[", _.map(ary, polyToString).join(","), "]"].join("");
}

var polyToString = dispatch(
    function(s) {
        return _.isString(s) ? s : undefined;
    },
    function(s) {
        return _.isArray(s) ? stringifyArray(s) : undefined;
    },
    function(s) {
        return _.isObject(s) ? JSON.stringify(s) : undefined;
    },
    function(s) {
        return s.toString();
    }
);


function Container(val) {
    this._value = val;
    this.init(val);
}

Container.prototype.init = _.identity;

var Hole = function(val) {
    Container.call(this, val);
};

var HoleMixin = {
    setValue: function(newValue) {
        var oldVal = this._value;
        this.validate(newValue);
        this._value = newValue;
        this.notify(oldVal, newValue);
        return this._value;
    }
};

var ObserverMixin = (function() {
    var _watchers = [];
    return {
        watch: function(fun) {
            _watchers.push(fun);
            return _.size(_watchers);
        },

        notify: function(oldVal, newVal) {
            _.each(_watchers, function(watcher) {
                watcher.call(this, oldVal, newVal);
            });

            return _.size(_watchers);
        }
    }
})();

var ValidateMixin = {
    addValidator: function(fun) {
        this._validator = fun;
    },

    init: function(val) {
        this.validate(val);
    },

    validate: function(val) {
        if (existy(this._validator) && !this._validator(val)) {
            fail("Attempted to set invalid value " + polyToString(val));

        }
    }
}

var SwapMixin = {
    swap : function(fun){
        var args = _.rest(arguments);
        var newValue = fun.apply(this, construct(this._value, args));
        return this.setValue(newValue);
    }
};

_.extend(Hole.prototype, HoleMixin, ValidateMixin, ObserverMixin, SwapMixin);

function contain(value){
    return new Container(value);
}

function hole(val){
    var h = new Hole();
    var v = _.toArray(arguments)[1];
    if(v) h.addValidator(v);
    h.setValue(val);
    return h;
}




