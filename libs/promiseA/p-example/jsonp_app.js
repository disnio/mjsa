define(["jquery", "underscore", "when"], function($, _, when) {
    /*JSONP的原型：创建一个回调函数，然后在远程服务上调用这个函数并且将JSON 
    数据形式作为参数传递，完成回调。将JSON数据填充进回调函数
　　*/
    //var api = 'http://127.0.0.3:8080/when.php?callback=?';
    var getData = function() {
        var deferred = when.defer();
        
        $.ajax({
            type: "GET", 
            //url: "http://127.0.0.3:8080/when.php",
            url : "http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?",
            dataType: "jsonp",
            //jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)  
            //jsonpCallback: "flightHandler" //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据  

        }).done(function(data){
            deferred.resolve(data.items[1].media.m);
        }).fail(function(data){
            console.log("fail");
        });
        
       // $.getJSON("http://127.0.0.1:8083/when.php?callback=?")
       //  .done(function(data){
       //      deferred.resolve(data[2]);
       //  }).fail(function(data){
       //      console.log("fail");
       //  });
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

    var showImg = function(img) {
        $(img).appendTo($('#container'));
    }

    getData().then(getImg).then(showImg);

});
