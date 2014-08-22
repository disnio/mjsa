/**
 * 
 */

if(typeof SELF=="undefined" || !SELF){
	var SELF = {};
};
SELF.getStrLength = function(val){
	var str = $.trim(val);
	str = str.replace(/[^\x00-\xff]/ig,'xx');

	return str.length;
};
//下拉框插件
(function($) {       
	$.fn.dropDownList = function(func) {
		var optionCon = this.find("ul");
	    if($.browser.msie && parseInt($.browser.version) <= 6){
			this.mouseover(function(){
				$(this).find('.option').show();
			});

			this.mouseleave(function(){
				$(this).find('.option').hide();
			});
		};
		if(arguments.length!=0){ 

			func();
		}
	};     
})(jQuery); 

//图片内边框
$.fn.imgInnerBorder = function(options){
	var settings = $.extend( {
      'border'         : '1px solid #C14051'
    }, options);

    return this.each(function() { 
    	var _self = $(this);       
		_self.mouseenter(function(){
		    _self.width(_self.width() - 2);
		    _self.height(_self.height() - 2);
		    _self.css("border", settings.border);
		});
		_self.mouseleave(function(){
		    _self.width(_self.width() + 2);
		    _self.height(_self.height() + 2);
		    _self.css("border", "none");
		});
    });
}
//waterfall图片内边框
var addBorder = function(selector){
	$('.waterfall').each(function(){
		var piclis=$(this).find(".picsmall li");
		$(piclis[0]).css({'left':'331px'});
		$(piclis[1]).css({'left':'331px','top':'310px'});
		$(piclis[2]).css({'left':'505px'});
		$(piclis[3]).css({'left':'505px','top':'310px'});
	});
	
    $(selector).each(function() { 
    	var _self = $(this);
		_self.mouseenter(function(){		     
		    _self.find("img").css("border-color", '#AF2222');
		    _self.css("z-index", '5000');
		    _self.find("a").css("text-decoration", "underline");
		});
		_self.mouseleave(function(){
		    _self.find("img").css("border-color", '#000');
		    _self.css("z-index", '0');
		    _self.find("a").css("text-decoration", "none")
		});
    });
}
//文本占位符
SELF.PlaceHolder = function(selecter, config){
	this.init(selecter, config);
}
SELF.PlaceHolder.prototype = {
	init:function(selecter, config){
		var _self = this;

		_self.config = {
			input:'.search-input',
			btn:'.search-btn',
			focusClass: "art-search-focus"
		}
		_self.container = $(selecter);

		$.extend(this.config, config||{});

		var input = _self.container.find(_self.config.input), btn = _self.container.find(_self.config.btn);
		_self.default_val = input.val();

		input.focus(function(){
			if($.trim($(this).val()) == _self.default_val){
				$(this).val("");
			}
			_self.container.addClass(_self.config.focusClass);
		});

		input.blur(function(){
			if($.trim($(this).val()) == ""){
				$(this).val(_self.default_val);
			}
			_self.container.removeClass(_self.config.focusClass);
		});
	}
}

SELF.Top = {
	bbsHost: "http://bbs.self.com.cn",
	logoutAfterTpl: '<a id="top-login-btn" href="javascript:void(0)" >登录</a>-<a href="http://bbs.self.com.cn/member.php?mod=register" target="_blank">注册</a>',
	init: function(){
		var _self = this;

		$("#top-setHome").click(function(){
			_self.setHome("http://www.self.com.cn/");
		});

		new SELF.PlaceHolder("#top-article-search", {focusClass: ""});

		$("#top-login-btn").click(function(){
			 SELF.LoginDialog.show();
		});
	},
	setHome: function(url){
		try{
			document.body.style.behavior='url(#default#homepage)';
			document.body.setHomePage(url);
		}catch(e){
			if(window.netscape){
				try{ 
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
					var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
					prefs.setCharPref('browser.startup.homepage',url);
				}catch (e){ 
					alert("请在浏览器地址栏输入“about:config”并回车，\r\n然后将[signed.applets.codebase_principal_support]设置为'true'。"); 
				}  
			}else{
				alert("抱歉，您所使用的浏览器无法完成操作。\r\n您需要手动将'"+url+"'设为首页。");
			}
		}
	},
	loginCallback: function(userInfo){
		var loginInfoDiv = $("#top-login-info");
		var loginAfterHtml = '欢迎您，<a href="{bbshost}/home.php?mod=space&amp;uid={uid}">{username}</a>'
		+ '{bind_qq}'
		+ '{bind_sina}|'
		+ '<a href="{bbshost}/home.php?mod=space&amp;do=notice" target="_blank">提醒</a>|'
		+ '<a href="{bbshost}/home.php?mod=space&amp;do=pm" target="_blank">消息</a>|'
		+ '<a href="{bbshost}/home.php?mod=spacecp" target="_blank">修改资料</a>|'
		+ '<a href="{bbshost}/home.php" target="_blank">空间</a>|'
		+ '<a id="top-logout-btn" href="javascript:;">退出</a>';
		var qqBind = '<a href="{bbshost}/home.php?mod=spacecp&amp;ac=plugin&amp;id=qqconnect:spacecp" class="qq"></a>';
		var weiboBind = '<a href="{bbshost}/home.php?mod=spacecp&amp;ac=plugin&amp;id=sina_xweibo_x2:home_binding" class="sina"></a>';

		if( loginInfoDiv.parent().parent().hasClass("mini-nav") ){
			loginAfterHtml = '欢迎您，<a href="{bbshost}/home.php?mod=space&amp;uid={uid}">{username}</a>'
			+ '<a href="{bbshost}/home.php?mod=space&amp;do=notice" target="_blank">提醒</a>|'
			+ '<a href="{bbshost}/home.php?mod=space&amp;do=pm" target="_blank">消息</a>|'
			+ '<a id="top-logout-btn" href="javascript:;">退出</a>';
		}

		var statusUrl = SELF.Top.bbsHost + '/handler.php?mod=user&act=status&uid=' + userInfo.uid + "&&callback=?";
		$.getJSON(statusUrl, function(data){
			if(data.bind_qq && data.bind_qq == "1"){
				loginAfterHtml = loginAfterHtml.replace(/\{bind_qq\}/g, "");
			}else{
				loginAfterHtml = loginAfterHtml.replace(/\{bind_qq\}/g, qqBind);
			}
			if(data.bind_sina && data.bind_sina == "1"){
				loginAfterHtml = loginAfterHtml.replace(/\{bind_sina\}/g, "");
			}else{
				loginAfterHtml = loginAfterHtml.replace(/\{bind_sina\}/g, weiboBind);
			}

			loginAfterHtml = loginAfterHtml.replace(/\{bbshost\}/g, SELF.Top.bbsHost);
			loginAfterHtml = loginAfterHtml.replace(/\{uid\}/g, userInfo.uid);
			loginAfterHtml = loginAfterHtml.replace(/\{username\}/g, userInfo.username);
			
			loginInfoDiv.html( loginAfterHtml );
			$("#top-logout-btn").click(function(){
				SELF.LoginDialog.logout();
			});
		});
		
	},
	bindAfterLogin: function(){
		SELF.LoginDialog.bindAfterLogin( SELF.Top.loginCallback );
	},
	logoutCallback: function(userInfo){
		var loginInfoDiv = $("#top-login-info");
		loginInfoDiv.html( SELF.Top.logoutAfterTpl );
		$("#top-login-btn").click(function(){
			SELF.LoginDialog.show();
		});
	},
	bindAfterLogout: function(){
		SELF.LoginDialog.bindAfterLogout( SELF.Top.logoutCallback );
	},
	checkSearch: function(){
		var v = $("#top-article-search").find("input[name=word]").val();
		if(v == "输入文章关键词"){
			alert("请输入搜索的关键词");
			return false;
		}
		if( SELF.getStrLength( $("#top-article-search").find("input[name=word]").val() ) < 4 ){
			alert("搜索关键词的字数必须大于2字");
			return false;
		}
		return true;
	}
}

$(document).ready(function(){
	SELF.Top.init();
});

SELF.NavSwitch = {
	currentIndex: 0,
	init: function(cindex){
		var _self = this;
		_self.mainNav = $("#main-channel-nav");
		_self.mainNavItems = _self.mainNav.find("li");		
		_self.subNavItems = $("ul.sub-nav");
		_self.currentIndex = cindex;
		_self.activeIndex = _self.currentIndex;

		_self.bindEvent();
	},
	bindEvent: function(){
		var _self = this;
		_self.mainNavItems.mouseenter(function(){
			$(_self.subNavItems[_self.activeIndex]).hide();
			$(_self.mainNavItems[_self.activeIndex]).removeClass("current");

			_self.activeIndex = _self.mainNavItems.index( this );
			$(_self.subNavItems[_self.activeIndex]).show();
			$(_self.mainNavItems[_self.activeIndex]).addClass("current");
		});
		_self.mainNavItems.bind('touchend' , function(){
			var link = $(this).find('a').attr('href');
            window.location = link;
		});

		
	}
}
var bdShare = {};
SELF.Share = {
    config: {
        name: 'tsina|2412621184,tqq|9e53c694576c4399a1f7ed2046f625ce,kaixin001|4957999986555c71aafcd6c7c2005906,renren,qzone,douban',
        iconType: 'small',
        uid: '793230',
        pic: '',
        title: '',
        desc: '', //目前支持自定义qq空间和人人网的摘要内容
        review: 'normal', //回流签名使用&加参数
        url: '',
        num:0,//记录有几个分享
        hasNumber:true
    },
    init: function(config){
        var _self = this, cfg = _self.config;
        $.extend(cfg, config);

        switch( cfg.iconType ){
            case 'small' :
                _self.iconType = 'bds_tools';
                break;
            case 'big' :
                _self.iconType = 'bds_tools_32';
                break;
        }

        var html, appkeys = [], apps, buttons = "", brr, key, j = 0;
        if(cfg.name.indexOf(',') != -1){
            html = '<div id="bdshare" class="bdshare_t '+ _self.iconType +' get-codes-bdshare" '
            html += cfg.url ? 'data="{\'text\':\''+ cfg.title+'\',\'url\':\''+ cfg.url+'\', \'pic\':\''+cfg.pic+'?v=1\'}">' : '>';
            apps = cfg.name.split(',');
            for(var i = 0; i < apps.length; i++){
                if(apps[i].indexOf('|') != -1){
                    brr = apps[i].split('|');
                    key = brr[0];
                    appkeys[j++] = "\"" + key + "\":\"" + brr[1] + "\"";
                }else{
                    key = apps[i];
                }
                buttons += '<a class="bds_'+ key +'"></a>';
            }
            if(cfg.hasNumber){
				html += '' + buttons + '<span class="bds_more"></span><a class="shareCount"></a></div>';
            }else{
            	html += '' + buttons + '<span class="bds_more"></span></div>';
            }
            html += '<script id="bdshare_js" data="type=tools&amp;uid='+ cfg.uid +'" ></script>';
            html += '<script id="bdshell_js"></script>';
            html += '<script> var bds_config = {bdText:"'+cfg.title+'", bdDesc:"'+ cfg.desc +'",bdPic:"'+cfg.pic+'?v=1",review:"'+ cfg.review +'",snsKey:{'+ appkeys.join(',')+'}}</script>';
            html += '<script> document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=' + new Date().getHours() + '";</script>';
        }else{
            alert('config name error');
            return;
        }

        document.write( html );
    },
    //data： {url:"", pic: ""}
    resetShareData: function(data){
        var _self = this;
		if(bdShare && bdShare.fn && bdShare.fn.conf){
			bdShare.fn.conf.bdPic = encodeURIComponent(data.pic);
		}

        if(data.url){
        	$("#bdshare").attr("data", "{'url':'"+ data.url +"'}");
        }
    }
}

SELF.checkStrLength = function(val){
	var v = $("#word").val()
	if(v == "请输入搜索内容"){
		alert("请输入搜索的关键词");
		return false;
	}
	if( SELF.getStrLength( $("#word").val() ) < 4 ){
		alert("搜索关键词的字数必须大于2字");
		return false;
	}
	return true;
};
var _gaq = _gaq || [];
function _trackPageview(url){
	_gaq.push(['selfTracker._trackPageview', url.split("com.cn")[1]]);
}
function _trackDfpAd(adCode, adSize){
	var img = new Image();
	img.src = "http://pubads.g.doubleclick.net/gampad/ad?iu=/5023577/"+ adCode +"&sz="+ adSize +"&c=" + new Date().getTime();
};
//文字链广告
var CNC_Ad_Text = {
    replace: function(adCodeId, adObject){
        var _self = this, adContainer, adObject, adLink;
        
        adContainer = $('#'+ adCodeId +'_ad_container');
        if( adContainer.length > 0){
            adLink = adContainer.find("a");
            if(adLink.length > 0){
                adObject.html('<a href="'+ adLink.attr("href") +'" target="_blank">'+ adLink.text() +'</a>');
            }
        }
    }
};


//首页热力推荐广告位
var CNC_Ad_hotRec = {
	replace : function(adCodeId, adObject){
		var _self = this,adContainer, adObject, adLink,adImg;
		adContainer = $('#'+ adCodeId +'_ad_container');
		if( adContainer.length > 0){
            adLink = adContainer.find("a");
            adImg = adContainer.find("img:first");

            if(adLink.length > 0){
                adObject.find(".pic img:first").attr("src",adImg.attr('src')).attr("alt",adImg.attr('alt')).attr("title",adImg.attr('alt'));//图片src,alt,title
                adObject.find(".pic a:first").attr("href",adLink.attr('href')).attr("title",adImg.attr('alt'));//图片链接href,title

                adObject.find(".info>h3>a").attr("href",adLink.attr('href')).attr("title",adImg.attr('alt')).html(adImg.attr('alt'));//标题链接href,title,html
                adObject.find(".info>p").html(adImg.attr('rel'));//描述文字
            }
        }
	}
};


//焦点图广告位处理
//参考依次为：广告ID，焦点图a标签dom，标题外围dom，描述dom
var CNC_AD_focus = {
	replace : function (adContainerId, focusImg, focusTitle, focusDesc){


		if(this.hasAd(adContainerId)){
			adCon = $("#" + adContainerId+"_ad_container");


			if(adCon.find("iframe").length>0){
				adCon = adCon.find("iframe:eq(0)").contents();
			}


			link = adCon.find("a").attr("href");
	        src = adCon.find("img").attr("src");
	        title = adCon.find("img").attr("alt");
	        adDesc = adCon.find("img").attr("rel");
	        

	        //更新图片广告
	        focusImg.attr("href",link);
	        focusImg.find("img").attr("src",src);

	        //判断是否有标题
	        if(title != '' && focusTitle){
		        focusTitle.attr("href",link);
		        focusTitle.html(title);	
	        }
	        //判断是否有描述
	        if(adDesc != '' && focusDesc){
	        	focusDesc.html(adDesc);
	        }
	        return true;
		} else {
			return false;
		}
	},
	hasAd : function(adCodeId){
		var adContainer = $("div[id^='"+adCodeId+"_ad_container']");
	    if( adContainer.length > 0){
	        return true;
	    }
	    return false;
	}
};