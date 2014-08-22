<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Papermashup.com | jQuery Tooltip Plugin</title>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js"></script>
<script>
$(document).ready(function(){

$('[rel=tooltip]').bind('mouseover', function(){
	  
		
	
 if ($(this).hasClass('ajax')) {
	var ajax = $(this).attr('ajax');	
			
  $.get(ajax,
  function(theMessage){
$('<div class="tooltip">'  + theMessage + '</div>').appendTo('body').fadeIn('fast');});

 
 }else{
			
	    var theMessage = $(this).attr('content');
	    $('<div class="tooltip">' + theMessage + '</div>').appendTo('body').fadeIn('fast');
		}
		
		$(this).bind('mousemove', function(e){
			$('div.tooltip').css({
				'top': e.pageY - ($('div.tooltip').height() / 2) - 5,
				'left': e.pageX + 15
			});
		});
	}).bind('mouseout', function(){
		$('div.tooltip').fadeOut('fast', function(){
			$(this).remove();
		});
	});
						   });

</script>

<style>
.tooltip{
	position:absolute;
	width:250px;
	background-image:url(tip-bg.png);
	background-position:left center;
	color:#FFF;
	padding:5px 5px 5px 18px;
	font-size:12px;
	font-family:Verdana, Geneva, sans-serif;}
	
.tooltip-image{
	float:left;
	margin-right:5px;
	margin-bottom:5px;
	margin-top:3px;}	
	
	
	.tooltip span{font-weight:700;
color:#ffea00;}




li{
	margin-bottom:30px;}
</style>

</head>

<body>



<ol>
<li><a href="#" alt="Text Tooltip" rel="tooltip" content="<span>Text Title</span><br/> This is an example of a text tooltip with jquery">Text Tooltip</a></li>

<li><a href="#" alt="Image Tooltip" rel="tooltip" content="<span>Image Title</span><br/> <img src='http://papermashup.com/demos/jquery-gallery/images/t2.png' width='120' height='120' class='tooltip-image'/> This is an example of an image tooltip with jquery, with a little bit of text.<br/> Remember you can follow me on twitter just search: ashleyford">Image Tooltip</a></li>


<li><a href="#" alt="Image Tooltip" rel="tooltip" content="<span>Iframe Tooltip</span><br/> <iframe src='http://google.com' width='250px' height='100px' frameborder='0' scrolling='0'></iframe>">Iframe Tooltip</a></li>


<li><a href="#" class="ajax" alt="Image Tooltip" rel="tooltip" ajax="ajax.php?id=1823472">Ajax Tooltip</a></li>

</ol>

More script and css style
: <a href="http://www.htmldrive.net/" title="HTML DRIVE - Free DHMTL Scripts,Jquery plugins,Javascript,CSS,CSS3,Html5 Library">www.htmldrive.net </a>

</body>
</html>
