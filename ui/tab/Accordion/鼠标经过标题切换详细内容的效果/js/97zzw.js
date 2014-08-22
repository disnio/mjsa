$(document).ready(function () {
   var target= $("#numtext > ul > li");
	target.mouseover(function(){
		$("#numtext li").removeClass("first");
		$("#numtext li img,#numtext li span").hide();
		$(this).addClass("first");
		$(this).find("img").show();
		$(this).find("span").show();
	});
	/*代码整理：www.97zzw.com - 97站长网 （尊重我们的劳动成功，转载请注明来源）*/
	var target1= $(".leftmenu > ul > li:has('.submenu_show') > .menutext");
	target1.hover(function(){
		$(this).parent().find(".submenu_show").hide();
		$(this).parent().find(".menutext").removeClass("menutext_show");
		$(this).parent().find(".submenu_show").show();
		$(this).parent().find(".menutext").addClass("menutext_show");
	},function(){
		$(this).parent().find(".submenu_show").hide();
		$(this).parent().find(".menutext").removeClass("menutext_show");
	}
	); 
   });


