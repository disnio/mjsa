define(["jquery", "underscore", "when/when", "when/delay"], function($, _, when, delay) {
    // promise 能在三个不同状态下，返回数据到相应的callback里面。
    // 获取图像列表jsonp显示
    // function now() {
    //     return (new Date()).getTime();
    // }

    // var start = now();

    // delay(100).then(
    //     function() {
    //         alert((now() - start) > 50);
    //     },
    //     function(){
    //         alert("fail is it");
    //     }
    // ).ensure(function(){
    //     alert("finish");
    // });


    /*
    // ----------------when.reduce
    should reject when input contains rejection
    var input = [resolved(1), reject(2), resolved(3)];
    when.reduce(input, plus, resolved(1)).then(
    fail,
    function(result) {
    assert.equals(result, 2);
    }
    ).ensure(done);

    //'should reduce in input order':
    when.reduce([later(1), later(2), later(3)], plus, '').then(
    function(result) {
    assert.equals(result, '123');
    },
    fail
    ).ensure(done);

    ----------------when.settle
    var promise1 = function() {
        var deferred = when.defer();
        setTimeout(function() {
            deferred.reject('A');
        }, 2000);
        return deferred.promise;
    };

    var promise2 = function() {
        var deferred = when.defer();
        setTimeout(function() {
            deferred.resolve('B');
        }, 2000);
        return deferred.promise;
    };　
    //逐一执行，不论done or fail， 结果到 then
    when.settle([promise1(), promise2()]).then(function(result) {
        console.log(result);


    [{"state":"rejected","reason":"A"},

    {"state":"fulfilled","value":"B"}] 

    });



     // ----------------when.all
     var getData = function() {
     var deferred = when.defer();
     $.getJSON("http://127.0.0.3:8080/when.php?callback=?")
     .done(function(data){
     deferred.resolve(data);
     }).fail(function(data){
     console.log("fail");
     });

     return deferred.promise;
     }

     var getImg = function(src) {
     var deferred = when.defer();
     var img = new Image();
     img.onload = function() {
     deferred.resolve(img);
     };
     img.src = src;

     return deferred.promise;
     }

     var showImgs = function(img) {
     $(img).appendTo($('#container'));
     }

     var getImgs = function(data) {
     var deferreds = [];
     for(var i = 0; i < data.length; i++) {
     deferreds.push(getImg(data[i]));
     }
     return deferreds;
     }
     // 全部执行完毕以后，then
     when.all(getData().then(getImgs)).then(showImgs);
     //getData().then(getImg).then(showImg);
     */

    /*

     // 进度
     function run(){
     var defer = when.defer();
     var start = 0, end = 100;

     var pros = function(){
     if(start<=end){
     defer.notify(start++);
     setTimeout( pros, 50 );
     }else{
     defer.reject('time out');
     }
     };

     pros();
     return defer.promise;
     }
     run().then(undefined, function(reason){ console.log("reason"); }, function(data){
     $("#container").text(data);
     })
     */

});
