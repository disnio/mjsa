/*
* ol.wordCount		统计文本域内已经输入的字符数(按照微博方式统计,中文算一个字)
* Version 1.0 (2012-1-10)
* @requires jQuery v1.2.6 or later
*
* Example at: http://www.open-lib.com/
*
* Copyright (c) 2009-2012 Open-Lib.Com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* Read the related post and contact the author at http://www.open-lib.com/
*
* This version is far from perfect and doesn't manage it's own state, therefore contributions are more than welcome!
*
* Usage:
*		1.		ol.wordCount("#countTextArea","#countTips",{max:100});
*		2.		ol.wordCount(".countTextArea",".countTips",
*						[
*							{max:100},
*							{
*								max:200,exceedCallback:function(count){
*								}
*							}
*						]
*				);
*
* Tested in IE6 IE7 Firefox Chrome. Any browser strangeness, please report.
*/

window.ol || (window.ol = {});

(function(){
	var wordCountDefaultOptions = {
		max : Number.MAX_VALUE,		//设置允许输入的最大字符数
		exceedCallback : null			//超过最大字符数时执行的回调方法
	},
	count = function(val){
		var allLen = val.length,//字符长度
		enLen = val.replace(/[^\x00-\xff]/g,"").length,//英文字符长度
		inputLength = (enLen%2==0?enLen/2:parseInt(enLen/2)+1) + (allLen-enLen);
		return inputLength;
	};
	/**
	*selector	需要统计字数的对象
	*callback	回填字数信息的对象或方法
	*options	参数设置，可以是一个对象数组，数组的长度必须跟上面的对象个数一致
	*/
	ol.wordCount = function(selector, callback, options){
		var $=jQuery ,
			isArray = $.isArray(options);
		$(selector).each(function(i){
			var opt=isArray?options[i]:options;
			opt = $.extend({},wordCountDefaultOptions, opt);
			if(typeof(callback)=="function"){
				callback.call(this,count(this.value));
			}else{
				$(callback).eq(i).html(count(this.value));
			}

			$(this).bind("keyup", function(){
				var inputLength = count(this.value);
				if(inputLength > opt.max){
					if(opt.exceedCallback){
						opt.exceedCallback(inputLength);
					}

				}
				if(typeof(callback)=="function"){
					callback.call(this,inputLength);
				}else{
					$(callback).eq(i).html(inputLength);
				}
			});
		});
	};
})();

