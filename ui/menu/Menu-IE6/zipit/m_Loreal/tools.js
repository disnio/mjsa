var BOX = {};

(function($) {


var W = this, D = this.document;
var html = $(D.documentElement || 'html');

var fnEmpty = function() {};
var onLoadIsDone = false;
BOX.onLoadIsDone = false;

$(W).load(function() {
    onLoadIsDone = true;
    BOX.onLoadIsDone = true;
});

// for in filter
var isOwnProperty = function(o, p) {
    return typeof o.constructor.prototype[p] == 'undefined';
};

BOX.isOwnProperty = isOwnProperty;

// get datas from HTML classes, eg. class="box:id:signOut"
var getStoreId = function(el, type) {
    type = type || 'id';
    var re = new RegExp('box:' + type + ':(\\S+)');
    if (el.className && el.className.indexOf('box:' + type + ':') > -1) {
        var store = el.className.match(re);
        if (store && store.length == 2) {
            return store[1];
        }
    }
    return null;
};

BOX.getStoreId = getStoreId;

// get datas from location hash
var getURLHash = function(id) {
    var hash = location.hash, s = '#' + id + ':';
    return (hash && hash.indexOf(s) > -1) ? hash.replace(s, '') : null;
};
BOX.getURLHash = getURLHash;

// extend a class
BOX.extend = function(sb, sp, members) {
    function addToPrototype(o) {
        for (var m in o) {
            if (isOwnProperty(o, m)) {
                sb.prototype[m] = o[m];
            }
        }
    }
    
    if (typeof sp == 'object') {
        addToPrototype(sp);
    } else {
        var F = function() {};
        F.prototype = sp.prototype;
        sb.prototype = new F();
        sb.prototype.constructor = sb;
        sb.superclass = sp.prototype;
        if (sp.prototype.constructor == Object.prototype.constructor) {
            sp.prototype.constructor = sp;
        }
        
        if (typeof members == 'object') {
            addToPrototype(members);
        }
    }
};

// Observable Class
BOX.Observable = function() {
    this.listeners = {};
};
BOX.Observable.prototype = {
    addEvents: function(events, listeners) {
        for (var i = 0, len = events.length; i < len; i++) {
            this.listeners[events[i]] = [];
        }
        if (typeof listeners == 'object') {
            for (var l in listeners) {
                if (isOwnProperty(listeners, l)) {
                    this.addListener(l, listeners[l].fn, listeners[l].scope);
                }
            }
        }
    },
    
    fireEvent: function(eventName) {
        if (typeof eventName == 'string') {
            var eventParts = eventName.split('.'), eplen = eventParts.length, epi = 0, partialEventName = '';
            var args = [{owner: this}];
            if (arguments.length > 1) {
                args = args.concat(Array.prototype.slice.call(arguments, 1));
            }
            if (eplen > 1) {
                args[0].namespace = eventName.replace(/^[^.]+\./, '').split('.');
            }
            for (; epi < eplen; epi++) {
                partialEventName += (partialEventName ? '.' : '') + eventParts[epi];
                var ls = this.listeners[partialEventName], len, li, i = 0;
                if (ls && (len = ls.length)) {
                    args[0].type = partialEventName;
                    for (; i < len; i++) {
                        li = ls[i];
                        li.fn.apply(li.scope, args);
                    }
                }
            }
        }
    },
    
    addListener: function(eventName, fn, scope) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        scope = scope || this;
        if (this.hasListener(eventName, fn, scope) == -1) {
            this.listeners[eventName].push({fn: fn, scope: scope});
        }
        return this;
    },
    
    addListeners: function(listeners) {
        if (typeof listeners == 'object') {
            for (var l in listeners) {
                if (isOwnProperty(listeners, l)) {
                    this.addListener(l, listeners[l].fn, listeners[l].scope);
                }
            }
        }
        return this;
    },
    
    removeListener: function(eventName, fn, scope) {
        if (this.listeners[eventName]) {
            scope = scope || this;
            var i;
            if ((i = this.hasListener(eventName, fn, scope)) > -1) {
                this.listeners[eventName].splice(i, 1);
            }
        }
        return this;
    },
    
    removeListeners: function(listeners) {
        if (typeof listeners == 'object') {
            for (var l in listeners) {
                if (isOwnProperty(listeners, l)) {
                    this.removeListener(l, listeners[l].fn, listeners[l].scope);
                }
            }
        }
        return this;
    },
    
    purgeListeners: function(eventName) {
        if (typeof eventName == 'string') {
            this.listeners[eventName] = [];
        } else {
            this.listeners = {};
        }
        return this;
    },
    
    hasListener: function(eventName, fn, scope) {
        scope = scope || this;
        var ls = this.listeners[eventName], len = ls.length, l, i = 0;
        for (; i < len; i++) {
            l = ls[i];
            if (l.fn == fn && l.scope == scope) {
                return i;
            }
        }
        return -1;
    }
};

// get page and viewport dimensions
var getDimensions = function() {
    var de = D.documentElement;
    return {
        'viewportW': $(W).width(),
        'viewportH': $(W).height(),
        'scrollW': W.pageXOffset || (de && de.scrollLeft) || D.body.scrollLeft,
        'scrollH': W.pageYOffset || (de && de.scrollTop) || D.body.scrollTop,
        'totalW': de.scrollWidth || W.body.scrollWidth,
        'totalH': de.scrollHeight || W.body.scrollHeight
    };
};
BOX.getDimensions = getDimensions;

// get the outerHTML of an element
var divForOuterHTML;
var getOuterHTML = function(el) {
    if (!el.outerHTML) {
        if (!divForOuterHTML) {
            divForOuterHTML = D.createElement('div');
        }
        divForOuterHTML.innerHTML = '';
        divForOuterHTML.appendChild(el);
        return divForOuterHTML.innerHTML;
    } else {
        return el.outerHTML;
    }
};
BOX.getOuterHTML = getOuterHTML;

/*
var config = {};
BOX.config = config;
*/

// Carousel Class
var config = {
    btnPrev: '<a href="#" class="{$btnPrevCls} {$btnDisabledCls}">' + l10n.prev + '</a>',
    btnPrevCls: 'prev',
    
    btnNext: '<a href="#" class="{$btnNextCls} {$btnDisabledCls}">' + l10n.next + '</a>',
    btnNextCls: 'next',
    
    btnDisabledCls: 'off',
    
    pagesWrap: '<div class="{$pagesWrapCls}"><ul>{$content}</ul></div>',
    pagesWrapCls: 'pagination',
    
    pagesItem: '<li{$pagesItemActiveCls}><a href="#">{$content}</a></li>',
    pagesItemActiveCls: 'on'
};

var carousel = {
    create: function(datas) {
        datas.id = datas.id || $(datas.element).getBoxDatas('id') || 'n' + (++counter);
        if(datas.id) {
            var id = 'carousel.' + datas.id;
            return uiCache[id] || (uiCache[id] = new Carousel(datas));
        }
    },
    
    destroy: function() {
        var i = arguments.length, id;
        while(i--) {
            id = 'carousel.' + arguments[i];
            if(uiCache[id]) {
                // @todo unbind before deleting
                delete uiCache[id];
            }
        }
    },
    
    configure: function(datas) {
        for(var i in datas) {
            if(datas.hasOwnProperty(i) && config[i] !== undefined) {
                config[i] = datas[i];
            }
        }
    }
};

var getBtnsHTML = function(type) {
    type = type == 'next' ? 'btnNext' : 'btnPrev';
    return config[type]
        .replace('{$' + type + 'Cls}', config[type + 'Cls'])
        .replace('{$btnDisabledCls}', config.btnDisabledCls);
};

var getPosition = function(carousel) {
    return parseInt(carousel.moveable.css(carousel.property), 10) || 0;
};

var getIndex = function(carousel, index) {
    if(isNaN(index)) {
        return 0;
    } else if(index < 0) {
        return index + carousel.length;
    } else if(index < carousel.length) {
        return index;
    } else {
        return index - carousel.length;
    }
};

var setCurrent = function(carousel, index) {
    carousel.current = getIndex(carousel, index);
    if(carousel.currentPage !== undefined) {
        var page = Math.ceil((carousel.current + carousel.display) / carousel.display);
        $('li', carousel.pagination)
            .eq(carousel.currentPage - 1)
                .removeClass(config.pagesItemActiveCls)
            .end()
            .eq(page - 1)
                .addClass(config.pagesItemActiveCls);
        carousel.currentPage = page;
    }
};

var prepareCircularMovePrev = function(carousel, index) {
    
    carousel.moving = true;
    
    var actualPos = getPosition(carousel);
    var futurePos = actualPos + carousel.moveBy * (carousel.current - index);
    var itemPos = parseInt(carousel.items.eq(carousel.current).css(carousel.property), 10);
    
    var min = index - (carousel.hasOffset && actualPos % carousel.moveBy ? 1 : 0);
    var max = carousel.current;
    var c, pos;
    
    for(var i = min; i < max; i++) {
        c = getIndex(carousel, i);
        pos = itemPos - (carousel.current - i) * carousel.moveBy;
        carousel.items.eq(c).css(carousel.property, pos + 'px');
    }
    
    setCurrent(carousel, index);
    moveToPosition(carousel, futurePos);
};

var prepareCircularMoveNext = function(carousel, index) {
    
    carousel.moving = true;
    
    var actualPos = getPosition(carousel);
    var futurePos = actualPos + (-carousel.moveBy * (index - carousel.current));
    var itemPos = parseInt(carousel.items.eq(carousel.current).css(carousel.property), 10) + carousel.display * carousel.moveBy;
    
    var min = carousel.current + carousel.display - (carousel.hasOffset && actualPos % carousel.moveBy ? 1 : 0);
    var max = index + carousel.display - (carousel.hasOffset && actualPos % carousel.moveBy ? 1 : 0);
    var c, pos;
    
    for(var i = min; i < max; i++) {
        c = getIndex(carousel, i);
        pos = itemPos + (i - carousel.display - carousel.current) * carousel.moveBy;
        carousel.items.eq(c).css(carousel.property, pos + 'px');
    }
    
    setCurrent(carousel, index);
    moveToPosition(carousel, futurePos);
};

var prepareMove = function(carousel, index) {
    
    carousel.moving = true;
    
    index = Math.min(index, carousel.length - carousel.display);
    if(carousel.buttons) {
        if(!index) {
            carousel.buttonPrev.addClass(config.btnDisabledCls);
            carousel.buttonNext.removeClass(config.btnDisabledCls);
        } else if(index == carousel.length - carousel.display) {
            carousel.buttonPrev.removeClass(config.btnDisabledCls);
            carousel.buttonNext.addClass(config.btnDisabledCls);
        } else {
            carousel.buttonPrev.removeClass(config.btnDisabledCls);
            carousel.buttonNext.removeClass(config.btnDisabledCls);
        }
    }
    
    setCurrent(carousel, index);
    moveToPosition(carousel, -carousel.moveBy * index);
};

var positionFirstElements = function(carousel, fromReposition) {
    var min = (carousel.hasOffset && carousel.offset) ? carousel.startAt - 1 : carousel.startAt;
    var max = min + carousel.length;
    var c, pos;
    for(var i = min; i < max; i++) {
        c = getIndex(carousel, i);
        carousel.items.eq(c).css(carousel.property, i * carousel.moveBy + 'px');
    }
};

var checkRepositionFirstElements = function(carousel, to) {
    if(carousel.circular && to == (-(carousel.length * carousel.moveBy) + carousel.offset)) {
        carousel.moveable.css(carousel.property, carousel.offset + 'px');
        positionFirstElements(carousel, true);
    }
};

var moveToPosition = function(carousel, to) {
    if(carousel.duration) {
        var p = {};
        p[carousel.property] = to;
        carousel.moveable.animate(p, carousel.duration, function() {
            checkRepositionFirstElements(carousel, to);
            carousel.moving = false;
        });
    } else {
        carousel.moveable.css(carousel.property, to + 'px');
        checkRepositionFirstElements(carousel, to);
        carousel.moving = false;
    }
};

var getPageNumber = function(carousel) {
    return Math.ceil(carousel.length / carousel.display);
};

var getPrevPageIndex = function(carousel) {
    var page = carousel.currentPage - 1;
    if(page < 1) {
        page = carousel.circular ? getPageNumber(carousel) : 1;
    }
    return page * carousel.display - carousel.display;
};

var getNextPageIndex = function(carousel) {
    var page = carousel.currentPage + 1;
    if(page > getPageNumber(carousel)) {
        page = carousel.circular ? 1 : getPageNumber(carousel);
    }
    return page * carousel.display - carousel.display;
};

var managePagination = function(e, carousel) {
    if(e.target.nodeName.toLowerCase() == 'a') {
        e.preventDefault();
        if(!carousel.moving) {
            carousel.moveToItem((Number(e.target.innerHTML) - 1) * carousel.display + 1);
        }
    }
};

var Carousel = function(datas) {
    this.initialize(datas);
};
BOX.extend(Carousel, BOX.Observable, {
    initialize: function(datas) {
        var that = this;
        
        that.id = datas.id;
        
        that.property = datas.horizontal ? 'left' : 'top';
        that.buttons = datas.buttons === false ? false : true;
        that.circular = !!datas.circular || false;
        that.duration = !isNaN(datas.duration) ? datas.duration : null;
        that.hasOffset = !!datas.hasOffset;
        
        that.element = $(datas.element);
        that.mask = datas.mask ? that.element.find(datas.mask) : that.element.children();
        that.moveable = datas.moveable ? that.mask.find(datas.moveable) : that.mask.children();
        that.items = datas.items ? that.moveable.find(datas.items) : that.moveable.children();
        
        that.length = that.items.length;
        that.display = datas.display;
        that.startAt = !isNaN(datas.startAt) ? datas.startAt - 1 : 0;
        // startAt must be >= 0 && < length
        if(that.startAt < 0 || that.startAt >= that.length) {
            that.startAt = 0;
        }
        
        that.offset = parseInt(that.moveable.css(that.property), 10) || 0;
        // negative offset are forbidden
        // if offset, length must be > display + 1
        // no offset possible on a non circular carousel
        // a paginated carousel cannot be circular (too strange)
        if(that.hasOffset && that.offset > 0 && that.length > that.display + 1) {
            ++that.display;
        }
        that.moveBy = that.items.eq(0)[that.property == 'top' ? 'outerHeight' : 'outerWidth'](true);
        
        setCurrent(that, that.startAt);
        
        if(that.property == 'left') {
            that.moveable.width(that.moveBy * that.length);
        }
        if(that.circular) {
            positionFirstElements(that);
        }
        
        if(that.length > that.display) {
            that.disabled = false;
            
            if(!that.circular && that.current > that.length - that.display) {
                that.current = that.length - that.display;
            }
            
            if(that.current) {
                that.moveable.css(that.property, -that.moveBy * that.current + that.offset);
                that.offset = -that.moveBy * that.current + that.offset;
            }
            
            if(that.buttons) {
                that.buttonNext = $(getBtnsHTML('next')).prependTo(that.element).click(function(e) {
                    that.moveNext(e);
                    e.preventDefault();
                });
                that.buttonPrev = $(getBtnsHTML('prev')).prependTo(that.element).click(function(e) {
                    that.movePrev(e);
                    e.preventDefault();
                });
                
                if(that.circular || that.current) {
                    that.buttonPrev.removeClass(config.btnDisabledCls);
                }
                if(that.circular || that.current + that.display < that.length) {
                    that.buttonNext.removeClass(config.btnDisabledCls);
                }
            }
            
            if(datas.paginate) {
                that.addPagination();
            }
        } else {
            that.disabled = true;
        }
    },
    
    movePrev: function() {
        if(!this.moving) {
            var index = !isNaN(this.currentPage) ? getPrevPageIndex(this) : this.current - 1;
            if(this.circular) {
                prepareCircularMovePrev(this, index);
            } else if(index > -1) {
                prepareMove(this, index);
            }
        }
    },
    
    moveNext: function() {
        if(!this.moving) {
            var index = !isNaN(this.currentPage) ? getNextPageIndex(this) : this.current + 1;
            if(this.circular) {
                prepareCircularMoveNext(this, index);
            } else if(index < this.length) {
                prepareMove(this, index);
            }
        }
    },
    
    moveToItem: function(i) {
        if(!this.moving && typeof i == 'number') {
            --i;
            if(this.items[i]) {
                if(this.currentPage) {
                    var page = Math.floor(i / this.display) + 1;
                    i = (page - 1) * this.display;
                }
                if(this.circular) {
                    if(i > this.current && i - this.current > this.length - i) {
                        i = i - this.length;
                    } else if(i < this.current && this.current - i > i + this.length - this.current) {
                        i = this.length + i;
                    }
                    if(i < this.current) {
                        prepareCircularMovePrev(this, i);
                    } else if(i > this.current) {
                        prepareCircularMoveNext(this, i);
                    }
                } else {
                    prepareMove(this, i);
                }
            }
        }
    },
    
    addPagination: function() {
        var that = this;
        var html = config.pagesWrap.replace('{$pagesWrapCls}', config.pagesWrapCls);
        var pages = getPageNumber(that);
        var startItem, endItem, items = '';
        for(var i = 1; i <= pages; i++) {
            startItem = (i - 1) * that.display;
            endItem = startItem + that.display - 1;
            if(that.startAt >= startItem && that.startAt <= endItem) {
                that.currentPage = i;
                items += config.pagesItem.replace('{$pagesItemActiveCls}', ' class="' + config.pagesItemActiveCls + '"');
            } else {
                items += config.pagesItem.replace('{$pagesItemActiveCls}', '');
            }
            items = items.replace(/{\$content}/g, i);
        }
        html = html.replace('{$content}', items);
        this.pagination = $(html).appendTo(that.element).click(function(e) {
            managePagination(e, that);
        });
    },
    
    removePagination: function() {
        this.pagination.unbind('click').remove();
    }
});

BOX.Carousel = Carousel;



// set configuration object
var setConfig = function(target, datas) {
    if (!config[target]) {
        config[target] = {};
    }
    for (var p in datas) {
        if (isOwnProperty(datas, p)) {
            config[target][p] = datas[p];
        }
    }
};

BOX.setConfig = function(target, datas) {
    setConfig(target, datas);
    return this;
};

// clear/restore values in text input
var clearTextFields = (function() {
    var reEmpty = /^\s*$/;
    
    var clearValue = function() {
        if (this.value == this.defaultValue) {
            this.value = '';
        }
    };
    
    var restoreValue = function() {
        if (reEmpty.test(this.value)) {
            this.value = this.defaultValue;
        }
    };
    
    return function(context) {
        context = context || D.body;
        $('input[type=text], input[type=password]', $(context)).focus(clearValue).blur(restoreValue);
    };
})();

BOX.clearTextFields = clearTextFields;

// SimpleDrag Class
var SimpleDrag = function(datas) {
    SimpleDrag.superclass.constructor.call(this);
    
    this.addEvents(['drag', 'start', 'end'], (datas) ? datas.listeners : null);
    
    this.initialize(datas);
};
BOX.extend(SimpleDrag, BOX.Observable, {
    initialize: function(datas) {
        var that = this;
        
        that.root = $(datas.root);
        that.handle = datas.handle ? $(datas.handle) : null;
        if (!that.handle || !that.handle.length) {that.handle = that.root;}
        
        that.setMinMax({
            minX: datas.minX,
            maxX: datas.maxX,
            minY: datas.minY,
            maxY: datas.maxY
        });
        that.sx = null;
        that.sy = null;
        
        that.handle.mousedown(function(e) {
            that.start(e);
        });
        $(D).mouseup(function(e) {
            that.end(e);
        });
    },
    
    setMinMax: function(datas) {
        if (typeof datas == 'object') {
            for (var p in datas) {
                if (isOwnProperty(datas, p)) {
                    this[p] = datas[p];
                }
            }
        }
        return this;
    },
    
    drag: function(e) {
        var y = e.pageY - this.sy, x = e.pageX - this.sx;
        if (this.minX !== undefined) {x = Math.max(x, this.minX);}
        if (this.maxX !== undefined) {x = Math.min(x, this.maxX);}
        if (this.minY !== undefined) {y = Math.max(y, this.minY);}
        if (this.maxY !== undefined) {y = Math.min(y, this.maxY);}
        this.root.css({
            'top': y +'px',
            'left': x +'px'
        });
        e.preventDefault();
        this.fireEvent('drag', x, y);
    },
    
    start: function(e) {
        var that = this;
        var x = parseInt(that.root.css('left'), 10) || 0;
        var y = parseInt(that.root.css('top'), 10) || 0;
        that.root.css('top', y + 'px');
        that.root.css('left', x + 'px');
        that.sx = e.pageX - x;
        that.sy = e.pageY - y;
        $(D).bind('mousemove.simpleDrag', function(e) {
            that.drag(e);
        });
        e.preventDefault();
        that.fireEvent('start');
    },
    
    end: function(e) {
        this.fireEvent('end');
        $(D).unbind('mousemove.simpleDrag');
    }
});

BOX.SimpleDrag = SimpleDrag;

// SimpleScroll Class
var SimpleScroll = function(datas) {
    SimpleScroll.superclass.constructor.call(this);
    
    this.addEvents(['beforeCompute', 'disable', 'enable'], (datas) ? datas.listeners : null);
    
    this.initialize(datas);
};
BOX.extend(SimpleScroll, BOX.Observable, {
    initialize: function(datas) {
        var that = this;
        
        this.scrollUnit = (typeof datas.scrollUnit == 'number') ? datas.scrollUnit : null;
        this.from = datas.from || 'top';
        this.postOnLoadCompute = false;
        
        datas.target.innerHTML = config.scroll.container.replace('%content%', datas.target.innerHTML);
        
        this.sParent = $(datas.target);
        this.sContent = this.sParent.children();
        
        if (datas.buttons) {
            this.sContainer = $(config.scroll.fullBar).appendTo(datas.targetScrollBar || datas.target);
            this.sUp = $('span.up', this.sContainer);
            this.sDown = $('span.down', this.sContainer);
        } else {
            this.sContainer = $(config.scroll.simpleBar).appendTo(datas.targetScrollBar || datas.target);
        }
        this.sFace = $('span.face', this.sContainer);
        
        var dragConfig = {
            root: this.sFace
        };
        var argNb = 2;
        if (this.from == 'top') {
            dragConfig.minX = 0;
            dragConfig.maxX = 0;
            dragConfig.minY = 0;
        } else {
            dragConfig.minX = 0;
            dragConfig.minY = 0;
            dragConfig.maxY = 0;
            argNb = 1;
        }
        
        this.drag = new SimpleDrag(dragConfig).addListener('drag', function(e, x, y) {
            var coord = arguments[argNb];
            if (coord == Math.round(that.sD)) {
                coord = that.sD;
            }
            var tFrom = Math.round(coord / that.sH * that.tH);
            that.sContent.css(that.from, - tFrom + 'px');
        });
        
        this.fireEvent('beforeCompute');
        
        this.compute();
        if ($('img', this.sParent).length && !onLoadIsDone) {
            $(W).load(function() {
                that.postOnLoadCompute = true;
                that.compute();
            });
        }
        
        this.sParent.bind('DOMMouseScroll', function(e) {that.wheel(e);}).bind('mousewheel', function(e) {that.wheel(e);});
        this.sContainer.click(function(e) {that.clickToPosition(e, this);});
        
        this.fireEvent('load');
    },
    
    checkForDisplayNone: function(el) {
        if (el) {
            if (!el.scrollHeight) {
                this.displayNone = $(el.parentNode);
                while (this.displayNone.parent().css('display') == 'none') {
                    this.displayNone = this.displayNone.parent();
                }
                this.displayNone.addClass('hideButDraw');
            }
        } else if (this.displayNone) {
            this.displayNone.removeClass('hideButDraw');
        }
    },
    
    enable: function() {
        this.sContent.removeClass('scrollNone').addClass('scrollContent');
        var max = {};
        if (this.from == 'top') {
            max.maxY = Math.round(this.sD);
        } else {
            max.maxX = Math.round(this.sD);
        }
        this.drag.setMinMax(max);
        var tFrom = this.getContentOffset();
        this.moveContentTo(tFrom);
        this.disabled = false;
        this.fireEvent('enable');
        this.sContainer.css('visibility', 'visible');
    },
    
    disable: function() {
        this.sContainer.css('visibility', 'hidden');
        this.sContent.removeClass('scrollContent').addClass('scrollNone');
        this.disabled = true;
        this.fireEvent('disable');
    },
    
    getContentOffset: function() {
        return parseInt(this.sContent.css(this.from), 10);
    },
    
    compute: function() {
        this.checkForDisplayNone(this.sContent[0]);
        
        var offsetFrom, dimension;
        if (this.from == 'top') {
            offsetFrom = 'offsetHeight';
            dimension = 'height';
        } else {
            offsetFrom = 'offsetWidth';
            dimension = 'width';
        }
        
        this.tH = this.sContent[0][offsetFrom];
        this.th = this.sParent[0][offsetFrom];
        this.tD = this.tH - this.th;
        
        this.sH = this.sContainer[0][offsetFrom];
        if (this.tH <= this.th) {
            this.sh = this.sH;
        } else {
            this.sh = this.th / this.tH * this.sH;
        }
        this.sD = this.sH - this.sh;
        
        if (!this.scrollUnit) {
            var unit = Math.ceil((this.sH - this.sh) / this.sH * this.sh);
            this.scrollUnit = (unit > 10) ? unit : 10;
        }
        
        this.sFaceOffset = this.sFace[0][offsetFrom] - this.sFace[dimension]();
        this.sFace.css(dimension, (Math.round(this.sh) - this.sFaceOffset) + 'px');
        
        this.offset = this.sContainer.offset()[this.from];
        
        if (this.tH <= this.th) {
            this.disable();
        } else {
            this.enable();
        }
        
        this.checkForDisplayNone();
    },
    
    moveContentTo: function(tFrom) {
        if (!this.disabled && !isNaN(tFrom)) {
            if (tFrom > 0) {tFrom = 0;}
            if (tFrom < - this.tD) {tFrom = - this.tD;}
            var sFrom = Math.round(Math.abs(tFrom) / this.tH * this.sH);
            this.sContent.css(this.from, tFrom + 'px');
            this.sFace.css(this.from, sFrom + 'px');
        }
    },
    
    moveScrollBarTo: function(sFrom) {
        if (!this.disabled && !isNaN(sFrom)) {
            if (sFrom < 0) {sFrom = 0;}
            if (sFrom > this.sD) {sFrom = Math.round(this.sD);}
            var tFrom = - Math.round(sFrom / this.sH * this.tH);
            this.sContent.css(this.from, tFrom + 'px');
            this.sFace.css(this.from, sFrom + 'px');
        }
    },
    
    wheel: function(e) {
        if (!this.disabled && !this.disabledWheel) {
            var s = e.detail ? - e.detail / 3 : e.wheelDelta / 120;
            var tFrom = Math.round(this.getContentOffset() + (s * this.scrollUnit));
            this.moveContentTo(tFrom);
            e.preventDefault();
        }
    },
    
    clickToPosition: function(e, el) {
        var t = e.target,
            sFrom, tFrom;
        if (t == el) {
            var coord = (this.from == 'top') ? e.pageY : e.pageX;
            sFrom = coord - this.offset - Math.round(this.sh / 2);
            this.moveScrollBarTo(sFrom);
        } else if ($(t).hasClass('up')) {
            tFrom = Math.round(this.getContentOffset() + this.scrollUnit);
            this.moveContentTo(tFrom);
        } else if ($(t).hasClass('down')) {
            tFrom = Math.round(this.getContentOffset() - this.scrollUnit);
            this.moveContentTo(tFrom);
        }
    }
});

BOX.SimpleScroll = SimpleScroll;

// SimpleSlide Class
var SimpleSlide = function(datas) {
    SimpleSlide.superclass.constructor.call(this);
    
    this.addEvents(['moved'], (datas) ? datas.listeners : null);
    
    this.initialize(datas);
};
BOX.extend(SimpleSlide, BOX.Observable, {
    initialize: function(datas) {
        var that = this;
        
        this.moveFrom = datas.moveFrom || 'top';
        this.moveBy = datas.moveBy || 2;
        this.itemDim = datas.itemDim;
        this.itemMargin = datas.itemMargin || 0;
        
        this.container = $(datas.container);
        
        this.moveable = $(datas.moveable, $(this.container));
        if (datas.verifSize) {
            var prop = (this.moveFrom == 'top') ? 'height' : 'width';
            this.moveable.css(prop, this.moveable.children().length * (this.itemDim + this.itemMargin) + 'px');
        }
        
        var offset = (this.moveFrom == 'top') ? 'offsetHeight' : 'offsetWidth';
        this.maxPos = datas.maxPos || this.moveable[0].parentNode[offset] - (this.moveable.children().length * (this.itemDim + this.itemMargin)) + this.itemMargin + this.moveBy;
        
        if (this.maxPos < 0) {
            this.container.prepend(config.slide.prev).append(config.slide.next);
            
            this.container.mousedown(function(e) {
                that.startMove($(e.target));
                return false;
            }).mouseup(function() {
                that.endMove();
            });
            
            this.fireEvent('load');
        }
    },
    
    startMove: function(el) {
        var that = this;
        if (el.hasClass('prev')) {
            this.timer = W.setInterval(function() {that.movePrev();}, 10);
        } else if (el.hasClass('next')) {
            this.timer = W.setInterval(function() {that.moveNext();}, 10);
        }
    },
    
    endMove: function() {
        W.clearInterval(this.timer);
        this.timer = null;
    },
    
    movePrev: function() {
        var n = parseInt(this.moveable.css(this.moveFrom), 10) || 0;
        n = (n <= -this.moveBy) ? n + this.moveBy + 'px' : '0px';
        this.moveable.css(this.moveFrom, n);
    },
    
    moveNext: function() {
        var n = parseInt(this.moveable.css(this.moveFrom), 10) || 0;
        n = (n >= this.maxPos) ? n - this.moveBy + 'px' : this.maxPos - this.moveBy + 'px';
        this.moveable.css(this.moveFrom, n);
    },
    
    moveTo: function(n) {
        if (n < this.maxPos) {
            n = this.maxPos - this.moveBy + 'px';
        } else if (n > 0) {
            n = '0px';
        }
        this.moveable.css(this.moveFrom, n);
    }
});

BOX.SimpleSlide = SimpleSlide;

var SimpleTabs = function(datas) {
    SimpleTabs.superclass.constructor.call(this);
    
    this.addEvents(['show', 'hide'], (datas) ? datas.listeners : null);
    
    this.initialize(datas);
};
BOX.extend(SimpleTabs, BOX.Observable, {
    initialize: function(datas) {
        var that = this;
        
        that.tabsZone = $(datas.tabsZone).bind('click.simpleTabs', function(e) {that.click(e);});
        
        $('a', this.tabsZone).each(function() {
            this.href = this.href.replace('#', '#tab:');
            if ($(this.parentNode).hasClass('on')) {
                that.activeTab = $(this.parentNode);
                // bad href on IE when dealing with dynamically inserted HTML
                // can't use jQuery attr method (getAttribute + IE flags)
                that.activeSection = $(this.href.replace(/^([^#]*)/, '').replace('tab:', ''));
            }
        });
        
        this.directAccess();
        
        this.fireEvent('load');
    },
    
    directAccess: function() {
        var id = getURLHash('tab');
        if (id && D.getElementById(id)) {
            this.show($('a[href$=' + location.hash + ']', this.tabZone).parent(), $('#' + id));
        }
    },
    
    unbind: function() {
        this.tabsZone.unbind('click.simpleTabs');
    },
    
    click: function(e) {
        var t = e.target;
        while (t != this && t.parentNode) {
            if (t.nodeName.toLowerCase() == 'a' && t.href.indexOf('#') > -1) {
                var href = t.href.replace(/^([^#]*)/, '').replace('tab:', '');
                var tab = $(t.parentNode);
                if (!tab.hasClass('on')) {
                    var section = $(href);
                    this.show(tab, section);
                }
                break;
            }
            t = t.parentNode;
        }
    },
    
    show: function(tab, section) {
        if (this.activeTab && this.activeTab.length) {
            this.hide(this.activeTab, this.activeSection);
        }
        this.activeTab = tab.removeClass('off').addClass('on');
        this.activeSection = section.removeClass('off').addClass('on');
        this.fireEvent('show', tab, section);
    },
    
    hide: function(tab, section) {
        tab.removeClass('on').addClass('off');
        section.removeClass('on').addClass('off');
        this.fireEvent('hide', tab, section);
    }
});

BOX.SimpleTabs = SimpleTabs;

var divToolTip, divToolTipInner;
$(D).ready(function() {
    divToolTip = $(config.toolTip.container).appendTo('body');
    divToolTipInner = $('#toolTipInner');
});

var guidToolTip = 0;

var ToolTips = function(datas) {
    ToolTips.superclass.constructor.call(this);
    
    this.addEvents(['open', 'close'], (datas) ? datas.listeners : null);
    
    this.initialize(datas);
};
BOX.extend(ToolTips, BOX.Observable, {
    initialize: function(datas) {
        this.rules = {};
        this.eventNamespace = {};
        this.html = null;
        this.attributeType = null;
        this.attributeContent = null;
    },
    
    setId: function(id) {
        divToolTip.attr('id', id);
        return this;
    },
    
    setAttributeCache: function(el, attr) {
        this.attributeType = attr;
        this.attributeContent = $(el).attr(attr);
        $(el).attr(attr, '');
        return this;
    },
    
    setHTML: function(html) {
        this.html = (typeof html == 'string') ? html : null;
        return this;
    },
    
    setPosition: function(top, left) {
        if (!isNaN(top) && !isNaN(left)) {
            this.top = top;
            this.left = left;
        }
    },
    
    add: function() {
        var that = this, i = arguments.length, arg, tokens, s, a;
        var bind = function(selector) {
            $(selector).bind('mouseover.toolTip', function(e) {
                that.getContent(e, selector);
            });
        };
        while (i--) {
            arg = arguments[i];
            tokens = arg.selector.split(':');
            s = tokens[0];
            a = tokens[1];
            if (!that.rules[s]) {
                that.rules[s] = {};
                bind(s);
            }
            that.rules[s][arg.ruleNamespace || 'default'] = arg.rule;
            that.eventNamespace[s] = arg.eventNamespace || '';
        }
        return that;
    },
    
    remove: function(s, rule) {
        if (this.rules[s]) {
            this.close(s);
            if (rule && this.rules[s][rule]) {
                delete this.rules[s][rule];
            } else {
                $(s).unbind('mouseover.toolTip');
                delete this.rules[s];
            }
        }
        return this;
    },
    
    getContent: function(e, s) {
        var t = e.target, type;
        type = getStoreId(t) || 'default';
        if (this.rules[s][type]) {
            this.setId('');
            this.attributeType = this.attributeContent = this.html = null;
            this.rules[s][type].call(this, t);
            if (this.html) {
                this.open(s, $(t));
            }
        }
    },
    
    open: function(s, trigger) {
        var that = this;
        
        divToolTipInner.html(that.html);
        this.top = null;
        this.left = null;
        
        var pos = trigger.offset(),
            top = pos.top - divToolTip[0].scrollHeight,
            left = pos.left + (trigger[0].offsetWidth / 2) - (divToolTip[0].scrollWidth / 2);
        
        this.fireEvent('beforeOpen' + that.eventNamespace[s], trigger, pos, divToolTip, top, left);
        // TODO check screen dimensions and position background specifically
        if (this.top && this.left) {
            top = this.top;
            left = this.left;
        }
        divToolTip.css({top: top + 'px', left: left + 'px'});
        
        trigger.bind('mouseout.toolTip', function(e) {
            that.close(s, trigger);
        });
        
        that.lastSelector = s;
        that.lastTrigger = trigger;
        
        this.fireEvent('open' + that.eventNamespace[s], trigger, divToolTip);
    },
    
    close: function(s, trigger) {
        s = s || this.lastSelector;
        trigger = trigger || this.lastTrigger;
        
        if (s && trigger) {
            divToolTip.css('left', '-10000px');
            this.setId('');
            if (this.attributeType) {
                trigger.attr(this.attributeType, this.attributeContent);
            }
            trigger.unbind('mousemove.toolTip');
            
            this.fireEvent('close' + this.eventNamespace[s], trigger, divToolTip);
            
            this.lastSelector = this.lastTrigger = this.html = null;
        }
    }
});

BOX.ToolTips = ToolTips;

var Mask = function(datas) {
    Mask.superclass.constructor.call(this);
    
    this.addEvents(['show', 'hide'], (datas) ? datas.listeners : null);
    
    this.initialize(datas);
};
BOX.extend(Mask, BOX.Observable, {
    initialize: function(datas) {
        datas.target = datas.target || 'body';
        this.dom = $(datas.html).appendTo(datas.target);
    },
    
    show: function(id, styles) {
        styles = (typeof styles == 'object') ? styles : {};
        styles.display = 'block';
        id = id || this.dom[0].id;
        this.dom.attr('id', id).css(styles);
    },
    
    hide: function() {
        this.dom.css('display', 'none');
    }
});

BOX.Mask = Mask;

var divPopin;
$(D).ready(function() {
    if(config.popin.container) {
        divPopin = $(config.popin.container).appendTo('#core');
    }
});

var guidPopin = 0;

var getPopinHTML = function(popin) {
    var div = D.createElement('div');
    div.appendChild(popin);
    var html = div.innerHTML;
    return html;
};

var Popins = function(datas) {
    Popins.superclass.constructor.call(this);
    
    this.addEvents(['open', 'close', 'URL'], (datas) ? datas.listeners : null);
    
    this.initialize(datas);
};
BOX.extend(Popins, BOX.Observable, {
    initialize: function(datas) {
        this.insertPoint = datas.insertPoint;
        this.html = {};
        this.url = {};
        this.eventScope = {};
    },
    
    prepare: function(root, popins) {
        var that = this, root = $(root), id;
        if (root.length) {
            $(popins, root).each(function() {
                id = this.id.replace('popin', '');
                id = id.charAt(0).toLowerCase() + id.substring(1);
                that.html[id] = getOuterHTML(this);
            });
            root.empty();
        }
    },
    
    directAccess: function(URLs, processHTML) {
        var id = getURLHash('popin');
        if (id) {
            if (URLs[id]) {
                this.add({url: URLs[id], id: id, refresh: false, processHTML: processHTML});
            } else if (LOP.popins.html[id]) {
                LOP.popins.add({url: '#' + id, id: id, refresh: false, processHTML: processHTML});
            }
        }
    },
    
    add: function(datas) {
        var url, id = datas.id ? datas.id : 'popin' + (++guidPopin);
        if (!this.url[id] || datas.refresh) {
            this.eventScope[id] = datas.eventScope || '';
            if (datas.url.indexOf('#') > -1) {
                url = datas.url.replace(/^([^#]*)/, '');
                this.url[id] = url;
                if (datas.processHTML) {
                    this.html[id] = datas.processHTML(this.html[id]);
                }
                this.open(id);
            } else {
                this.ajax(id, datas);
            }
        } else {
            this.open(id);
        }
    },
    
    remove: function(id) {
        if (this.html[id]) {
            this.close(id);
            delete this.html[id];
            delete this.url[id];
            delete this.events[id];
            delete this.eventScope[id];
        }
    },
    
    ajax: function(id, datas) {
        var that = this,
            method = datas.method ? datas.method : 'get';
        $[method](datas.url, function(response) {
            that.html[id] = datas.processHTML ? datas.processHTML(response) : response;
            that.url[id] = datas.url;
            that.open(id);
        });
    },
    
    open: function(id) {
        if (this.currentDOM) {
            this.close();
        }
        if (this.html[id]) {
            this.insertPoint.css('left', '-10000px');
            this.currentDOM = $(this.html[id]).appendTo(this.insertPoint);
            this.fireEvent('open' + this.eventScope[id], id);
            this.insertPoint.css('left', '0');
            this.currentId = id;
            $(D).bind('keydown.popin', function(e) {
                if (e.which == 27) {
                    LOP.popins.close();
                }
            });
        }
    },
    
    close: function(id) {
        id = id || this.currentId;
        if (this.html[id]) {
            this.fireEvent('close' + this.eventScope[id], id);
            this.insertPoint.css('left', '-10000px');
            this.currentDOM.remove();
            this.currentDOM = this.currentId = null;
            $(D).unbind('keydown.popin');
        }
    }
});

BOX.Popins = Popins;

var ShowHideFAQ = function(datas) {
    ShowHideFAQ.superclass.constructor.call(this);
    
    this.addEvents(['open', 'close'], (datas) ? datas.listeners : null);
    
    this.initialize(datas);
};
BOX.extend(ShowHideFAQ, BOX.Observable, {
    initialize: function(datas) {
        var that = this;
        
        $(datas.selector).each(function() {
            this.innerHTML = '<a href="#">' + this.innerHTML + '</a>';
        }).click(function(e) {
            that.manageClick(e, $(this));
        });
    },
    
    manageClick: function(e, el) {
        this[el.hasClass('on') ? 'close' : 'open'](el);
        e.preventDefault();
    },
    
    open: function(trigger) {
        var that = this;
        
        trigger.addClass('on').next().slideDown(250, function() {
            that.fireEvent('open');
        });
    },
    
    close: function(trigger, keepOpen) {
        var that = this;
        
        trigger.removeClass('on');
        if (!keepOpen) {
            trigger.next().slideUp(250, function() {
                that.fireEvent('close');
            });
        }
    }
});

BOX.ShowHideFAQ = ShowHideFAQ;

var forms, textFields, radiosFields, checkboxFields, selectFields;

var mapForms = {};
var mapFormsFields = {};
BOX.mapForms = mapForms;
BOX.mapFormsFields = mapFormsFields;

var reFieldName = /[a-zA-Z0-9][a-zA-Z0-9_-]+$/;

var mapFormsTypes = {
    'checkbox': 'checkbox',
    'hidden': 'text',
    'password': 'text',
    'radio': 'radio',
    'select-one': 'select',
    'text': 'text',
    'textarea': 'text'
};

var formPatterns = {
    empty: /^\s*$/,
    email: /^\s*[\w-]+(\.[\w-]+)*@([\w-]+\.)+[A-Za-z]{2,7}\s*$/
};

var formRules = {
    empty: function(value) {
        return formPatterns.empty.test(value);
    },
    email: function(value) {
        return formPatterns.email.test(value);
    }
};

BOX.addFormRule = function(rule, pattern) {
    formPatterns[rule] = pattern;
    formRules[rule] = function(value) {
        return formPatterns[rule].test(value);
    };
};

var getForm = function(f) {
    var type = typeof f;
    if (type == 'string') {
        return D.getElementById(f) || D.forms[f];
    } else if (type == 'number') {
        return D.forms[f];
    } else if (f.nodeName) {
        return f;
    }
};

var hasField = function(form, fieldName) {
    return !!mapFormsFields[form.id].names[fieldName] || false;
};

var getFieldType = function(field) {
    return mapFormsTypes[field.type];
};

var getFieldEventName = function(type) {
    var evt;
    switch (type) {
        case 'text':
        case 'password':
            evt = 'blur.validation';
            break;
        case 'select':
        case 'select-one':
            evt = 'change.validation';
            break;
        case 'radio':
        case 'checkbox':
            evt = 'click.validation';
            break;
    }
    return evt;
};

var getFieldLabel = function(f) {
    var label = $(f).next('label');
    if (!label.length) {
        label = $(f).prev('label');
        if (!label.length && f.parentNode) {
            label = getFieldLabel(f.parentNode);
        }
    }
    return label;
};

var getFieldFromEvent = function(form, name) {
    if (typeof name == 'object') {
        name = name[1];
    }
    return (mapFormsFields[form.id] && mapFormsFields[form.id].fields[name]) ? mapFormsFields[form.id].fields[name] : null;
};
BOX.getFieldFromEvent = getFieldFromEvent;

var validateField = function(e) {
    var formId = getStoreId(this, 'form');
    var name = this.name.match(reFieldName)[0];
    if (mapFormsFields[formId] && mapFormsFields[formId].fields[name]) {
        var field = mapFormsFields[formId].fields[name];
        field.setError(field.rule(field));
    }
};

var bindFieldRule = function(field, type) {
    var evt = getFieldEventName(type);
    $(field).bind(evt, validateField);
};

var unbindFieldRule = function(field, type) {
    var evt = getFieldEventName(type);
    $(field).unbind(evt);
};

var validateForm = function(e) {
    var id = getStoreId(this, 'form') || this.id;
    if (mapForms[id]) {
        mapForms[id].validate();
        if (!mapForms[id].isValid(true)) {
            mapForms[id].fireEvent('formError.' + id, e, mapForms[id].error);
            e.preventDefault();
        } else {
            mapForms[id].fireEvent('formValid.' + id, e);
        }
    }
};

var bindFormSubmit = function(form, submitSelector) {
    if (typeof submitSelector == 'string') {
        var el = $(submitSelector, form).addClass('box:form:' + form.id).bind('click.validation', validateForm);
        if (el[0]) {
            if (el[0].id && el[0].href && el[0].href.indexOf('__doPostBack') > -1) {
                mapForms[form.id].submitName = el[0].id.replace(/_/g, '$');
            } else if (el[0].innerHTML.indexOf('__doPostBack') > -1) {
                mapForms[form.id].submitName = el[0].innerHTML.match(/doPostBack\('([^']+)/)[1];
            }
        }
    } else {
        $(form).bind('submit.validation', validateForm);
    }
};

var unbindFormSubmit = function(form, submitSelector) {
    if (typeof submitSelector == 'string') {
        $(submitSelector, form).removeClass('box:form:' + form.id).unbind('click.validation');
    } else {
        $(form).unbind('submit.validation', validateForm);
    }
};

var clickToChangeField = function(e) {
    var formId = getStoreId(this, 'form');
    var name = this.name.match(reFieldName)[0];
    if (mapForms[formId] && mapFormsFields[formId] && mapFormsFields[formId].fields[name]) {
        var field = mapFormsFields[formId].fields[name];
        var id = this.id.match(reFieldName)[0];
        var type = field.type;
        var replaced = field.isReplaced();
        if (type == 'checkbox') {
            mapForms[formId].fireEvent('fieldChange.' + type + '.' + name);
        }
        if (field.isChecked()) {
            if (type == 'radio') {
                if (field.idChecked && field.idChecked != id) {
                    if (replaced) {
                        field.getLabel(field.idChecked)
                            .removeClass(config.fauxFields.checked)
                            .removeClass(config.fauxFields.checkedFocus);
                    }
                    mapForms[formId].fireEvent('fieldChange.' + type + '.' + name);
                }
                field.idChecked = id;
            }
            if (replaced) {
                field.getLabel(id)
                    .removeClass(config.fauxFields.focus)
                    .addClass(config.fauxFields.checkedFocus);
            }
        } else if (replaced) {
            field.getLabel()
                .removeClass(config.fauxFields.checked)
                .removeClass(config.fauxFields.checkedFocus)
                .addClass(config.fauxFields.focus);
        }
    }
};

var bindFieldClickToChange = function(field) {
    $(field).bind('click.fieldChange', clickToChangeField);
};

var unbindFieldClickToChange = function(field) {
    $(field).unbind('click.fieldChange');
};

var focusBlurField = function(e) {
    var formId = getStoreId(this, 'form');
    var name = this.name.match(reFieldName)[0];
    if (mapForms[formId] && mapFormsFields[formId] && mapFormsFields[formId].fields[name]) {
        var field = mapFormsFields[formId].fields[name];
        var id = this.id.match(reFieldName)[0];
        var type = field.type;
        var label = field.getLabel(id);
        if (e.type == 'focus') {
            if (type == 'radio' || type == 'checkbox') {
                label.addClass(field.isChecked() ? config.fauxFields.checkedFocus : config.fauxFields.focus);
            } else if (type == 'select') {
                label.addClass(config.fauxFields.focus);
            }
        } else {
            if (type == 'radio' || type == 'checkbox') {
                label.removeClass(config.fauxFields.checkedFocus).removeClass(config.fauxFields.focus);
                if (field.isChecked(id)) {
                    label.addClass(config.fauxFields.checked);
                }
            } else if (type == 'select') {
                label.removeClass(config.fauxFields.focus);
            }
        }
    }
};

var bindFieldFocusBlur = function(field) {
    $(field).bind('focus.fieldState', focusBlurField).bind('blur.fieldState', focusBlurField);
};

var unbindFieldFocusBlur = function(field) {
    $(field).unbind('focus.fieldState', focusBlurField).unbind('blur.fieldState', focusBlurField);
};

var bindFieldKeyNav = function(field, name, formId) {
    $(field)
        .bind('keyup.fieldState', function(e) {mapFormsFields[formId].fields[name].keyUp(e);})
        .bind('keydown.fieldState', function(e) {mapFormsFields[formId].fields[name].keyDown(e);});
};

var unbindFieldKeyNav = function(field, name, formId) {
    $(field).unbind('keyup.fieldState').unbind('keydown.fieldState');
};

var fauxSelectRollover = function() {
    $(this).addClass(config.fauxFields.hover);
};
    
var fauxSelectRollout = function() {
    $(this).removeClass(config.fauxFields.hover);
};

var replacedSelectClick = function(e) {
    var formId = getStoreId(this, 'form');
    var name = this.id.replace(formId + 'REP', '');
    if (mapForms[formId] && mapFormsFields[formId] && mapFormsFields[formId].fields[name]) {
        var field = mapFormsFields[formId].fields[name];
        if (field) {
            field.element.focus();
            if (field.opened) {
                field.closeReplaced();
            } else {
                field.openReplaced();
            }
        }
    }
};

var bindReplacedSelectClick = function(el) {
    el.click(replacedSelectClick);
};

var unbindReplacedSelectClick = function(el) {
    el.unbind('click').remove();
};

var createNewFieldObject = {
    'checkbox': function(datas) {
        return new FormCheckbox(datas);
    },
    'radio': function(datas) {
        return new FormRadios(datas);
    },
    'select': function(datas) {
        return new FormSelect(datas);
    },
    'text': function(datas) {
        return new FormText(datas);
    }
};

// Form class
var Form = function(datas) {
    Form.superclass.constructor.call(this);
    
    this.addEvents(['formError', 'formValid', 'fieldError', 'fieldValid', 'fieldChange', 'fieldReplaced']);
    
    this.initialize(datas);
};
BOX.extend(Form, BOX.Observable, {
    initialize: function(datas) {
        var that = this;
        
        that.element = datas.element;
        that.id = datas.element.id;
        
        mapFormsFields[that.id] = {};
        mapFormsFields[that.id].fields = {};
        $('input, select, textarea', this.element).each(function() {
            if (this.name) {
                var name = this.name.match(reFieldName)[0];
                var type = getFieldType(this);
                if (createNewFieldObject[type]) {
                    if (type == 'radio') {
                        if (!mapFormsFields[that.id].fields[name]) {
                            if (that.element.nodeName.toLowerCase() == 'form') {
                                mapFormsFields[that.id].fields[name] = createNewFieldObject[type]({'fields': that.element.elements[this.name], 'name': name, 'formId': that.id});
                            } else {
                                mapFormsFields[that.id].fields[name] = createNewFieldObject[type]({'fields': D.forms[0].elements[this.name], 'name': name, 'formId': that.id});
                            }
                        }
                    } else {
                        mapFormsFields[that.id].fields[name] = createNewFieldObject[type]({'field': this, 'name': name, 'formId': that.id});
                    }
                    if (type == 'radio' || type == 'checkbox') {
                        bindFieldClickToChange(this);
                    }
                    $(this).addClass('box:form:' + that.id);
                }
            }
        });
    },
    
    getElement: function() {
        return this.element;
    },
    
    eachField: function(fn) {
        for (var name in mapFormsFields[this.id].fields) {
            if (isOwnProperty(mapFormsFields[this.id].fields, name)) {
                if (fn(mapFormsFields[this.id].fields[name]) === false) {
                    break;
                }
            }
        }
        return this;
    },
    
    checkbox: function(name) {
        if (mapFormsFields[this.id].fields[name] && mapFormsFields[this.id].fields[name].type == 'checkbox') {
            return mapFormsFields[this.id].fields[name];
        }
        return null;
    },
    
    radio: function(name) {
        if (mapFormsFields[this.id].fields[name] && mapFormsFields[this.id].fields[name].type == 'radio') {
            return mapFormsFields[this.id].fields[name];
        }
        return null;
    },
    
    select: function(name) {
        if (mapFormsFields[this.id].fields[name] && mapFormsFields[this.id].fields[name].type == 'select') {
            return mapFormsFields[this.id].fields[name];
        }
        return null;
    },
    
    text: function(name) {
        if (mapFormsFields[this.id].fields[name] && mapFormsFields[this.id].fields[name].type == 'text') {
            return mapFormsFields[this.id].fields[name];
        }
        return null;
    },
    
    isValid: function(noValidation) {
        if (!noValidation) {
            this.validate(true);
        }
        var valid = true;
        this.eachField(function(field) {
            if (field.error) {
                return (valid = false);
            }
        });
        return valid;
    },
    
    getErrors: function() {
        var i = 0, errors = {};
        this.eachField(function(field) {
            if (field.error) {
                errors[field.name] = field.error;
                ++i;
            }
        });
        return (i ? errors : null);
    },
    
    setErrors: function(errors) {
        if (typeof errors == 'object') {
            for (var name in errors) {
                if (isOwnProperty(errors, name) && mapFormsFields[this.id].fields[name]) {
                    mapFormsFields[this.id].fields[name].setError(errors[name]);
                }
            }
        }
        return this;
    },
    
    addValidation: function(fn, submitSelector) {
        var msg = fn(this);
        if (msg) {
            this.error = msg;
        }
        this.submitSelector = submitSelector;
        bindFormSubmit(this.element, submitSelector);
        return this;
    },
    
    removeValidation: function() {
        this.eachField(function(field) {
            if (field.rule) {
                unbindFieldRule(field.element || field.elements, field.type);
            }
        });
        unbindFormSubmit(this.element, this.submitSelector);
        return this;
    },
    
    validate: function(noBroadcast) {
        this.eachField(function(field) {
            if (field.rule !== undefined) {
                field.validate(noBroadcast);
            }
        });
        return this;
    },
    
    addReplacement: function(options) {
        this.eachField(function(field) {
            if (field.addReplacement !== undefined) {
                field.addReplacement(options);
            }
        });
        return this;
    },
    
    removeReplacement: function() {
        this.eachField(function(field) {
            if (field.removeReplacement !== undefined) {
                field.removeReplacement();
            }
        });
        return this;
    }
});

BOX.form = function(datas, rm) {
    var id = datas.id || datas;
    if (!rm) {
        if (!mapForms[id]) {
            var form = D.getElementById(id);
            if (form) {
                if (typeof datas == 'string') {
                    datas = {};
                }
                datas.element = form;
                mapForms[form.id] = new Form(datas);
                return mapForms[form.id];
            }
        } else {
            return mapForms[id];
        }
    } else {
        if (mapForms[id]) {
            mapForms[id].removeValidation().removeReplacement();
            delete mapForms[id];
        }
    }
    return null;
};

// Field class
var FormField = function(datas) {};
BOX.extend(FormField, {
    initialize: function(datas) {
        this.element = datas.field;
        this.name = datas.name;
        this.formId = datas.formId;
    },
    
    getElement: function() {
        return (this.element || null);
    },
    
    getLabel: function() {
        return getFieldLabel(this.element);
    },
    
    getValue: function() {
        return (this.element.value ? this.element.value : null);
    },
    
    setValue: function(value) {
        if (value === undefined) {
            return (this.element.value = '');
        } else {
            return (this.element.value = value);
        }
    },
    
    isDefault: function() {
        if (typeof this.element.defaultValue != 'undefined') {
            return this.getValue() == this.element.defaultValue;
        }
        return false;
    },
    
    isDisabled: function() {
        return this.element.disabled;
    },
    
    disable: function() {
        this.element.disabled = true;
        return this;
    },
    
    enable: function() {
        this.element.disabled = false;
        return this;
    },
    
    mustValidate: function(rule) {
        this.rule = rule;
        bindFieldRule(this.element, this.type);
        return this;
    },
    
    isValid: function(noValidation) {
        if (!noValidation) {
            this.validate(true);
        }
        return !this.error;
    },
    
    validate: function(noBroadcast) {
        if (this.rule) {
            this.setError(this.rule(this), noBroadcast);
        }
        return this;
    },
    
    getError: function() {
        return (this.error || null);
    },
    
    setError: function(error, noBroadcast) {
        if (error) {
            if (!noBroadcast) {
                mapForms[this.formId].fireEvent('fieldError.' + this.type + '.' + this.name, error);
            }
            this.error = error;
        } else {
            if (!noBroadcast) {
                mapForms[this.formId].fireEvent('fieldValid.' + this.type + '.' + this.name);
            }
            this.error = null;
        }
        return this;
    }
});

// Text class
var FormText = function(datas) {
    FormText.superclass.constructor.call(this);
    
    this.initialize(datas);
};
BOX.extend(FormText, FormField, {
    type: 'text',
    
    isEmpty: function() {
        return formRules.empty(this.element.value);
    },
    
    isEqualTo: function(what) {
        return this.getValue() == what;
    },
    
    isMatching: function(what) {
        return formRules[what] ? formRules[what](this.element.value) : null;
    }
});

// Radios class
var FormRadios = function(datas) {
    FormRadios.superclass.constructor.call(this);
    
    this.initialize(datas);
};
BOX.extend(FormRadios, FormField, {
    type: 'radio',
    
    initialize: function(datas) {
        var that = this;
        that.elements = datas.fields;
        that.name = datas.name;
        that.formId = datas.formId;
        that.group = {};
        that.idChecked = null;
        that.number = datas.fields.length;
        this.each(function(field, i) {
            that.group[field.id.match(reFieldName)[0]] = i;
            if (field.checked) {
                that.idChecked = field.id.match(reFieldName)[0];
            }
        });
        return that;
    },
    
    each: function(fn) {
        var i = this.number, l = i - 1;
        if (i) {
            while (i--) {
                if (fn(this.elements[l - i], l - i)) {
                    break;
                }
            }
        }
        return this;
    },
    
    getIndex: function() {
        var index = null;
        this.each(function(field, i) {
            if (field.checked) {
                return (index = i);
            }
        });
        return index;
    },
    
    getElement: function(id) {
        var f = null;
        if (typeof id == 'string') {
            if (this.group[id] !== undefined) {
                return this.elements[this.group[id]];
            }
        } else if (typeof id == 'number') {
            if (id >= 0 && id < this.number) {
                return this.elements[id];
            }
        } else {
            this.each(function(field) {
                if (field.checked) {
                    f = field;
                }
            });
        }
        return f;
    },
    
    getElements: function() {
        return this.elements;
    },
    
    getLabel: function(id) {
        var field = this.getElement(id);
        return (field && getFieldLabel(field));
    },
    
    getLabels: function(id) {
        return getFieldLabel(this.elements);
    },
    
    getValue: function(id) {
        if (id !== undefined) {
            var field = this.getElement(id);
            return ((field && field.value) ? field.value : null);
        } else {
            var value = null;
            this.each(function(field) {
                if (field.checked) {
                    return (value = field.value);
                }
            });
            return value;
        }
    },
    
    setValue: function(value, id) {
        var done = null;
        if (id !== undefined) {
            var field = this.getElement(id);
            if (field) {
                field.value = done = value;
            }
        } else {
            this.each(function(field) {
                if (field.checked) {
                    return (field.value = done = value);
                }
            });
        }
        return done;
    },
    
    isChecked: function(id) {
        var ok = false;
        if (id !== undefined) {
            var field = this.getElement(id);
            if (field) {
                ok = this.getElement(id).checked;
            }
        } else {
            this.each(function(field) {
                if (field.checked) {
                    return (ok = true);
                }
            });
        }
        return ok;
    },
    
    check: function(id) {
        var ok = false;
        if (id !== undefined) {
            var field = this.getElement(id);
            ok = (!!field && (field.checked = true));
            if (ok && this.isReplaced()) {
                if (typeof id == 'number') {
                    id = this.elements[id].id.match(reFieldName)[0];
                }
                if (this.idChecked != id) {
                    this.getLabel(this.idChecked)
                            .removeClass(config.fauxFields.checked)
                            .removeClass(config.fauxFields.checkedFocus);
                }
                this.getLabel(id)
                    .removeClass(config.fauxFields.focus)
                    .removeClass(config.fauxFields.checkedFocus)
                    .addClass(config.fauxFields.checked);
                this.idChecked = id;
                mapForms[this.formId].fireEvent('fieldChange.radio.' + this.name);
            }
        }
        return ok;
    },
    
    uncheck: function(id) {
        var ok = false;
        if (id !== undefined) {
            var field = this.getElement(id);
            ok = (!!field && !(field.checked = false));
        } else {
            this.each(function(field) {
                field.checked = false;
            });
            ok = !!this.number;
        }
        if (ok && this.isReplaced() && this.idChecked) {
            this.getLabel(this.idChecked)
                .removeClass(config.fauxFields.focus)
                .removeClass(config.fauxFields.checkedFocus)
                .removeClass(config.fauxFields.checked);
            this.idChecked = null;
            mapForms[this.formId].fireEvent('fieldChange.radio.' + this.name);
        }
        return ok;
    },
    
    isDisabled: function() {
        return this.elements[0].disabled;
    },
    
    disable: function() {
        this.each(function(field) {
            field.disabled = true;
        });
        return this;
    },
    
    enable: function() {
        this.each(function(field) {
            field.disabled = false;
        });
        return this;
    },
    
    isReplaced: function() {
        return (this.elements[0].className.indexOf('box:mode:replaced') > -1);
    },
    
    addReplacement: function() {
        $(this.elements).addClass('box:mode:replaced');
        if (this.idChecked) {
            this.getLabel(this.idChecked).addClass(config.fauxFields.checked);
        }
        bindFieldFocusBlur(this.elements);
        mapForms[this.formId].fireEvent('fieldReplaced.radio.' + this.name);
    },
    
    removeReplacement: function() {
        $(this.elements).removeClass('box:mode:replaced');
        if (this.idChecked) {
            this.getLabel(this.idChecked)
                .removeClass(config.fauxFields.checked)
                .removeClass(config.fauxFields.checkedFocus)
                .removeClass(config.fauxFields.focus);
        }
        unbindFieldFocusBlur(this.elements);
    },
    
    mustValidate: function(rule) {
        var that = this;
        that.rule = rule;
        that.each(function(field) {
            bindFieldRule(field, that.type);
        });
        return that;
    }
});

// Checkbox class
var FormCheckbox = function(datas) {
    FormCheckbox.superclass.constructor.call(this);
    
    this.initialize(datas);
};
BOX.extend(FormCheckbox, FormField, {
    type: 'checkbox',
    
    isChecked: function() {
        return this.element.checked;
    },
    
    check: function() {
        this.element.checked = true;
        if (this.isReplaced()) {
            this.getLabel()
                .removeClass(config.fauxFields.focus)
                .removeClass(config.fauxFields.checkedFocus)
                .addClass(config.fauxFields.checked);
            mapForms[this.formId].fireEvent('fieldChange.checkbox.' + this.name);
        }
        return true;
    },
    
    uncheck: function() {
        this.element.checked = false;
        if (this.isReplaced()) {
            this.getLabel()
                .removeClass(config.fauxFields.focus)
                .removeClass(config.fauxFields.checkedFocus)
                .removeClass(config.fauxFields.checked);
            mapForms[this.formId].fireEvent('fieldChange.checkbox.' + this.name);
        }
        return true;
    },
    
    isReplaced: function() {
        return (this.element.className.indexOf('box:mode:replaced') > -1);
    },
    
    addReplacement: function() {
        $(this.element).addClass('box:mode:replaced');
        if (this.isChecked()) {
            this.getLabel().addClass(config.fauxFields.checked);
        }
        bindFieldFocusBlur(this.element);
        mapForms[this.formId].fireEvent('fieldReplaced.checkbox.' + this.name);
        return this;
    },
    
    removeReplacement: function() {
        $(this.element).removeClass('box:mode:replaced');
        if (this.isChecked()) {
            this.getLabel()
                .removeClass(config.fauxFields.checked)
                .removeClass(config.fauxFields.checkedFocus)
                .removeClass(config.fauxFields.focus);
        }
        unbindFieldFocusBlur(this.element);
        return this;
    }
});

var fauxSelect, fauxSelectScroll, fauxSelectMask;
$(D).ready(function() {
    fauxSelect = $(config.fauxSelect.container).appendTo('body');
    fauxSelectScroll = new BOX.SimpleScroll({target: fauxSelect[0]});
    fauxSelectMask = new Mask({html: config.fauxSelect.mask});
});

// Select class
var FormSelect = function(datas) {
    FormSelect.superclass.constructor.call(this);
    
    this.initialize(datas);
};
BOX.extend(FormSelect, FormField, {
    type: 'select',
    
    initialize: function(datas) {
        this.element = datas.field;
        this.name = datas.name;
        this.formId = datas.formId;
        this.number = (datas.field && datas.field.options) ? datas.field.options.length : null;
        this.scrollTo = null;
        this.options = '';
        this.currentIndex = datas.field.selectedIndex;
        this.opened = false;
    },
    
    hasIndex: function(i) {
        return !isNaN(i) && i >= 0 && i < this.number;
    },
    
    getValue: function(i) {
        i = i || this.getIndex();
        if (this.hasIndex(i)) {
            return this.element.options[i].value ? this.element.options[i].value : null;
        }
        return null;
    },
    
    setValue: function(value, i) {
        i = i || this.getIndex();
        if (this.hasIndex(i)) {
            this.element.options[i].value = value;
            return value;
        }
        return null;
    },
    
    getIndex: function() {
        return this.element.selectedIndex;
    },
    
    setIndex: function(i) {
        if (this.hasIndex(i)) {
            this.element.selectedIndex = i;
            if (this.isReplaced()) {
                this.getReplaced('span')[0].innerHTML = this.getText(i);
                $('#' + this.name + 'Option' + this.currentIndex).removeClass(config.fauxFields.selected);
                if (this.opened) {
                    this.setReplacedOptionOnView($('#' + this.name + 'Option' + i).addClass(config.fauxFields.selected));
                }
            }
            // fireEvent change ???
            // how to detect change when no replacement ???
            // bind a classic change event and unbind on replacing ???
            if (i != this.currentIndex) {
                this.currentIndex = i;
                mapForms[this.formId].fireEvent('fieldChange.select.' + this.name);
            }
            return i;
        }
        return null;
    },
    
    getText: function(i) {
        i = i || this.getIndex();
        if (this.hasIndex(i)) {
            return this.element.options[i].text;
        }
        return null;
    },
    
    setText: function(t, i) {
        i = i || this.getIndex();
        if (this.hasIndex(i)) {
            this.element.options[i].innerHTML = t;
            if (this.isReplaced()) {
                // do stuff
            }
            return t;
        }
        return null;
    },
    
    getOption: function(i) {
        i = i || this.getIndex();
        if (this.hasIndex(i)) {
            return {'text': this.getText(i), 'value': this.getValue(i), 'selected': i == this.getIndex()};
        }
        return null;
    },
    
    setOption: function(option, i) {
        i = i || this.getIndex();
        if (this.hasIndex(i)) {
            if (typeof option == 'object') {
                this.options = this.options.replace(this.getText(i), option.text);
                this.element.option[i].value = option.value;
                this.element.option[i].text = option.text;
                if (option.selected) {
                    this.setIndex(i);
                }
            } else {
                this.options = this.options.replace('<li id="' + that.name + 'Option' + i + '">' + this.getText(i) + '</li>', '');
                this.element.option[i] = null;
            }
            return option;
        }
        return null;
    },
    
    getOptions: function() {
        var options = [], i = this.number, l = this.number - 1;
        while (i--) {
            options[l - i] = this.getOption(i);
        }
        return options;
    },
    
    setOptions: function(options, clear) {
        var that = this;
        if (typeof options == 'object') {
            if (clear) {
                that.element.options.length = 0;
                that.options = '';
            }
            var i = options.length, l = options.length - 1, opt;
            while (i--) {
                opt = options[l - i];
                if (opt.selected) {
                    this.currentIndex = i;
                }
                that.element.options[that.element.options.length] = new Option(opt.text, opt.value, opt.selected);
                that.options += '<li id="' + that.name + 'Option' + (l - i) + '">' + opt.text + '</li>';
            }
        } else {
            var sI = that.getIndex();
            $(that.element).children().each(function(i, opt) {
                if (sI == i) {
                    that.currentIndex = i;
                }
                that.options += '<li id="' + that.name + 'Option' + i + '">' + opt.text + '</li>';
            });
        }
    },
    
    addReplacement: function(options) {
        bindReplacedSelectClick($('<div id="' + this.name + this.formId + 'REP" class="fauxSelect box:form:' + this.formId + '"><div><span id="' + this.name + this.formId + 'REPInner">' + this.element.options[this.getIndex()].text + '</span></div></div>').insertAfter(this.element));
        $(this.element).addClass('box:mode:replaced');
        this.scrollTo = 0;
        this.options = '';
        this.setOptions();
        if (typeof options == 'object' && typeof options.maxHeight == 'number') {
            this.maxHeight = options.maxHeight;
        }
        bindFieldFocusBlur(this.element);
        bindFieldKeyNav(this.element, this.name, this.formId);
        if (BOX.ieOld) {
            $(this.element).bind('mousewheel', function(e) {
                fauxSelectScroll.wheel(e);
            });
        }
        return this;
    },
    
    removeReplacement: function() {
        $(this.element).removeClass('box:mode:replaced');
        unbindReplacedSelectClick($('#' + this.name + this.formId + 'REP'));
        unbindFieldFocusBlur(this.element);
        unbindFieldKeyNav(this.element, this.name, this.formId);
        if (BOX.ieOld) {
            $(this.element).unbind('mousewheel');
        }
        return this;
    },
    
    isReplaced: function() {
        return (this.element.className.indexOf('box:mode:replaced') > -1);
    },
    
    getReplaced: function(selector) {
        return $('#' + this.name + this.formId + 'REP ' + (selector || ''));
    },
    
    getReplacedOpeningPosition: function(page) {
        var el = this.getReplaced();
        var offset = el.offset();
        var totalHeight = el[0].offsetHeight;
        var realHeight = el.height();
        var borderCorrection = totalHeight - realHeight;
        var width = el[0].offsetWidth;
        var maxHeight = 'auto';
        if (this.maxHeight) {
            maxHeight = $('ul', fauxSelectScroll.sContent)[0].offsetHeight;
            if (maxHeight > this.maxHeight) {
                maxHeight = this.maxHeight;
            }
        }
        var top = offset.top + totalHeight - (borderCorrection / 2);
        if (top + maxHeight > page.viewportH + page.scrollH) {
            top = offset.top - maxHeight - borderCorrection + (borderCorrection / 2);
        }
        el = null;
        return {
            'top': top + 'px',
            'left': offset.left + 'px',
            'width': width + 'px',
            'height': maxHeight + 'px'
        };
    },
    
    setReplacedOptionOnView: function(item) {
        if (item && item.length && !fauxSelectScroll.disabled && item[0].offsetParent) {
            var maxHeight = fauxSelect.height();
            var fauxTop = fauxSelectScroll.getContentOffset();
            var itemTop = item[0].offsetTop;
            var itemHeight = item[0].offsetHeight;
            var itemMax = itemTop + itemHeight;
            if (itemMax > maxHeight && this.scrollTo > (maxHeight - itemMax)) {
                this.scrollTo = maxHeight - itemMax;
                fauxSelectScroll.moveContentTo(this.scrollTo);
            } else if (itemTop < - fauxTop) {
                this.scrollTo = - itemTop;
                fauxSelectScroll.moveContentTo(this.scrollTo);
            }
        }
    },
    
    clickReplaced: function() {
        if (this.isReplaced()) {
            this.element.focus();
            if (fauxSelect.hasClass(config.fauxFields.focus)) {
                this.closeReplaced();
            } else {
                this.openReplaced();
            }
        }
    },
    
    clickList: function(e, trigger) {
        var t = e.target;
        while (t != trigger) {
            if (t.nodeName.toLowerCase() == 'li') {
                var i = Number(t.id.match(/\d+$/)[0]);
                this.setIndex(i);
                this.closeReplaced();
                this.element.focus();
            }
            t = t.parentNode;
        }
    },
    
    openReplaced: function() {
        var that = this;
        if (that.isReplaced()) {
            var page = getDimensions();
            fauxSelectMask.show(null, {
                width: Math.min(page.totalW, page.viewportW) + 'px',
                height: page.totalH + 'px'
            });
            fauxSelectScroll.sContent[0].innerHTML = '<ul>' + that.options + '</ul>';
            var current = $('#' + that.name + 'Option' + that.currentIndex).addClass(config.fauxFields.selected);
            fauxSelect.click(function(e) {that.clickList(e, this);});
            var positions = that.getReplacedOpeningPosition(page);
            fauxSelect.css(positions).addClass(config.fauxFields.focus);
            fauxSelectScroll.compute();
            if (BOX.ieOld) {
                $('li', fauxSelect).bind('mouseover.selectReplaced', fauxSelectRollover).bind('mouseout.selectReplaced', fauxSelectRollout);
            }
            that.setReplacedOptionOnView(current);
            that.opened = true;
            mapForms[that.formId].fireEvent('open.select.' + that.name);
            $(D).bind('keydown.selectReplaced', function(e) {
                if (e.which == 27) {
                    that.closeReplaced();
                }
            }).bind('mousedown.selectReplaced', function(e) {
                var t = e.target;
                if (t == fauxSelectMask.dom[0]) {
                    that.closeReplaced();
                }
            });
            current = null;
        }
    },
    
    closeReplaced: function() {
        if (this.isReplaced()) {
            fauxSelect.css('left', '-10000px').removeClass(config.fauxFields.focus);
            fauxSelect.unbind('click');
            fauxSelectMask.hide();
            this.opened = false;
            mapForms[this.formId].fireEvent('close.select.' + this.name);
            $(D).unbind('keydown.fauxSelect').unbind('mousedown.selectReplaced');
            if (BOX.ieOld) {
                $('li', fauxSelect).unbind('mouseover.selectReplaced').unbind('mouseout.selectReplaced');
            }
        }
    },
    
    keyDown: function(e) {
        if(e.which == 9) {
            this.closeReplaced();
        }
    },
    
    keyUp: function(e) {
        var k = e.which;
        if(e.altKey && (k == 38 || k == 40)) {
            this.clickReplaced();
            return;
        }
        var i = this.getIndex();
        switch (k) {
            case 13:
            case 27:
                this.setIndex(i);
                this.closeReplaced();
                break;
            case 34:
            case 35:
                this.setIndex(this.element.options.length - 1);
                break;
            case 33:
            case 36:
                this.setIndex(0);
                break;
            case 37:
            case 38:
                i = (i == this.currentIndex) ? --i : i;
                if (i < 0) {i = 0;}
                this.setIndex(i);
                break;
            case 39:
            case 40:
                i = (i == this.currentIndex) ? ++i : i;
                if (i >= this.element.options.length) {i = this.element.options.length - 1;}
                this.setIndex(i);
                break;
            default:
                this.setIndex(i);
        }
    },
	isMatching: function(what) {
        return formRules[what] ? formRules[what](this.element.value) : null;
    }
});

})(jQuery);

