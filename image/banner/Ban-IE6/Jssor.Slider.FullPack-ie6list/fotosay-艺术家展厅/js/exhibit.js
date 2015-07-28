!function(a,b,c){function l(){f=b[g](function(){d.each(function(){var b=a(this),c=b.width(),d=b.height(),e=a.data(this,i);(c!==e.w||d!==e.h)&&b.trigger(h,[e.w=c,e.h=d])}),l()},e[j])}var f,d=a([]),e=a.resize=a.extend(a.resize,{}),g="setTimeout",h="resize",i=h+"-special-event",j="delay",k="throttleWindow";e[j]=250,e[k]=!0,a.event.special[h]={setup:function(){if(!e[k]&&this[g])return!1;var b=a(this);d=d.add(b),a.data(this,i,{w:b.width(),h:b.height()}),1===d.length&&l()},teardown:function(){if(!e[k]&&this[g])return!1;var b=a(this);d=d.not(b),b.removeData(i),d.length||clearTimeout(f)},add:function(b){function f(b,e,f){var g=a(this),h=a.data(this,i);h.w=e!==c?e:g.width(),h.h=f!==c?f:g.height(),d.apply(this,arguments)}if(!e[k]&&this[g])return!1;var d;return a.isFunction(b)?(d=b,f):(d=b.handler,b.handler=f,void 0)}}}(jQuery,this);

$(function() {

    $(window).scrollTop(0);

    var viewW, mlw, ratio, slidew;
    var isIE78 = /\bMSIE [78]\.0\b/.test(navigator.userAgent);
    var dw= Response.deviceW(); 

    if (isIE78) {
        viewW = Response.viewportW(); 
        slidew = 868;
        ratio = viewW/dw;
        mlw = (viewW - 868*ratio) / 2;        
    } else {
        viewW = Response.viewportW() - 17;
        ratio = viewW/dw;
        slidew = 870;               
        mlw = (viewW - 870*ratio) / 2;
    }
    var thw;
    if(viewW > 1200){
        thw = (dw-1200)/2;
    }else {
        thw = (dw-viewW)/2;
    }

    $("#thumbbox").css("left", thw);

    $(".mleft").css({
        "width": mlw/ratio,
        "left": 0
    });

    $(".mright").css({
        "width": mlw/ratio,
        "right": 0
    });

    $(".mleft").click(function() {
        $(".jssora11l").trigger('click');
    });

    $(".mright").click(function() {
        $(".jssora11r").trigger('click');
    });

    $("#slider1_container").width(dw);

    var _CaptionTransitions = [];

    _CaptionTransitions["L"] = {
        $Duration: 800,
        $FlyDirection: 1,
        $Easing: $JssorEasing$.$EaseInCubic
    };

    _CaptionTransitions["R"] = {
        $Duration: 800,
        $FlyDirection: 2,
        $Easing: $JssorEasing$.$EaseInCubic
    };

    var options = {
        $AutoPlay: false,

        $PauseOnHover: true,
        $FillMode: 1,
        $ArrowKeyNavigation: true,
        // 
        $SlideWidth: slidew,

        $SlideSpacing: 1,
        $DisplayPieces: 2,
        // leftOffset/ratio
        $ParkingPosition: mlw/ratio,

        $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$,
            $ChanceToShow: 2,
            $AutoCenter: 2,
            $Steps: 1
        },
        $CaptionSliderOptions: {
            $Class: $JssorCaptionSlider$,
            $CaptionTransitions: _CaptionTransitions,
            $PlayInMode: 1,
            $PlayOutMode: 3
        },
        $ThumbnailNavigatorOptions: {
            $Class: $JssorThumbnailNavigator$,
            $ChanceToShow: 2,

            $Loop: 2,
            $SpacingX: 10,
            $SpacingY: 3,
            $DisplayPieces: 10,
            $ParkingPosition: 204,

            $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$,
                $ChanceToShow: 2,
                $AutoCenter: 2,
                $Steps: 6
            }
        }

    };

    var jssor = new $JssorSlider$("slider1_container", options);
    // console.log(jssor, jssor.$CurrentIndex())
    function ScaleSlider() {
        if (isIE78) {
            viewW = Response.viewportW();                      
        } else {
            viewW = Response.viewportW() - 17;                       
        }
        var parentWidth = jssor.$Elmt.parentNode.clientWidth;
        if (parentWidth)
            jssor.$SetScaleWidth(Math.min(parentWidth, viewW));
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }

    ScaleSlider();
    
    $(".w").imgLiquid({
        fill: false
    });

    $("#slider1_container").animate({
        opacity: 1
    }, 800);

    if(isIE78){
        ScaleSlider();
        $(window).resize(function() {
            ScaleSlider();
            ScaleSlider();
        });

        $(window).resize();        
    }else {
        ScaleSlider();
        Response.resize(function(){ 
            ScaleSlider();
        });        

    }

});
