if(typeof SELF=="undefined" || !SELF){
    var SELF = {};
};
// 汉子字符长度
SELF.getStrLength = function(val){
    var str = $.trim(val);
    str = str.replace(/[^\x00-\xff]/ig,'xx');

    return str.length;
};
SELF.NavSwitch = {
    currentIndex: 0,
    init: function(cindex){
        var _self = this;
        _self.mainNav = $("#main-channel-nav");
        _self.mainNavItems = _self.mainNav.find("li");      
        _self.subNavItems = $("ul.sub-nav");
        _self.currentIndex = cindex;
        _self.activeIndex = _self.currentIndex;

        _self.bindEvent();
    },
    bindEvent: function(){
        var _self = this;
        _self.mainNavItems.mouseenter(function(){
            $(_self.subNavItems[_self.activeIndex]).hide();
            $(_self.mainNavItems[_self.activeIndex]).removeClass("current");

            _self.activeIndex = _self.mainNavItems.index( this );
            $(_self.subNavItems[_self.activeIndex]).show();
            $(_self.mainNavItems[_self.activeIndex]).addClass("current");
        });        
    }
}