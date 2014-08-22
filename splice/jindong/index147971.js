jQuery(function(){
	
	//首页顶部大广告展示
  //@param url => 广告点击的链接
  //可能return false，固做为回调函数时需注意
	function uShow(){
		if(N.Func.cookie('show_ad')){
			return false;
		}
		var $body = $(document.body);
		var $normal = $('<div id="uShow_normal"><a id="nor_showImg" target="_blank"></a><a href="javascript:;" id="uShow_close">&times;</a></div>');
		var $min = $('<div id="uShow_min"><a id="uShow_img" target="_blank"></a><a href="javascript:;" id="uShow_close">&times;</a></div>');
		$min.delegate('#uShow_close','click',function(){
			$min.slideUp(function(){
				$(this).remove();
				N.Func.cookie('show_ad',true,{
					'expires': 1/3,
					'domain': '.nuomi.com'	
				})	
			})	
		});
		if(N.Func.cookie('show_big_ad')){  //如果出现过大广告，则只显示小广告
			$min.prependTo($body);
			return false;
		}
		$normal.prependTo($body);
		var delay = 5000;
		var st = setTimeout(hide,delay);
		$normal.delegate('#uShow_close','click',hide);
		function hide(){
			clearTimeout(st);
			var speed = 600;
			$normal.animate({'height':0},speed,function(){
				$normal.remove();
				var date = new Date();
				var expires = (new Date(date.getFullYear(),date.getMonth(),date.getDate()+1) - date)/(24*3600*1000);
				N.Func.cookie('show_big_ad',true,{
					'expires': expires,
					'domain': '.nuomi.com'	
				})	
				$min.css({'height':0,'display':'block'}).prependTo($body).animate({'height':'80px'},speed);	
			});
		};
	};

   uShow();  //年末大促
})
