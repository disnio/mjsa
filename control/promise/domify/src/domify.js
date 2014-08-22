
/* jQuery plugin to add responsive image handling to jQuery websites */
/* https://github.com/jameswestgate/domify
/* Copyright James Westgate 2013 */
/* Dual licensed under the MIT and GPL licenses */


//Polyfill to get textContent of noscript tags from unsupported browsers
//Based on https://github.com/jameswestgate/noscript-textcontent
(function() {

	var div = document.createElement("div");
	div.innerHTML = "<noscript><span></span></noscript>";
	
	var elements = div.getElementsByTagName("noscript");
	if (elements.length && elements[0].textContent) return; //No polyfill required

	//Re-request the page via ajax, the page is already in cache
	//Patch XMLHttpRequest if required
	var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); //For IE6 and below only, good enough for our purposes
	xmlhttp.open("GET", window.location, false); //syncronous call since we need to block
	xmlhttp.send();

	//Process the response
	var tags = document.getElementsByTagName("noscript");
	var regex = /<noscript>(.*?)<\/noscript>/igm; 
	var results, response = xmlhttp.responseText;
	var i=0, len=tags.length;

	while (i < len) {
		results = regex.exec(response);
		if (results) tags[i].textContent = results[1];
		i++;
	}
})();



/* jQuery plugin */
(function($){

	//Reads into noscript nodes and replaces them with selected content either straight away, 
	//or when  scrolled into view,  or after page load
                $.fn.domify = function(callback) {

	             	var noscripts = [], fragment;

	             	//Validate parms
	             	if (typeof callback !== 'function') callback = null;

	               //Now loop through each noscript tag
                	this.each(function() {

                		//Get text content of noscript tag
                		fragment = $(this.textContent);

                		//Apply the callback to the fragment
                		//Make sure the results are updated accordingly
                		if (callback) {
                			var result = callback.call(fragment);
                			if (result) fragment = result;
                		}
                			
                		noscripts.push([this, fragment]);
               	});

                	//Add to dom
           		var i=0, len=noscripts.length, noscript;

		while (i<len) {
			noscript = noscripts[i];
			 $(noscript[0]).replaceWith(noscript[1]);
			i++
		}

		return this;
	};
	
})(jQuery);