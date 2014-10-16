$(document).ready(function(){
						   
    $(".biaoti").animate({top:'10px'},700);

						   
    var div=$(".wone");
    div.delay(700);
    div.animate({height:'99px',opacity:'0.4'},500);
    div.animate({width:'120px',opacity:'0.8'},500);
	
	var div1=$(".wtwo");
    div1.delay(1000);
    div1.animate({height:'99px',opacity:'0.4'},500);
    div1.animate({width:'120px',opacity:'0.8'},500);
	
	var div2=$(".wthird");
    div2.delay(2000);
    div2.animate({height:'99px',opacity:'0.4'},500);
    div2.animate({width:'120px',opacity:'0.8'},500);

		
	var div3=$(".wfour");
    div3.delay(3000);
    div3.animate({height:'99px',opacity:'0.4'},500);
    div3.animate({width:'120px',opacity:'0.8'},500);
	
	
});

$( document ).bind( 'mobileinit', function(){
$.mobile.loader.prototype.options.text = "loading";
$.mobile.loader.prototype.options.textVisible = false;
$.mobile.loader.prototype.options.theme = "a";
$.mobile.loader.prototype.options.html = "";
}); 
