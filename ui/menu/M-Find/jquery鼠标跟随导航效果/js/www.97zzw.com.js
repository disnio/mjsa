$(function(){

(function(){
var $navcur = $(".nav-current");
var $nav = $("#nav");
var current = ".current";
var itemW = $nav.find(current).innerWidth();	//默认当前位置宽度
var defLeftW = $nav.find(current).position().left;	//默认当前位置Left值

//添加默认下划线
$navcur.width(itemW);

//hover事件
$nav.find("a").hover(function(){
	var index = $(this).index();	//获取滑过元素索引值
	var leftW = $(this).position().left;	//获取滑过元素Left值
	var currentW = $nav.find("a").eq(index).innerWidth();	//获取滑过元素Width值
	$navcur.stop().animate({
		left: leftW,
		width: currentW
	},300);
	
},function(){
	$navcur.stop().animate({
		left: defLeftW,
		width: itemW
	},300)
})
})();
});
/*
本代码由97站长网收集并编辑整理;
尊重他人劳动成果;
转载请保留97站长网链接 - www.97zzw.com
*/