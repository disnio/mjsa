;(function($) {
if ($.fn.viewport) {
	return;
}


// jQuery doesn't support a is string judgement, so I made it by myself.
function isString(obj) {
	return typeof obj == "string" || Object.prototype.toString.call(obj) === "[object String]";
}


// patch the container if it is the window object.
function patchContainer(container) {
	return container === window ?
			(document.compatMode == "CSS1Compat" ? document.documentElement : document.body) : container;
}


// filter the dom elements which are inside the container's viewport.
function filterInsideView($elements, container, threshold, includeHiddens) {
	var result = [];

	// get container height and width
	var $container = $(container), containerHeight = $container.height(), containerWidth  = $container.width(); 
	var offsetTop = 0, offsetLeft = 0;

	// adjust the containerHeight, containerWidth, offsetTop and offsetLeft
	// if container is not the window object.
	if (container !== window) {
		var containerRect = container.getBoundingClientRect();

		containerHeight += (parseInt($container.css("padding-top"))    || 0) +
						   (parseInt($container.css("padding-bottom")) || 0);
		containerWidth  += (parseInt($container.css("padding-left"))   || 0) +
						   (parseInt($container.css("padding-right"))  || 0);
		offsetTop  = containerRect.top  + (parseInt($container.css("border-top-width"))  || 0);
		offsetLeft = containerRect.left + (parseInt($container.css("border-left-width")) || 0);
	}

	// filter elements by their rect info
	for (var i = 0; i < $elements.length; i++) {
		var rect   = $elements[i].getBoundingClientRect();

		// hidden element
		if (rect.top == 0 && rect.bottom == 0 && rect.left == 0 && rect.right == 0) {
			if (includeHiddens) {
				result.push($elements[i]);
			}
		}
		// visible element
		else {
			var top    = Math.round(rect.top - offsetTop),
				bottom = Math.round(rect.bottom - offsetTop),
				left   = Math.round(rect.left - offsetLeft),
				right  = Math.round(rect.right - offsetLeft);

			if (((top < -threshold[0] && bottom >= -threshold[0]) || (top >= -threshold[0] && top <= containerHeight + threshold[2])) &&
				((left < -threshold[3] && right >= -threshold[3]) || (left >= -threshold[3] && left <= containerWidth + threshold[1]))) {
				result.push($elements[i]);
			}
		}
	}

	return result;
}


// find all elements which inside the container.
function findElements(targets, $container) {
	targets = $.trim(targets);
	return targets ? ($container[0] === window ? $(targets) : $(targets, $container)): [];
}


// trigger the container's custom event callback function.
function triggerEvent($container, id, detail) {
	var opts = $container.data("viewport-" + id), targets = opts.targets, callback = opts.onViewChange;

	if ($container[0] !== window && !$container.is(":visible") && $.isFunction(callback)) {
		return;
	}

	// preprocess threshold with four directions.
	var threshold;
	if ($.isArray(opts.threshold)) {
		threshold = opts.threshold.concat();
	}
	else {
		threshold = [opts.threshold, opts.threshold, opts.threshold, opts.threshold];
	}

	// filter elements inside viewport.
	var $elements, elements;
	if (isString(targets)) {
		$elements = findElements(targets, $container);

		// filter the elements which are inside the view port
		elements = filterInsideView($elements, $container[0], threshold, opts.includeHiddens);
	}
	else if ($.isArray(targets)) {
		elements = [];
		for (var i = 0; i < targets.length; i++) {
			$elements = findElements(targets[i], $container);

			// filter and combine the elements which are inside the view port
			elements = elements.concat(filterInsideView($elements, $container[0], threshold, opts.includeHiddens));
		}
	}
	else {
		$elements = targets;

		// filter the elements which are inside the view port
		elements = filterInsideView($elements, $container[0], threshold, opts.includeHiddens);
	}

	// preprocess viewport border reaching factors.
	var $patchContainer = $(patchContainer($container[0])),
		scrollTop  = $container.scrollTop(),
		scrollLeft = $container.scrollLeft(),
		scrollHeight = Math.round($patchContainer[0].scrollHeight),
		scrollWidth  = Math.round($patchContainer[0].scrollWidth),
		paddingTop = parseInt($patchContainer.css("padding-top")) || 0,
		paddingBottom = parseInt($patchContainer.css("padding-bottom")) || 0,
		paddingLeft = parseInt($patchContainer.css("padding-left")) || 0,
		paddingRight = parseInt($patchContainer.css("padding-right")) || 0;

	// preprocess thresholdBorderReaching with four directions.
	var thresholdBorderReaching;
	if ($.isArray(opts.thresholdBorderReaching)) {
		thresholdBorderReaching = opts.thresholdBorderReaching.concat();
	}
	else {
		thresholdBorderReaching = [opts.thresholdBorderReaching, opts.thresholdBorderReaching,
								   opts.thresholdBorderReaching, opts.thresholdBorderReaching];
	}
	for (var i = 0; i < thresholdBorderReaching.length; i++) {
		if (/^0\.[0-9]+$/.test(thresholdBorderReaching[i].toString())) {
			thresholdBorderReaching[i] = Math.round(((i == 0 || i == 2) ? scrollHeight : scrollWidth) *
													parseFloat(thresholdBorderReaching[i]));
		}
		// make sure thresholdBorderReaching[i] with a positive integer value.
		else {
			thresholdBorderReaching[i] = Math.max(parseInt(thresholdBorderReaching[i]), 0);
		}
	}

	// calculate viewport border reaching detail infos.
	detail.top = scrollTop - thresholdBorderReaching[0] <= 0;
	detail.right = paddingLeft + paddingRight + $container.width() + scrollLeft + thresholdBorderReaching[1] >= scrollWidth;
	detail.bottom = paddingTop + paddingBottom + $container.height() + scrollTop + thresholdBorderReaching[2] >= scrollHeight;
	detail.left = scrollLeft - thresholdBorderReaching[3] <= 0;

	// do callback with the "onViewChange" custom event.
	callback.call($container, elements, detail);
}

// viewport plugin method.
var idIndex = 0;
$.fn.viewport = function(settings) {
	var defaults = {
		id: idIndex++,
		targets: "",
		includeHiddens: true,
		threshold: 0,
		// this will effect the detail of {top, bottom, left, right} detecting
		thresholdBorderReaching: 0,
		delay: 500,
		onViewChange: null
	};

	// overwrite the default options
	var opts = $.extend(defaults, settings);

	// initialize each container and bind events.
	this.each(function() {
		var $container = $(this);
		var scrollTop = $container.scrollTop();
		var scrollLeft = $container.scrollLeft();

		// delay trigger the scroll or resize event.
		var timer;
		$container.bind("scroll.viewport.viewport-" + opts.id + " resize.viewport.viewport-" + opts.id, function(event) {
			window.clearTimeout(timer);
			timer = window.setTimeout(function() {
				var oldScrollTop = scrollTop;
				var oldScrollLeft = scrollLeft;
				scrollTop = $container.scrollTop();
				scrollLeft = $container.scrollLeft();

				var detail = {
						type: event.type,
						vert: scrollTop - oldScrollTop,
						hor: scrollLeft - oldScrollLeft
					};

				// trigger the viewchange event internally.
				triggerEvent($container, opts.id, detail);
			}, $container.data("viewport-" + opts.id).delay);
		})
		// custom event "viewchange" for event trigger.
		.bind("viewchange", function(event) {
			triggerEvent($container, opts.id, {type: "viewchange", vert: 0, hor: 0});
		})
		.data("viewport-" + opts.id, opts);

		// trigger the container's custom event immediately.
		triggerEvent($container, opts.id, {type: "init", vert: 0, hor: 0});
	});

	return this;
};
})(jQuery);