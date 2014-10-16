/************************************************************************
*************************************************************************
¿¡»À÷Æº“£∫www.lanrenzhijia.com
 
**************************************************************************
*************************************************************************/
(function($) {
	$.fn.Thumba = function(opt) {
		var defaults = {
			effectThumba : 'easeOutBack', 					/** Effect of the Thumba Div when it moves **/
			effectDuration : 450, 							/** speed of the Thumba div moves **/
			keyNav : true, 									/** Allow navigation with left & right arrows or not **/
			mouseNav : true, 								/** Allow navigation with mouse or not **/
			coeffZoom : 2.5, 								/** coefficent of the image Zoom **/
			speedOpenLightBox : 100, 						/** speed in ms of the opening of Thumba LightBox **/
			legendPadding : 5,						 		/** padding of the paragraph containing the image legend **/
			defaultAlt : 'default text for alt attribut', 	/** Utils to get a nice SEO :) - Alt value when link has no title **/
			autoCorrect : true,								/** Auto correct the lightbox position if lightbox is displayed out of the browser - cause to the absolute position, it can be negative values **/
			legendOpacity : 0.8								/** opacity of the legend container **/
		}; 
		
		if(this.length)
		return this.each(function() {
			
			/****************/
			/** local vars **/
			/****************/
			var 
				opts = $.extend(defaults, opt),
				$this = $(this);	
			
			
			
			/******************************************/
			/** Create the Thumba div && global vars **/
			/******************************************/
			$ThumbaDiv = $('<div>', {'class' : 'wrapThumba',css:{zIndex:5}}).appendTo($this);
			BorderWidth = parseInt($ThumbaDiv.css('border-left-width')); // consider that left width border is equal to the top, right and bottom width border :-) We need this data to positionnate the Thumba Div
			Href = '';
			
			
			
			/********************************/
			/**** disabled links clicks *****/
			/**** Clicks are binded later ***/
			/********************************/
			$this.find('.thumba a').click(function(e){e.preventDefault();});
			
			
			
			
			/************************************************/
			/** Animate Thumb Div when document is ready ! **/
			/**** Set a class="thumba_default" on a link ****/
			/************************************************/
			if($this.find('a.thumba_default').length)
			{
				setIndexLink($this.find('a.thumba_default').parent().index());
				$('body').delay(30).queue(function(){ /** delay(30) is used for the document loading **/
					pos = getPos($this.find('a.thumba_default')),
					LinkW = getLinkWidth($this.find('a.thumba_default')),
					LinkH = getLinkHeight($this.find('a.thumba_default'));
					animateThumba(pos.top,pos.left,LinkW,LinkH,opts.effectDuration,opts.effectThumba);
				});
			}
			else
			{
				indexLink = 0;
			}
			
			
			
			
			/*******************************************/
			/** Thmuba Box moving during mouse moving **/
			/*******************************************/
			if(opts.mouseNav)
				$this.find('.thumba li > a').each(function(i,el){
					/** hover **/
					$(this).bind({
						
						mouseover:function(e){
							/** Get the link href - used in colorbox **/
							setHrefLink($(this).attr('href'));
							setIndexLink($(this).parent().index());
							
							/** vars **/
							var pos = getPos($(this)),
							LinkW = getLinkWidth($(this)),
							LinkH = getLinkHeight($(this));
							
							/** Thumba animation **/
							animateThumba(pos.top,pos.left,LinkW,LinkH,opts.effectDuration,opts.effectThumba);
						}
					});
				});
			
			
			
			
			
			/********************************************************/
			/** Action when click on thumbnail - open the lightbox **/
			/********** Bind Mouse Click or "Enter" Press ***********/
			/********************************************************/
			$('.ThumbaGallery').on("click",$ThumbaDiv,function(e){
					e.stopPropagation();
					
					/** if Thumb is already open, remove it, else open Thumba Box **/
					if($('.ThumbaLightbox').length)
					{
						close_ThumbaLightbox();
					}
					else
					{
						var currentLink = $this.find('a:eq('+indexLink+')');
						var currentHref =  currentLink.attr('href');
						var currentTitle =  currentLink.attr('title');
						var currentPos = getOffest(currentLink);
						var currentWidth = getLinkWidth(currentLink);
						var currentHeight = getLinkHeight(currentLink);
						
						/** overlay **/
						$ThumbaLightbox_overlay = $('<div>', {
							'class' : 'ThumbaLightbox_overlay',
							click:function(e){
								close_ThumbaLightbox();
							}
						}).appendTo('body').show();
						
						/** Img into lightbox **/
						$ThumbaLightboxImg = $('<img>', {
							'class' : 'ThumbaLightboxImg',
							src : currentHref,
							css : {
								width:currentWidth,
								height:currentHeight
							},
						}).animate({
							width : currentWidth * opts.coeffZoom,
							height : currentHeight * opts.coeffZoom
							
						},opts.speedOpenLightBox);
						
						
						/** Lightbox container **/
						var absoluteTop = parseInt(((currentHeight * opts.coeffZoom)-currentHeight)/2);
						var absoluteLeft = parseInt(((currentWidth * opts.coeffZoom)-currentWidth)/2);
						
						
						$ThumbaLightbox = $('<div>', {
							'class' : 'ThumbaLightbox',
							css : {
								top : currentPos.top,
								left : currentPos.left,
								width:currentWidth
							},
							click:function(e){
								close_ThumbaLightbox();
							},
							html : $ThumbaLightboxImg
						})
						.appendTo('body')
						.animate({
							top : '-='+absoluteTop,
							left : '-='+absoluteLeft,
							width : currentWidth * opts.coeffZoom,
							height : currentHeight * opts.coeffZoom
						},opts.speedOpenLightBox,function(){
							
							/** Correct the postiion if Thumba is out of browser window **/
							if(opts.autoCorrect)
							{
								if(parseInt($ThumbaLightbox.css('top')) < 0)
									$ThumbaLightbox.animate({
										top : 0
									},100);
									
								if(parseInt($ThumbaLightbox.css('left')) < 0)
									$ThumbaLightbox.animate({
										left : 0
									},100);
							}
						});
						
						
						
						
						/** Image Legend**/
						if(typeof currentTitle !== "undefined" && currentTitle != '')
						{
							$ThumbaLightboxImg.attr('alt', currentTitle);
							$ThumbaLightboxLegend = $('<p>', {
								'class' : 'ThumbaLightboxLegend',
								css : {
									width:(currentWidth * opts.coeffZoom) - opts.legendPadding*2,
									padding : opts.legendPadding,
									opacity:opts.legendOpacity
								},
								html : currentTitle
							}).appendTo($ThumbaLightbox);
							
							var heightToAdd = parseInt($ThumbaLightboxLegend.outerHeight());
							
							$ThumbaLightbox.animate({
								height : '+='+heightToAdd
							},150);
						} 
						else {
							$ThumbaLightboxImg.attr('alt', opts.defaultAlt);
						}
					}
				});
			
			
			
			
			/******************************/
			/***** KeyBoard navigation ****/
			/** <- & -> arrows + "Enter" **/
			/******************************/
			if(opts.keyNav)
			$('body').bind({				
				keyup:function(e){
					switch(e.keyCode) {
						case 37 : /** Press "Left" arrow **/
							
							var 
							actualLink = $this.find('a:eq('+indexLink+')'),
							PrevLink = actualLink.parent().prev().find('a'),
							pos = getPos(PrevLink),
							LinkW = getLinkWidth(PrevLink),
							LinkH = getLinkHeight(PrevLink);
							setIndexLink(PrevLink.parent().index());
						
							/** Thumba animation **/
							if(indexLink >=0) animateThumba(pos.top,pos.left,LinkW,LinkH,opts.effectDuration,opts.effectThumba);
							else
							{
								var 
								PrevLink = $this.find('a:last'),
								pos = getPos(PrevLink),
								LinkW = getLinkWidth(PrevLink),
								LinkH = getLinkHeight(PrevLink);
								setIndexLink(PrevLink.parent().index());
								animateThumba(pos.top,pos.left,LinkW,LinkH,opts.effectDuration,opts.effectThumba);
							}
							
							/** if lightBox is open, close it **/
							if($('.ThumbaLightbox').length) {
								close_ThumbaLightbox();
							}
							
							
							break;
						case 39 : /** Press "Right" arrow **/
							
							var 
								actualLink = $this.find('a:eq('+indexLink+')'),
								NextLink = actualLink.parent().next().find('a'),
								pos = getPos(NextLink),
								LinkW = getLinkWidth(NextLink),
								LinkH = getLinkHeight(NextLink);
								setIndexLink(NextLink.parent().index());
								
							/** Thumba animation **/
							if(actualLink.is($this.find('a:last')))
							{
								var 
								NextLink = $this.find('a:first'),
								pos = getPos(NextLink),
								LinkW = getLinkWidth(NextLink),
								LinkH = getLinkHeight(NextLink);
								setIndexLink(NextLink.parent().index());
								animateThumba(pos.top,pos.left,LinkW,LinkH,opts.effectDuration,opts.effectThumba);
							}
							else animateThumba(pos.top,pos.left,LinkW,LinkH,opts.effectDuration,opts.effectThumba);
								
								
							/** if lightBox is open, close it **/
							if($('.ThumbaLightbox').length) {
								close_ThumbaLightbox();
							}
								
							break;
						case 13 : 
							if($('.ThumbaLightbox').length) {
								close_ThumbaLightbox();
							}
							else
							{
								setHrefLink($this.find('a:eq('+indexLink+')').attr('href'));
								/** Press "Enter" = Click on Thumbnail **/
								$ThumbaDiv.click();
							}
						break;
					}
				}
			});
		});
		
		
		
		
		
		/**********************/
		/** useful functions **/
		/**********************/
		function getOffest(el) {return el.offset();};
		function getPos(el) {return el.position();};
		function getLinkWidth(el) {return parseInt(el.width());};
		function getLinkHeight(el) {return parseInt(el.height());};
		function setIndexLink(i) {indexLink = i;};
		function setHrefLink(link) {Href = link;};
		function animateThumba(t,l,wd,ht,d,e){
			$ThumbaDiv.dequeue().show().animate({
				top:t - BorderWidth,
				left:l - BorderWidth,
				width:wd,
				height:ht
			},d,e);
		};
		function close_ThumbaLightbox(){
			$('.ThumbaLightbox, .ThumbaLightbox_overlay').each(function(){
				$(this).fadeOut('fast',function(){
					$(this).remove();
				});
			});
		};
	}
})(jQuery);