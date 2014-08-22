/**
 */

// singleton instance
var sfdbg_instance=null;
(function($,undefined) {

	$.scrollFollow_debugger_settings = {
			// user over-writable
			debugger_position: { top:0, right:0 },
			// templates (sprintf like)
			debugger_wrapper: '<div style="position:fixed;background-color:#404040;width:160px;height:auto;min-height:80px;'
						+'color:#fff;font:9px/1em normal Verdana,Helvetica,Arial,sans-serif;padding:4px;'
						+'-moz-border-radius: 6px;-webkit-border-radius:6px;filter:alpha(opacity=90);-moz-opacity:0.9;opacity:0.9;"'
						+'id="scrollfollowdebugger"></div>',
			debugger_outerblock: '<div style="display:block;border-bottom:1px solid #fff;margin:4px 4px 12px 4px;">%s</div>',
			debugger_innerblock: '<div style="display:block;margin:4px 0;">%s</div>',
			debugger_titleblock: '<p style="font-weight:bold;font-size:9px;text-align:center;">%s</p>',
			debugger_subtitleblock: '<p style="font-weight:bold;font-size:9px;text-align:left;">%s</p>',
			debugger_toggableblock: '<div style="display:none;font-size:9px;text-align:left;" id="%s"></div>',
			debugger_titlespan: '<span style="">%s</span>',
			debugger_spanred: '<span style="color:#ff0000" id="%s"></span>',
			debugger_spanyellow: '<span style="color:#ffff00" id="%s"></span>',
			debugger_spangreen: '<span style="color:#00ff00" id="%s"></span>',
			debugger_spanblue: '<span style="color:#0099ff" id="%s"></span>',
			debugger_listul: '<ul style="margin:0px 0px 2px 12px;padding:0px;">%s</ul>',
			debugger_listli: '<li style="margin:0px 0px 4px 0px;padding:0px;list-style-type:disc;">%s</li>',
			// strings
			debugger_title: $.scrollfollow.name+' debugger',
			debugger_info_handler: '[ <a href="#" onclick="$(\'#sfdbg_infos\').toggle(\'slow\');return false;"'
						+'title="Show/Hide versions informations" style="color:#0099ff;text-decoration:none">Infos</a> ]',
			debugger_sources_handler: '[ <a href="'+$.scrollfollow.sources+'" target="_blank" title="See plugin sources on GitHub"'
						+'style="color:#0099ff;text-decoration:none;">Sources</a> ]',
			debugger_options_handler: '[ <a href="#" onclick="$(\'#%s\').toggle(\'slow\');return false;" title="Show/Hide instance options"'
						+'style="color:#0099ff;text-decoration:none;">options</a> ]',
			debugger_scroll_title: 'Screen scrolling',
			debugger_scrollw_title: 'scroll way: ',
			debugger_scrollx_title: 'scroll [x]: ',
			debugger_scrolly_title: 'scroll [y]: ',
			debugger_object_title: 'New object [ #%s ]',
			debugger_positionx_title: 'position [x]: ',
			debugger_positiony_title: 'position [y]: ',
			debugger_status_title: 'style: '
	};

	$.fn.scrollFollow_debugger = function()
	{ 
		// settings
		this.settings = $.scrollFollow_debugger_settings;
		// builder: full block
		this.build_block = function(str){ return this.settings.debugger_outerblock.replace('%s', str); };
		// builder: info span
		this.build_span = function(setting_index, str){ var _span = this.settings[setting_index]; return _span ? _span.replace('%s', str) : str; };

		// initialization (singleton)
		this._init = function()
		{
			$('body').append( this.settings.debugger_wrapper );
			sfdbg_instance.sfdbg = $('#scrollfollowdebugger');
			for (prop in this.settings.debugger_position) {
				sfdbg_instance.sfdbg.css(prop, this.settings.debugger_position[prop]);
			}
			sfdbg_instance.sfdbg.html( 
				this.build_block( this.build_span('debugger_titleblock', this.settings.debugger_title) )
			);
			var _info_str = this.build_span('debugger_subtitleblock', this.settings.debugger_info_handler + '&nbsp;&nbsp;' + this.settings.debugger_sources_handler)
				+ this.build_span('debugger_toggableblock', 'sfdbg_infos');
			sfdbg_instance.sfdbg.append( this.build_block( _info_str ) );
			$('#sfdbg_infos').html(
				this.build_span('debugger_listul', 
					this.build_span('debugger_listli', 'jQuery version: '+$.fn.jquery)
					+ this.build_span('debugger_listli', 'jQuery.ScrollFollow version: '+$.scrollfollow.infos('version'))
					+ this.build_span('debugger_listli', 'browser: '+navigator.userAgent)
				)
			);
		};

		// scroll block
		this._init_scroll = function()
		{
			var _idx = 'scroll_posx', _idy = 'scroll_posy', _idw = 'scroll_way';
			var _scroll_str = this.build_span('debugger_subtitleblock', this.settings.debugger_scroll_title)
				+ this.build_span('debugger_innerblock',
					this.build_span('debugger_titlespan', this.settings.debugger_scrollw_title) + this.build_span('debugger_spangreen', _idw)
				)
				+ this.build_span('debugger_innerblock', 
					this.build_span('debugger_titlespan', this.settings.debugger_scrollx_title) + this.build_span('debugger_spanyellow', _idx)
				)
				+ this.build_span('debugger_innerblock',
					this.build_span('debugger_titlespan', this.settings.debugger_scrolly_title) + this.build_span('debugger_spanyellow', _idy)
				);

			sfdbg_instance.sfdbg.append( this.build_block( _scroll_str ) );
			var $this = $(this), _this_ = this;
			$(window).bind('scroll', function(){
				_this_.updateInfos( 
					$(window).scrollTop(), $(window).scrollLeft(), SCROLLFOLLOW_SCROLLING_WAY, {idx: _idx, idy: _idy, ids: _idw}
				);
			});
		};
		
		// object block
		this._init_object = function()
		{
			var _id = $(this).attr('id') || '',
				_idx = 'sfdiv_posx_'+_id, _idy = 'sfdiv_posy_'+_id,
				_ids = 'sfdiv_status_'+_id, _ido = 'sfdiv_options_'+_id,
				_opts = $(this).data("scrollfollow_debugger.options"),
				_obj_opts_str_items = '';
			for (var key in _opts) {
				_obj_opts_str_items += this.build_span('debugger_listli', key+'= '+_opts[key]);
			}
			var _obj_opts_str = this.build_span('debugger_listul', _obj_opts_str_items);
			var _obj_str = this.build_span('debugger_subtitleblock', this.build_span( 'debugger_object_title', _id) )
				+ this.build_span('debugger_innerblock', 
					this.build_span('debugger_titlespan', this.settings.debugger_positionx_title) + this.build_span('debugger_spanred', _idx)
				)
				+ this.build_span('debugger_innerblock',
					this.build_span('debugger_titlespan', this.settings.debugger_positiony_title) + this.build_span('debugger_spanred', _idy)
				)
				+ this.build_span('debugger_innerblock',
					this.build_span('debugger_titlespan', this.settings.debugger_status_title) + this.build_span('debugger_spanyellow', _ids)
				)
				+ this.build_span('debugger_subtitleblock', this.build_span('debugger_options_handler', _ido) )
				+ this.build_span('debugger_toggableblock', _ido);

			sfdbg_instance.sfdbg.append( this.build_block( _obj_str ) );
			$('#'+_ido).html( _obj_opts_str );
			var $this = $(this), _this_ = this;
			$(window).bind('scroll', function(){
				_this_.updateInfos( 
					$this.position().top, $this.position().left, $this.attr('style'), {idx: _idx, idy: _idy, ids: _ids}
				);
			});
		};
		
		// update infos in a block
		this.updateInfos = function( posX, posY, status, divs )
		{
			if (posX!=undefined && posX!=null) $('#'+divs['idx']).html(posX);
			if (posY!=undefined && posY!=null) $('#'+divs['idy']).html(posY);
			if (status!=undefined && status!=null) $('#'+divs['ids']).html(status);
		};

		// plugin work ...
		if (this.length){
			var _this_ = this;
			return this.each(function(){
				if (sfdbg_instance==null) {
					sfdbg_instance={};
					_this_._init();
					_this_._init_scroll();
				}
				_this_._init_object();
				// always returns 'self'
				return this;
			});
		}
	};

})(jQuery);
