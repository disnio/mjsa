domify
======

A jquery plug-in to encourage progressive enhancement of markup inside &lt;noscript&gt; tags. 
The &lt;noscript&gt; tags are replaced by document fragments which can be  processed by a callback function before being added to the dom. Read the documentation here: https://github.com/jameswestgate/domify/wiki/API-Documentation 

***Usage:***

```html
<noscript>
	<img src="/img/small-image.jpg"/>
</noscript>
```

```javascript
$(document).ready(function(){
	
	//Change image path before added to dom
	$('noscript').domify(function() {
		$(this).attr('src', '/img/large-image.jpg');
	});
})
```

***Unit tests:***

http://jameswestgate.github.io/domify/test/

