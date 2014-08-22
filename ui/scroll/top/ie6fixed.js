/**
 * @fileOverview ie6fixed plugin
 * @author jianjun768@gmail.com
 * @version 0.5
 */
;(function($){
	$.fn.ie6fixed = function(position){
		var obj = this, fixed;
		fixed = function( position ){
			obj[0].style.removeExpression('top');
			var dom = '(document.documentElement || document.body)', ch;
			
			switch(position){
				case "lt" : 
				case "rt" :
					obj[0].style.setExpression("top", 'eval('+ dom + '.scrollTop + ' + 0 + ') + "px"');	
					break ;
				case "cc" :
					ch = window.innerHeight || (document.documentElement || document.body).clientHeight;
					obj[0].style.setExpression("top", 'eval('+ dom + '.scrollTop + ' + (ch / 2) + ') + "px"');
					break ;
				case "lb" :
				case "rb" :
					obj[0].style.setExpression("top", 'eval('+ dom + '.scrollTop + ' + ($(window).height()-obj.outerHeight()) + ') + "px"');
					break ;
				default:
					obj[0].style.setExpression("top", 'eval('+ dom + '.scrollTop + ' + obj.offset().top + ') + "px"');
			}
		}
		if( $.isFunction(position) ){
			fixed = position;
		}

		
		if (/msie/.test(navigator.userAgent.toLowerCase())  && 'undefined' == typeof(document.body.style.maxHeight)) {
		
			var html = document.getElementsByTagName('html')[0];
			if (document.body.currentStyle.backgroundAttachment !== 'fixed') {
				html.style.backgroundImage = 'url(about:blank)';
				html.style.backgroundAttachment = 'fixed';
			};
			obj.css("position","absolute");
			fixed( position );
			$(window).bind("resize", function(){
				fixed( position );
			});
		}
	}
})(jQuery);