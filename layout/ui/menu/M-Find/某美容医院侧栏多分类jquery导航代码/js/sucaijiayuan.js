 //变美项目下拉
$(function() {
	var bBtn = false;
	var bW=false;
	var navW=0;
	
	$('#Z_TypeList').hover(function() {
		$('.Z_MenuList').queue(function(next) {
			$(this).css({
				'display': 'block',
				'overflow':'hidden'
			});
			next();
		}).animate({
			'height': '+=420px'
		},
		300,
		function() {
			$('ul.Z_MenuList_ul>li').each(function() {
				
				$(this).hover(function() {
					
					$(this).queue(function(next) {
						
						var ins = $(this).index();
						$(this).addClass('menuItemColor');

						$('.subView').css({
							'width': 0,
							'display': 'none'
						});
						
						function toNavW(){
							if (!bBtn) {
							if(parseInt($('header').width())>=1190){
								bW=true;
							}else{
								bW=false;
							}
							
							navW=bW?975:765;
							
							$('.Z_SubList').addClass('box-shadow');
							$('.Z_SubList').stop().css({
								'display': 'block'
							}).animate({
								'width': navW
							});
							$('.subView').eq(ins).stop().css({
								'display': 'block'
								
							}).animate({
								'width': navW
							},
							function() {
								bBtn = true;
							});
						} else {
							$('.subView').eq(ins).stop().css({
								'display': 'block'
							}).animate({
								'width': navW
							},
							0);
						}
						}
						toNavW();
						$(document).bind('ready',toNavW);
						$(window).bind('resize',function(){
						    $(document).unbind('ready',toNavW);
							$(document).bind('ready',toNavW);
						});						
						next();
					});

					//$(this).find('h3,p a').css('color', '#fff');
				},
				function() {
					$(this).removeClass('menuItemColor');
				});

			});

		});

	},
	function() {
		$(this).queue(function(next) {
			bBtn = false;
			$(this).find('.Z_MenuList').stop().css({
				'height': 0,
				'display': 'none'
			});
			$('.subView').css({
				'width': 0,
				'display': 'none'
			});
			$('.Z_SubList').removeClass('box-shadow');
			$('.Z_SubList').css({
				'width': 0,
				'display': 'none'
			});
			$('ul.Z_MenuList_ul>li').each(function() {
				$(this).removeClass('menuItemColor');
				//$(this).find('h3').css('color', '#000');
				//$(this).find('p a').css('color', '#888');
			})

			next();

		});

	});

});
document.ondragstart=function (){return false;};
/*
本代码由素材家园收集并编辑整理;
尊重他人劳动成果;
转载请保留素材家园链接 - www.sucaijiayuan.com
*/