/*!
 * cxMenu 1.0
 * http://code.ciaoca.com/
 * https://github.com/ciaoca/cxmenu
 * E-mail: ciaoca@gmail.com
 * Released under the MIT license
 * Date: 2012-12-12
 */
(function($){
	$.fn.cxMenu=function(settings){
		if(this.length<1){return;};
		settings=$.extend({},$.cxMenu.defaults,settings);

		var obj=this;

		obj.delegate("li",settings.events,function(e){
			e.stopPropagation();
			var li=$(this).closest("li");
			if(li.children("ul").length>0){
				var li_sib=li.siblings();

				li_sib.removeClass("selected");
				li_sib.find("li").removeClass("selected");
				li_sib.find("ul").slideUp(settings.speed);
				if(li.hasClass("selected")){
					li.removeClass("selected");
					li.find("ul").slideUp(settings.speed);
					li.find("li").removeClass("selected");
					return false;
				};
				li.toggleClass("selected");
				li.children("ul").slideToggle(settings.speed);
				return false;
			};
		});
	};

	// 默认值
	$.cxMenu={defaults:{
		events:"click",	// 按钮事件
		speed:600		// 切换速度
	}};
})(jQuery);