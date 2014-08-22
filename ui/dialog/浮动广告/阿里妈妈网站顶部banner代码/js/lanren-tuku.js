/**************************************************************
代码整理：懒人图库　 ＊珍惜他人劳动，转载请自觉注明出处
**************************************************************/

var is_home_tx_show = false;
var div_home_tx = document.getElementById("home_tx");
var div_home_tx_in = document.getElementById("home_tx_in");
var stepms = 10;

function home_tx_show(){
	home_tx_stepshow();
}
function home_tx_stepshow(){
	var curHeight = parseInt(div_home_tx.offsetHeight);
	if(curHeight>=37){
		is_home_tx_show = true;
	}else{
		div_home_tx.style.height = (curHeight + 4) + "px";
		div_home_tx_in.style.top = (parseInt(div_home_tx_in.style.top)+4)+"px";
		window.setTimeout(home_tx_stepshow,30);
	}
}
function home_tx_hide(){
	if(is_home_tx_show){
		home_tx_stephide()
	}else{
		window.setTimeout(home_tx_stephide,1200);
	}
}

function home_tx_stephide(){
	var curHeight = parseInt(div_home_tx.style.height);
	if(curHeight<=0){
		is_home_tx_show = false;
	}else{
		try{
			div_home_tx.style.height = (curHeight - 4) + "px";
    		div_home_tx_in.style.top = (parseInt(div_home_tx_in.style.top)-4)+"px";
    		window.setTimeout(home_tx_stephide,30);
		} catch(e) {}
	}
}
if(window.addEventListener){
	window.addEventListener("load",home_tx_show,false);
}else{
	window.attachEvent("onload",home_tx_show);
}