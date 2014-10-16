/* 代码整理：懒人之家 www.lanrenzhijia.com */

// 左右滚动部分
$(function(){
	var offsetWidth = $('.theme2 .detail').length * 900;
	var m2 = $('.theme2');
	$('.next').click(function (){
		if (m2[0].scrollLeft >= offsetWidth - 900) {
			m2.animate({scrollLeft: '0'}, 250);
		} else {
			m2.animate({scrollLeft: '+=900'}, 250);
		}
		return false;
     });
     $('.pre').click(function (){
		m2.animate({scrollLeft: '-=900'}, 250);
		return false;
	});
	
	var t;
	
	function slide() {
		if (m2[0].scrollLeft >= offsetWidth - 900) {
			m2.animate({scrollLeft: '0'}, 250);
		} else {
			m2.animate({scrollLeft: '+=900'}, 250);
		}
		t = setTimeout(slide, 102400);
	}
	t = setTimeout(slide, 102400);
});

// 弹出窗口以及滚动条控制部分
jQuery(document).ready(function($) {
	$('.btn').click(function(){
		$('.theme').fadeIn(100);
		$('.theme_mark').show();
		$('#scrollbar').tinyscrollbar();
		$('#scrollbar2').tinyscrollbar();
		$('#scrollbar3').tinyscrollbar();
	})
	$('.theme_mark, .close').click(function(){
		$('.theme').fadeOut(100);
		$('.theme_mark').hide();
	})

});
/* 代码整理：懒人之家 www.lanrenzhijia.com */