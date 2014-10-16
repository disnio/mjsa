// JavaScript Document
	$(document).ready(function(){
		$("nav ul").after('<img class="navHover" src="images/p1_scroll_btn.png" />');
		$("nav li").each(function(i){
			$(this).mouseover(function(){
				$(".navHover").animate({'left':i*109 +'px'},300);
				$(".scrollImages img").animate({'left':i*-233+'px'},300);
				})
			})
		})