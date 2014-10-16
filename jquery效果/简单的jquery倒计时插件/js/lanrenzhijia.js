// 代码整理：懒人之家 lanrenzhijia.com
		$(document).ready(function() {
			
			/* delay function */
			jQuery.fn.delay = function(time,func){
				return this.each(function(){
					setTimeout(func,time);
				});
			};
			
			
			jQuery.fn.countDown = function(settings,to) {
				settings = jQuery.extend({
					startFontSize: '36px',
					endFontSize: '12px',
					duration: 1000,
					startNumber: 10,
					endNumber: 0,
					callBack: function() { }
				}, settings);
				return this.each(function() {
					
					if(!to && to != settings.endNumber) { to = settings.startNumber; }
					
					//set the countdown to the starting number
					$(this).text(to).css('fontSize',settings.startFontSize);
					
					//loopage
					$(this).animate({
						'fontSize': settings.endFontSize
					},settings.duration,'',function() {
						if(to > settings.endNumber + 1) {
							$(this).css('fontSize',settings.startFontSize).text(to - 1).countDown(settings,to - 1);
						}
						else
						{
							settings.callBack(this);
						}
					});
							
				});
			};
			
			$('#countdown').countDown({
				startNumber: 10,
				callBack: function(me) {
					$(me).text('All done! This is where you give the reward!').css('color','#090');
				}
			});
			
		});
		// 代码整理：懒人之家 lanrenzhijia.com