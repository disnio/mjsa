;(function($) {

if ($.fn.iButton) {
	return;
}

$.fn.iButton = function(settings) {
	var defaults = {
		id: null,
		className: null,
		title: null,
		text: "",
		icon: null,
		disabled: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// elements used for generate a new jQuery objects
	var elements = [];
	for (i = 0; i < this.length; i++) {
		// if not a button, just backup it.
		if (!this.eq(i).is("input[type='button'], button")) {
			elements.push(this.eq(i)[0]);
			continue;
		}

		// if a button, do ibutton logic.
		var $this = this.eq(i),
			id = opts.id || $this.attr("id"),
			// "attrClassName" for fixing IE6/7 getAttribute("classname") bug.
			attrClassName = $this[0].attributes.classname ? $this[0].attributes.classname.value : null,
			cssClassName = $this.attr("class"),
			className = (opts.className || attrClassName || "i-button-default") +
						(cssClassName ? " " + cssClassName : ""),
			title = opts.title || $this.attr("title"),
			text = opts.text || ($this.is("button") ? $this.text() : $this.val()),
			icon = opts.icon || $this.attr("icon"),
			disabled = (opts.disabled === null ? $this.attr("disabled") : opts.disabled);

		var $button = $(
		'<div tabindex="0"' + (id ? (' id="' + id + '"') : '') +
					' class="i-button ' + className + '"' +
					(title ? (' title="' + title + '"') : '') +
					(' data-disabled="' + (disabled ? 'true' : 'false') + '">') +
			'<div class="i-button-state' + (disabled ? ' i-button-disabled' : '') + '">' +
				(icon ? ('<div class="i-button-icon ' + icon +
						(disabled ? (' ' + icon + '-disabled') : '') + '"></div>') : '') +
				'<div class="i-button-inner">' +
					'<div class="i-button-left' + (disabled ? ' i-button-left-disabled' : '') + '">' +
						'<div class="i-button-text' + (disabled ? ' i-button-text-disabled' : '') + '">' +
							text +
						'</div>' +
					'</div>' +
					'<div class="i-button-right' + (disabled ? ' i-button-right-disabled' : '') + '"></div>' +
				'</div>' +
			'</div>' +
		'</div>'
		);

		// replace the native button to ibutton object.
		$this.replaceWith($button);
		elements.push($button[0]);

		// save icon setting
		if (icon) {
			$button.data("ibutton-icon", icon);
		}

		// bind button interactive effect.
		$button
		.hover(
			function(event) {
				var $this = $(this), icon = $this.data("ibutton-icon"),
					disabled = $this.attr("data-disabled") == "true";
				if (disabled) {
					return;
				}

				$("div.i-button-state", $this).addClass("i-button-hover");
				$("div.i-button-left", $this).addClass("i-button-left-hover");
				$("div.i-button-right", $this).addClass("i-button-right-hover");
				$("div.i-button-text", $this).addClass("i-button-text-hover");
				if (icon) {
					$("div.i-button-icon", $this).addClass(icon + "-hover");
				}
			},
			function(event) {
				var $this = $(this), icon = $this.data("ibutton-icon"),
					disabled = $this.attr("data-disabled") == "true";
				if (disabled) {
					return;
				}

				$("div.i-button-state", $this).removeClass("i-button-hover");
				$("div.i-button-left", $this).removeClass("i-button-left-hover");
				$("div.i-button-right", $this).removeClass("i-button-right-hover");
				$("div.i-button-text", $this).removeClass("i-button-text-hover");
				if (icon) {
					$("div.i-button-icon", $this).removeClass(icon + "-hover");
				}
			}
		)
		.focus(function(event) {
			var $this = $(this), icon = $this.data("ibutton-icon"),
				disabled = $this.attr("data-disabled") == "true";
			if (disabled) {
				return;
			}

			$("div.i-button-state", $this).addClass("i-button-focus");
			$("div.i-button-left", $this).addClass("i-button-left-focus");
			$("div.i-button-right", $this).addClass("i-button-right-focus");
			$("div.i-button-text", $this).addClass("i-button-text-focus");
			if (icon) {
				$("div.i-button-icon", $this).addClass(icon + "-focus");
			}
		})
		.bind("blur focusout", function(event) {
			var $this = $(this), icon = $this.data("ibutton-icon"),
				disabled = $this.attr("data-disabled") == "true";
			if (disabled) {
				return;
			}

			$("div.i-button-state", $this).removeClass("i-button-focus");
			$("div.i-button-left", $this).removeClass("i-button-left-focus");
			$("div.i-button-right", $this).removeClass("i-button-right-focus");
			$("div.i-button-text", $this).removeClass("i-button-text-focus");
			if (icon) {
				$("div.i-button-icon", $this).removeClass(icon + "-focus");
			}
		})
		.mousedown(function(event) {
			var $this = $(this), icon = $this.data("ibutton-icon"),
				disabled = $this.attr("data-disabled") == "true";
			if (disabled) {
				return;
			}

			$("div.i-button-state", $this).addClass("i-button-active");
			$("div.i-button-left", $this).addClass("i-button-left-active");
			$("div.i-button-right", $this).addClass("i-button-right-active");
			$("div.i-button-text", $this).addClass("i-button-text-active");
			if (icon) {
				$("div.i-button-icon", $this).addClass(icon + "-active");
			}
		})
		.bind("i-button-mouseup", function(event) {
			var $this = $(this), icon = $this.data("ibutton-icon"),
				disabled = $this.attr("data-disabled") == "true";
			if (disabled) {
				return;
			}

			$("div.i-button-state", $this).removeClass("i-button-active");
			$("div.i-button-left", $this).removeClass("i-button-left-active");
			$("div.i-button-right", $this).removeClass("i-button-right-active");
			$("div.i-button-text", $this).removeClass("i-button-text-active");
			if (icon) {
				$("div.i-button-icon", $this).removeClass(icon + "-active");
			}
		})
		.keypress(function(event) {
			var $this = $(this), icon = $this.data("ibutton-icon"),
				disabled = $this.attr("data-disabled") == "true";
			if (disabled) {
				return;
			}

			if (event.which == "13") {
				event.preventDefault();
				$this.trigger("click");
			}
		})
		.keydown(function(event) {
			var $this = $(this), icon = $this.data("ibutton-icon"),
				disabled = $this.attr("data-disabled") == "true";
			if (disabled) {
				return;
			}

			if (event.which == "32") {
				$("div.i-button-state", $this).addClass("i-button-active");
				$("div.i-button-left", $this).addClass("i-button-left-active");
				$("div.i-button-right", $this).addClass("i-button-right-active");
				$("div.i-button-text", $this).addClass("i-button-text-active");
				if (icon) {
					$("div.i-button-icon", $this).addClass(icon + "-active");
				}
			}
		})
		.keyup(function(event) {
			var $this = $(this), icon = $this.data("ibutton-icon"),
				disabled = $this.attr("data-disabled") == "true";
			if (disabled) {
				return;
			}

			if (event.which == "32") {
				$("div.i-button-state", $this).removeClass("i-button-active");
				$("div.i-button-left", $this).removeClass("i-button-left-active");
				$("div.i-button-right", $this).removeClass("i-button-right-active");
				$("div.i-button-text", $this).removeClass("i-button-text-active");
				if (icon) {
					$("div.i-button-icon", $this).removeClass(icon + "-active");
				}
				$this.trigger("click");
			}
		})
		// unselected trick
		.bind("selectstart", function() {
			return false;
		})
		.find("*").attr("unselectable", "on");
	}

	// generate a new jQuery objects.
	var $elements = $(elements);

	// inject jQuery click event to implement disabled logic
	var _click = $elements.click;
	$elements.click = function(fn) {
		_click.call(this, function(event) {
			var $this = $(this);
			if ($this.attr("data-disabled") == "false") {
				fn.call(this, event);
			}
		});

		return this;
	};

	// iButton text method.
	$elements.text = function(value) {
		var $iButtons = this.filter("div.i-button");
		if ($iButtons.length && typeof value == "undefined") {
			return $("div.i-button-text", $iButtons.eq(0)).text();
		}
		else if ($iButtons.length && typeof value != "undefined") {
			$("div.i-button-text", $iButtons).text(value + "");
		}

		return this;
	};

	// iButton icon method.
	$elements.icon = function(value) {
		var $iButtons = this.filter("div.i-button");
		if (typeof value == "undefined" && $iButtons.length) {
			return $iButtons.eq(0).data("ibutton-icon");
		}
		else {
			for (var i = 0; i < $iButtons.length; i++) {
				var $button = $iButtons.eq(i),
					$icon = $("div.i-button-icon", $button),
					icon = $button.data("ibutton-icon"),
					disabled = $button.attr("data-disabled") == "true";

				// set or remove icon
				if (value) {
					if ($icon.length) {
						$icon.removeClass(icon + " " + icon + "-hover " + icon + "-focus " + icon + "-active " + icon + "-disabled");
					}
					else {
						$icon = $('<div class="i-button-icon"></div>');
						$("div.i-button-inner", $button).before($icon);
					}

					$icon.addClass(value + (disabled ? (" " + value + "-disabled") : ""));
					if (!disabled) {
						var $state = $("div.i-button-state", $button),
							hovered = $state.hasClass("i-button-hover"),
							focused = $state.hasClass("i-button-focus"),
							actived = $state.hasClass("i-button-active");

						$icon.addClass((hovered ? (value + "-hover") : "") +
									   (focused ? (" " + value + "-focus") : "") +
									   (actived ? (" " + value + "-active") : ""));
					}
					$button.data("ibutton-icon", value + "");
				}
				else {
					if ($icon.length) {
						$icon.remove();
						$button.removeData("ibutton-icon");
					}
				}
			}
		}

		return this;
	};


	// iButton disabled method.
	$elements.disabled = function(value) {
		var $iButtons = this.filter("div.i-button");
		if (typeof value == "undefined" && $iButtons.length) {
			return $iButtons.eq(0).attr("data-disabled") == "true";
		}
		else {
			for (var i = 0; i < $iButtons.length; i++) {
				var $button = $iButtons.eq(i), icon = $button.data("ibutton-icon");
				if (value) {
					$("div.i-button-state", $button)
						.removeClass("i-button-hover i-button-focus i-button-active")
						.addClass("i-button-disabled");
					$("div.i-button-left", $button)
						.removeClass("i-button-left-hover i-button-left-focus i-button-left-active")
						.addClass("i-button-left-disabled");
					$("div.i-button-right", $button)
						.removeClass("i-button-right-hover i-button-right-focus i-button-right-active")
						.addClass("i-button-right-disabled");
					$("div.i-button-text", $button)
						.removeClass("i-button-text-hover i-button-text-focus i-button-text-active")
						.addClass("i-button-text-disabled");
					if (icon) {
						$("div.i-button-icon", $button)
							.removeClass(icon + "-hover " + icon + "-focus " + icon + "-active")
							.addClass(icon + "-disabled");
					}
					$button.attr("data-disabled", "true");
				}
				else {
					$("div.i-button-state", $button).removeClass("i-button-disabled");
					$("div.i-button-left", $button).removeClass("i-button-left-disabled");
					$("div.i-button-right", $button).removeClass("i-button-right-disabled");
					$("div.i-button-text", $button).removeClass("i-button-text-disabled");
					if (icon) {
						$("div.i-button-icon", $button).removeClass(icon + "-disabled");
					}
					$button.attr("data-disabled", "false");
				}
			}
		}

		return this;
	};

	// return the generate new jQuery objects.
	return $elements;
};

// tricky: document to handle mouse up event
$(document).mouseup(function() {
	$("div.i-button").trigger("i-button-mouseup");
});

})(jQuery);
