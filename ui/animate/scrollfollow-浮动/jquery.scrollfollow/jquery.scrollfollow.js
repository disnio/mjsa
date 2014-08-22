/**
 */

// as it is unique, the scrolling way is stored in a global
var SCROLLFOLLOW_SCROLLING_WAY=null;

(function($,undefined) {

	var
		scrollfollow_debug=false,
		SFNAME="scrollfollow";

	function ScrollFollow(){
		this.isFixed=false;
		this.isWrapped=false;
		this.defaults = {
			speed:              0,//"slow",
			top:                10,
			bottom:             10,
			left:               10,
			right:              10,
			limit:              "parent",
			follow:             "vertical",
			wrapbox:            false,
			// sides attachment
			toptobottom:        "bottom",
			bottomtotop:        "bottom",
			righttoleft:        "right",
			lefttoright:        "right",
			// internal
			debug:              false                 // use this to see infos in console
		};
	}

	$.extend(ScrollFollow.prototype, {

// -----------------
// GLOBAL METHODS
// -----------------

		// plugin infos
		infos: function(dbg){
			if (dbg && typeof dbg == 'string') {
				return $.scrollfollow[dbg] ? $.scrollfollow[dbg] : null;
			} else {
				var fbi = $.scrollfollow.name+' [version '+$.scrollfollow.version+'] | see: <'+$.scrollfollow.sources+'>';
				if (dbg && window.console) { window.console.info(fbi); }
				else { return fbi; }
			}
		},

// -----------------
// INSTANCES METHODS
// -----------------

		// creation of an instance
		create: function(element, options){
			var _this = element || this;
			return element ? this.init(_this, options) : false;
		},

		// initialization
		init: function (e, options){
			if (this._getInstance(e)) { return; }
			inst = e;
			inst.options = $.extend({}, this.defaults, options);
			if (inst.options.debug==true) { scrollfollow_debug = true; }
			_dbg('Creating an instance in function scrollfollow.init() ...');

			inst.self      = this;
			inst.element   = $(inst);
			inst.window    = $(window);

			// support for data
			$.data(e, SFNAME, inst);

      // use of debugger if present
			if (typeof $.fn.scrollFollow_debugger != 'undefined') {
				$.data(inst, "scrollfollow_debugger.options", inst.options);
				if (inst.debugger_instance==undefined) inst.debugger_instance = inst.element.scrollFollow_debugger();
			}
			this._locator( e );
			inst.window.bind('scroll', function() {
				scrollingWay();
				inst.self.positionElement( e, inst.window );
			});
		},

		// locator: store some instance values (original css, limits) & find the parent
		_locator: function (e){
			var inst = this._getInstance(e);
			if (!inst) { return false; }

			// different objects sizes
			inst.heights={};
			inst.heights.screen      = document.body.clientHeight;
			inst.heights.self        = inst.element.outerHeight();
			inst.heights.self_secure = inst.heights.self + inst.options.bottom + inst.options.top;
			inst.widths={};
			inst.widths.screen       = document.body.clientWidth;
			inst.widths.self         = inst.element.outerWidth();
			inst.widths.self_secure  = inst.widths.self + inst.options.left + inst.options.right;

			// element limits
			inst.limits={};
			inst.limits.self_min        = inst.element.offset().top;
			inst.limits.self_min_secure = inst.limits.self_min - inst.options.top;
			inst.limits.self_max        = inst.limits.self_min + inst.element.outerHeight();
			inst.limits.self_max_secure = inst.limits.self_max + inst.options.bottom;

			// initial CSS of element
			inst.original={};
			inst.original.width      = inst.element.width();
			inst.original.height     = inst.element.height();
			inst.original.top        = this._get_css(e, 'top').replace(/auto/, inst.element.offset().top);
			inst.original.bottom     = this._get_css(e, 'bottom').replace(/auto/, (inst.original.top + inst.heights.self));
			inst.original.left       = this._get_css(e, 'left').replace(/auto/, inst.element.offset().left);
			inst.original.right      = this._get_css(e, 'right').replace(/auto/, (inst.original.left + inst.widths.self));
			inst.original.margin     = this._get_css(e, 'margin');
			inst.original.padding    = this._get_css(e, 'padding');
			inst.original.margin_top    = this._get_css(e, 'margin-top', true);
			inst.original.margin_bottom = this._get_css(e, 'margin-bottom', true);
			inst.original.margin_left   = this._get_css(e, 'margin-left', true);
			inst.original.margin_right  = this._get_css(e, 'margin-right', true);
			inst.original.position      = this._get_css(e, 'position');
			inst.original.float         = this._get_css(e, 'float');

			_dbg('Element is min_self: '+inst.limits.self_min+' | max_self: '+inst.limits.self_max);
			//console.debug(inst.original);

			// the limiter sizes
			inst.limiter = inst.element.parent();
			if (inst.options.limit && inst.options.limit!='parent') {
				var _tmp = $( inst.options.limit );
				if (_tmp.size()) {
					inst.limiter = _tmp;
				} else {
					throw new Error("'limit' option is not a jQuery selector ["+inst.options.limit+"]");
				}
			}
			inst.heights.limiter = inst.limiter.outerHeight();
			inst.widths.limiter = inst.limiter.outerWidth();
			_dbg('Parent is: '+inst.limiter.get(0).tagName+' with id: '+inst.limiter.attr('id')+' & class: '+inst.limiter.attr('class'));

			// limits for element
			inst.limits.limiter_min = inst.limiter.offset().top;
			inst.limits.limiter_max = inst.limits.limiter_min + inst.heights.limiter;
			inst.limits.limiter_horizontal_min = inst.limiter.offset().left;
			inst.limits.limiter_horizontal_max = inst.limits.limiter_horizontal_min + inst.widths.limiter;
			_dbg('Limits calculated (in px): max= '+inst.limits.limiter_max+' | min= '+inst.limits.limiter_min);

			// fix width & left of element
			if (inst.options.follow=="horizontal") {
				this._set_css(inst, 'height', inst.original.height);
				this._set_css(inst, 'top', inst.original.top);
			} else {
				this._set_css(inst, 'width', inst.original.width);
				this._set_css(inst, 'left', inst.original.left);
			}

			$.data(e, SFNAME, inst);
		},

// -----------------
// GETTERS / SETTERS
// -----------------

		// get an option
		_get: function(inst, name){
			return inst.options[name] !== undefined ? inst.options[name] : this.defaults[name];
		},

		// get a CSS value
		_get_css: function(e, k, isInt){
			var inst = this._getInstance(e);
			if (!inst) { return false; }
			if (isInt) {
				return parseInt(inst.element.css(k).replace(/auto/,0), 10) || 0;
			} else {
				return inst.element.css(k.replace('_', '-')) || false;
			}
		},

		// set a CSS value
		_set_css: function(e, k, v){
			var inst = this._getInstance(e);
			if (inst) { 
				_dbg('Setting "'+k+'" of element on: '+v);
				inst.element.css(k.replace('_', '-'), v);
				$.data(e, SFNAME, inst);
			}
		},

		// is the instance fixed?
		_isFixed: function(e){
			var inst = this._getInstance(e);
			return inst ? inst.self.isFixed : false;
		},

		// is the instance div longer than screen scrolling way side?
		_isLongerThanScreen: function(e){
			var inst = this._getInstance(e);
			if (inst) {
				if (inst.options.follow=='vertical' && (SCROLLFOLLOW_SCROLLING_WAY=='down' || SCROLLFOLLOW_SCROLLING_WAY=='up')) {
					return inst.heights!=undefined ? (inst.heights.self > inst.heights.screen) : null;
				} else if (inst.options.follow=='horizontal' && (SCROLLFOLLOW_SCROLLING_WAY=='left' || SCROLLFOLLOW_SCROLLING_WAY=='right')) {
					return inst.widths!=undefined ? (inst.widths.self > inst.widths.screen) : null;
				}
			}
		},

		// get a $.data FlaotingBox instance
		_getInstance: function(e) {
			try {
				return $.data(e, SFNAME);
			} catch (err) {
				throw 'No instance data for this floating box';
			}
		},

		// set or get options
		_option: function (e, name, value){
			var inst = this._getInstance(e);
			if (!inst) { return false; }
			if (value!=undefined && inst.options[name]) {
				inst.options[name] = value;
				$.data(e, SFNAME, inst);
			} else {
				return inst.options[name] || null;
			}
		},

		// set or get defaults options
		_defaults: function (name, value){
			if (value!=undefined && this.defaults[name]) {
				this.defaults[name] = value;
			} else {
				return this.defaults[name] || null;
			}
		},

// -----------------
// USER & PLUGIN METHODS
// -----------------

		// plugin logic: choose what to do depending on instance width & height and the scrolling way
		positionElement: function (e, window){
			var inst = this._getInstance(e);
			if (!inst) { return false; }
			if (inst.options.follow=="horizontal") {
				return inst.self.positionElementHorizontally(e, window);
			} else {
				return inst.self.positionElementVertically(e, window);
			}
		},

		// position for vertical scroll following
		positionElementVertically: function (e, window){
			// element is longer than screen
			if (
				inst.self._isLongerThanScreen(e) &&
				(
					(SCROLLFOLLOW_SCROLLING_WAY=='down' && inst.options.toptobottom=='bottom') ||
					(SCROLLFOLLOW_SCROLLING_WAY=='up' && inst.options.bottomtotop=='bottom')
				)
			){
					_limit = inst.limits.limiter_max - inst.heights.screen + inst.options.bottom;
					_margin = inst.limits.limiter_max - inst.limits.limiter_min - (inst.heights.self + inst.options.bottom);
	
					// scroll is higher than original top element's position
					// scroll is lesser than limitor's height
					if (
						window.scrollTop() >= (inst.limits.self_max_secure - inst.heights.screen) &&
						window.scrollTop() <= _limit
					) {
						if (inst.options.wrapbox==true && inst.self.isWrapped==false) { inst.self.wrap(e); }
						inst.self.isFixed=true;
						inst.self.switchEffect(e, {
								position:     'fixed', 
								margin:       window.scrollTop() - inst.heights.screen + inst.options.bottom,
								top:          'nullifnotempty',
								margin_top:   0,
								bottom:       inst.options.bottom,
								margin_bottom:0
						});
	
					// scroll is higher than limitor's height
					} else if (
						window.scrollTop() > _limit
					) {
						if (inst.options.wrapbox==true && inst.self.isWrapped==true) { inst.self.unwrap(e); }
						inst.self.isFixed=false;
						inst.self.switchEffect(e, {
								position:     inst.original.position,
								margin:       _margin,
								top:          'nullifnotempty',
								margin_top:   _margin,
								bottom:       'nullifnotempty',
								margin_bottom:0
						});

					// scroll is lower than original top element's position
					} else {
						if (inst.options.wrapbox==true && inst.self.isWrapped==true) { inst.self.unwrap(e); }
						inst.self.isFixed=false;
						inst.self.switchEffect(e, {
								position:     inst.original.position,
								margin:       inst.original.margin_top,
								top:          inst.original.top,
								margin_top:   inst.original.margin_top,
								bottom:       inst.original.bottom,
								margin_bottom:inst.original.margin_bottom
						});
					}

			// element is shorter than screen
			} else {
					_limit = inst.limits.limiter_max - inst.heights.self_secure - inst.options.bottom;
					_margin = inst.limits.limiter_max - inst.limits.limiter_min - (inst.heights.self + inst.options.bottom);
	
					// scroll is higher than original top element's position
					// scroll is lesser than limitor's height
					if (
						window.scrollTop() >= inst.limits.self_min_secure &&
						window.scrollTop() < _limit
					) {
						if (inst.options.wrapbox==true && inst.self.isWrapped==false) { inst.self.wrap(e); }
						inst.self.isFixed=true;
						inst.self.switchEffect(e, {
								position:     'fixed',
								margin:       window.scrollTop() - (inst.limits.self_min - inst.options.bottom - inst.options.top) + inst.options.top,
								top:          inst.options.top,
								margin_top:   0,
								margin_bottom:0
						});
	
					// scroll is higher than limitor's height
					} else if (
						window.scrollTop() >= _limit
					) {
						inst.self.isFixed=false;
						if (inst.options.wrapbox==true && inst.self.isWrapped==true) { inst.self.unwrap(e); }
						inst.self.switchEffect(e, {
								position:     inst.original.position,
								margin:       _margin,
								top:          'nullifnotempty',
								margin_top:   _margin
						});

					// scroll is lower than original top element's position
					} else {
						inst.self.isFixed=false;
						if (inst.options.wrapbox==true && inst.self.isWrapped==true) { inst.self.unwrap(e); }
						inst.self.switchEffect(e, {
								position:     inst.original.position,
								margin:       inst.original.margin_top,
								top:          inst.original.top,
								margin_top:   inst.original.margin_top
						});
					}

			}
		},

		// position for horizontal scroll following
		positionElementHorizontally: function (e, window){
			// element is longer than screen
			if (
				inst.self._isLongerThanScreen(e) &&
				(
					(SCROLLFOLLOW_SCROLLING_WAY=='left' && inst.options.righttoleft=='right') ||
					(SCROLLFOLLOW_SCROLLING_WAY=='right' && inst.options.lefttoright=='right')
				)
			){
					_limit = inst.limits.limiter_horizontal_max - inst.widths.screen + inst.options.right;
					_margin = inst.limits.limiter_horizontal_max - inst.limits.limiter_horizontal_min - (inst.widths.self + inst.options.right);
	
					// scroll is higher than original top element's position
					// scroll is lesser than limitor's height
					if (
						window.scrollLeft() >= (inst.limits.self_max_secure - inst.widths.screen) &&
						window.scrollLeft() <= _limit
					) {
						if (inst.options.wrapbox==true && inst.self.isWrapped==false) { inst.self.wrap(e); }
						inst.self.isFixed=true;
						inst.self.switchEffect(e, {
								position:     'fixed', 
								margin:       window.scrollLeft() - inst.widths.screen + inst.options.right,
								left:         'nullifnotempty',
								margin_left:  0,
								right:        inst.options.right,
								margin_right: 0
						});
	
					// scroll is higher than limitor's height
					} else if (
						window.scrollLeft() > _limit
					) {
						if (inst.options.wrapbox==true && inst.self.isWrapped==true) { inst.self.unwrap(e); }
						inst.self.isFixed=false;
						inst.self.switchEffect(e, {
								position:     inst.original.position,
								margin:       _margin,
								left:         'nullifnotempty',
								margin_left:  _margin,
								right:        'nullifnotempty',
								margin_right: 0
						});

					// scroll is lower than original top element's position
					} else {
						if (inst.options.wrapbox==true && inst.self.isWrapped==true) { inst.self.unwrap(e); }
						inst.self.isFixed=false;
						inst.self.switchEffect(e, {
								position:     inst.original.position,
								margin:       inst.original.margin_top,
								left:         inst.original.left,
								margin_left:  inst.original.margin_left,
								right:        inst.original.right,
								margin_right: inst.original.margin_right
						});
					}

			// element is shorter than screen
			} else {
					_limit = inst.limits.limiter_horizontal_max - inst.widths.self_secure - inst.options.right;
					_margin = inst.limits.limiter_horizontal_max - inst.limits.limiter_horizontal_min - (inst.widths.self + inst.options.right);
	
					// scroll is higher than original top element's position
					// scroll is lesser than limitor's height
					if (
						window.scrollLeft() >= inst.limits.self_min_secure &&
						window.scrollLeft() < _limit
					) {
					_dbg(inst.options.wrapbox+' | '+inst.self.isWrapped);
						if (inst.options.wrapbox===true && inst.self.isWrapped===false) { inst.self.wrap(e); }
						inst.self.isFixed=true;
						inst.self.switchEffect(e, {
								position:     'fixed',
								margin:       window.scrollLeft() - (inst.limits.self_min - inst.options.right - inst.options.left) + inst.options.left,
								left:         inst.options.left,
								margin_left:  0,
								margin_right: 0
						});
	
					// scroll is higher than limitor's height
					} else if (
						window.scrollLeft() >= _limit
					) {
						if (inst.options.wrapbox==true && inst.self.isWrapped==true) { inst.self.unwrap(e); }
						inst.self.isFixed=false;
						inst.self.switchEffect(e, {
								position:     inst.original.position,
								margin:       _margin,
								left:         'nullifnotempty',
								margin_left:  _margin
						});

					// scroll is lower than original top element's position
					} else {
						if (inst.options.wrapbox==true && inst.self.isWrapped==true) { inst.self.unwrap(e); }
						inst.self.isFixed=false;
						inst.self.switchEffect(e, {
								position:     inst.original.position,
								margin:       inst.original.margin_left,
								left:         inst.original.left,
								margin_left:  inst.original.margin_left
						});
					}

			}
		},

		// choose the effect depending on 'speed' option
		switchEffect: function (e, data){
			var inst = this._getInstance(e);
			if (!inst) { return false; }
			if ( data.position!=undefined && (!inst.options.speed || inst.options.speed==0) ){
				inst.self.setPosition(e, data);
			} else {
				inst.self.setMargin(e, (data.margin || 0));
			}
		},

		// effect: set the margin (if speed is not 0)
		setMargin: function (e, margin, way){
			var inst = this._getInstance(e);
			if (!inst) { return false; }

			var _way = (way==undefined || typeof way != 'string') ? 'margin-top' : 'margin-'+way;
			var cur_margin = inst.self._get_css(inst, _way, true);
			if (cur_margin != margin){
				var _opts = {};
				_opts[_way] = margin+'px';
				inst.element
					.stop()
					.animate(_opts, inst.options.speed);
			}

			$.data(e, SFNAME, inst);
		},

		// effect: set positions (if speed is 0)
		setPosition: function (e, data){
			var inst = this._getInstance(e);
			if (!inst) { return false; }
			
			// current values
			var current={
				position:      inst.self._get_css(inst, 'position') || 'static',
				top:           inst.self._get_css(inst, 'top', true),
				bottom:        inst.self._get_css(inst, 'bottom', true),
				left:          inst.self._get_css(inst, 'left', true),
				right:         inst.self._get_css(inst, 'right', true),
				margin_top:    inst.self._get_css(inst, 'margin-top', true),
				margin_bottom: inst.self._get_css(inst, 'margin-bottom', true),
				margin_left:   inst.self._get_css(inst, 'margin-left', true),
				margin_right:  inst.self._get_css(inst, 'margin-right', true)
			};

			// setting position
			if ( data.position!=undefined && data.position!=null && current.position!=data.position ){
				for (prop in current) {
					if ( data[prop]!=undefined && data[prop]!=null && current[prop]!=data[prop] ) {
						if ( data[prop]=='nullifnotempty' ) {
							if ( current[prop]!=undefined && current[prop]!=null && current[prop]!='' && current[prop]!=0 ) {
								inst.self._set_css(inst, prop, '');
							}
						} else {
							inst.self._set_css(inst, prop, data[prop]);
						}
					}
				}

				if ( data.position=='fixed' ) {
//					inst.self._set_css(inst, 'left', inst.original.left);
//					inst.self._set_css(inst, 'margin-left', inst.original.left);
//					inst.self._set_css(inst, 'float', 'none');
//					inst.wrap();
				} else {
//					inst.self._set_css(inst, 'left', inst.original.left);
//					inst.self._set_css(inst, 'margin-left', inst.original.margin_left);
//					inst.self._set_css(inst, 'float', inst.original.float);
//					inst.unwrap();
				}
				inst.self._set_css(inst, 'position', data.position);
			}

			$.data(e, SFNAME, inst);
		},

// -----------------
// UTILS
// -----------------

		// wrap the follower in a security div
		wrap: function(e){
			var inst = this._getInstance(e);
			if (!inst) { return false; }

			if (inst.uid==undefined || !inst.uid) {
				inst.uid = Math.floor(Math.random() * 99999999);
			}
			inst.element.before($('<div/>', {
				position: 'static',
				width: inst.original.width,
				height: inst.original.height,
				top: inst.original.top,
				bottom: inst.original.bottom,
				left: inst.original.left,
				right: inst.original.right,
				id: inst.uid,
				rel: 'scrollfollow_wrapper',
			}));
			inst.self.isWrapped=true;

			$.data(e, SFNAME, inst);
		},

		// delete the secrurity wrapper
		unwrap: function(e){
			var inst = this._getInstance(e);
			if (!inst) { return false; }

			if (inst.uid!=undefined) {
				$('#'+inst.uid).remove();
				inst.self.isWrapped=false;
			}

			$.data(e, SFNAME, inst);
		}

	});

	//
	// private methods
	//
	function _dbg (str)
	{
		if (scrollfollow_debug==true && window.console && window.console.log) {
			window.console.log($.scrollfollow.name + ' (' + $.scrollfollow.version + ') : ' + str);
		}
	}
	// inform about current scrolling
	function scrollingWay()
	{
		var _e = $(window),
				initScrollTop = _e.scrollTop(), currentScrollTop = 0,
				initScrollLeft = _e.scrollLeft(), currentScrollLeft = 0;
		_e.scroll(function(evt){
			currentScrollTop = $(this).scrollTop();
			currentScrollLeft = $(this).scrollLeft();
			SCROLLFOLLOW_SCROLLING_WAY = (initScrollTop !== currentScrollTop ) ? (
					(initScrollTop < currentScrollTop ) ? 'down' : 'up'
				) : (
					(initScrollLeft < currentScrollLeft ) ? 'right' : 'left'
				);
			initScrollTop = currentScrollTop;
			initScrollLeft = currentScrollLeft;
		});
	}

	//
	// reference the plugin for jQuery
	//
	$.fn.scrollfollow = function (options)
	{
		var _args = Array.prototype.slice.call(arguments, 1);

		// setting/getting some instance options or global defaults
		// with argumt[0] == 'option' or 'default'
		if (options == 'option') {
			return $.scrollfollow['_option'].apply($.scrollfollow, [this[0]].concat(_args));
		} else if (options == 'defaults') {
			return $.scrollfollow['_defaults'].apply($.scrollfollow, _args);
		}

		// otherwise create an instance or trigger an event
		if (typeof options == 'string') {
			this.each(function() {
				if ($.scrollfollow[options]!=undefined) {
					$.scrollfollow[options].apply($.scrollfollow, [this].concat(_args));
				} else {
					throw new Error("Argument '"+options+"' is not a jquery.scrollfollow event!");
				}
			});
			// we return false triggering events to avoid normal propagation ...
			return false;
		} else {
			return this.each(function() {
				$.scrollfollow.create(this, options);
			});
		}
	}

	$.scrollfollow = new ScrollFollow(); // singleton instance
	$.scrollfollow.version = "1.0.0";
	$.scrollfollow.name = "Scroll Follower";
	$.scrollfollow.sources = "https://github.com/pierowbmstr/jquery-scrollfollow";

})(jQuery);
