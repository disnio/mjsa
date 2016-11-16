"use strict";

function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        // arguments 是类数组，保存每次递归的参数，用以消耗
        accumulated.push(arguments);
        if (!active) {
            active = true;
            while (accumulated.length) {
                // 进入到这里后，一直深入递归，保持调用栈的单层最简，
                var s = accumulated.shift();
                // 每次调用保存一次，消耗一次参数，在递归结束前 active 一直为 true 
                value = f.apply(this, s);
                // 只有在循环结束，最后一次递归才吐出值，也是递归的结果。
                // 不再产生新的参数，结束调用。
            }
            active = false;
            // 返回递归结果，重置标记
            return value;
        }
    };
}
// 改写的递归函数最重要是：参数中要包含结果，语句内要包含结束调用的条件。
// 要对参数进行操作，然后反映在下次递归的参数里面
var sum = tco(function(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1)
    } else {
        console.log(x, y);
        return x
    }
});

var sum = tco(function(n, total) {
    if (n === 1) return total;
    return sum(n - 1, n * total);
});

// 改写，把中间结果改为参数，加入两个初始结果值
var fac = toc(function(n, ac1, ac2) {
    console.log(n, ac1, ac2)
    // 结束条件不变
    if (n <= 1) {
        return ac1
    };
    // 在参数中进行计算
    return fac(n - 1, ac2, ac1 + ac2);
});

console.log(sum(1, 10))
