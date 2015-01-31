var app = angular.module('app', []);

app.directive('wookmark', [ function () {
	return {
        restrict: 'E',
        link: function (scope, ele, attrs) {
        
        	// Get a handle to the child elements
        	// TODO - Update to use any child elements
			var handler = $(ele).find("li");
			
			// Get Attribute Options or empty object
			attrs.options = attrs.options || {};
			
			// Default values (all optional)
			var options = {
				'itemWidth'				: 210,			// width of one grid item in pixels ("200") or percentage ("10%"), defaults to width of first item
				'outerOffset'			: 2,			// default is "0"
				'autoResize'			: true,			// if "true", updates layout after browser is resized
				'offset'				: 2,			// vertical and horizontal distance between items, defaults to 2
				'fillEmptySpace'		: false,		// if "true", creates placeholder at bottom of each column to create an even layout. Placeholders elements have the class "wookmark-placeholder".
				'resizeDelay'			: 50,			// default is "50", time in miliseconds between browser resize and layout update
				'container'				: undefined,	// the width of this element is used to calculate the number of columns, defaults to "window". For example $('myContentGrid'). Container should also have the CSS property "position: relative".
				'direction'				: "left",		// "left" or "right", whether to start in top left or top right corner
				'flexibleWidth'			: undefined,	// a percentage, adjusts item width to create optimal layout based on browser size
				'align'					: "center",		// "left", "right", or "center"
				'ignoreInactiveItems'	: false,		// if "true", inactive items will still be visible, which can be used to fade filtered items out
				'comparator'			: undefined,	// a custom sorting function
				'onLayoutChanged'		: undefined,	// a function that gets called after every layout change
			};
			
			// Replace attribute default values with specified attribute values
			options = angular.extend(options, scope.$eval(attrs.options));

			// Call the JQuery Plugin with the options passed
			handler.wookmark(options);
        }
	}
}]);
