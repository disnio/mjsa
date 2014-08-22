/*
 * Usage: $(selector).iShadow({position: "fixed", referPoint: "topleft"}
 * position: can be "fixed", or "absolute"
 * referPoint: can be "topleft", "topright", "bottomleft", or "bottomright"
 */

;(function($) {

if ($.fn.removeShadow) {
	return;
}

var ieBug = $.browser.msie && parseFloat($.browser.version) < 7;

$.fn.removeShadow = function() {
	return this.each(function() {
		var shadowId = $(this).data("iShadow");
		if (shadowId) {
			$("#" + shadowId).remove();
		}
	});
};

$.fn.iShadow = function(settings) {
	if ((ieBug && !document.getElementsByTagName("select").length && !document.getElementsByTagName("object").length) ||
		(!ieBug && !document.getElementsByTagName("embed").length && !document.getElementsByTagName("object").length)) {
		return this;
	}

	var defaults = {
		position: "fixed",
		referPoint: "topleft"
	};

	// merge current settings with defaults
	var opts = $.extend(defaults, settings);

	return this.each(function() {
		var $this = $(this), shadowId = $this.data("iShadow"), $iframe, position, iWidth, iHeight;

		// Create a shadow iframe in the first time. Next time, just get it directly.
		if (shadowId) {
			$iframe = $("#" + shadowId);
		}
		else {
			shadowId = "ishadow-" + new Date().getTime();
			$this.data("iShadow", shadowId);
			$iframe = $('<iframe id="' + shadowId + '" frameborder="0" tabindex="-1" src="about:blank" style="position:' + opts.position +
					';z-index:' + parseFloat($this.css("zIndex")).toString() + ';display:block;cursor:default;opacity:0;filter:alpha(opacity=0);"></iframe>')
			.insertBefore($this);
			if (opts.position == "fixed") {
				switch (opts.referPoint) {
					case "topleft":
						$iframe.css({"top": $this.css("top"), "left": $this.css("left")});
						break;

					case "topright":
						$iframe.css({"top": $this.css("top"), "right": $this.css("right")});
						break;

					case "bottomleft":
						$iframe.css({"bottom": $this.css("bottom"), "left": $this.css("left")});
						break;

					case "bottomright":
						$iframe.css({"bottom": $this.css("bottom"), "right": $this.css("right")});
						break;

					default:
						alert("iShadow: incorrect reference point!");
						return;
				}
			}
		}

		// adjust the shadow iframe's position
		if (opts.position == "absolute") {
			position = $this.position();
			$iframe.css({"left": position.left + "px", "top": position.top + "px"});
		}

		// caculate width and height for the shadow iframe element
		iWidth = $this.width() + 
				(parseInt($this.css("padding-left")) || 0) +
				(parseInt($this.css("padding-right")) || 0) +
				(parseInt($this.css("border-left-width")) || 0) +
				(parseInt($this.css("border-right-width")) || 0);
		iHeight = $this.height() + 
				(parseInt($this.css("padding-top")) || 0) +
				(parseInt($this.css("padding-bottom")) || 0) +
				(parseInt($this.css("border-top-width")) || 0) +
				(parseInt($this.css("border-bottom-width")) || 0);

		$iframe.css({"width": iWidth + "px", "height": iHeight + "px",
					"margin-top": $this.css("margin-top"), "margin-right": $this.css("margin-right"),
					"margin-bottom": $this.css("margin-bottom"), "margin-left": $this.css("margin-left")});
	});
};})(jQuery);