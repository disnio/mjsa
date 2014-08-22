/* 
	TODO: can be dragged, DOM-Drag
*/

;(function($) {

// if already load dialog, return directly
if ($.dialog) {
	return;
}

var $window = $(window), $document = $(document);
var ieBug = $.browser.msie && parseFloat($.browser.version) < 7;

// jQuery doesn't support a is string judgement, so I made it by myself.
function isString(obj) {
	return typeof obj == "string" || Object.prototype.toString.call(obj) === "[object String]";
}

// dialog list to manage the dialogs.
var dialogList = [];
dialogList.add = function($dialog) {
	this.push($dialog);
	return $dialog;
};

dialogList.remove = function($dialog) {
	var flag;
	for (var i = 0; i < this.length; i++) {
		if (this[i] == $dialog) {
			flag = true;
		}
		if (flag) {
			this[i] = this[i + 1];
		}
	}

	if (flag) {
		this.length--;
	}

	return $dialog;
};

// manage the window resize event.
var resizeTimer;
$window.resize(function() {
	window.clearTimeout(resizeTimer);
	resizeTimer = window.setTimeout(function() {
		for (var i = 0; i < dialogList.length; i++) {
			dialogList[i].adjust(false);
		}
	}, 100);
});

// manage the window scroll event for ie6.
if (ieBug) {
var scrollTimer;
$window.scroll(function () {
	for (var i = 0; i < dialogList.length; i++) {
		dialogList[i].ieFixedHide();
	}

	window.clearTimeout(scrollTimer);
	scrollTimer = window.setTimeout(function() {
		for (var i = 0; i < dialogList.length; i++) {
			dialogList[i].ieFixedPos();
		}
	}, 400);
});
}

// handle escape key to close dialog one by one.
$document.keydown(function(event) {
	if (dialogList.length && event.keyCode == 27) {
		dialogList[dialogList.length - 1].close("cancel", event);
	}
});

// the basic dialog plugin
$.dialog = function(settings) {
	var initializing = true;
	var defaults = {
		id: "",
		className: "",
		tip: false,
		direction: "top",
		title: "",
		content: "",
		labClose: null,
		titleClose: "关闭",
		btns: [],
		defaultBtn: "",
		labAccept: "确定",
		labCancel: "取消",
		top: null,
		left: null,
		refer: null,
		fixed: true,
		scrollIntoView: true,
		contentWidth: null,
		contentHeight: null,
		contentBtnHelp: false,
		modal: true,
		onLoad: null,
		onBeforeAccept: null,
		onAccept: null,
		onBeforeCancel: null,
		onCancel: null,
		onBeforeClose: null,
		onClose: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);
	opts.top  = parseInt(opts.top);
	opts.left = parseInt(opts.left);
	opts.contentWidth  = parseInt(opts.contentWidth);
	opts.contentHeight = parseInt(opts.contentHeight);

	// build button html template.
	var mapBtns = {
		"accept": '<button class="dialog-button-accept">' + opts.labAccept + '</button>',
		"cancel": '<button class="dialog-button-cancel">' + opts.labCancel + '</button>'
	};
	var templateBtns = "";
	if (opts.btns.length) {
		templateBtns += '<div class="dialog-button-container">';
		for (var i = 0 ; i < opts.btns.length; i++) {
			templateBtns += mapBtns[opts.btns[i]];
		}
		templateBtns += '</div>';
	}

	// build mask html template.
	var templateMask =
		'<div' + (opts.id ? (' id="' + opts.id + '-mask"') : '') + ' class="jquery-dialog-mask ' +
				(!$("div.jquery-dialog-mask").length ? "jquery-dialog-mask-color" : "jquery-dialog-mask-transparent") +
				(opts.className ? (' ' + opts.className + '-mask"') : '"') + '></div>';

	// build dialog html template.
	var templateDialog =
		'<div style="top: -10000px; left: -10000px;"' + (opts.id ? (' id="' + opts.id + '"') : '') + ' class="jquery-dialog ' +
				(!opts.fixed || ieBug ? 'dialog-outer-absolute' : 'dialog-outer-fixed') +
				(opts.tip ? ' jquery-tip' : '') + (opts.className ? (' ' + opts.className + '"') : '"') + '>' +
			(opts.tip ? '<div class="dialog-tip-arrow dialog-tip-arrow-' + opts.direction.toLowerCase() + '"></div>' : '') +
			'<div class="dialog-top-container">' +
				'<div class="dialog-top-left-corner"></div>' +
				'<div class="dialog-top-border"></div>' +
				'<div class="dialog-top-right-corner"></div>' +
			'</div>' +

			'<div class="dialog-middle-container">' +
				'<div class="dialog-left-border"></div>' +

				'<div class="dialog-inner-container">' +
					'<div class="dialog-title-container">' +
						'<div class="dialog-title">' + opts.title + '</div>' +
						'<div tabindex="0" class="dialog-button-close" title="' + opts.titleClose + '">' +
							(opts.labClose || '') +
						'</div>' +
					'</div>' +

					'<div class="dialog-content-container"></div>' + templateBtns +
				'</div>' +

				'<div class="dialog-right-border"></div>' +
			'</div>' +

			'<div class="dialog-bottom-container">' +
				'<div class="dialog-bottom-left-corner"></div>' +
				'<div class="dialog-bottom-border"></div>' +
				'<div class="dialog-bottom-right-corner"></div>' +
			'</div>' +
		'</div>';

	// append mask and dialog into document.
	var $body = $(document.body), $dialogInserter = $("#jquery-dialog-inserter");
	if (!$dialogInserter.length) {
		$dialogInserter = $('<div id="jquery-dialog-inserter"></div>');
		$dialogInserter.prependTo($body);
	}

	var $dialog = dialogList.add($(templateDialog));
	$dialog.data("jquery-dialog", $dialog);
	if (opts.modal) {
		$dialog.data("jquery-dialog-mask", $(templateMask).insertBefore($dialogInserter));
	}

	// set dom content into dialog
	var isNode = opts.content && !isString(opts.content) && (opts.content.parentNode || opts.content.jquery);
	if (isNode) {
		var $node = $(opts.content);
		var data = {
			el: $node[0],
			html: $node.html(),
			parent: $node.parent()[0],
			display: $node.css("display"),
			position: $node.css("position")
		};
		if (data.parent) {
			$node.remove();
		}

		$dialog.data("dialog.history", data);
	}

	$("div.dialog-content-container", $dialog).append(isNode ? $(opts.content).eq(0) : opts.content.toString());
	$dialog.insertBefore($dialogInserter);
	if (isNode) {
		$(opts.content).show();
	}

	// this method can remove dialog without any callback.
	$dialog.destroy = function() {
		// remove mask from dom
		dialogList.remove(this);
		if (opts.modal) {
			this.data("jquery-dialog-mask").removeShadow().remove();
		}

		// restore content node.
		var data = this.data("dialog.history");
		if (data && data.el) {
			var $node = $(data.el).css({"display": data.display, "position": data.position});
			if (data.parent) {
				$node.html(data.html).appendTo(data.parent);
			}
			this.removeData("dialog.history");
		}

		// remove dialog from dom.
		this.remove();
	};

	// add dialog close method.
	$dialog.close = function(state, event) {
		event = $.extend(event, {"state": state});
		if ($.isFunction(opts.onBeforeClose) && opts.onBeforeClose.call($dialog, event) === false) {
			return false;
		}

		// call destroy method
		this.destroy();

		if ($.isFunction(opts.onClose)) {
			opts.onClose(event);
		}

		if (state == "accept") {
			if ($.isFunction(opts.onAccept)) {
				opts.onAccept(event);
			}
		}
		else if (state == "cancel") {
			if ($.isFunction(opts.onCancel)) {
				opts.onCancel(event);
			}
		}

		return true;
	};

	// add adjust dialog size method.
	$dialog.adjust = function() {
		// adjust mask size
		var $mask = this.data("jquery-dialog-mask");
		if ($mask) {
			if (ieBug) {
				$mask.css("position", "absolute")
				.height(Math.max($body.boxHeight(), $window.height()))
				.width(Math.max($body.boxWidth(), $window.width()))
				.iShadow({position: "absolute", referPoint: "topleft"});
			}
			else {
				$mask
				.iShadow({position: "fixed", referPoint: "topleft"});
			}
		}

		if ((typeof arguments[0] == "undefined") || initializing) {
			var $contentContainer = $("div.dialog-content-container", this);

			if (!initializing) {
				$contentContainer.css({height: "auto"});
			}
			var $leftBorder = $("div.dialog-left-border", this);
			var $rightBorder = $("div.dialog-right-border", this);
			var $topBorder = $("div.dialog-top-border", this);
			var $bottomBorder = $("div.dialog-bottom-border", this);

			var $topLeftCorner = $("div.dialog-top-left-corner", this);
			var $topRightCorner = $("div.dialog-top-right-corner", this);
			var $bottomLeftCorner = $("div.dialog-bottom-left-corner", this);
			var $bottomRightCorner = $("div.dialog-bottom-right-corner", this);

			var $topContainer = $("div.dialog-top-container", this);
			var $midderContainer = $("div.dialog-middle-container", this);
			var $bottomContainer = $("div.dialog-bottom-container", this);

			var $innerContainer = $("div.dialog-inner-container", this);
			var $titleContainer = $("div.dialog-title-container", this);
			var $title = $("div.dialog-title", this);
			var $buttonClose = $("div.dialog-button-close", this);
			var $buttonContainer = $("div.dialog-button-container", this);

			// give the content a width or height define.
			var contentWidth = Math.max(
					(opts.contentWidth > 0 ? opts.contentWidth : Math.min($contentContainer.boxWidth(), $window.width() - $.scrollbarWidth())),
					opts.btns.length * 150
				);
			$contentContainer.boxWidth(contentWidth);
			var contentHeight = opts.contentHeight > 0 ? opts.contentHeight : $contentContainer.boxHeight();
			$contentContainer.boxHeight(contentHeight);
			// translate buttons inside content to iButton default style.
			if (opts.contentBtnHelp && $.fn.iButton) {
				$("input[type='button'], button", $contentContainer).iButton();
			}

			// set the title-container and button-container are sync with content width
			var contentBoxWidth = $contentContainer.boxWidth();
			$titleContainer.boxWidth(contentBoxWidth);
			$buttonContainer.boxWidth(contentBoxWidth);

			// adjust title and button layout.
			$title.boxWidth($titleContainer.width() - $buttonClose.boxWidth());
			if (initializing && $.fn.iButton) {
				$("input[type='button'], button", $buttonContainer).iButton();
			}

			// set the top-border and bottom-border width.
			var innerContainerBoxWidth = contentBoxWidth + $innerContainer.box("lr");
			$innerContainer.boxWidth(innerContainerBoxWidth);
			$topBorder.boxWidth(innerContainerBoxWidth);
			$bottomBorder.boxWidth(innerContainerBoxWidth);

			// set the left-border and right-border height.
			var innerContainerBoxHeight = $innerContainer.box("tb") + $contentContainer.boxHeight() +
						$titleContainer.boxHeight() + $buttonContainer.boxHeight();
			$leftBorder.boxHeight(innerContainerBoxHeight);
			$rightBorder.boxHeight(innerContainerBoxHeight);

			// give the top-c, middle-c and bottom-c a fixed width and height.
			$topContainer.width($topLeftCorner.boxWidth() + $topBorder.boxWidth() + $topRightCorner.boxWidth());
			$bottomContainer.width($bottomLeftCorner.boxWidth() + $bottomBorder.boxWidth() + $bottomRightCorner.boxWidth());
			$midderContainer
				.height(innerContainerBoxHeight)
				.width($leftBorder.boxWidth() + $innerContainer.boxWidth() + $rightBorder.boxWidth());

			// give the dialog a fixed width
			this.width($topContainer.boxWidth());
		}


		// calculate the center top and center left position
		if (initializing || opts.fixed) {
			var centerTop  = Math.round(($window.height() - this.boxHeight()) / 2),
				centerLeft = Math.round(($window.width()  - this.boxWidth())  / 2);
		}

		// calculate the dialog top and left position.
		var top = null, left = null;
		// ie6 fixed position.
		if (ieBug && opts.fixed) {
			top  = $window.scrollTop()  + (isNaN(opts.top)  ? centerTop  : opts.top );
			left = $window.scrollLeft() + (isNaN(opts.left) ? centerLeft : opts.left);
		}
		// for unfixed refer position.
		else if (!opts.fixed && opts.refer) {
			var offset = $(opts.refer).offset();
			top  = offset.top  + (opts.top  || 0);
			left = offset.left + (opts.left || 0);
		}
		// for initialized unfixed dialog and always for fixed dialog
		else if (initializing || opts.fixed) {
			if (!opts.fixed) {
				centerTop  = $window.scrollTop()  + centerTop;
				centerLeft = $window.scrollLeft() + centerLeft;
			}
			top  = isNaN(opts.top)  ? centerTop  : opts.top;
			left = isNaN(opts.left) ? centerLeft : opts.left;
		}
		if (top !== null) {
			this.css({"top": top + "px", "left": left + "px"});
		}

		// scroll into view control.
		if (initializing && !opts.fixed && opts.scrollIntoView) {
			this.scrollIntoView();
		}
		// give default button focus
		if (initializing) {
			if (opts.defaultBtn == "accept") {
				$(".dialog-button-accept", $buttonContainer).eq(0).focus();
			}
			else if (opts.defaultBtn == "cancel") {
				$(".dialog-button-cancel", $buttonContainer).eq(0).focus();
			}
		}

		return this;
	};

	// scroll dialog into view method.
	$dialog.scrollIntoView = function() {
		var pos = this.position(), scrollTop = $window.scrollTop(), scrollLeft =  $window.scrollLeft();

		if (((pos.top  < scrollTop)  || (pos.top  > $window.height() + scrollTop)) ||
			((pos.left < scrollLeft) || (pos.left > $window.width()  + scrollLeft))) {
			this[0].scrollIntoView();
		}
	};

	// ie fixed top method.
	$dialog.ieFixedPos = function() {
		if (ieBug && opts.fixed) {
			var top  = isNaN(opts.top)  ? Math.round(($window.height() - this.boxHeight()) / 2) : opts.top;
			var left = isNaN(opts.left) ? Math.round(($window.width()  - this.boxWidth())  / 2) : opts.left;
			this.css({"top": top + $window.scrollTop() + "px",
					  "left": left + $window.scrollLeft() + "px"});
		}

		return this;
	};

	// ie fixed hide method
	$dialog.ieFixedHide = function() {
		if (ieBug && opts.fixed) {
			this.css({"top": "-10000px", "left": "-10000px"});
		}

		return this;
	}

	/*
	 init position and size for dialog.
	*/
	$dialog.adjust(false);

	/*
	 add event handlers for dialog.
	*/
	$dialog
	.mouseover(function(event) {
		var $target = $(event.target);
		var fromElement = event.fromElement || event.relatedTarget;

		if ($target.is("div.dialog-button-close")) {
			$target.addClass("dialog-button-close-hover");
		}
	})
	.mouseout(function(event) {
		var $target = $(event.target);
		var toElement = event.toElement || event.relatedTarget;

		if ($target.is("div.dialog-button-close")) {
			$target.removeClass("dialog-button-close-hover");
		}
	})
	.click(function(event) {
		var $target = $(event.target),
			$btnAccept = $target.closest(".dialog-button-accept"),
			$btnCancel = $target.closest(".dialog-button-cancel");
		if ($btnAccept.length && $btnAccept.attr("data-disabled") != "true") {
			if ($.isFunction(opts.onBeforeAccept) &&
				opts.onBeforeAccept.call($dialog, $.extend(event, {"state": "accept"})) === false) {
				return;
			}

			$dialog.trigger("accept");
		}
		else if ($btnCancel.length && $btnCancel.attr("data-disabled") != "true") {
			if ($.isFunction(opts.onBeforeCancel) &&
				opts.onBeforeCancel.call($dialog, $.extend(event, {"state": "cancel"})) === false) {
				return;
			}

			$dialog.trigger("cancel");
		}
		else if ($target.is("div.dialog-button-close")) {
			$dialog.close("cancel");
		}
	})
	.bind("accept", function() {
		$dialog.close("accept");
	})
	.bind("cancel", function() {
		$dialog.close("cancel");
	});


	if ($.isFunction(opts.onLoad)) {
		opts.onLoad.call($dialog);
	}
	initializing = false;
	return $dialog;
};


/* the jquery inform dialog */
$.inform = function(settings) {
	var defaults = {
		icon: "",
		title: "",
		content: "",
		delay: 2000,
		easyClose: true,
		onClose: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// for icon class define.
	var content = $.isPlainObject(settings) ? opts.content : settings;
	if (opts.icon) {
		content = '<div class="' + opts.icon + '"></div><div class="dialog-content">' + content + '</div>';
	}

	var $inform = $.dialog({
		className: "jquery-inform",
		title: opts.title,
		content: content,
		onClose: opts.onClose
	});

	// bind close handler.
	var timer;
	if (opts.delay > 0) {
		timer = window.setTimeout(close, opts.delay);
	}
	if (opts.easyClose) {
		$document.bind("mouseup", close);
	}

	// close by timeout or click event.
	function close() {
		try{ $inform.close(); }catch(e){};
		window.clearTimeout(timer);
		if (opts.easyClose) {
			$document.unbind("mouseup", close);
		}
	};

	return $inform;
};


/* the jquery confirm dialog */
$.alert = function(settings) {
	var defaults = {
		icon: "",
		title: "",
		content: "",
		labClose: "确定",
		onClose: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// for icon class define.
	var content = $.isPlainObject(settings) ? opts.content : settings;
	if (opts.icon) {
		content = '<div class="' + opts.icon + '"></div><div class="dialog-content">' + content + '</div>';
	}

	return $.dialog({
		className: "jquery-alert",
		btns: ["accept"],
		defaultBtn: "accept",
		labAccept: opts.labClose,
		title: opts.title,
		content: content,
		onClose: opts.onClose
	});
};

/* the jquery confirm dialog */
$.confirm = function(settings) {
	var defaults = {
		icon: "",
		title: "",
		content: "",
		labConfirm: "确定",
		labCancel: "取消",
		defaultBtn: "accept",
		onConfirm: null,
		onCancel: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// for icon class define.
	var content = $.isPlainObject(settings) ? opts.content : settings;
	if (opts.icon) {
		content = '<div class="' + opts.icon + '"></div><div class="dialog-content">' + content + '</div>';
	}

	return $.dialog({
		className: "jquery-confirm",
		btns: ["accept", "cancel"],
		defaultBtn: opts.defaultBtn,
		labAccept: opts.labConfirm,
		labCancel: opts.labCancel,
		title: opts.title,
		content: content,
		onAccept: opts.onConfirm,
		onCancel: opts.onCancel
	});
};



/*
 * jQuery tip plugins
 */

// wrap the browser default getClientRects method to cross browser function.
function getClientRects(target) {

	// create new wrapped rect objects.
	var rects = target.getClientRects();
	var newRects = [{"top":    rects[0].top,    "right": rects[0].right,
				     "bottom": rects[0].bottom, "left":  rects[0].left}];
	for (var i = 1, j = 0; i < rects.length; i++) {
		if (rects[i]) {
			// unit rects for IE6/IE7
			if ((newRects[j].right == rects[i].left &&
				newRects[j].bottom - newRects[j].top > Math.abs(newRects[j].top - rects[i].top)) ||
				(newRects[j].left == newRects[j].right)) {
				newRects[j].top    = Math.min(newRects[j].top,    rects[i].top);
				newRects[j].right  = Math.max(newRects[j].right,  rects[i].right);
				newRects[j].bottom = Math.max(newRects[j].bottom, rects[i].bottom);
				newRects[j].left   = Math.min(newRects[j].left,   rects[i].left);
			}
			else {
				newRects.push({"top":    rects[i].top,    "right": rects[i].right,
							   "bottom": rects[i].bottom, "left":  rects[i].left});
				j++;
			}
		}
	}

	// convert float position value to integer value for Firefox
	for (var i = 0; i < newRects.length; i++) {
		newRects[i].top    = Math.round(newRects[i].top);
		newRects[i].right  = Math.round(newRects[i].right);
		newRects[i].bottom = Math.round(newRects[i].bottom);
		newRects[i].left   = Math.round(newRects[i].left);
	}

	return newRects;
}

/*
 * Extend a custom hover rect event plugin.
 * Because jQuery hover event doesn't work well for jQuery tip.
 */
$.fn.hoverrect = function(mouseenter, mouseleave) {
	var pos = {x: 0, y: 0}, lastRect = {top: null, right: null, bottom: null, left: null};

	return this
	.mousemove(function(event) {
		if (pos.x == event.clientX && pos.y == event.clientY) {
			return;
		}

		pos.x = event.clientX;
		pos.y = event.clientY;

		// check rect by current mouse position.
		var rects = getClientRects(this), rect;
		for (var i = 0; i < rects.length; i++) {
			if (rects[i].left <= pos.x && rects[i].right  >= pos.x &&
				rects[i].top  <= pos.y && rects[i].bottom >= pos.y) {
				rect = rects[i];
				break;
			}
		}

		// rect which unders current mouse position has changed.
		if (rect && (lastRect.top !== rect.top || lastRect.right !== rect.right ||
					lastRect.bottom !== rect.bottom || lastRect.left !== rect.left)) {

			// mouse leave the last rect.
			if (lastRect.top !== null) {
				event.clientRect = lastRect;
				event.type = "mouseleaverect";
				if ($.isFunction(mouseleave)) {
					mouseleave.call(this, event);
				}
			}

			// mouse enter a new rect.
			lastRect = rect;
			event.clientRect = rect;
			event.type = "mouseenterrect";
			if ($.isFunction(mouseenter)) {
				mouseenter.call(this, event);
			}
		}
	})
	.mouseleave(function(event) {
		// mouse leave the last rect.
		event.clientRect = lastRect;
		event.type = "mouseleaverect";
		lastRect = {top: null, right: null, bottom: null, left: null};
		if ($.isFunction(mouseleave)) {
			mouseleave.call(this, event);
		}
	});
};


// build the tip arrow class string
function buildArrowClass(direction) {
	return "dialog-tip-arrow dialog-tip-arrow-" + direction;
}


// calculate the tip location
function calcTipPos(align, referRect, tipRect, offset) {
	var top = 0, left = 0;

	if (align == "top") {
		top  = Math.round(referRect.top - tipRect.height - offset.y);
		left = Math.round(referRect.left + (referRect.width - tipRect.width) / 2 + offset.x);
	}
	else if (align == "bottom") {
		top  = Math.round(referRect.top + referRect.height + offset.y);
		left = Math.round(referRect.left + (referRect.width - tipRect.width) / 2 + offset.x);
	}
	else if (align == "left") {
		top  = Math.round(referRect.top + (referRect.height - tipRect.height) / 2 + offset.y);
		left = Math.round(referRect.left - tipRect.width - offset.x);
	}
	else if (align == "right") {
		top  = Math.round(referRect.top + (referRect.height - tipRect.height) / 2 + offset.y);
		left = Math.round(referRect.left + referRect.width + offset.x);
	}

	return {top: top, left: left};
}


// alignTipToRect shared with $.tip() and $.fn.tip().
function alignTipToRect($tip, rect, opts) {
	// get below help data info.
	var docElem = document.documentElement, body = document.body, $body = $(body);
	var winHeight = $window.height();
	var winWidth  = $window.width();
	var scrollTop  = window.pageYOffset || docElem.scrollTop;
	var scrollLeft = window.pageXOffset || docElem.scrollLeft;
	var clientTop  = docElem.clientTop  || body.clientTop  || 0;
	var clientLeft = docElem.clientLeft || body.clientLeft || 0;

	// fill the referRect object.
	var referRect = {
		top: Math.round(rect.top   + scrollTop  - clientTop),
		left: Math.round(rect.left + scrollLeft - clientLeft),
		width: Math.round(rect.right - rect.left),
		height: Math.round(rect.bottom - rect.top)
	};

	// fill the tipRect object.
	var tipRect = {
		width: Math.round($tip.width()),
		height: Math.round($tip.height())
	};

	// fill the offset object.
	var offset = {x: opts.offsetX, y: opts.offsetY};

	// calculate the tip position by rectRect, tipRect and offset.
	var position = calcTipPos(opts.align, referRect, tipRect, offset);

	// get the scope top, left, bottom, right
	var scopeTop    = (opts.scope === "viewport" ? scrollTop  : 0) + 1;
	var scopeLeft   = (opts.scope === "viewport" ? scrollLeft : 0) + 1;
	var scopeBottom = (opts.scope === "viewport" ? winHeight + scrollTop  : Math.max($body.boxHeight(), winHeight)) - 1;
	var scopeRight  = (opts.scope === "viewport" ? winWidth  + scrollLeft : Math.max($body.boxWidth(),  winWidth))  - 1;

	// reset arrow class by align option.
	var $arrow = $tip.find(".dialog-tip-arrow"), arrow = $arrow[0];
	arrow.className = buildArrowClass(alignMap[opts.align]);

	// the tip outside scope top, align to bottom
	if (opts.align == "top" && position.top < scopeTop) {
		position = calcTipPos("bottom", referRect, tipRect, offset);
		arrow.className = buildArrowClass("top");
	}
	// the tip outside scope bottom, align to top
	else if (opts.align == "bottom" && (position.top + tipRect.height) > scopeBottom) {
		position = calcTipPos("top", referRect, tipRect, offset);
		arrow.className = buildArrowClass("bottom");
	}
	// the tip outside scope left, align to right
	else if (opts.align == "left" && position.left < scopeLeft) {
		position = calcTipPos("right", referRect, tipRect, offset);
		arrow.className = buildArrowClass("left");
	}
	// the tip outside scope right, align to left
	else if (opts.align == "right" && (position.left + tipRect.width) > scopeRight) {
		position = calcTipPos("left", referRect, tipRect, offset);
		arrow.className = buildArrowClass("right");
	}

	// limit the tip and tip-arrow position.
	var minTop  = scrollTop  + 1,
		minLeft = scrollLeft + 1,
		maxTop  = winHeight  + scrollTop  - tipRect.height - 1,
		maxLeft = winWidth   + scrollLeft - tipRect.width  - 1,
		tipTop  = position.top,
		tipLeft = position.left;

	// set the tip arrow position.
	if (opts.align == "top" || opts.align == "bottom") {
		tipLeft = Math.max(Math.min(tipLeft, maxLeft), minLeft);
		$arrow.css({"left": Math.round((tipRect.width - $arrow.width()) / 2) - (tipLeft - position.left) + "px"});
	}
	else if (opts.align == "left" || opts.align == "right") {
		tipTop = Math.max(Math.min(tipTop, maxTop), minTop);
		$arrow.css({"top": Math.round((tipRect.height - $arrow.height()) / 2) - (tipTop - position.top) + "px"});
	}

	// set the tip dialog position.
	$tip.css({"top": tipTop + "px", "left": tipLeft + "px"});
}


// setTipContent shared with $.tip() and $.fn.tip().
function setTipContent($tip, content) {
	var top  = $tip.css("top");
	var left = $tip.css("left");
	$tip.css({"top": "-10000px", "left": "-10000px"}).show();
	$tip.find(".dialog-content-container").html(content).css("width", "auto");
	$tip.find(".dialog-inner-container").css("width", "auto");
	$tip.find(".dialog-middle-container").css("width", "auto");
	$tip.css("width", "auto");
	$tip.adjust();
	$tip.css({"top": top, "left": left});
}


// $.tip(): jQuery tip plugin.
var alignMap = {"top": "bottom", "right": "left", "bottom": "top", "left": "right"};
$.tip = function(settings) {
	var defaults = {
		id: "",
		className: "",
		title: "",
		content: "",
		labClose: null,
		titleClose: "关闭",
		btns: [],
		defaultBtn: "",
		labAccept: "确定",
		labCancel: "取消",
		contentWidth: null,
		contentHeight: null,
		contentBtnHelp: false,
		modal: false,
		onLoad: null,
		onBeforeAccept: null,
		onAccept: null,
		onBeforeCancel: null,
		onCancel: null,
		onBeforeClose: null,
		onClose: null
	};

	var opts = $.extend(defaults, settings);

	// create the tip widget.
	var $tip = $.dialog({
		tip: true,
		fixed: false,
		scrollIntoView: false,
		top: -10000,
		left: -10000,
		id: opts.id,
		className: opts.className,
		title: opts.title,
		content: opts.content,
		labClose: opts.labClose,
		titleClose: opts.titleClose,
		btns: opts.btns,
		defaultBtn: opts.defaultBtn,
		labAccept: opts.labAccept,
		labCancel: opts.labCancel,
		contentWidth: opts.contentWidth,
		contentHeight: opts.contentHeight,
		contentBtnHelp: opts.contentBtnHelp,
		modal: opts.modal,
		onLoad: opts.onLoad,
		onBeforeAccept: opts.onBeforeAccept,
		onAccept: opts.onAccept,
		onBeforeCancel: opts.onBeforeCancel,
		onCancel: opts.onCancel,
		onBeforeClose: opts.onBeforeClose,
		onClose: opts.onClose
	})
	.hide();


	/*
	 * tip.align(): adjust tip position.
	 */
	$tip.align = function(settings) {
		if (!this.is(":visible")) {
			return this;
		}

		// fill the options object.
		var opts;
		if (typeof settings === "undefined") {
			opts = this.data("tip-settings");
		}
		else {
			var defaults = {
				scope: "viewport",
				align: "bottom",
				refer: null,
				referRect: null,
				offsetX: 0,
				offsetY: 0
			};

			// align setting.
			opts = $.extend(defaults, settings);

			// tip align map object.
			opts.align = opts.align.toLowerCase();
			if (!alignMap[opts.align]) {
				opts.align = defaults.align;
			}

			// save current setting to tip's data.
			this.data("tip-settings", opts);
		}

		// align the tip.
		alignTipToRect(this, opts.referRect ? opts.referRect : getClientRects($(opts.refer)[0])[0], opts);

		return this;
	};


	/*
	 * tip.content(): get or set content of tip widget.
	 */
	$tip.content = function(content) {
		if (typeof content == "undefined") {
			return this.find(".dialog-content-container").html();
		}
		else {
			var isVisible = this.is(":visible");

			setTipContent(this, content);

			// align tip position or restore hide states.
			if (!isVisible) {
				this.hide();
			}
			return this;
		}
	};

	return $tip;
};


/*
 * $(selector).tip: jQuery tip plugin.
 */
$.fn.tip = function(settings) {
	var defaults = {
		hover: true,
		enterable: false,
		enterableDelay: 100,
		show: null,
		hide: null,
		scope: "viewport",
		align: "bottom",
		offsetX: 0,
		offsetY: 0,
		id: "",
		className: "",
		content: "",
		contentWidth: null,
		contentHeight: null
	};

	// give settings to UI elements
	var opts = $.extend(defaults, settings);

	// tip align map object.
	opts.align = opts.align.toLowerCase();
	if (!alignMap[opts.align]) {
		opts.align = defaults.align;
	}

	// handler code.
	return this.each(function() {

		// initialize the tip widget.
		var $refer = $(this),
			$tip = $refer.data("tip");
		if ($tip) {
			return;
		}

		// create the tip widget and save it to its data "tip".
		$tip = $.dialog({
			tip: true,
			modal: false,
			fixed: false,
			top: -10000,
			left: -10000,
			id: opts.id,
			className: opts.className,
			content: opts.content,
			contentWidth: opts.contentWidth,
			contentHeight: opts.contentHeight
		})
		.hide();
		$refer.data("tip", $tip);

		// auto hover show up.
		if (opts.hover) {

			// tip hide and show event handler.
			function hideTip(event) {
				if ($.isFunction(opts.hide)) {
					opts.hide.call($tip, event);
				}
				else {
					$tip.hide();
				}
			}

			function showTip(event) {
				$tip.data("tip-refer-rect", event.clientRect);
				if ($.isFunction(opts.show)) {
					opts.show.call($tip, event);
				}
				else {
					$tip.show();
				}
				$tip.data("tip-refer-rect", null);
			}

			// timer for tip enterable feature.
			var timer = null;
			function cancelledHideTip() {
				if (timer) {
					window.clearTimeout(timer);
					timer = null;
					return true;
				}
				else {
					return false;
				}
			}
			function delayedHideTip(event) {
				timer = window.setTimeout(function() {
					timer = null;
					hideTip(event);
				}, opts.enterableDelay);
			}

			// hover to show the tip.
			if (opts.enterable) {
				$tip.hover(cancelledHideTip, delayedHideTip);
			}

			var lastRect;
			$refer.hoverrect(
				function(event) {
					var rect = event.clientRect;

					// Igonre hidden only for the same rect.
					if (!cancelledHideTip() && lastRect &&
							lastRect.top == rect.top && lastRect.right == rect.right &&
							lastRect.bottom == rect.bottom && lastRect.left == rect.left) {
						showTip(event);
					}
					else {
						cancelledHideTip();
						showTip(event);
					}
				},
				function(event) {
					lastRect = event.clientRect;

					if (opts.enterable) {
						delayedHideTip(event);
					}
					else {
						hideTip(event);
					}
				}
			);
		}


		/*
		 * fn.tip.algin(): adjust tip position.
		 */
		$tip.align = function () {
			if (!this.is(":visible")) {
				return this;
			}

			var rect = this.data("tip-refer-rect");
			if (!rect) {
				rect = getClientRects($refer[0])[0];
			}

			// align the tip.
			alignTipToRect(this, rect, opts);

			return this;
		};


		/*
		 * fn.tip.show(): inject code to the default jQuery show method.
		 */
		var funShow = $tip.show;
		$tip.show = function(speed) {
			funShow.call(this);
			this.align();

			// for speed animation effect.
			if (speed || speed === 0) {
				this.hide();
				funShow.apply(this, arguments);
			}
			return this;
		};


		/*
		 * fn.tip.fadeIn(): inject code to the default jQuery fadeIn method.
		 */
		var funFadeIn = $tip.fadeIn;
		$tip.fadeIn = function() {
			funShow.call(this);
			this.align().hide();

			funFadeIn.apply(this, arguments);
			return this;
		};


		/*
		 * fn.tip.content(): get or set content of tip widget.
		 */
		$tip.content = function(content) {
			if (typeof content == "undefined") {
				return this.find(".dialog-content-container").html();
			}
			else {
				var isVisible = this.is(":visible");

				setTipContent(this, content);

				// align tip position or restore hide states.
				if (isVisible) {
					this.align();
				}
				else {
					this.hide();
				}
				return this;
			}
		};
	});
};

})(jQuery);
