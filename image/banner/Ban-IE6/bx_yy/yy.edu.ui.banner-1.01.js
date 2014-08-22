/**
 * 
 * 左右切换的控件
 * 
 * @param options { //
 *            必选 total : 4, 
 *            // 必选 
 *            bannerWidth : 389, 
 *            // 可选 
 *            bannerHeight : 128, 
 *            // 可选 默认为0 
 *            bannerGap : 12, 
 *            // 可选 必须为JQUERY对象 
 *            leftBtn : $(".J_btnPrev"), 
 *            // 可选 必须为JQUERY对象 
 *            rightBtn : $(".J_btnNext"), 
 *            // 必选 必须为JQUERY对象 
 *            bannerContainer : $(".J_content") 
 *            // 如果设置了缩略图则要设置缩略图的子元素的编号  从 0 开始递增 
 *            thumbContainer
 *            
 *            }
 * @returns
 */
function Banner(options) {
	this.bannerContainer = options.bannerContainer; // 必须为JQUERY对象
	this.total = options.total; // 总的元素个数
	this.bannerWidth = options.bannerWidth; // 各元素的宽度
	this.bannerHeight = options.bannerHeight; // 各元素的高度
	this.bannerGap = options.bannerGap ? options.bannerGap : 0; // 各元素直接的间隔
	this.leftBtn = options.leftBtn ? options.leftBtn : null; // 向左的按钮
	this.rightBtn = options.rightBtn ? options.rightBtn : null; // 向右的按钮
	this.animateDuringTime = options.animateDuringTime ? options.animateDuringTime : 500; // 动画播放的持续时间
	this.autoInterval = options.autoInterval ? options.autoInterval : 0; // 定时向左切换
	this.switchEffect = options.switchEffect ? options.switchEffect : "slide"; // 定时向左切换
	this.thumbContainer = options.thumbContainer ? options.thumbContainer : null; // 缩略的导航
	this.startEffectHandler = options.startEffectHandler ? options.startEffectHandler : null; // 开始动画的处理函数
	this.thumbEvent = options.thumbEvent ? options.thumbEvent : "mouseover"; // 开始动画的处理函数
	this.autoFlag = options.autoFlag ? options.autoFlag : true;
	// 
	this.isScrolling = false;
	// 
	this.goLeft = function() {
		//alert("this.autoFlag = "+this.autoFlag);
		if (this.isScrolling || !this.autoFlag) {
			return;
		}
		this.isScrolling = true;
		// 左右切换的效果
		if ("slide" == this.switchEffect) {
			this.bannerContainer.animate({
				marginLeft : 0 - (this.bannerWidth + this.bannerGap)
			}, this.animateDuringTime, $.proxy(function() {
				try {
					// 归位
					this.bannerContainer.css("margin-left", 0);
					// 替换元素
					var firstBanner = $(this.bannerContainer.children()[0]);
					this.bannerContainer.append(firstBanner.clone(true));
					firstBanner.remove();
				} catch (e) {
				}
				this.isScrolling = false;
			}, this));
		}
		// 不能左右来回的切换效果
		else if("normalSlide" == this.switchEffect){
			var curMarginLeft = parseInt(this.bannerContainer.css("margin-left"));
			var targetMarginLeft = curMarginLeft - (this.bannerWidth + this.bannerGap);
			if(targetMarginLeft < 0 - (this.bannerWidth + this.bannerGap) * (this.total - 1)){
				targetMarginLeft = 0;
			}
			var selectedIndex = 0 - targetMarginLeft / (this.bannerWidth + this.bannerGap);
			this.selectThumb(selectedIndex);
			this.excuteStartEffectHandler(selectedIndex);
			this.bannerContainer.animate({
				marginLeft : targetMarginLeft
			}, this.animateDuringTime, $.proxy(function() {
				try {
					// 不做任何事情
				} catch (e) {
				}
				this.isScrolling = false;
			}, this));
		}
		// 淡入淡出的效果
		else if ("fade" == this.switchEffect) {
			var children = this.bannerContainer.children();
			var nextChild = null;
			var selectedChild = null;
			var selectedIndex = 0;
			for ( var i = 0; i < children.length; i = i + 1) {
				var child = children[i];
				if ($(child).css("display") != "none") {
					var nextIndex = i;
					selectedChild = child;
					if (i < children.length - 1) {
						nextIndex = i + 1;
					} else {
						nextIndex = 0;
					}
					this.selectThumb(nextIndex);
					nextChild = children[nextIndex];
					selectedIndex = nextIndex;
					break;
				}
			}
			if (selectedChild != null && nextChild != null) {
				$(selectedChild).fadeOut(this.animateDuringTime);
				$(nextChild).fadeIn(this.animateDuringTime, $.proxy(function() {
					this.isScrolling = false;
					this.excuteStartEffectHandler(selectedIndex);
				}, this));
			}
		}

	};
	// 选中指定的缩略图
	this.selectThumb=function(index){
		// 如果没有缩略图则不管
		if(!this.thumbContainer){
			return;
		}
		if(index<0 || index > this.thumbContainer.children().length - 1){
			return;
		}
		var selectedChild = this.thumbContainer.children(".selected");
		$(selectedChild).removeClass("selected");
		$(this.thumbContainer.children()[index]).addClass("selected");
	};
	
	// 
	this.goRight = function() {
		if (this.isScrolling) {
			return;
		}
		this.isScrolling = true;
		// 左右切换的效果
		if ("slide" == this.switchEffect) {
			try {
				// 归位
				this.bannerContainer.css("margin-left",
						0 - (this.bannerWidth + this.bannerGap));
				// 替换元素
				var lastBanner = $(this.bannerContainer.children()[this.bannerContainer
						.children().length - 1]);
				this.bannerContainer.prepend(lastBanner.clone(true));
				lastBanner.remove();
			} catch (e) {
			}
			this.bannerContainer.animate({
				marginLeft : 0
			}, this.animateDuringTime, $.proxy(function() {
				this.isScrolling = false;
			}, this));
		}
		// 不能左右来回的切换效果
		else if("normalSlide" == this.switchEffect){
			var curMarginLeft = parseInt(this.bannerContainer.css("margin-left"));
			var targetMarginLeft = curMarginLeft + (this.bannerWidth + this.bannerGap);
			if(targetMarginLeft > 0){
				targetMarginLeft = 0 - (this.bannerWidth + this.bannerGap) * (this.total - 1);
			}
			// 选中缩略图
			var selectedIndex = 0 - targetMarginLeft / (this.bannerWidth + this.bannerGap);
			this.selectThumb(selectedIndex);
			this.excuteStartEffectHandler(selectedIndex);
			this.bannerContainer.animate({
				marginLeft : targetMarginLeft
			}, this.animateDuringTime, $.proxy(function() {
				try {
					// 不做任何事情
				} catch (e) {
				}
				this.isScrolling = false;
			}, this));
		}
		// 淡入淡出的效果
		else if ("fade" == this.switchEffect) {
			var children = this.bannerContainer.children();
			var nextChild = null;
			var selectedChild = null;
			var selectedIndex = 0;
			for ( var i = 0; i < children.length; i = i + 1) {
				var child = children[i];
				if ($(child).css("display") != "none") {
					var nextIndex = i;
					selectedChild = child;
					if (i >= 1) {
						nextIndex = i - 1;
					} else {
						nextIndex = children.length - 1;
					}
					this.selectThumb(nextIndex);
					nextChild = children[nextIndex];
					selectedIndex = nextIndex;
					break;
				}
			}
			if (selectedChild != null && nextChild != null) {
				$(selectedChild).fadeOut(this.animateDuringTime);
				$(nextChild).fadeIn(this.animateDuringTime, $.proxy(function() {
					this.isScrolling = false;
					this.excuteStartEffectHandler(selectedIndex);
				}, this));
			}
		}
	};
	// 获取选中的下标
	this.getFadeSelectedIndex = function(){
		var selectedIndex = null;
		var children = this.bannerContainer.children();
		for ( var i = 0; i < children.length; i = i + 1) {
			var child = children[i];
			if ($(child).css("display") != "none") {
				selectedIndex = i;
				break;
			}
		}
		return selectedIndex;
	};
	// 选中某一个
	this.selectFadeItem = function(index){
		if(index < 0 || index > this.total - 1){
			return false;
		}
		var selectedIndex = this.getFadeSelectedIndex();
		if(selectedIndex == index){
			return false;
		}
		if (this.isScrolling) {
			return false;
		}
		this.isScrolling = true;
		this.excuteStartEffectHandler(index);
		var nextChild = this.bannerContainer.children()[index];
		var selectedChild = this.bannerContainer.children()[selectedIndex];
		$(selectedChild).fadeOut(this.animateDuringTime);
		$(nextChild).fadeIn(this.animateDuringTime, $.proxy(function() {
			this.isScrolling = false;
		}, this));
		return true;
	};
	// 选择左右切换的某个元素
	this.selectNormalSlideItem = function(index){
		if(index < 0 || index > this.total - 1){
			return false;
		}
		if (this.isScrolling) {
			return false;
		}
		var targetMarginLeft = 0 - index * (this.bannerWidth + this.bannerGap);
		var curMarginLeft = this.bannerContainer.css("margin-left");
		if(curMarginLeft == targetMarginLeft){
			return;
		}
		this.isScrolling = true;
		// 回调
		var selectedIndex = 0 - targetMarginLeft / (this.bannerWidth + this.bannerGap);
		this.excuteStartEffectHandler(selectedIndex);
		this.bannerContainer.animate({
			marginLeft : targetMarginLeft
		}, this.animateDuringTime, $.proxy(function() {
			try {
				// 不做任何事情
			} catch (e) {
			}
			this.isScrolling = false;
		}, this));
		return true;
	};
	// 选中某个元素
	this.selectItemByIndex = function(index){
		// 不能左右来回的切换效果
		if("normalSlide" == this.switchEffect){
			return this.selectNormalSlideItem(index);
		}
		// 淡入淡出的切换效果
		else if ("fade" == this.switchEffect) {
			return this.selectFadeItem(index);
		}
		return false;
	};
	// 回调动画开始函数
	this.excuteStartEffectHandler = function(selectedIndex){
		if(this.startEffectHandler){
			try{
				this.startEffectHandler(selectedIndex);
			}catch(e){}
		}
	};
	
	//
	this.switchAuto = function() {
		this.goLeft();
	};
	// 初始化函数
	this.init = function() {
		if ("slide" == this.switchEffect) {
			this.bannerContainer.css("width",
					(this.bannerWidth * this.total + this.bannerGap
							* (this.total + 1))
							+ "px");
		} else if ("fade" == this.switchEffect) {
			this.bannerContainer.css("width", this.bannerWidth + "px");
			// 隐藏其他的
			$.each( this.bannerContainer.children(), function(i, n){
				 if(i != 0){
					 $(n).hide();
				 }
			});
			if(this.thumbContainer != null && this.thumbContainer.children().length == this.total){
				//alert("init this.thumbContainer.children().length = "+this.thumbContainer.children().length+", this.total = "+this.total+", this.thumbEvent = "+this.thumbEvent);
				var children = this.thumbContainer.children();
				for ( var i = 0; i < children.length; i = i + 1) {
					var child = children[i];
					$(child).bind(this.thumbEvent,{banner:this},function(e){
						var banner = e.data.banner;
						var switchResult = banner.selectItemByIndex($(this).attr("selectIndex"));
						if(switchResult){
							var selectedChild = banner.thumbContainer.children(".selected");
							$(selectedChild).removeClass("selected");
							$(this).addClass("selected");
						}
					});
				}
				$(children[0]).addClass("selected");
			}
		}else if("normalSlide" == this.switchEffect){
			this.bannerContainer.css("width",
					(this.bannerWidth * this.total + this.bannerGap
							* (this.total + 1))
							+ "px");
			if(this.thumbContainer != null && this.thumbContainer.children().length == this.total){
				var children = this.thumbContainer.children();
				for ( var i = 0; i < children.length; i = i + 1) {
					var child = children[i];
					$(child).bind(this.thumbEvent,{banner:this},function(e){
						var banner = e.data.banner;
						var switchResult = banner.selectItemByIndex($(this).attr("selectIndex"));
						if(switchResult){
							var selectedChild = banner.thumbContainer.children(".selected");
							$(selectedChild).removeClass("selected");
							$(this).addClass("selected");
						}
					});
				}
				$(children[0]).addClass("selected");
			}
		}
		if (this.rightBtn) {
			this.rightBtn.bind("click", $.proxy(this.goRight, this));
		}
		if (this.leftBtn) {
			this.leftBtn.bind("click", $.proxy(this.goLeft, this));
		}
		if (this.autoInterval > 0) {
			// 自动切换
			setInterval($.proxy(this.goLeft, this), this.autoInterval);
		}
	};
	// 执行初始化函数
	this.init();
}