var N = {};
(function(a) {
    N = a.extend(N, {
        namespace: function() {
            var a = arguments,
                d = null,
                e, c, f;
            for (e = 0; e < a.length; e++) {
                f = a[e].split(".");
                d = N;
                for (c = "N" == f[0] ? 1 : 0; c < f.length; c++) d[f[c]] = d[f[c]] || {}, d = d[f[c]]
            }
            return d
        }
    })
})(jQuery);
N.namespace("Func");
(function() {
    N.Func = {
        cookie: function(a, b, d) {
            if ("undefined" != typeof b) {
                d = d || {};
                if (null === b) b = "", d.expires = -1;
                var e = "";
                if (d.expires && ("number" == typeof d.expires || d.expires.toUTCString)) "number" == typeof d.expires ? (e = new Date, e.setTime(e.getTime() + 864E5 * d.expires)) : e = d.expires, e = "; expires=" + e.toUTCString();
                var c = d.path ? "; path=" + d.path : "",
                    f = d.domain ? "; domain=" + d.domain : "",
                    d = d.secure ? "; secure" : "";
                document.cookie = [a, "=", encodeURIComponent(b), e, c, f, d].join("")
            } else {
                b = null;
                if (document.cookie && "" != document.cookie) {
                    d =
                        document.cookie.split(";");
                    for (e = 0; e < d.length; e++)
                        if (c = jQuery.trim(d[e]), c.substring(0, a.length + 1) == a + "=") {
                            b = decodeURIComponent(c.substring(a.length + 1));
                            break
                        }
                }
                return b
            }
        },
        lazyload: function() {
            function a() {
                d || (d = !0, setTimeout(function() {
                    b.each(function() {
                        "undefined" != typeof $(this).attr("imgsrc") && $(this).offset().top < $(document).scrollTop() + $(window).height() + 800 && $(this).attr("src", $(this).attr("imgsrc")).removeAttr("imgsrc")
                    });
                    d = !1
                }, 100))
            }
            if ($(".dynload")[0]) {
                var b = $(".dynload"),
                    d = !1;
                $(window).bind("scroll resize",
                    function() {
                        a()
                    });
                a()
            }
        },
        complaint: function() {
            N.UI.confirm_v({
                message: "\u5ec9\u6b63\u90ae\u7bb1\u548c\u7535\u8bdd\u4ec5\u63a5\u53d7\u5408\u4f5c\u5546\u5bb6\u5bf9\u767e\u5ea6\u7cef\u7c73\u5458\u5de5\u8fdd\u89c4\u8fdd\u6cd5\u884c\u4e3a\u7684\u4e3e\u62a5\uff0c\u4e0d\u63a5\u53d7\u7528\u6237\u54a8\u8be2\u3001 \u6295\u8bc9\u6216\u5546\u52a1\u5408\u4f5c\u7533\u8bf7\u3002<br />\u9700\u7535\u8bdd\u4e3e\u62a5\u8bf7\u76f4\u63a5\u62e8\u625313269403604\uff0c\u90ae\u7bb1\u4e3e\u62a5\u8bf7\u70b9\u51fb\u786e\u5b9a\u6309\u94ae",
                callback: function(a) {
                    if (a) window.location.href = "mailto:bdnm_jiancha@baidu.com";
                    else return !1
                }
            })
        },
        integrity: function() {
            N.UI.alert_v({
                message: "\u4ec5\u63a5\u6536\u5408\u4f5c\u5546\u5bb6\u5bf9\u767e\u5ea6\u7cef\u7c73\u5458\u5de5\u6709\u8fdd\u89c4\u8fdd\u6cd5\u884c\u4e3a\u7684\u4e3e\u62a5\uff0c\u4e0d\u63a5\u53d7\u7528\u6237\u54a8\u8be2\u3001\u6295\u8bc9\u6216\u5546\u52a1\u5408\u4f5c\u7533\u8bf7\u3002\u5ec9\u6b63\u4e3e\u62a5\u7535\u8bdd\uff1a13269403604"
            })
        },
        isStrictMode: function() {
            return "BackCompat" !=
                document.compatMode
        },
        pageWidth: function() {
            return this.isStrictMode() ? Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) : Math.max(document.body.scrollWidth, document.body.clientWidth)
        },
        pageHeight: function() {
            return this.isStrictMode() ? Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) : Math.max(document.body.scrollHeight, document.body.clientHeight)
        },
        winWidth: function() {
            return this.isStrictMode() ? document.documentElement.clientWidth : document.body.clientWidth
        },
        winHeight: function() {
            return this.isStrictMode() ? document.documentElement.clientHeight : document.body.clientHeight
        },
        isBlank: function(a) {
            return /^\s*$/.test(a)
        },
        isEmail: function(a) {
            return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(a)
        },
        isNumber: function(a) {
            return /^\d+$/.test(a)
        },
        isString: function(a) {
            return "string" == typeof a
        },
        isMobile: function(a) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?((1[345]\d{9})|(18\d{9}))$/.test(a)
        },
        isTel: function(a) {
            return /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(a)
        },
        isZip: function(a) {
            return /^[0-9]\d{5}$/.test(a)
        },
        isPic: function(a) {
            return /\.(jpg|jpeg|gif|png|bmp)$/i.test(a)
        },
        strLen: function(a) {
            var b = 0;
            for (i = 0, len = a.length; i < len; i++) b = !0 == /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/.test(a.charAt(i)) ? b + 2 : b + 1;
            return b
        },
        buyDate2Str: function(a) {
            var b = [];
            $.each(a, function(a, e) {
                b.push('"' + e.name + '":"' + e.value + '"')
            });
            return b = "{" + b.join(",") + "}"
        },
        selectInput: function(a) {
            $("#" + a).focus(function() {
                $(this).select()
            }).mousedown(function(a) {
                a.preventDefault();
                $(this).select()
            })
        },
        maiDianTest: function(a,
            b) {
            if ("undefined" !== typeof item_resource) {
                if ("box" === b) return item_resource[a] ? item_resource[a].box : "";
                if ("item" === b) return item_resource[a] ? item_resource[a].item : ""
            } else return ""
        },
        formatDate: function(a) {
            function b(c) {
                return c = 1 == c.toString().length ? "0" + c : c
            }
            var d = new Date,
                e = d.getFullYear(),
                c = d.getMonth() + 1,
                f = d.getDate(),
                h = d.getHours(),
                g = d.getMinutes(),
                d = d.getSeconds();
            return 1 === a ? b(c) + "-" + b(f) : 2 === a ? e + "-" + b(c) + "-" + b(f) : e + "-" + b(c) + "-" + b(f) + " " + b(h) + ":" + b(g) + ":" + b(d)
        },
        arrayIndexOf: function(a, b) {
            if (Array.prototype.indexOf) return a.indexOf(b);
            for (var d = 0, e = a.length; d < e; d++)
                if (a[d] === b) return d;
            return -1
        },
        placeholder: function(a, b) {
            if ($.browser.msie && !(9 < $.browser.version)) {
                var d = a.get(0).getAttributeNode("placeholder").nodeValue,
                    e = a.css("width"),
                    c = a.css("height"),
                    f = $('<span class="' + b + '" style="width:' + e + ";height:" + c + ';padding:12px 15px;position:absolute;">' + d + "</span>");
                f.insertBefore(a);
                "" !== a.val() && f.hide();
                a.keyup(function() {
                    "" === $(this).attr("value") ? f.show() : f.hide()
                })
            }
        },
        showLoginPop: function(a, b) {
            try {
                a = $.event.fix(a), a.preventDefault()
            } catch (d) {}
            N.loginPop ?
                N.loginPop.dia.show() : jQuery.getScript("http://nuomi.xnimg.cn/vone/js/enterPop.js?ver", function() {
                    if (void 0 !== b && (void 0 !== b.username && $(".loginPopWin #username").attr("value", b.username).keydown().blur(), void 0 !== b.mobile && ($(".loginPopWin #dynamic").attr("value", b.mobile).keydown().blur(), $("#mobileN,#mobileV").attr("value", b.mobile)), void 0 !== b.callback)) N.loginPop.callback = b.callback
                })
        },
        mobileBindPop: function(a, b) {
            try {
                a = $.event.fix(a), a.preventDefault()
            } catch (d) {}
            $.ajax({
                type: "get",
                url: "http://login.nuomi.com/mobileBind/isBindOverTime",
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "overtime",
                success: function(a) {
                    a.succ ? window.mobileBindPop ? mobileBindPop.dia.show() : jQuery.getScript("http://nuomi.xnimg.cn/vone/js/ui/newMobileBindPop.js?ver", function() {
                        mobileBindPop.opts = b;
                        mobileBindPop.init(b.popType);
                        mobileBindPop.succCallback = b.callback || null
                    }) : alert(a.message)
                }
            })
        }
    };
    N.Func.cellbind = function(a) {
        var b = this;
        b.options = $.extend({
            url: {
                sendvalid: "/user/setting/sendvalid",
                checkvalid: "/user/setting/checkvalid",
                remain_tel: "/user/setting/connectBind"
            },
            container: ".bind-cell",
            telInput: "#cellNumber",
            getBtn: "#retriveVerificationCode",
            codeInput: "#cellValidation",
            validateBtn: "#verifyBtn",
            needBindedState: "#cellBinded",
            errorMsg1: ".err-msg1",
            errorMsg2: ".err-msg2"
        }, a);
        a = b.options;
        b.url = a.url;
        b.container = $(a.container);
        b.telInput = $(a.telInput);
        b.getBtn = $(a.getBtn);
        b.codeInput = $(a.codeInput);
        b.validateBtn = $(a.validateBtn);
        b.errorMsg1 = a.errorMsg1;
        b.errorMsg2 = a.errorMsg2;
        b.needBinded = $(a.needBindedState)[0] ? $(a.needBindedState) : "";
        b.needBindedState = parseInt("object" ==
            typeof b.needBinded[0] ? b.needBinded.val() : "");
        b.orgURL = "";
        if ($("#orgURL")[0]) b.orgURL = $("#orgURL").val();
        b.init = function() {
            1 == b.needBindedState && $(".rebind-cell").hide();
            b.getVerificationCode();
            b.checkVerificationCode()
        }
    };
    N.Func.cellbind.prototype = {
        diaClickClose: function(a) {
            var b = this;
            a.closeButton.bind("click", function() {
                b.toLogin()
            });
            a._hotKeyEvent = function(d) {
                d = d || window.event;
                code = d.keyCode;
                "27" == code && (a.hide(), b.toLogin())
            };
            $(document).bind("keyup", a._hotKeyEvent)
        },
        toLogin: function() {
            window.location.href =
                $("#orgURL")[0] ? "http://login.nuomi.com/account/login?origURL=" + this.orgURL : "http://login.nuomi.com/account/login?origURL=" + window.location.href;
            window.event.returnValue = !1
        },
        sendingCodeEffect: function(a) {
            var b = jQuery.extend({
                times: 1E3,
                total: 5E3,
                txt_f: "\u9a8c\u8bc1\u7801\u53d1\u9001\u4e2d\uff0c\u8bf7\u60a8\u8010\u5fc3\u7b49\u5019\uff0c",
                txt_e: "\u79d2\u540e\u53ef\u91cd\u65b0\u53d1\u9001\u3002",
                elem: null,
                onWork: function() {},
                onFinish: function() {},
                onStart: function() {}
            }, a),
                d = b.total,
                a = b.times;
            b.onStart();
            b.elem.html(b.txt_f + d / 1E3 + b.txt_e);
            interval = setInterval(function() {
                0 == d ? (clearInterval(interval), interval = null, b.onFinish()) : (d -= b.times, b.elem.html(b.txt_f + d / 1E3 + b.txt_e), b.onWork())
            }, a)
        },
        resetValidateInput: function() {
            for (var a, b = 0; b < arguments.length; b++) a = arguments[b], "string" == typeof a && (a = $(a)), a.val("");
            this.container.find("input:first").focus();
            $(this.errorMsg1).add($(this.errorMsg2)).html("")
        },
        checkVerificationCode: function() {
            var a = this,
                b = a.validateBtn;
            $(a.errorMsg1);
            var d = a.url;
            b.click(function() {
                var b =
                    a.codeInput.val(),
                    c = a.telInput.val(),
                    f = $(a.errorMsg2);
                if (b && c) {
                    f.html("\u9a8c\u8bc1\u4e2d\uff0c\u8bf7\u7a0d\u540e...");
                    $(this).css("cursor", "auto").attr("disabled", !0);
                    var h = this;
                    $.post(d.checkvalid, {
                        mobile: c,
                        validCode: b
                    }, function(g) {
                        if (g)
                            if ($(h).css("cursor", "pointer").removeAttr("disabled"), 0 == g.code) {
                                if ($("#mob-tishi")[0] && $("#mob-tishi").css("display", "none"), $("#is-youhuima")[0] && $("#is-youhuima").css("display", "block"), f.empty(), a.needBinded[0] && a.needBinded.val("100"), $(".rebind-cell")[0] &&
                                    ($(".rebind-cell").show(), $("span.cell-number").empty().html("\u60a8\u7684\u624b\u673a\u53f7\u7801<strong>" + c + "</strong>")), a.container.remove(), f.empty(), $("#stepbind2")) 5 < a.orgURL.length ? window.location.href = a.orgURL : window.location.reload()
                            } else if (100 == g.code) {
                            f.empty();
                            var j = (new N.UI.dialog({
                                closeButton: !0,
                                overlay: !0,
                                clickClose: !1,
                                scrollCenter: !0
                            })).setHeader("<h1>\u7ed1\u5b9a\u8d26\u53f7</h1>").setBody("<div class='rebind_layout' id='rebind_layout'><p class='intro'>\u8be5\u624b\u673a\u53f7\u7801\u5df2\u88ab\u7528\u4e8e\u53e6\u4e00\u8d26\u53f7\uff0c\u7ee7\u7eed\u4f7f\u7528\u8be5\u624b\u673a\u53f7\u7801\uff0c\u7cfb\u7edf\u4f1a\u5c06\u4e24\u4e2a<span class='tips_bubble'>\u8d26\u53f7\u7ed1\u5b9a</span></p><a class='leftbtn' id='change_tel' href='javascript:;'>\u6362\u4e2a\u53f7\u7801</a><a class='rightbtn' id='remain_tel' href='javascript:;'>\u7ee7\u7eed\u4f7f\u7528</a><div class='rebind_tips'><p>\u8d26\u53f7\u7ed1\u5b9a\u540e\uff0c\u4e24\u4e2a\u8d26\u53f7\u5747\u53ef\u767b\u5f55\uff0c\u6635\u79f0\u3001\u6240\u5728\u57ce\u5e02\u7b49\u4ee5\u7ed1\u5b9a\u624b\u673a\u7684\u5e10\u53f7\u4e2d\u5bf9\u5e94\u4fe1\u606f\u4e3a\u51c6\u3002\u4ee3\u91d1\u5238\u5c06\u8f6c\u79fb\u5230\u7ed1\u5b9a\u540e\u7684\u8d26\u53f7\u4e2d\u3002</p><span class='arrow'><span class='inner_arrow'></span></span></div></div>").show(),
                                k = j.body.find(".rebind_tips");
                            j.body.find(".tips_bubble").hover(function() {
                                $(this).addClass("c_red");
                                k.show()
                            }, function() {
                                $(this).removeClass("c_red");
                                k.hide()
                            });
                            var g = j.body.find("#change_tel"),
                                l = j.body.find("#remain_tel");
                            g.click(function() {
                                j.remove();
                                window.location.reload()
                            });
                            l.click(function() {
                                $.post(d.remain_tel, {
                                    mobile: c,
                                    validCode: b
                                }, function(c) {
                                    c = eval("(" + c + ")");
                                    if (200 == c.code) {
                                        j.remove();
                                        var b = (new N.UI.dialog({
                                            closeButton: !0,
                                            overlay: !0,
                                            clickClose: !1,
                                            scrollCenter: !0
                                        })).setBody("<div class='rebind_layout' id='rebind_layout'><p class='intro'>\u606d\u559c\u60a8\uff0c\u7ed1\u5b9a\u6210\u529f\uff01\u4e3a\u4f7f\u201c\u8d26\u53f7\u7ed1\u5b9a\u201d\u64cd\u4f5c\u751f\u6548\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002</p><a class='rightbtn' id='relogin' href='###'>\u91cd\u65b0\u767b\u5f55</a></div>").setHeader("<h1>\u5b8c\u6210\u7ed1\u5b9a</h1>").show();
                                        a.diaClickClose(b);
                                        b.body.find("#relogin").click(function() {
                                            b.remove();
                                            a.toLogin()
                                        })
                                    } else j.remove(), f.html(c.msg)
                                })
                            })
                        } else f.html(g.msg)
                    }, "json")
                }
            })
        },
        getVerificationCode: function() {
            var a = this,
                b = a.getBtn,
                d = $(this.errorMsg1);
            b[0] && b.removeAttr("disabled");
            b.click(function() {
                var e = null,
                    e = a.telInput.val();
                $.post(a.url.sendvalid, {
                    mobile: e
                }, function(c) {
                    0 == c.code ? (d.empty(), a.sendingCodeEffect({
                        total: 6E4,
                        elem: d,
                        onStart: function() {
                            b.attr("disabled", !0).css("cursor", "auto");
                            b.addClass("cellBindGetNoclick")
                        },
                        onFinish: function() {
                            d.empty();
                            b.removeAttr("disabled").css("cursor", "pointer");
                            b.removeClass("cellBindGetNoclick")
                        }
                    })) : (b.removeAttr("disabled").css("cursor", "pointer"), d.html(c.msg))
                }, "json");
                return !1
            })
        }
    }
})();
N.namespace("Widget");
(function() {
    N.Widget = {
        goToTop: function() {
            var a = $("<div id='h_goTop' class='go_to_top' title='\u56de\u5230\u9876\u90e8' onclick=\"_gaq.push(['_trackEvent', 'right', 'click_right-backup', 'right-backup'])\"></div>");
            a.appendTo($(document.body));
            a.hover(function() {
                $(this).addClass("go_to_top_hover")
            }, function() {
                $(this).removeClass("go_to_top_hover")
            });
            $.browser.msie && "6.0" == $.browser.version && a.css({
                position: "absolute"
            });
            var b = $(window).height();
            $(window).bind("scroll", function() {
                0 != $(this).scrollTop() ?
                    a.show() : a.hide();
                $.browser.msie && "6.0" == $.browser.version && a.css({
                    top: $(this).scrollTop() + b - 154
                })
            });
            a.click(function() {
                $("html,body").animate({
                    scrollTop: 0
                }, "fast")
            })
        },
        favorite: function() {
            $fav = $("<div id='h_favorite' class='add_favorite' title='\u52a0\u5165\u6536\u85cf' onclick=\"_gaq.push(['_trackEvent', 'right', 'click_right-collection', 'right-collection'])\"></div>");
            $fav.appendTo($(document.body));
            var a = $(window).height();
            $fav.hover(function() {
                $(this).addClass("add_favorite_hover")
            }, function() {
                $(this).removeClass("add_favorite_hover")
            });
            $.browser.msie && "6.0" == $.browser.version && $fav.css({
                position: "absolute"
            });
            $(window).bind("scroll", function() {
                $.browser.msie && "6.0" == $.browser.version && $fav.css({
                    top: $(this).scrollTop() + a - 84
                })
            });
            $fav.click(function() {
                var a = -1 != navigator.userAgent.toLowerCase().indexOf("mac") ? "Command/Cmd" : "CTRL",
                    d = new Date,
                    e = d.getMonth() + 1,
                    e = 1 == e.toString().length ? "0" + e.toString() : e.toString(),
                    d = d.getDate(),
                    d = 1 == d.toString().length ? "0" + d.toString() : d.toString(),
                    e = window.location.href + "?utm_source=Favorites&utm_medium=Favorites&utm_campaign=" +
                        (e + d) + "&cid=006101",
                    d = document.title;
                if (document.all) window.external.addFavorite(e, d);
                else if (window.sidebar) {
                    if (!window.sidebar.addPanel) return alert("\u6536\u85cf\u5931\u8d25\uff0c\u60a8\u53ef\u4ee5\u5c1d\u8bd5\u901a\u8fc7\u5feb\u6377\u952e" + a + " + D \u52a0\u5165\u5230\u6536\u85cf\u5939~"), !1
                } else alert("\u60a8\u53ef\u4ee5\u5c1d\u8bd5\u901a\u8fc7\u5feb\u6377\u952e" + a + " + D \u52a0\u5165\u5230\u6536\u85cf\u5939~")
            })
        },
        browsingHistory: function() {
            function a(c) {
                d = Number(c);
                c = '<div style="position:absolute;top:34px;left:0px;width:280px;height:' +
                    ($("#history_box .bh_table").height() ? $("#history_box .bh_table").height() : 100) + 'px;opacity:0.6;filter:alpha(opacity:60);background-color:white;z-index:2"></div><img style="position:absolute;display:block;z-index:3;top:40%;left:45%;" src="http://nuomi.xnimg.cn/image_new/onload.gif" alt="load">';
                $("#history_box").append(c);
                $.ajax({
                    url: "/user/viewRecord",
                    success: function(c) {
                        var a = "",
                            c = eval(c);
                        if (void 0 != c && 0 < c.deals.length) {
                            a = "<table class='bh_table' bordercollapse='0' cellspacing='0' border='0'>";
                            dataLength = 5 <= c.deals.length ? 5 : c.deals.length;
                            for (var f = 0; f < dataLength; f++) {
                                var d = c.deals[f];
                                dataDealUrl = d.url;
                                dataDealTitle = d.title;
                                a += "<tr><td><a target='_blank' href='" + (0 > dataDealUrl.indexOf("?") ? dataDealUrl + "?icn=browsing-history" : dataDealUrl + "&icn=browsing-history") + "'><img alt='" + dataDealTitle + "' src='" + d.image + "'/></a></td><td class='nhd_1h'><a target='_blank' title='" + dataDealTitle + "' href='" + (0 > dataDealUrl.indexOf("?") ? dataDealUrl + "?icn=browsing-history" : dataDealUrl + "&icn=browsing-history") +
                                    "'>" + dataDealTitle + "</a><div class='price clearfix'><span class='nprice'>\u00a5 " + d.priceForView + "</span><span class=' oprice'>\u00a5 " + d.marketPrice + "</span></div></td></tr>"
                            }
                            $("#history_box").html(a + "</table><a href='javascript:;' class='all_clear'>\u6e05\u7a7a\u6d4f\u89c8\u8bb0\u5f55</a>")
                        } else 0 == c.deals.length && $("#history_box").html(a + '<p class="no_bh">\u6682\u65e0\u6d4f\u89c8\u8bb0\u5f55</p>');
                        e = b = !1;
                        $("#historyRecord .all_clear").click(function() {
                            $.get("/user/viewRecord/delete");
                            $("#history_box").html('<p class="no_bh">\u6682\u65e0\u6d4f\u89c8\u8bb0\u5f55</p>')
                        })
                    },
                    dataType: "json"
                })
            }
            if ($("#history_box")[0]) {
                var b = !1,
                    d = 0,
                    e = !1,
                    c = !1;
                $("#historyRecord").hover(function() {
                    c || (c = !0, b || (b = !0, a(d)))
                }, function() {
                    c = !1
                });
                $("#page_turning a").live("click", function() {
                    e || (e = !0, Number($(this).attr("name")) || 0 == Number($(this).attr("name")) ? a(Number($(this).attr("name"))) : "-" == $(this).attr("name") ? 0 > d - 1 || a(d - 1) : 9 < d + 1 || a(d + 1))
                })
            }
        },
        adv: function() {
            function a(c) {
                if (!d)
                    if (d = !0, c = Number(c) - 1, $(".adv .page .click")[0] || $(".adv .page a").eq(0).addClass("click"), $(".adv .page .click").index() ==
                        c) d = !1;
                    else {
                        var a = 80 * -c;
                        $(".adv .listimg").stop(!0, !1).animate({
                            top: a
                        }, 200);
                        d = !1;
                        $(".adv .page .click").removeClass("click");
                        $(".adv .page a").eq(c).addClass("click")
                    }
            }

            function b() {
                clearInterval(c);
                var f = $(".adv .listimg li").length,
                    b = $(".adv .page .click").text();
                c = setInterval(function() {
                    ++b;
                    b > f && (b = 1);
                    a(b)
                }, 5E3)
            }
            if (!N.Func.cookie("guanggao")) {
                $(".adv").show();
                $(".adv .listimg").css({
                    position: "absolute",
                    height: "auto"
                });
                $(".adv .close a").click(function() {
                    $(this).parents(".adv").remove();
                    N.Func.cookie("guanggao", !0, {
                        expires: 0.5,
                        path: "/",
                        domain: "nuomi.com"
                    })
                });
                var d = !1,
                    e = null,
                    c = null;
                $(".adv .listimg li")[0] && 2 <= $(".adv .listimg li").length ? ($(".adv .page a").click(function() {
                    clearInterval(c);
                    a($(this).text())
                }).bind("mouseenter", function() {
                    clearInterval(c);
                    clearInterval(e);
                    var b = $(this);
                    clearInterval(e);
                    e = setInterval(function() {
                        a(b.text())
                    }, 10)
                }).bind("mouseleave", function() {
                    clearInterval(c);
                    clearInterval(e);
                    b()
                }), a(1), b()) : $(".adv .page").remove()
            }
        },
        shareIm: function() {
            var a = $(".share .im"),
                b, d;
            a && ($.each(a,
                function() {
                    b = $(this);
                    d = b.siblings(".invurl");
                    inputEle = d.find("input");
                    b.click(function(a) {
                        b.addClass("hover");
                        d.show();
                        a.stopPropagation();
                        inputEle.focus(function() {
                            inputEle.select()
                        }).mousedown(function(c) {
                            c.preventDefault();
                            inputEle.select()
                        });
                        d.click(function(c) {
                            c.stopPropagation()
                        })
                    }).focus(function() {
                        b.blur()
                    })
                }), $(document).click(function(a) {
                var c = $("a.im[class*='hover']");
                c && 2 != a.button && (c.removeClass("hover"), c.siblings(".invurl").hide())
            }))
        },
        mobileUploadEntry: function() {
            function a() {
                if ($("#mobileVersion")[0]) {
                    var c =
                        $("#mobileVersion"),
                        a = $("#h_goTop");
                    c.show();
                    a.css("bottom", "145px");
                    c.hover(function() {
                        $(this).addClass("mobile_version_hover")
                    }, function() {
                        $(this).removeClass("mobile_version_hover")
                    });
                    $.browser.msie && "6.0" == $.browser.version && c.css({
                        position: "absolute"
                    });
                    var b = $(window).height();
                    $(window).bind("scroll", function() {
                        $.browser.msie && "6.0" == $.browser.version && (c.css({
                            top: $(this).scrollTop() + b - 130
                        }), a.css({
                            top: $(this).scrollTop() + b - 217
                        }))
                    })
                }
            }
            if ("0" === N.Func.cookie("mobile_upload_entry") || "true" === $("#mobileVersion").attr("isDealPage")) $("#mobileUploadEntry")[0] &&
                $("#mobileUploadEntry").hide(), a();
            else if ($("#mobileUploadEntry")[0]) {
                var b = $("#mobileUploadEntry"),
                    d = b.position().top,
                    e = $(window).height(),
                    c = b.find(".close_entry");
                $(window).scroll(function() {
                    var c = $(this).scrollTop();
                    d < c + 250 ? $.browser.msie && "6.0" == $.browser.version ? b.css({
                        top: $(this).scrollTop() + e - 600
                    }) : (b.css("position", "fixed"), b.css("top", "250px")) : (b.css("position", "absolute"), b.css("top", "366px"))
                });
                c.click(function() {
                    N.Func.cookie("mobile_upload_entry", "0", {
                        expires: 1,
                        domain: "nuomi.com",
                        path: "/"
                    });
                    $("#mobileUploadEntry").remove();
                    a()
                })
            }
        },
        emailSuggest: function(a, b) {
            var b = $.extend({}, b),
                d = a.parent();
            "static" === d.css("position") && d.css("position", "relative");
            var e = "@163.com,@126.com,@sina.com,@qq.com,@hotmail.com,@sohu.com,@yeah.net,@139.com,@sina.cn,@sina.com.cn".split(","),
                c = $('<div class="suggestBox" tabindex="-1"></div>'),
                f = $("<dl></dl>");
            c.append(f).append('<iframe frameborder="0" scrolling="no"></iframe>').prependTo(d).hide();
            a.bind("keyup focus", function(h) {
                var g = $(this).val(),
                    j = h.keyCode;
                if ("38" != j && "40" != j && "13" != j)
                    if (h = "", /^[A-Z_a-z0-9-\.]+@/.test(g)) {
                        for (var k = g.indexOf("@"), j = g.slice(k), g = g.slice(0, k), k = 0, l = e.length; k < l; k++) RegExp(j).test(e[k]) && (h += '<dd><a href="javascript:;">' + g + e[k] + "</a></dd>");
                        h ? (j = b.top ? b.top : d.height(), g = b.left ? b.left : "-" + d.css("border-left-width"), k = b.width ? b.width : d.width(), j = $.extend({
                            top: j,
                            left: g,
                            width: k,
                            height: b.height ? b.height : "auto"
                        }, b), f.html(h), c.find("iframe").height(f.height()), c.css(j).show()) : c.hide()
                    } else c.hide();
                    else if ("13" == j) {
                    if (h = f.find(".active").text()) a.val(h),
                    c.hide()
                } else f.is(":visible") && ("38" == j ? (h.preventDefault(), f.find(".active").length ? (h = f.find(".active").index(), j = f.find(".active"), 0 == h ? (j.removeClass("active"), f.find("dd:last").addClass("active")) : (j.removeClass("active"), j.prev().addClass("active"))) : f.find("dd:first").addClass("active")) : "40" == j && (h.preventDefault(), f.find(".active").length ? (h = f.find(".active").index(), j = f.find(".active"), h == f.find("dd").length - 1 ? (j.removeClass("active"), f.find("dd:first").addClass("active")) : (j.removeClass("active"),
                    j.next().addClass("active"))) : f.find("dd:first").addClass("active")))
            });
            $(".suggestBox a").live("mousedown", function() {
                var b = $(this).text();
                a.val(b);
                c.hide()
            });
            a.click(function(c) {
                c.stopPropagation()
            }).blur(function() {
                setTimeout(function() {
                    c.hide()
                }, 100)
            })
        },
        businessTip: function(a) {
            a.click(function() {
                var a = $.trim($("#remindUser").val()),
                    d = $.trim($("#remindPhone").val()),
                    e = $.trim($("#remindDeal").val()),
                    c = "",
                    f = "",
                    h = "";
                if ("" == a) window.location.href = "http://login.nuomi.com/account/login?origURL=" + encodeURIComponent(window.location.href);
                else if (a && "" != a) {
                    var g = (new N.UI.dialog_v({
                        fade: !1,
                        clickClose: !1,
                        scrollCenter: !0,
                        lock: !1,
                        width: 420
                    })).setHeader("<h2>\u518d\u5f00\u56e2\u63d0\u9192</h2>");
                    d && "" != d ? (f = "<div class='reopen_deal_msg_layout'><div class='info_box'><p class='info'>\u4e00\u65e6\u8be5\u5546\u5bb6\u518d\u4e0a\u7ebf\u65b0\u56e2\u8d2d\uff0c\u60a8\u5c06\u6536\u5230\u77ed\u4fe1\u63d0\u9192\uff01</p></div><span class='blank9'></span>", h = "<div class='rebind-cell clearfix'><span class='fl_right'>\u6362\u53f7\u7801\u4e86\uff1f<a href='http://www.nuomi.com/user/mobile?origURL=' onclick='this.href=this.href+encodeURIComponent(window.location.href)'>\u7ed1\u5b9a\u65b0\u624b\u673a\u53f7&gt;&gt;</a></span><span class='fl_left'>\u60a8\u7684\u624b\u673a\u53f7\u7801\uff1a" +
                        d + " </span></div><p class='err_msg'> </p>", $.post("/deal/reOpenRemind/search", {
                            deal: e
                        }, function(a) {
                            a = $.parseJSON(a);
                            a.searchMessage ? (f = "<div class='reopen_deal_msg_layout'><div class='info_box'><p class='info'>\u60a8\u5df2\u7ecf\u8bbe\u7f6e\u8fc7\u8be5\u5546\u5bb6\u7684\u518d\u5f00\u56e2\u63d0\u9192\uff01</p><p>\u4e00\u65e6\u8be5\u5546\u5bb6\u518d\u4e0a\u7ebf\u65b0\u56e2\u8d2d\uff0c\u60a8\u5c06\u6536\u5230\u77ed\u4fe1\u63d0\u9192\uff01</p></div><span class='blank9'></span>", g.addButton({
                                text: "\u5173\u95ed",
                                className: "dialog_confirm_ok",
                                onclick: function() {
                                    g.remove()
                                }
                            })) : "boolean" == typeof a.searchMessage && !a.searchMessage && g.addButton({
                                text: "\u63d0\u4ea4",
                                className: "dialog_confirm_ok deal_set_submit",
                                onclick: function() {
                                    _gaq.push(["_trackEvent", "KaiTuanTiXing", "submit_kttx", "pastdeal"]);
                                    $.post("/deal/reOpenRemind", {
                                        deal: e
                                    }, function(c) {
                                        if (c) {
                                            var c = $.parseJSON(c),
                                                a = $(".reopen_deal_msg_layout").find(".err_msg");
                                            c.remindMessage ? ($(".deal_set_submit").remove(), a.html("\u63d0\u793a\uff1a\u518d\u5f00\u56e2\u63d0\u9192\u8bbe\u7f6e\u6210\u529f").removeClass("c_red").addClass("c_green")) :
                                                ($(".deal_set_submit").remove(), a.html("\u63d0\u793a\uff1a\u518d\u5f00\u56e2\u63d0\u9192\u8bbe\u7f6e\u5931\u8d25").removeClass("c_green").addClass("c_red"));
                                            g.addButton({
                                                text: "\u5173\u95ed",
                                                className: "dialog_confirm_ok",
                                                onclick: function() {
                                                    g.remove()
                                                }
                                            })
                                        }
                                    })
                                }
                            });
                            c += f + h + "</div>";
                            g.setBody(c).show()
                        })) : (f += "<div class='reopen_deal_msg_layout'><p class='info'>\u4e00\u65e6\u8be5\u5546\u5bb6\u518d\u4e0a\u7ebf\u65b0\u56e2\u8d2d\uff0c\u60a8\u5c06\u6536\u5230\u77ed\u4fe1\u63d0\u9192\uff01</p><span class='blank9'></span>",
                        h += "<div class='rebind-cell clearfix'><span class='fl_right'><a href='http://www.nuomi.com/user/mobile?origURL=' onclick='this.href=this.href+encodeURIComponent(window.location.href)'>\u7ed1\u5b9a\u624b\u673a\u53f7&gt;&gt;</a></span><span class='fl_left'>\u8bf7\u5148\u7ed1\u5b9a\u624b\u673a\u53f7\uff01</span></div>", c += f + h + "</div>", g.setBody(c).show())
                }
            })
        }
    }
})();
N.namespace("Evn");
(function() {
    N.Evn = {
        hovers: function() {
            $(".new_edition_hd .hd_tp2 .search_input1 .search_btn").hover(function() {
                $(".new_edition_hd .hd_tp2 .search_input1").addClass("hover")
            }, function() {
                $(".new_edition_hd .hd_tp2 .search_input1").removeClass("hover")
            });
            $(".navbar .nav-left li").hover(function() {
                $(this).addClass("hover")
            }, function() {
                $(this).removeClass("hover")
            });
            $(".border-outer").hover(function() {
                $(this).addClass("hover")
            }, function() {
                $(this).removeClass("hover")
            });
            $(".dealItem").hover(function() {
                $(this).addClass("hover");
                $(this).find(".deal-businessArea").show()
            }, function() {
                $(this).removeClass("hover");
                $(this).find(".deal-businessArea").hide()
            });
            $(".priceArea").hover(function() {
                $(this).find(".priceUl").show()
            }, function() {
                $(this).find(".priceUl").hide()
            });
            (function() {
                var a = $("#top_drop_down li"),
                    b = $("#drop_down .nhd_a").parent().next();
                (function(a, b) {
                    a.each(function(c) {
                        $(this).hover(function() {
                            a.eq(c).addClass("nhd_hover");
                            a.eq(c).find(".nhd_a").parent().next().show()
                        }, function() {
                            a.eq(c).removeClass("nhd_hover");
                            b.hide()
                        })
                    })
                })(a,
                        b)
            })();
            (function() {
                var a = $(".nav_right_hover_con");
                a.hover(function() {
                    a.addClass("nav_right_hover")
                }, function() {
                    a.removeClass("nav_right_hover")
                })
            })()
        },
        clicks: function() {
            (function() {
                function a(a, d) {
                    if (a[0]) {
                        var e = a.find("ul").height();
                        a.hasClass("selAll") && 45 < e ? d.css("display", "block") : d.css("display", "none");
                        d.click(function() {
                            $(this).hasClass("opened") ? ($(this).text("\u66f4\u591a").removeClass("opened"), a.addClass("selAll")) : ($(this).text("\u6536\u8d77").addClass("opened"), a.removeClass("selAll"))
                        })
                    }
                }
                a($("#areaUl"), $(".moreArea-new"));
                a($("#commodityList"), $(".commodityMore"));
                a($("#brandList"), $(".brandMore"))
            })();
            (function() {
                function a(c, a, b) {
                    var d = $(c);
                    if ("undefined" != typeof search_page && !0 === search_page && ("#search_blr" == c || "#dy_blr1" == c)) return d.css("color", b.input), !1;
                    "" == d.val() && d.val(a);
                    b.blur ? d.css("color", b.blur) : d.css("color", "#808080");
                    d.focus(function() {
                        d.val() == a && (d.val(""), b.input ? d.css("color", b.input) : d.css("color", "#000000"))
                    }).blur(function() {
                        "" == d.val() && (d.val(a), b.blur ?
                            d.css("color", b.blur) : d.css("color", "#808080").css("font-weight", ""))
                    });
                    "" != d.val() && d.val() != a && (b.input ? d.css("color", b.input) : d.css("color", "#000000"))
                }

                function b(c, a, b) {
                    c = $("#" + c);
                    d(a, b) && ($(b).val().split("@"), a = c.serialize(), $.post("/subscribe/add", a, function(c) {
                        alert(c.msg)
                    }, "json"))
                }

                function d(c, a) {
                    var b = c || N.Lang.subscribe.defaultValue;
                    if (/^\s*$/.test($(a).val()) || $(a).val() == b) return alert("\u8bf7\u8f93\u5165\u60a8\u7684Email\u5730\u5740\uff01"), !1;
                    if (/^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test($(a).val())) return $("#city:visible")[0] &&
                        "" == $.trim($("#city:visible").val()) ? (alert("\u8bf7\u586b\u5199\u60a8\u7684\u57ce\u5e02\uff01"), !1) : !0;
                    alert("\u9519\u8bef\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u54e6\uff01");
                    return !1
                }
                $(".search_input").each(function() {
                    var c = this;
                    $(this).find(".s_btn").click(function() {
                        var a = $(c).find(".s_txt"),
                            b = $(c).find(".s_txt").val(),
                            b = $.trim(b);
                        "" == b && a.val("")
                    })
                });
                $(".search_input1").each(function() {
                    var c = this;
                    $(this).find(".search_btn").click(function() {
                        var a = $(c).find(".search_txt"),
                            b = $(c).find(".search_txt").val(),
                            b = $.trim(b);
                        "" == b && a.val("")
                    })
                });
                var e = {
                    blur: "#8e8e8e",
                    input: "#000000"
                };
                a("#dy_blr", $("#dy_blr").attr("defaulvalue") || "", e);
                a("#dy_blr1", $("#dy_blr1").attr("defaulvalue") || "", e);
                a("#search_blr", $("#search_blr").attr("defaultvalue") || "", e);
                a("#e_mail", "\u8f93\u5165\u90ae\u7bb1\uff0c\u8ba2\u9605\u767e\u5ea6\u7cef\u7c73\u56e2\u8d2d\u4fe1\u606f", e);
                (function(c, a) {
                    var d = $("#" + c),
                        e = $("#" + c + ' input[name="email"]');
                    d.submit(function() {
                        b(c, a, e);
                        return !1
                    })
                })("emailSubscribeForm_new", "\u8f93\u5165\u90ae\u7bb1\uff0c\u8ba2\u767e\u5ea6\u7cef\u7c73\u56e2\u8d2d\u4fe1\u606f");
                $("#sub_dyour").hover(function() {
                    $(this).toggleClass("dy_sep")
                }, function() {
                    $(this).toggleClass("dy_sep")
                })
            })();
            (function() {
                $("#ft_nav")[0] && function() {
                    function a() {
                        for (var c = 0, a = d.length; c < a; c += 1)
                            if (d[c].className = "", e[c].className = "", d[c] == this) d[c].className = "current", e[c].className = "links_current"
                    }
                    if ($("#ft_nav").find("li")[0]) {
                        $("#ft_nav").find("li").eq(0).addClass("current");
                        $("#ft_nav").find("div").eq(0).addClass("links_current");
                        $("#ft_nav ul").children().is("li") || $("#ft_nav").hide();
                        var b =
                            document.getElementById("ft_nav"),
                            d = b.getElementsByTagName("ul")[0].getElementsByTagName("li"),
                            e = b.getElementsByTagName("div");
                        (function() {
                            for (var c = 0, b = d.length; c < b; c += 1) 49 < $("#ft_nav").find("div").eq(c).height() && ($("#ft_nav").find("div").eq(c).css("height", "50px"), $("#ft_nav").find("div").eq(c).append("<span class='more-links'>\u66f4\u591a</span>")), $("#ft_nav").find("div").eq(c).find(".more-links").toggle(function() {
                                    $(this).parent().css("height", "100%");
                                    $(this).html("\u6536\u8d77");
                                    $(this).addClass("more-links1")
                                },
                                function() {
                                    $(this).parent().css("height", "50px");
                                    $(this).html("\u66f4\u591a");
                                    $(this).removeClass("more-links1")
                                }), d[c].onclick = a
                        })()
                    }
                }()
            })()
        },
        horizontalScroll: function() {
            (function() {
                function a() {
                    $("#switchLi li:lt(3)").clone().insertAfter($("#switchLi li").last());
                    $("#switchLi").animate({
                        marginLeft: e
                    }, d, null, function() {
                        $("#switchLi").css("margin-left", 0);
                        $("#switchLi li:lt(3)").remove()
                    })
                }
                if (!(6 >= $("#switchLi li").length)) {
                    var b = 158 * ($("#switchLi li").length + 3),
                        d = 1500;
                    $("#switchLi").css("width",
                        b);
                    setTimeout(function() {
                        $("#switchLi li img").each(function() {
                            var c = $(this);
                            "undefined" != typeof c.attr("imgsrc") && c.attr("src", c.attr("imgsrc")).removeAttr("imgsrc")
                        });
                        $("#switchLi")[0] && setInterval(a, 6E3)
                    }, 6E3);
                    var e = -474
                }
            })()
        }
    }
})();
N.namespace("Connect");
(function() {
    N.Connect = {
        renren: function() {
            origURL = "?origURL=" + encodeURIComponent(window.location.href);
            window.location = "http://login.nuomi.com/account/connect/renren" + origURL + "";
            return !1
        },
        lotteryRenren: function() {
            if (-1 == $(".nhd_sp a").text().indexOf("\u9000\u51fa")) return connectToLocal(), !1;
            var a = "?origURL=" + encodeURIComponent(window.location.href) + "&source=lottery&tinyurl=" + $("#lotteryTinyURL").text();
            setTimeout(function() {
                $.getScript("http://static.connect.renren.com/js/v1.0/FeatureLoader.jsp",
                    function() {
                        XN_RequireFeatures(["Connect"], function() {
                            XN.Main.init("ca682808888647fbb86f1bf4b1331b9d", "/xd_receiver.html");
                            XN.Connect.requireSession(function() {
                                setTimeout(function() {
                                    var b = null;
                                    false || (b = (new N.UI.dialog({
                                        closeButton: !0,
                                        width: 600,
                                        height: 420,
                                        HTML: '<div id="ui_dialog_container"><div id="ui_dialog_header"></div><div id="ui_dialog_body"></div><div id="ui_dialog_footer"></div></div>',
                                        overlay: !0,
                                        clickClose: !1
                                    })).setBody('<div class="sina-pop"><iframe id="sinaFrame" name="sinaFrame" frameborder="0" scrolling="no" style="height:420px; width:600px;" src="http://login.nuomi.com/account/connect/lottery/renren' +
                                        a + '" ></iframe><a href="javascript:;" class="close" id="RenrenPopClose" style=" position:absolute;top:140px;left:470px;">\u5173\u95ed</a><a href="javascript:;" class="close" id="Renrenqd" style=" border:0px solid red; display:inline-block; width:55px; height:23px; position:absolute;top:250px;left:435px;">&nbsp;</a></div>'), b.header.hide());
                                    b.show();
                                    $("#RenrenPopClose").click(function() {
                                        b.hide()
                                    });
                                    $("#Renrenqd").click(function() {
                                        b.hide()
                                    });
                                    return !1
                                }, 10)
                            })
                        })
                    })
            }, 50)
        },
        lotterySina: function() {
            if (-1 == $(".nhd_sp a").text().indexOf("\u9000\u51fa")) return connectToLocal(), !1;
            var a = "?origURL=" + encodeURIComponent(window.location.href) + "&source=lottery&tinyurl=" + $("#lotteryTinyURL").text(),
                b = null,
                b = (new N.UI.dialog({
                    closeButton: !0,
                    width: 600,
                    height: 420,
                    HTML: '<div id="ui_dialog_container"><div id="ui_dialog_header"></div><div id="ui_dialog_body"></div><div id="ui_dialog_footer"></div></div>',
                    overlay: !0,
                    clickClose: !1
                })).setBody('<div class="sina-pop"><iframe id="sinaFrame" name="sinaFrame" frameborder="0" scrolling="no" style="height:420px; width:600px;" src="http://login.nuomi.com/account/connect/sina' +
                    a + '" ></iframe><a href="javascript:;" class="close" style="color:black; opacity:0.3; " id="sinaPopClose">x</a><a href="javascript:;" class="close" id="sinaPopqd" style=" border:0px solid red; display:inline-block; width:55px; height:23px; position:absolute;top:250px;left:435px;">&nbsp;</a><a href="javascript:;" class="close" id="sinaqx"  style=" border:0px solid pink; display:inline-block; width:55px; height:23px; *margin:-2px -2px 0px 5px9; *background:url(http://nuomi.xnimg.cn/img/popqx-1.jpg) no-repeat9; background-repeat:no-repeat; position:absolute;top:325px;left:410px;"></a></div>');
            b.header.hide();
            b.show();
            lotterySinaDiv = b;
            sinaPopCloseDiv = $("#sinaPopClose");
            $("#sinaPopClose").click(function() {
                b.hide()
            });
            $("#sinaPopqd").click(function() {
                b.hide()
            });
            $("#sinaqx").click(function() {
                b.hide()
            });
            return !1
        },
        sina: function() {
            origURL = "?origURL=" + encodeURIComponent(window.location.href);
            window.location = "http://login.nuomi.com/account/connect/sina" + origURL + "";
            return !1
        },
        c360: function() {
            origURL = "?origURL=" + encodeURIComponent(window.location.href);
            window.location = "http://login.nuomi.com/account/connect/360" +
                origURL + "";
            return !1
        },
        baidu: function() {
            origURL = "?origURL=" + encodeURIComponent(window.location.href);
            window.location = "http://login.nuomi.com/account/connect/baidu" + origURL + "";
            return !1
        },
        alipay: function() {
            origURL = "?origURL=" + encodeURIComponent(window.location.href);
            window.location = "http://login.nuomi.com/account/connect/alipay" + origURL + "";
            return !1
        },
        cm: function() {
            origURL = "?origURL=" + encodeURIComponent(window.location.href);
            window.location = "http://login.nuomi.com/account/connect/chinaMobile" + origURL + "";
            return !1
        },
        qq: function() {
            origURL = "?origURL=" + encodeURIComponent(window.location.href);
            window.location = "http://login.nuomi.com/account/connect/qq" + origURL + "";
            return !1
        },
        local: function() {
            origURL = "?origURL=" + encodeURIComponent(window.location.href);
            window.location = "http://login.nuomi.com/account/login" + origURL + "";
            return !1
        }
    }
})();
N.namespace("DOM");
(function() {
    function a(a, e) {
        function c() {
            var c = h.outerHeight(),
                a = g.height(),
                b = Math.max(c, a);
            setTimeout(function() {
                $(f).hide();
                $(f).height(b);
                $(f).width("100%");
                $(f).show()
            }, 0)
        }
        var a = a || 0.3,
            e = e || 9999999,
            f = $("<div>");
        b = f;
        N.DOM.overlayElement = b;
        $(f).css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: a,
            background: "#000",
            "z-index": e
        }).html('<iframe width="100%" height="100%" frameBorder="0" style="position:absolute;top:0;left:0;z-index:1;"></iframe><div style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000000;z-index:2;"></div>').attr("tabindex",
            2);
        var h = $(document.body),
            g = $(window);
        c();
        $(window).bind("resize", function() {
            if (b && "none" != $(b).css("display")) try {
                c()
            } catch (a) {}
        });
        $("body").prepend(b)
    }
    var b = null;
    N.DOM = {
        disable: function(d) {
            b || a();
            d && $(document.body).css("overflow", "hidden")
        },
        enable: function() {
            b && (b.remove(), $(document.body).css("overflow", ""), b = null)
        },
        hoverColor: function() {
            if ($(".linkHoverBlue")[0]) {
                var a;
                $.each($(".linkHoverBlue"), function() {
                    a = $(this);
                    a.hover(function() {
                        $(this).addClass("linkHoverOn")
                    }, function() {
                        $(this).removeClass("linkHoverOn")
                    })
                })
            }
        },
        overlayElement: b
    }
})();
N.namespace("UI");
(function() {
    var a = 99999999,
        b = [];
    N.UI.dialog = function(c) {
        this.options = $.extend({
            left: null,
            top: null,
            offsetX: 0,
            offsetY: 0,
            width: 400,
            height: "auto",
            lock: !1,
            overlay: !0,
            closeButton: !1,
            HTML: "",
            useIframeInIE6: !0,
            clickClose: !0,
            fade: !0,
            scrollCenter: !1,
            onHide: function() {}
        }, c);
        b.push(this);
        var d = this;
        this.container = $("<div>");
        this.frame = $("<div>");
        this.frame.attr("class", "modelshowdialog");
        this.frame.append(this.container);
        $(document.body).prepend(this.frame);
        $(this.frame).css({
            position: "absolute",
            top: -9999,
            left: -9999,
            "z-index": a++,
            width: this.options.width,
            height: this.options.height
        });
        if ($.browser.msie && this.options.useIframeInIE6) c = $("<iframe></iframe>").attr("frameborder", 0).attr("scrolling", "no").css({
            position: "absolute",
            top: 0,
            left: 0,
            "z-index": -1,
            border: 0,
            opacity: 0,
            width: "100%",
            height: "100%"
        }), this.frame.append(c), this._iframe = c;
        "" != this.options.HTML ? $(this.container).append(this.options.HTML) : $(this.container).append(this.buildDOM);
        this.dialogContainer = $("#ui_dialog_container").removeAttr("id");
        this.header =
            $("#ui_dialog_header").removeAttr("id");
        this.body = $("#ui_dialog_body").removeAttr("id");
        this.footer = $("#ui_dialog_footer").removeAttr("id");
        this.closeButton = $("#ui_dialog_close").removeAttr("id");
        this.header.hide = function() {
            $(this).hide();
            return d
        };
        this.footer.hide = function() {
            $(this).hide();
            return d
        };
        this.options.closeButton ? $(this.closeButton).click(function() {
            d.hide()
        }) : $(this.closeButton).hide();
        this._hotKeyEvent = function(c) {
            c = c || window.event;
            code = c.keyCode;
            "27" == code && d.hide()
        };
        $(document).bind("keyup",
            d._hotKeyEvent);
        this._clickClose = function(c) {
            2 != c.button && d.hide()
        };
        this._scrollCenter = function() {
            setTimeout(function() {
                d.refresh()
            }, 100)
        }
    };
    N.UI.dialog.prototype = {
        header: null,
        body: null,
        footer: null,
        _iframe: null,
        _buttons: [],
        buildDOM: function() {
            return '<table id="ui_dialog_container" class="pop_dialog_table" style="width:100%;height:100%;border-collapse:collapse; margin:auto; table-layout:fixed;" ><tbody><tr><td style="background-color:#fff;padding-bottom:10px"><div style="background-color: #F9F9F9;border-bottom: 1px solid #EAEAEA;overflow: hidden;padding: 6px 0;zoom:1;"><div id="ui_dialog_header" style="float: left;font-size: 14px;font-weight: bolder;margin-left: 10px;overflow: hidden;_display:inline;"></div><a id="ui_dialog_close" onmouseover="this.style.backgroundPosition = \' -30px 0 \' " onmouseout="this.style.backgroundPosition = \' 0 0 \' " style="display:block;height:20px;width:20px;background:url(http://nuomi.xnimg.cn/image_new/close_icon1.png) no-repeat;float:right;text-indent:-9999em;outline:none;margin-right:10px;_display:inline;" href="###" >\u5173\u95ed</a></div><div id="ui_dialog_body" style="overflow:hidden;padding: 2px 6px 0;"></div><div id="ui_dialog_footer"></div></td></tr></tbody></table>'
        },
        setOffsetX: function(c) {
            $(this.frame).css("left", parseInt($(this.frame).css("left")) + c)
        },
        setOffsetY: function(c) {
            $(this.frame).css("top", parseInt($(this.frame).css("top")) + c)
        },
        setWidth: function(c) {
            $(this.frame).css("width", c);
            this.show();
            return this
        },
        setHeight: function(c) {
            $(this.frame).css("height", c);
            this.show();
            return this
        },
        resizeTo: function(c, a) {
            this.setWidth(c);
            this.setHeight(a);
            return this
        },
        addStyle: function(c) {
            $(this.dialogContainer).addClass(c);
            return this
        },
        show: function() {
            var c = this;
            $(this.frame).hide();
            var a, b;
            a = this.options.left || parseInt(($("body").width() - $(this.frame).width()) / 2);
            b = this.options.top || parseInt(($(window).height() - $(this.frame).height()) / 2 + $(window).scrollTop());
            a += this.options.offsetX;
            b += this.options.offsetY;
            this.moveTo(0 > a ? 0 : a, 0 > b ? 0 : b);
            this.options.overlay && N.DOM.disable();
            this.options.lock && N.DOM.disable(!0);
            this.options.fade && !$.browser.msie ? setTimeout(function() {
                $(c.frame).fadeIn(300)
            }, 0) : setTimeout(function() {
                $(c.frame).show()
            }, 0);
            this.options.clickClose && ($(document).bind("click",
                c._clickClose), $(this.frame).click(function(c) {
                c.stopPropagation()
            }));
            this.options.scrollCenter && $(window).bind("scroll", c._scrollCenter);
            $(window).resize(function() {
                c.refresh()
            });
            return this
        },
        hide: function() {
            var c = this;
            this.options.fade && !$.browser.msie ? $(this.frame).fadeOut(function() {
                $(c.frame).css({
                    left: -9999,
                    top: -9999
                });
                N.DOM.enable()
            }) : ($(this.frame).hide(), N.DOM.enable());
            $(document).unbind("click", c._clickClose);
            $(window).unbind("scroll", c._scrollCenter);
            this.options.onHide();
            return this
        },
        remove: function() {
            $(document).unbind("keyup", this._addHotKey);
            $(this.frame).remove();
            N.DOM.enable();
            $(document).unbind("click", this._clickClose);
            return this
        },
        moveTo: function(c, a) {
            /^\d+$/.test(c) && $(this.frame).css("left", c);
            /^\d+$/.test(a) && $(this.frame).css("top", a);
            return this
        },
        refresh: function() {
            var c, a;
            c = this.options.left || parseInt(($("body").width() - $(this.frame).width()) / 2);
            a = this.options.top || parseInt(($(window).height() - $(this.frame).height()) / 2 + $(window).scrollTop());
            c += this.options.offsetX;
            a += this.options.offsetY;
            this.moveTo(c, a)
        },
        setX: function(c) {
            moveTo(c);
            return this
        },
        setY: function(c) {
            moveTo(null, c);
            return this
        },
        setIndex: function(c) {
            $(this.frame).css("z-index", c);
            return this
        },
        setHeader: function(c) {
            this.header.append(c);
            return this
        },
        setBody: function(c) {
            this.body.append(c);
            return this
        },
        setFooter: function(c) {
            this.footer.append(c);
            return this
        },
        addButton: function(c) {
            var a = $("<input>").attr("type", "button").attr("class", "").addClass(c.className).val(c.text).click(function() {
                c.onclick()
            });
            this.footer.append(a);
            this._buttons.push(a);
            return this
        },
        getButton: function(c) {
            for (var a = this._buttons, b = a.length - 1; 0 <= b; b--)
                if ($(a[b]).val() == c || $(a[b]).text() == c) return a[b];
            return null
        },
        delButton: function(c) {
            $(this.getButton(c)).remove();
            return this
        }
    };
    var d = null;
    N.UI.alert = function(c) {
        d && d.remove();
        var a = {}, a = "string" != typeof c ? $.extend(a, c) : $.extend(a, {
                message: c
            }),
            a = $.extend(a, {
                fade: !1,
                clickClose: !1
            }),
            b = (new N.UI.dialog(a)).setHeader(a.title ? a.title : "\u63d0\u793a").setBody(a.message).addButton({
                text: a.yes ? a.yes : "\u786e\u5b9a",
                onclick: function() {
                    a.callback && a.callback();
                    b.hide()
                },
                className: ""
            }).show();
        setTimeout(function() {
            b.getButton("\u786e\u5b9a").focus()
        }, 0);
        return d = b
    };
    var e = null;
    N.UI.confirm = function(c, a) {
        e && e.remove();
        var b = {}, b = "string" != typeof c ? $.extend(b, c) : $.extend(b, {
                message: c,
                callback: a
            }),
            b = $.extend(b, {
                fade: !1,
                clickClose: !1
            }),
            d = (new N.UI.dialog(b)).setHeader(b.title ? b.title : "\u63d0\u793a").setBody(b.message).addButton({
                text: b.yes ? b.yes : "\u786e\u5b9a",
                onclick: function() {
                    (!b.callback || !b.callback(!0)) &&
                        d.hide()
                },
                className: ""
            }).addButton({
                text: b.no ? b.no : "\u53d6\u6d88",
                onclick: function() {
                    b.callback && b.callback(!1);
                    d.hide()
                },
                className: ""
            }).show();
        setTimeout(function() {
            d.getButton(b.yes ? b.yes : "\u786e\u5b9a").focus()
        }, 0);
        return e = d
    };
    N.UI.dialog_v = function(c) {
        this.options = $.extend({
            left: null,
            top: null,
            offsetX: 0,
            offsetY: 0,
            width: 400,
            height: "auto",
            lock: !1,
            overlay: !0,
            closeButton: !0,
            escClose: !0,
            HTML: "",
            useIframeInIE6: !0,
            clickClose: !0,
            fade: !0,
            scrollCenter: !1,
            closeCallback: function() {},
            onHide: function() {}
        }, c);
        b.push(this);
        var d = this;
        this.container = $('<div id="ui_dialog_bg">');
        this.frame = $("<div>");
        this.frame.attr("class", "modelshowdialog").attr("tabindex", 1);
        $(document.body).prepend(this.frame);
        $(this.frame).css({
            position: "absolute",
            top: -9999,
            left: -9999,
            "z-index": a++,
            width: this.options.width,
            height: this.options.height
        }).focus();
        if ($.browser.msie && this.options.useIframeInIE6) c = $("<iframe></iframe>").attr("frameborder", 0).attr("scrolling", "no").css({
            position: "absolute",
            top: 0,
            left: 0,
            "z-index": -1,
            border: 0,
            opacity: 0,
            filter: "Alpha(opacity=0)",
            width: "100%",
            height: "100%"
        }), this.frame.append(c), this._iframe = c;
        "" != this.options.HTML ? $(this.options.HTML).show().appendTo($(this.frame)) : (this.frame.append(this.container), $(this.container).append(this.buildDOM));
        this.dialogContainer = $("#ui_dialog_container");
        this.header = $("#ui_dialog_header");
        this.body = $("#ui_dialog_body");
        this.footer = $("#ui_dialog_footer");
        this.closeButton = $("#ui_dialog_close");
        this.header.hide = function() {
            $(this).hide();
            return d
        };
        this.footer.hide =
            function() {
                $(this).hide();
                return d
        };
        this.options.closeButton ? $(this.closeButton).click(function() {
            d.hide();
            d.options.closeCallback()
        }) : $(this.closeButton).hide();
        this._hotKeyEvent = function(c) {
            c = c || window.event;
            code = c.keyCode;
            "27" == code && d.hide()
        };
        this.options.escClose && this.frame.bind("keyup", d._hotKeyEvent);
        this._clickClose = function(c) {
            2 != c.button && d.hide()
        };
        this._scrollCenter = function() {
            setTimeout(function() {
                d.refresh()
            }, 100)
        }
    };
    N.UI.dialog_v.prototype = {
        header: null,
        body: null,
        footer: null,
        _iframe: null,
        _buttons: [],
        buildDOM: function() {
            return '<div id="ui_dialog_container"><div id="ui_dialog_title" class="clearFix"><div id="ui_dialog_header"></div><a id="ui_dialog_close" href="javascript:;" >&times;</a></div><div id="ui_dialog_body"></div><div id="ui_dialog_footer"></div></div>'
        },
        setOffsetX: function(c) {
            $(this.frame).css("left", parseInt($(this.frame).css("left")) + c);
            return this
        },
        setOffsetY: function(c) {
            $(this.frame).css("top", parseInt($(this.frame).css("top")) + c);
            return this
        },
        setWidth: function(c) {
            $(this.frame).css("width",
                c);
            this.show();
            return this
        },
        setHeight: function(c) {
            $(this.frame).css("height", c);
            this.show();
            return this
        },
        resizeTo: function(c, a) {
            this.setWidth(c);
            this.setHeight(a);
            return this
        },
        addStyle: function(c) {
            $(this.dialogContainer).addClass(c);
            return this
        },
        show: function() {
            var c = this,
                a, b;
            $(this.frame).hide();
            a = this.options.left || parseInt(($("body").width() - $(this.frame).width()) / 2);
            b = this.options.top || parseInt(($(window).height() - $(this.frame).height()) / 2 + $(window).scrollTop());
            a += this.options.offsetX;
            b += this.options.offsetY;
            a = this.dealLocation(a);
            b = this.dealLocation(b);
            this.moveTo(a, b);
            this.options.overlay && (N.DOM.disable(), this.options.escClose && N.DOM.overlayElement && N.DOM.overlayElement.bind("keyup", c._hotKeyEvent));
            this.options.lock && N.DOM.disable(!0);
            this.options.fade && !$.browser.msie ? setTimeout(function() {
                $(c.frame).fadeIn(300).focus()
            }, 0) : setTimeout(function() {
                $(c.frame).show().focus()
            }, 0);
            this.options.clickClose && ($(document).bind("click", c._clickClose), $(this.frame).click(function(c) {
                c.stopPropagation()
            }));
            this.options.scrollCenter &&
                $(window).bind("scroll", c._scrollCenter);
            $(window).resize(function() {
                c.refresh()
            });
            return this
        },
        hide: function() {
            var c = this;
            this.options.fade && !$.browser.msie ? $(this.frame).fadeOut(function() {
                $(c.frame).css({
                    left: -9999,
                    top: -9999
                });
                N.DOM.enable()
            }) : ($(this.frame).hide(), N.DOM.enable());
            $(document).unbind("click", c._clickClose);
            $(window).unbind("scroll", c._scrollCenter);
            this.options.onHide();
            return this
        },
        remove: function() {
            $(document).unbind("keyup", this._addHotKey);
            $(this.frame).remove();
            N.DOM.enable();
            $(document).unbind("click", this._clickClose);
            return this
        },
        moveTo: function(c, a) {
            /^\d+$/.test(c) && $(this.frame).css("left", c);
            /^\d+$/.test(a) && $(this.frame).css("top", a);
            return this
        },
        refresh: function() {
            var c, a;
            c = this.options.left || parseInt(($("body").width() - $(this.frame).width()) / 2);
            a = this.options.top || parseInt(($(window).height() - $(this.frame).height()) / 2 + $(window).scrollTop());
            c += this.options.offsetX;
            a += this.options.offsetY;
            c = this.dealLocation(c);
            a = this.dealLocation(a);
            this.moveTo(c, a)
        },
        setX: function(c) {
            moveTo(c);
            return this
        },
        setY: function(c) {
            moveTo(null, c);
            return this
        },
        setIndex: function(c) {
            $(this.frame).css("z-index", c);
            return this
        },
        setHeader: function(c) {
            $(this.header).append(c);
            return this
        },
        setBody: function(c) {
            "string" == typeof c && (c = $("<div>" + c + "</div>"));
            $(this.body).append(c.clone().html());
            return this
        },
        setFooter: function(c) {
            $(this.footer).append(c);
            return this
        },
        addButton: function(c) {
            var a = $("<a>").addClass(c.className).text(c.text).attr("href", "javascript:;").click(function() {
                c.onclick()
            });
            this.footer.append(a);
            this._buttons.push(a);
            return this
        },
        getButton: function(a) {
            for (var b = this._buttons, d = b.length - 1; 0 <= d; d--)
                if (b[d].val() == a || b[d].text() == a) return b[d];
            return null
        },
        delButton: function(a) {
            $(this.getButton(a)).remove();
            return this
        },
        dealLocation: function(a) {
            return 0 > a ? 0 : a
        }
    };
    d = null;
    N.UI.alert_v = function(a) {
        d && d.remove();
        var b = {}, b = "string" != typeof a ? $.extend(b, a) : $.extend(b, {
                message: a
            }),
            b = $.extend(b, {
                fade: !1,
                clickClose: !1,
                scrollCenter: !0
            }),
            e = (new N.UI.dialog_v(b)).setHeader(b.title ? b.title : "\u63d0\u793a").setBody(b.message).addButton({
                text: b.yes ? b.yes : "\u786e\u5b9a",
                onclick: function() {
                    b.callback && b.callback();
                    e.hide()
                },
                className: "dialog_confirm_ok"
            }).show();
        setTimeout(function() {
            e.getButton(b.yes ? b.yes : "\u786e\u5b9a").focus()
        }, 0);
        return d = e
    };
    e = null;
    N.UI.confirm_v = function(a, b) {
        e && e.remove();
        var d = {}, d = "string" != typeof a ? $.extend(d, a) : $.extend(d, {
                message: a,
                callback: b
            }),
            d = $.extend(d, {
                fade: !1,
                clickClose: !1,
                scrollCenter: !0
            }),
            g = (new N.UI.dialog_v(d)).setHeader(d.title ? d.title : "\u63d0\u793a").setBody(d.message).addButton({
                text: d.yes ? d.yes : "\u786e\u5b9a",
                onclick: function() {
                    g.hide();
                    d.callback && d.callback(!0)
                },
                className: "dialog_confirm_ok"
            }).addButton({
                text: d.no ? d.no : "\u53d6\u6d88",
                onclick: function() {
                    g.hide();
                    d.callback && d.callback(!1)
                },
                className: "dialog_confirm_cancel"
            }).show();
        setTimeout(function() {
            g.getButton(d.yes ? d.yes : "\u786e\u5b9a").focus()
        }, 0);
        return e = g
    };
    N.UI.emailSubscriber = function(a, b) {
        this.form = $("#" + a);
        this.defaultValue = b || "\u8f93\u5165Email\u5730\u5740";
        this.errorMsg = {
            emailBlank: "\u8bf7\u8f93\u5165\u60a8\u7684Email\u5730\u5740",
            emailError: "\u9519\u8bef\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u54e6",
            cityBlank: "\u8bf7\u586b\u5199\u60a8\u7684\u57ce\u5e02"
        };
        this.ipt = $("#" + a + ' input[name="email"]');
        this.emailAddress = {
            "163.com": "163",
            "126.com": "163",
            "gmail.com": "gmail",
            "qq.com": "qq",
            "vip.qq.com": "qq",
            "foxmail.com": "qq",
            "live.com": "live",
            "live.cn": "live",
            "hotmail.com": "live",
            "yahoo.com.cn": "yahoo",
            "yahoo.cn": "yahoo",
            "sina.com": "sina",
            "vip.sina.com": "sina",
            "sohu.com": "sohu",
            "139.com": "139"
        };
        this.init()
    };
    N.UI.emailSubscriber.prototype = {
        init: function() {
            var a = this;
            this.setDefaultValue();
            this.form.submit(function() {
                a.post();
                return !1
            })
        },
        setDefaultValue: function() {
            var a = this;
            this.ipt.val(this.defaultValue);
            this.ipt.focus(function() {
                $(this).val() == a.defaultValue && $(this).val("").css("color", "#333").css("font-weight", "bold")
            }).blur(function() {
                "" == $(this).val() && $(this).val(a.defaultValue).css("color", "").css("font-weight", "")
            })
        },
        post: function() {
            var a = this;
            if (this.check()) {
                var b = this.emailAddress[this.ipt.val().split("@")[1]],
                    d = this.form.serialize();
                $.post("/subscribe/add", d, function(d) {
                    0 == d.code ? N.UI.alert_v({
                        title: "\u8ba2\u9605\u6210\u529f",
                        message: '<div class="subs-alert">\t<div class="subs-succ"><h3>' + d.msg + '</h3></div>\t<div class="subs-tip">\t\t<p>\u4f60\u53ef\u80fd\u6536\u4e0d\u5230\u8ba2\u9605\u90ae\u4ef6</p>\t\t<p>\u8bf7\u5c06info@nuomi.com \u52a0\u5165\u90ae\u7bb1\u767d\u540d\u5355</p>\t\t<p><strong><a href="http://www.' + N.Evn.domain + "/help/email/" + (b ? b : "other") + '" target="_blank">\u7acb\u5373\u8fdb\u884c\u8bbe\u7f6e&raquo;</a></strong></p>\t</div></div>',
                        overlay: !0,
                        closeButton: !0,
                        onHide: function() {
                            a.ipt.focus()
                        }
                    }).footer.empty() :
                        N.UI.alert_v({
                            title: "<h3>\u767e\u5ea6\u7cef\u7c73\u63d0\u793a</h3>",
                            message: '<p style="text-align:center; font-size:14px;"><span style="background:url(http://nuomi.xnimg.cn/img/icon/smile.png?v=20100629) no-repeat left center; display:inline-block; padding:25px 0 25px 35px; ">' + d.msg + "</span></p>",
                            overlay: !0,
                            closeButton: !0,
                            onHide: function() {
                                a.ipt.focus()
                            }
                        })
                }, "json")
            }
        },
        check: function() {
            var a = this;
            if ($.func.isBlank(a.ipt.val()) || a.ipt.val() == a.defaultValue) return N.UI.alert_v({
                title: "<h3>\u767e\u5ea6\u7cef\u7c73\u63d0\u793a</h3>",
                message: '<p style="text-align:center; font-size:14px;"><span style="background:url(http://nuomi.xnimg.cn/img/icon/smile.png?v=20100629) no-repeat left center; display:inline-block; padding:25px 0 25px 35px; ">' + a.errorMsg.emailBlank + "</span></p>",
                overlay: !0,
                closeButton: !0,
                onHide: function() {
                    a.ipt.focus()
                }
            }), !1;
            if ($.func.isEmail(a.ipt.val())) return $("#city:visible")[0] && "" == $.trim($("#city:visible").val()) ? (N.UI.alert_v({
                title: "<h3>\u767e\u5ea6\u7cef\u7c73\u63d0\u793a</h3>",
                message: '<p style="text-align:center; font-size:14px;"><span style="background:url(http://nuomi.xnimg.cn/img/icon/smile.png?v=20100629) no-repeat left center; display:inline-block; padding:25px 0 25px 35px; ">' + a.errorMsg.cityBlank + "</span></p>",
                overlay: !0,
                closeButton: !0,
                onHide: function() {
                    a.ipt.focus()
                }
            }), !1) : !0;
            N.UI.alert_v({
                title: "<h3>\u767e\u5ea6\u7cef\u7c73\u63d0\u793a</h3>",
                message: '<p style="text-align:center; font-size:14px;"><span style="background:url(http://nuomi.xnimg.cn/img/icon/fail.png?v=20100629) no-repeat left center; display:inline-block; padding:25px 0 25px 35px; ">' + a.errorMsg.emailError + "</span></p>",
                overlay: !0,
                closeButton: !0,
                onHide: function() {
                    a.ipt.focus()
                }
            });
            return !1
        }
    };
    N.UI.fillChit =
        function() {
            $.post("/misc/giftcard/fill?jsonbca=1")
    };
    N.UI.addTimer = function(a, b, d) {
        var e = $("#serverTime").val();
        if (!e || e < a.getTime() || e > b.getTime()) return !1;
        if (isNaN(a) || isNaN(b)) throw "\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e";
        d && d()
    };
    N.UI.changeLogo = function(a) {
        $(".logo_body .home").css("background-image", "url(" + a + ")")
    };
    N.UI.changeFooterTime = function() {
        $("<dd>\u6625\u8282\u671f\u95f4\u670d\u52a1\u65f6\u95f4\u8c03\u6574</dd><dd>\u9664\u5915\u81f3\u521d\u4e09 11:00-16:00</dd><dd>\u521d\u56db\u81f3\u521d\u4e03 10:00-17:00</dd>").insertBefore($(".f_mobile_entry"));
        $(".footer_new .ft_main .sp dd").css({
            "text-align": "left"
        });
        $(".footer_new .ft_main").css({
            height: "270px"
        });
        $(".footer_new .ft_main .sp").css({
            background: "url(http://nuomi.xnimg.cn/vone/img/timeBg.png) no-repeat 160px 65px"
        })
    }
})();
N.namespace("countDown");
(function() {
    N.countDown = function(a) {
        if (null == a.startTime) throw "args:startTime is null";
        if (null == a.endTime) throw "args:endTime is null";
        this.startTime = a.startTime.constructor == Date ? a.startTime.getTime() : a.startTime;
        this.endTime = a.endTime.constructor == Date ? a.endTime.getTime() : a.endTime;
        this.callback = a.callback || new Function;
        this.startCount()
    };
    N.countDown.prototype = {
        startCount: function() {
            var a = this.startTime,
                b = this.endTime,
                d = this.callback,
                e = setInterval(function() {
                    a += 1E3;
                    if (a > b) clearInterval(e);
                    else {
                        var c =
                            (b - a) / 1E3,
                            f = parseInt(c / 3600 / 24),
                            h = parseInt((c - 86400 * f) / 3600),
                            g = parseInt((c - 86400 * f - 3600 * h) / 60),
                            c = parseInt(c - 86400 * f - 3600 * h - 60 * g);
                        d(f, h, g, c);
                        a + 1E3 > b && window.location.reload()
                    }
                }, 1E3)
        }
    }
})();
N.namespace("navShoppingCart");
(function() {
    N.navShoppingCart = {
        hover: function() {
            if ($("#shoppingCartNav")[0]) {
                var a = !0;
                $("#shoppingCartNav").hover(function() {
                    $(this).addClass("shcn_hover");
                    a && N.navShoppingCart.dynamicHtml($(this));
                    a = !1
                }, function() {
                    $(this).removeClass("shcn_hover")
                })
            }
        },
        dynamicHtml: function(a) {
            var b = a.find("i");
            $.get("/cart/deals", function(d) {
                var e = "";
                if (0 == d.code) {
                    if (0 == d.count) e = "<p>\u6682\u65f6\u6ca1\u6709\u5546\u54c1</p>", b.hasClass("shn_icon") && b.removeClass("shn_icon");
                    else {
                        for (var e = "<ol>", c = 0; c < d.data.length; c++) e +=
                            '<li><div class="fl_left"><a href="' + d.data[c].url + '" target="_blank"><img src="' + d.data[c].imgUrl + '"/></a></div><div class="record_deal_infor fl_right"><h3><a href="' + d.data[c].url + '" target="_blank">' + d.data[c].title + '</a></h3><div class="clearfix"><strong>\u00a5' + d.data[c].price + '</strong><a href="javascript:;" class="st_del" dealid="' + d.data[c].dealId + '">\u5220\u9664</a></div></div></li>';
                        e += '</ol><div class="goto_shopping_cart">';
                        5 < d.count && (e += '<p>\u8d2d\u7269\u8f66\u91cc\u8fd8\u6709<strong class="then_count">' +
                            (d.count - 5) + "</strong>\u4e2a\u56e2\u8d2d</p>");
                        e += '<div><a href="/cart/list" target="_blank">\u67e5\u770b\u6211\u7684\u8d2d\u7269\u8f66</a></div></div>'
                    }
                    a.find(".shopping_cart_record").html(e);
                    5 < d.count && a.find("ol").addClass("olh");
                    a.find("li").each(function() {
                        $(this).hover(function() {
                            $(this).addClass("hover")
                        }, function() {
                            $(this).removeClass("hover")
                        })
                    });
                    N.navShoppingCart.removeList(a)
                }
            }, "json")
        },
        removeList: function(a) {
            a.find(".st_del").each(function() {
                var b = $(this),
                    d = b.attr("dealid");
                b.click(function() {
                    $.post("/cart/deals/" +
                        d + "/del", function(d) {
                            0 == d.code && (a.find("i").text(d.count), b.parents("li").eq(0).fadeOut(), 5 < d.count ? a.find(".then_count").text(d.count - 5) : 0 == d.count ? (a.find(".shopping_cart_record").html("<p>\u6682\u65f6\u6ca1\u6709\u5546\u54c1</p>"), a.find("i").removeClass("shn_icon")) : (a.find(".then_count").parents("p").remove(), a.find("ol").removeClass("olh")))
                        }, "json")
                })
            })
        }
    }
})();
jQuery(function() {
    N.Func.lazyload();
    N.Widget.goToTop();
    N.Widget.browsingHistory();
    N.Widget.favorite();
    N.Widget.mobileUploadEntry();
    N.Evn.clicks();
    N.Evn.hovers();
    N.DOM.hoverColor();
    N.Widget.shareIm();
    N.navShoppingCart.hover();
    N.UI.fillChit();
    N.Widget.businessTip($("#reopen_deal_tips"))
});
jQuery(function() {
    window.connectToRR = N.Connect.renren;
    window.connectToSina = N.Connect.sina;
    window.connectLotterySina = N.Connect.lotterySina;
    window.connectLotteryRenren = N.Connect.lotteryRenren;
    window.connectTo360 = N.Connect.c360;
    window.connectToBaidu = N.Connect.baidu;
    window.connectToAlipay = N.Connect.alipay;
    window.connectToCM = N.Connect.cm;
    window.connectToQQ = N.Connect.qq;
    window.connectToLocal = N.Connect.local
});
jQuery(function() {
    $(".gf_map .gf_mp .zoommap").bind({
        mouseenter: function() {
            $(this).children(".t")[0] || $("<span class='t' onclick=\"_gaq.push(['_trackEvent', 'map-pic', 'click_map-pic', 'map-pic'])\"></span>").appendTo($(this))
        },
        mouseleave: function() {
            $(".t").remove()
        }
    });
    window.refreshDialog = null;
    $(".zoommap").live("click", function() {
        refreshDialog = (new N.UI.dialog({
            closeButton: !0,
            width: 980,
            overlay: !0,
            fade: !1,
            scrollCenter: !0
        })).setHeader("<h4>\u67e5\u770b\u5168\u56fe</h4>").setBody('<iframe frameborder="0" scrolling="no" style="height:480px; width:980px;" src="http://bj.nuomi.com/mapv3?dealId=' +
            $(this).attr("dealId") + "&merchantId=" + ($(this).attr("merchantId") || 0) + "&nuzoom=" + ($(this).attr("nuzoom") || 0) + "&areaId=" + ($(this).attr("areaId") ? $(this).attr("areaId") : "") + '"></iframe>').show();
        return !1
    });
    $("#viewMap").bind({
        mouseenter: function() {
            $(this).children(".t")[0] || $("<span class='t'></span>").appendTo($(this))
        },
        mouseleave: function() {
            $(".t").remove()
        }
    });
    window.cinaDialog = null;
    $(".viewMap").live("click", function() {
        cinaDialog = (new N.UI.dialog({
            closeButton: !0,
            width: 980,
            overlay: !0,
            fade: !1,
            scrollCenter: !0
        })).setHeader("<h4>\u67e5\u770b\u5168\u56fe</h4>").setBody('<iframe frameborder="0" scrolling="no" style="height:480px; width:980px;" src="/dianying/mapv3?cinemaId=' +
            $(this).attr("cinemaId") + '"></iframe>').show();
        return !1
    })
});
jQuery(function() {
    if ($(".NM-map")[0]) window.refreshDialog = null, $(".NM-map").live("click", function() {
        refreshDialog = (new N.UI.dialog({
            closeButton: !0,
            width: 750,
            overlay: !0,
            fade: !1,
            scrollCenter: !0
        })).setHeader("<h4>\u67e5\u770b\u5168\u56fe</h4>").setBody('<iframe frameborder="0" scrolling="no" style="height:480px; width:960px;" src="' + $(this).attr("href") + '"></iframe>').show();
        return !1
    })
});
(function(a) {
    a.emailSubscriber = N.UI.emailSubscriber;
    a.func = N.Func
})(jQuery);

