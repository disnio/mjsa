if(typeof SELF=="undefined" || !SELF){
	var SELF = {};
};

SELF.FocusImg = {
	config: {
		//adCodeId: 'self_homepage_focuspicture_690x330',
		autoPlay: true,
		delay: 300, //鼠标over时的延迟
		interval: 5000,
		duration: 800
	},
	init: function(conId,config){	
		var _self = this;
		$.extend(_self.config, config||{});
		_self.focusWrapper = $(conId);

		_self.panels = _self.focusWrapper.find(".selffocus-list >li")
		_self.triggers = _self.focusWrapper.find(".selffocus-trigger a");
		_self.lengthL = _self.triggers.length;
		_self.curIndex = 0;
		_self.lastIndex = 0;
		_self.isFading = false;
	
		_self.triggers.mouseover(function() {
			var tempIndex = _self.triggers.index(this);
			if(tempIndex == _self.curIndex){
				return ;
			}			
			_self.delayTimer = setTimeout(function(){
				_self.stop();
				_self.curIndex = tempIndex;
				_self.show(_self.curIndex);
			}, _self.config.delay);
		});

		_self.triggers.mouseout(function(){
			if(_self.delayTimer){
				clearTimeout( _self.delayTimer );
				_self.delayTimer = null;
			}
			if( _self.config.autoPlay && !_self.isPlaying ){
				_self.autoPlay();
			}
		});

		if(_self.config.autoPlay){
			_self.autoPlay();
		}
		//初始化广告
		//_self.showAd();
	},
	show:function(i){
		var _self = this;
		_self.panels.eq(_self.lastIndex).fadeOut(500);
		_self.panels.eq(i).fadeIn(_self.config.duration, function(){});

		_self.triggers.removeClass("active");
		_self.triggers.eq(i).addClass("active");
		_self.lastIndex = _self.curIndex;
	},
	autoPlay:function(){
		var _self = this;
		_self.isPlaying = true;
		_self.timer = setInterval(function() {
			_self.lastIndex = _self.curIndex;
			_self.curIndex++;
			if( _self.curIndex == _self.lengthL ) { _self.curIndex = 0; }
			_self.show(_self.curIndex);
		}, _self.config.interval);
	},
	stop:function(){
		var _self = this;
		_self.isPlaying = false;
		clearInterval(_self.timer);
		_self.timer = null;
	}/*,
	showAd: function(){
		var adDiv = $('#'+ this.config.adCodeId ), adContainer = adDiv.find('div');
		if(adContainer.length > 0){			
			adDiv.prev().hide();
			adDiv.show();
		}
	}*/
}