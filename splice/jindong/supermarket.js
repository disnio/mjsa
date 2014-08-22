// hashmap cookie isie page settime regx
function(a) {
    if (void 0 === a.browser) {
        var b = navigator.userAgent.toLowerCase();
        a.browser = {
            version: (b.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
            safari: /webkit/.test(b),
            opera: /opera/.test(b),
            msie: /msie/.test(b) && !/opera/.test(b),
            mozilla: /mozilla/.test(b) && !/(compatible|webkit)/.test(b)
        }
    }
    a.browser.isIE6 = function() {
        return a.browser.msie && 6 == a.browser.version
    }, a.browser.isIE7 = function() {
        return a.browser.msie && 7 == a.browser.version
    }, a.browser.isIE8 = function() {
        return a.browser.msie && 8 == a.browser.version
    }, a.browser.isIE9 = function() {
        return a.browser.msie && 9 == a.browser.version
    }, a.browser.isIE10 = function() {
        return a.browser.msie && 10 == a.browser.version
    }, a.browser.isIE11 = function() {
        return a.browser.msie && 11 == a.browser.version
    }
}(jQuery),
function(a) {
    a.page = function() {}, a.page.doc = function() {
        return "BackCompat" == document.compatMode ? document.body : document.documentElement
    }, a.page.clientWidth = function() {
        return a.page.doc().clientWidth
    }, a.page.clientHeight = function() {
        return a.page.doc().clientHeight
    }, a.page.docWidth = function() {
        return Math.max(a.page.doc().clientWidth, a.page.doc().scrollWidth)
    }, a.page.docHeight = function() {
        return Math.max(a.page.doc().clientHeight, a.page.doc().scrollHeight)
    }, void 0 === a.contains && (a.contains = function(a, b) {
        return a.compareDocumentPosition ? !! (16 & a.compareDocumentPosition(b)) : a !== b && a.contains(b)
    })
}(jQuery);

var Countdown = {
    init: function(a, b) {
        return 0 > a ? !1 : (this.seconds = parseInt(a, 10), this.timer = null, this.callback = b || function() {}, this.loopCount(), void 0)
    },
    loopCount: function() {
        var a = this;
        this.timer = setInterval(function() {
            var b = a.formatSeconds(a.seconds);
            return a.callback(b), a.seconds <= 0 ? (clearInterval(a.timer), void 0) : (a.seconds--, void 0)
        }, 1e3)
    },
    formatSeconds: function(a) {
        var b = Math.floor(a / 86400),
            c = Math.floor(a % 86400 / 3600),
            d = Math.floor(a % 86400 % 3600 / 60),
            a = a % 86400 % 3600 % 60;
        return {
            d: b,
            h: c,
            m: d,
            s: a
        }
    }
};

function setCookieMills(b, c, e) {
    var d = new Date();
    d.setTime(d.getTime() + e);
    var a = window.document.domain.indexOf("360buy") >= 0 ? ".360buy.com" : ".jd.com";
    document.cookie = b + "=" + escape(c) + ";expires=" + d.toGMTString() + ";path=/;domain=" + a
}

function getCookie(b) {
    var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
    if (a != null) {
        return unescape(a[2])
    }
    return null
}

function deleteCookie(a) {
    var b = getCookie(a);
    if (b != null) {
        setCookieMills(a, "", -1)
    }
}

function appendJSONCookie(cookieName, key, wid, Mills) {
    var ns = eval("(" + getCookie(cookieName) + ")");
    if (ns == null || ns == "") {
        ns = new Object()
    }
    if (ns[key] == null) {
        ns[key] = ""
    }
    var pos = ns[key].indexOf(wid);
    if (pos < 0) {
        ns[key] = ns[key] + "," + wid
    }
    setCookieMills(cookieName, $.toJSON(ns), Mills)
}

function HashMap() {
    this.values = new Object()
}
HashMap.prototype.Set = function(key, value) {
    this.values[key] = value
};
HashMap.prototype.Get = function(key) {
    return this.values[key]
};
HashMap.prototype.Contains = function(key) {
    return this.values.hasOwnProperty(key)
};
HashMap.prototype.Remove = function(key) {
    delete this.values[key]
};

function SortedHashMap(IComparer, IGetKey) {
    this.IComparer = IComparer;
    this.IGetKey = IGetKey;
    this.a = new Array();
    this.h = new HashMap()
}
SortedHashMap.prototype.Add = function(key, value) {
    if (this.ContainsKey(key)) {
        this.Remove(key)
    }
    this.a.push(value);
    this.a.sort(this.IComparer);
    for (var i = 0; i < this.a.length; i++) {
        var key = this.IGetKey(this.a[i]);
        this.h.Set(key, i)
    }
};
SortedHashMap.prototype.Insert = function(value, maxlength) {
    for (var i = 0, l = this.a.length; i < l; i++) {
        if (this.a[i].s === value.s) {
            this.a.splice(i, 1);
            break
        }
    }
    if (this.a.length >= maxlength) {
        this.a.splice(maxlength - 1, 1)
    }
    this.a.unshift(value)
};
SortedHashMap.prototype.Get = function(key) {
    return this.a[this.h.Get(key)]
};
SortedHashMap.prototype.Count = function() {
    return this.a.length
};
SortedHashMap.prototype.Remove = function(key) {
    if (!this.h.Contains(key)) {
        return
    }
    var index = this.h.Get(key);
    this.a.splice(index, 1);
    this.h.Remove(key)
};
SortedHashMap.prototype.ContainsKey = function(key) {
    return this.h.Contains(key)
};
SortedHashMap.prototype.Clear = function() {
    this.a = new Array();
    this.h = new HashMap()
};
SortedHashMap.prototype.GetJson = function() {
    return $.toJSON(this.a)
};


function _SetTimeStamp()
{
    var t = new Date();
    var year = t.getUTCFullYear() + "";
    var month = t.getUTCMonth() + 1 < 10 ? "0" + (t.getUTCMonth() + 1) : (t.getUTCMonth() + 1) + "";
    var day = t.getUTCDate() < 10 ? "0" + t.getUTCDate() : t.getUTCDate() + "";
    var hour = t.getUTCHours() < 10 ? "0" + t.getUTCHours() : t.getUTCHours() + "";
    var minute = t.getUTCMinutes() < 10 ? "0" + t.getUTCMinutes() : t.getUTCMinutes() + "";
    var ts = "?ts=" + year + month + day + hour + minute;
    return ts;
}


//检查输入内容是否通过正则校验
TestRegExp: function (re, text)
{
    re = new RegExp(re);
    return re.test(text);
},
//验证输入内容是否为空(空字符串或只包含空格的字符串)
IsEmpty: function (x)
{
    return typeof x != "string" ?
         false : (x.trim() != "" ? false : true);
},
//验证输入内容是否全为数字(0-9)
IsNumber: function (x)
{
    return typeof x == "undefined" ?
        false : (isNaN(x.toString()) ? false : true);
},
//验证输入内容是否全为字母(a-Z)
IsLetter: function (x)
{
    if (typeof x == "undefined")
    {
        return false;
    }
    var re = /^[A-Za-z]+$/;
    return this.TestRegExp(re, x);
},
//验证输入内容是否为小写字母(a-z)
IsLowerCase: function (x)
{
    if (typeof x == "undefined")
    {
        return false;
    }
    var re = /^[a-z]+$/;
    return this.TestRegExp(re, x);
},
//验证输入内容是否为大写字母(A-Z)
IsUpperCase: function (x)
{
    if (typeof x == "undefined")
    {
        return false;
    }
    var re = /^[A-Z]+$/;
    return this.TestRegExp(re, x);
},
//验证输入内容是否为字符模式(数字、字母或下划线组成)
IsChar: function (x)
{
    if (typeof x == "undefined")
    {
        return false;
    }
    var re = /^\w+$/;
    return this.TestRegExp(re, x);
},
//验证输入内容是否为至少包含一个下划线的字符模式(数字、字母和下划线组成,必须有下划线)
IsCharUnderline: function (x)
{
    if (typeof x == "undefined")
    {
        return false;
    }
    var re = /^(\w*)(\_+)(\w*)$/;
    return this.TestRegExp(re, x);
},
//验证输入内容是否为电话号码的格式(<2至5位的数字区号->5至9位的数字号码)
IsTelephone: function (x)
{
    if (typeof x == "undefined")
    {
        return false;
    }
    var re = /^(\((\d{2,5})\)|\d{2,5})?(\s*)(-?)(\s*)(\d{5,9})$/;
    return this.TestRegExp(re, x);
},
//验证输入内容是否为手机号码的格式(前缀可能有一个“+86”,和以13X/15X/18X为开头的11位中国手机号码)
IsPhone: function (x)
{
    if (typeof x == "undefined")
    {
        return false;
    }
    var re = /^(\+86)?1[3,5,8](\d{9})$/;
    return this.TestRegExp(re, x);
},
//验证输入内容是否为身份证的格式(目前只支持中国1代或2代身份证)
IsIdentityCode: function (x)
{
    if (typeof x == "undefined")
    {
        return false;
    }
    var re = /^[1-9](\d{5})(([1-9]\d)|([1,2](\d{3})))(0[1-9]|1[0,2])(0[1-9]|[1,2]\d|3[0,1])(\d{3})([0-9Xx]+)$/;
    return this.TestRegExp(re, x);
},
//验证输入内容是否为电子邮件格式
IsEmail: function (x, limitSite)
{
    if (typeof limitsite == "undefined" || typeof limitSite != "string")
    {
        var re = /^(\w+)@((([A-Za-z0-9]+)\.)+)[A-Za-z]{2,4}$/g;
        return this.TestRegExp(re, x);
    }
    else
    {
        var re = new RegExp("^(\\w+)@" + limitsite + "$", "g");
        return this.TestRegExp(re, x);
    }
}