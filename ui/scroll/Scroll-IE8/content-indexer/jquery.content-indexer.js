/*
 * jQuery Web Page Content Indexer Plugin
 *
 * Copyright (c) 2010 Pramod S Nair - Humming Bird Designs(labs@hbirddesigns.com)
 * Licensed under GPL licenses.
 *
 */
 jQuery.fn.createIndex = function(options) {
 
 /*
 Option Parameters 
 animateScroll - {'yes'/'no'} - This enables / disables animation while the page scrolls 
 scrollDelay - {delay in milliseconds} - The scroll animation delay in milliseconds
 followPageScroll - {'yes'/ 'no'} - This enables or disables the ability of float menu to follow user as he scrolls the page
 menuTitle - {text for the float menu title area}
 activateGoTop -{'yes'/'no'} - Enables / disables the functionality of adding a go to top menu against each section
 easingEnable-{'yes'/'no'}  - Enables /Disables Easing for animation. Default is no
 easingMethod - {easing method name} - if you have jquery.easing plugin in the page you can use any valid easing name from that plugin. dont forget to enable easingEnable
						 while using this
 menuStyle - {'float'/'dull'} - The style in which the content index menu is created. 'float' creates a stylish menu which can move around while scrolling and which
					can open and close. 'dull' adds a normal menu Index at the very top of the page.
normalMenuPositionSelector - {any valid jquery selctor} - adds the normal menu as the first item under this selctor element.
 */
 
  var defaults = {  
    animateScroll: "yes",  
    scrollDelay: 1000,  
    followPageScroll: "yes",
	menuTitle:"Page Contents",
	activateGoTop:"no",
	easingEnable:"no",
	easingMethod:"swing",
	menuStyle:"float",
	normalMenuPositionSelector:"body"
   }; 

  var options = jQuery.extend(defaults, options); 
  
	//Add our Index Menu Area to page
	//If options.menuStyle='float' then load float menu else load normal Menu
		if(options.menuStyle=="float")
		{
		jQuery(this).createFloatMenu(options);
		}
		else
		{
		jQuery(this).createNormalMenu(options);
		}
	
	//If options.activateGoTop is set to yes add a div at the very top of the body 
		if (options.activateGoTop =="yes")
		{
			jQuery('body').prepend('<div id="content-indexer-pagetop">Top</div>');
			jQuery('#content-indexer-pagetop').css('visibility','hidden');
		}
	
  return this.each(function(i) {
		//Get each section text for title
		var sectionObj = jQuery(this);
		var chapterTitle = sectionObj.text();
		// section id
		var chapterId = 'section' + (i + 1);
		
		//Attach an Id to handle the internal page link to each section
		sectionObj.attr('id', chapterId);
		
		//If options.activateGoTop is set to yes add a link to go to top after each section
		if (options.activateGoTop =="yes")
		{
			var toplink = jQuery('<a></a>').text("Top")
			.attr({
			'title': 'Go to Top',
			'href': '#content-indexer-pagetop',
			'class': 'content-indexer-toplink'
			})
			sectionObj.before(toplink);
			//We are explicitly binding the click event to animate scroll each of the newly created links in the float menu area if the animate option if set yes
			if (options.animateScroll=="yes")
				{
					bindEvents2();
				}
		}
		
		//Now add the index menu content to our Float menu area
		var targetDiv = "";
		if (options.menuStyle=="float")
		{
			 targetDiv = "#page-contents";
		}
		else
		{
			targetDiv = "#page-contents-normal";
		}
		jQuery('<a></a>').text(chapterTitle)
			.attr({
				'title': 'View ' + chapterTitle,
				'href': '#' + chapterId,
				'class': 'indexlink'
			})
		.appendTo(targetDiv +' div');
	  
	  //We are explicitly binding the click event to animate scroll each of the newly created links in the float menu area if the animate option if set yes
	  if (options.animateScroll=="yes")
	  {
		bindEvents();
	  }
  });
   
  function bindEvents() {
	jQuery('a.indexlink').bind('click',custscrollTo);
	}
  function bindEvents2() {
	jQuery('a.content-indexer-toplink').bind('click',custscrollTo);
	}
	
	function custscrollTo()
	{
	//Animated scroll to section code
	var targetname = jQuery(this).attr('href');
	var targetObj = jQuery(targetname);
	var top = targetObj.offset().top;
	//chk if easing enabled and if easing plugin is loaded
	if ((options.easingEnable=="yes") && (jQuery.easing.def))
		{
		//the user has added jquery.easing plugin  & has the easing enabled
			}
		else
			{
			//the user has not included jquery.easing plugin. so make sure we are not using any easing plugin related easing methods
			options.easingMethod = "swing";
			}
	jQuery('html,body').animate({scrollTop: top}, options.scrollDelay,options.easingMethod);
	return false;
	}
};

jQuery.fn.createFloatMenu = function(options) {
	//Function to create the floting content menu area
	jQuery('<div id="page-contents"></div>')
		.prepend('<a class="toggler" href="#">'+ options.menuTitle +'</a>')
		.append('<div></div>')
		.prependTo('body'); 
	jQuery('#page-contents > a.toggler').click(function() {
    jQuery(this).toggleNext();
    return false;
	});
	
   //Make this content menu area float with page scroll if followPageScroll is set yes
   if (options.followPageScroll == "yes")
   {
	 jQuery(window).scroll(function() {
		jQuery('#page-contents').css('top', jQuery(this).scrollTop() + "px");
		});
	}
};

jQuery.fn.createNormalMenu = function(options) {
	//Function to create the normal content menu area
	jQuery('<div id="page-contents-normal"></div>')
		.append('<div></div>')
		.prependTo(options.normalMenuPositionSelector); 
	
   //Make this content menu area float with page scroll if followPageScroll is set yes
   if (options.followPageScroll == "yes")
   {
	 jQuery(window).scroll(function() {
		jQuery('#page-contents').css('top', jQuery(this).scrollTop() + "px");
		});
	}
};

jQuery.fn.toggleNext = function() {
//Toggle the view of content menu  area
  this.toggleClass('arrow-down')
    .next().slideToggle('slow');
  return this;
};